const BASE_URL = "http://localhost:3000";

export const getTodayHabits = () => {
  return fetch(`${BASE_URL}/habits/today`).then((res) => res.json());
};

export const updateHabitDone = (id, done) => {
  return fetch(`${BASE_URL}/habits/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done }),
  }).then((res) => res.json());
};

export const createHabit = (title) => {
  return fetch(`${BASE_URL}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
};

export const getAllHabits = () => {
  return fetch(`${BASE_URL}/habits`).then((res) => res.json());
};
