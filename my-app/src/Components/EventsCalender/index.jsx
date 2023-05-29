import React, { createRef, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import { Draggable } from '@fullcalendar/interaction';
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
    console.log("Id",info.event.id);
    const id = info.event.id;
    const {start: newStart,end: newEnd} = info.event._instance.range;
    const startDate = new Date (newStart);
    console.log("startDate",startDate);
    const endDate = new Date (newEnd);
    console.log("startDate",endDate);
    const editData={
      startDate,
      endDate
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
      //   eventDrop={
      //     info =>{
      //         console.log("info",info.event.id);
      //         const {start,end} = info.oldEvent._instance.range;
      //         console.log(start, end);
      //         const {
      //            start: newStart,
      //             end: newEnd
      //         } = info.event._instance.range;
      //         console.log(newStart, newEnd);

      //         if (new Date(start).getDate() === new Date(newStart).getDate()) {
      //             info.revert();
      //         }
      //         }
      // }
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
