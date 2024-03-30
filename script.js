const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; /* month is 0 based */
const currentDay = new Date().getDate();
const myForm = document.querySelector('.form');
const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');
const errorMsgs = document.querySelectorAll('.error_msg');
const month31days = [1, 3, 5, 7, 8, 10, 12];

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function displayAge(years, months, days) {
  const year = document.querySelector('.years span');
  const month = document.querySelector('.months span');
  const day = document.querySelector('.days span');

  year.textContent = years;
  month.textContent = months;
  day.textContent = days;
}

function animateAge(years, months, days) {
  const yearsSpan = document.querySelector('.years span');
  const monthsSpan = document.querySelector('.months span');
  const daysSpan = document.querySelector('.days span');

  for (let i = 0; i <= years; i += 1) {
    setTimeout(() => {
      yearsSpan.textContent = i;
    }, i * 50);
  }

  for (let i = 0; i <= months; i += 1) {
    setTimeout(() => {
      monthsSpan.textContent = i;
    }, i * 100);
  }

  for (let i = 0; i <= days; i += 1) {
    setTimeout(() => {
      daysSpan.textContent = i;
    }, i * 50);
  }
}

function calculateAge() {
  const birthDate = new Date(
    document.querySelector('#year').value,
    document.querySelector('#month').value - 1,
    document.querySelector('#day').value,
  );

  const currentDate = new Date();

  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageInMonths = currentDate.getMonth() - birthDate.getMonth();

  if (currentDate.getDate() < birthDate.getDate()) {
    ageInMonths -= 1;
  }

  if (ageInMonths < 0) {
    ageInYears -= 1;
    ageInMonths += 12;
  }

  let ageInDays = currentDate.getDate() - birthDate.getDate();

  if (ageInDays < 0) {
    const lastDayOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentMonth,
      0,
    ).getDate();

    ageInDays += lastDayOfPreviousMonth;
  }

  displayAge(ageInYears, ageInMonths, ageInDays);
  animateAge(ageInYears, ageInMonths, ageInDays);
}

function showError(index) {
  labels[index].classList.add('error');
  inputs[index].classList.add('error');
  errorMsgs[index].classList.remove('hidden');
}

function showErrorMsg(index) {
  let empty = false;
  const year = parseInt(inputs[2].value, 10);
  const month = parseInt(inputs[1].value, 10);
  const day = parseInt(inputs[0].value, 10);

  inputs.forEach((input, i) => {
    if (input.value.trim() === '') {
      empty = true;
      errorMsgs[i].textContent = 'this field is required';
    }
  });
  if (!empty) {
    if (index === 0) {
      if (month === 2) {
        if (isLeapYear(year) && day > 29) {
          errorMsgs[0].textContent = 'day must be between 1 and 29';
        } else if (!isLeapYear(year) && day === 29) {
          errorMsgs[2].textContent = 'not a leap year!!';
          errorMsgs[2].classList.remove('hidden');
          errorMsgs[0].textContent = 'day must be between 1 and 28';
        } else {
          errorMsgs[0].textContent = 'day must be between 1 and 28';
        }
      } else if (year === currentYear && month === currentMonth && day > currentDay) {
        errorMsgs[0].textContent = 'not there yet!';
      } else if (!month31days.includes(inputs[1].value) && (month > 1 || month < 12)) {
        errorMsgs[0].textContent = 'day must be between 1 and 30';
      } else {
        errorMsgs[0].textContent = 'day must be between 1 and 31';
      }
    }
    if (index === 1) {
      if (month < 1 || month > 12) {
        errorMsgs[1].textContent = 'month must be between 1 and 12';
      } else if (month > currentMonth) {
        errorMsgs[1].textContent = 'not there yet!';
      }
    }
    if (index === 2) {
      if (year < 1 || year > currentYear) {
        errorMsgs[2].textContent = 'not a valid year';
      }
    }
  }
}

function removeError(index) {
  inputs[index].classList.remove('error');
  errorMsgs[index].classList.add('hidden');
  labels[index].classList.remove('error');
}

function handleInputBlur(index) {
  if (inputs[index].value.trim() === '') {
    showError(index);
    showErrorMsg(index);
  }
}

function checkDayValidity() {
  let isValid = true;
  const year = parseInt(document.querySelector('#year').value, 10);
  const month = parseInt(document.querySelector('#month').value, 10);
  const day = parseInt(document.querySelector('#day').value, 10);

  if (day < 1 || day > 31) {
    isValid = false;
  } else if (!month31days.includes(month) && day > 30 && month > 1 && month < 12) {
    isValid = false;
  } else if (month === 2) {
    if (isLeapYear(year) && day > 29) {
      isValid = false;
    } else if (!isLeapYear(year) && day > 28) {
      isValid = false;
    }
  } else if (year === currentYear && month === currentMonth && day > currentDay) {
    isValid = false;
  }

  return isValid;
}

function checkValidity() {
  let isValid = true;
  const year = parseInt(document.querySelector('#year').value, 10);
  const month = parseInt(document.querySelector('#month').value, 10);
  const day = parseInt(document.querySelector('#day').value, 10);

  inputs.forEach((input) => {
    if (input.id === 'day' && !checkDayValidity()) {
      showError(0);
      showErrorMsg(0);
      isValid = false;
    } else if (input.id === 'month' && (month < 1 || month > 12)) {
      showError(1);
      showErrorMsg(1);
      isValid = false;
    } else if (input.id === 'year' && (year < 1 || year > currentYear)) {
      showError(2);
      showErrorMsg(2);
      isValid = false;
    }
  });

  if (year === currentYear && month > currentMonth) {
    showError(1);
    showErrorMsg(1);
    isValid = false;
  } else if (year === currentYear && month === currentMonth && day > currentDay) {
    showError(0);
    showErrorMsg(0);
    isValid = false;
  }

  return isValid;
}

myForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  inputs.forEach((input, index) => {
    if (input.value.trim() === '') {
      valid = false;
      showError(index);
    }
  });
  if (!checkValidity()) {
    return;
  }

  if (valid) {
    inputs.forEach((input, index) => {
      removeError(index);
    });
    calculateAge();
  }
});

inputs.forEach((input, index) => {
  input.addEventListener('focus', () => removeError(index));
  input.addEventListener('blur', () => handleInputBlur(index));
});
