import assert from "node:assert/strict";
import test from "node:test";

import {
  advanceViewState,
  createConversionDetailSafely,
  deliverConversionSafely,
  isClickConversionEvent,
  validateConversionEndpoint,
} from "../app/conversion-tracker-helpers.mjs";

test("click delegation excludes route-view markers", () => {
  for (const eventName of ["whatsapp_click", "phone_click", "maps_click", "article_to_specialty_click", "language_change"]) {
    assert.equal(isClickConversionEvent(eventName), true, eventName);
  }
  assert.equal(isClickConversionEvent("specialty_view"), false);
  assert.equal(isClickConversionEvent("doctor_profile_view"), false);
  assert.equal(isClickConversionEvent("unknown"), false);
});

test("view state resets on routes without a marker and emits on revisit", () => {
  let state = "";
  let transition = advanceViewState(state, "/cabelo", "specialty_view");
  assert.equal(transition.shouldEmit, true);
  state = transition.state;

  transition = advanceViewState(state, "/cabelo", "specialty_view");
  assert.equal(transition.shouldEmit, false);
  state = transition.state;

  transition = advanceViewState(state, "/blog", undefined);
  assert.deepEqual(transition, { state: "/blog:", shouldEmit: false });
  state = transition.state;

  transition = advanceViewState(state, "/cabelo", "specialty_view");
  assert.equal(transition.shouldEmit, true);
});

test("endpoint validation accepts only same-origin HTTP or HTTPS endpoints", () => {
  const locationLike = { origin: "http://localhost:3000" };
  assert.equal(validateConversionEndpoint("/api/conversions", locationLike), "http://localhost:3000/api/conversions");
  assert.equal(validateConversionEndpoint("http://localhost:3000/collect", locationLike), "http://localhost:3000/collect");
  assert.equal(validateConversionEndpoint("https://telemetry.example/collect", locationLike), "https://telemetry.example/collect");

  for (const endpoint of [undefined, "", "http://telemetry.example/collect", "javascript:alert(1)", "ftp://telemetry.example/collect", "https://user:secret@telemetry.example/collect"]) {
    assert.equal(validateConversionEndpoint(endpoint, locationLike), undefined, String(endpoint));
  }
  assert.equal(validateConversionEndpoint({ toString() { throw new Error("crafted endpoint"); } }, locationLike), undefined);
});

test("contract exceptions are contained at the tracker boundary", () => {
  const result = createConversionDetailSafely(() => { throw new Error("invalid metadata"); }, {}, {});
  assert.equal(result, null);
});

test("safe delivery dispatches locally, pushes an existing dataLayer, and uses beacon", () => {
  const detail = { event_name: "whatsapp_click", pathname: "/" };
  const dispatched = [];
  const dataLayer = [];
  let beaconBody = "";
  let fetchCalls = 0;

  deliverConversionSafely(detail, {
    dispatch: value => dispatched.push(value),
    dataLayer,
    endpoint: "https://telemetry.example/collect",
    sendBeacon: (_endpoint, body) => { beaconBody = body; return true; },
    fetch: () => { fetchCalls += 1; },
  });

  assert.deepEqual(dispatched, [detail]);
  assert.deepEqual(dataLayer, [{ event: "whatsapp_click", ...detail }]);
  assert.equal(JSON.parse(beaconBody).pathname, "/");
  assert.equal(fetchCalls, 0);
});

test("synchronous listeners cannot mutate dataLayer or network payloads", () => {
  const original = {
    event_name: "whatsapp_click",
    placement: "hero",
    pathname: "/",
    acquisition_channel: "direct",
  };
  const dispatchedDetails = [];
  const dataLayerPayloads = [];
  const networkBodies = [];
  const mutateDispatchedDetail = value => {
    dispatchedDetails.push(value);
    for (const [key, injected] of Object.entries({
      message: "private message",
      email: "patient@example.com",
      phone: "+552100000000",
      event: "arbitrary_event",
      event_name: "arbitrary_event",
    })) {
      try { value[key] = injected; } catch {}
    }
  };

  deliverConversionSafely({ ...original }, {
    dispatch: mutateDispatchedDetail,
    dataLayer: { push: value => dataLayerPayloads.push(value) },
    endpoint: "https://telemetry.example/collect",
    sendBeacon: (_endpoint, body) => { networkBodies.push(body); return true; },
  });
  deliverConversionSafely({ ...original }, {
    dispatch: mutateDispatchedDetail,
    dataLayer: { push: value => dataLayerPayloads.push(value) },
    endpoint: "https://telemetry.example/collect",
    sendBeacon: () => false,
    fetch: (_endpoint, options) => { networkBodies.push(options.body); },
  });

  const expectedDataLayer = { event: "whatsapp_click", ...original };
  assert.ok(dispatchedDetails.every(Object.isFrozen));
  assert.deepEqual(dataLayerPayloads, [expectedDataLayer, expectedDataLayer]);
  assert.ok(dataLayerPayloads.every(Object.isFrozen));
  assert.deepEqual(networkBodies.map(JSON.parse), [original, original]);
  assert.doesNotMatch(JSON.stringify({ dataLayerPayloads, networkBodies }), /private|patient@|552100000000|arbitrary_event/);
});

test("delivery errors never escape or prevent the network fallback attempt", () => {
  let fetchCalls = 0;
  assert.doesNotThrow(() => deliverConversionSafely(
    { event_name: "whatsapp_click", pathname: "/" },
    {
      dispatch() { throw new Error("listener failed"); },
      dataLayer: { push() { throw new Error("data layer failed"); } },
      endpoint: "https://telemetry.example/collect",
      sendBeacon() { throw new Error("beacon failed"); },
      fetch() { fetchCalls += 1; throw new Error("fetch failed"); },
    },
  ));
  assert.equal(fetchCalls, 1);
});
