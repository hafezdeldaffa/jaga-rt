const axios = require('axios');
const { errorHandling } = require('./errorHandling');

exports.getDataCovidIndo = async () => {
    try {
       const result = await axios.get('https://apicovid19indonesia-v2.vercel.app/api/indonesia');
       return result;
    } catch (error) {
        errorHandling(error);
        throw error;
    }
}