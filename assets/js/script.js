document.addEventListener("DOMContentLoaded", function () {
  initRouteTitle();
  initIdPlaceholder();
  initPreviewButton();
  initNewsletterForm();
  initChatButton();
   initVehicleListing();     // Now added
});


// 🧭 Set Route Title from URL
function initRouteTitle() {
  const params = new URLSearchParams(window.location.search);
  const route = params.get("route");
  const station = params.get("station");
  const routeTitle = document.getElementById("routeTitle");

  if (route && routeTitle) {
    routeTitle.textContent = `Booking for ${route}${station ? " via " + station : ""}`;
  }
}

// 🪪 Update ID Placeholder Based on Type
function initIdPlaceholder() {
  const idTypeSelect = document.getElementById("idType");
  const idInput = document.getElementById("idNumber");

  if (idTypeSelect && idInput) {
    idTypeSelect.addEventListener("change", function () {
      const placeholders = {
        "Ghana Card": "e.g. GHA-123456789",
        "Passport": "e.g. G1A23456",
        "Driver's License": "e.g. DL-123456",
        "NHIS": "e.g. NHIS-123456",
        "Voter ID": "e.g. VID-123456"
      };
      idInput.placeholder = placeholders[this.value] || "Enter your ID number";
    });
  }
}

// 📋 Handle Booking Preview Button
function initPreviewButton() {
  const previewBtn = document.getElementById("previewBtn");
  const form = document.getElementById("bookingForm");

  if (previewBtn && form) {
    previewBtn.addEventListener("click", function () {
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const idType = document.getElementById("idType").value;
      const idNumber = document.getElementById("idNumber").value.trim();
      const idFeedback = document.getElementById("idFeedback");
      const idInput = document.getElementById("idNumber");

      const patterns = {
        "Ghana Card": /^GHA-\d{9}$/,
        "Passport": /^[A-Z]{2}\d{7}$/,
        "Driver's License": /^DL-\d{6}$/,
        "NHIS": /^NHIS-\d{6}$/,
        "Voter ID": /^VID-\d{6}$/
      };

      const feedbacks = {
        "Ghana Card": "Format: GHA-123456789",
        "Passport": "Format: G1A23456",
        "Driver's License": "Format: DL-123456",
        "NHIS": "Format: NHIS-123456",
        "Voter ID": "Format: VID-123456"
      };

      const isIdValid = patterns[idType]?.test(idNumber);
      idFeedback.textContent = feedbacks[idType] || "Please select an ID type.";

      if (!isIdValid) {
        idInput.classList.add("is-invalid");
        return;
      } else {
        idInput.classList.remove("is-invalid");
        idInput.classList.add("is-valid");
      }

      const params = new URLSearchParams(window.location.search);
      const route = params.get("route");
      const station = params.get("station");

      const bookingData = {
        name: document.getElementById("name").value,
        idType,
        idNumber,
        date: document.getElementById("date").value,
        passengers: document.getElementById("passengers").value,
        route: route || "Not selected",
        station: station || "Not specified"
      };

      sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
      window.location.href = "preview.html";
    });
  }
}

// 📧 Newsletter Form Submission
function initNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  const msg = document.getElementById("newsletterMsg");

  if (form && msg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      msg.classList.remove("d-none");
      form.reset();
    });
  }
}

// 💬 Chat Button Click
function initChatButton() {
  const chatBtn = document.getElementById("chatBtn");
  if (chatBtn) {
    chatBtn.addEventListener("click", function () {
      alert("Live chat is coming soon! For now, contact us via email.");
    });
  }
}


// 🔹 Vehicle listing component
function initVehicleListing() {
  const vehicleCards = document.getElementById("vehicleCards");
  if (!vehicleCards) return;

  const vehicles = [
    {
      station: "GPRTU",
      route: "Ho ↔ Accra",
      price: 45,
      seatsLeft: 3,
      departure: "2025-10-21T14:00"
    },
    {
      station: "PROTOA",
      route: "Ho ↔ Kumasi",
      price: 60,
      seatsLeft: 5,
      departure: "2025-10-21T15:30"
    },
    {
      station: "STC",
      route: "Ho ↔ Takoradi",
      price: 80,
      seatsLeft: 2,
      departure: "2025-10-21T13:00"
    }
  ];

  vehicles.forEach(vehicle => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${vehicle.route}</h5>
          <p class="card-text">
            <strong>Station:</strong> ${vehicle.station}<br>
            <strong>Price:</strong> GH₵${vehicle.price}<br>
            <strong>Seats Left:</strong> ${vehicle.seatsLeft}<br>
            <strong>Departure:</strong> ${formatTime(vehicle.departure)}
          </p>
          <a href="booking.html?route=${encodeURIComponent(vehicle.route)}&station=${vehicle.station}" class="btn btn-primary w-100">
            Book Now
          </a>
        </div>
      </div>
    `;
    vehicleCards.appendChild(card);
  });

  function formatTime(datetime) {
    const date = new Date(datetime);
    return date.toLocaleString("en-GB", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short"
    });
  }
}