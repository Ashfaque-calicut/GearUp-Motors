const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const checkAccess = req.userData.userRole;

  if (!(checkAccess === 2)) {
	res.status(401).json({
  	Error: true,
  	Success: false,
  	message: 'You do not have access',
	});
  } else {
	next();
  }

  res.status(401).json({ message: 'Authorization Failed!' });
};
