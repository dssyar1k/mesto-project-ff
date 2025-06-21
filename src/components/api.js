const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-40",
  headers: {
    authorization: "65d05968-44e2-4207-a255-e013e55c4715",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserAPI = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponseData);
};

const getCardsAPI = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponseData);
};

const patchUserAPI = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(getResponseData);
};

const postAddCardAPI = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(getResponseData);
};

const deleteCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

const addLikeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponseData);
};

const deleteLikeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

const editUserProfileAPI = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  }).then(getResponseData);
};

export {
  getUserAPI,
  getCardsAPI,
  patchUserAPI,
  postAddCardAPI,
  deleteCardAPI,
  addLikeCardAPI,
  deleteLikeCardAPI,
  editUserProfileAPI,
};
