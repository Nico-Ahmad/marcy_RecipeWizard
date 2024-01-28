export const renderIngredientSearched = (ingredient) => {
  const mainContainer = document.querySelector("#user-searched");
  mainContainer.innerHTML = "";

  const resultDiv = document.createElement("div");
  resultDiv.id = ("div-text")
  const resultDiv2 = document.createElement("div");
  resultDiv2.id = ("div-imgPicAndName")

  const h3 = document.createElement("h3");
  h3.textContent = ("Searching for Recipes with:")
  const img = document.createElement("img");
  img.src = (`https://www.themealdb.com/images/ingredients/${ingredient}.png`)
  const p = document.createElement("p");
  p.textContent = (ingredient.toString().toUpperCase())


  resultDiv.append(h3)
  resultDiv2.append(img)
  resultDiv2.append(p)

  mainContainer.append(resultDiv)
  mainContainer.append(resultDiv2)
}

export const renderNoIngredient = () => {
  const mainContainer = document.querySelector("#user-searched");
  mainContainer.innerHTML = "";
}



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
      img.width = 400;
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
        // const youtubeLink = document.createElement('a');
        // youtubeLink.href = detail.youtubeUrl;
        // youtubeLink.textContent = 'Watch on YouTube';
        // youtubeLink.target = '_blank';
        // textContentContainer.appendChild(youtubeLink);
        console.log(detail.youtubeUrl)

        const bananaSplit = detail.youtubeUrl.split("=")
        const ytVideoID = bananaSplit[bananaSplit.length-1]
        const ytEmbedUrl = `https://www.youtube.com/embed/${ytVideoID}`
        console.log(ytEmbedUrl)

        const ytEmbed = document.createElement('iframe');
        ytEmbed.width = "300";
        ytEmbed.height = "160";
        ytEmbed.src = ytEmbedUrl;
        ytEmbed.allow = "fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        // ytEmbed.allowFullscreen;
        textContentContainer.appendChild(ytEmbed)

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
    const modalWrap = document.querySelector('#modal-wrapper')
    extraMealInfoDiv.style.display = 'flex';
    modalWrap.style.display = 'block'
    extraMealInfoDiv.addEventListener('click', (e) => {
        
      if (e.currentTarget === extraMealInfoDiv) {
        extraMealInfoDiv.style.display = 'none';
        modalWrap.style.display = 'none'
      }
    });
  };
  
  export const renderWarning = () => {
    const container = document.querySelector("#meal-images-container"); // or any suitable container
    container.innerHTML = '';

    const divider = document.createElement('div')
    divider.id = "searchErrorState"
  
    const warningMessage = document.createElement("p");
    warningMessage.textContent = "No meals found. Please try a different search.";
    warningMessage.style.color = 'red'; // Styling for visibility
    // Additional styling can be added here

    const wizardWalk = document.createElement("img");
    wizardWalk.src = ("https://github.com/Nico-Ahmad/marcy_RecipeWizard/blob/nico/src/assets/images/wizards/walking.gif?raw=true")
    const wizardTalk = document.createElement("p");
    wizardTalk.textContent = `("Where are those recipes?")`
    wizardTalk.id = "wizardTalk"
  
    divider.appendChild(warningMessage);
    divider.appendChild(wizardWalk);
    divider.appendChild(wizardTalk);
    container.append(divider)

  };

