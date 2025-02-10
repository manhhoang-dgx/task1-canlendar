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

const today = new Date();
let selectedDate = new Date();
let selectedDayInSelectorElement = null;

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
  switch (day) {
    case 0:
      return "Chủ nhật";
    case 1:
      return "Thứ 2";
    case 2:
      return "Thứ 3";
    case 3:
      return "Thứ 4";
    case 4:
      return "Thứ 5";
    case 5:
      return "Thứ 6";
    case 6:
      return "Thứ 7";
  }
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
  lastDay.setMonth(lastDay.getMonth() + 1);
  lastDay.setDate(0);
  console.log(lastDay.getDate());
  for (let i = 1; i <= lastDay.getDate(); i++) {
    let tmp = document.createElement("div");
    tmp.classList.add("day-in-selector");
    tmp.textContent = i;

    tmp.addEventListener("click", (e) => {
      day.textContent = selectedDate.getDate();
      e.target.classList.add("selected-day-in-selector");
      if (
        selectedDayInSelectorElement != null ||
        selectedDayInSelectorElement != undefined
      ) {
        selectedDayInSelectorElement.classList.remove(
          "selected-day-in-selector"
        );
      }
      selectedDayInSelectorElement = e.target;
      day.textContent = e.target.textContent;
      let tmp = new Date(selectedDate);
      tmp.setDate(e.target.textContent);
      dayofweek.textContent = convertToDayOfWeek(tmp.getDay());
    });
    daySelector.appendChild(tmp);
  }

  monthYear.textContent = `Tháng ${
    selectedDate.getMonth() + 1
  } năm ${selectedDate.getFullYear()}`;
  day.textContent = selectedDate.getDate();
  dayofweek.textContent = convertToDayOfWeek(selectedDate.getDay());
}

function okBtnHandler() {
  selectedDate = new Date(
    selectingYear.value,
    selectingMonth.value,
    selectingDay.value
  );
  updateSelector();
}

okBtn.addEventListener("click", () => {
  okBtnHandler();
});
