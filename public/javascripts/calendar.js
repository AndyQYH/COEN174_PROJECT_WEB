document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  console.log("calendar:"+ calendarEl)
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: { center: 'dayGridMonth,timeGridWeek' }, // buttons for switching between views
  
    views: {
      dayGridMonth: { // name of view
        titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
        // other view-specific options here
      }
    }
  });
  calendar.render();
});
  

