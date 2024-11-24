
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../models/user");
const { AUTH_TOKEN } = require("../constants");

async function LogIn(req, res) {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({message:"This email has not been registered!"});
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({message:"Invalid Credentials!"});
  }

  const token = jwt.sign(
    {
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      isAdmin: user.role === ADMIN,
      expiresIn: '365d'
    },
    "1@3456Qw-"
  );
 
  res.header(AUTH_TOKEN, token).send({
    token,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    isAuthenticated: true,
  });
}


async function signUp(req, res) {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({message:error})
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res
      .status(400)
      .json({ message: "Try any other email, this email is already registered!" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, salt),
    });
    const response = await user.save();
    res.send(_.pick(response, ["firstName", "lastName", "email", "_id"]));
  } catch (ex) {
    res.status(400).json({message:ex.message});
  }
}

module.exports = {
  signUp,
  LogIn,
};
