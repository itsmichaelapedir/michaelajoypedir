const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
     navLinks.classList.toggle('active');
}


let currentIndex = -1; // Global variable to track the current image index
let currentZoom = 1; // Default zoom level
let zoomSpeed = 0.1; // Zoom speed

// Function to open lightbox with a specific image
function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const images = document.querySelectorAll(".scroll-container img");

  lightbox.style.display = "flex"; // Show the lightbox
  lightboxImage.src = images[index].src; // Show clicked image in lightbox
  currentIndex = index; // Update the global index
  currentZoom = 1; // Reset zoom when opening the image
  lightboxImage.style.transform = `scale(${currentZoom})`; // Reset the zoom level
}

// Function to close the lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none"; // Hide the lightbox
}

// Function to change the image (next or previous)
function changeImage(direction) {
  const images = document.querySelectorAll(".scroll-container img");
  currentIndex = (currentIndex + direction + images.length) % images.length;
  const lightboxImage = document.querySelector(".lightbox-image");
  lightboxImage.src = images[currentIndex].src; // Update the image source
}

// Zoom using mouse scroll
function zoomImage(event) {
  const lightboxImage = document.querySelector(".lightbox-image");
  event.preventDefault();

  if (event.deltaY < 0) {
    currentZoom += zoomSpeed; // Zoom in
  } else {
    currentZoom -= zoomSpeed; // Zoom out
  }

  currentZoom = Math.min(Math.max(currentZoom, 1), 3); // Limit zoom between 1x and 3x
  lightboxImage.style.transform = `scale(${currentZoom})`;
}

// Zoom in/out using buttons
function zoom(factor) {
  const lightboxImage = document.querySelector(".lightbox-image");
  currentZoom *= factor;
  currentZoom = Math.min(Math.max(currentZoom, 1), 3); // Limit zoom between 1x and 3x
  lightboxImage.style.transform = `scale(${currentZoom})`;
}

// Add event listeners for zooming with mouse scroll and buttons
document.querySelector(".lightbox-image").addEventListener("wheel", zoomImage);
document.querySelectorAll(".thumbnail").forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});
document.querySelector(".close").addEventListener("click", closeLightbox);
