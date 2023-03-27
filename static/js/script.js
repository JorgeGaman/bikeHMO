  // Variables de elementos HTML
  const reservarBtn = document.getElementById("reservar-btn");
  const closeBtn = document.getElementById("close-btn");
  const overlay = document.getElementById("overlay");
  const bikeInfo = document.getElementById("bike-info");
  const priceInfo = document.getElementById("price-info");
  const hoursInfo = document.getElementById("hours-info");
  const totalInfo = document.getElementById("total-info");

  // Función para mostrar la ventana emergente
  function showPopup(bike, precioHora, hours, total) {
    bikeInfo.textContent = `Bicicleta a rentar: ${bike}`;
    priceInfo.textContent = `Precio por hora: $${precioHora}`;
    hoursInfo.textContent = `Horas a rentar: ${hours}`;
    totalInfo.textContent = `Total a pagar: $${total}`;
    overlay.style.display = "flex"; 
  }
  // Función para ocultar la ventana emergente
  function hidePopup() {
    overlay.style.display = "none";
  }

  // Evento click en el botón de reservar
  reservarBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedBike = document.querySelector("select").value;
    const hours = document.getElementById("horas").value;
    let precioHora = 60;
    if (selectedBike === "BCN"){
        precioHora = 40;
    } else if (selectedBike === "BCA"){
        precioHora = 60;
    } else if (selectedBike === "BCD"){
        precioHora = 80;
    }

    const total = hours * precioHora; 
    showPopup(selectedBike, precioHora, hours, total);
  });

  const horasInput = document.getElementById('horas');
  horasInput.addEventListener('input', () => {
    const horas = parseInt(horasInput.value);
    if (horas > 12) {
      horasInput.value = '12';
    }
  });
  
  const payBtn = document.getElementById("pay-btn");
payBtn.addEventListener("click", function() {
    window.location.href = "/confirmar-renta";
});
  // Evento click en el botón de cerrar
  closeBtn.addEventListener("click", hidePopup);
