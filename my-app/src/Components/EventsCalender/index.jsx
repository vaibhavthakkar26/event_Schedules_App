import React  from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { editEventApiHandler } from '../../service/api.service';




export function EventsCalender({eventsList,editEventsHandler}) {
  const listsOfEvents = eventsList || [];
  const events = [];


  listsOfEvents.map((res)=>{
    events.push({title:res.title,start:res.startDate,end:res.endDate,color:res.priorityColorCode,id:res.id})
  })
  

  const eventClickHandler = (clickInfo) =>{
    editEventsHandler(clickInfo.event.id)
  }

  const eventDropHandler = async (info) =>{
    const id = info.event.id;
    const {start: newStart,end: newEnd} = info.event._instance.range;
    const {start,end} = info.oldEvent._instance.range;
    const startDate = newStart;
    const endDate = newEnd;
    const editData={
      startDate,
      endDate
    }
    if (new Date(start).getDate() === new Date(newStart).getDate()) {
                  info.revert();
    }
    await editEventApiHandler(id,editData);
  }
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventDrop={eventDropHandler}
        selectable={true}
        selectMirror={true}
        eventContent={renderEventContent}
        editable={true}
        eventClick={eventClickHandler}
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}
      />
    </div>
  )
}


function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}


export default EventsCalender
