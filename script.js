'use strict';
const byId = id => document.getElementById(id);
const particles = byId('particles');
const efficiency = byId('efficiency');
let active = false;
function calculate(n, e) {
  const retained = Math.round(n * e / 100);
  return { initial: n, retained, remaining: n - retained, reduction: retained / n * 100 };
}
function renderDots(result) {
  const fragment = document.createDocumentFragment();
  // 200 lugares separados: 20 filas y 10 posiciones por fila.
  for (let i = 0; i < result.initial; i++) {
    const dot = document.createElement('span');
    const caught = i < result.retained;
    dot.className = caught ? 'dot caught' : 'dot';
    dot.style.setProperty('--y', `${4 + (i % 20) * 4.6}%`);
    dot.style.setProperty('--delay', `${-Math.floor(i / 20) * .5}s`);
    dot.style.setProperty('--stop', `${46 - Math.floor(i / 20) * 2.5}%`);
    dot.style.setProperty('--static', caught ? `${46 - Math.floor(i / 20) * 2.5}%` : `${56 + Math.floor(i / 20) * 4}%`);
    fragment.append(dot);
  }
  byId('dots').replaceChildren(fragment);
}
function update() {
  const result = calculate(Number(particles.value), Number(efficiency.value));
  byId('particlesValue').textContent = particles.value;
  byId('efficiencyValue').textContent = `${efficiency.value} %`;
  ['initial', 'retained', 'remaining'].forEach(key => { byId(key).textContent = result[key]; });
  byId('reduction').textContent = `${Number(result.reduction.toFixed(2)).toLocaleString('es-MX')} %`;
  byId('duct').setAttribute('aria-label', `Conducto de chimenea con filtro central. ${active ? 'Activo' : 'Apagado'}. Modelo: ${result.retained} partículas retenidas y ${result.remaining} restantes.`);
  if (active) renderDots(result);
}
particles.addEventListener('input', update);
efficiency.addEventListener('input', update);
byId('start').addEventListener('click', () => {
  active = true;
  byId('duct').classList.add('active');
  byId('status').textContent = 'Simulación activa: el aire atraviesa el filtro';
  byId('start').disabled = true;
  update();
});
byId('reset').addEventListener('click', () => {
  active = false;
  particles.value = '100';
  efficiency.value = '35';
  byId('duct').classList.remove('active');
  byId('dots').replaceChildren();
  byId('status').textContent = 'Sistema apagado';
  byId('start').disabled = false;
  update();
});
update();
