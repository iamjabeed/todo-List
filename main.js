const form = document.querySelector("#form");
const input = document.querySelector("#input");
const ul = document.querySelector(".list");
// GETTING DATA FROM LOCAL STORAGE
let toDos = JSON.parse(localStorage.getItem("toDos"));
if (toDos) {
    toDos.forEach((task) => {
      toDoList(task);
    });
  }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  toDoList();
});

function toDoList(task) {
  let inputVal = input.value;
  if (task) {
    inputVal = task.name;
  }

  const liEl = document.createElement("li");
  if(task && task.checked){
    liEl.classList.add("checked");
  }

  liEl.innerText = inputVal;
  ul.appendChild(liEl);
  input.value = "";
  const checkBtn = document.createElement("div");
  checkBtn.innerHTML = `
  <i class="fa-solid fa-square-check">
  `;
  liEl.appendChild(checkBtn);
  const trashBtn = document.createElement("div");
  trashBtn.innerHTML = `
  </i><i class="fa-solid fa-trash"></i>
  `;
  liEl.appendChild(trashBtn);

  checkBtn.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtn.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}
    // STORING DATA TO LOCAL STORAGE
function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  toDos = [];
  liEls.forEach((liEl) => {
    toDos.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("toDos", JSON.stringify(toDos));
}
