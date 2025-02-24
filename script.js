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

let currentSlide = 0;
let slides = [];

// Função para abrir o modal com o carrossel
function openMediaModal(src, type, element) {
  const modal = document.getElementById("mediaModal");
  const carouselInner = document.querySelector(".carousel-inner");

  // Limpa o carrossel antes de adicionar novas imagens
  carouselInner.innerHTML = "";

  // Coleta todas as imagens da grade de mídia
  const mediaElements = document.querySelectorAll(".media-grid img");
  slides = Array.from(mediaElements).map((img) => img.src);

  // Adiciona as imagens ao carrossel
  slides.forEach((slideSrc, index) => {
    const img = document.createElement("img");
    img.src = slideSrc;
    img.alt = `Slide ${index + 1}`;
    img.style.width = "100%"; // Garante que a imagem ocupe todo o espaço do carrossel
    img.style.display = "none"; // Esconde todas as imagens inicialmente
    carouselInner.appendChild(img);
  });

  // Define o slide inicial
  currentSlide = slides.indexOf(src);
  updateCarousel();

  // Exibe o modal
  modal.style.display = "flex";
}

// Função para fechar o modal
function closeMediaModal() {
  const modal = document.getElementById("mediaModal");
  modal.style.display = "none";
}

// Função para navegar para o slide anterior
function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = slides.length - 1; // Volta para o último slide
  }
  updateCarousel();
}

// Função para navegar para o próximo slide
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
  } else {
    currentSlide = 0; // Volta para o primeiro slide
  }
  updateCarousel();
}

// Função para atualizar a exibição do carrossel
function updateCarousel() {
  const carouselInner = document.querySelector(".carousel-inner");
  const images = carouselInner.querySelectorAll("img");

  // Esconde todas as imagens
  images.forEach((img, index) => {
    img.style.display = "none";
  });

  // Exibe apenas a imagem atual
  images[currentSlide].style.display = "block";
}

// Adiciona eventos de clique para abrir o modal
document.addEventListener("DOMContentLoaded", function () {
  const mediaElements = document.querySelectorAll(".media-grid img");

  mediaElements.forEach((element) => {
    element.addEventListener("click", function () {
      const src = element.src;
      openMediaModal(src, "image", element);
    });
  });
});