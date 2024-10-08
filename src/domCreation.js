/* eslint-disable no-use-before-define */
import { kelvinToUnit, speedToUnit } from "./helperFunctions";

import { daysForecast, currentWeather, unit } from "./globalVar";

import { changeToggleColor, changeToggleColorOnPageLoad, fadeIn, fadeOut, setVideoEventListeners, smallLoadIcon } from "./transitions";

import ClearIcon from "./media/clearIcon.svg";
import GithubIcon from "./media/githubIcon.svg";
import LinkedinIcon from "./media/linkedinIcon.svg";
import ClockIcon from "./media/clockIcon.svg";
import SearchIcon from "./media/searchIcon.svg";

function createHourElements(day, dayIndex) {
  let htmlString = ``;
  day.data.forEach((hour, i) => {
    if (i !== 0) {
      htmlString += `<div class="hourData" data-index-hour="${i}" data-index-day="${dayIndex}">
                            <p class="time">${hour.time}</p>
                            <img class="icon" src="${hour.getIconLink()}" width="70" height="70"/>
                            <p class="temp">${kelvinToUnit(
                              hour.temperature
                            )}</p>
                        </div>`;
    } else {
      htmlString += `<div class="hourData selected" data-index-hour="${i}" data-index-day="${dayIndex}">
                            <p class="time">${hour.time}</p>
                            <img class="icon" src="${hour.getIconLink()}" width="70" height="70"/>
                            <p class="temp ${unit}">${kelvinToUnit(
        hour.temperature
      )}</p>
                        </div>`;
    }
  });
  return htmlString;
}

function createDayElements() {
  let htmlString = ``;
  daysForecast.forEach((day, i) => {
    htmlString += `<div class="dayData${
      i !== 0 ? "" : " selected"
    }" data-index-day="${i}" style="background-color: ${currentWeather.getBackgroundColor()};">
                      <div class="metaAndIcon">
                        <div class="meta">
                            <p class="weekday">${
                              day.getWeekDay() !== currentWeather.getWeekDay()
                                ? day.getWeekDay()
                                : "Today"
                            }</p>
                            <p class="date">${day.getMonthAndDayDate("DE")}</p>
                        </div>
                        <img src="${day.getIconLink()}" width="80" height="80"/>
                      </div>
                      <div class="tempScale">
                      ${
                        day.data.length > 1
                          ? `<p class="temp min">${kelvinToUnit(
                              day.getMinTemp()
                            )}</p>
                      <p class="spacer">-</p>
                      <p class="temp max">${kelvinToUnit(day.getMaxTemp())}</p>`
                          : `<p class="temp">${kelvinToUnit(
                              day.data[0].temperature
                            )}</p>`
                      }
                      </div>
                    </div>`;
  });
  return htmlString;
}

async function pageLoad() {
  const hoursHtml = createHourElements(daysForecast[0], 0);
  const daysHtml = createDayElements();
  const cityAndCountry = await currentWeather.getCityNameAndCountryCode();
  changeToggleColorOnPageLoad(currentWeather.weathercon, currentWeather.date.getHours());
  document.querySelector("body").innerHTML = `
  <div class="videoContainer">
    <video class ="video" autoplay muted loop id="myVideo">
      <source src="${currentWeather.getBackgroundLink()}" type="video/mp4">
    </video>
    <div class="fade"><div class="lds-ripple"><div></div><div></div></div></div>
  </div>
    <div class="overlay" style="background: linear-gradient(${currentWeather.getBackgroundGradient()});">
      <header>
        <div class="logo">
            <img src="${ClearIcon}" width="50" height="50">
            <p class="siteName">Weather App</p>
        </div>
        <div class="wrapperP">
                <div class="wrapper">
                    <div class="searchIcon">
                        <img src="${SearchIcon}" width="35" height="35" id="searchIcon"/>
                    </div>
                    <input class="search" lang="DE" type="search" placeholder="Stadt, Landcode(DE)"/>
                    <div class="suggestions hide">
                    </div>
                </div>
        </div>
        <div class="toggleSwitch">
                <input type="checkbox" class="hover-enabled ${unit}" id="toggleSwitch" ${
    unit === "fahrenheit" ? "checked" : ""
  }/>
                <label for="toggleSwitch"></label>
        </div>
        <div class="socials">
            <a href="https://github.com/Lokesh-Bhardwaj" target="_blank" rel="noopener noreferrer"><p class="myName">By Lokesh Sharma</p></a>
            <a href="https://github.com/Lokesh-Bhardwaj" target="_blank" rel="noopener noreferrer">
              <div class="githubBackground">
                <img src="${GithubIcon}" width="35" height="35"/>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/lokesh-sharma7671/" target="_blank" rel="noopener noreferrer">
              <img src="${LinkedinIcon}" width="30" height="30"/>
            </a>
        </div>
      </header>
      <div class="detailed" style="background-color: ${currentWeather.getBackgroundColor()};">
        <div class="selectedWeather">
          <div class="weatherData">
            <div class="iconAndTemp">
                <img src="${currentWeather.getIconLink()}" width="85" height="75" class="icon selected"/>
                <p class="temp">${kelvinToUnit(currentWeather.temperature)}</p>
            </div>
            <div class="text">
                <p lang="EN">Precipitation:</p>
                <p lang="EN">Humidity:</p>
                <p lang="EN">Wind Speed:</p>

              </div>
            <div class="variables">
                <p class="pop">${currentWeather.precipitation}%</p>
                <p class="humid">${currentWeather.humidity}%</p>
                <p class="wind metric">${speedToUnit(
                  currentWeather.windspeed
                )}</p>
            </div>
          </div>
          <div class="metaData">
            <p class="date">${currentWeather.getWeekDay()}, ${currentWeather.getMonthAndDayDate(
    "DE"
  )}</p>
            <p class="city country">${cityAndCountry}</p>
            <div class="time">
                <img src="${ClockIcon}" width="30" height="30"/>
                <p class="time">${currentWeather.getCurrentTime()}</p>
            </div>
          </div>
      </div>
      <div class="hourSection">
        ${hoursHtml}
      </div>
    
    </div>
      <div class="daySlider">
        <div class="backArrow" style="border-right-color: ${currentWeather.getBackgroundColor()};">

        </div>
        <div class="daySection">
          ${daysHtml}
        </div>
      <div class="forwardArrow" style="border-left-color: ${currentWeather.getBackgroundColor()};">

    </div>
</div>
    </div>
    <template id="error">
      <div id="errorWrapper">
        <p id="errorHeading">Location Not Found!</p>
        <p id="errorText">Sorry, the server didn't find any locations for your query, please check the spelling and try again.</p>
      </div>
    </template>`;
    return "test";
}

function addEventListenersToElements(elements, handlerFunction) {
  // eslint-disable-next-line no-restricted-syntax
  for (const element of elements) {
    element.addEventListener("click", handlerFunction);
  }
}

function removeEventListenersFromElements(elements, handlerFunction) {
  // eslint-disable-next-line no-restricted-syntax
  for (const element of elements) {
    element.removeEventListener("click", handlerFunction);
  }
}

function changeBackgroundVideo(hourData) {
  const backgroundVideo = document.querySelector("video");
  const backgroundSource = document.querySelector("source");
  backgroundSource.src = `${hourData.getBackgroundLink()}`;
  backgroundVideo.load();
}

function changeBackgroundColors(hourData) {
  const dayCards = document.getElementsByClassName("dayData");
  const overlay = document.querySelector(".overlay");
  const detailedCard = document.querySelector(".detailed");
  const forwardArrow = document.querySelector(".forwardArrow");
  const backArrow = document.querySelector(".backArrow");
  // eslint-disable-next-line no-restricted-syntax
  for (const card of dayCards) {
    card.style.backgroundColor = hourData.getBackgroundColor();
  }
  overlay.style.background = `linear-gradient(${hourData.getBackgroundGradient()})`;
  detailedCard.style.backgroundColor = `${hourData.getBackgroundColor()}`;
  forwardArrow.style.borderLeftColor = `${hourData.getBackgroundColor()}`;
  backArrow.style.borderRightColor = `${hourData.getBackgroundColor()}`;
}

async function updateSelectedWeather(event) {
  smallLoadIcon()
  await fadeOut()
  const icon = document.querySelector(".iconAndTemp .icon");
  const temp = document.querySelector(".iconAndTemp .temp");
  const pop = document.querySelector(".pop");
  const humid = document.querySelector(".humid");
  const wind = document.querySelector(".wind");
  const selectedDate = document.querySelector(".selectedWeather .date");
  const selectedTime = document.querySelector(".selectedWeather .time .time");
  const { indexDay } = event.target.dataset;
  const { indexHour } = event.target.dataset;
  const hourData = indexHour
    ? daysForecast[indexDay].data[indexHour]
    : daysForecast[indexDay].data[0];
  const day = daysForecast[indexDay];
  changeBackgroundVideo(hourData);
  changeBackgroundColors(hourData);
  changeToggleColorOnPageLoad(hourData.weathercon,hourData.date.getHours())
  icon.src = `${hourData.getIconLink()}`;
  temp.innerText = kelvinToUnit(hourData.temperature);
  pop.innerText = `${hourData.precipitation}%`;
  humid.innerText = `${hourData.humidity}%`;
  wind.innerText = `${speedToUnit(hourData.windspeed)}`;
  selectedDate.innerText = `${day.getWeekDay()}, ${day.getMonthAndDayDate(
    "DE"
  )}`;
  selectedTime.innerText = `${hourData.time}`;
  setVideoEventListeners();
}

function updateHourSection(event) {
  let hourElements = document.querySelector(".hourSection").children;
  removeEventListenersFromElements(hourElements, updateSelectedWeather);
  const dayIndex = event.target.dataset.indexDay;
  const hoursHtml = createHourElements(daysForecast[dayIndex], dayIndex);
  document.querySelector(".hourSection").innerHTML = hoursHtml;
  hourElements = document.querySelector(".hourSection").children;

  addEventListenersToElements(hourElements, updateSelectedWeather);
  addEventListenersToElements(hourElements, elevateSelectedElement);
}

async function updateDetailedSection(event) {

  await updateSelectedWeather(event);
  updateHourSection(event);

}

// timeout is necessary
function elevateSelectedElement(e) {
  const clickedElementClass = e.target.classList.item(0);
  const elevatedElement = document.querySelector(
    `.${clickedElementClass}.selected`
  );
  if (elevatedElement) {
    elevatedElement.classList.remove("selected");
  }
  e.target.classList.add("selected");
}

function addListenersToHourAndDataElements() {
  const hourElements = document.querySelector(".hourSection").children;
  const dayElements = document.querySelector(".daySection").children;
  addEventListenersToElements(hourElements, updateSelectedWeather);
  addEventListenersToElements(dayElements, updateDetailedSection);
  addEventListenersToElements(dayElements, elevateSelectedElement);
  addEventListenersToElements(hourElements, elevateSelectedElement);
}

export {
  pageLoad,
  updateSelectedWeather,
  updateDetailedSection,
  addEventListenersToElements,
  addListenersToHourAndDataElements,
  removeEventListenersFromElements,
  elevateSelectedElement,
};
