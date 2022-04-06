const axios = require('axios');

const dashboard = (req, res, next) => {
  res.render('dashboard');
};

const pieChart = async (req, res, next) => {
  try {
    const fecthData = await axios.get(`https://data.covid19.go.id/public/api/pemeriksaan-vaksinasi.json`);
    res.status(200).json(fecthData.data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const dailyData = async (req, res, next) => {
  try {
    const fetchData = await axios.get(`https://data.covid19.go.id/public/api/update.json`);
    res.status(200).json(fetchData.data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  dashboard,
  pieChart,
  dailyData,
};
