const express = require('express');
const { createOrder,
        getAllUsersOrders,
        updateOrder,
        deleteOrder
} = require('../controllers/orders.controllers');
const { protectToken, protectAccountOwner } = require('../middlewares/users.middlewares');

const router = express.Router();

router.use(protectToken);

router.post('/', createOrder);

router.get('/me', getAllUsersOrders);

router.patch('/:id', protectAccountOwner, updateOrder);

router.delete('/:id', protectAccountOwner, deleteOrder);

module.exports = { ordersRouter: router };