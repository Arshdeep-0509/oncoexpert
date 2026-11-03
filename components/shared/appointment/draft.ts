/**
 * What a visitor types into the placeholder form before the interactive form has loaded, and the
 * field they were in. The real form takes it over when it mounts (AppointmentForm), so nothing
 * typed during the load is lost.
 */
export const appointmentDraft: { name?: string; phone?: string; date?: string; focus?: string } = {};
