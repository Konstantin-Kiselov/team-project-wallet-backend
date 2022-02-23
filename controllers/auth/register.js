const bcrypt = require("bcryptjs");
const { BadRequest, Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");

const { joiRegisterSchema } = require("../../models/user");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const token = jwt.sign({}, SECRET_KEY, { expiresIn: "5h" });
    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
      token,
    });
    res.status(201).json({
      token,
      user: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
