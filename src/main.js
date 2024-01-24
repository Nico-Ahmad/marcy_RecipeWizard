import { handleSubmit } from "./dom-utils";

export const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Fetch failed with status:', response.status);

    const data = await response.json();
    console.log('the meal data', data)
    if (data.meals && data.meals.length > 0) {
      const theMeal = data.meals[0];  
      
      // object to holds meal information
      let mealInfo = {};

      // filter out properties from first URL 
      if (theMeal.strMealThumb && theMeal.idMeal) {
        mealInfo.image = theMeal.strMealThumb;
        mealInfo.id = theMeal.idMeal;
      }

      // filter out properties from second URL 
      if (theMeal.strMeal && theMeal.strArea && theMeal.strInstructions && theMeal.strYoutube) {
        mealInfo.title = theMeal.strMeal;
        mealInfo.origin = theMeal.strArea;
        mealInfo.instructions = theMeal.strInstructions;
        mealInfo.youtubeUrl = theMeal.strYoutube;
      }
        //console.log(mealInfo)
      return mealInfo;
    } else {
      // if no array 
      return null 
    }
  } catch (error) {
    console.error('caught error:', error);
    // fetch fails  
    return null
  }
};

const main =  async () => {
  // form 

  const form = document.querySelector('#meal-form')
  form.addEventListener('submit',handleSubmit)
  const mealByIngUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=tomato`
  // returns img and id 
  
  // returns all info 

  // mealById === www.themealdb.com/api/json/v1/1/lookup.php?i=52772
  // mealBy Ingredient === www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
  const mealByIng = await fetcher(mealByIngUrl);
  const mealInfoUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealByIng.id}`
  console.log('Meal by Ingredient:', mealByIng);

  const mealInfo = await fetcher(mealInfoUrl);
  console.log('Meal Information:', mealInfo);
  
};
main();
