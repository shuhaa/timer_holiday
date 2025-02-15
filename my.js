let body = document.querySelector("body");

let inputDate = document.querySelector("#inputDate");
let inputTime = document.querySelector("#inputTime");
let submitDate = document.querySelector("#submitDate");
let changeButton = document.querySelector("#changeButton");

let textDay = document.querySelector("#textDay");
let divImg = document.querySelector("#divImg");

function startCount(inputDateValue) {
  let interval = setInterval(function () {
    let currentTime = Date.now();
    let restMills = inputDateValue.getTime() - currentTime;
    if (restMills <= 0) {
      clearInterval(interval);
      textDay.textContent = "Ура, отпуск";
      let img = document.createElement("img");
      img.src = "./images/animal.jpg";
      divImg.appendChild(img);
      return;
    }

    let restDays = Math.floor(restMills / (1000 * 60 * 60 * 24));
    let restHours = Math.floor((restMills / (1000 * 60 * 60)) % 24);
    let restMinutes = Math.floor((restMills / (1000 * 60)) % 60);
    let restSeconds = Math.floor((restMills / 1000) % 60);
    textDay.textContent = `${restDays} дн. : ${restHours} ч. : ${restMinutes} мин. : ${restSeconds} сек.`;
  }, 1000);
}

if (localStorage.getItem("key")) {
  let key = JSON.parse(localStorage.getItem("key"));
  let inputDateValue = new Date(key);

  if (inputDateValue > Date.now()) {
    startCount(inputDateValue);
  }
}

submitDate.addEventListener("click", function () {
  location.reload();
  let inputDateValue = new Date(inputDate.value);

  if (inputDateValue > Date.now()) {
    localStorage.setItem("key", JSON.stringify(inputDateValue));
    startCount(inputDateValue);
  } else {
    textDay.textContent = "Введите дату в будущем";
  }
});

changeButton.addEventListener("click", function () {
  location.reload();
  localStorage.removeItem("key");
  let newDate = new Date(inputDate.value);
  localStorage.setItem("key", JSON.stringify(newDate));
  if (newDate > Date.now()) {
    localStorage.setItem("key", JSON.stringify(newDate));
    startCount(newDate);
  } else {
    textDay.textContent = "Введите дату в будущем";
  }
});
