"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, EventContentArg } from "@fullcalendar/core";
import { data } from "./data";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/index";
interface CalendarEvent extends EventInput {
  extendedProps?: {
    calendar: string;
  };
}

const Calendar: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventData, setEvenetData] = useState<object>();
  const calendarRef = useRef<FullCalendar>(null);

  const calendarsEvents: { [key: string]: string } = {
    Baja: "success",
    Media: "warning",
    Alta: "error",
    Planeada: "primary ",
    default: "primary",
  };

  useEffect(() => {
    const eventsFetched: CalendarEvent[] = data.map((item) => ({
      id: JSON.stringify(item.Id),
      title: `Ticket ${item.Id}`,
      start: item.Fecha_limite_resolucion_SLA,
      allDay: false,
      extendedProps: {
        calendar:
          calendarsEvents[item?.Descripcion_prioridad ?? ""] ?? "default",
      },
    }));

    setEvents(eventsFetched);
  }, []);

  function handleEventClick(clickInfo) {
    console.log(clickInfo.event.title);
    setEvenetData(clickInfo.event);
    openModal();
  }

  return (
    <>
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            locale={esLocale}
            hiddenDays={[0, 6]}
            selectable={true}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5],
              startTime: "08:00",
              endTime: "17:00",
            }}
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-4">
          <h1>{eventData?.title}</h1>
        </div>
      </Modal>
    </>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm cursor-pointer`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;
