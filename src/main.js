import { handleSubmit } from "./dom-utils";
import { fetcher } from "./fetcher";
import { renderMeals, renderMealInfo } from "./render";

export const fetchAndRenderMealsByIngredient = async (ingredient) => {
  const mealByIngUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const mealByIng = await fetcher(mealByIngUrl);

  if (mealByIng) {
    renderMeals(mealByIng);

    for (const meal of mealByIng) {
      const mealInfoUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.id}`;
      const mealInfo = await fetcher(mealInfoUrl);
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



/*

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

const renderMealInfo = (mealDetails) => {
  const extraMealInfoDiv = document.querySelector("#extra-meal-info");
  extraMealInfoDiv.innerHTML = '';

  mealDetails.forEach((detail) => {
    // Title
    if (detail.title) {
      const title = document.createElement('h2');
      title.textContent = detail.title;
      extraMealInfoDiv.appendChild(title);
    }

    // Image
    if (detail.image) {
      const image = document.createElement('img');
      image.src = detail.image;
      image.alt = detail.title || 'Meal Image';
      extraMealInfoDiv.appendChild(image);
    }

    // Origin
    if (detail.origin) {
      const origin = document.createElement('p');
      origin.textContent = `Origin: ${detail.origin}`;
      extraMealInfoDiv.appendChild(origin);
    }

    // Instructions
    if (detail.instructions) {
      const instructions = document.createElement('p');
      instructions.textContent = `Instructions: ${detail.instructions}`;
      extraMealInfoDiv.appendChild(instructions);
    }

    // YouTube URL
    if (detail.youtubeUrl) {
      const youtubeLink = document.createElement('a');
      youtubeLink.href = detail.youtubeUrl;
      youtubeLink.textContent = 'Watch on YouTube';
      youtubeLink.target = '_blank'; // Open in new tab
      extraMealInfoDiv.appendChild(youtubeLink);
    }

    // Add more properties as needed
  });

  extraMealInfoDiv.style.display = 'block';

  extraMealInfoDiv.addEventListener('click', (e) => {
    if (e.currentTarget === extraMealInfoDiv) {
      extraMealInfoDiv.style.display = 'none';
    }
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
      renderMealInfo(mealInfo) 
      
    } catch (error) {
      console.error("Error fetching meal info:", error);
    }
  }
}

*/
const main = async () => {
  fetcher()
  const form = document.querySelector("#meal-form");
  form.addEventListener("submit", (event) =>
    handleSubmit(event, fetchAndRenderMealsByIngredient)
  );

  const imgDelegation = document.querySelector('#meal-images-container');
  imgDelegation.addEventListener('click', handleUserClick);
};

main();