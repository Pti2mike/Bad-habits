import "./style.css";

const getTodayHabits = () => {
  return fetch("http://localhost:3000/habits/today").then((res) => res.json());
};

class HabitSquare {
  constructor(id, title, done) {
    this.id = id;
    this.title = title;
    this.done = done;

    this.element = document.createElement("button");

    this.element.classList.add("habit-square");
    if (done) {
      this.element.classList.add("habit-done");
    }

    const titleElement = document.createElement("span");
    titleElement.innerText = title;
    this.element.appendChild(titleElement);

    const doneElement = document.createElement("span");
    doneElement.innerText = done ? " ✅" : " ❌";
    this.element.appendChild(doneElement);
  }
}

class TodayHabits {
  constructor() {}

  habitsSquare = [];

  async init() {
    this.element = document.querySelector("#today-habits");
    console.log(this);
    this.refresh();
  }

  async refresh() {
    this.todayHabits = await getTodayHabits();
    this.render();
  }

  async render() {
    this.element.innerHTML = "";
    this.habitsSquare = this.todayHabits.map((habit) => {
      const habitSquare = new HabitSquare(habit.id, habit.title, habit.done);
      this.element.appendChild(habitSquare.element);
    });
  }
}

const todayHabits = new TodayHabits();

todayHabits.init();
