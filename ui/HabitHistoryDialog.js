import { getAllHabits } from "../api/habits-api";

export class HabitHistoryDialog {
  static instance;
  constructor() {
    if (HabitHistoryDialog.instance) {
      throw new Error("Use HabitHistoryDialog.getInstance() instead");
    }
  }

  static getInstance() {
    if (!HabitHistoryDialog.instance) {
      HabitHistoryDialog.instance = new HabitHistoryDialog();
    }
    return HabitHistoryDialog.instance;
  }

  _open = false;

  async init() {
    this.element = document.querySelector("#open-history");
    this.dialog = document.getElementById("habits-history-dialog");
    this.tableWrapper = document.querySelector("#table-wrapper");

    this.element.addEventListener("click", () => {
      this.open = true;
    });

    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (this.open === false) return;
      this.open = false;
    });
  }

  get open() {
    return this._open;
  }

  set open(newOpen) {
    this._open = newOpen;
    if (newOpen) {
      this.dialog.setAttribute("open", "");
      this.render();
    } else {
      this.dialog.removeAttribute("open");
    }
  }

  async render() {
    const habits = await getAllHabits();
    const lowestDate = getLowestDate(habits);
    const dates = getDatesRange(lowestDate);
    const table = document.createElement("table");

    table.appendChild(createTableHeader(dates));

    createTableRows(habits, dates).forEach((row) => table.appendChild(row));

    this.tableWrapper.innerHTML = "";
    this.tableWrapper.appendChild(table);
  }
}

const createTableRows = (habit, dates) => {
  // const rows = [];

  return habit.map((habit) => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.textContent = habit.title;
    row.appendChild(cell);

    dates.forEach((date) => {
      const dataCell = document.createElement("td");
      const doneDay = habit.daysDone[date];
      dataCell.textContent = doneDay ? "✅" : "❌";
      row.appendChild(dataCell);
    });
    return row;
  });
};

const createTableHeader = (dates) => {
  const headerRow = document.createElement("tr");
  const headerCell = document.createElement("th");
  headerCell.textContent = "Habit";
  headerRow.appendChild(headerCell);

  dates.forEach((date) => {
    const dateCell = document.createElement("th");
    dateCell.textContent = date;
    headerRow.appendChild(dateCell);
  });

  return headerRow;
};

const getLowestDate = (habits) => {
  return habits
    .reduce((acc, habit) => {
      return [...acc, ...Object.keys(habit.daysDone)];
    }, [])
    .map((date) => new Date(date))
    .sort((a, b) => a - b)[0];
};

const getDatesRange = (lowestDate) => {
  const diff = Math.ceil((new Date() - lowestDate) / (1000 * 60 * 60 * 24));
  return Array.from({ length: diff }).map((_, index) => {
    const date = new Date(lowestDate);
    date.setDate(date.getDate() + index);
    return date.toISOString().split("T")[0];
  });
};
