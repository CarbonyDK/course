/**
 * Function inputErrorTemplate
 * @param {String} msg
 */
function inputErrorTemplate(msg) {
  return `
    <div class="invalid-feedback">${msg}</div>
  `;
}

/**
 * Function showInputError. Add input error
 * @param {HTMLInputElement} el
 * @param {String} message
 */
export function showInputError(el, message) {
  if (!el.classList.contains('is-invalid')) {
    const parent = el.parentElement;
    const msg = message || el.dataset.invalidMessage || 'Invalid input';
    const template = inputErrorTemplate(msg);
    el.classList.add('is-invalid');
    parent.insertAdjacentHTML('beforeend', template);
  }
}
/**
 * Function removeInputError. Remove input error
 * @param {HTMLInputElement} el
 */
export function removeInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback');
  if (!err) return;

  el.classList.remove('is-invalid');
  parent.removeChild(err);
}
