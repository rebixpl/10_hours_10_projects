const mealsEl = document.getElementById("meals");
const favouriteContainer = document.getElementById("fav-meals");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

const mealPopup = document.getElementById("meal-popup");
const popupCloseBtn = document.getElementById("close-popup");
const mealInfoEl = document.getElementById("meal-info");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div"); // <div></div>
  meal.classList.add("meal"); // <div class="meal"></div>

  meal.innerHTML = `
    <div class="meal-header">
    ${random ? ` <span class="random">Random Recipe</span>` : ""}
      <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
      />
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn">
        <i class="fa fa-heart" aria-hidden="true"></i>
      </button>
    </div>
 `; // <div class="meal"> innerHTML </div>
  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals(); // refresh favourite meals
  });

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  mealsEl.appendChild(meal);
}

// LS - Local Storage
function addMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id != mealId))
  );
}

function getMealsLS() {
  mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds == null ? [] : mealIds;
}

async function fetchFavMeals() {
  favouriteContainer.innerHTML = ""; // clean the container

  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    meal = await getMealById(mealId);

    addMealFav(meal);
  }

  // add them to the screen
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
  <img
    src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}"
  /><span>${mealData.strMeal}</span>
  <button class="clear"><i class="fa fa-window-close"></i></button>
 `;

  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
  });

  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favouriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
  // first clean old meal info
  mealInfoEl.innerHTML = "";

  // update meal info
  const mealEl = document.createElement("div");

  const ingredients = [];

  // get ingredients and measures
  for (let i = 0; i < 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    }
  }

  mealEl.innerHTML = `
  <h1>${mealData.strMeal}</h1>
          <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
          />
          <p>
          ${mealData.strInstructions}
          </p>
          <h3>Ingredients: </h3>
          <ul>
          ${ingredients
            .map(
              (ing) => `<li>
          ${ing}
          </li>`
            )
            .join("")}
          </ul>
  `;

  mealInfoEl.appendChild(mealEl);

  //show the popup
  mealPopup.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
  mealsEl.innerHTML = ""; // clean container (last meals search result)

  const search = searchTerm.value;

  const meals = await getMealsBySearch(search);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
  // console.log(await getMealsBySearch(search));
});

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
