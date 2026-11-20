/**
 * Once a device has sent the appointment form, it sees a thank-you note instead of the form, on
 * every later visit and refresh. Stored in localStorage; the flag is mirrored on <html> as
 * data-appt-sent so CSS (globals.css) can swap form → thank-you before the first paint.
 */
export const SENT_KEY = "oncoxpert:appointment-sent";
export const SENT_ATTR = "data-appt-sent";

/** Runs inline before the form is painted (AppointmentSection), so a refresh never flashes the form. */
export const sentScript = `try{if(localStorage.getItem(${JSON.stringify(SENT_KEY)}))document.documentElement.setAttribute(${JSON.stringify(SENT_ATTR)},"")}catch(e){}`;

export function hasSent(): boolean {
  try {
    return !!window.localStorage.getItem(SENT_KEY);
  } catch {
    return false;
  }
}

/** Remember the submission on this device and swap the form for the thank-you note now. */
export function markSent() {
  try {
    window.localStorage.setItem(SENT_KEY, new Date().toISOString());
  } catch {
    // Storage blocked (private mode): the note still shows for this visit.
  }
  document.documentElement.setAttribute(SENT_ATTR, "");
}
