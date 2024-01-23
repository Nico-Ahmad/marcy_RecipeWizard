const FetchMealByIngredient = async (userInput) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`
    );
    const meals = await response.json();
    console.log('heres the data', meals)
    if (!response.ok) throw Error('fetch failed Status:', response.status)
  } catch (error) {
    console.error('caught error', error)
  } 
};

const main = () => {
  FetchMealByIngredient();
};
main();
