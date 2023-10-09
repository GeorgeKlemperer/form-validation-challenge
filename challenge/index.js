const form = document.querySelector("form");
form.setAttribute("novalidate", "");

form.addEventListener("submit", (event) => {
  const allValid = form.checkValidity();
  if (!allValid) {
    event.preventDefault();
  }
});

const fields = form.querySelectorAll("input, select, textarea");
fields.forEach((field) => {
  //CUSTOM FEEDBACK
  const feedback = document.createElement("p");
  const id = field.id + "Error";
  feedback.setAttribute("id", id);

  // don't overwrite any existing aria-describedby
  const prevIds = field.getAttribute("aria-describedBy");
  const describedBy = prevIds ? prevIds + " " + id : id;
  field.setAttribute("aria-describedBy", describedBy);

  field.after(feedback);

  //1- Mark all fields as valid at first.
  field.setAttribute("aria-invalid", "false");

  //2- When a field fails validation mark it as invalid.
  field.addEventListener("invalid", () => {
    field.setAttribute("aria-invalid", "true");
    feedback.textContent = field.validationMessage;
  });

  //3- When a field is edited mark it valid again.
  field.addEventListener("input", () => {
    field.setAttribute("aria-invalid", "false");

    feedback.textContent = "";
  });
});
