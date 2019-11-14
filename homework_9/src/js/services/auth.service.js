import axios from '../plugins/axios';

/**
 * Funxtion login. Make login request to API
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      JSON.stringify({ email, password }),
    );

    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

/**
 * Funxtion login. Make login request to API
 * @param {String} regEmail
 * @param {String} regPassword
 * @param {String} first_name
 * @param {String} last_name
 * @param {Number} phone
 * @param {String} nickname
 * @param {String} gender_orientation
 * @param {Date} date_of_birth
 */
export async function register(regEmail, regPassword, first_name, last_name, phone, nickname, gender_orientation, date_of_birth, country, city) {
  try {
    const birthdate = date_of_birth.toString().split('-');
    const response = await axios.post(
      `/auth/signup`,
      JSON.stringify({
        email: regEmail,
        password: regPassword,
        nickname,
        first_name,
        last_name,
        phone: phone.toString(),
        gender_orientation,
        city,
        country,
        date_of_birth_day: Number(birthdate[2]),
        date_of_birth_month: Number(birthdate[1]),
        date_of_birth_year: Number(birthdate[0]),
      }),
    );

    console.log(response);
    if (response.error === true) {
      return Promise.reject(response.data.error);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
