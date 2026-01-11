document.addEventListener("DOMContentLoaded", () => {

  /* ================= DATE & PRICE ================= */

  const PRICE_PER_DAY = 2600;
  const totalPrice = document.getElementById("totalPrice");

  const checkInPicker = flatpickr("#checkIn", {
    minDate: "today",
    onChange(selectedDates) {
      if (!selectedDates.length) return;

      const minCheckout = new Date(selectedDates[0].getTime() + 86400000);
      checkOutPicker.set("minDate", minCheckout);
      calculateTotal();
    }
  });

  const checkOutPicker = flatpickr("#checkOut", {
    minDate: new Date().fp_incr(1),
    onChange() {
      calculateTotal();
    }
  });

  function calculateTotal() {
    const checkInDate = checkInPicker.selectedDates[0];
    const checkOutDate = checkOutPicker.selectedDates[0];

    if (!checkInDate || !checkOutDate) return;

    const nights =
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    if (nights > 0) {
      totalPrice.innerText = `USD $${nights * PRICE_PER_DAY}`;
    }
  }

  /* ================= GUEST MODAL ================= */

  const guestModal = document.getElementById("guestModal");
  const guestInput = document.getElementById("guestInput");
  const guestField = document.getElementById("guestField");

  let guests = { guest: 1, infant: 0, pet: 0 };

  guestField.onclick = () => {
    guestModal.style.display = "block";
  };



  window.update = function (type, value) {
    if (type === "guest" && guests.guest + value < 1) return;
    if (guests[type] + value < 0) return;

    guests[type] += value;
    document.getElementById(type + "Count").innerText = guests[type];
    updateGuestText();
  };

  window.closeModal = function () {
    guestModal.style.display = "none";
    updateGuestText();
  };

  window.addEventListener("click", function (e) {
  const modal = document.getElementById("guestModal");
  const modalContent = document.querySelector(".modal-content");

  if (e.target === modal) {
    closeModal();
  }
});

  function updateGuestText() {
    const parts = [];

    if (guests.guest > 0) {
      parts.push(`${guests.guest} ${guests.guest > 1 ? "Guests" : "Guest"}`);
    }
    if (guests.infant > 0) {
      parts.push(`${guests.infant} ${guests.infant > 1 ? "Infants" : "Infant"}`);
    }
    if (guests.pet > 0) {
      parts.push(`${guests.pet} ${guests.pet > 1 ? "Pets" : "Pet"}`);
    }

    guestInput.value = parts.join(", ");
  }

   window.addEventListener("click", function(e) {
  if (e.target === guestModal) {
    guestModal.style.display = "none";
  }
  });

  /* ================= SHOW MORE / LESS ================= */

  const showMoreBtn = document.querySelector(".show-more h5");
  const shortText = document.querySelector(".short-text");
  const fullText = document.querySelector(".full-text");

  if (showMoreBtn && shortText && fullText) {
    fullText.style.display = "none";
    showMoreBtn.textContent = "SHOW MORE";

    showMoreBtn.addEventListener("click", function () {
      const isHidden = fullText.style.display === "none";

      fullText.style.display = isHidden ? "block" : "none";
      shortText.style.display = isHidden ? "none" : "block";
      this.textContent = isHidden ? "SHOW LESS" : "SHOW MORE";
    });
  }


  const STORAGE_KEY = "favourite_properties";
  let favourites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const hearts = document.querySelectorAll(".heart");

  // Restore favourites

  hearts.forEach(heart => {
    const id = heart.dataset.id;

    if (favourites.includes(id)) {
      heart.classList.add("active");
      heart.innerText = "♥";
    }

    heart.addEventListener("click", () => toggleFavourite(heart));
  });

  function toggleFavourite(heart) {
    const id = heart.dataset.id;

    if (heart.classList.contains("active")) {
      heart.classList.remove("active");
      heart.innerText = "♡";
      favourites = favourites.filter(item => item !== id);
    } else {
      heart.classList.add("active");
      heart.innerText = "♥";
      favourites.push(id);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }


  // Modal

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const slider = document.getElementById("modalSlider");
const images = slider.querySelectorAll("img");
const dotsContainer = document.getElementById("modalDots");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

/* Create dots */

images.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

openModal.onclick = () => {
  modal.style.display = "block";
  document.body.classList.add("modal-open");
  goToSlide(0);
};

closeModal.onclick = () => {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
};

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, images.length - 1));
  slider.scrollTo({
    left: currentIndex * window.innerWidth,
    behavior: "smooth"
  });
  updateDots();
}

prevBtn.onclick = () => goToSlide(currentIndex - 1);
nextBtn.onclick = () => goToSlide(currentIndex + 1);

function updateDots() {
  dotsContainer.querySelectorAll("span").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

slider.addEventListener("scroll", () => {
  currentIndex = Math.round(slider.scrollLeft / window.innerWidth);
  updateDots();
});



});
