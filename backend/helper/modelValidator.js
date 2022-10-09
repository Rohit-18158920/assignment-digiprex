const modelFormat = {
    abandoned_checkout_url: {
        type: "string",
    },
    billing_address: {
        type: "object",
        fields:["address1","city","country","country_code","first_name","id","last_name","name","phone","province","province_code","zip"]
    },
    cart_token: {
        type: "string",
    },
    currency: {
        type: "object",
        fields:["currency"]
    },
    customer: {
        type: "object",
        fields:["accepts_marketing","email","first_name","id","last_name","tags"]
    },
    customer_locale: {
        type: "string",
    },
    device_id: {
        type: "number",
    },
    email: {
        type: "string",
    },
    gateway: {
        type: "string",
    },
    id: {
        type: "number",
    },
    landing_site: {
        type: "string",
    },
    location_id: {
        type: "number",
    },
    phone: {
        type: "object",
        fields:["phone"]
    },
    presentment_currency: {
        type: "object",
        fields:["presentment_currency"]
    },
    referring_site: {
        type: "string",
    },
    shipping_address: {
        type: "object",
        fields:["address1","city","country","country_code","first_name","last_name","name","latitude","longitude","phone","province","province_code","zip"]
    },
    source_name: {
        type: "string",
    },
    subtotal_price: {
        type: "string",
    },
    token: {
        type: "string",
    },
    total_discounts: {
        type: "string",
    },
    total_duties: {
        type: "string",
    },
    total_line_items_price: {
        type: "string",
    },
    total_price: {
        type: "string",
    },
    total_tax: {
        type: "string",
    },
    total_weight: {
        type: "number",
    },
    user_id: {
        type: "number",
    },
    order_info: {
        type: "object",
        fields: ["id"]
    }
};

const removalObject = {
    created_at:true,
    updated_at: true
}

function validateModel(model) {
    for( let key in modelFormat) {
        if(modelFormat.hasOwnProperty(key)){
        const object = modelFormat[key];
        if(!model.hasOwnProperty(key))
            return false;
        
        const existingObject = model[key];
        if(typeof existingObject !== object.type)
            return false;
        if(typeof existingObject === 'object') {
            const fields = object.fields;
            let keysExists = true;
            for(let i =0;i<fields.length;i++) {
                if(!existingObject.hasOwnProperty(fields[i])) {
                    keysExists= false;
                    break;
                }
            }
            if(!keysExists)
                return false;
        }
    }
}
    return true;
}

function validateCartToken(model) {
    const cartTokenStr = `/${model.cart_token}/`;
    const abandonedCheckoutUrl = model.abandoned_checkout_url;
    if(abandonedCheckoutUrl.includes(cartTokenStr))
        return true;
    return false;
}

function removefields(model) {
    let newModel = {};
    for( let key in model) {
        if(modelFormat.hasOwnProperty(key)){
            if(!removalObject[key]) {
                newModel[key] = model[key];
            }
            if(key === 'completed_at' && model[key]!== null) {
                newModel['completed'] =  true;
            }
        }
    }
    return newModel;
}
module.exports = {
    validateModel,
    validateCartToken,
    removefields
}