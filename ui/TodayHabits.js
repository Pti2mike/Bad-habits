import { getTodayHabits, updateHabitDone } from "../api/habits-api";
import { HabitSquare } from "./HabitSquare";

export class TodayHabits {
  static instance;
  constructor() {
    if (TodayHabits.instance) {
      throw new Error("Use TodayHabits.getInstance() instead");
    }
  }

  static getInstance() {
    if (!TodayHabits.instance) {
      TodayHabits.instance = new TodayHabits();
    }
    return TodayHabits.instance;
  }

  habitsSquare = [];

  async init() {
    this.element = document.querySelector("#today-habits");
    this.refresh();
  }

  toggle = (event) => {
    const habitsSquare = event.currentTarget;
    this.toggleDone(habitsSquare.id, habitsSquare.done);
  };

  async refresh() {
    this.habitsSquare.forEach((habitsSquare) => {
      habitsSquare.removeEventListener("toggle", this.toggle);
    });
    try {
      this.todayHabits = await getTodayHabits();
      this.render();
    } catch {
      alert("Impossible to get habits");
    }
  }

  async toggleDone(id, done) {
    try {
      await updateHabitDone(id, !done);
      this.refresh();
    } catch {
      alert("Impossible to update habit");
    }
  }

  async render() {
    this.element.innerHTML = "";
    this.habitsSquare = this.todayHabits.map((habit) => {
      const habitSquare = new HabitSquare(habit.id, habit.title, habit.done);
      habitSquare.addEventListener("toggle", this.toggle);
      this.element.appendChild(habitSquare.element);
      return habitSquare;
    });
  }
}
