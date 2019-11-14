const regExpDic = {
  email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
  password: /^[0-9a-zA-Z]{8,20}$/,
  name: /^[a-zA-Z ,.'-]+$/,
  phone: /^0\d{3}\d{2}\d{2}\d{2}$/,
  nickname: /^[a-zA-Z]\w{5,20}$/,
  gender: /^male$|^female$/,
  birthdate: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
  country: /^.{1,50}$/,
  city: /^.{1,50}$/,
};

/**
 * Function validate. Check Input on RegExp provided in regExpDic by input data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} - Return true if input valid or doesn't has data-required attr
 */
export function validate(el) {
  const regExpName = el.dataset.required;
  if (!regExpDic[regExpName]) return true;
  return regExpDic[regExpName].test(el.value);
}
