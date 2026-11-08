/**
 * Google Apps Script for the "Appointments" Google Sheet: the website's appointment form posts each
 * request here (lib/appointment.ts, deliverToSheet) and this adds one row:
 *   Name | Contact Number | Service Required | Date
 *
 * Setup (README.md, "Appointment form" → "Google Sheet"):
 *   1. Open the sheet → Extensions → Apps Script. Replace Code.gs with this file. Save.
 *   2. Project Settings (gear) → Script Properties → Add: WEBHOOK_SECRET = a long random string.
 *      The same string goes in the website's GOOGLE_SHEETS_WEBHOOK_SECRET.
 *   3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone.
 *      Authorize, then copy the Web app URL (ends in /exec) into GOOGLE_SHEETS_WEBHOOK_URL.
 *   After editing this file: Deploy → Manage deployments → Edit → Version: New version (the URL stays).
 *
 * "Anyone" only means the URL can be called without a Google login. Requests without the secret are
 * refused, and the script can only add rows: it never returns the sheet's contents.
 */

const HEADERS = ["Name", "Contact Number", "Service Required", "Date"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const secret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!secret || body.secret !== secret) return reply({ ok: false, error: "unauthorized" });

    const name = clean(body.name, 80);
    const phone = clean(body.phone, 20);
    const service = clean(body.service, 60);
    if (!name || !phone || !service) return reply({ ok: false, error: "invalid" });

    // One writer at a time, so two requests at once never share a row or both add the header.
    lock.waitLock(10000);
    const sheet = targetSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([asText(name), asText(phone), asText(service), asDate(body.date)]);
    return reply({ ok: true });
  } catch (err) {
    console.error("appointment row not added: " + (err && err.message)); // no patient details
    return reply({ ok: false, error: "failed" });
  } finally {
    lock.releaseLock();
  }
}

/** The first tab (gid=0 in the sheet's URL). */
function targetSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  return (book.getSheetById && book.getSheetById(0)) || book.getSheets()[0];
}

/** Trimmed, single-line, length-capped text. */
function clean(value, max) {
  return String(value == null ? "" : value)
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);
}

/**
 * Stored as plain text: the leading apostrophe stops Sheets from reading "+91…" or "=…" as a
 * formula (the apostrophe itself is not shown in the cell).
 */
function asText(value) {
  return "'" + value;
}

/**
 * "YYYY-MM-DD" from the form, passed on as that text: Sheets reads it as a date cell (sortable) in the
 * sheet's own time zone. A JavaScript Date would be shifted when the script's and the sheet's time
 * zones differ. Empty when no date was chosen.
 */
function asDate(value) {
  const date = clean(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "";
}

function reply(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
