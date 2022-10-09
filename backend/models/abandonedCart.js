const mongoose = require("mongoose");
const abandonedCartSchema = new mongoose.Schema({
    abandoned_checkout_url: {
        type: String,
        required: true,
    },
    billing_address: {
        type: JSON,
        required: true
    },
    buyer_accepts_marketing: {
        type: Boolean,
        required: true,
        default: false
    },
    buyer_accepts_sms_marketing: {
        type: Boolean,
        required: true,
        default: false
    },
    cart_token: {
        type: String,
        required: true,
        unique: true
    },
    closed_at: {
        type: Date,
        default: null
    },
    completed_at: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    currency: {
        type: JSON,
        required: true,
    },
    customer: {
        type: JSON,
        required: true,
    },
    customer_locale: {
        type: String,
        required: true
    },
    device_id: {
        type: Number,
        required: true
    },
    discount_codes: {
        type: JSON,
        required: true,
        default: {}
    },
    email: {
        type: String,
        required: true,
    },
    gateway: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true
    },
    landing_site: {
        type: String,
        required: true,
    },
    line_items: {
        type: JSON,
        required: true,
        default:{}
    },
    location_id: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        default: null
    },
    phone: {
        type: JSON,
        required: true,
    },
    presentment_currency: {
        type: JSON,
        required: true,
    },
    referring_site: {
        type: String,
        required: true,
    },
    shipping_address: {
        type: JSON,
        required: true
    },
    sms_marketing_phone: {
        type: String,
        default: null
    },
    shipping_lines: {
        type: JSON,
        required: true,
        default: {},
    },
    source_name: {
        type: String,
        required: true,
    },
    subtotal_price: {
        type: String,
        required: true,
    },
    tax_lines: {
        type: JSON,
        required: true,
        default: {},
    },
    taxes_included: {
        type: Boolean,
        required: true,
        default: false,
    },
    token: {
        type: String,
        required: true,
    },
    total_discounts: {
        type: String,
        required: true,
    },
    total_duties: {
        type: String,
        required: true,
    },
    total_line_items_price: {
        type: String,
        required: true,
    },
    total_price: {
        type: String,
        required: true
    },
    total_tax: {
        type: String,
        required: true,
    },
    total_weight: {
        type: Number,
        required: true,
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    user_id: {
        type: Number,
        required: true
    },
    next_schedule: {
        type: Date,
        required: true,
    },
    status: {
        type: Number,
        default: 1,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    order_info: {
        type: JSON,
        required: true,
        default: {}
    },
  });

const AbandonedCart = mongoose.model("AbandonedCart",abandonedCartSchema);

module.exports = AbandonedCart;
