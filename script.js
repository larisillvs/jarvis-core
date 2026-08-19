// 1. ROLAGEM SUAVE DOS LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 2. FILTROS DA CRONOLOGIA
const filterButtons = document.querySelectorAll('.filter-btn:not(.char-filter-btn)');
const timelineItems = document.querySelectorAll('.timeline-item');

function aplicarFiltro(categoria) {
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === categoria);
  });

  timelineItems.forEach(item => {
    const categoriasDoItem = item.dataset.category ? item.dataset.category.split(' ') : [];
    if (categoria === 'todas' || categoriasDoItem.includes(categoria)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    aplicarFiltro(button.dataset.filter);
  });
});

// Captura filtros vindos da URL (Ex: cronologia.html?modo=cronologica)
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const modo = urlParams.get('modo');
  if (modo) {
    aplicarFiltro(modo);
  }
});

// 3. BUSCA E FILTROS DA PERSONAGENS
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

    card.style.display = (bateuComBusca && bateuComTipo) ? 'block' : 'none';
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

console.log("Efeito Multiverso inicializado com sucesso!");
