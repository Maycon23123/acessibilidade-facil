// Área de arrastar e soltar / selecionar arquivo de texto.
export function initDropzone(onText) {
  const zone = document.getElementById("dropzone");
  const input = document.getElementById("file-input");
  const button = document.getElementById("btn-select-file");
  const label = document.getElementById("file-name");

  
  async function read(file) {
    if (!file) return;

    const name = file.name.toLowerCase();
    const isText =
      file.type.startsWith("text/") ||
      /\.(txt|md)$/i.test(name);

    const isPDF =
      file.type === "application/pdf" ||
      name.endsWith(".pdf");

    const isWord =
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".docx");

    if (!isText && !isPDF && !isWord) {
      alert("Formato não suportado. Use TXT, MD, PDF ou DOCX.");
      return;
    }

    try {
      let text = "";

      if (isText) {
        text = await file.text();

      } else if (isPDF) {
        if (!window.pdfjsLib) {
          throw new Error("Biblioteca PDF.js não carregada.");
        }

        const buffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(buffer)
        }).promise;

        const pages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          pages.push(
            content.items.map(item => item.str).join(" ")
          );
        }

        text = pages.join("\n\n");

      } else if (isWord) {
        if (!window.mammoth) {
          throw new Error("Biblioteca Mammoth não carregada.");
        }

        const buffer = await file.arrayBuffer();

        const result = await mammoth.extractRawText({
          arrayBuffer: buffer
        });

        text = result.value;
      }

      if (!text.trim()) {
        alert(
          "Não foi possível extrair texto. " +
          "O arquivo pode estar vazio ou ser um PDF digitalizado."
        );
        return;
      }

      label.textContent = file.name;
      onText(text);

    } catch (error) {
      console.error("Erro ao ler arquivo:", error);
      alert("Não foi possível ler o arquivo.");
    }
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
