const monthYear = document.querySelector(".month-year");
const day = document.querySelector(".day");
const dayofweek = document.querySelector(".day-of-week");

const daySelector = document.querySelector(".day-selector");

const selectingDay = document.querySelector("#selecting-day");
const selectingMonth = document.querySelector("#selecting-month");
const selectingYear = document.querySelector("#selecting-year");

const prevYearBtn = document.querySelector("#prev-year");
const prevMonthBtn = document.querySelector("#prev-month");
const nextMonthBtn = document.querySelector("#next-month");
const nextYearBtn = document.querySelector("#next-year");
const dayTodayBtn = document.querySelector("#day-today");
const okBtn = document.querySelector("#ok");

const daysOfWeek = [
  "Chủ nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

let selectedDate = new Date();
let selectedDayInSelectorElement = null;
updateSelector();

for (let i = 1; i <= 31; i++) {
  let tmp = document.createElement("option");
  tmp.value = i;
  tmp.textContent = i;
  selectingDay.appendChild(tmp);
}

for (let i = 1; i <= 12; i++) {
  let tmp = document.createElement("option");
  tmp.value = i - 1;
  tmp.textContent = i;
  selectingMonth.appendChild(tmp);
}

function convertToDayOfWeek(day) {
  return daysOfWeek[day] || "";
}
function updateSelector() {
  document.querySelectorAll(".day-in-selector").forEach((day) => {
    day.remove();
  });

  let firstDay = new Date(selectedDate);
  firstDay.setDate(1);

  for (let i = 0; i < firstDay.getDay(); i++) {
    daySelector
      .appendChild(document.createElement("div"))
      .classList.add("day-in-selector");
  }

  let lastDay = new Date(selectedDate);
  lastDay.setDate(1);
  lastDay.setMonth(lastDay.getMonth() + 1);
  lastDay.setDate(0);

  for (let i = 1; i <= lastDay.getDate(); i++) {
    let tmp = document.createElement("div");
    tmp.classList.add("day-in-selector");
    tmp.textContent = i;

    tmp.addEventListener("click", (e) => {
      selectedDayInSelectorClickHandler(e);
    });

    if (i == selectedDate.getDate()) {
      tmp.classList.add("selected-day-in-selector");
      selectedDayInSelectorElement = tmp;
    }
    daySelector.appendChild(tmp);
  }

  monthYear.textContent = `Tháng ${
    selectedDate.getMonth() + 1
  } năm ${selectedDate.getFullYear()}`;
  day.textContent = selectedDate.getDate();
  dayofweek.textContent = convertToDayOfWeek(selectedDate.getDay());
}

function dateValidate() {
  if (selectingYear.value <= 1900) {
    alert("Ngày không tồn tại");
    return false;
  }

  let tmp = new Date(
    selectingYear.value,
    selectingMonth.value,
    selectingDay.value
  );

  if (!tmp.getFullYear()) {
    alert("Ngày không tồn tại");
    return false;
  }

  if (tmp.getMonth() != selectingMonth.value) {
    alert("Ngày không tồn tại");
    return false;
  }

  selectedDate = tmp;
  return true;
}

function selectedDayInSelectorClickHandler(e) {
  e.target.classList.add("selected-day-in-selector");
  if (
    selectedDayInSelectorElement != null ||
    selectedDayInSelectorElement != undefined
  ) {
    selectedDayInSelectorElement.classList.remove("selected-day-in-selector");
  }
  selectedDayInSelectorElement = e.target;
  day.textContent = e.target.textContent;
  let tmp = new Date(selectedDate);
  tmp.setDate(e.target.textContent);
  dayofweek.textContent = convertToDayOfWeek(tmp.getDay());
}

function okBtnHandler() {
  dateValidate();
  updateSelector();
}

function updateDate(type, value) {
  if (type === "year") {
    selectedDate.setFullYear(selectedDate.getFullYear() + value);
  } else if (type === "month") {
    selectedDate.setMonth(selectedDate.getMonth() + value);
  }
  updateSelector();
}

prevYearBtn.addEventListener("click", () => {
  updateDate("year", -1);
});

prevMonthBtn.addEventListener("click", () => {
  updateDate("month", -1);
});

okBtn.addEventListener("click", () => {
  okBtnHandler();
});

nextMonthBtn.addEventListener("click", () => {
  updateDate("month", 1);
});

nextYearBtn.addEventListener("click", () => {
  updateDate("year", 1);
});

dayTodayBtn.addEventListener("click", () => {
  selectedDate = new Date();
  updateSelector();
});
