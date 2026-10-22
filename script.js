// Activa comprobaciones más estrictas de JavaScript para detectar errores comunes.
'use strict';
// Función auxiliar que busca un elemento HTML por su identificador.
const byId = id => document.getElementById(id);
// Guarda la referencia al deslizador de cantidad de partículas.
const particles = byId('particles');
// Guarda la referencia al deslizador de eficiencia.
const efficiency = byId('efficiency');
// Indica si la simulación está encendida; al cargar comienza apagada.
let active = false;
// Calcula los resultados a partir de n (partículas) y e (eficiencia porcentual).
function calculate(n, e) {
  // Redondea al entero más cercano porque el modelo cuenta partículas completas.
  const retained = Math.round(n * e / 100);
  // Devuelve la cantidad inicial, las retenidas, las restantes y la reducción efectiva.
  return { initial: n, retained, remaining: n - retained, reduction: retained / n * 100 };
}
// Crea la representación visual de un ciclo de partículas usando los resultados.
function renderDots(result) {
  // Agrupa los círculos fuera del documento para insertarlos todos de una vez.
  const fragment = document.createDocumentFragment();
  // Organiza hasta 200 partículas en 20 filas con fases distintas por grupo.
  // Genera exactamente un círculo por partícula inicial.
  for (let i = 0; i < result.initial; i++) {
    // Crea un elemento span que CSS convierte en un círculo.
    const dot = document.createElement('span');
    // Las primeras partículas, hasta el total calculado, se consideran retenidas.
    const caught = i < result.retained;
    // La clase caught selecciona la animación de retención; las demás atraviesan el filtro.
    dot.className = caught ? 'dot caught' : 'dot';
    // Reparte las partículas en 20 filas verticales mediante el residuo de la división.
    dot.style.setProperty('--y', `${4 + (i % 20) * 4.6}%`);
    // Desfasa grupos de 20 partículas. El retraso negativo inicia cada grupo en una fase distinta.
    dot.style.setProperty('--delay', `${-Math.floor(i / 20) * .5}s`);
    // Define dónde se detienen las partículas retenidas, antes de la rejilla.
    dot.style.setProperty('--stop', `${46 - Math.floor(i / 20) * 2.5}%`);
    // Define una posición fija cuando el sistema solicita reducir el movimiento.
    dot.style.setProperty('--static', caught ? `${46 - Math.floor(i / 20) * 2.5}%` : `${56 + Math.floor(i / 20) * 4}%`);
    // Agrega el círculo al grupo preparado en memoria.
    fragment.append(dot);
  }
  // Sustituye los círculos anteriores para evitar que se acumulen al cambiar los controles.
  byId('dots').replaceChildren(fragment);
}
// Sincroniza los valores de los controles, las tarjetas y la descripción accesible.
function update() {
  // Convierte los valores de los deslizadores de texto a números y calcula el modelo.
  const result = calculate(Number(particles.value), Number(efficiency.value));
  // Muestra la cantidad seleccionada junto al deslizador.
  byId('particlesValue').textContent = particles.value;
  // Muestra la eficiencia seleccionada junto al deslizador.
  byId('efficiencyValue').textContent = `${efficiency.value} %`;
  // Recorre las tres tarjetas de cantidades y asigna el resultado correspondiente.
  ['initial', 'retained', 'remaining'].forEach(key => { byId(key).textContent = result[key]; });
  // Muestra la reducción con hasta dos decimales y formato numérico de México.
  byId('reduction').textContent = `${Number(result.reduction.toFixed(2)).toLocaleString('es-MX')} %`;
  // Describe el estado y los resultados para personas que usan lectores de pantalla.
  byId('duct').setAttribute('aria-label', `Conducto de chimenea con filtro central. ${active ? 'Activo' : 'Apagado'}. Modelo: ${result.retained} partículas retenidas y ${result.remaining} restantes.`);
  // Redibuja las partículas solamente mientras la simulación está encendida.
  if (active) renderDots(result);
}
// Actualiza los resultados inmediatamente cuando cambia la cantidad de partículas.
particles.addEventListener('input', update);
// Actualiza los resultados inmediatamente cuando cambia la eficiencia.
efficiency.addEventListener('input', update);
// Ejecuta estas instrucciones cuando se pulsa Iniciar simulación.
byId('start').addEventListener('click', () => {
  // Enciende el estado lógico de la simulación.
  active = true;
  // Activa la clase CSS que anima las flechas del aire.
  byId('duct').classList.add('active');
  // Informa que el aire está atravesando el filtro.
  byId('status').textContent = 'Simulación activa: el aire atraviesa el filtro';
  // Evita iniciar varias veces seguidas; los deslizadores siguen disponibles.
  byId('start').disabled = true;
  // Refresca las tarjetas y los valores visibles después del cambio de estado.
  update();
});
// Ejecuta estas instrucciones cuando se pulsa Reiniciar.
byId('reset').addEventListener('click', () => {
  // Apaga el estado lógico para impedir nuevos dibujos de partículas.
  active = false;
  // Restaura la cantidad inicial de 100 partículas.
  particles.value = '100';
  // Restaura la eficiencia inicial del 35 por ciento.
  efficiency.value = '35';
  // Desactiva la animación de las flechas.
  byId('duct').classList.remove('active');
  // Elimina los círculos y detiene sus animaciones.
  byId('dots').replaceChildren();
  // Restaura el mensaje del sistema apagado.
  byId('status').textContent = 'Sistema apagado';
  // Permite iniciar un nuevo experimento.
  byId('start').disabled = false;
  // Refresca las tarjetas y los valores visibles después del cambio de estado.
  update();
});
// Prepara los resultados iniciales al cargar la página, sin encender la simulación.
update();
