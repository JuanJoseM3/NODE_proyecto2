const { Restaurant } = require('../models/restaurant.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { Review } = require('../models/review.model');

const restaurantExists = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
        where: { id },
        include: { model: Review }
    });

    if(!restaurant) {
        return next(new AppError(`Could not find restaurant for the id ${id}`, 404));
    }

    req.restaurant = restaurant;
    next();
});

const reviewExists = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const review = await Review.findOne({
        where: { id }
    });

    if(!review) {
        return next(new AppError(`Could not find review for the id ${id}`, 404));
    }

    req.review = review;
    next();
});

module.exports = { restaurantExists, reviewExists };