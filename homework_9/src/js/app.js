import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/style.css';
import 'webpack-jquery-ui/css';
import 'webpack-jquery-ui/autocomplete';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login, register } from './services/auth.service';
import { getCountries, getCities } from './services/locations.service';
import { notify } from './views/notifications';
import { getNews } from './services/news.service';

const { form, inputEmail, inputPassword, regForm, regEmail, regPassword, regPasswordRepeat, first_name, last_name, phone, nickname, gender_orientation, date_of_birth, country, city } = UI;
const inputs = [inputEmail, inputPassword];
const regInputs = [regEmail, regPassword, regPasswordRepeat, first_name, last_name, phone, nickname, gender_orientation, date_of_birth, country, city];

const countries = ['UK', 'Ukraine'];

// Events
form.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit();
});
regForm.addEventListener('submit', e => {
  e.preventDefault();
  onRegSubmit();
});
inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));
regInputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));
initCountries();

// Handlers
async function onSubmit() {
  const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    notify({ msg: 'Login success', className: 'alert-success' });
  } catch (err) {
    notify({ msg: 'Login failed', className: 'alert-danger' });
  }
}

async function onRegSubmit() {
  const isValidForm = regInputs.every((el, i) => {
    let isValidInput = validate(el);
    if (el.id === 'password-repeat' && el.value !== regInputs[i - 1].value) {
      isValidInput = false;
      showInputError(el, 'PR');
    }
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await register(regEmail.value, regPassword.value, first_name.value, last_name.value, phone.value, nickname.value, gender_orientation.value, date_of_birth.value, country.value, city.value);
    regForm.reset();
    notify({ msg: 'Register Success! Check your Email.', className: 'alert-success' });
  } catch (err) {
    notify({ msg: 'Register failed', className: 'alert-danger' });
  }
}

async function initCountries() {
  try {
    const countries = await getCountries();
    const countriesArr = Object.values(countries);
    $(country).autocomplete({
      source: countriesArr,
      select: (e, ui) => {
        const countryIndex = countriesArr.indexOf(ui.item.value) + 1;
        initCities(countryIndex);
      },
    });
  } catch (err) {
    notify({ msg: 'Error getting countries', className: 'alert-danger' });
  }
}

async function initCities(countryIndex) {
  try {
    const cities = await getCities(countryIndex);
    const citiesArr = Object.values(cities);
    city.removeAttribute('disabled');
    $(city).autocomplete({
      source: citiesArr,
    });
  } catch (err) {
    notify({ msg: 'Error getting cities', className: 'alert-danger' });
  }
}