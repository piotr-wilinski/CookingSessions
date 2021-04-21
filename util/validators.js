module.exports.validateRegisterInput = (
  username,
  name,
  surname,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = "Username must not be empty"
  }

  if (name.trim() === '') {
    errors.username = "Username must not be empty"
  }

  if (surname.trim() === '') {
    errors.username = "Username must not be empty"
  }

  if (email.trim() === '') {
    errors.email = "email must not be empty"
  } else {
    const regEx = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm;
    if (email.match(regEx) == null) {
      errors.email = `Email must be a valid email address ${email.match(regEx)} ${email}`
    }
  }

  if (password === '') {
    errors.password = 'Password must not empty'
  } else {
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords must match"
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = "Username must not be empty"
  }

  if (password === '') {
    errors.password = 'Password must not empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}