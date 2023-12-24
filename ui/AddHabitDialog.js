import { createHabit } from "../api/habits-api";
import { TodayHabits } from "./TodayHabits";

export class AddHabitDialog {
  static instance;
  constructor() {
    if (AddHabitDialog.instance) {
      throw new Error("Use AddHabitDialog.getInstance() instead");
    }
  }

  static getInstance() {
    if (!AddHabitDialog.instance) {
      AddHabitDialog.instance = new AddHabitDialog();
    }
    return AddHabitDialog.instance;
  }

  _open = false;

  async init() {
    this.element = document.querySelector("#add-new-habit");
    this.dialog = document.getElementById("add-habit-dialog");
    this.habitForm = document.getElementById("add-habit-form");

    this.element.addEventListener("click", () => {
      this.open = true;
    });

    this.habitForm.addEventListener("submit", (event) => {
      event.preventDefault();

      this.handleSubmit(event);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (this.open === false) return;
      this.open = false;
    });
  }

  async handleSubmit(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");

    try {
      await createHabit(title);

      TodayHabits.getInstance().refresh();
      this.dialog.removeAttribute("open");
    } catch (error) {
      alert("Failed to create habits");
    }
  }

  get open() {
    return this._open;
  }

  set open(newOpen) {
    this._open = newOpen;
    if (newOpen) {
      this.dialog.setAttribute("open", "");
    } else {
      this.dialog.removeAttribute("open");
    }
  }
}
