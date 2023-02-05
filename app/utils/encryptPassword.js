const bcrypt = require('bcrypt');

async function encryptPassword(password) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
}

module.exports = { encryptPassword };
