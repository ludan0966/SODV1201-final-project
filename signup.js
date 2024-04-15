// signup page
if (document.URL.includes("signuppage.html")) {
  const signuppassword = document.getElementById('signuppassword');
  const pRight = document.getElementById('pRight');
  const pWrong = document.getElementById('pWrong');
  const signupemail = document.getElementById('signupemail');
  const emailError = document.getElementById('emailError');
  const signupbtn = document.getElementById('signupbtn');
  const phone = document.getElementById('phone');

  // Event listener for sign up button
  signupbtn.addEventListener('click', function () {
    const passwordLength = signuppassword.value.trim().length;
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = signupemail.value.trim();
    const password = signuppassword.value;
    const username = document.getElementById('username').value.trim();
    const signupInfo = document.getElementById('signupInfo');
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var existingUser = users.find(function (user) {
      return user.email === email;
    });
    //Check if the email account exists
    if (existingUser) {
      signupInfo.innerHTML = 'User already exists!';
    } else {
      if (passwordLength < 6) {
        pWrong.style.display = 'block';
        pRight.style.display = 'none';
        signuppassword.style.border = '1px solid red';
        signuppassword.value = '';
      } else {
        pWrong.style.display = 'none';
        signuppassword.style.border = '1px solid gray';
      }

      if (!emailFormat.test(email)) {
        emailError.style.display = 'block';
        signupemail.style.border = '1px solid red';
        signupemail.value = '';
      } else {
        emailError.style.display = 'none';
        signupemail.style.border = '1px solid gray';
      }

      // Check phone number format
      const phoneFormat = /^\d{10}$/;
      if (!phoneFormat.test(phone.value.trim())) {
        phoneError.style.display = 'block';
        phone.style.border = '1px solid red';
        phone.value = '';
      } else {
        phoneError.style.display = 'none';
        phone.style.border = '1px solid gray';
      }

      if (passwordLength >= 6 && emailFormat.test(email) && phoneFormat.test(phone.value.trim())) {
        pRight.style.display = 'block';
        pRight.style.color = 'blue';
        emailError.style.display = 'none';
        signupemail.style.border = '1px solid gray';
        signuppassword.style.border = '1px solid gray';

        users.push({ email: email, password: password, phone: phone.value.trim() });
        localStorage.setItem('users', JSON.stringify(users));
        signupInfo.innerHTML = 'Congratulations! You have signed up successfully!';
        pRight.style.display = 'none';
      }
    }
  });
}