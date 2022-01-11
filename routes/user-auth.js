const router = require('express').Router();
const userController = require('../contollers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const { check } = require("express-validator");

router.post('/signUp',
[
    check("firstName", "firstName is required").not().isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Enter password").not().isEmpty()
],
userController.registerUser);

router.post('/signIn',
[
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Enter password").not().isEmpty()
],
userController.loginUser);

router.get('/display',authMiddleware, userController.displayUsers);

router.get('/display/:id', userController.displayById);

router.get('/updateUser/:id', userController.UpdateUserById);
router.delete('/delete/:id', userController.DelelteUserById);


module.exports = router;