document.addEventListener("DOMContentLoaded", () => {
  // Get route from URL
  const params = new URLSearchParams(window.location.search);
  const route = params.get("route");

  // Display route title
  const routeTitle = document.getElementById("routeTitle");
  if (route) {
    routeTitle.textContent = `Booking for ${route}`;
  }

  // Update ID placeholder based on type
  document.getElementById("idType").addEventListener("change", function () {
    const idInput = document.getElementById("idNumber");
    switch (this.value) {
      case "Ghana Card":
        idInput.placeholder = "e.g. GHA-123456789";
        break;
      case "Passport":
        idInput.placeholder = "e.g. G1A23456";
        break;
      case "Driver's License":
        idInput.placeholder = "e.g. DL-123456";
        break;
      case "NHIS":
        idInput.placeholder = "e.g. NHIS-123456";
        break;
      case "Voter ID":
        idInput.placeholder = "e.g. VID-123456";
        break;
      default:
        idInput.placeholder = "Enter your ID number";
    }
  });

  // Handle preview button click
  document.getElementById("previewBtn").addEventListener("click", function () {
    const form = document.getElementById("bookingForm");

    // Bootstrap validation
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Custom ID format validation
    const idType = document.getElementById("idType").value;
    const idNumber = document.getElementById("idNumber").value.trim();
    const idFeedback = document.getElementById("idFeedback");
    const idInput = document.getElementById("idNumber");

    let isIdValid = false;

    switch (idType) {
      case "Ghana Card":
        isIdValid = /^GHA-\d{9}$/.test(idNumber);
        idFeedback.textContent = "Format: GHA-123456789";
        break;
      case "Passport":
        isIdValid = /^[A-Z]{2}\d{7}$/.test(idNumber);
        idFeedback.textContent = "Format: G1A23456";
        break;
      case "Driver's License":
        isIdValid = /^DL-\d{6}$/.test(idNumber);
        idFeedback.textContent = "Format: DL-123456";
        break;
      case "NHIS":
        isIdValid = /^NHIS-\d{6}$/.test(idNumber);
        idFeedback.textContent = "Format: NHIS-123456";
        break;
      case "Voter ID":
        isIdValid = /^VID-\d{6}$/.test(idNumber);
        idFeedback.textContent = "Format: VID-123456";
        break;
      default:
        idFeedback.textContent = "Please select an ID type.";
    }

    if (!isIdValid) {
      idInput.classList.add("is-invalid");
      return;
    } else {
      idInput.classList.remove("is-invalid");
      idInput.classList.add("is-valid");
    }

    // Store data in sessionStorage
    const bookingData = {
      name: document.getElementById("name").value,
      idType,
      idNumber,
      date: document.getElementById("date").value,
      passengers: document.getElementById("passengers").value,
      route: route || "Not selected"
    };

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    window.location.href = "preview.html";
  });

  // Newsletter form submission
  document.getElementById("newsletterForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("newsletterMsg").classList.remove("d-none");
    this.reset();
  });

  // Chat button functionality
  document.getElementById("chatBtn").addEventListener("click", function () {
    alert("Live chat is coming soon! For now, contact us via email.");
  });
});