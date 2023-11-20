const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
	// console.log(req.headers.authorization);
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
	req.userData = {
  	userId: decodedToken.userId,
  	userName: decodedToken.userName,
  	userRole: decodedToken.userRole,
	};
	console.log(req.userData);

	next();
  } catch (error) {
	res.status(401).json({ message: 'Auth failed!' });
  }
};
