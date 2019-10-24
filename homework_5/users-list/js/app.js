/*

1. Получить пользователей (**users**) от сервера [https://jsonplaceholder.typicode.com]
(https://jsonplaceholder.typicode.com/). Получив ответ от сервера вывести имена пользователей
на страницу. При клике на имя пользователя в произвольном месте должна появиться подробная
информация о нем. Для визуальной части можно использовать bootstrap или другие фреймворки.

2. Создать форму добавления пользователя состоящая из полей name, email, username,
phone, website при сабмите формы сделать POST запрос на сервер после ответа от
сервера добавлять полученного пользователя на страницу.

ОСТАЛЬНОЕ ЗАДАНИЕ КАСАЕТСЯ ПРОЕКТА С НОВОСТЯМИ И ВЫНЕСЕНО В *.js-ФАЙЛ ПРОЕКТА news-app.

*/

//Init
const xhr = {
  url: 'https://jsonplaceholder.typicode.com/users',
  getUsers(callback, id) {
      const request = new XMLHttpRequest();
      request.open('GET', `${this.url}`);
      request.addEventListener('load', function () {
          if (Math.floor(request.status / 100) !== 2) {
              callback(`Error with status: ${request.status}`);
              return;
          }
          callback(null, request.responseText);
      });
      request.addEventListener('error', function () {
          callback(`Error with status: ${request.status}`);
      });
      request.send();
  },
  getUser(callback, id) {
      const request = new XMLHttpRequest();
      request.open('GET', `${this.url}/${id}`);
      request.addEventListener('load', function () {
          callback(null, request.responseText);
      });
      request.addEventListener('error', function () {
          callback(`Error with status: ${request.status}`);
      });
      request.send();
  },
  addUser(callback, user) {
      const request = new XMLHttpRequest();
      request.open('POST', `${this.url}`);
      request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
      request.addEventListener('load', function () {
          callback(null, request.responseText);
      });
      request.addEventListener('error', function () {
          callback(`Error with status: ${request.status}`);
      });
      request.send(JSON.stringify(user));
  }
};
const usersContainer = document.querySelector('.users-container');
const userForm = document.forms['addUser'];
userForm.addEventListener('submit', submitFormEvent);
initUsers();

//Functions
function initUsers() {
    getAllUsers(requestUsersCallback);
}

function getAllUsers(callback) {
    return xhr.getUsers(callback);
}

function requestUsersCallback(error, response) {
    if (error) {
        alert(error);
        return;
    }
    const users = JSON.parse(response);
    renderUsers(users);
}

function requestUserCallback(error, response) {
    if (error) {
        alert(error);
        return;
    }
    const user = JSON.parse(response);
    addUser(user);
}

function renderUsers(users) {
    usersContainer.innerHTML = '';
    let usersFragment = '';
    users.forEach(element => {
       usersFragment += userTemplate(element);
    });
    usersContainer.insertAdjacentHTML('afterbegin', usersFragment);
}

function userTemplate({id, name, email, username, phone, website}) {
    return `
        <div class="row user">
            <div class="col-md-6 mt-3">
                <p>
                    <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#user-${id}" aria-expanded="false" aria-controls="user-${id}">
                        ${name}
                    </button>
                </p>
                <div class="collapse" id="user-${id}">
                    <div class="card card-body">
                        ${email}<br>
                        ${phone}<br>
                        ${website}<br>
                        ${username}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function submitFormEvent(e) {
    e.preventDefault();

    const formElement = e.target;
    const name = formElement.elements['name'].value;
    const email = formElement.elements['email'].value;
    const username = formElement.elements['username'].value;
    const phone = formElement.elements['phone'].value;
    const website = formElement.elements['website'].value;

    const user = {
        name,
        email,
        username,
        phone,
        website
    };

    if (!Object.values(user).every(element => element)) {
        alert('Insert all data!');
        return;
    }

    xhr.addUser(requestUserCallback, user);
}

function addUser(user) {
    usersContainer.insertAdjacentHTML('afterbegin', userTemplate(user));
}
