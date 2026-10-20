// Configurações do estimador: opções, valores padrão e persistência.
// Medidas de papel em centímetros.
export default class Settings {
  static STORAGE_KEY = "estimador:configuracoes";

  static PAPERS = {
    A4: { label: "A4", width: 21.0, height: 29.7 },
    A5: { label: "A5", width: 14.8, height: 21.0 },
    Carta: { label: "Carta", width: 21.59, height: 27.94 },
    Oficio: { label: "Ofício", width: 21.59, height: 35.56 },
  };

  static CONTRACTIONS = {
    grau1: { label: "Grau 1" },
    grau2: { label: "Grau 2" },
  };

  static MARGINS = [1, 1.5, 2, 2.5, 3]; // cm

  constructor(paper = "A4", contraction = "grau1", margin = 2) {
    this.paper = Settings.PAPERS[paper] ? paper : "A4";
    this.contraction = Settings.CONTRACTIONS[contraction]
      ? contraction
      : "grau1";
    this.margin = Settings.MARGINS.includes(Number(margin))
      ? Number(margin)
      : 2;
  }

  toJSON() {
    return {
      paper: this.paper,
      contraction: this.contraction,
      margin: this.margin,
    };
  }

  save() {
    try {
      localStorage.setItem(Settings.STORAGE_KEY, JSON.stringify(this));
      return true;
    } catch {
      return false;
    }
  }

  static load() {
    try {
      const data = JSON.parse(localStorage.getItem(Settings.STORAGE_KEY));
      return data
        ? new Settings(data.paper, data.contraction, data.margin)
        : new Settings();
    } catch {
      return new Settings();
    }
  }
}
