$(function() {
    $('#calendar').fullCalendar({
      defaultView: 'agendaWeek',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek,agendaDay,listMonth'
      },
          views: {
        agendaWeek: { buttonText: 'Weekly Calendar' },
        agendaDay: { buttonText: 'Daily Calendar' },   
        agendaMonth: { buttonText: 'Monthly Calendar' },    
        listMonth: { buttonText: 'Monthly List' }
            
      },
      events: [
    {
      "groupId": "999",
      "title": "10 Slots Available [SAVE A SPOT]",
      "start": "2020-02-16T16:00:00+00:00"
    },
    {
      "title": "Power Yoga - Matt Smith - Bronx - Room 107 ",
      "start": "2020-02-18T10:30:00+00:00",
      "end": "2020-02-18T12:30:00+00:00"
    },
    {
      "title": "BasketBall - Jordan Michaels - Bronx - Gymnasium",
      "start": "2020-02-18T12:00:00+00:00"
    },
    {
      "title": "Kung Fu - Bruce Lee - Bronx - Dojo",
      "start": "2020-02-19T07:00:00+00:00"
    }
  ]
    })
  });

