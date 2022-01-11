const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const tokenService = require("../services/token-service");
const { validationResult } = require("express-validator");

class UserController {
  async registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, email, password } = req.body;

    //See if user exists
    let user;
    let hash_Password;
    try {
      user = await userService.findUser({ email });
      if (user) {
        return res.status(400).json({ msg: "user Already exist!!" });
      }
      if (!user) {
        hash_Password = await hashService.hashPassword(password);
        user = await userService.createUser({
          firstName,
          email,
          password: hash_Password,
        });
        res.status(201).json({ message: "SignUp Successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  }

  async loginUser(req, res) {
    try {
      const errors = validationResult(req);
      let user;
      let matchUser;
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      user = await userService.findUser({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid Credentials !" });

      matchUser = await hashService.bcryptPassword(password, user);
      if (!matchUser)
        return res.status(400).json({ message: "Invalid Credentials !" });

      const { accessToken } = tokenService.generateTokens({ _id: user._id });
      return res
        .status(200)
        .json({ message: "Login success !", token: accessToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  }

  async displayUsers(req, res) {
    let users;
    try {
      users = await userService.findAll();
      if (!users) return res.json({ total_Users: users.length, users: {} });
      if (users) return res.json({ total_Users: users.length, users });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  }

  async displayById(req, res) {
    let user;
    let id;
    id = req.params.id;
    try {
      if (!id) return res.status(400).json({ message: "No such record found" });
      if (id) {
        user = await userService.findUserById(id);
        return res.status(400).json({ message: "record found", user });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  }
  async UpdateUserById(req, res) {
    let user;
    let id;

    id = req.params.id;
    if (id) {
      if (req.body.password) {
        req.body.password = await hashService.hashPassword(req.body.password);
      }
    }
    try {
      user = await userService.updateUser(id, req.body);
      return res.status(500).json({ message: "update Success", user });
    } catch (er) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  }

  async DelelteUserById(req, res) {
    let user;
    let id;

    id = req.params.id;

    try {
      if(!id) return   res.status(400).json({ message: "No User found" });
      user = await userService.deleteUser(id);
      return res.status(200).json({ message: "User deleted successfully...." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  }
}

module.exports = new UserController();
