import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interationPlugin from "@fullcalendar/interaction";

export default function Calendar() {

    // const events = [
    //     {
    //         title: "Daily",            
    //         start: '2024-07-21T08:00:00',
    //         end: '2024-07-21T12:00:00'
    //     },
    //     {
    //         title: "Reunião de alinhamento",
    //         start: "2024-07-23T10:00:00",
    //         end: "2024-07-23T14:00:00"
    //     }
    // ];

    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    return (
        <FullCalendar 
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interationPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            dateClick={handleDateClick}
            events={[
                {
                    title: "Daily",
                    color: "red",
                    allDay: true,         
                    start: '2024-07-23T08:00:00',
                    end: '2024-07-23T10:00:00'
                },
                {
                    title: "Reunião de alinhamento",
                    color: "#FFCCAA",
                    start: "2024-07-23T10:00:00",
                    end: "2024-07-23T14:00:00"
                }
            ]}
        />
    );
};

function renderEventContent(eventInfo) {
    return(
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}