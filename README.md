# Interactive Form

This is an interactive form using vanilla JavaScript for validation and focusing on accessibility.

## Validation

The name, email, cc number, cvv, and zipcode input fields use a validator function and regex to validate the user input. Real time validation is implemented to provide immediate feedback to the user. If any field is invalid, the form is prevented from submitting and the user is given a detailed hint as to what needs to be fixed.

The activities fieldset is validated by making sure that at least 1 activity is checked. If the number of checked activities is < 1, the user is presented with a hint to choose at least 1 activity.

HTML5 email validation was avoided in favor of validation through JavaScript for the purpose of practice. 

### Real Time Validation

Real time validation is used on the name, email and activities elements. For name and email, keyup event listeners are employed. For the activity section change event lsiteners are used on each checkbox to update the validator accordingly. In addition, the email validation supports custom error messages for missing @ and spaces within the address. Leading and trailing spaces are handled via the trim() property.

## Accessibility

 The form focuses on accessibility by making sure that it can be navigated with tab and shift+tab. Each input has clear focus feedback, all inputs include labels, and the form is separated into logical sections. If there is an error due to invalid information, the user is presented with highly visible iconography and is given clear instructions on how to fix the error.

## RegEx

This form uses RegEx as the main process by which to validate user input. All RegEx was tested on regexpal.com to ensure validity. However, the credit card regex is intentionally left generic for testing purposes.

