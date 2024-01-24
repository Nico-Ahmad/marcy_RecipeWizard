// temp
export const handleSubmit = (e) => {
    e.preventDefault();

  // get form data
  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);

  console.log("here is your data:", formObj.ingredientUserInput);

 
  form.reset();

}