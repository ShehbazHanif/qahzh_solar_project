// helper/sendSms.js
const axios = require('axios');

const sendSms = async (phone, message) => {
    const apiUrl = 'https://srv694651.hstgr.cloud/n8n/webhook/otp-service';

    const username = 'devteam';
    const password = 'Ayzenn@devteam';
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    const requestBody = {
        receiver: phone,          // e.g., '+923001234567'
        text: message,            // e.g., 'Your OTP is 123456'
        type: 'sms'               // ✅ optional: tell N8N this is an SMS
    };

    try {
        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                'Authorization': `Basic ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("SMS sent successfully", response.data);
        

        return {
            success: true,
            response: response.data
        };
    } catch (error) {
        console.error("Error sending SMS:", error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data || error.message
        };
    }
};

module.exports = sendSms;
