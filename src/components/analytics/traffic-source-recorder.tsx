"use client";

import { useEffect } from "react";
import { recordLanding } from "@/lib/traffic-source-client";

/**
 * Renders nothing. Mounted once in the layout so the first page of a visit is
 * remembered before the visitor navigates anywhere; a job application sent
 * later reports it as the landing page.
 */
export function TrafficSourceRecorder() {
  useEffect(() => {
    recordLanding();
  }, []);
  return null;
}
