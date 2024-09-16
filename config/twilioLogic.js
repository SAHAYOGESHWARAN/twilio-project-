const twilio = require('twilio');

// Load environment variables
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendVerification = async (req, res, phoneNumber) => {
  try {
    const verification = await client.verify.services(process.env.TWILIO_SERVICE_SID)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });
    
    return verification;
  } catch (error) {
    console.error('Error sending verification:', error);
    res.status(500).json({ message: 'Failed to send verification code' });
  }
};

const checkVerification = async (req, res, phoneNumber, code) => {
  try {
    const verificationCheck = await client.verify.services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks
      .create({ to: phoneNumber, code: code });
    
    return verificationCheck.status;  // 'approved' or 'pending'
  } catch (error) {
    console.error('Error checking verification:', error);
    res.status(500).json({ message: 'Failed to check verification code' });
  }
};

module.exports = {
  sendVerification,
  checkVerification
};
