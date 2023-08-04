/* eslint-disable no-restricted-globals */

export const getAllCities = () =>
  fetch(`${process.env.REACT_APP_API_URL}/cities`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((data) => {
      if (data.status == 401) {
        location.href = "/login";
        return;
      }
      return data.json();
    })
    .catch((err) => console.log(err));
export const createCity = (body) =>
  fetch(`${process.env.REACT_APP_API_URL}/cities`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
    method: "POST",
  })
    .then((data) => {
      if (data.status == 401) {
        location.href = "/login";
        return;
      }
      return data.status;
    })
    .catch((err) => console.log(err));
export const searchCity = (city) =>
  fetch(
    `${process.env.REACT_APP_API_URL}/open-weather-api/search?city=${city}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
    .then((data) => {
      if (data.status == 401) {
        location.href = "/login";
        return;
      }
      return data.json();
    })
    .catch((err) => console.log(err));
export const deleteCity = (id) =>
  fetch(`${process.env.REACT_APP_API_URL}/cities/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "DELETE",
  })
    .then((data) => {
      if (data.status == 401) {
        location.href = "/login";
        return;
      }
      return data.status;
    })
    .catch((err) => console.log(err));
