const bcrypt = require("bcrypt");

class HashService {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    console.log("salt", salt);
    const hash_password = bcrypt.hash(password, salt);
    return hash_password;
  }

  async bcryptPassword(password,user) {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  }
}

module.exports = new HashService();
