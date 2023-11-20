const express = require('express');
const RegisterRouter = express.Router();
const bcrypt = require('bcryptjs');
const registerDB = require('../model/RegisterSchema');
const loginDB = require('../model/LoginSchema');

RegisterRouter.post('/', async (req, res) => {
  try {
    const { username, name, email, phone, password, role } = req.body;

    const existingUser = await loginDB.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, error: true, message: 'User already exists' });
    }

    const existingPhone = await registerDB.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ success: false, error: true, message: 'Phone number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const loginRecord = new loginDB({
      username,
      password: hashedPassword,
      role, 
    });

    const savedLogin = await loginRecord.save();

    const registrationRecord = new registerDB({
      login_id: savedLogin._id,
      name,
      email,
      phone,
      role,
    });

    const savedRegistration = await registrationRecord.save();

    res.status(201).json({
      success: true,
      error: false,
      message: 'Registration completed',
      details: savedRegistration,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: true, message: 'Something went wrong' });
  }
});

module.exports = RegisterRouter;
