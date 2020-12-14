/**
 * Global Variables
 */

const form = document.getElementsByTagName('form')[0];

// Basic Info Fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const jobRoleSelect = document.querySelector('#title');
const otherRole = document.getElementById('other-job-role');

// Tshirt Fields
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const punsColors = document.querySelectorAll('[data-theme="js puns"]');
const heartColors = document.querySelectorAll('[data-theme="heart js"]');

// Activities Fields
const activitiesSet = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
const activities = document.querySelectorAll('[data-day-and-time]');
const activityCheckboxes = document.querySelectorAll('[type="checkbox"]');
let workshops = 0;
let totalCost = 0;

// Payment Fields
const payment = document.getElementById('payment');
const ccInfo = document.getElementById('credit-card');
const paypalInfo = document.getElementById('paypal');
const bitcoinInfo = document.getElementById('bitcoin');
const ccNum = document.getElementById('cc-num');
const cvv = document.getElementById('cvv');
const zip = document.getElementById('zip');

/**
 * RegEx Variables
 */

const nameRegEx = /^[A-Za-z]+ ?[A-Za-z]*? ?[A-Za-z]*?$/i;
const emailRegEx = /^[^@]+@[^@.]+\.[a-z0-9]+$/i;
const ccRegEx = /^\d{13}(\d{1,3})?$/;
const cvvRegEx = /^\d{3}$/;
const zipRegEx = /^\d{5}$/;

/**
 * On Page Load Settings
 */

nameInput.focus();

otherRole.classList.add('hidden');

colorSelect.disabled = true;

ccInfo.hidden = true;
paypalInfo.hidden = true;
bitcoinInfo.hidden = true;

/**
 * Helper Functions
 */

activitiesSet.addEventListener('change', (e) => {
  e.target.checked ? workshops++ : workshops--;
});

/**
 * Focus Activity Checkboxes
 */

activityCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('focus', (e) => {
    e.target.parentElement.classList.add('focus');
  });
  checkbox.addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('focus');
  });
});

/**
 * Form Validation
 */

const validator = (input, regex, e) => {
  const value = input.value;
  const isValid = regex.test(value);

  if (!isValid) {
    e.preventDefault();
    input.parentElement.classList.add('not-valid');
    input.parentElement.classList.remove('valid');
    input.parentElement.lastElementChild.style.display = 'initial';
  } else {
    input.parentElement.classList.remove('not-valid');
    input.parentElement.classList.add('valid');
    input.parentElement.lastElementChild.style.display = 'none';
  }
};

const activitiesValidator = (e) => {
  const activitySectionIsValid = workshops > 0;

  if (!activitySectionIsValid) {
    e.preventDefault();
    activitiesSet.classList.add('not-valid');
    activitiesSet.classList.remove('valid');
    activitiesSet.lastElementChild.style.display = 'initial';
  }
};

/**
 * Event Listeners
 */

jobRoleSelect.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherRole.classList.remove('hidden');
  } else if (e.target.value !== 'other') {
    otherRole.classList.add('hidden');
  }
});

designSelect.addEventListener('change', (e) => {
  colorSelect.disabled = false;

  const design = e.target.value;

  if (design === 'js puns') {
    heartColors.forEach((color) => {
      color.className = 'hidden';
    });
    punsColors.forEach((color) => {
      color.classList.remove('hidden');
    });
  } else if (design === 'heart js') {
    punsColors.forEach((color) => {
      color.className = 'hidden';
    });
    heartColors.forEach((color) => {
      color.classList.remove('hidden');
    });
  }
});

activitiesSet.addEventListener('change', (e) => {
  const activity = e.target;
  const cost = activity.getAttribute('data-cost');

  if (activity.checked === true) {
    totalCost += +cost;
  }
  if (activity.checked === false) {
    totalCost -= +cost;
  }

  activitiesCost.textContent = `$${totalCost}`;
});

payment.addEventListener('change', (e) => {
  value = e.target.value;

  if (value === ccInfo.id) {
    ccInfo.hidden = false;
    paypalInfo.hidden = true;
    bitcoinInfo.hidden = true;
  } else if (value === paypalInfo.id) {
    paypalInfo.hidden = false;
    ccInfo.hidden = true;
    bitcoinInfo.hidden = true;
  } else if (value === bitcoinInfo.id) {
    bitcoinInfo.hidden = false;
    paypalInfo.hidden = true;
    ccInfo.hidden = true;
  }
});

// nameInput.addEventListener('keyup', (e) => {
//   validator(nameInput, nameRegEx, e);
// });

// emailInput.addEventListener('keyup', (e) => {
//   validator(emailInput, emailRegEx, e);
// });

form.addEventListener('submit', (e) => {
  validator(nameInput, nameRegEx, e);
  validator(emailInput, emailRegEx, e);
  activitiesValidator(e);

  if (payment.value === 'credit-card') {
    validator(ccNum, ccRegEx, e);
    validator(zip, zipRegEx, e);
    validator(cvv, cvvRegEx, e);
  }
});
