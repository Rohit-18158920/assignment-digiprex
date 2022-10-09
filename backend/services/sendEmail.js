const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
    service: config.emailServiceProvider,
    auth: {
      user: config.emailConnectionUsername,
      pass: config.emailConnectionPassword
    }
});

let mailOptions = {
    from: config.adminEmailAddress,
    to: '',
    subject: 'Order Completion Pending!',
    html: ''
}

async function sendEmail(userInfo) {
    mailOptions.html = getEmailHtml(userInfo);
    mailOptions.to = userInfo.email;
    try{
    let result = await transporter.sendMail(mailOptions);
    result.status = 200;
    return result;
    } catch(err) {
        console.log(err);
        err.status = 400;
        return err;
    }
};

function getEmailHtml(userInfo) {
    let html = `<html class="gr__">
    <body data-gr-c-s-loaded="true">
        <div class="">
            <div class="aHl"></div>
            <div id=":1ay" tabindex="-1"></div>
            <div id=":19r" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
                <div id=":19s" class="a3s aiL msg-2223738615115543531"><u></u>
                    <div width="100%" style="margin:0;padding:0!important">
                        <center style="width:100%;background-color:#ffffff">
                            <div style="max-width:650px;margin:0 auto">
                                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0"
                                    width="100%" style="margin:auto">
                                    <tbody>
                                        <tr>
                                            <td style="background-color:#fff;min-width:650px">
                                                <table width="650" cellpadding="0" cellspacing="0" border="0"
                                                    style="background-color:#ffffff;text-align:left">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div style="font-weight:bold;font-size:24px;color:#111111">
                                                                    Dear ${userInfo.customer.first_name}
                                                                    ${userInfo.customer.last_name},</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table width="650" cellpadding="0" cellspacing="0" border="0"
                                                    style="background-color:#ffffff;text-align:left;margin-top:8px;color:#111111">
                                                    <tbody>
                                                        <tr>
                                                            <td style="color:#111111;line-height:26px;font-size:16px">
                                                                Click the link
                                                                below or visit the <span class="il">SnowDevil</span> website
                                                                right away to complete your order.
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span
                                                                    style="font-weight:bold;font-size:20px;line-height:28px;color:#111111;display:inline-block;margin-top:24px">Order
                                                                    Information</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table width="650" cellpadding="0" cellspacing="0" border="0"
                                                    style="background-color:#f3f4f5;text-align:center;margin-top:8px;padding:0 24px;color:#484848">
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                style="display:inline-block;padding-top:32px;width:100%;font-size:20px">
                                                                <span
                                                                    style="text-align:left;font-weight:bold;float:left">Order
                                                                    Date</span>
                                                                <span
                                                                    style="text-align:right;color:#111111;font-weight:600;float:right">${new Date(userInfo.created_at).toDateString()}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style="display:inline-block;padding-top:20px;width:100%;font-size:20px">
                                                                <span
                                                                    style="text-align:left;font-weight:bold;float:left">Order
                                                                    ID</span>
                                                                <span
                                                                    style="float:right;text-align:right;color:#111111;font-weight:600">${userInfo.order_info.id}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style="display:inline-block;padding-top:20px;width:100%;font-size:20px">
                                                                <span
                                                                    style="text-align:left;font-weight:bold;float:left">Total
                                                                    Amount</span>
                                                                <span
                                                                    style="float:right;text-align:right;color:#111111;font-weight:600">
                                                                    ${userInfo.total_price}
                                                                    ${userInfo.currency.currency}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style="padding-top:24px;display:inline-block;padding-bottom:32px">
                                                                <a style="width:261px;height:64px;line-height:64px;text-align:center;font-weight:bold;font-size:24px;border-radius:8px;"
                                                                    href="http://localhost:5000/abandonedCart/updateCompletionStatus?cart_token=#cartToken#"
                                                                    target="_blank">
                                                                    Complete Order Now
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                                    style="background:#ffffff;padding:16px 24px 16px;color:#111111">
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-size:20px;font-weight:bold">
                                                                Reminder
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style="font-size:16px;margin-top:8px;line-height:26px;margin-top:4px">
                                                                This is a system-generated mail. Kindly do not reply.
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size:16px;margin-top:8px;line-height:26px">
                                                                Thank you for choosing <span class="il">SnowDevil</span>!
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </center>
                        <div class="yj6qo"></div>
                        <div class="adL">
                        </div>
                    </div>
                    <div class="adL">
    
    
                    </div>
                </div>
            </div>
            <div id=":1au" class="ii gt" style="display:none">
                <div id=":1at" class="a3s aiL "></div>
            </div>
            <div class="hi"></div>
        </div>
    </body>
    
    </html>`;
    html = html.replace('#cartToken#',userInfo.cart_token);
    return html;
}

module.exports = {
    sendEmail
}
