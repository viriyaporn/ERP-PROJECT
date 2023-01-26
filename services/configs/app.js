const APP_SETTING = {
  PRD: {
    FRONTEND_URL: 'https://app-test.cosmebizofficial.com',
    BACKOFFICE_URL: 'https://backoffice-test.cosmebizofficial.com',
  },
  DEV: {
    FRONTEND_URL: 'http://localhost:5173',
    BACKOFFICE_URL: 'http://localhost:5174',
  },
}

const env = process.env.ENV ?? 'DEV';

module.exports = APP_SETTING[env];