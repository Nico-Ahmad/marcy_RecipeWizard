import { handleSubmit } from "./dom-utils";

export const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error("Fetch failed with status:", response.status);

    const data = await response.json();
    //console.log("the meal data", data);

    if (data.meals && data.meals.length > 0) {
      const mealsInfo = data.meals.map((theMeal) => {
        let mealInfo = {};

        if (theMeal.strMealThumb && theMeal.idMeal) {
          mealInfo.image = theMeal.strMealThumb;
          mealInfo.id = theMeal.idMeal;
        }

        if (
          theMeal.strMeal &&
          theMeal.strArea &&
          theMeal.strInstructions &&
          theMeal.strYoutube &&
          theMeal.ingredients1
        ) {
          mealInfo.title = theMeal.strMeal;
          mealInfo.origin = theMeal.strArea;
          mealInfo.instructions = theMeal.strInstructions;
          mealInfo.youtubeUrl = theMeal.strYoutube;
          
        }

        return mealInfo;
      });

      return mealsInfo;
    } else {
      return null;
    }
  } catch (error) {
    console.error("caught error:", error);
    return null;
  }
};

export const fetchAndRenderMealsByIngredient = async (ingredient) => {
  const mealByIngUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const mealByIng = await fetcher(mealByIngUrl);

  if (mealByIng) {
    renderMeals(mealByIng);

    for (const meal of mealByIng) {
      const mealInfoUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.id}`;
      const mealInfo = await fetcher(mealInfoUrl);
      // Process mealInfo as needed
    }
  } else {
    console.log('no meals')
  }
};


const renderMeals = (meals) => {
  const mainContainer = document.querySelector('#meal-images-container');

  // Clear the container once before the loop
  mainContainer.innerHTML = '';

  meals.forEach((meal) => {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('each-image');

    const img = document.createElement('img');
    img.setAttribute('src', meal.image); // Correct attribute for setting image source
    img.setAttribute('alt', meal.title); // Optional: 'alt' attribute for accessibility
    imgContainer.appendChild(img); // Append the image to the container

    mainContainer.appendChild(imgContainer); // Append the container to the main container
  });
};
   

const main = async () => {
  // form

  const form = document.querySelector("#meal-form");
  form.addEventListener("submit", (event) => handleSubmit(event, fetchAndRenderMealsByIngredient));

};
main();
