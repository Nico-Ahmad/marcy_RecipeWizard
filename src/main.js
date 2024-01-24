import { handleSubmit } from "./dom-utils";

export const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fetch failed with status:", response.status);

    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      return data.meals.map((theMeal) => {
        let mealInfo = {
          image: theMeal.strMealThumb,
          id: theMeal.idMeal,
          title: theMeal.strMeal, // You might adjust these based on the data structure
          // Add other properties as needed
        };

        // Add additional properties if they exist
        if (theMeal.strArea) mealInfo.origin = theMeal.strArea;
        if (theMeal.strInstructions) mealInfo.instructions = theMeal.strInstructions;
        if (theMeal.strYoutube) mealInfo.youtubeUrl = theMeal.strYoutube;
        // Handle other properties similarly

        return mealInfo;
      });
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
    console.log("no meals");
  }
};

const renderMeals = (meals) => {
  const mainContainer = document.querySelector("#meal-images-container");

  // Clear the container once before the loop
  mainContainer.innerHTML = "";

  meals.forEach((meal) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("each-image");
    imgContainer.setAttribute('data-id', meal.id);

    const img = document.createElement("img");
    img.setAttribute("src", meal.image);
    img.setAttribute("alt", meal.title);
    imgContainer.appendChild(img);

    mainContainer.appendChild(imgContainer);
   
  });
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
      console.log('here',mealInfo); 
    } catch (error) {
      console.error("Error fetching meal info:", error);
    }
  }
}

const main = async () => {
  // form

  const form = document.querySelector("#meal-form");
  form.addEventListener("submit", (event) =>
    handleSubmit(event, fetchAndRenderMealsByIngredient)
  );

const imgDelegation = document.querySelector('#meal-images-container');
imgDelegation.addEventListener('click',handleUserClick)
};
main();
