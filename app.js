import { DEFAULT_LANGUAGE, RSVP_GMAIL, RSVP_FALLBACK_EMAIL, RSVP_SHEET_URL, WEDDING_DATE_ISO } from "./js/config.js";
import { translations } from "./js/translations.js?v=20261110-1";
import { createI18n } from "./js/i18n.js";
import { initLanguageSwitch, initMobileMenu } from "./js/features/languageSwitch.js";
import { initRsvpChoices } from "./js/features/rsvpChoices.js";
import { initFaqAccordion } from "./js/features/faqAccordion.js";
import { initCountdown } from "./js/features/countdown.js";
import { initRsvpForm } from "./js/features/rsvpForm.js";
import { initTravelGuide } from "./js/features/travelGuide.js";

const i18n = createI18n(translations, DEFAULT_LANGUAGE);

i18n.setLanguage(DEFAULT_LANGUAGE);

initLanguageSwitch(i18n.setLanguage);
initMobileMenu();
initRsvpChoices();
initFaqAccordion();
initCountdown(WEDDING_DATE_ISO);
initRsvpForm({
  getCurrentLanguage: i18n.getCurrentLanguage,
  t: i18n.t,
  rsvpGmail: RSVP_GMAIL,
  rsvpFallbackEmail: RSVP_FALLBACK_EMAIL,
  rsvpSheetUrl: RSVP_SHEET_URL
});
initTravelGuide(i18n.t);
