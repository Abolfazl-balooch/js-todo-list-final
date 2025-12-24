let todoInput = document.querySelector("#todoInput");
let addBtn = document.querySelector("#addBtn");
let todoList = document.querySelector("#todoList");
let filterBtns = document.querySelectorAll(".filter");
let statsText = document.querySelector("#stats");
let clearBtn = document.querySelector("#clearCompleted");

let myTodos;

if (localStorage.getItem("todos")) {
  myTodos = JSON.parse(localStorage.getItem("todos"));
} else {
  myTodos = [];
}

let filterType = "all";

/*  add  */
addBtn.addEventListener("click", function () {

  if (todoInput.value === "") {
    alert("Todo is empty");
    return;
  }

  let todoItem = {
    id: Date.now(),
    text: todoInput.value,
    completed: false
  };

  myTodos = [...myTodos, todoItem];
  localStorage.setItem("todos", JSON.stringify(myTodos));

  todoInput.value = "";
  showTodos();
});

/* show todos */
function showTodos() {
  todoList.innerHTML = "";

  let showList = myTodos;

  if (filterType === "active") {
    showList = myTodos.filter(function (item) {
      return item.completed === false;
    });
  }

  if (filterType === "completed") {
    showList = myTodos.filter(function (item) {
      return item.completed === true;
    });
  }

  for (let i = 0; i < showList.length; i++) {

    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    if (showList[i].completed === true) {
      li.classList.add("completed");
    }

    let span = document.createElement("span");
    span.textContent = showList[i].text;

    let doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.className = "btn btn-success btn-sm me-2";

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn btn-danger btn-sm";

    let box = document.createElement("div");
    box.appendChild(doneBtn);
    box.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(box);
    todoList.appendChild(li);

    doneBtn.addEventListener("click", function () {
      myTodos = myTodos.map(function (t) {
        if (t.id === showList[i].id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(myTodos));
      showTodos();
    });

    delBtn.addEventListener("click", function () {
      myTodos = myTodos.filter(function (t) {
        return t.id !== showList[i].id;
      });

      localStorage.setItem("todos", JSON.stringify(myTodos));
      showTodos();
    });
  }

  showCount();
}

/* filters */
for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterType = filterBtns[i].getAttribute("data-filter");
    showTodos();
  });
}

/* count */
function showCount() {
  let doneCount = myTodos.reduce(function (num, item) {
    if (item.completed === true) {
      return num + 1;
    }
    return num;
  }, 0);

  statsText.textContent = doneCount + " / " + myTodos.length + " completed";
}

/*clear completed  */
clearBtn.addEventListener("click", function () {
  myTodos = myTodos.filter(function (item) {
    return item.completed === false;
  });

  localStorage.setItem("todos", JSON.stringify(myTodos));
  showTodos();
});

/* start */
showTodos();
