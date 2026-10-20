import Settings from "./settings.js";

// Estimador de páginas em braille.
// Premissas (ajuste conforme a sua realidade):
//  - cela braille ≈ 0,6 cm de largura
//  - linha ≈ 1,0 cm de altura (com espaço entre linhas)
//  - maiúsculas e números ganham celas de sinal
//  - Grau 2 (contraído) reduz as palavras em ~25%
export default class BrailleEstimator {
  static CELL_WIDTH_CM = 0.6;
  static LINE_HEIGHT_CM = 1.0;
  static GRAU2_FACTOR = 0.75;

  constructor(settings) {
    this.settings = settings;
  }

  get layout() {
    const paper = Settings.PAPERS[this.settings.paper];
    const margin = this.settings.margin * 2;
    return {
      cols: Math.max(
        Math.floor((paper.width - margin) / BrailleEstimator.CELL_WIDTH_CM),
        0,
      ),
      rows: Math.max(
        Math.floor((paper.height - margin) / BrailleEstimator.LINE_HEIGHT_CM),
        0,
      ),
    };
  }

  #wordCells(word) {
    let cells = word.length;

    const upper = word.match(/\p{Lu}/gu);
    if (upper) cells += Math.min(upper.length, 2); // palavra toda em maiúscula = sinal duplo
    const numbers = word.match(/\d+/g);
    if (numbers) cells += numbers.length;

    if (this.settings.contraction === "grau2" && word.length > 2) {
      cells = Math.ceil(cells * BrailleEstimator.GRAU2_FACTOR);
    }
    return Math.max(cells, 1);
  }

  #countLines(text, cols) {
    let lines = 0;

    for (const paragraph of text.split(/\r?\n/)) {
      const words = paragraph.split(/\s+/).filter(Boolean);
      if (words.length === 0) {
        lines += 1; // linha em branco
        continue;
      }

      let used = 0;
      lines += 1;
      for (const word of words) {
        let size = this.#wordCells(word);
        while (size > cols) {
          // palavra maior que a linha
          if (used > 0) {
            lines += 1;
            used = 0;
          }
          size -= cols;
          lines += 1;
        }
        if (used === 0) used = size;
        else if (used + 1 + size <= cols) used += 1 + size;
        else {
          lines += 1;
          used = size;
        }
      }
    }
    return lines;
  }

  estimate(text) {
    const { cols, rows } = this.layout;
    if (!text || !text.trim()) return { pages: 0, lines: 0, cols, rows };
    if (cols < 1 || rows < 1) {
      return { error: "Margem grande demais para este papel." };
    }
    const lines = this.#countLines(text, cols);
    return { pages: Math.ceil(lines / rows), lines, cols, rows };
  }
}
