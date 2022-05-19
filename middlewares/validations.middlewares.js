const { body, validationResult } = require('express-validator');

const createUserValidations = [
    body('name').notEmpty().withMessage('Name can\'t be empty'),
    body('email').notEmpty().withMessage('Email can\'t be empty')
                 .isEmail().withMessage('Must provide a valid email'),
    body('password').notEmpty().withMessage('Please introduce a password')
                    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters length')
];

const createRestaurantValidations = [
    body('name').notEmpty().withMessage('Name can\'t be empty'),
    body('address').notEmpty().withMessage('Address can\'t be empty'),
    body('rating').contains(1 || 2 || 3 || 4 || 5)
];

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const messages = errors.array().map(({ msg }) => msg);
        const errorDescription = messages.join(', ');

        return res.status(400).json({
            status: 'Error',
            message: errorDescription
        })
    }
    next();
};

module.exports = { createUserValidations, createRestaurantValidations, checkValidations };