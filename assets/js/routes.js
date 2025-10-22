const routes = [
  { route: "Ho ↔ Accra", from: "Ho", to: "Accra", time: "3 hrs", fare: 60 },
  { route: "Accra ↔ Tema", from: "Accra", to: "Tema", time: "1 hr", fare: 20 },
  { route: "Accra ↔ Kumasi", from: "Accra", to: "Kumasi", time: "5 hrs", fare: 80 },
  { route: "Kumasi ↔ Tema", from: "Kumasi", to: "Tema", time: "6 hrs", fare: 85 }
];

const tableBody = document.getElementById("routeTableBody");
const searchInput = document.getElementById("searchInput");
const fareFilter = document.getElementById("fareFilter");
const navSearchInput = document.getElementById("navSearchInput");
const navSearchForm = document.getElementById("navSearchForm");

// 🔹 Render table rows
function renderRoutes(filteredRoutes) {
  tableBody.innerHTML = "";
  filteredRoutes.forEach(route => {
    const row = `
      <tr>
        <td>${route.route}</td>
        <td>${route.from}</td>
        <td>${route.to}</td>
        <td>${route.time}</td>
        <td>${route.fare}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// 🔹 Apply filters from main inputs
function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const fareLimit = parseInt(fareFilter.value);

  const filtered = routes.filter(route => {
    const matchesRoute = route.route.toLowerCase().includes(search);
    const matchesCity = route.from.toLowerCase().includes(search) || route.to.toLowerCase().includes(search);
    const matchesFare = isNaN(fareLimit) || route.fare <= fareLimit;

    return (matchesRoute || matchesCity) && matchesFare;
  });

  renderRoutes(filtered);
}

// 🔹 Apply navbar search
function applyNavSearch(query) {
  const filtered = routes.filter(route => {
    const matchesRoute = route.route.toLowerCase().includes(query);
    const matchesCity = route.from.toLowerCase().includes(query) || route.to.toLowerCase().includes(query);
    return matchesRoute || matchesCity;
  });

  renderRoutes(filtered);
}

// 🔹 Initial render
renderRoutes(routes);

// 🔹 Event listeners
searchInput.addEventListener("input", applyFilters);
fareFilter.addEventListener("change", applyFilters);

if (navSearchForm && navSearchInput) {
  navSearchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = navSearchInput.value.toLowerCase().trim();
    applyNavSearch(query);
  });
}