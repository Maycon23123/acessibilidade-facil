// Área de arrastar e soltar / selecionar arquivo de texto.
export function initDropzone(onText) {
  const zone = document.getElementById("dropzone");
  const input = document.getElementById("file-input");
  const button = document.getElementById("btn-select-file");
  const label = document.getElementById("file-name");

  function read(file) {
    if (!file) return;
    const isText = file.type.startsWith("text/") || /\.(txt|md)$/i.test(file.name);
    if (!isText) {
      alert("Formato não suportado. Use um arquivo .txt ou .md.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      label.textContent = file.name;
      onText(String(reader.result));
    };
    reader.onerror = () => alert("Não foi possível ler o arquivo.");
    reader.readAsText(file, "UTF-8");
  }

  button.addEventListener("click", () => input.click());
  input.addEventListener("change", () => read(input.files[0]));

  ["dragenter", "dragover"].forEach((type) =>
    zone.addEventListener(type, (e) => {
      e.preventDefault();
      zone.classList.add("is-dragover");
    }),
  );
  ["dragleave", "drop"].forEach((type) =>
    zone.addEventListener(type, (e) => {
      e.preventDefault();
      zone.classList.remove("is-dragover");
    }),
  );
  zone.addEventListener("drop", (e) => read(e.dataTransfer.files[0]));
}
