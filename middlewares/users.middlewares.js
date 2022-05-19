const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const jwt = require('jsonwebtoken');

const protectToken = catchAsync(async(req, res, next) => {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(new AppError('Session not valid', 403));
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
        where: { id: decoded.id, status: 'active' }
    });

    if(!user) return next(new AppError('Your session has expired', 403));

    req.sessionUser = user;
    next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
    if (req.sessionUser.role !== 'admin') {
      return next(new AppError('Access not granted', 403));
    }
  
    next();
  });

const userExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ 
        where: { id, status: 'active' }, 
        attributes: { exclude: [ 'password' ]}
    });

    if (!user) {
        return next(new AppError(`User not found for the id ${id}`, 404)); 
    }

    req.user = user;
    next();
});

const protectAccountOwner = catchAsync(async(req, res, next) => {
    const { sessionUser, user } = req;

    if( sessionUser.id !== user.id) {
        return next(new AppError('You are not able to modify foreign accounts', 403));
    }

    next();
});

module.exports = { protectToken, protectAdmin, userExists, protectAccountOwner };