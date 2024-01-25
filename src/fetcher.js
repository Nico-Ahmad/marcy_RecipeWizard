export const fetcher = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Fetch failed with status:", response.status);
  
      const data = await response.json();
  console.log(data)
      if (data.meals && data.meals.length > 0) {
        return data.meals.map((theMeal) => {
          let mealInfo = {
            image: theMeal.strMealThumb,
            id: theMeal.idMeal,
            title: theMeal.strMeal,
            origin: theMeal.strArea,
            instructions: theMeal.strInstructions,
            youtubeUrl: theMeal.strYoutube,
            ingredients: []
          };
  
          // Loop through each possible ingredient and its measure
          for (let i = 1; i <= 20; i++) {
            const ingredient = theMeal[`strIngredient${i}`];
            const measure = theMeal[`strMeasure${i}`];
  
            // Add the ingredient and its measure if the ingredient exists
            if (ingredient && ingredient.trim() !== '') {
              mealInfo.ingredients.push({ ingredient: ingredient, measure: measure });
            }
          }
  
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