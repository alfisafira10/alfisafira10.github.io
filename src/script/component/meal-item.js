class MealItem extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    set meal(meal) {
        this._meal = meal;
        this.render();
    }
 
    render() {
        this.shadowDOM.innerHTML = `
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              :host {
                display: block;
                margin-bottom: 18px;
                box-shadow: -1px 2px 14px 4px rgba(224,192,151,1);
                border-radius: 10px;
                overflow: hidden;
                background-color: white;
              }
              
              .meal-img {
                width: 100%;
                max-height: 300px;
                object-fit: cover;
                object-position: center;
              }
              
              .meal-info {
                padding: 24px;
              }
              
              .meal-info > h2 {
                font-weight: bold;
                text-align: center;
                padding: 10px;
                border-bottom: 2px solid black;
              }
              
              .meal-info > h3 {
                font-weight: light;
                font-size: 18px;
                text-align: center;
                margin: 10px;
              }

              .meal-info > h4 {
                font-weight: light;
                font-size: 18px;
              }

              .meal-info > p, a {
                margin-top: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 10; /* number of lines to show */
              }
            </style>

            <img class="meal-img" src="${this._meal.strMealThumb}" alt="Meal Image">
            <div class="meal-info">
                <h2>${this._meal.strMeal}</h2>
                <h3>Category : ${this._meal.strCategory} | Origin : ${this._meal.strArea}</h3>
                <br></br>
                <h4>Instruction</h4>
                <p>${this._meal.strInstructions}</p>
                <br>
                <h4>Tutorial</h4>
                <a href="${this._meal.strYoutube}" target="_blank">Link</a>
            </div>
        `;
    }
}

customElements.define('meal-item', MealItem);