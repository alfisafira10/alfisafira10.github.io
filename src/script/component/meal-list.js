import './meal-item.js';

class MealList extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    set meals(meals) {
        this._meals = meals;
        this.render();
    }

    renderError(message) {
        this.shadowDOM.innerHTML = `
          <style>
            .placeholder {
                font-weight: lighter;
                font-size: 18px;
                color: white;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
          </style>
        `;
        this.shadowDOM.innerHTML += `<h2 class="placeholder">!!! Warning : ${message}</h2>`;
    }
   
    render() {
        this.shadowDOM.innerHTML = '';
        this._meals.forEach(meal => {
          const mealItemElement = document.createElement('meal-item');
          mealItemElement.meal = meal;

          this.shadowDOM.appendChild(mealItemElement);
        });
    }
}

customElements.define('meal-list', MealList);