export function initRsvpChoices() {
  const card = document.querySelector(".rsvp-card");
  const rsvpRight = document.getElementById("rsvp-right");
  const attendingFields = document.querySelector(".rsvp-attending-fields");
  const speechField = document.querySelector(".rsvp-speech-field");
  const songBlock = document.querySelector(".rsvp-song-block");
  const lowerGrid = document.querySelector(".rsvp-lower-grid");

  const openCard = () => {
    if (!rsvpRight?.hidden) {
      return;
    }
    rsvpRight.hidden = false;
    // double rAF lets the browser paint the unhidden panel before animating it
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card?.classList.add("is-open");
      });
    });
  };

  const updateAttendanceState = (value) => {
    const isAttending = value === "Yes";
    const isDeclining = value === "No";

    if (attendingFields) attendingFields.hidden = !isAttending;
    if (speechField) speechField.hidden = !isAttending;
    if (songBlock) songBlock.hidden = !isAttending;
    if (lowerGrid) lowerGrid.classList.toggle("is-decline", isDeclining);
  };

  document.querySelectorAll(".rsvp-choice input").forEach((input) => {
    input.addEventListener("change", () => {
      const value = input.value || "";
      const attendanceInput = document.getElementById("attendance");
      if (!attendanceInput) {
        return;
      }

      attendanceInput.value = value;
      document.querySelectorAll(".rsvp-choice").forEach((choice) => {
        choice.classList.toggle("is-selected", choice.dataset.attendanceValue === value);
      });

      const details = document.querySelector(".rsvp-details");
      const success = document.querySelector(".rsvp-success");
      if (details) details.hidden = false;
      if (success) success.hidden = true;

      updateAttendanceState(value);
      openCard();
    });
  });

  updateAttendanceState(document.getElementById("attendance")?.value || "");
}

