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
                    mailer.sendEmail(result[0])
                    .then(async info => {
                        console.log(info);
                        await dbUtil.updateStatus(cartToken);
                    })
                    .catch(err => {
                        console.log("Failed with response code:: "+err.responseCode);
                    })
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