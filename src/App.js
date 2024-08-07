import { useState } from "react";

//Don't believe in Modern Months

const modernMonths = [
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

//Get the current date

const today = new Date();
const currentMonth = modernMonths[today.getMonth()];
const currentDate = today.getDate();
const currentYear = today.getFullYear();

//Roman Months and Numerals

const romanCalendarMonths = {
  January: {
    monthStem: "Ianuari",
    monthLength: 31,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "February",
  },
  February: {
    monthStem: "Februari",
    monthLength: 28,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "March",
  },
  March: {
    monthStem: "Mart",
    monthLength: 31,
    nones: 7,
    ides: 15,
    caseEndings: {
      ablative: "ibus",
      accusative: "es",
    },
    nextMonth: "April",
  },
  April: {
    monthStem: "April",
    monthLength: 30,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "ibus",
      accusative: "es",
    },
    nextMonth: "May",
  },
  May: {
    monthStem: "Mai",
    monthLength: 31,
    nones: 7,
    ides: 15,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "June",
  },
  June: {
    monthStem: "Iuni",
    monthLength: 30,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "July",
  },
  July: {
    monthStem: "Iuli",
    monthLength: 31,
    nones: 7,
    ides: 15,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "August",
  },
  August: {
    monthStem: "August",
    monthLength: 31,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "September",
  },
  September: {
    monthStem: "Septembr",
    monthLength: 30,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "October",
  },
  October: {
    monthStem: "Octobr",
    monthLength: 31,
    nones: 7,
    ides: 15,
    caseEndings: {
      ablative: "ibus",
      accusative: "es",
    },
    nextMonth: "November",
  },
  November: {
    monthStem: "Novembr",
    monthLength: 30,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "ibus",
      accusative: "es",
    },
    nextMonth: "December",
  },
  December: {
    monthStem: "Decembr",
    monthLength: 31,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "es",
    },
    nextMonth: "January",
  },
};

const daysOfTheWeek = {
  0: {
    modernDayName: "Sunday",
    romanDayName: "Dies Solis",
  },
  1: {
    modernDayName: "Monday",
    romanDayName: "Dies Lunae",
  },
  2: {
    modernDayName: "Tuesday",
    romanDayName: "Dies Martis",
  },
  3: { modernDayName: "Wednesday", romanDayName: "Dies Mercurii" },
  4: {
    modernDayName: "Thursday",
    romanDayName: "Dies Iovis",
  },
  5: { modernDayName: "Friday", romanDayName: "Dies Veneris" },
  6: { modernDayName: "Saturday", romanDayName: "Dies Saturni" },
};

const romanNumerals = new Map([
  [3, "III"],
  [4, "IV"],
  [5, "V"],
  [6, "VI"],
  [7, "VII"],
  [8, "VIII"],
  [9, "IX"],
  [10, "X"],
  [11, "XI"],
  [12, "XII"],
  [13, "XIII"],
  [14, "XIV"],
  [15, "XV"],
  [16, "XVI"],
  [17, "XVII"],
  [18, "XVIII"],
  [19, "XIX"],
]);

//Conversion functions

function convertedRomanNumeral(number) {
  return romanNumerals.get(number);
}

function convertedMonth(month, day) {
  const currentMonth = romanCalendarMonths[month];
  const displayMonth =
    day > currentMonth.ides
      ? romanCalendarMonths[currentMonth.nextMonth]
      : currentMonth;
  const {
    monthStem,
    nones,
    ides,
    caseEndings: { ablative, accusative },
  } = displayMonth;
  const ending =
    day == 1 || day == nones || day == ides ? ablative : accusative;
  return monthStem + ending;
}

function convertedDate(month, day) {
  const { nones, ides, monthLength } = romanCalendarMonths[month];

  if (day == 1)
    return {
      latin: "Kalendis",
      english: "the Kalends",
    };
  if (day == nones - 1)
    return {
      latin: "pridie Nonas",
      english: "the day before the Nones",
    };
  if (day == nones)
    return {
      latin: "Nonis",
      english: "the Nones",
    };
  if (day == ides - 1)
    return {
      latin: "pridie Idus",
      english: "the day before the Ides",
    };
  if (day == ides)
    return {
      latin: "Idibus",
      english: "the Ides",
    };
  if (day < nones)
    return {
      latin: `a.d. ${convertedRomanNumeral(nones - day + 1)} Nonas`,
      english: `${nones - day + 1} days before the Nones`,
    };
  if (day < ides)
    return {
      latin: `a.d. ${convertedRomanNumeral(ides - day + 1)} Idus`,
      english: `${ides - day + 1} days before the Ides`,
    };
  if (day < monthLength)
    return {
      latin: `a.d. ${convertedRomanNumeral(monthLength - day + 2)} Kalendas`,
      english: `${monthLength - day + 2} days before the Kalends`,
    };
  return {
    latin: "pridie Kalendas",
    english: "the day before the Kalends",
  };
}

function convertedYear(year) {
  return Number(year) + 753;
}

//Fixing February
function checkLeapYear(year) {
  // Check if the year is divisible by 4
  if (year % 4 === 0) {
    // If it's divisible by 100, it should also be divisible by 400 to be a leap year
    if (year % 100 === 0) {
      return year % 400 === 0;
    }
    return true;
  }
  return false;
}

//Got the time (message)?

function getTimeMessage(selectedDateString) {
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const todayYear = today.getFullYear();
  const selectedDateStringMonth = selectedDateString.getMonth();
  const selectedDateStringDate = selectedDateString.getDate();
  const selectedDateStringYear = selectedDateString.getFullYear();

  if (
    selectedDateStringYear === todayYear &&
    selectedDateStringMonth === todayMonth &&
    selectedDateStringDate - todayDate === 1
  )
    return {
      latin: "cras erit",
      english: "Tomorrow will be",
    };
  if (
    selectedDateStringYear === todayYear &&
    selectedDateStringMonth === todayMonth &&
    selectedDateStringDate + 1 === todayDate
  )
    return {
      latin: "heri erat",
      english: "Yesterday was",
    };
  if (
    selectedDateStringYear > todayYear ||
    (selectedDateStringYear === todayYear &&
      selectedDateStringMonth > todayMonth) ||
    (selectedDateStringYear === todayYear &&
      selectedDateStringMonth === todayMonth &&
      selectedDateStringDate > todayDate)
  )
    return {
      latin: "ille dies erit",
      english: "That day will be",
    };
  if (
    selectedDateStringYear < todayYear ||
    (selectedDateStringYear === todayYear &&
      selectedDateStringMonth < todayMonth) ||
    (selectedDateStringYear === todayYear &&
      selectedDateStringMonth === todayMonth &&
      selectedDateStringDate < todayDate)
  )
    return {
      latin: "ille dies erat",
      english: "That day was",
    };
  return {
    latin: "hodie est",
    english: "Today is",
  };
}

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setselectedDate] = useState(currentDate);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  if (checkLeapYear(selectedYear)) {
    romanCalendarMonths["February"].monthLength = 29;
  } else {
    romanCalendarMonths["February"].monthLength = 28;
  }

  const selectedDateString = new Date(
    `${selectedMonth} ${selectedDate}, ${selectedYear}`
  );

  const selectedDateStringDay = selectedDateString.getDay();

  const timeMessage = getTimeMessage(selectedDateString);
  const convertedDateResult = convertedDate(selectedMonth, selectedDate);
  const convertedYearResult = convertedYear(selectedYear);

  return (
    <div className="App">
      <h1>Ancient Roman Date Converter</h1>
      <h2>
        <em>carpe diem!</em>
      </h2>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {modernMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        value={selectedDate}
        onChange={(e) => setselectedDate(e.target.value)}
      >
        {Array.from(
          {
            length: romanCalendarMonths[selectedMonth].monthLength,
          },
          (_, i) => i + 1
        ).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      />
      <h3>
        {`
        ${timeMessage.latin} ${
          daysOfTheWeek[selectedDateStringDay].romanDayName
        },
        ${convertedDateResult.latin}
        ${convertedMonth(selectedMonth, selectedDate)}, ${convertedYearResult}
        A.U.C.`}
      </h3>
      <p>
        {`
        ${timeMessage.english}
        ${daysOfTheWeek[selectedDateStringDay].modernDayName},
        ${convertedDateResult.english} of ${selectedMonth}, ${convertedYearResult}
        years since the founding of Rome.`}
      </p>
      {selectedMonth === "March" && Number(selectedDate) === 15 && (
        <h1>"Beware the Ides of March!"</h1>
      )}
      <p>
        The Ancient Roman calendar counted inclusively up to the three marker
        days in each month: the Kalends (the first), the nones (the 5th or 7th
        depending on the month), and the ides (the 13th or 15th depending on the
        month). March 13, for example, would be considered "3 days before the
        Ides of March," and March 14 would be called "the day before the Ides of
        March."
      </p>
    </div>
  );
}
