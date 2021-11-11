import BackendAPI from 'services';
import local from './local';
import production from "./production";

const getEnvConfig = () => {
    let config;
    if (process.env.REACT_APP_ENV === 'live' || process.env.NODE_ENV === 'production') {
        BackendAPI.setENV('PROD');
        config = production;
    } else {
        BackendAPI.setENV('LOCAL');
        config = local;
    }
    return config;
};


const shared = {};
const config = Object.assign({}, shared, getEnvConfig());

export default config;
