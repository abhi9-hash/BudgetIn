import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  format,
  isSameMonth,
  isWeekend,
  endOfMonth,
  addDays,
  startOfMonth,
  isWithinInterval,
} from "date-fns";

/**
 * Generates week labels and calculates the number of working days (Monday to Friday)
 * within each week for the given date range.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Object} - A map of week labels to their respective number of working days.
 */
const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const generateLabels = (startDate, endDate) => {
  let current = startDate;
  //   startOfWeek(startDate, { weekStartsOn: 1 }); // Start week on Monday
  let weekNumber = 1;
  let totalWorkingDays = 0;
  const weekLabels = {},
    monthLabels = {},
    yearLabels = {};

  if (startDate.getDay() >= 6 && startDate.getDay() <= 7)
    return { weekLabels, monthLabels, yearLabels, totalWorkingDays };

  while (current <= endDate) {
    if (endDate.getDate() === current.getDate()) {
      // console.log({ weekLabels, monthLabels, yearLabels });
      break;
    }
    const start = current;
    let end = endOfWeek(current, { weekEndsOn: 5 });
    console.log(current, end);

    // Adjust end date if it exceeds the endDate
    if (end > endDate) {
      end = endDate;
    }

    //  if (endOfMonth(current) < end) {
    //   end = endOfMonth(current);
    // }

    if (!isSameMonth(endOfMonth(start), end)) {
      end = endOfMonth(start);
    }
    const weekLabel = `Week ${weekNumber}`;

    weekLabels[weekLabel] = {};
    weekLabels[weekLabel] = {
      month: end.getMonth() + 1,
      year: end.getFullYear(),
      start: current,
      end: end,
    };

    // console.log(start, end);

    const workingDays = calculateWorkingDays(start, end);
    // console.log(workingDays);
    if (workingDays === 0) {
      delete weekLabels[weekLabel];
      continue;
    }
    // console.log(start, end);
    weekLabels[weekLabel].workingDays = workingDays;
    totalWorkingDays += workingDays;

    // console.log(start , current, workingDays)

    // current = startOfWeek(addWeeks(end, 1), { weekStartsOn: 1 });
    if (end.getDate() === endOfMonth(end).getDate()) {
      current = startOfMonth(addDays(end, 2));
      // console.log("goes inside1", current);
    } else {
      current = addDays(end, 1);
      // console.log("goes inside2", current);
    }

    // addWeeks(end, 1); // Move to the next week
    weekNumber++;
    // console.log({ weekNumber });
  }

  // if (
  //   monthLabels.hasOwnProperty(
  //     `${monthsList[weekLabels[weekLabel].month - 1]}-${
  //       weekLabels[weekLabel].year
  //     }`
  //   )
  // ) {
  //   monthLabels[
  //     `${monthsList[weekLabels[weekLabel].month - 1]}-${
  //       weekLabels[weekLabel].year
  //     }`
  //   ].workingDays =
  //     monthLabels[
  //       `${monthsList[weekLabels[weekLabel].month - 1]}-${
  //         weekLabels[weekLabel].year
  //       }`
  //     ].workingDays + weekLabels[weekLabel].workingDays;
  // } else {
  //   monthLabels[
  //     `${monthsList[weekLabels[weekLabel].month - 1]}-${
  //       weekLabels[weekLabel].year
  //     }`
  //   ] = {
  //     workingDays: weekLabels[weekLabel].workingDays,
  //     year: weekLabels[weekLabel].year,
  //   };
  // }

  // console.log({ weekLabels });

  // console.log({ weekLabels, monthLabels, yearLabels });

  Object.keys(weekLabels).forEach((i) => {
    if (
      monthLabels.hasOwnProperty(
        `${monthsList[weekLabels[i].month - 1]}-${weekLabels[i].year}`
      )
    ) {
      monthLabels[
        `${monthsList[weekLabels[i].month - 1]}-${weekLabels[i].year}`
      ].workingDays =
        monthLabels[
          `${monthsList[weekLabels[i].month - 1]}-${weekLabels[i].year}`
        ].workingDays + weekLabels[i].workingDays;
    } else {
      monthLabels[
        `${monthsList[weekLabels[i].month - 1]}-${weekLabels[i].year}`
      ] = {
        workingDays: weekLabels[i].workingDays,
        year: weekLabels[i].year,
      };
    }
  });

  Object.keys(monthLabels).forEach((i) => {
    if (yearLabels.hasOwnProperty(monthLabels[i].year)) {
      yearLabels[monthLabels[i].year].workingDays =
        yearLabels[monthLabels[i].year].workingDays +
        monthLabels[i].workingDays;
    } else {
      yearLabels[monthLabels[i].year] = {
        workingDays: monthLabels[i].workingDays,
      };
    }
  });
  // console.log({ weekLabels, monthLabels, yearLabels });
  return { weekLabels, monthLabels, yearLabels, totalWorkingDays };
};

function isDateInFirstWeekOfMonth(date) {
  const start = startOfMonth(date);
  const end = endOfWeek(start, { weekStartsOn: 1 }); // assuming week starts on Monday
  return isWithinInterval(date, { start, end });
}

function areBothDatesInFirstWeek(date1, date2) {
  return isDateInFirstWeekOfMonth(date1) && isDateInFirstWeekOfMonth(date2);
}
/**
 * Calculates the number of working days (Monday to Friday) between two dates.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {number} - The number of working days.
 */
export const calculateWorkingDays = (startDate, endDate) => {
  // console.log({ startDate, endDate });
  let current = startDate;
  let workingDays = 0;
  if (current.getDate() == endDate.getDate()) return 0;

  if (
    areBothDatesInFirstWeek(current, endDate) &&
    current.getDay() >= 1 &&
    endDate.getDay() <= 5
  )
    workingDays = workingDays - 1;

  while (current <= endDate) {
    // Check if current day is Monday to Friday and not a weekend
    if (current.getDay() >= 1 && current.getDay() <= 5 && !isWeekend(current)) {
      workingDays++;
    }
    current.setDate(current.getDate() + 1); // Move to the next day
  }

  return workingDays;
};

// // Example usage:
// const startDate = new Date('2023-12-01');
// const endDate = new Date('2024-01-02');

// const weekLabels = generateWeekLabels(startDate, endDate);
// console.log(weekLabels);
