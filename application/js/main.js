async function start() {
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
