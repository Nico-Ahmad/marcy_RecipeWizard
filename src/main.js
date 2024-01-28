import "./style.css"
import { handleSubmit } from "./utils/dom-utils";
import { fetcher } from "./utils/fetcher";
import { renderMeals, renderMealInfo } from "./utils/render";

export const fetchAndRenderMealsByIngredient = async (ingredient) => {
  const mealByIngUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const mealByIng = await fetcher(mealByIngUrl);

  if (mealByIng) {
    renderMeals(mealByIng);

    for (const meal of mealByIng) {
      const mealInfoUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.id}`;
      const mealInfo = await fetcher(mealInfoUrl);
      console.log(mealInfo);
    }
  } else {
    console.log("no meals");
  }
};

const handleUserClick = async (e) => {
  let targetElement = e.target;

  // Debugging: Log the clicked element
  console.log("Clicked element:", targetElement);

  // Navigate to the parent element if the clicked element is an image
  if (targetElement.tagName === 'IMG') {
    targetElement = targetElement.parentElement;
  }

  const mealId = targetElement.getAttribute('data-id');

  // Debugging: Log the meal ID
  console.log("Meal ID:", mealId);

  if (mealId) {
    try {
      const mealInfoUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
      const mealInfo = await fetcher(mealInfoUrl);
      renderMealInfo(mealInfo) 
      
    } catch (error) {
      console.error("Error fetching meal info:", error);
    }
  }
}


const imFeelingLucky = () => {
  const searches = [
    "chicken breast",
    "pepper",
    "lemon",
    "kale",
    "orange",
    "lamb",
    "broccoli",
    "strawberries",
    "bread",
    "potato",
    "cheese",
    "water",
    "rice",
  ] ;
  const ranIdx = Math.floor(Math.random()*searches.length);
  return searches[ranIdx];
}

const main = async () => {
fetchAndRenderMealsByIngredient(imFeelingLucky())
  const form = document.querySelector("#meal-form");
  form.addEventListener("submit", (event) =>
    handleSubmit(event, fetchAndRenderMealsByIngredient)
  );

  const imgDelegation = document.querySelector('#meal-images-container');
  imgDelegation.addEventListener('click', handleUserClick);


};

main();