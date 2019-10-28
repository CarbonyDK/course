/*

    1. Создать собственный модуль http с использованием async await и fetch.
    У данного модуля должны быть методы get, post, put и delete

    2. Проект news app переписать с использованием async await и fetch

*/



// Custom New HTTP Module

function customHttp() {
  return {
    async get(url) {
      const request = await fetch(url);
      const data = await request.json();
      return data;
    },
    async post(url, body, headers) {
      const request = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
      });
      const data = await request.json();
      return data;
    },
    async put(url, body, headers) {
      const request = await fetch(url, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(body),
      });
      const data = await request.json();
      return data;
    },
    async delete(url, body, headers) {
      const request = await fetch(url, {
          method: 'DELETE',
          headers: headers,
          body: JSON.stringify(body),
      });
      const data = await request.json();
      return data;
    },
  };
}



// Init New HTTP Module and Logic

const http = customHttp();

const newsService = {
    apiKey: '520eb2b5a2334c269e6bb08b0cf34d53',
    requestURL: 'https://newsapi.org/v2',
    async getHeadlines(country, category) {
        const data = await http.get(`${this.requestURL}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`);
        return data;
    },
    async getEverything(value) {
        const data = await http.get(`${this.requestURL}/everything?q=${value}&apiKey=${this.apiKey}`);
        return data;
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



// Functions

async function initNews(country = 'ua', category = 'technology', search) {
  const container = document.querySelector('.grid-container');
  container.insertAdjacentHTML('afterbegin',
    `
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    `
  );

  if (search) {
    await newsService.getEverything(search, getNews).then(data => getNews(null, data)).catch(error => getNews(error));
  } else {
    await newsService.getHeadlines(country, category).then(data => getNews(null, data)).catch(error => getNews(error));
  }
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
          <img src="${urlToImage || 'http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png'}">
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



