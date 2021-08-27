// check Reversed String
function reverseStr(str) {
  var listOfChars = str.split("");
  var reverseListOFchar = listOfChars.reverse();
  var reversedStr = reverseListOFchar.join("");
  //   return str.split("").reverse().join("");
  return reversedStr;
}
// console.log(reverseStr("Hello"));

// check Plaindrome
function isPlaindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}
// console.log(isPlaindrome("mom"));
// console.log(isPlaindrome("243"));

// check Date string
function convertDateToString(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}
date = {
  day: 5,
  month: 9,
  year: 2020,
};
// console.log(date);
// console.log(convertDateToString(date));

// Define all posibilites of date formate
function getAllDateFormate(date) {
  dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
var date = {
  day: 2,
  month: 5,
  year: 2020,
};
// console.log(getAllDateFormate(date));

// check plaindrome for all date formate
function checkPlaindromeAllDateFormate(date) {
  var listOfPlainedrome = getAllDateFormate(date);
  var flag = false;

  for (var i = 0; i < listOfPlainedrome.length; i++) {
    if (isPlaindrome(listOfPlainedrome[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}
var date = {
  day: 2,
  month: 2,
  year: 2020,
};
// console.log(checkPlaindromeAllDateFormate(date));

// Leap Year
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}
// console.log(isLeapYear(2020));
//check  next Date
function getNextDate(date) {
  var day = date.day + 1; //increament the day
  var month = date.month;
  var year = date.year;

  var dayInMonth = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31]; //0-11
  // check for february
  if (month === 2) {
    //check for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++; //increment the month
      }
    } else {
      if (day > 28) {
        (day = 1), month++;
      }
    }
  }
  // check for other month
  else {
    //check if the day exceeds  the max days in month
    if (day > dayInMonth[month - 1]) {
      day = 1;
      month++; //increment month
    }
  }
  // check for december month
  if (month > 12) {
    month = 1;
    year++; //increment year
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}
var date = {
  day: 31,
  month: 12,
  year: 2020,
};
// console.log(getNextDate(date));

// getNextplaindrome Date
function getNextPlaindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);
  while (1) {
    ctr++;
    var isPlaindrome = checkPlaindromeAllDateFormate(nextDate);
    if (isPlaindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

var date = {
  day: 28,
  month: 2,
  year: 2021,
};
// console.log(getNextDate(date));
console.log(getNextPlaindromeDate(date));

var dateInput = document.querySelector("#bday-input");
var showBtn = document.querySelector("#show-btn");
var Output = document.querySelector("#output");

function clickHandler(e) {
  // console.log(dateInput.value);
  var bdayStr = dateInput.value;

  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    // console.log(date);
    var isPlaindrome = checkPlaindromeAllDateFormate(date);
    // console.log(isPlaindrome);
    if (isPlaindrome) {
      message("Yay ! your Birthday is a Plaindrome");
    } else {
      var [ctr, nextDate] = getNextPlaindromeDate(date);
      message(
        `the next plaindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, 
        you missed it by ${ctr} days!`
      );
    }
  }
}
function message(msg) {
  Output.innerText = msg;
}

showBtn.addEventListener("click", clickHandler);
