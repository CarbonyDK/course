import '../css/style.css';
import './plugins';
import locations from './store/locations';
import favorites from './store/favorites';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favoritesUI from './views/favorites';

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;
  const container = document.querySelector('.tickets-sections');
  const favoritesList = document.querySelector('#favorites-list');

  // Events
  initApp();
  favoritesUI.renderFavorites(favorites.favorites);
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });
  container.addEventListener('click', onAddTicket);
  favoritesList.addEventListener('click', onDeleteTicket);


  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }

  function onAddTicket(e) {
    e.preventDefault();
    const elem = e.target;
    if (elem.classList.contains('add-favorite')) {
        const ticketObj = locations.lastSearch[elem.dataset.ticket];
        favorites.addTicket(ticketObj);
        favoritesUI.addToList(ticketObj);
        elem.classList.remove('green', 'add-favorite');
        elem.textContent = 'Added to Favorite';
    }
  }

  function onDeleteTicket(e) {
    const elem = e.target;
    if (elem.classList.contains('delete-favorite')) {
        const key = elem.dataset.ticket;
        favorites.removeTicket(key);
        favoritesUI.removeFromList(key);
    }
  }
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI
