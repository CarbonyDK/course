import currencyUI from './currency';

class FavoritesUI {
    constructor(currency) {
        this.container = document.querySelector('#favorites-list');
        this.currencySymbol = currency.currencySymbol;
    }

    addToList(ticket) {
        const template = this.ticketTemplate(ticket, this.currencySymbol);
        this.container.insertAdjacentHTML('afterbegin', template);
    }

    removeFromList(key) {
        const ticketElement = document.querySelector(`[data-ticket="${key}"]`).closest('.favorite-item');
        ticketElement.remove();
    }

    ticketTemplate(ticket, currency) {
        return `
                <div class="favorite-item  d-flex align-items-start">
                    <img
                      src="${ticket.airline_logo}"
                      class="favorite-item-airline-img"
                    />
                    <div class="favorite-item-info d-flex flex-column">
                      <div
                        class="favorite-item-destination d-flex align-items-center"
                      >
                        <div class="d-flex align-items-center mr-auto">
                          <span class="favorite-item-city">${ticket.origin_name} </span>
                          <i class="medium material-icons">flight_takeoff</i>
                        </div>
                        <div class="d-flex align-items-center">
                          <i class="medium material-icons">flight_land</i>
                          <span class="favorite-item-city">${ticket.destination_name}</span>
                        </div>
                      </div>
                      <div class="ticket-time-price d-flex align-items-center">
                        <span class="ticket-time-departure">${ticket.departure_at}</span>
                        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                      </div>
                      <div class="ticket-additional-info">
                        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                      </div>
                      <button data-ticket="${ticket.key}" class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</button>
                    </div>
                </div>
        `;
    }

    renderFavorites(tickets) {
        let fragment = '';
        tickets.map(element => {
            const key = Object.keys(element)[0];
            const template = this.ticketTemplate(element[key], this.currencySymbol);
            fragment += template;
        });

        this.container.insertAdjacentHTML('afterbegin', fragment);
    }
}

const favoritesUI = new FavoritesUI(currencyUI);

export default favoritesUI;