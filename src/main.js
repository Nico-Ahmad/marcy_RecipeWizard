const fetchMealsByIngredient = async (userInput) => {
  try {
    const response = await fetch(
      `https://https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`
    );
    if (!response.ok) throw Error('fetch failed Status:', response.status)

    const meals = await response.json();
    console.log('heres the data', meals)
    return meals
  } catch (error) {
    console.error('caught error', error)
  } 
};

// const fetchMealDetails


const fetchTest = async () => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`);
    if (!response.ok) throw Error('fetch failed Status:', response.status)

    const data = await response.json();

    console.log(data)

  } catch {
    console.error('caught error', error)
  }
}

const fetch = ()

const main = () => {
  fetchTest()
};
main();
