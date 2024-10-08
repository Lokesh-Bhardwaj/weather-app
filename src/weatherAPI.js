/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import { locationNotFound } from "./catchErrors";

function getCityCoordinates(cityName, country) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q={${cityName}},{${country}}&appid=api`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((value) => {
        resolve([value[0].lat, value[0].lon]);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getMatchingCities(cityName) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q={${cityName}}&limit=5&appid=61430767d31aabc20e2aa324b62006a2`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getCurrentWeather(city, country) {
  if (arguments.length === 2) {
    return new Promise((resolve, reject) => {
      getCityCoordinates(city, country).then((coordinates) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=61430767d31aabc20e2aa324b62006a2`
        )
          .then((response) => response.json())
          .then((value) => Promise.resolve(value))
          .then((value) => {
            resolve(value);
          })
          .catch((err) => {
            reject(err);
          });
      }).catch(()=>{
        locationNotFound();
      })
    });
  } else if (arguments.length === 1) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city[0]}&lon=${city[1]}&appid=61430767d31aabc20e2aa324b62006a2`
      )
        .then((response) => response.json())
        .then((value) => Promise.resolve(value))
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

function getFiveDayForecast(city, country) {
  if (arguments.length === 2) {
    return new Promise((resolve, reject) => {
      getCityCoordinates(city, country).then((coordinates) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=61430767d31aabc20e2aa324b62006a2`
        )
          .then((response) => response.json())
          .then((value) => Promise.resolve(value))
          .then((value) => {
            resolve(value);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((reason)=>{
        locationNotFound();
      })
    });
  } else if (arguments.length === 1) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city[0]}&lon=${city[1]}&appid=61430767d31aabc20e2aa324b62006a2`
      )
        .then((response) => response.json())
        .then((value) => Promise.resolve(value))
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export {getCityCoordinates, getMatchingCities, getCurrentWeather, getFiveDayForecast };
