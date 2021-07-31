require('dotenv').config();

const dev_options = {
    env: {
        CLIENT_URL: process.env.DEV_CLIENT_URL,
    }
} 

const prod_options = {
    env: {
        CLIENT_URL: process.env.PROD_CLIENT_URL,
    }
}

const node_env = process.env.NODE_ENV || 'development';
const config = node_env === 'development' ? dev_options : prod_options;

module.exports = {
    ...config
}