let body = document.querySelector("body");

let inputDate = document.querySelector("#inputDate");

let changeButton = document.querySelector("#changeButton");

let textDay = document.querySelector("#textDay");
let textHours = document.querySelector("#textHours");
let textMinute = document.querySelector("#textMinute");
let textSecond = document.querySelector("#textSecond");
let pDay = document.querySelector("#pDay");
let pHours = document.querySelector("#pHours");
let pMinute = document.querySelector("#pMinute");
let pSecond = document.querySelector("#pSecond");
let h3 = document.querySelector("#h3");

function startCount(inputDateValue) {
  let interval = setInterval(function () {
    let currentTime = Date.now();
    let restMills = inputDateValue.getTime() - currentTime;

    if (restMills <= 0) {
      clearInterval(interval);

      $(document).ready(function () {
        if ($.fn.fireworks) {
          $(".sec").fireworks({
            sound: true,
            width: "100%",
            height: "100%",
            opacity: 0.6,
          });

          setTimeout(function () {
            $(".sec").fireworks("destroy");
            location.reload();
          }, 10000);
        } else {
          console.log("Fireworks plugin not loaded correctly");
        }
      });

      return;
    }

    let restDays = Math.floor(restMills / (1000 * 60 * 60 * 24));
    let restHours = Math.floor((restMills / (1000 * 60 * 60)) % 24);
    let restMinutes = Math.floor((restMills / (1000 * 60)) % 60);
    let restSeconds = Math.floor((restMills / 1000) % 60);
    //делаем время строками
    let restDaysLenght = String(restDays);
    let restHoursLenght = String(restHours);
    let restMinutesLenght = String(restMinutes);
    let restSecondsLenght = String(restSeconds);
    // текст к дням
    if (restDaysLenght[restDaysLenght.length - 1] == "1") {
      pDay.textContent = ` день`;
    } else if (
      restDaysLenght[restDaysLenght.length - 1] == "2" ||
      restDaysLenght[restDaysLenght.length - 1] == "3" ||
      restDaysLenght[restDaysLenght.length - 1] == "4"
    ) {
      pDay.textContent = `дня`;
    } else {
      pDay.textContent = `дней`;
    }
    // текст к часам
    if (restHoursLenght[restHoursLenght.length - 1] == "1") {
      pHours.textContent = `час`;
    } else if (
      restHoursLenght[restHoursLenght.length - 1] == "2" ||
      restHoursLenght[restHoursLenght.length - 1] == "3" ||
      restHoursLenght[restHoursLenght.length - 1] == "4"
    ) {
      pHours.textContent = `часа`;
    } else {
      pHours.textContent = `часов`;
    }
    // текст к минутам
    if (restMinutesLenght[restMinutesLenght.length - 1] == "1") {
      pMinute.textContent = `минута`;
    } else if (
      restMinutesLenght[restMinutesLenght.length - 1] == "2" ||
      restMinutesLenght[restMinutesLenght.length - 1] == "3" ||
      restMinutesLenght[restMinutesLenght.length - 1] == "4"
    ) {
      pMinute.textContent = `минуты`;
    } else {
      pMinute.textContent = `минут`;
    }
    // текст к секундам
    if (restSecondsLenght[restSecondsLenght.length - 1] == "1") {
      pSecond.textContent = `секунда`;
    } else if (
      restSecondsLenght[restSecondsLenght.length - 1] == "2" ||
      restSecondsLenght[restSecondsLenght.length - 1] == "3" ||
      restSecondsLenght[restSecondsLenght.length - 1] == "4"
    ) {
      pSecond.textContent = `секунды`;
    } else {
      pSecond.textContent = `секунд`;
    }
    // выводим время

    textDay.textContent = `${restDays} `;
    textHours.textContent = `${restHours}`;
    textMinute.textContent = `${restMinutes}`;
    textSecond.textContent = `${restSeconds} `;
  }, 1000);
}

if (localStorage.getItem("key")) {
  let key = JSON.parse(localStorage.getItem("key"));
  let inputDateValue = new Date(key);

  if (inputDateValue > Date.now()) {
    startCount(inputDateValue);
  }
}

let submitDate = document.querySelector("#submitDate");
submitDate.addEventListener("click", function () {
  let inputDateValue = new Date(inputDate.value);
  if (inputDateValue > Date.now()) {
    localStorage.setItem("key", JSON.stringify(inputDateValue));
    startCount(inputDateValue);
    location.reload();
  } else {
    h3.textContent = "Введите дату в будущем";
  }
});

changeButton.addEventListener("click", function () {
  localStorage.removeItem("key");
  let newDate = new Date(inputDate.value);
  localStorage.setItem("key", JSON.stringify(newDate));
  if (newDate > Date.now()) {
    startCount(newDate);
    location.reload();
  } else {
    h3.textContent = "Введите дату в будущем";
  }
});

$(document).ready(function () {
  $(".slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    centerPadding: "50px",
    autoplay: true,
    autoplaySpeed: 2000,
    focusOnSelect: true,
  });
  $(".slick-arrow").text("");
});
