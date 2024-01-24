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


const renderMeals = (meals) => {
  meals.forEach((meal) => {
    const imgContainer = document.createElement('div')
    imgContainer.classList.add('each-image')
    const img = document.createElement('img')
    const imgId = meal.id
    img.setAttribute('img',imgId)
    img.src = meal.image
    imgContainer.append(img)
    const mainContainer = document.querySelector('#meal-images-container')
   
    mainContainer.append(imgContainer)
    console.log(mainContainer)
   
    

  })
}
const main = async () => {
  // form

  const form = document.querySelector("#meal-form");
  form.addEventListener("submit", handleSubmit);
  const mealByIngUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`;
  // returns img and id

  // returns all info

  // mealById === www.themealdb.com/api/json/v1/1/lookup.php?i=52772
  // mealBy Ingredient === www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
  const mealByIng = await fetcher(mealByIngUrl);
  renderMeals(mealByIng)
  //
  //console.log("all meals", mealByIng);
  for (const meal of mealByIng) {
    const mealInfoUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.id}`;
   // console.log("Meal by Ingredient:", meal);
    const mealInfo = await fetcher(mealInfoUrl);
   // console.log("Meal Information:", mealInfo);
  }
  
};
main();
