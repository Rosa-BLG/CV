function openContent(id) {
  // Fecha todos os conteúdos abertos antes de abrir um novo
  closeContent();

  // Abre o conteúdo clicado
  const content = document.getElementById(id);
  if (content) {
    content.style.display = "flex";
  }
}

function closeContent() {
  // Fecha todos os conteúdos
  const contents = document.querySelectorAll(".content");
  contents.forEach((content) => {
    content.style.display = "none";
  });
}

// Fecha o conteúdo ao clicar fora dele
document.addEventListener("click", function (event) {
  const content = document.querySelector(".content");
  const target = event.target;

  // Verifica se o clique foi fora do conteúdo e não em um título
  if (content && !content.contains(target) && !target.matches("h3")) {
    closeContent();
  }
});

// Função para abrir o modal de mídia
function openMediaModal(src, type, element) {
  const modal = document.getElementById("mediaModal");
  const modalImage = document.getElementById("modalImage");
  const modalVideo = document.getElementById("modalVideo");
  const modalPdf = document.getElementById("modalPdf");

  // Pausa todos os vídeos da grade e reseta o tempo de reprodução
  document.querySelectorAll(".media-grid video").forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });

  // Esconde todos os elementos de mídia
  modalImage.style.display = "none";
  modalVideo.style.display = "none";
  modalPdf.style.display = "none";

  // Pequeno atraso para garantir que os vídeos da grade sejam pausados corretamente
  setTimeout(() => {
    // Define o conteúdo do modal com base no tipo de mídia
    if (type === "image") {
      modalImage.src = src;
      modalImage.style.display = "block";
    } else if (type === "video") {
      modalVideo.style.display = "block";
      modalVideo.src = ""; // Remove o src para garantir recarregamento correto
      setTimeout(() => {
        modalVideo.src = src; // Reinsere o src para carregar o vídeo corretamente
        modalVideo.play(); // Inicia a reprodução do vídeo no modal
      }, 100); // Delay para evitar conflito
    } else if (type === "pdf") {
      modalPdf.src = src;
      modalPdf.style.display = "block";
    }

    // Exibe o modal
    modal.style.display = "flex";
  }); // Delay de 200ms para garantir que os vídeos da grade tenham parado antes
}

// Função para fechar o modal de mídia
function closeMediaModal() {
  const modal = document.getElementById("mediaModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalPdf = document.getElementById("modalPdf");

  if (modalVideo) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  // Remove o PDF do iframe ao fechar o modal
  if (modalPdf) {
    modalPdf.src = ""; // Limpa o iframe
  }

  // Fecha o modal
  modal.style.display = "none";
}

// Adiciona eventos de clique para abrir o modal
document.addEventListener("DOMContentLoaded", function () {
  const mediaElements = document.querySelectorAll(
    ".media-grid img, .media-grid video, .media-grid embed"
  );

  mediaElements.forEach((element) => {
    element.addEventListener("click", function () {
      const src =
        element.src || element.querySelector("source").src || element.src;
      const type = element.tagName.toLowerCase();

      if (type === "img") {
        openMediaModal(src, "image", element);
      } else if (type === "video") {
        openMediaModal(src, "video", element);
        return;
      } else if (type === "embed") {
        openMediaModal(src, "pdf", element);
        return;
      }
    });
  });
});
