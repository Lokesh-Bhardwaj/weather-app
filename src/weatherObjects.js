import Clear from "./media/clear.mp4";
import ClearNight from "./media/clearNight.mp4";
import Clouds from "./media/cloudy.mp4";
import Rain from "./media/rain.mp4";
import Snow from "./media/snow.mp4";
import ClearIcon from "./media/clearIcon.svg";
import ClearNightIcon from "./media/clearNightIcon.svg";
import CloudsIcon from "./media/cloudyIcon.svg";
import RainIcon from "./media/rainIcon.svg";
import DrizzleIcon from "./media/drizzleIcon.svg";
import SnowIcon from "./media/snowIcon.svg";
import ThunderIcon from "./media/thunderIcon.svg";

const mediaLinks = (state) => ({
  getBackgroundLink() {
    let videoLink = "";
    const weathercon = state.weathercon
      ? state.weathercon
      : state.getDominatingWeathericon();
    const hour = state.date.getHours();
    switch (weathercon) {
      case "Clouds":
        videoLink = `${Clouds}`;
        break;
      case "Clear":
        if (hour < 7 || hour > 20) {
          videoLink = `${ClearNight}`;
        } else {
          videoLink = `${Clear}`;
        }
        break;
      case "Snow":
        videoLink = `${Snow}`;
        break;
      case "Rain":
        videoLink = `${Rain}`;
        break;
      case "Drizzle":
        videoLink = `${Rain}`;
        break;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        videoLink = `${Clouds}`;
        break;
      default:
        alert("no weathercon set yet");
    }
    return videoLink;
  },

  getIconLink() {
    let iconLink = "";
    const callingFor = state.weathercon ? "hour" : "day";
    const weathercon = state.weathercon
      ? state.weathercon
      : state.getDominatingWeathericon();
    const hour = state.date.getHours();

    switch (weathercon) {
      case "Clouds":
        iconLink = `${CloudsIcon}`;
        break;
      case "Clear":
        if ((hour < 7 || hour > 20) && callingFor === "hour") {
          iconLink = `${ClearNightIcon}`;
        } else if (callingFor === "hour"){
          iconLink = `${ClearIcon}`;
        } else if(callingFor === "day") {
          iconLink = `${ClearIcon}`;
        }
        break;
      case "clearNight":
        iconLink = `${ClearNightIcon}`;
        break;
      case "Snow":
        iconLink = `${SnowIcon}`;
        break;
      case "Rain":
        iconLink = `${RainIcon}`;
        break;
      case "Drizzle":
        iconLink = `${DrizzleIcon}`;
        break;
      case "Thunderstorm":
        iconLink = `${ThunderIcon}`;
        break;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        iconLink = `${CloudsIcon}`;
        break;
      default:
        alert("no weathercon set yet");
    }
    return iconLink;
  },

  getBackgroundGradient() {
    let BackgroundGradient = "";
    const weathercon = state.weathercon
      ? state.weathercon
      : state.getDominatingWeathericon();
    const hour = state.date.getHours();

    switch (weathercon) {
      case "Clouds":
        BackgroundGradient =
          "rgba(161, 164, 165, 1)0%, rgba(161, 164, 165, 1) 20%, rgba(85, 85, 82, 1) 100%";
        break;
      case "Clear":
        if (hour < 7 || hour > 20) {
          BackgroundGradient =
            "rgba(49, 48, 68, 1)0%, rgba(49, 48, 68, 1) 20%,rgba(87, 64, 47, 1) 100%";
        } else {
          BackgroundGradient =
            "rgba(144, 189, 231, 1)0%, rgba(144, 189, 231, 1) 20%,rgba(209, 220, 138, 1) 100%";
        }
        break;
      case "Snow":
        BackgroundGradient =
          "rgba(226, 232, 237, 1)0%, rgba(226, 232, 237, 1) 20%,rgba(117, 116, 113, 1) 100%";
        break;
      case "Rain":
        BackgroundGradient =
          "rgba(74, 90, 72, 1)0%, rgba(74, 90, 72, 1) 20%, rgba(85, 85, 82, 1) 100%";
        break;
      case "Drizzle":
        BackgroundGradient =
          "rgba(74, 90, 72, 1)0%, rgba(74, 90, 72, 1) 20%, rgba(85, 85, 82, 1) 100%";
        break;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
      case "Thunderstorm":
        BackgroundGradient =
          "rgba(161, 164, 165, 1)0%, rgba(161, 164, 165, 1) 20%, rgba(85, 85, 82, 1) 100%";
        break;
      default:
        alert("no weathercon set yet");
    }
    return BackgroundGradient;
  },

  getBackgroundColor() {
    let BackgroundColor = "";
    const weathercon = state.weathercon
      ? state.weathercon
      : state.getDominatingWeathericon();
    const hour = state.date.getHours();

    switch (weathercon) {
      case "Clouds":
        BackgroundColor = "rgba(225, 225, 225, 1)";
        break;
      case "Clear":
        if (hour < 7 || hour > 20) {
          BackgroundColor = "rgba(241, 230, 224, 1)";
        } else {
          BackgroundColor = "rgba(253, 252, 242, 1)";
        }
        break;
      case "Snow":
        BackgroundColor = "rgba(241, 241, 241, 1)";
        break;
      case "Rain":
        BackgroundColor = "rgba(233, 241, 233, 1)";
        break;
      case "Drizzle":
        BackgroundColor = "rgba(233, 241, 233, 1)";
        break;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
      case "Thunderstorm":
        BackgroundColor = "rgba(225, 225, 225, 1)";
        break;
      default:
        alert("no weathercon set yet");
    }
    return BackgroundColor;
  },
});

const dateData = (state) => ({
  getWeekDay() {
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return week[state.date.getDay()];
  },

  getMonthAndDayDate(languageTag) {
    return state.date.toLocaleDateString(`${languageTag}`, {
      month: "long",
      day: "2-digit",
    });
  },
});

function createCurrentWeather(
  date,
  lon,
  lat,
  temperature,
  precipitation,
  humidity,
  windspeed,
  weathercon
) {
  async function getCityNameAndCountryCode() {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=61430767d31aabc20e2aa324b62006a2`
      )
        .then((response) => response.json())
        .then(
          (value) => {
            resolve(`${value[0].name}, ${value[0].country}`);
          },
          (err) => {
            reject(new Error(err));
          }
        );
    });
  }

  // if minute is one digit, a 0 gets added to the minute to show a 2 digit minute count
  function getCurrentTime() {
    return `${date.getHours()}:${
      date.getMinutes().toString().length < 2
        ? `0${date.getMinutes()}`
        : date.getMinutes()
    }`;
  }

  // Assigns the methods from mediaLinks and dataData to the returned object via spread operator
  return {
    date,
    temperature,
    precipitation,
    humidity,
    windspeed,
    weathercon,
    getCityNameAndCountryCode,
    getCurrentTime,
    ...mediaLinks({
      date,
      temperature,
      precipitation,
      humidity,
      windspeed,
      weathercon,
      getCityNameAndCountryCode,
      getCurrentTime,
    }),
    ...dateData({
      date,
      temperature,
      precipitation,
      humidity,
      windspeed,
      weathercon,
      getCityNameAndCountryCode,
      getCurrentTime,
    }),
  };
}

function createHourObject(hourData) {
  // checks if hourData.dt is already a date object, true when an hourObject gets created out of currentWeather Data
  const date = !hourData.dt.getMinutes
    ? new Date(hourData.dt * 1000)
    : hourData.dt;
  const time = `${date.getHours()}:${
    date.getMinutes().toString().length < 2
      ? `0${date.getMinutes()}`
      : date.getMinutes()
  }`;
  const temperature = hourData.main.temp;
  const precipitation = Math.round(hourData.pop * 100);
  const { humidity } = hourData.main;
  const windspeed = hourData.wind.speed;
  const weathercon = hourData.weather[0].main;

  return {
    date,
    time,
    temperature,
    precipitation,
    humidity,
    windspeed,
    weathercon,
    ...mediaLinks({
      date,
      time,
      temperature,
      precipitation,
      humidity,
      windspeed,
      weathercon,
    }),
  };
}

function createDayObject(data) {
  const { date } = data[0];

  function getMinTemp() {
    const coldestHour = data.reduce(
      (accum, current) =>
        accum.temperature < current.temperature ? accum : current,
      data[0]
    );
    return coldestHour.temperature;
  }

  function getMaxTemp() {
    const hottestHour = data.reduce(
      (accum, current) =>
        accum.temperature > current.temperature ? accum : current,
      data[0]
    );
    return hottestHour.temperature;
  }

  function getDominatingWeathericon() {
    const thunderstrom = data.filter(
      (element) => element.weathercon === "Thunderstorm"
    );
    const drizzle = data.filter((element) => element.weathercon === "Drizzle");
    const rain = data.filter((element) => element.weathercon === "Rain");
    const snow = data.filter((element) => element.weathercon === "Snow");
    const clear = data.filter((element) => {
      const hour = element.date.getHours();
      if (hour > 7 || hour < 20) {
        return element.weathercon === "Clear";
      }
    });
    const clearNight = data.filter((element) => {
      const hour = element.date.getHours();
      if (hour < 7 || hour > 20) {
        return element.weathercon === "Clear";
      }
    });
    const clouds = data.filter((element) => element.weathercon === "Clouds");
    const mist = data.filter((element) => element.weathercon === "Mist");
    const smoke = data.filter((element) => element.weathercon === "Smoke");
    const haze = data.filter((element) => element.weathercon === "Haze");
    const dust = data.filter((element) => element.weathercon === "Dust");
    const fog = data.filter((element) => element.weathercon === "Fog");
    const sand = data.filter((element) => element.weathercon === "Sand");
    const ash = data.filter((element) => element.weathercon === "Ash");
    const squall = data.filter((element) => element.weathercon === "Squall");
    const tornado = data.filter((element) => element.weathercon === "Tornado");
    const sortedWeather = [
      thunderstrom,
      drizzle,
      rain,
      snow,
      clear,
      clearNight,
      clouds,
      mist,
      smoke,
      haze,
      dust,
      fog,
      sand,
      ash,
      squall,
      tornado,
    ].sort((a, b) => b.length - a.length);
    return sortedWeather[0][0].weathercon;
  }

  return {
    date,
    data,
    getMinTemp,
    getMaxTemp,
    getDominatingWeathericon,
    ...dateData({
      date,
      data,
      getMinTemp,
      getMaxTemp,
      getDominatingWeathericon,
    }),
    ...mediaLinks({
      date,
      data,
      getMinTemp,
      getMaxTemp,
      getDominatingWeathericon,
    }),
  };
}

export { createCurrentWeather, createHourObject, createDayObject };
