"use strict";
// script for switch clock format

const formatSwitchBtn = document.querySelector(".format-switch-btn");
formatSwitchBtn.addEventListener("click", () => {
    formatSwitchBtn.classList.toggle("active");

    var formatValue = formatSwitchBtn.getAttribute("data-format");

    if (formatValue === "12") {
        formatSwitchBtn.setAttribute("data-format", "24");
    } else {
        formatSwitchBtn.setAttribute("data-format", "12");
    }
});

// script for get value of clock
let updateClock;
const clock = function () {
    const clockHours = document.querySelector(".hours");
    const clockMinutes = document.querySelector(".minutes");
    const clockPeriod = document.querySelector(".period");
    const clockSecond = document.querySelector(".seconds");
    const clockYears = document.querySelector(".years");

    let today = new Date();

    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let period = "AM";
    // let years = today.getFullYear();

    // Set the 12-hour clock format
    var formatValue = formatSwitchBtn.getAttribute("data-format");

    if (formatValue === "12") {
        hours = hours > 12 ? hours % 12 : hours;
    }

    // Set the time period(AM/PM)
    if (hours >= 12) {
        period = "PM";
    }

    // Add the 0 for the value lower than 10
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    clockHours.innerHTML = hours;
    clockMinutes.innerHTML = minutes;
    clockPeriod.innerHTML = period;
    clockSecond.innerHTML = seconds;
    // clockYears.innerHTML = years;
};
updateClock = setInterval(clock, 1000);

// Get the date in javascript
const dateAndMonth = function () {
    const clockMonthName = document.querySelector(".month-name");
    const clockDayName = document.querySelector(".day-name");
    const clockDayNumber = document.querySelector(".day-number");

    let today = new Date();
    const dayNumber = today.getDate();
    const year = today.getFullYear();
    const dayName = today.toLocaleDateString("default", { weekday: "long" });
    const monthName = today.toLocaleDateString("default", { month: "short" });

    clockMonthName.innerHTML = monthName;
    clockDayName.innerHTML = dayName;
    clockDayNumber.innerHTML = dayNumber;
};
updateClock = setInterval(dateAndMonth, 1000);

// script for toggle dot-menu-btn
function showMenu(selected) {
    let sel = selected.parentElement.children[1];
    sel.classList.toggle("active");

    document.addEventListener("click", e => {
        if (e.target.tagName != "I" && e.target.id != "active-menu") {
            sel.classList.remove("active");
        }
    });
}
