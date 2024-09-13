document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task');

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTask(taskText);
            taskInput.value = '';  // Clear input
        }
    });

    // Create task function
    function createTask(taskText) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Mark as complete
        listItem.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                listItem.classList.toggle('completed');
            }
        });

        // Edit task
        const editButton = listItem.querySelector('.edit-btn');
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();  // Prevent marking complete when editing
            const taskSpan = listItem.querySelector('span');
            const newTaskText = prompt("Edit your task:", taskSpan.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                taskSpan.textContent = newTaskText.trim();
            }
        });

        // Delete task with animation
        const deleteButton = listItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();  // Prevent marking complete when deleting
            listItem.classList.add('fade-out');
            setTimeout(() => {
                listItem.remove();
            }, 500);  // Wait for animation to complete
        });

        taskList.appendChild(listItem);
    }
});
