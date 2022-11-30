function parseTime(timeString)
{
  if (timeString == '') return null;
  var d = new Date();
  var time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
  d.setHours( parseInt(time[1],10) + ( ( parseInt(time[1],10) < 12 && time[4] ) ? 12 : 0) );
  d.setMinutes( parseInt(time[3],10) || 0 );
  d.setSeconds(0, 0);
  return d;
}

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  console.log("calendar:"+ calendarEl)
  var events =[];
  var i=0;
  var courseInfo = document.getElementById(`course${i}`);
  while (courseInfo !== null) {
    console.log(courseInfo.innerText)
    var course = JSON.parse(courseInfo.innerText)
    var title = course.courseName
    var daysOfWeek = []
    if(course.day.includes('M')){
      daysOfWeek.push(1)
    }
    if(course.day.includes('T')){
      daysOfWeek.push(2)
    }
    if(course.day.includes('W')){
      daysOfWeek.push(3)
    }
    if(course.day.includes('R')){
      daysOfWeek.push(4)
    }
    if(course.day.includes('F')){
      daysOfWeek.push(5)
    }
    var time = course.time.split("-")
    var t1 = parseTime(time[0])
    var t2 = parseTime(time[1])
    var startTime = t1.getHours() + ':' + t1.getMinutes();
    var endTime = t2.getHours() + ':' + t2.getMinutes();
    title = title+`\n${course.location}`
    events.push({
      title: title, // a property!
      url:`https://www.google.com/maps/dir//${course.location},+Santa+Clara,+CA+95053`,
      daysOfWeek: daysOfWeek,
      startTime:startTime,
      endTime:endTime
    })
    i++
    courseInfo = document.getElementById(`course${i}`)
  }
  console.log(events)
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: { center: 'dayGridMonth,timeGridWeek' }, // buttons for switching between views
    events: events,

    views: {
      dayGridMonth: { // name of view
        titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
        // other view-specific options here
      }
    }
  });
  calendar.changeView('timeGridWeek');
  calendar.render();
});
  

