const DEFAULT_WPM2 = { 'Veldig god': 40, 'God': 50, 'Middels': 70, 'Dårlig': 100 };
const CLIMATE_FACTOR = { 'Kyst': 0.9, 'Innland': 1.0, 'Fjell': 1.15 };

document.getElementById('calcBtn').addEventListener('click', () => {
  const area = +document.getElementById('area').value;
  const insulation = document.getElementById('insulation').value;
  const custom = +document.getElementById('customWpm2').value;
  const wpm2 = custom || DEFAULT_WPM2[insulation];
  const climate = document.getElementById('climate').value;
  const scop = +document.getElementById('scop').value;
  const elecPrice = +document.getElementById('elecPrice').value;
  const capex = +document.getElementById('capex').value;
  const hours = +document.getElementById('hours').value;
  const margin = +document.getElementById('margin').value;

  const designLoad_W = area * wpm2 * CLIMATE_FACTOR[climate] * margin;
  const designLoad_kW = designLoad_W / 1000;
  const annualHeat_kWh = designLoad_kW * hours;
  const hp_kWh = annualHeat_kWh / scop;
  const cost_direct = annualHeat_kWh * elecPrice;
  const cost_hp = hp_kWh * elecPrice;
  const savings = cost_direct - cost_hp;
  const payback = savings > 0 ? (capex / savings).toFixed(1) : 'N/A';

  document.getElementById('results').innerHTML = `
    <p>Effektbehov: <b>${designLoad_kW.toFixed(2)} kW</b></p>
    <p>Årlig varmebehov: <b>${annualHeat_kWh.toFixed(0)} kWh</b></p>
    <p>Kostnad elektrisk oppvarming: <b>${cost_direct.toFixed(0)} kr</b></p>
    <p>Kostnad varmepumpe: <b>${cost_hp.toFixed(0)} kr</b></p>
    <p>Årlig besparelse: <b>${savings.toFixed(0)} kr</b></p>
    <p>Tilbakebetalingstid: <b>${payback} år</b></p>`;

  document.getElementById('insulation').addEventListener('change', () => {
  const insulation = document.getElementById('insulation').value;
  document.getElementById('customWpm2').placeholder = DEFAULT_WPM2[insulation];
});
