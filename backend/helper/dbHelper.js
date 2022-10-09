const abandonedCartModel = require('../models/abandonedCart');
const config = require('../config');
const firstScheduleTimer = config.firstScheduleTimer * 60 * 1000;
const secondScheduleTimer = config.secondScheduleTimer * 60 * 1000;
const thirdScheduleTimer = config.thirdScheduleTimer * 60 * 1000;


async function saveCartInfo(model) {
    const currentDate = new Date();
    let newDateObj = new Date(currentDate.getTime() + firstScheduleTimer);
    newDateObj.setSeconds(0);
    newDateObj.setMilliseconds(0);
    model.next_schedule = newDateObj;
    const cartInfo = new abandonedCartModel(model);
    try {
        let result = await cartInfo.save();
        result.code = 200;
        return result;
    } catch (err) {
        return err;
    }
}
async function getcartToken() {
    let result = [];
    try {
        let currentDate = new Date();
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        console.log('currentDate'+ currentDate);
        result = await abandonedCartModel
                .find(
                    { next_schedule: currentDate, status: { $ne: 4 }, completed: false }
                    , '-_id cart_token');
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function getCartInfo() {
    let result = [];
    try {
        result = await abandonedCartModel.find();
    } catch (err) {
        console.log(err);
    }
    return result;
}
async function getCartInfoByToken(cartToken) {
    let result = [];
    try {
        result = await abandonedCartModel.find({ cart_token: cartToken });
    } catch (err) {
        console.log(err);
    }
    return result;
}
async function updateStatus(cartToken) {
    let result = {};
    try {
        let cartInfoList = await getCartInfoByToken(cartToken);
        if (cartInfoList.length === 0)
            return {
                message: 'No records present for update'
            };
        let cartInfo = cartInfoList[0];
        let createdAt = new Date(cartInfo.created_at);
        createdAt.setSeconds(0);
        createdAt.setMilliseconds(0);
        let nextSchedule = new Date(cartInfo.next_schedule);
        const updatedAt = new Date();
        let status = cartInfo.status;
        let closedAt = null;
        if (status === 1) {
            nextSchedule = new Date(createdAt.getTime() + secondScheduleTimer);
            status = 2;
        } else if (status === 2) {
            nextSchedule = new Date(createdAt.getTime() + thirdScheduleTimer);
            status = 3;
        } else if(status === 3) {
            status = 4;
            closedAt = new Date();
        }
        result = await abandonedCartModel.findOneAndUpdate({ cart_token: cartToken }, { "$set": { "status": status, "next_schedule": nextSchedule, "closed_at":closedAt, "updated_at": updatedAt } });
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function updateCompletionStatus(cartToken) {
    let result = {};
    try {
        let cartInfoList = await getCartInfoByToken(cartToken);
        if (cartInfoList.length === 0)
            return {
                message: 'No records present for update'
            };
            const cartInfo = cartInfoList[0];
            if(cartInfo.completed) {
                return {
                    message: "Record Already updated"
                }
            }
            const updatedAt = new Date();
            const completedAt = new Date();
            result = await abandonedCartModel.findOneAndUpdate({ cart_token: cartToken }, { "$set": { "completed": true, "completed_at": completedAt, "updated_at": updatedAt } });
            return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    saveCartInfo,
    getCartInfo,
    getCartInfoByToken,
    updateStatus,
    getcartToken,
    updateCompletionStatus,
}