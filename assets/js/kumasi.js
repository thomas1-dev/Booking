document.addEventListener("DOMContentLoaded", () => {
  const vehicles = [
    {
      station: "GPRTU",
      route: "Kumasi ↔ Tema",
      price: 55,
      seatsLeft: 4,
      departure: "2025-10-23T10:00"
    },
    {
      station: "PROTOA",
      route: "Kumasi ↔ Accra",
      price: 65,
      seatsLeft: 6,
      departure: "2025-10-23T12:00"
    },
    {
      station: "STC",
      route: "Kumasi ↔ Takoradi",
      price: 70,
      seatsLeft: 3,
      departure: "2025-10-23T14:30"
    }
  ];

  const container = document.getElementById("kumasiVehicleCards");

  vehicles.forEach(vehicle => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-4 mb-4";
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
    container.appendChild(card);
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
});