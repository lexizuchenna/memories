const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/Users");

// Register
const Register = async (req, res) => {
  const { email, password, firstName, lastName, password2 } = req.body;

  console.log(req.body)

  try {
    const user = await Users.findOne({email});
    if (user) {
      return res.status(400).json("User already exists, login");
    }

    if (password !== password2) {
      return res.status(400).json("Passwords don't match");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "abc123", {
      expiresIn: "1h",
    });

    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error)
    return res.status(500).json("Internal Sever Error");
  }
};

// Login
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json("No User Found");
    }

    const userPassword = await bcrypt.compare(password, user.password);

    if (!userPassword) {
      return res.status(400).json("Incorrect Password");
    }

    const token = jwt.sign({ email: user.email, id: user._id }, "abc123", {
      expiresIn: "1h",
    });

    return res.status(200).json({ result: user, token });
  } catch (error) {
    return res.status(500).json("Internal Sever Error");
  }
};

module.exports = {
  Register, Login
};
