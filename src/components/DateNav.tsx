"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: Date): string {
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

export function DateNav() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goBack = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const goForward = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  return (
    <div className="flex items-center justify-between px-[15px] py-[5px] h-[35px] bg-[var(--bg-card-header)] rounded-t-[20px]">
      <button
        onClick={goBack}
        className="w-[25px] h-[25px] flex items-center justify-center bg-[var(--bg-interactive)] rounded-full"
      >
        <ChevronLeft size={15} className="text-[var(--text-primary-white)]" />
      </button>
      <span className="font-normal text-[12.5px] leading-[20px] text-[var(--text-primary-white)]">
        {formatDate(currentDate)}
      </span>
      <button
        onClick={goForward}
        className="w-[25px] h-[25px] flex items-center justify-center bg-[var(--bg-interactive)] rounded-full"
      >
        <ChevronRight size={15} className="text-[var(--text-primary-white)]" />
      </button>
    </div>
  );
}
