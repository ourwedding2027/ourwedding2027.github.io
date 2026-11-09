export function initRsvpForm({ getCurrentLanguage, t, rsvpGmail, rsvpFallbackEmail, rsvpSheetUrl }) {
  const form = document.getElementById("rsvp-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const feedback = document.getElementById("rsvp-feedback");
    const showError = (message) => {
      if (feedback) {
        feedback.textContent = message;
        feedback.hidden = false;
      }
    };

    const name = document.getElementById("name")?.value.trim() || "";
    const contact = document.getElementById("contact")?.value.trim() || "";
    const attendance = document.getElementById("attendance")?.value || "";
    const mainCourse = document.getElementById("main-course")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";
    const song = attendance === "Yes" ? document.getElementById("song")?.value.trim() || "" : "";

    if (attendance !== "Yes" && attendance !== "No") {
      showError(t("rsvp.validation_attendance", getCurrentLanguage()));
      return;
    }

    if (!name || !contact) {
      showError(t("rsvp.validation_details", getCurrentLanguage()));
      return;
    }

    if (feedback) feedback.hidden = true;

    const isAttending = attendance === "Yes";
    const showSuccess = () => {
      const details = document.querySelector(".rsvp-details");
      const success = document.querySelector(".rsvp-success");
      if (details) details.hidden = true;
      if (success) {
        success.classList.toggle("is-declining", !isAttending);
        success.hidden = false;
      }
    };

    // Preferred path: record the RSVP in the Google Sheet via the Apps Script webhook.
    if (rsvpSheetUrl) {
      try {
        await fetch(rsvpSheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            name,
            contact,
            attendance,
            mainCourse,
            message,
            song
          })
        });
        showSuccess();
      } catch {
        showError(t("rsvp.submission_error", getCurrentLanguage()));
      }
      return;
    }

    // Fallback path (no sheet configured yet): open a mailto draft instead.
    const subject = encodeURIComponent(`RSVP - ${name}`);
    const bodyLines = [
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Attendance: ${attendance}`
    ];

    if (isAttending) {
      if (mainCourse) {
        bodyLines.push(`Main course selection: ${mainCourse}`);
      }
    }

    if (message) {
      bodyLines.push(`Message: ${message}`);
    }

    if (song) {
      bodyLines.push(`Song for the dance floor: ${song}`);
    }

    const body = encodeURIComponent(bodyLines.join("\n"));

    try {
      window.location.href = `mailto:${rsvpGmail}?subject=${subject}&body=${body}`;

      // If no mail client took over within a moment, retry with the fallback address.
      if (rsvpFallbackEmail) {
        setTimeout(() => {
          if (!document.hidden) {
            window.location.href = `mailto:${rsvpFallbackEmail}?subject=${subject}&body=${body}`;
          }
        }, 800);
      }

      showSuccess();
    } catch {
      showError(t("rsvp.submission_error", getCurrentLanguage()));
    }
  });
}
