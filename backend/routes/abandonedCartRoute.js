const express = require('express');
const router = express.Router();
const dbUtil = require('../helper/dbHelper');
const validator = require('../helper/modelValidator');

router.post("/addData", async (req, res) => {
    let body = req.body;

    try {
        let validatorResult = validator.validateModel(body);
        if (!validatorResult) {
            throw {
                status: 400,
                message: "Invalid request body"
            };
        }
        if (!validator.validateCartToken(body)) {
            throw {
                status: 400,
                message: "Invalid cart Token"
            };
        }
        const model = validator.removefields(body);
        const result = await dbUtil.saveCartInfo(model);
        if (result.code !== 200) {
            throw result;
        }
        res.status(200).json({ message: "Successfully inserted data to database" });
    } catch (err) {
        let code = err.code || err.status;
        let message = err.message || "Failed to insert record";
        if (code === 11000) {
            code = 409;
            message = "Entry already exists";
        }
        res.status(code || 500).json({
            message: message
        });
    }
});

router.get("/getDetails", async (req, res) => {
    try {
        const data = await dbUtil.getCartInfo();
        res.status(200).json({ data });
    } catch (err) {
        res.status(404).json({
            message: "Data not present"
        })
    }
});

router.get("/updateCompletionStatus", async (req, res) => {
    const { cart_token } = req.query;
    
    try {
        if (!cart_token) {
            throw {
                status: 400,
                message: "Cart Token not present"
            }
        }
        await dbUtil.updateCompletionStatus(cart_token);
        res.status(200).json({ 
            message: "SuccessFully placed order"
         });
    } catch (err) {
        res.status(err.status || 500).json({ message:err.message });
    }
});

module.exports = router;
