//name check
const validateName = (name) => {
  const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  if (!regex.test(name)) {
    return { isValid: false, message: "Invalid name " };
  }
  return { isValid: true };
}

//email check
const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regex.test(email)) {
    return { isValid: false, message: "Invalid email." };
  }
  return { isValid: true };
}

//image extension check
const validateImage = (name) => {

}

//password extension check
const validatePassword = (password) => {
  if (password.length < 6) {
    return { isValid: false, message: " must be at least 6 characters long." };
  }
  return { isValid: true };
}

export {
  validateEmail,
  validateName,
  validateImage,
  validatePassword
}