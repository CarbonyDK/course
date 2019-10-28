/*

    Функции, написанные мной до заданий из Д/З:

    - обработка массива задач;
    - вывод задач;
    - добавление задачи;
    - удаление задачи;
    - изменение темы;
    - изменение статуса задачи на "Выполнено";
    - проверка пустого массива задач;
    - проверка выполненных задач;

    Д/З:

    1.

    Если массив с задачами пустой то под формой нужно выводить сообщение об этом,
    также это же сообщение нужно выводить если вы удалите все задачи.

    Реализована функция *checkTasks()*, которая также добавлена в функции начальной загрузки.


    2.

    В каждый элемент li добавить кнопку которая будет делать задачу выполненой.
    завершенные задачи должны быть подсвечены любым цветом.

    !!! ИСХОДЯ ИЗ НЕБАГАТОГО КОЛИЧЕСТВА ЦВЕТОВ Bootstrap 4, Я СДЕЛАЛ ПОДСВЕТКУ ВЫПОЛНЕННОЙ ЗАДАЧИ ЕЛЕ ЗАМЕТНЫМ СЕРЫМ ЦВЕТОМ. !!!

    Реализована функция *completeTask()*, также добавлен функционал начальной проверки.


    3.

    Добавить функционал отображения незавершенных задач и всех задач. т.е
    у вас будет две кнопки над таблицей 1-я "показать все задачи" и 2-я
    "показать незавершенные задачи", определить завершена задача или нет
    можно по полю completed в объекте задачи. По умолчанию при загрузке
    отображаются все задачи.

*/

const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat ipsum.',
    },
];

(function(arrOfTasks) {
    const themes = {
        default: {
            '--base-text-color': '#212529',
            '--header-bg': '#007bff',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#007bff',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#0069d9',
            '--default-btn-border-color': '#0069d9',
            '--danger-btn-bg': '#dc3545',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#bd2130',
            '--danger-btn-border-color': '#dc3545',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#80bdff',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
            '--default-nav-inactive-color': '#007bff',
        },
        dark: {
            '--base-text-color': '#212529',
            '--header-bg': '#343a40',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#58616b',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#292d31',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#b52d3a',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#88222c',
            '--danger-btn-border-color': '#88222c',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--default-nav-inactive-color': '#58616b',
        },
        light: {
            '--base-text-color': '#212529',
            '--header-bg': '#fff',
            '--header-text-color': '#212529',
            '--default-btn-bg': '#fff',
            '--default-btn-text-color': '#212529',
            '--default-btn-hover-bg': '#e8e7e7',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#f1b5bb',
            '--danger-btn-text-color': '#212529',
            '--danger-btn-hover-bg': '#ef808a',
            '--danger-btn-border-color': '#e2818a',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--default-nav-inactive-color': '#343a40',
        },
    };

    // ELEMENTS

    const structuredTasks = arrOfTasks.reduce((accumulator, value) => {
        accumulator[value._id] = value;
        return accumulator;
    }, {});
    const containerOfTasks = document.querySelector('.list-group');
    const addTaskForm = document.forms['addTask'];
    const themeSelect = document.querySelector('#themeSelect');
    const showAllButton = document.querySelector('#showAll');
    const showIncompletedButton = document.querySelector('#showIncompleted');
    let currentSection = 'all';
    const theme = localStorage.getItem('theme') || 'default';
    themeChange(theme);

    // LOGIC

    addTaskForm.addEventListener('submit', formSubmitEvent);
    containerOfTasks.addEventListener('click', containerClickEvent);
    themeSelect.addEventListener('change', themeSelectEvent);
    showAllButton.addEventListener('click', showAllClickEvent);
    showIncompletedButton.addEventListener('click', showIncompletedClickEvent);
    showTasks(structuredTasks, containerOfTasks);

    // FUNCTIONS

    function showTasks(tasks) {
        if (!Object.keys(tasks).length) {
            showEmptyMessage();
            return;
        }

        const tasksEntries = Object.entries(tasks);
        tasksEntries.sort(([keyA, valueA], [keyB, valueB]) => Number(valueA.completed) - Number(valueB.completed));
        const newTasks = Object.fromEntries(tasksEntries);

        const taskContainer = document.createDocumentFragment();

        Object.keys(newTasks).forEach(element => {
            taskContainer.appendChild(createTask(newTasks[element]));
        });
        while (containerOfTasks.firstChild) {
            containerOfTasks.removeChild(containerOfTasks.firstChild);
        }
        containerOfTasks.appendChild(taskContainer);
    }

    function createTask(taskObj) {
        const newLi = document.createElement('li');
        const newSpan = document.createElement('span');
        const newButton = document.createElement('button');
        const newParagraph = document.createElement('p');
        const completeButton = document.createElement('button');

        newLi.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
        newButton.classList.add('btn', 'btn-danger', 'delete-btn');
        completeButton.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1', 'delete-btn');
        newParagraph.classList.add('mt-2', 'w-100');

        newSpan.textContent = taskObj.title;
        newSpan.style.fontWeight = 'bold';
        newButton.textContent = 'Delete';
        newParagraph.textContent = taskObj.body;
        completeButton.textContent = 'Complete';

        newLi.setAttribute('data-id', taskObj._id);
        newLi.appendChild(newSpan);
        newLi.appendChild(completeButton);
        newLi.appendChild(newButton);
        newLi.appendChild(newParagraph);

        if (taskObj.completed) completeTask(newLi);

        return newLi;
    }

    function addTask(task) {
        const newTask = createTask(task);

        structuredTasks[task._id] = task;
        existsTasks();
        containerOfTasks.insertAdjacentElement('afterbegin', newTask);
    }

    function formSubmitEvent(e) {
        const newTaskTitle = e.target.elements['title'].value;
        const newTaskBody = e.target.elements['body'].value;
        const newTask = {};

        e.preventDefault();

        if (!newTaskTitle || !newTaskBody) {
            alert('Заполните все данные!');
            return;
        }

        newTask._id = `_task${Math.floor(Math.random() * (999 - 100) + 100)}`;
        newTask.completed = false;
        newTask.body = newTaskBody;
        newTask.title = newTaskTitle;
        e.target.reset();
        addTask(newTask);
    }

    function deleteTask(task) {
        const taskId = task.getAttribute('data-id');
        const confirmDelete = confirm(`Удалить задачу: ${structuredTasks[taskId].title} ?`);

        if (!confirmDelete) return;

        delete structuredTasks[taskId];
        task.remove();
        existsTasks();
    }

    function existsTasks() {
        if (Object.keys(structuredTasks).length && containerOfTasks.querySelector('li')) hideEmptyMessage();
        else showEmptyMessage();
    }

    function showEmptyMessage() {
        const emptyMessageLi = document.createElement('li');
        const emptyMessageTitle = document.createElement('span');

        emptyMessageLi.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2', 'mx-auto');
        emptyMessageLi.id = 'emptyMessage';
        emptyMessageTitle.style.fontWeight = 'bold';
        emptyMessageTitle.textContent = 'Задач для отображения нет.';
        emptyMessageLi.appendChild(emptyMessageTitle);
        while (containerOfTasks.firstChild) {
            containerOfTasks.removeChild(containerOfTasks.firstChild);
        }
        containerOfTasks.appendChild(emptyMessageLi);
    }

    function hideEmptyMessage() {
        if (containerOfTasks.querySelector('#emptyMessage')) {
            containerOfTasks.querySelector('#emptyMessage').remove();
        }
    }

    function containerClickEvent(e) {
        if (e.target.classList.contains('btn-danger')) {
            const task = e.target.closest('li');
            deleteTask(task);
        } else if (e.target.classList.contains('btn-success')) {
            const task = e.target.closest('li');
            completeTask(task);
        } else if (e.target.classList.contains('btn-secondary')) {
            const task = e.target.closest('li');
            restoreTask(task);
        }
    }

    function themeSelectEvent(e) {
        const themeValue = e.target.value;
        themeChange(themeValue);
    }

    function themeChange(theme) {
        Object.entries(themes[theme]).forEach(([element, value]) => {
            document.body.style.setProperty(element, value);
        });
        localStorage.setItem('theme', theme);
    }

    function completeTask(task) {
        const taskId = task.getAttribute('data-id');
        const taskCompleteButton = task.querySelector('.btn-success');
        if (!structuredTasks[taskId].completed) structuredTasks[taskId].completed = true;
        task.classList.add('bg-light');
        taskCompleteButton.classList.remove('btn-success');
        taskCompleteButton.classList.add('btn-secondary');
        taskCompleteButton.textContent = 'Restore';
        if (currentSection === 'incompleted') {
            task.remove();
            existsTasks();
        }
    }

    function restoreTask(task) {
        const taskId = task.getAttribute('data-id');
        const taskRestoreButton = task.querySelector('.btn-secondary');
        if (structuredTasks[taskId].completed) structuredTasks[taskId].completed = false;
        task.classList.remove('bg-light');
        taskRestoreButton.classList.remove('btn-secondary');
        taskRestoreButton.classList.add('btn-success');
        taskRestoreButton.textContent = 'Complete';
    }

    function showAllClickEvent(e) {
        e.preventDefault();
        showAllTasks(structuredTasks);
    }

    function showAllTasks(tasks) {
        setActiveButton(showAllButton);
        showTasks(tasks);
        currentSection = 'all';
    }

    function showIncompletedClickEvent(e) {
        e.preventDefault();
        showIncompletedTasks(structuredTasks);
        currentSection = 'incompleted';
    }

    function showIncompletedTasks(tasks) {
        const copyOfTasks = JSON.parse(JSON.stringify(tasks));
        const filteredTasks = Object.entries(copyOfTasks).filter(([id, value]) => !value.completed);

        setActiveButton(showIncompletedButton);
        showTasks(Object.fromEntries(filteredTasks));
    }

    function setActiveButton(button) {
        const allSortButtons = document.querySelectorAll('.nav-link');
        Array.from(allSortButtons).forEach((element, i) => {
            element.classList.remove('active');
        });
        button.classList.add('active');
    }

})(tasks);
