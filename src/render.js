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
      imgContainer.appendChild(img);
  
      mainContainer.appendChild(imgContainer);
    });
  };
  
  export const renderMealInfo = (mealDetails) => {
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