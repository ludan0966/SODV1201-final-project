// Check if token exists, if not redirect to login page
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'loginpage.html';
}

// Function to remove token and redirect to login page
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'loginpage.html';
}

// Add event listener for logout link
document.getElementById('logout').addEventListener('click', function () {
  logout();
});

// Retrieve stored information array
let workspaceInfos = JSON.parse(localStorage.getItem('workspaceInfos')) || [];

// Display information on the page
const workspaceList = document.getElementById('workspaceList');

// Function to render workspace information
function renderWorkspaceInfo(workspaceInfo, index) {
  const item = document.createElement('li');

  // Create div for workspace info
  const workspaceInfoDiv = document.createElement('div');
  workspaceInfoDiv.classList.add('workspace-info');
  item.appendChild(workspaceInfoDiv);

  // Create and add paragraph for address information
  const addressParagraph = document.createElement('p');
  addressParagraph.textContent = 'Address: ' + workspaceInfo.address;
  workspaceInfoDiv.appendChild(addressParagraph);

  // Create and add paragraph for city information
  const cityParagraph = document.createElement('p');
  cityParagraph.textContent = 'City: ' + workspaceInfo.city;
  workspaceInfoDiv.appendChild(cityParagraph);

  // Create and add paragraph for state information
  const stateParagraph = document.createElement('p');
  stateParagraph.textContent = 'State: ' + workspaceInfo.state;
  workspaceInfoDiv.appendChild(stateParagraph);

  // Create and add paragraph for country information
  const countryParagraph = document.createElement('p');
  countryParagraph.textContent = 'Country: ' + workspaceInfo.country;
  workspaceInfoDiv.appendChild(countryParagraph);

  // Create and add paragraph for neighborhood information
  const neighborhoodParagraph = document.createElement('p');
  neighborhoodParagraph.textContent = 'Neighborhood: ' + workspaceInfo.neighborhood;
  workspaceInfoDiv.appendChild(neighborhoodParagraph);

  // Create and add paragraph for square feet information
  const squareFeetParagraph = document.createElement('p');
  squareFeetParagraph.textContent = 'Square Feet: ' + workspaceInfo.squareFeet;
  workspaceInfoDiv.appendChild(squareFeetParagraph);

  // Create and add paragraph for amenity information
  const amenityParagraph = document.createElement('p');
  amenityParagraph.textContent = 'Amenity: ' + workspaceInfo.amenity;
  workspaceInfoDiv.appendChild(amenityParagraph);

  // Create and add paragraph for parking garage information
  const parkingGarageParagraph = document.createElement('p');
  parkingGarageParagraph.textContent = 'Parking Garage: ' + (workspaceInfo.parkingGarage ? 'Yes' : 'No');
  workspaceInfoDiv.appendChild(parkingGarageParagraph);

  // Create and add paragraph for public transportation information
  const publicTransportationParagraph = document.createElement('p');
  publicTransportationParagraph.textContent = 'Public Transportation: ' + (workspaceInfo.publicTransportation ? 'Yes' : 'No');
  workspaceInfoDiv.appendChild(publicTransportationParagraph);

  // Create and add paragraph for workspace type information
  const workspaceTypeParagraph = document.createElement('p');
  workspaceTypeParagraph.textContent = 'Workspace Type: ' + workspaceInfo.workspaceType;
  workspaceInfoDiv.appendChild(workspaceTypeParagraph);

  // Create and add paragraph for seating capacity information
  const seatingCapacityParagraph = document.createElement('p');
  seatingCapacityParagraph.textContent = 'Seating Capacity: ' + workspaceInfo.seatingCapacity;
  workspaceInfoDiv.appendChild(seatingCapacityParagraph);

  // Create and add paragraph for smoking allowed information
  const smokingAllowedParagraph = document.createElement('p');
  smokingAllowedParagraph.textContent = 'Smoking Allowed: ' + (workspaceInfo.smokingAllowed ? 'Yes' : 'No');
  workspaceInfoDiv.appendChild(smokingAllowedParagraph);

  // Create and add paragraph for price information
  const priceParagraph = document.createElement('p');
  priceParagraph.textContent = 'Price: $' + workspaceInfo.price;
  workspaceInfoDiv.appendChild(priceParagraph);

  // If a photo is uploaded, display the photo
  if (workspaceInfo.photo) {
    const img = document.createElement('img');
    img.src = workspaceInfo.photo;
    item.appendChild(img);
  }

  // Create div for buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  // Create edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function () {
    // Replace workspace information with input fields
    addressParagraph.innerHTML = '<input type="text" value="' + workspaceInfo.address + '">';
    cityParagraph.innerHTML = '<input type="text" value="' + workspaceInfo.city + '">';
    stateParagraph.innerHTML = '<input type="text" value="' + workspaceInfo.state + '">';
    countryParagraph.innerHTML = '<input type="text" value="' + workspaceInfo.country + '">';
    neighborhoodParagraph.innerHTML = '<input type="text" value="' + workspaceInfo.neighborhood + '">';
    squareFeetParagraph.innerHTML = '<input type="text" value="' + workspaceInfo.squareFeet + '">';
    amenityParagraph.innerHTML = '<input type="text" value="' + workspaceInfo.amenity + '">';
    parkingGarageParagraph.innerHTML = '<input type="radio" name="parkingGarage" value="yes" ' + (workspaceInfo.parkingGarage ? 'checked' : '') + '> Yes' +
      '<input type="radio" name="parkingGarage" value="no" ' + (!workspaceInfo.parkingGarage ? 'checked' : '') + '> No';
    publicTransportationParagraph.innerHTML = '<input type="radio" name="publicTransportation" value="yes" ' + (workspaceInfo.publicTransportation ? 'checked' : '') + '> Yes' +
      '<input type="radio" name="publicTransportation" value="no" ' + (!workspaceInfo.publicTransportation ? 'checked' : '') + '> No';
    workspaceTypeParagraph.innerHTML = '<select id="workspaceType">' +
      '<option value="meetingRooms">Meeting Rooms</option>' +
      '<option value="privateOfficeRooms">Private Office Rooms</option>' +
      '<option value="desks">Desks</option>' +
      '</select>';
    seatingCapacityParagraph.innerHTML = '<input type="text" id="seatingCapacity" value="' + workspaceInfo.seatingCapacity + '">';
    smokingAllowedParagraph.innerHTML = '<input type="radio" name="smokingAllowed" value="yes" ' + (workspaceInfo.smokingAllowed ? 'checked' : '') + '> Yes' +
      '<input type="radio" name="smokingAllowed" value="no" ' + (!workspaceInfo.smokingAllowed ? 'checked' : '') + '> No';
    priceParagraph.innerHTML = '<input type="text" id="price" value="' + workspaceInfo.price + '">';

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', function () {
      // Update workspace information with input field values
      workspaceInfo.address = addressParagraph.querySelector('input').value;
      workspaceInfo.city = cityParagraph.querySelector('input').value;
      workspaceInfo.state = stateParagraph.querySelector('input').value;
      workspaceInfo.country = countryParagraph.querySelector('input').value;
      workspaceInfo.neighborhood = neighborhoodParagraph.querySelector('input').value;
      workspaceInfo.squareFeet = squareFeetParagraph.querySelector('input').value;
      workspaceInfo.amenity = amenityParagraph.querySelector('input').value;
      workspaceInfo.parkingGarage = document.querySelector('input[name="parkingGarage"]:checked').value === 'yes';
      workspaceInfo.publicTransportation = document.querySelector('input[name="publicTransportation"]:checked').value === 'yes';
      workspaceInfo.workspaceType = document.getElementById('workspaceType').value;
      workspaceInfo.seatingCapacity = document.getElementById('seatingCapacity').value;
      workspaceInfo.smokingAllowed = document.querySelector('input[name="smokingAllowed"]:checked').value === 'yes';
      workspaceInfo.price = document.getElementById('price').value;

      // Re-render workspace list
      renderWorkspaceList();
      // Save updated information to local storage
      localStorage.setItem('workspaceInfos', JSON.stringify(workspaceInfos));
    });

    // Replace edit button with submit button
    buttonContainer.replaceChild(submitButton, editButton);
  });
  buttonContainer.appendChild(editButton);

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    // Remove the information from the stored array
    workspaceInfos.splice(index, 1);
    // Update local storage
    localStorage.setItem('workspaceInfos', JSON.stringify(workspaceInfos));
    // Remove the information from the page
    workspaceList.removeChild(item);
  });
  buttonContainer.appendChild(deleteButton);

  // Create "To Rent" button
  const toRentButton = document.createElement('button');
  toRentButton.textContent = 'To Rent';
  toRentButton.addEventListener('click', function () {
    // Create a copy of the workspace info to be rented
    const rentedWorkspaceInfo = Object.assign({}, workspaceInfo);

    // Display the rented workspace info in the search page
    displayRentedWorkspaceInfo(rentedWorkspaceInfo);
  });
  buttonContainer.appendChild(toRentButton);

  item.appendChild(buttonContainer);

  workspaceList.appendChild(item);
}

// Function to re-render the page
function renderWorkspaceList() {
  workspaceList.innerHTML = '';
  workspaceInfos.forEach(renderWorkspaceInfo);
}

// Sorting functions
function sortByCity() {
  workspaceInfos.sort((a, b) => a.city.localeCompare(b.city));
  renderWorkspaceList();
}

function sortByArea() {
  workspaceInfos.sort((a, b) => a.squareFeet - b.squareFeet);
  renderWorkspaceList();
}

function sortByCapacity() {
  workspaceInfos.sort((a, b) => a.seatingCapacity - b.seatingCapacity);
  renderWorkspaceList();
}

function sortByPrice() {
  workspaceInfos.sort((a, b) => a.price - b.price);
  renderWorkspaceList();
}

// Function to display rented workspace info in the search page
function displayRentedWorkspaceInfo(rentedWorkspaceInfo) {
  const displayContainer = document.getElementById('displayContainer');
  const ul = document.createElement('ul');

  for (const key in rentedWorkspaceInfo) {
    if (key !== 'photo') {
      const li = document.createElement('li');
      const p = document.createElement('p');
      const value = typeof rentedWorkspaceInfo[key] === 'boolean' ? (rentedWorkspaceInfo[key] ? 'Yes' : 'No') : rentedWorkspaceInfo[key];
      p.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
      li.appendChild(p);
      ul.appendChild(li);
    }
  }

  if (rentedWorkspaceInfo.photo) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = rentedWorkspaceInfo.photo;
    img.alt = 'Workspace Photo';
    img.style.width = '200px';
    li.appendChild(img);
    ul.appendChild(li);
  }

  displayContainer.appendChild(ul);
}

// Render information when the page is first loaded
renderWorkspaceList();