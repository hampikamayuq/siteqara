const clickEventNames = Object.freeze([
  "whatsapp_click",
  "phone_click",
  "maps_click",
  "article_to_specialty_click",
  "language_change",
]);

const viewEventNames = Object.freeze(["doctor_profile_view", "specialty_view"]);

export function isClickConversionEvent(eventName) {
  return clickEventNames.includes(eventName);
}

export function advanceViewState(previousState, pathname, eventName) {
  const viewEvent = viewEventNames.includes(eventName) ? eventName : "";
  const state = `${pathname}:${viewEvent}`;
  return { state, shouldEmit: Boolean(viewEvent) && state !== previousState };
}

export function validateConversionEndpoint(endpoint, locationLike) {
  if (typeof endpoint !== "string" || !endpoint.trim()) return undefined;
  try {
    const origin = new URL(locationLike.origin).origin;
    const url = new URL(endpoint, origin);
    const isHttp = url.protocol === "http:" || url.protocol === "https:";
    const isSameOrigin = url.origin === origin;
    if (!isHttp || (!isSameOrigin && url.protocol !== "https:") || url.username || url.password) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

export function createConversionDetailSafely(createEvent, input, locationLike) {
  try {
    const detail = createEvent(input, locationLike);
    return detail && typeof detail === "object" ? detail : null;
  } catch {
    return null;
  }
}

export function deliverConversionSafely(detail, dependencies) {
  let eventDetail;
  let dataLayerPayload;
  let body;
  try {
    eventDetail = Object.freeze({ ...detail });
    dataLayerPayload = Object.freeze({ ...eventDetail, event: eventDetail.event_name });
    body = JSON.stringify(Object.freeze({ ...eventDetail }));
  } catch {
    return;
  }

  try {
    dependencies.dispatch(eventDetail);
  } catch {}

  try {
    dependencies.dataLayer?.push(dataLayerPayload);
  } catch {}

  if (!dependencies.endpoint) return;

  try {
    if (dependencies.sendBeacon?.(dependencies.endpoint, body)) return;
  } catch {}

  try {
    const pending = dependencies.fetch?.(dependencies.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    });
    if (pending && typeof pending.catch === "function") pending.catch(() => undefined);
  } catch {}
}
