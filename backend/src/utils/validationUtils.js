function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function isValidPhone(phone) {
  const re = /^[6-9]\d{9}$/;
  return re.test(String(phone));
}

module.exports = {
  isValidEmail,
  isValidPhone,
};
