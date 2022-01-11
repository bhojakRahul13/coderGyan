const userModel = require("../models/user-model");
const UserModel = require("../models/user-model");
class UserService {
  async findUser(filter) {
    const user = await UserModel.findOne(filter);
    return user;
  }

  async findUserById(id) {
    const user = await UserModel.findById(id).select("-password -__v");
    return user;
  }

  async findAll() {
    const users = await UserModel.find().select("-password -__v");
    return users;
  }

  async createUser(data) {
    const user = await UserModel.create(data);
    return user;
  }

  async updateUser(id, user) {
    const newUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: user,
      },
      { new: true }
    );
    return newUser;
  }

  async deleteUser(id){
      const user =  await userModel.findByIdAndDelete(id);
      return user;
  }
}

module.exports = new UserService();
