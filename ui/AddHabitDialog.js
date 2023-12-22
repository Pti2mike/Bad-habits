export class AddHabitDialog {
  constructor() {}

  async init() {
    this.element = document.querySelector("#add-new-habit");
    this.openDialog();
  }

  async openDialog() {
    const dialog = document.getElementById("add-habit-dialog");

    this.element.addEventListener("click", () => {
      dialog.showModal();
    });

    this.registerHabit();
  }

  async closeDialog() {
    const dialog = document.getElementById("add-habit-dialog");
    const close = document.getElementById("close");

    close.addEventListener("click", () => {
      dialog.close();
    });
  }

  async registerHabit() {
    const dialog = document.getElementById("add-habit-dialog");
    let habitForm = document.getElementById("add-habit-form");

    habitForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let newHabit = document.getElementById("title");

      let habitToAdd = newHabit.value;

      const createHabit = (title) => {
        return fetch(`http://localhost:3000/habits`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }).then((res) => res.json());
      };

      createHabit(habitToAdd);

      newHabit.value = "";
      dialog.close();
    });
  }
}
