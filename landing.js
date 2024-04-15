
// Function for landing
const sliderData = [
  { url: 'coworkingdesk-1.jpg' },
  { url: 'coworkingdesk-2.jpg' },
  { url: 'meetingroom-1.jpg' },
  { url: 'meetingroom-2.jpg' },
  { url: 'privateoffice-1.jpg' },
  { url: 'privateoffice-2.jpg' }
];

const slider = document.getElementById('slider');
let currentIndex = 0;

// Function to change background image
function changeBackground() {
  slider.style.backgroundImage = `url(${sliderData[currentIndex].url})`;
  currentIndex = (currentIndex + 1) % sliderData.length;
}

// Change image every 1.5 seconds
setInterval(changeBackground, 1500);