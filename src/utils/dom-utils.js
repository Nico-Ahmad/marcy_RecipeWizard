
export const handleSubmit = async (e, callback) => {
  e.preventDefault();

  // get form data
  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);
  const userIngredients = formObj.ingredientUserInput
  console.log("here is your data:", formObj.ingredientUserInput);

  form.reset();
  await callback(userIngredients);
};



