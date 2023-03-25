// Obtener los elementos del DOM necesarios
const bikes = document.querySelectorAll('.bike-card');
const rentList = document.querySelector('.rent-list');
const total = document.querySelector('.total');
const sideNav = document.querySelector('.side-nav');
const openSideNavBtn = document.querySelector('.open-side-nav');
const closeSideNavBtn = document.querySelector('.close-side-nav');

let selectedBikes = [];

// Función para actualizar el precio total
function updateTotal() {
  let sum = 0;
  selectedBikes.forEach(bike => {
    sum += bike.price * bike.duration;
  });
  total.textContent = `$${sum}`;
}

// Función para agregar una bicicleta a la lista de renta
function addBikeToRentList(bike) {
  // Crear un nuevo elemento para la lista
  const rentItem = document.createElement('div');
  rentItem.classList.add('rent-item');
  
  // Agregar el nombre de la bicicleta y la duración
  rentItem.innerHTML = `
    <span class="name">${bike.name}</span>
    <span class="duration">${bike.duration}h</span>
  `;
  
  // Agregar el botón para quitar la bicicleta de la lista
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-btn');
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', () => {
    // Remover la bicicleta de la lista de renta
    selectedBikes = selectedBikes.filter(b => b.id !== bike.id);
    // Remover el elemento de la lista de renta
    rentItem.remove();
    // Actualizar el precio total
    updateTotal();
    // Desactivar el botón de rentar para la bicicleta correspondiente
    bike.rentBtn.disabled = false;
  });
  rentItem.appendChild(removeBtn);
  
  // Agregar la bicicleta a la lista de renta y actualizar el precio total
  rentList.appendChild(rentItem);
  selectedBikes.push(bike);
  updateTotal();
}

