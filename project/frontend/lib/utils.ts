import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { format, isBefore, subDays, isAfter,subMonths,addDays } from 'date-fns';

export const isMoreThan6MonthsOrLessThan1Day = (dateString:any) => {
  const currentDate = new Date();
  const targetDate = dateString;

  // Check if the date is more than 6 months away
  const sixMonths = subMonths(targetDate, 6);
  const isMoreThan6Months = isBefore(currentDate, sixMonths);

  // Check if the date is less than 1 day ago
  const oneDayAhead = subDays(targetDate, 1);
  const isLessThan1Day = isAfter(currentDate, oneDayAhead);

  return isMoreThan6Months || isLessThan1Day ;
};