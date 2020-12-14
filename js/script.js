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

// Load page with focus on name input
nameInput.focus();

// Hide other job role input until chosen
otherRole.hidden = true;

// Disable tshirt color select until style is chosen
colorSelect.disabled = true;

// Set default payment choice to cc, hide paypal, bitcoin info
payment.value = 'credit-card';
paypalInfo.hidden = true;
bitcoinInfo.hidden = true;

/**
 * Helper Functions
 */

// Updates workshop total to be used in activitiesValidator function
activitiesSet.addEventListener('change', (e) => {
  e.target.checked ? workshops++ : workshops--;
});

/**
 * Focus Activity Checkboxes
 */

// Apply focus and blur to checkboxes
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

/**
 * Validate user input fields 
 * @param {object} input input element to be validated
 * @param {object} regex expression to test the input value
 * @param {event} e used to prevent default behavior in case input value is invalid
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

/**
 * Validate at least 1 activity is chosen
 * @param {event} e used to prevent default behavior in case no activities are selected
 */

const activitiesValidator = (e) => {
  const activitySectionIsValid = workshops > 0;

  if (!activitySectionIsValid) {
    e.preventDefault();
    activitiesSet.classList.add('not-valid');
    activitiesSet.classList.remove('valid');
    activitiesSet.lastElementChild.style.display = 'initial';
  } else {
    activitiesSet.classList.add('valid');
    activitiesSet.classList.remove('not-valid');
    activitiesSet.lastElementChild.style.display = 'none';
  }
};

/**
 * Event Listeners
 */

// Reveal input for other job type
jobRoleSelect.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherRole.hidden = false;
  } else if (e.target.value !== 'other') {
    otherRole.hidden = true;
  }
});

// Enable color selection based on tshirt design choice
designSelect.addEventListener('change', (e) => {
  colorSelect.disabled = false;
  const design = e.target.value;

  /*
    Using forEach to iterate through color select option and 
    hiding/displaying based on design selection
    TODO: Make this more DRY
    PROBLEM: Seems so redundant
    SOLUTION: ??? Refactor somehow...
  */
  if (design === 'js puns') {
    heartColors.forEach((color) => {
      color.hidden = true;
    });
    punsColors.forEach((color) => {
      color.hidden = false;
    });
  } else if (design === 'heart js') {
    punsColors.forEach((color) => {
      color.hidden = true;
    });
    heartColors.forEach((color) => {
      color.hidden = false;
    });
  }
});

// Update cost and prevent selection of overlapping activity times
activitiesSet.addEventListener('change', (e) => {
  const activity = e.target;
  const activityCost = activity.getAttribute('data-cost');
  const activityTime = activity.getAttribute('data-day-and-time');

  /*
    Iterate through activities, for each activity compare target day and time attribute
    to the current iteration day and time attribute. If the attributes match and the target
    is not the current activity being checked, the checkbox is disabled. The logical && operator
    is necessary to exclude the target from being disabled based on a matching attribute. If the
    box is unchecked, the disabled property is set to false.
  */
  activityCheckboxes.forEach((box) => {
    const boxTime = box.getAttribute('data-day-and-time');

    if (activityTime === boxTime && activity !== box) {
      if (activity.checked) {
        box.disabled = true;
      } else {
        box.disabled = false;
      }
    }
  });

  // Add or subtract activity cost from totalcost
  if (activity.checked === true) {
    totalCost += +activityCost;
  }
  if (activity.checked === false) {
    totalCost -= +activityCost;
  }

  activitiesCost.textContent = `$${totalCost}`;
});

// Hide or display cc info inputs based on payment selection
payment.addEventListener('change', (e) => {
  value = e.target.value;

  /*
    TODO: Refactor if/else if block to be more DRY
    PROBLEM: Not sure if there is actually a problem here,
    but seems like it could be more DRY
    SOLUTION: Switch statement? Refactor to function? 
  */

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

/*
  TODO: Fix live error checking.
  PROBLEM: Initial load displays error styling on inputs
  SOLUTION: Refactor validator function? Use different event as listener?
*/

// nameInput.addEventListener('keyup', (e) => {
//   validator(nameInput, nameRegEx, e);
// });

// emailInput.addEventListener('keyup', (e) => {
//   validator(emailInput, emailRegEx, e);
// });

// Validate inputs and activity selections on submit
form.addEventListener('submit', (e) => {
  validator(nameInput, nameRegEx, e);
  validator(emailInput, emailRegEx, e);
  activitiesValidator(e);

  // Only validate cc inputes if it is chosen as payment method
  if (payment.value === 'credit-card') {
    validator(ccNum, ccRegEx, e);
    validator(zip, zipRegEx, e);
    validator(cvv, cvvRegEx, e);
  }
});
