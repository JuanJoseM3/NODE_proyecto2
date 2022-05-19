const express = require('express');

const { createUser, 
        login, 
        updateUser, 
        deleteUser, 
        getAllUsersOrders, 
        getOrderById } = require('../controllers/users.controllers');

const { protectToken, userExists, protectAccountOwner } = require('../middlewares/users.middlewares');

const { createUserValidations, checkValidations } = require('../middlewares/validations.middlewares');

const router = express.Router();

router.post('/signup', createUserValidations, checkValidations, createUser);

router.post('/login', login);

router.use(protectToken);

router.patch('/:id', userExists, protectAccountOwner, updateUser);

router.delete('/:id', userExists, protectAccountOwner, deleteUser);

router.get('/orders', getAllUsersOrders);

router.get('/orders/:id', getOrderById);

module.exports = { usersRouter: router };