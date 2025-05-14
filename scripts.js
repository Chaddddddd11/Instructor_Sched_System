document.addEventListener('DOMContentLoaded', function () {
  // Enrollment Form Submission
  const enrollmentForm = document.getElementById('enrollment-form');
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Handle form submission logic here
      alert('Instructor enrolled successfully!');
      enrollmentForm.reset();
    });
  }

  // Initialize FullCalendar
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: [
        {
          title: 'Sample Event',
          start: '2025-05-14T10:00:00',
          end: '2025-05-14T12:00:00'
        }
      ]
    });
    calendar.render();
  }

  // Load Profile Details
  const profileDetails = document.getElementBy
::contentReference[oaicite:13]{index=13}
 
