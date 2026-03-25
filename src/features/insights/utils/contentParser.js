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

  const isTableDividerRow = (linha = "") => {
    const cells = String(linha)
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell, index, array) => {
        const isEdge = (index === 0 || index === array.length - 1) && cell === "";
        return !isEdge;
      });

    if (!cells.length) return false;

    return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
  };

  const parseTableRow = (linha = "") =>
    String(linha)
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell, index, array) => {
        const isEdge = (index === 0 || index === array.length - 1) && cell === "";
        return !isEdge;
      });

  for (let i = 0; i < linhas.length; i += 1) {
    const linha = linhas[i];

    if (!linha) {
      flushParagrafos();
      flushLista();
      continue;
    }

    const proximaLinha = linhas[i + 1] || "";
    if (linha.includes("|") && isTableDividerRow(proximaLinha)) {
      flushParagrafos();
      flushLista();

      const headers = parseTableRow(linha);
      const rows = [];

      i += 2;
      while (i < linhas.length && linhas[i].includes("|")) {
        const row = parseTableRow(linhas[i]);
        if (row.length > 0) rows.push(row);
        i += 1;
      }

      i -= 1;

      if (headers.length && rows.length) {
        blocos.push({
          tipo: "tabela",
          headers,
          rows,
        });
        continue;
      }
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
