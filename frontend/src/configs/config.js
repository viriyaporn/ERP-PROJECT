const APP_SETTING = {
  PRD: {
    SERVICE_URL: 'https://api-test.cosmebizofficial.com',
  },
  DEV: {
    SERVICE_URL: 'http://localhost:3002',
  },
}

const env = import.meta.env.VITE_APP_ENV;

export default APP_SETTING[env];