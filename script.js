// Efeito de rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

console.log("Efeito Multiverso inicializado com sucesso!");
// FUNCIONALIDADE DOS FILTROS DA CRONOLOGIA
const filterButtons = document.querySelectorAll('.filter-btn');
const timelineItems = document.querySelectorAll('.timeline-item');

function aplicarFiltro(categoria) {
  filterButtons.forEach(btn => {
    if (btn.dataset.filter === categoria) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  timelineItems.forEach(item => {
    const categoriasDoItem = item.dataset.category.split(' ');
    if (categoria === 'todas' || categoriasDoItem.includes(categoria)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Evento de clique nos botões
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    aplicarFiltro(filter);
  });
});

// Captura se o usuário veio da home escolhendo uma opção pelo link (ex: ?modo=cronologica)
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const modo = urlParams.get('modo');
  if (modo) {
    aplicarFiltro(modo);
  }
});
// BUSCA E FILTRO DE PERSONAGENS
const charSearchInput = document.getElementById('characterSearch');
const charFilterBtns = document.querySelectorAll('.char-filter-btn');
const characterCards = document.querySelectorAll('.character-card');

function filtrarPersonagens() {
  const query = charSearchInput ? charSearchInput.value.toLowerCase().trim() : '';
  const activeBtn = document.querySelector('.char-filter-btn.active');
  const selectedType = activeBtn ? activeBtn.dataset.charFilter : 'todos';

  characterCards.forEach(card => {
    const cardName = card.dataset.name ? card.dataset.name.toLowerCase() : '';
    const cardType = card.dataset.type;

    const bateuComBusca = cardName.includes(query);
    const bateuComTipo = selectedType === 'todos' || cardType === selectedType;

    if (bateuComBusca && bateuComTipo) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

if (charSearchInput) {
  charSearchInput.addEventListener('input', filtrarPersonagens);
}

charFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    charFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtrarPersonagens();
  });
});
