const express = require('express');
const { createRestaurant,
        getAllRestaurants, 
        getRestaurantById,
        updateRestaurant,
        deleteRestaurant,
        createReview,
        updateReview,
        deleteReview
    } = require('../controllers/restaurants.controllers.js');

const { restaurantExists, reviewExists } = require('../middlewares/restaurants.middlewares');
const { protectToken, protectAdmin, protectAccountOwner } = require('../middlewares/users.middlewares');
const { createRestaurantValidations } = require('../middlewares/validations.middlewares');

const router = express.Router();

router.post('/', protectAdmin, createRestaurantValidations, createRestaurant);

router.get('/', getAllRestaurants);

router.get('/:id', restaurantExists, getRestaurantById);

router.patch('/:id', protectAdmin, restaurantExists, updateRestaurant);

router.delete('/:id', protectAdmin, restaurantExists, deleteRestaurant);

router.post('/reviews/:id', restaurantExists, protectToken, createReview);

router.patch('/reviews/:restaurantId/:id', restaurantExists, reviewExists, protectAccountOwner, updateReview);

router.delete('/reviews/:restaurantId/:id', restaurantExists, reviewExists, protectAccountOwner, deleteReview);

module.exports = { restaurantsRouter: router };


