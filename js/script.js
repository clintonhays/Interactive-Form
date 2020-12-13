/**
 * Global Variables
 */

const nameInput = document.getElementById('name');
const jobRoleSelect = document.querySelector('#title');
const otherRole = document.getElementById('other-job-role');
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const punsColors = document.querySelectorAll('[data-theme="js puns"]');
const heartColors = document.querySelectorAll('[data-theme="heart js"]');
const activitiesSet = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
const activities = document.querySelectorAll('[data-day-and-time]');
let totalCost = 0;
const payment = document.getElementById('payment');
const ccInfo = document.getElementById('credit-card');
const paypalInfo = document.getElementById('paypal');
const bitcoinInfo = document.getElementById('bitcoin');

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
});
