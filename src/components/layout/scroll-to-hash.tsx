"use client";

import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) {
      return;
    }

    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, []);

  return null;
}
