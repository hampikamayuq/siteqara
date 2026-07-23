"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createConversionEvent } from "./conversion-events.mjs";
import {
  advanceViewState,
  createConversionDetailSafely,
  deliverConversionSafely,
  isClickConversionEvent,
  validateConversionEndpoint,
} from "./conversion-tracker-helpers.mjs";

type ConversionDetail = Record<string, string> & { event_name: string };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const attributes = {
  event_name: "data-conversion-event",
  placement: "data-conversion-placement",
  variant: "data-conversion-variant",
  context: "data-conversion-context",
  doctor: "data-conversion-doctor",
  specialty: "data-conversion-specialty",
  article: "data-conversion-article",
  category: "data-conversion-category",
  locale: "data-conversion-locale",
  to_locale: "data-conversion-to-locale",
} as const;

function readConversionInput(element: Element) {
  return Object.fromEntries(Object.entries(attributes).flatMap(([key, attribute]) => {
    const value = element.getAttribute(attribute);
    return value === null ? [] : [[key, value]];
  }));
}

export function ConversionTracker({ endpoint }: { endpoint?: string }) {
  const pathname = usePathname();
  const emittedView = useRef("");
  const validatedEndpoint = useRef<string | undefined>(undefined);

  useEffect(() => {
    validatedEndpoint.current = validateConversionEndpoint(endpoint, window.location);
  }, [endpoint]);

  useEffect(() => {
    const emitFrom = (element: Element) => {
      const detail = createConversionDetailSafely(createConversionEvent, readConversionInput(element), window.location) as ConversionDetail | null;
      if (!detail) return;
      deliverConversionSafely(detail, {
        dispatch: (value: ConversionDetail) => window.dispatchEvent(new CustomEvent("qara:conversion", { detail: value })),
        dataLayer: window.dataLayer,
        endpoint: validatedEndpoint.current,
        sendBeacon: navigator.sendBeacon?.bind(navigator),
        fetch: window.fetch?.bind(window),
      });
    };
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("[data-conversion-event]") : null;
      if (target && isClickConversionEvent(target.getAttribute("data-conversion-event"))) emitFrom(target);
    };

    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);

  useEffect(() => {
    const view = document.querySelector('[data-conversion-event="doctor_profile_view"], [data-conversion-event="specialty_view"]');
    const transition = advanceViewState(emittedView.current, pathname, view?.getAttribute("data-conversion-event") ?? undefined);
    emittedView.current = transition.state;
    if (!transition.shouldEmit || !view) return;

    const detail = createConversionDetailSafely(createConversionEvent, readConversionInput(view), window.location) as ConversionDetail | null;
    if (!detail) return;
    deliverConversionSafely(detail, {
      dispatch: (value: ConversionDetail) => window.dispatchEvent(new CustomEvent("qara:conversion", { detail: value })),
      dataLayer: window.dataLayer,
      endpoint: validatedEndpoint.current,
      sendBeacon: navigator.sendBeacon?.bind(navigator),
      fetch: window.fetch?.bind(window),
    });
  }, [pathname]);

  return null;
}
