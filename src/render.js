export const renderMeals = (meals) => {
    const mainContainer = document.querySelector("#meal-images-container");
    mainContainer.innerHTML = "";
  
    meals.forEach((meal) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("each-image");
      imgContainer.setAttribute('data-id', meal.id);
  
      const img = document.createElement("img");
      img.setAttribute("src", meal.image);
      img.setAttribute("alt", meal.title);
      img.width = 400
      imgContainer.appendChild(img);
  
      mainContainer.appendChild(imgContainer);
    });
  };

 export const renderMealInfo = (mealDetails) => {
    const extraMealInfoDiv = document.querySelector("#extra-meal-info");
    extraMealInfoDiv.innerHTML = '';
  
    mealDetails.forEach((detail) => {
      // Div for Text Content
      const textContentContainer = document.createElement('div');
      textContentContainer.id = 'popUpTextContent';
  
      // Title
      if (detail.title) {
        const title = document.createElement('h2');
        title.textContent = detail.title;
        textContentContainer.appendChild(title);
      }
  
      // Origin
      if (detail.origin) {
        const origin = document.createElement('p');
        origin.textContent = `Origin: ${detail.origin}`;
        textContentContainer.appendChild(origin);
      }
  
      // Ingredients
      if (detail.ingredients && detail.ingredients.length > 0) {
        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.textContent = 'Ingredients';
        textContentContainer.appendChild(ingredientsTitle);
  
        const ingredientsList = document.createElement('ul');
        detail.ingredients.forEach(ingredient => {
          const ingredientItem = document.createElement('li');
          ingredientItem.textContent = `${ingredient.ingredient}: ${ingredient.measure}`;
          ingredientsList.appendChild(ingredientItem);
        });
        textContentContainer.appendChild(ingredientsList);
      }
  
      // Instructions
      if (detail.instructions) {
        const instructionsTitle = document.createElement('h3');
        instructionsTitle.textContent = 'Instructions';
        textContentContainer.appendChild(instructionsTitle);
  
        const instructions = document.createElement('p');
        instructions.textContent = detail.instructions;
        textContentContainer.appendChild(instructions);
      }
  
      // YouTube URL
      if (detail.youtubeUrl) {
        const youtubeLink = document.createElement('a');
        youtubeLink.href = detail.youtubeUrl;
        youtubeLink.textContent = 'Watch on YouTube';
        youtubeLink.target = '_blank';
        textContentContainer.appendChild(youtubeLink);
      }
  
      // Append Text Content Container
      extraMealInfoDiv.appendChild(textContentContainer);
  
      // Div for Image
      const imageContainer = document.createElement('div');
      imageContainer.id = 'popUpImage';

      if (detail.image) {
        const image = document.createElement('img');
        image.src = detail.image;
        image.alt = detail.title || 'Meal Image';
        imageContainer.appendChild(image);
      }
  
      // Append Image Container
      extraMealInfoDiv.appendChild(imageContainer);
    });
  
    extraMealInfoDiv.style.display = 'flex';
  
    extraMealInfoDiv.addEventListener('click', (e) => {
      if (e.currentTarget === extraMealInfoDiv) {
        extraMealInfoDiv.style.display = 'none';
      }
    });
  };
  
  export const renderWarning = () => {
    const container = document.querySelector("#meal-images-container"); // or any suitable container
    container.innerHTML = '';
  
    const warningMessage = document.createElement("p");
    warningMessage.textContent = "No meals found. Please try a different search.";
    warningMessage.style.color = 'red'; // Styling for visibility
    // Additional styling can be added here
  
    container.appendChild(warningMessage);
  };

