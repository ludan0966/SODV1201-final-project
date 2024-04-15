if (document.URL.includes("loginpage.html")) {
  const loginbtn = document.getElementById('loginbtn');
  const loginemail = document.getElementById('loginemail');
  const loginpassword = document.getElementById('loginpassword');
  const loginInfo = document.getElementById('loginInfo');
  const coworker = document.getElementById('coworker');
  const owner = document.getElementById('owner');

  // Event listener for login button
  loginbtn.addEventListener('click', function () {
    const email = loginemail.value.trim();
    const password = loginpassword.value.trim();
    const role = document.querySelector('input[name="role"]:checked');

    if (!role) {
      loginInfo.innerHTML = 'Please select a role.';
      return;
    }

    var roleId = role.id;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var matchedUser = users.find(function (user) {
      return user.email === email && user.password === password;
    });

    if (matchedUser) {
      // Generate token
      const token = generateToken();

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(matchedUser));

      if (roleId === 'owner') {
        window.location.href = 'workspacepage.html';
      } else if (roleId === 'coworker') {
        window.location.href = 'searchpage.html';
      }
    } else {
      loginInfo.innerHTML = 'Invalid email or password, please try again.';
    }
  });
}

// Function to generate token
function generateToken() {
  return Math.random().toString(36).substr(2); // Simple token generation (not suitable for production)
}