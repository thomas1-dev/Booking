document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(sessionStorage.getItem("bookingData"));

  if (!data) {
    alert("No booking data found. Please start again.");
    window.location.href = "booking.html";
    return;
  }

  document.getElementById("route").textContent = data.route;
  document.getElementById("name").textContent = data.name;
  document.getElementById("idType").textContent = data.idType;
  document.getElementById("idNumber").textContent = data.idNumber;
  document.getElementById("date").textContent = data.date;
  document.getElementById("passengers").textContent = data.passengers;
document.getElementById("station").textContent = data.station;


  document.getElementById("confirmBtn").addEventListener("click", () => {
    alert(`Thank you, ${data.name}! Your booking has been confirmed.`);
    sessionStorage.removeItem("bookingData");
    window.location.href = "booking.html";
  });
});