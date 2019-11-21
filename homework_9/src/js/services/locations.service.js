import axios from '../plugins/axios';

/**
 * Function of getting countries.
 */
export async function getCountries() {
  try {
    const response = await axios.get('/location/get-countries');
    return Object.values(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Function of getting cities.
 * @param {Number} country - ID of country
 */
export async function getCities(country) {
  try {
    const response = await axios.get(`/location/get-cities/${country}`);
    return Object.values(response);
  } catch (err) {
    return Promise.reject(err);
  }
}