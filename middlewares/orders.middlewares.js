const { Order } = require('../models/order.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const OrderExists = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const order = await Order.findOne({
        where: { id, status: 'active' }
    });
    
    if(!order) {
        return next(new AppError(`Could not find an active order for the id ${id}`, 404));
    }

    req.order = order;
    next();
});

module.exports = { OrderExists };