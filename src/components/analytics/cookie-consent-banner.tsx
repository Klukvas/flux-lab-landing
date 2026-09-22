"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "@/i18n/navigation";
import { updateAnalyticsConsent } from "@/lib/analytics";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  expireAnalyticsCookies,
  readConsentFromCookieString,
  serializeConsentCookie,
  type ConsentChoice,
} from "@/lib/cookie-consent";
import {
  CONSENT_TITLE_ID,
  ConsentPrompt,
  type ConsentPromptProps,
} from "./consent-prompt";
import { ConsentReminder } from "./consent-reminder";

const PRIVACY_POLICY_PATH = "/privacy";

/** The stored choice is unknowable while prerendering; the banner waits for the browser. */
const UNKNOWN_CHOICE = "unknown";
type StoredChoice = ConsentChoice | null | typeof UNKNOWN_CHOICE;

// The cookie only changes through this component, which tracks that in state instead.
const subscribeToNothing = () => () => {};
const readStoredChoice = (): StoredChoice =>
  readConsentFromCookieString(document.cookie);
const unknownDuringPrerender = (): StoredChoice => UNKNOWN_CHOICE;

export function CookieConsentBanner() {
  const pathname = usePathname();
  // Pages are static, so the consent cookie is read in the browser, not on the server.
  const storedChoice = useSyncExternalStore(
    subscribeToNothing,
    readStoredChoice,
    unknownDuringPrerender,
  );
  // undefined until the visitor acts on this page; then it overrides the cookie.
  const [decision, setDecision] = useState<ConsentChoice | null>();
  const choice = decision === undefined ? storedChoice : decision;

  useEffect(() => {
    const reopen = () => setDecision(null);
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (choice === UNKNOWN_CHOICE || choice === "granted") {
    return null;
  }

  function decide(nextChoice: ConsentChoice) {
    document.cookie = serializeConsentCookie(nextChoice, {
      secure: window.location.protocol === "https:",
    });
    updateAnalyticsConsent(nextChoice);
    if (nextChoice === "denied") {
      // Withdrawing consent also removes the cookies that consent allowed earlier.
      for (const expiredCookie of expireAnalyticsCookies(
        document.cookie,
        window.location.hostname,
      )) {
        document.cookie = expiredCookie;
      }
    }
    setDecision(nextChoice);
  }

  // A decline is not final: a small corner pill keeps the choice reachable.
  if (choice === "denied") {
    return <ConsentReminder onOpen={() => setDecision(null)} />;
  }

  // The modal would cover the very policy it links to, so on that page the choice
  // waits in a corner card instead of blocking the text.
  return pathname === PRIVACY_POLICY_PATH ? (
    <ConsentCard onDecide={decide} />
  ) : (
    <ConsentDialog onDecide={decide} />
  );
}

/** Blocks the page behind a blurred backdrop until the visitor accepts or declines. */
function ConsentDialog({ onDecide }: ConsentPromptProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) {
      return;
    }
    // showModal() puts the dialog in the top layer, makes the rest of the page inert
    // and traps focus; the body lock only stops the blurred page from scrolling.
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={CONSENT_TITLE_ID}
      // Escape is the keyboard way out, and leaving without consenting means "no".
      onCancel={(event) => {
        event.preventDefault();
        onDecide("denied");
      }}
      // Browsers may force-close a dialog that keeps cancelling Escape; treat that as a decline too.
      onClose={() => onDecide("denied")}
      // m-auto restores the centering that Tailwind's preflight margin reset takes away from dialog:modal.
      className="cookie-consent-dialog m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
    >
      <ConsentPrompt onDecide={onDecide} />
    </dialog>
  );
}

/** Non-blocking corner card, used where the page itself must stay readable. */
function ConsentCard({ onDecide }: ConsentPromptProps) {
  return (
    <div
      role="region"
      aria-labelledby={CONSENT_TITLE_ID}
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-800 dark:bg-gray-950 sm:left-6 sm:right-auto sm:mx-0"
    >
      <ConsentPrompt onDecide={onDecide} />
    </div>
  );
}
