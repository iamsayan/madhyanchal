import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatDate(
  date: string | Date,
  showDay: boolean = false
): string {
  const parsedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
  };
  const day = parsedDate.getDate();
  const daySuffix = getDaySuffix(day);
  if (showDay) {
    const dayOfWeek = parsedDate.getDay();
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return `${daysOfWeek[dayOfWeek]}, ${day}${daySuffix} ${parsedDate.toLocaleDateString('en-US', options)}`;
  }
  return `${day}${daySuffix} ${parsedDate.toLocaleDateString('en-US', options)}`;
}

export function toISOWithOffset(date: Date, time?: string): string {
  const pad = (num: number) => String(num).padStart(2, '0');

  if (time) {
    const [hh, mm, ss] = time?.split(':').map(Number);
    date.setHours(hh || 0, mm || 0, ss || 0, 0);
  }

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const tzOffset = -date.getTimezoneOffset();
  const sign = tzOffset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(tzOffset) / 60));
  const offsetMinutes = pad(Math.abs(tzOffset) % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
}

export function hasBengaliText(
  ...texts: (string | undefined | null)[]
): boolean {
  return texts.some((t) => Boolean(t && /[\u0980-\u09FF]/.test(t)));
}
