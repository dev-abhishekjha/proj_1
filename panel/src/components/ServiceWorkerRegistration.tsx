"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });

      if ("caches" in globalThis) {
        caches.keys().then((keys) => {
          for (const key of keys) {
            caches.delete(key);
          }
        });
      }

      return;
    }

    const registerServiceWorker = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Non-blocking progressive enhancement: ignore registration failures.
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(registerServiceWorker);
      return;
    }

    globalThis.setTimeout(registerServiceWorker, 1);
  }, []);

  return null;
}
