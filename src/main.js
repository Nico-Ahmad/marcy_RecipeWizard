const fetchMealByIngredient = async (userInput) => {
  try {
    const response = await fetch(
      `https://https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`
    );
    const meals = await response.json();
    console.log('heres the data', meals)
    if (!response.ok) throw Error('fetch failed Status:', response.status)
  } catch (error) {
    console.error('caught error', error)
  } 
};


const fetchTest = async () => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=lemon`);
    if (!response.ok) throw Error('fetch failed Status:', response.status)

    const data = await response.json();

    console.log(data)

  } catch {
    console.error('caught error', error)
  }
}

const main = () => {
  fetchTest()
};
main();
