function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = taskText;
    span.className = "task-text";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";

    editBtn.addEventListener("click", function () {
        if (editBtn.innerText === "Edit") {
            const input = document.createElement("input");
            input.type = "text";
            input.value = span.innerText;
            li.replaceChild(input, span);
            editBtn.innerText = "Save";
        } else {
            const input = li.querySelector("input");
            span.innerText = input.value;
            li.replaceChild(span, input);
            editBtn.innerText = "Edit";
        }
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
}