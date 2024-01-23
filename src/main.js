const FetchMealByIngredient = async (userInput) => {
  try {
    const response = await fetch(
      `www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`
    );
    const data = await response.json();
    console.log('heres the data', data)
    if (!response.ok) throw Error('fetch failed Status:', response.status)
  } catch (error) {
    console.error('caught error', error)
  }
};

const main = () => {};
main();
