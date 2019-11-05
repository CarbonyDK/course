class Favorites {
    constructor() {
        this.favorites = JSON.parse(this.init());
    }

    init() {
        if (!Array.isArray(JSON.parse(localStorage.getItem('favorites')))) {
            localStorage.setItem('favorites', JSON.stringify([]));
        }
        return localStorage.getItem('favorites');
    }

    addTicket(ticket) {
        //this.favorites[ticket.key] = ticket;
        //let favoritesArr = [];
        const favorite = {
          [ticket.key]: ticket
        };

        this.favorites.push(favorite);

        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        //console.log(this.favorites);
    }

    removeTicket(key) {
        const index = this.favorites.findIndex(element => element.hasOwnProperty(key));
        this.favorites.splice(index, 1);

        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    checkAdded(key) {
        const index = this.favorites.findIndex(element => element.hasOwnProperty(key));

        if (index !== -1) return true;
        else return false;
    }
}

const favorites = new Favorites();

export default favorites;