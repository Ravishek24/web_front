// PayU Payment Gateway Service (TEST ENVIRONMENT ONLY)
// This is for testing purposes. In production, use a different gateway.

import CryptoJS from 'crypto-js'

const PAYU_CONFIG = {
  // Test Environment Credentials
  key: 'A6mAn0',
  salt: 'fB9k8WEMr2jPJVPkS0yG6U6CubhswdLg',
  testUrl: 'https://test.payu.in/_payment',
  productionUrl: 'https://secure.payu.in/_payment',
  // Using test environment for now
  paymentUrl: 'https://test.payu.in/_payment'
}

/**
 * Generate SHA-512 hash for PayU
 * Hash format: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
 */
function generateHash(params) {
  const {
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1 = '',
    udf2 = '',
    udf3 = '',
    udf4 = '',
    udf5 = '',
    salt
  } = params

  // Construct hash string in the exact order required
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`

  // Generate SHA-512 hash using crypto-js
  const hash = CryptoJS.SHA512(hashString).toString()

  return hash
}

/**
 * Generate unique transaction ID
 */
function generateTxnId() {
  return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase()
}

/**
 * Initialize PayU payment
 * @param {Object} paymentData - Payment details
 * @param {Object} paymentData.plan - Subscription plan name
 * @param {Number} paymentData.amount - Amount in INR
 * @param {String} paymentData.firstname - Customer first name
 * @param {String} paymentData.email - Customer email
 * @param {String} paymentData.phone - Customer phone
 * @param {String} paymentData.lastname - Customer last name (optional)
 */
export function initiatePayUPayment(paymentData) {
  const {
    plan,
    amount,
    firstname,
    email,
    phone,
    lastname = '',
    address1 = '',
    address2 = '',
    city = '',
    state = '',
    country = 'India',
    zipcode = ''
  } = paymentData

  // Generate transaction ID
  const txnid = generateTxnId()

  // Prepare payment parameters
  const paymentParams = {
    key: PAYU_CONFIG.key,
    txnid: txnid,
    amount: amount.toString(),
    productinfo: `${plan} Membership Subscription`,
    firstname: firstname,
    email: email,
    phone: phone,
    lastname: lastname,
    surl: `${window.location.origin}/payment/success?txnid=${txnid}`,
    furl: `${window.location.origin}/payment/failure?txnid=${txnid}`,
    address1: address1,
    address2: address2,
    city: city,
    state: state,
    country: country,
    zipcode: zipcode,
    udf1: plan, // Store plan name in udf1
    udf2: 'subscription', // Store type in udf2
    udf3: '',
    udf4: '',
    udf5: ''
  }

  // Generate hash
  const hash = generateHash({
    ...paymentParams,
    salt: PAYU_CONFIG.salt
  })

  // Add hash to params
  paymentParams.hash = hash

  // Create and submit form to PayU
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = PAYU_CONFIG.paymentUrl
  form.style.display = 'none'

  // Add all parameters as hidden inputs
  Object.keys(paymentParams).forEach(key => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = paymentParams[key]
    form.appendChild(input)
  })

  // Append form to body and submit
  document.body.appendChild(form)
  form.submit()
}

/**
 * Verify hash from PayU response
 */
export function verifyPayUHash(responseData) {
  const {
    status,
    firstname,
    amount,
    txnid,
    productinfo,
    hash,
    key,
    email,
    salt
  } = responseData

  // Construct hash string for verification
  // Format: sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
  const hashString = `${salt}|${status}||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`

  // Generate SHA-512 hash using crypto-js
  const calculatedHash = CryptoJS.SHA512(hashString).toString()

  return calculatedHash.toLowerCase() === hash.toLowerCase()
}

export { PAYU_CONFIG }

export default {
  initiatePayUPayment,
  verifyPayUHash,
  PAYU_CONFIG
}

