// Function to remove token and redirect to login page
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'loginpage.html';
}

// Add event listener for logout link
document.getElementById('logout').addEventListener('click', function () {
  logout();
});

// Function to display user email
function displayUserEmail() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) {
    const userEmail = userInfo.email;
    const emailDisplay = document.createElement('p');
    emailDisplay.textContent = `Logged in as: ${userEmail}`;
    emailDisplay.style.marginTop = '10px'; // Add some margin for spacing
    const displayContainer = document.getElementById('displayContainer');
    displayContainer.prepend(emailDisplay); // Add email display at the beginning of displayContainer
  }
}

// Call displayUserEmail function when the page is first loaded
displayUserEmail();

// Retrieve stored information array
let workspaceInfos = JSON.parse(localStorage.getItem('workspaceInfos')) || [];

const searchButton = document.getElementById('searchButton');
const searchSelect = document.getElementById('search');
const textInput = document.getElementById('textInput');
const radioInput = document.getElementById('radioInput');
const workspaceTypeOptions = document.getElementById('workspaceTypeOptions');
const searchResults = document.getElementById('displayContainer');

searchSelect.addEventListener('change', function () {
  const selectedOption = searchSelect.value;
  if (selectedOption === 'parkingGarage' || selectedOption === 'publicTransportation' || selectedOption === 'smokingAllowed') {
    textInput.style.display = 'none';
    radioInput.style.display = 'inline-block';
    workspaceTypeOptions.style.display = 'none'; // Hide Workspace Type options
  } else if (selectedOption === 'workspaceType') {
    textInput.style.display = 'none';
    radioInput.style.display = 'none';
    workspaceTypeOptions.style.display = 'inline-block'; // Show Workspace Type options
  } else {
    textInput.style.display = 'inline-block';
    radioInput.style.display = 'none';
    workspaceTypeOptions.style.display = 'none'; // Hide Workspace Type options
  }
});

searchButton.addEventListener('click', function () {
  const selectedOption = searchSelect.value;
  let inputValue;

  if (selectedOption === 'parkingGarage' || selectedOption === 'publicTransportation' || selectedOption === 'smokingAllowed') {
    inputValue = document.querySelector('input[name="radioOption"]:checked').value;
  } else if (selectedOption === 'workspaceType') {
    inputValue = document.querySelector('input[name="workspaceTypeOption"]:checked').value;
  } else {
    inputValue = textInput.value.trim();
  }

  let matchedInfos = [];

  workspaceInfos.forEach(function (info) {
    if (selectedOption === 'parkingGarage' || selectedOption === 'publicTransportation' || selectedOption === 'smokingAllowed') {
      if (info[selectedOption] === (inputValue === 'yes')) {
        matchedInfos.push(info);
      }
    } else if (selectedOption === 'workspaceType') {
      if (info[selectedOption] === inputValue) {
        matchedInfos.push(info);
      }
    } else if (info[selectedOption].toLowerCase() === inputValue.toLowerCase()) {
      matchedInfos.push(info);
    }
  });

  displayMatchedInfos(matchedInfos);
});

// Function to sort workspace infos by city
function sortByCity() {
  workspaceInfos.sort((a, b) => a.city.localeCompare(b.city));
  displayMatchedInfos(workspaceInfos);
}

// Function to sort workspace infos by area
function sortByArea() {
  workspaceInfos.sort((a, b) => a.squareFeet - b.squareFeet);
  displayMatchedInfos(workspaceInfos);
}

// Function to sort workspace infos by capacity
function sortByCapacity() {
  workspaceInfos.sort((a, b) => a.seatingCapacity - b.seatingCapacity);
  displayMatchedInfos(workspaceInfos);
}

// Function to sort workspace infos by price
function sortByPrice() {
  workspaceInfos.sort((a, b) => a.price - b.price);
  displayMatchedInfos(workspaceInfos);
}

// Add event listeners for sort buttons
document.getElementById('sortByCityBtn').addEventListener('click', sortByCity);
document.getElementById('sortByAreaBtn').addEventListener('click', sortByArea);
document.getElementById('sortByCapacityBtn').addEventListener('click', sortByCapacity);
document.getElementById('sortByPriceBtn').addEventListener('click', sortByPrice);

function displayMatchedInfos(matchedInfos) {
  const displayContainer = document.getElementById('displayContainer');
  displayContainer.innerHTML = '';

  if (matchedInfos.length === 0) {
    displayContainer.innerHTML = 'No matching information found.';
    return;
  }

  const ul = document.createElement('ul');

  matchedInfos.forEach(function (info) {
    const li = document.createElement('li');
    li.classList.add('information-item');
    const textDiv = document.createElement('div');
    textDiv.classList.add('text-info');

    for (const key in info) {
      if (key !== 'photo') {
        const p = document.createElement('p');
        const value = typeof info[key] === 'boolean' ? (info[key] ? 'Yes' : 'No') : info[key];
        p.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
        textDiv.appendChild(p);
      }
    }

    // 创建包含照片的<div>元素，并添加类名
    if (info.photo) {
      const imgDiv = document.createElement('div');
      imgDiv.classList.add('photo-info');

      const img = document.createElement('img');
      img.src = info.photo;
      img.alt = 'Workspace Photo';
      img.style.width = '400px';
      imgDiv.appendChild(img);

      li.appendChild(textDiv);
      li.appendChild(imgDiv);
    } else {
      li.appendChild(textDiv);
    }

    const contactDiv = document.createElement('div');
    const contactBtn = document.createElement('button');
    contactBtn.textContent = 'Contact Owner';
    contactBtn.classList.add('contact-btn');
    contactDiv.appendChild(contactBtn);
    li.appendChild(contactDiv);
    contactBtn.addEventListener('click', function () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        const userEmail = userInfo.email;
        const contactInfo = document.createElement('p');
        contactInfo.textContent = `Email: ${userEmail}`;
        contactInfo.style.marginTop = '10px'; // Add some margin for spacing
        contactInfo.style.color = 'blue';
        contactDiv.appendChild(contactInfo);
        console.log('Contact Owner Email:', userEmail); // Add this line to print contact owner email
      }
    });

    ul.appendChild(li);
  });

  displayContainer.appendChild(ul);
}

// Render information when the page is first loaded
displayMatchedInfos(workspaceInfos);
