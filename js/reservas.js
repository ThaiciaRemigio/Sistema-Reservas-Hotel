function mostrarHabitaciones() {
  let salida = "<h2>Habitaciones</h2>";

  habitaciones.forEach(h => {
    salida += `
      <p>
        Habitación ${h[0]} - ${h[1]} - S/ ${h[2]} - ${h[3]}
        ${h[4] ? "- Cliente: " + h[4] : ""}
      </p>
    `;
  });

  document.getElementById("resultado").innerHTML = salida;
}

function reservarHabitacion() {
  const numero = parseInt(document.getElementById("numero").value);
  const cliente = document.getElementById("cliente").value.trim();
  const dias = Number(document.getElementById("dias").value);
const servicios = Number(document.getElementById("servicios").value) || 0;

  // Validaciones
  if (isNaN(numero)) {
    alert("Ingrese el número de habitación.");
    return;
  }

  if (cliente === "") {
    alert("Ingrese el nombre del cliente.");
    return;
  }

  if (isNaN(dias) || dias <= 0) {
    alert("Ingrese una cantidad válida de días.");
    return;
  }

  for (let i = 0; i < habitaciones.length; i++) {
    if (habitaciones[i][0] === numero) {
      if (habitaciones[i][3] === "Libre") {
        // Actualizar datos
        habitaciones[i][3] = "Ocupado";
        habitaciones[i][4] = cliente;
        habitaciones[i][5] = dias;
        habitaciones[i][6] = servicios;

        // Calcular total
        const total = calcularCosto(
          habitaciones[i][2],
          dias,
          servicios
        );

        alert(`Reserva realizada con éxito.\nTotal a pagar: S/ ${total.toFixed(2)}`);

        mostrarHabitaciones();
        limpiarFormulario();
        return;
      } else {
        alert("La habitación ya está ocupada.");
        return;
      }
    }
  }

  alert("Habitación no encontrada.");
}

function calcularCosto(precio, dias, servicios) {
  precio = Number(precio);
  dias = Number(dias);
  servicios = Number(servicios) || 0;

  // 1. Subtotal por habitación
  let subtotal = precio * dias;

  // 2. Descuento (solo habitación, NO servicios)
  let descuento = 0;
  if (dias > 5) {
    descuento = subtotal * 0.10;
  }

  // 3. Total final
  let total = subtotal - descuento + servicios;

  return total;
}

function buscarCliente() {
  const nombre = prompt("Ingrese el nombre del cliente:");

  if (!nombre) return;

  for (let i = 0; i < habitaciones.length; i++) {
    if (
      habitaciones[i][4] &&
      habitaciones[i][4].toLowerCase() === nombre.toLowerCase()
    ) {
      alert(`Cliente encontrado en la habitación ${habitaciones[i][0]}`);
      return;
    }
  }

  alert("Cliente no encontrado.");
}

function liberarHabitacion() {
  const numero = parseInt(prompt("Ingrese el número de habitación a liberar:"));

  if (isNaN(numero)) {
    alert("Número inválido.");
    return;
  }

  for (let i = 0; i < habitaciones.length; i++) {
    if (habitaciones[i][0] === numero) {
      habitaciones[i][3] = "Libre";
      habitaciones[i][4] = "";
      habitaciones[i][5] = 0;
      habitaciones[i][6] = 0;

      alert("Habitación liberada correctamente.");
      mostrarHabitaciones();
      return;
    }
  }

  alert("Habitación no encontrada.");
}

function limpiarFormulario() {
  document.getElementById("numero").value = "";
  document.getElementById("cliente").value = "";
  document.getElementById("dias").value = "";
  document.getElementById("servicios").value = "";
}

// Mostrar habitaciones al cargar la página
mostrarHabitaciones();