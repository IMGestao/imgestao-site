export function parseConteudoToBlocks(conteudo = "") {
  const linhas = String(conteudo || "")
    .split("\n")
    .map((linha) => linha.trim());

  const blocos = [];
  let paragrafoBuffer = [];
  let listaBuffer = [];

  const flushParagrafos = () => {
    if (!paragrafoBuffer.length) return;

    blocos.push({
      tipo: "paragrafo",
      texto: paragrafoBuffer.join(" "),
    });
    paragrafoBuffer = [];
  };

  const flushLista = () => {
    if (!listaBuffer.length) return;

    blocos.push({
      tipo: "lista",
      itens: [...listaBuffer],
    });
    listaBuffer = [];
  };

  for (const linha of linhas) {
    if (!linha) {
      flushParagrafos();
      flushLista();
      continue;
    }

    if (linha.startsWith("## ")) {
      flushParagrafos();
      flushLista();
      blocos.push({
        tipo: "h2",
        texto: linha.replace(/^##\s+/, "").trim(),
      });
      continue;
    }

    if (linha.startsWith("### ")) {
      flushParagrafos();
      flushLista();
      blocos.push({
        tipo: "h3",
        texto: linha.replace(/^###\s+/, "").trim(),
      });
      continue;
    }

    if (linha.startsWith("- ") || linha.startsWith("* ")) {
      flushParagrafos();
      listaBuffer.push(linha.replace(/^[-*]\s+/, "").trim());
      continue;
    }

    paragrafoBuffer.push(linha);
  }

  flushParagrafos();
  flushLista();

  return blocos;
}

export function extractTakeaways(blocos = []) {
  return blocos.find((bloco) => bloco.tipo === "lista")?.itens || [];
}

export function headingToAnchor(texto = "") {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
