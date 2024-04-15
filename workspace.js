// Function to remove token and redirect to login page
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'loginpage.html';
}

// Add event listener for logout link
document.getElementById('logout').addEventListener('click', function () {
  logout();
});

// Workspace page logic
let workspaceInfos = JSON.parse(localStorage.getItem('workspaceInfos')) || [];
let userInfo = JSON.parse(localStorage.getItem('userInfo'));
console.log('User Info:', userInfo);
const addButton = document.querySelector('button');
const photoInput = document.getElementById('photoInput');
const addworkspaceInfo = document.getElementById('addworkspace');

addButton.addEventListener('click', function () {
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const state = document.getElementById('state').value.trim();
  const country = document.getElementById('country').value.trim();
  const neighborhood = document.getElementById('neighborhood').value.trim();
  const squareFeet = document.getElementById('squareFeet').value.trim();
  const amenity = document.getElementById('amenity').value.trim();
  const parkingGarage = document.getElementById('parkingGarage').value;
  const publicTransportation = document.getElementById('publicTransportation').value;
  const workspaceType = document.getElementById('workspaceType').value;
  const seatingCapacity = document.getElementById('seatingCapacity').value.trim();
  const smokingAllowed = document.getElementById('smokingAllowed').value;
  const price = document.getElementById('price').value.trim();
  const photoFile = photoInput.files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const photoBase64 = reader.result;

    workspaceInfos.push({
      address: address,
      city: city,
      state: state,
      country: country,
      neighborhood: neighborhood,
      squareFeet: squareFeet,
      amenity: amenity,
      parkingGarage: parkingGarage === 'yes',
      publicTransportation: publicTransportation === 'yes',
      workspaceType: workspaceType,
      seatingCapacity: seatingCapacity,
      smokingAllowed: smokingAllowed === 'yes',
      price: price,
      creatorEmail: userInfo.email,
      photo: photoBase64
    });

    localStorage.setItem('workspaceInfos', JSON.stringify(workspaceInfos));

    addworkspaceInfo.innerHTML = 'Your information has been saved.';

    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('country').value = '';
    document.getElementById('neighborhood').value = '';
    document.getElementById('squareFeet').value = '';
    document.getElementById('amenity').value = '';
    document.getElementById('parkingGarage').value = 'yes';
    document.getElementById('publicTransportation').value = 'yes';
    document.getElementById('workspaceType').value = 'meetingRooms';
    document.getElementById('seatingCapacity').value = '';
    document.getElementById('smokingAllowed').value = 'no';
    document.getElementById('price').value = '';
  };

  reader.readAsDataURL(photoFile);
});