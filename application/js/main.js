import { loadComponent } from "./loader.js";
import { initSettings } from "./settings.js";
import { initDropzone } from "./dropzone.js";
import BrailleEstimator from "../models/braille.js";

async function start() {
  try {
    await Promise.all([
      loadComponent("dropzone-slot", "./Components/dropzone.html"),
      loadComponent("settings-slot", "./Components/settings.html"),
      loadComponent("textbox-slot", "./Components/textbox.html"),
      loadComponent("result-slot", "./Components/result.html"),
    ]);
  } catch (error) {
    document.querySelector("main").innerHTML =
      "<p>Não foi possível carregar a página. Abra o projeto com o Live Server (não direto pelo arquivo).</p>";
    console.error(error);
    return;
  }

  const getSettings = initSettings();
  const textInput = document.getElementById("text-input");
  const result = document.getElementById("result");

  function estimate() {
    const data = new BrailleEstimator(getSettings()).estimate(textInput.value);
    result.textContent = data.error ?? `Estimativa: ${data.pages} pgs`;
  }

  initDropzone((text) => {
    textInput.value = text;
    estimate();
  });

  document.getElementById("btn-estimate").addEventListener("click", estimate);
}

start();
