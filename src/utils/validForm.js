export const validForm = ({ email, fullname, username, password }) => {
  const err = {};
  if (!email) {
    err.email = "Please add your Email.";
  } else if (!validateEmail(email)) {
    err.email = "Email format is incorrect.";
  }

  if (!fullname) {
    err.fullname = "Please add your full name.";
  } else if (fullname.length > 25) {
    err.fullname = "Full name is up to 25 characters.";
  }

  if (!username) {
    err.username = "Please add your user name.";
  } else if (username.toLowerCase().replace(/ /g, "").length > 25) {
    err.username = "User name is up to 25 characters.";
  }

  if (!password) {
    err.password = "Please add your Password.";
  } else if (password.length < 6) {
    err.password = "Password must be at least 6 characters.";
  }

  return { errMsg: err, errLength: Object.keys(err).length };
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
