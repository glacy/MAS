const ctx = document.getElementById("mruChart").getContext("2d");
let velocity = document.getElementById("velocitySlider").value;
let time = document.getElementById("timeSlider").value;

// Función para calcular la distancia en MRU
function calculateDistance(velocity, time) {
  return Math.cos(velocity * time);
}

// Crear la gráfica inicial
const mruChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: Array.from({ length: time }, (_, i) => i + 1),
    datasets: [
      {
        label: "Distancia (m)",
        data: Array.from({ length: 100 * time }, (_, i) =>
          calculateDistance(velocity, i + 1)
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Tiempo (s)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Distancia (m)",
        },
      },
    },
  },
});

// Función para actualizar la gráfica
function updateChart() {
  velocity = document.getElementById("velocitySlider").value;
  time = document.getElementById("timeSlider").value;

  document.getElementById("velocityValue").textContent = velocity;
  document.getElementById("timeValue").textContent = time;

  mruChart.data.labels = Array.from({ length: time }, (_, i) => i + 1);
  mruChart.data.datasets[0].data = Array.from({ length: time }, (_, i) =>
    calculateDistance(velocity, i + 1)
  );
  mruChart.update();
}

// Añadir eventos a los sliders
document
  .getElementById("velocitySlider")
  .addEventListener("input", updateChart);
document.getElementById("timeSlider").addEventListener("input", updateChart);
