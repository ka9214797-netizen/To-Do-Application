document.addEventListener('DOMContentLoaded', () => {
    let taskInput = document.getElementById('task-input');
    let addTaskButton = document.getElementById('add-task-btn'); 
    let taskList = document.getElementById('task-list');
    
    let emptyImage = document.querySelector('.empty-image'); 
    let todosContainer = document.querySelector('.todos-container');

    const toggleEmptystate = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none'; 
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    const addTask = (text, completed = false) => {
        event.preventDefault();
        
        let taskText = taskInput.value.trim();
        
        if (taskText === '') {
            return;
        }
        
        let li = document.createElement('li');
        
        li.innerHTML = `
            <input type="checkbox" class="checkbox"${completed ? ' checked' : ''}/>
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        let checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');
        
if(completed){
li.classList.add('completed');
editBtn.disabled=true;
editBtn.style.opacity= '0.5';
editBtn.style.pointerEvents = 'none'
}
checkbox.addEventListener('change' , () => {
    let ischecked = checkbox.checked;
    li.classList.toggle('completed', ischecked);
    editBtn.disabled = ischecked;
    editBtn.style.opacity = ischecked ? '0.5' : '1';
    editBtn.style.pointerEvents = ischecked ? 'none' : 'auto';
})

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptystate();
            }
        }); 

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptystate();
        });
        
        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptystate();
    };

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }  
    });
});

