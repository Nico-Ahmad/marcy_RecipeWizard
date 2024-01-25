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
            title: theMeal.strMeal,
            origin: theMeal.strArea,
            instructions: theMeal.strInstructions,
            youtubeUrl: theMeal.strYoutube,
          };
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