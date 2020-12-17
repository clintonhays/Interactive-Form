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
const emailRegEx = /^[^\s@]+@[^\s@.]+\.([a-z])+$/i;
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

// Generic styling
const error = (input) => {
  input.parentElement.classList.add('not-valid');
  input.parentElement.classList.remove('valid');
  input.parentElement.lastElementChild.style.display = 'initial';
};

// Valid input styling
const valid = (input) => {
  input.parentElement.classList.remove('not-valid');
  input.parentElement.classList.add('valid');
  input.parentElement.lastElementChild.style.display = 'none';
};

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
 * Returns boolean value of user input
 * @param {object} input input element to be validated
 * @param {object} regex expression to test the input value
 * @returns {boolean} 
 */

const validator = (input, regex) => {
  const value = input.value;
  const isValid = regex.test(value);

  if (!isValid) {
    error(input);
  } else {
    valid(input);
  }

  return isValid;
};

/**
 * Returns boolean value of user input and generates error styling
 * @param {object} input input element to be validated
 * @param {object} regex expression to test the input value
 * @returns {boolean} 
 */

const emailValidator = (input, regex) => {
  value = input.value;
  isValid = regex.test(value);

  if (!isValid) {
    error(input);
    if (/\s/.test(value)) {
      input.parentElement.lastElementChild.textContent = 'Email must not include spaces';
      input.parentElement.lastElementChild.style.display = 'initial';
    }
    if (!value.includes('@')) {
      input.parentElement.lastElementChild.textContent = 'Email must include @';
      input.parentElement.lastElementChild.style.display = 'initial';
    }
  } else {
    input.parentElement.lastElementChild.style.display = 'none';
  }
  if (isValid) {
    input.parentElement.classList.remove('not-valid');
    input.parentElement.classList.add('valid');
    input.parentElement.lastElementChild.style.display = 'none';
  }

  return isValid;
};

/**
 * Returns boolean value of activities chosen
 * @returns {boolean}
 */

const activitiesValidator = () => {
  const isValid = workshops > 0;

  if (!isValid) {
    activitiesSet.classList.add('not-valid');
    activitiesSet.classList.remove('valid');
    activitiesSet.lastElementChild.style.display = 'initial';
  } else if (isValid) {
    activitiesSet.classList.add('valid');
    activitiesSet.classList.remove('not-valid');
    activitiesSet.lastElementChild.style.display = 'none';
  }

  return isValid;
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
  PROBLEM: Keyup event triggers on tab navigation
  SOLUTION: Use preventDefault? stopPropogation? Switch to keydown?
  NOTE: Doesn't break functionality, but could be fixed.
*/

// Real time validation
nameInput.addEventListener('keyup', () => {
  validator(nameInput, nameRegEx);
});

emailInput.addEventListener('keyup', () => {
  emailValidator(emailInput, emailRegEx);
});

// Apply validation to each checkbox
activityCheckboxes.forEach((activity) => {
  activity.addEventListener('change', () => {
    // track checked status
    activity.checked ? workshops++ : workshops--;
    activitiesValidator();
  });
});

// Validate inputs and activity selections on submit
form.addEventListener('submit', (e) => {
  const name = validator(nameInput, nameRegEx);
  const email = emailValidator(emailInput, emailRegEx);
  const activities = activitiesValidator();

  if (name === false) {
    e.preventDefault();
  }

  if (email === false) {
    e.preventDefault();
  }

  if (activities === false) {
    e.preventDefault();
  }

  // Only validate cc inputs if it is chosen as payment method
  if (payment.value === 'credit-card') {
    const number = validator(ccNum, ccRegEx);
    const zipCode = validator(zip, zipRegEx);
    const cvvCode = validator(cvv, cvvRegEx);

    if ((number === false) | (zipCode === false) | (cvvCode === false)) {
      e.preventDefault();
    }
  }
});
