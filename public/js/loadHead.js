async function importarHead() {
  try {
    // Carrega o conteúdo de head.html
    const response = await fetch("./public/html/head.html");
    const text = await response.text();

    // Usando DOMParser para criar um documento e parsear o conteúdo
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    // Obtendo o conteúdo do <head> do documento parseado
    const headElement = doc.querySelector("head");
    if (headElement) {
      document.head.innerHTML += headElement.innerHTML;
    } else {
      console.error("Erro: o arquivo head.html não contém uma tag <head>.");
    }
  } catch (error) {
    console.error("Erro ao importar o head:", error);
  }
}

// Chama a função ao carregar a página
window.onload = importarHead;
