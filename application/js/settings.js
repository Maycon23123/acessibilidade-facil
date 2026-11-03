import Settings from "../models/settings.js";

// Preenche os selects, salva as configurações e devolve uma função
// que lê os valores atuais.
export function initSettings() {
  const form = document.getElementById("settings-form");
  const status = document.getElementById("settings-status");
  const paper = document.getElementById("paper");
  const contraction = document.getElementById("contraction");
  const margin = document.getElementById("margin");

  paper.innerHTML = Object.entries(Settings.PAPERS)
    .map(([key, p]) => `<option value="${key}">${p.label}</option>`)
    .join("");
  contraction.innerHTML = Object.entries(Settings.CONTRACTIONS)
    .map(([key, c]) => `<option value="${key}">${c.label}</option>`)
    .join("");
  margin.innerHTML = Settings.MARGINS.map(
    (m) => `<option value="${m}">${String(m).replace(".", ",")} cm</option>`,
  ).join("");

  const saved = Settings.load();
  paper.value = saved.paper;
  contraction.value = saved.contraction;
  margin.value = String(saved.margin);

  const current = () =>
    new Settings(paper.value, contraction.value, Number(margin.value));

  let timer;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = current().save()
      ? "Configurações salvas."
      : "Não foi possível salvar.";
    clearTimeout(timer);
    timer = setTimeout(() => (status.textContent = ""), 2500);
  });

  return current;
}
