'use strict';

/*
 * PokéShadow — Shadow Quiz
 * As perguntas ficam em um array JavaScript nesta versão estática.
 * Para produção com Postgres, veja o README: o navegador não deve acessar
 * diretamente um banco de dados nem guardar credenciais nele.
 */

const QUESTIONS = [
  {
    id: 25, name: 'Pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif',
    options: ['Pikachu', 'Pichu', 'Raichu', 'Emolga'], answer: 'Pikachu',
    explanation: 'Pikachu é um Pokémon do tipo Elétrico e é conhecido por armazenar eletricidade nas bochechas.',
    source: 'https://www.pokemon.com/br/pokedex/pikachu'
  },
  {
    id: 6, name: 'Charizard', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/6.gif',
    options: ['Dragonite', 'Charizard', 'Typhlosion', 'Salamence'], answer: 'Charizard',
    explanation: 'Charizard é do tipo Fogo e Voador. A chama na ponta da cauda é uma característica marcante.',
    source: 'https://www.pokemon.com/br/pokedex/charizard'
  },
  {
    id: 1, name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif',
    options: ['Chikorita', 'Oddish', 'Bulbasaur', 'Treecko'], answer: 'Bulbasaur',
    explanation: 'Bulbasaur é um Pokémon inicial da região de Kanto, dos tipos Planta e Veneno.',
    source: 'https://www.pokemon.com/br/pokedex/bulbasaur'
  },
  {
    id: 39, name: 'Jigglypuff', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/39.gif',
    options: ['Clefairy', 'Jigglypuff', 'Skitty', 'Igglybuff'], answer: 'Jigglypuff',
    explanation: 'Jigglypuff é conhecido por cantar uma canção que faz quem a escuta ficar com sono.',
    source: 'https://www.pokemon.com/br/pokedex/jigglypuff'
  },
  {
    id: 94, name: 'Gengar', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/94.gif',
    options: ['Haunter', 'Mimikyu', 'Sableye', 'Gengar'], answer: 'Gengar',
    explanation: 'Gengar é do tipo Fantasma e Veneno. Sua aparência lembra uma sombra sorridente.',
    source: 'https://www.pokemon.com/br/pokedex/gengar'
  },
  {
    id: 133, name: 'Eevee', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/133.gif',
    options: ['Eevee', 'Fennekin', 'Growlithe', 'Lillipup'], answer: 'Eevee',
    explanation: 'Eevee é famoso por ter várias evoluções possíveis, conhecidas como Eeveelutions.',
    source: 'https://www.pokemon.com/br/pokedex/eevee'
  },
  {
    id: 150, name: 'Mewtwo', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/150.gif',
    options: ['Mew', 'Alakazam', 'Mewtwo', 'Deoxys'], answer: 'Mewtwo',
    explanation: 'Mewtwo é um Pokémon lendário do tipo Psíquico, criado por meio de experiências genéticas na história da franquia.',
    source: 'https://www.pokemon.com/br/pokedex/mewtwo'
  },
  {
    id: 143, name: 'Snorlax', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/143.gif',
    options: ['Snorlax', 'Bewear', 'Slaking', 'Munchlax'], answer: 'Snorlax',
    explanation: 'Snorlax é conhecido por dormir e comer grandes quantidades de comida. Munchlax é uma de suas pré-evoluções.',
    source: 'https://www.pokemon.com/br/pokedex/snorlax'
  },
  {
    id: 448, name: 'Lucario', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/448.gif',
    options: ['Zoroark', 'Absol', 'Lucario', 'Gallade'], answer: 'Lucario',
    explanation: 'Lucario é dos tipos Lutador e Aço e é conhecido por perceber a aura dos seres vivos.',
    source: 'https://www.pokemon.com/br/pokedex/lucario'
  },
  {
    id: 384, name: 'Rayquaza', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/384.gif',
    options: ['Gyarados', 'Rayquaza', 'Dragonite', 'Giratina'], answer: 'Rayquaza',
    explanation: 'Rayquaza é um Pokémon lendário dos tipos Dragão e Voador, associado à camada de ozônio.',
    source: 'https://www.pokemon.com/br/pokedex/rayquaza'
  }
];

const RANKING_KEY = 'pokeShadowRanking';
const $ = (selector) => document.querySelector(selector);

const welcomeScreen = $('#welcome-screen');
const quizScreen = $('#quiz-screen');
const resultScreen = $('#result-screen');
const startForm = $('#start-form');
const nameInput = $('#player-name');
const questionTitle = $('#question-title');
const questionCount = $('#question-count');
const progressPercent = $('#progress-percent');
const progressBar = $('#progress-bar');
const progressFill = $('#progress-fill');
const scoreValue = $('#score-value');
const pokemonImage = $('#pokemon-image');
const panelIndex = $('#panel-index');
const optionsList = $('#options-list');
const feedbackBox = $('#feedback-box');
const confirmButton = $('#confirm-button');
const nextButton = $('#next-button');
const replayButton = $('#replay-button');
const rankingToggle = $('#ranking-toggle');
const rankingPanel = $('#ranking-panel');
const rankingList = $('#ranking-list');

let playerName = '';
let currentIndex = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;
let runId = 0;

function showScreen(screen) {
  [welcomeScreen, quizScreen, resultScreen].forEach((item) => { item.hidden = item !== screen; });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz() {
  playerName = nameInput.value.trim();
  if (!playerName) {
    nameInput.focus();
    return;
  }
  currentIndex = 0;
  score = 0;
  selectedAnswer = null;
  answered = false;
  runId += 1;
  scoreValue.textContent = '0';
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const question = QUESTIONS[currentIndex];
  selectedAnswer = null;
  answered = false;
  questionTitle.textContent = 'Quem é esse Pokémon?';
  questionCount.innerHTML = `PERGUNTA ${String(currentIndex + 1).padStart(2, '0')} <span class="muted">/ ${QUESTIONS.length}</span>`;
  progressPercent.textContent = `${Math.round(((currentIndex + 1) / QUESTIONS.length) * 100)}%`;
  progressFill.style.width = `${((currentIndex + 1) / QUESTIONS.length) * 100}%`;
  progressBar.setAttribute('aria-valuenow', String(currentIndex + 1));
  panelIndex.textContent = `#${String(question.id).padStart(3, '0')}`;
  pokemonImage.classList.remove('revealed');
  pokemonImage.alt = 'Silhueta do Pokémon misterioso';
  pokemonImage.src = question.image;
  pokemonImage.onerror = () => {
    pokemonImage.onerror = null;
    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${question.id}.png`;
  };
  optionsList.replaceChildren();
  feedbackBox.hidden = true;
  feedbackBox.className = 'feedback-box';
  confirmButton.hidden = false;
  confirmButton.disabled = true;
  nextButton.hidden = true;

  shuffle(question.options).forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-button';
    button.setAttribute('aria-pressed', 'false');
    button.dataset.answer = option;
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span>`;
    button.addEventListener('click', () => selectOption(button, option));
    optionsList.appendChild(button);
  });
}

function selectOption(button, answer) {
  if (answered) return;
  selectedAnswer = answer;
  optionsList.querySelectorAll('.option-button').forEach((optionButton) => {
    optionButton.setAttribute('aria-pressed', String(optionButton === button));
  });
  confirmButton.disabled = false;
}

function confirmAnswer() {
  if (!selectedAnswer || answered) return;
  answered = true;
  const question = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === question.answer;
  if (isCorrect) score += 1;
  scoreValue.textContent = String(score);

  // Mantém o feedback visual e sem depender apenas de cor.
  optionsList.querySelectorAll('.option-button').forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === question.answer) {
      button.classList.add('correct-option');
      button.querySelector('.option-letter').textContent = '✓';
    } else if (button.dataset.answer === selectedAnswer && !isCorrect) {
      button.classList.add('wrong-option');
      button.querySelector('.option-letter').textContent = '×';
    }
  });

  pokemonImage.classList.add('revealed');
  pokemonImage.alt = question.name;
  feedbackBox.hidden = false;
  feedbackBox.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
  const title = isCorrect ? '✦ Resposta correta!' : `Resposta correta: ${question.answer}`;
  feedbackBox.replaceChildren();
  const titleElement = document.createElement('div');
  titleElement.className = 'feedback-title';
  titleElement.textContent = title;
  const explanation = document.createElement('p');
  explanation.textContent = question.explanation;
  explanation.style.margin = '0 0 6px';
  const sourceLink = document.createElement('a');
  sourceLink.href = question.source;
  sourceLink.target = '_blank';
  sourceLink.rel = 'noopener noreferrer';
  sourceLink.textContent = 'Saiba mais sobre este Pokémon ↗';
  feedbackBox.append(titleElement, explanation, sourceLink);

  confirmButton.hidden = true;
  nextButton.hidden = false;
  nextButton.focus();
  nextButton.innerHTML = currentIndex === QUESTIONS.length - 1
    ? 'Ver resultado <span aria-hidden="true">→</span>'
    : 'Próxima pergunta <span aria-hidden="true">→</span>';
}

function nextQuestion() {
  if (!answered) return;
  currentIndex += 1;
  if (currentIndex < QUESTIONS.length) {
    renderQuestion();
    const firstOption = optionsList.querySelector('button');
    if (firstOption) firstOption.focus();
  } else {
    finishQuiz();
  }
}

function getRanking() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(RANKING_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveResult() {
  const ranking = getRanking();
  ranking.push({ name: playerName, score, total: QUESTIONS.length, timestamp: Date.now(), runId });
  ranking.sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);
  try {
    sessionStorage.setItem(RANKING_KEY, JSON.stringify(ranking.slice(0, 10)));
  } catch (error) {
    // O quiz continua funcionando mesmo se o navegador bloquear o armazenamento.
  }
}

function finishQuiz() {
  saveResult();
  $('#result-name').textContent = playerName;
  $('#final-score').textContent = String(score);
  $('#final-progress-fill').style.width = `${(score / QUESTIONS.length) * 100}%`;
  $('#score-summary').textContent = `Você acertou ${score} de ${QUESTIONS.length} perguntas.`;
  const message = score === 10
    ? 'Impressionante! Você é um mestre das silhuetas.'
    : score >= 7
      ? 'Ótimo resultado! Seu conhecimento Pokémon está afiado.'
      : score >= 4
        ? 'Boa jornada! Continue treinando para reconhecer mais Pokémon.'
        : 'Todo mestre começa em algum lugar. Tente mais uma vez e supere sua marca!';
  $('#result-message').textContent = message;
  rankingPanel.hidden = true;
  rankingToggle.setAttribute('aria-expanded', 'false');
  rankingToggle.innerHTML = 'Ver ranking <span aria-hidden="true">↓</span>';
  renderRanking();
  showScreen(resultScreen);
}

function renderRanking() {
  rankingList.replaceChildren();
  const ranking = getRanking();
  if (!ranking.length) {
    const item = document.createElement('li');
    item.textContent = 'Ainda não há resultados nesta sessão.';
    rankingList.appendChild(item);
    return;
  }
  ranking.forEach((entry) => {
    const item = document.createElement('li');
    item.append(document.createTextNode(entry.name));
    const points = document.createElement('span');
    points.className = 'rank-score';
    points.textContent = `${entry.score}/${entry.total}`;
    item.appendChild(points);
    rankingList.appendChild(item);
  });
}

startForm.addEventListener('submit', (event) => {
  event.preventDefault();
  startQuiz();
});
confirmButton.addEventListener('click', confirmAnswer);
nextButton.addEventListener('click', nextQuestion);
replayButton.addEventListener('click', () => {
  nameInput.value = playerName;
  startQuiz();
});
rankingToggle.addEventListener('click', () => {
  const willOpen = rankingPanel.hidden;
  rankingPanel.hidden = !willOpen;
  rankingToggle.setAttribute('aria-expanded', String(willOpen));
  rankingToggle.innerHTML = willOpen
    ? 'Ocultar ranking <span aria-hidden="true">↑</span>'
    : 'Ver ranking <span aria-hidden="true">↓</span>';
  if (willOpen) rankingPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
