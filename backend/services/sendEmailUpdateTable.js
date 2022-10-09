const dbUtil = require('../helper/dbHelper');
const mailer = require('./sendEmail');

async function sendEmailUpdateTable() {
    try {
        const cartTokens = await dbUtil.getcartToken();
        if(cartTokens.length>0) {
            cartTokens.map(async cartTokenObject => {
                const cartToken = cartTokenObject.cart_token;
                const result = await dbUtil.getCartInfoByToken(cartToken);
                if(result.length>0) {
                const sendEmailResult = await mailer.sendEmail(result[0]);
                if(sendEmailResult.status === 200) {
                    await dbUtil.updateStatus(cartToken);
                }
            }

            })
        }
    } catch(err) {
        console.log(err);
        return err;
    }

}

module.exports = {
    sendEmailUpdateTable,
}