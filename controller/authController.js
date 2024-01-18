const { hashPassword, comparePassword } = require("../helper/authHelper");
const userModel = require("../model/userModel");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.status(500).send({
        success: false,
        message: "Name is require",
      });
    }
    if (!email) {
      return res.status(500).send({
        success: false,
        message: "Email is require",
      });
    }
    if (!password) {
      return res.status(500).send({
        success: false,
        message: "Password is require",
      });
    }
    if (!phone) {
      return res.status(500).send({
        success: false,
        message: "Phone is require",
      });
    }
    if (!address) {
      return res.status(500).send({
        success: false,
        message: "Address is require",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      res.status(500).send({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    return res.status(200).send({
      success: true,
      message: "user has been register",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Invalid email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User is not register",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Password not matched",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "User has been login",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { name, password, email, address, phone } = req.body;
    const user = await userModel.findOne({ email });
    if (password && password.length < 6) {
      return res.status(500).send({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;
    // update user
    const updateUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user?.name,
        address: address || user?.address,
        phone: phone || user?.phone,
        password: hashedPassword || user?.password,
      },
      { new: true }
    );

    updateUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "User has been updated",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update user API",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  updateProfileController,
};
