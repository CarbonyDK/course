/*

ПЕРВЫЕ ПУНКТЫ Д/З КАСАЮТСЯ ОТДЕЛЬНЫХ ЗАДАЧ И ВЫНЕСЕНЫ В *.js-ФАЙЛ В ПРОЕКТЕ users-info.

Все функции приложения были полностью написаны мною без использования готовых исходников.

3. **Проект News app.** Добавить в форму селект для выбора категории.

4. **Проект News app.** Добавить обработку формы. При сабмите формы должен
отправляться запрос на получение новостей по выбранной категории и стране,
если в инпуте search есть какое то значение то нужно делать запрос на
everething и передавать то что ввел пользователь.

*/


// Custom Http Module
function customHttp() {
  return {
    get(url, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
    post(url, body, headers, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(JSON.stringify(body));
      } catch (error) {
        cb(error);
      }
    },
  };
}
// Init http module
const http = customHttp();

// Functions
function initNews(country = 'ua', category = 'technology', search) {
  if (search) {
    newsService.getEverything(search, getNews);
  } else {
    newsService.getHeadlines(country, category, getNews);
  }

  const container = document.querySelector('.grid-container');
  container.insertAdjacentHTML('afterbegin',
    `
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    `
  );
}

function getNews(error, response) {
  if (error) {
    M.toast({html: error});
    return;
  } else if (!response.articles.length) {
    M.toast({html: 'Empty articles.'})
  }
  renderNews(response.articles);
}

function renderNews(news) {
  const container = document.querySelector('.grid-container');
  let fragment = ``;

  news.forEach(element => {
    fragment += newsTemplate(element);
  });

  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', fragment);
}

function newsTemplate({title, description, url, urlToImage}) {
  return `
    <div class="col s12">
      <div class="card">
        <div class="card-image">
          <img src="${urlToImage}">
          <span class="card-title">${title || ''}</span>
        </div>
        <div class="card-content">
          <p>${description || ''}</p>
        </div>
        <div class="card-action">
          <a href="${url}" target="_blank">Read More</a>
        </div>
      </div>
    </div>
  `;
}

// Logic
const newsService = {
  apiKey: '520eb2b5a2334c269e6bb08b0cf34d53',
  requestURL: 'https://newsapi.org/v2',
  getHeadlines(country, category, cb) {
    http.get(`${this.requestURL}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`, cb);
  },
  getEverything(value, cb) {
    http.get(`${this.requestURL}/everything?q=${value}&apiKey=${this.apiKey}`, cb);
  }
};

const newsForm = document.forms['newsControls'];
const country = newsForm.elements['country'];
const search = newsForm.elements['search'];
const category = newsForm.elements['category'];

document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
  initNews(country.value, category.value, search.value);
});

newsForm.addEventListener('submit', function (e) {
  e.preventDefault();
  initNews(country.value, category.value, search.value);
});



