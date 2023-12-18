import "./style.css";

// Test liste

let habits = [
  {
    id: 1,
    title: "Work 2 hours",
    daysDone: {
      "2023-01-06": true,
      "2023-08-11": false,
    },
  },
  {
    id: 2,
    title: "Do the dish",
    daysDone: {
      "2023-03-05": false,
      "2023-09-11": true,
    },
  },
  {
    id: 3,
    title: "Do some workout",
    daysDone: {
      "2023-12-05": true,
      "2023-12-10": true,
      "2023-12-15": true,
    },
  },
  {
    id: 4,
    title: "Create a portfolio",
    daysDone: {
      "2023-12-02": false,
      "2023-12-06": false,
    },
  },
];

let list = document.getElementById("myList");
// for (let i = 0; i < habits.length; i++) {
//   console.log(habits[i].title);
//   let li = document.createElement("li");
//   li.innerText = habits[i].title;
//   list.appendChild(li);
// }

let ul = `<ul>${habits
  .map(
    (habit) =>
      `<li class="habit">${habit.title} <input type="checkbox" value="❌"></li>`
  )
  .join("")}</ul>`;
list.innerHTML = ul;

const addNewHabit = document.getElementById("add");
const dialog = document.getElementById("dial");
const close = document.getElementById("close");
let habitForm = document.getElementById("habitForm");
const test = "test";

addNewHabit.addEventListener("click", () => {
  console.log(`${test}`);
  dialog.showModal();
});

close.addEventListener("click", () => {
  dialog.close();
});

habitForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let newHabit = document.getElementById("habit");

  if (!newHabit.value) {
    alert("Habit necessary!!!");
    throw new Error("Habit necessary!!!");
  }

  console.log(`Please see your new habit: ${newHabit.value}`);
  dialog.close();
});
