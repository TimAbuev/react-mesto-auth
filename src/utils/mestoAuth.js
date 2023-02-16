export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({ message: "Ошибка на стороне сервера", res })
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

// export const authorize = (login, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // Accept: "application/json",
//     },
//     body: JSON.stringify({ login, password }),
//   })
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject({ message: "Ошибка на стороне сервера", res })
//   })
//   .then((res) => {
//     return res;
//   })
//   .catch((err) => console.log(err));
// };





