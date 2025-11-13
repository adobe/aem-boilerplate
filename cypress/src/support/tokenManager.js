// tokenManager.js
const axios = require('axios');
const path = require('path');

// Safe dotenv configuration that handles missing TTY
try {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
} catch (error) {
  // Silently handle dotenv loading errors in environments without proper TTY support
}

// Safe logging function that handles missing TTY
function safeLog(...args) {
  try {
    if (typeof console !== 'undefined' && console.log && 
        typeof process !== 'undefined' && process && process.stdout) {
      console.log(...args);
    }
  } catch (error) {
    // Silently ignore logging errors in environments without proper TTY support
  }
}

class TokenManager {
  constructor() {
    this.token = null;
    this.tokenExpiry = null;
  }

  async getValidToken() {
    if (this.isTokenValid()) {
      return this.token;
    }
    return await this.generateToken();
  }

  isTokenValid() {
    return this.token && this.tokenExpiry && Date.now() < this.tokenExpiry;
  }

  async generateToken() {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://ims-na1.adobelogin.com/ims/token/v3',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: new URLSearchParams({
          client_id: Cypress.env("IMS_CLIENT_ID"),
          client_secret: Cypress.env("IMS_CLIENT_SECRET"),
          grant_type: 'client_credentials',
          scope: 'openid,AdobeID,email,profile,additional_info.roles,additional_info.projectedProductContext,commerce.accs'
        })
      });

      this.token = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      return this.token;
    } catch (error) {
      safeLog('Token generation failed:', error.message);
      
      // If this is a CORS error, provide helpful message
      if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
        safeLog('🚨 CORS Error: Adobe IMS requests must run in Node.js context');
      }
      
      throw error;
    }
  }
}

module.exports = TokenManager;
