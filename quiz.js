/*  quiz.js  –  Self-contained, runs only after DOM is ready  */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- QUESTIONS ---------- */
  const questions = [
    { text: "What's your favourite time of day?",
      options: [ {label:"Morning 🌅",   value:"fresh"},
                 {label:"Afternoon 🌞", value:"floral"},
                 {label:"Evening 🌙",   value:"spicy"} ] },

    { text: "Choose a vacation destination:",
      options: [ {label:"Paris 🌸", value:"floral"},
                 {label:"Kenya 🦓", value:"woody"},
                 {label:"Miami 🌴", value:"fresh"} ] },

    { text: "Pick a fabric:",
      options: [ {label:"Velvet",  value:"spicy"},
                 {label:"Linen",   value:"fresh"},
                 {label:"Leather", value:"woody"} ] },

    { text: "What's your style vibe?",
      options: [ {label:"Feminine & romantic", value:"floral"},
                 {label:"Sophisticated & chic",value:"woody"},
                 {label:"Bold & edgy",         value:"spicy"} ] },

    { text: "Favourite season?",
      options: [ {label:"Spring 🌸", value:"floral"},
                 {label:"Summer 🌞", value:"fresh"},
                 {label:"Autumn 🍂", value:"woody"} ] },

    { text: "Choose a drink:",
      options: [ {label:"Rosé",     value:"floral"},
                 {label:"Iced tea", value:"fresh"},
                 {label:"Espresso", value:"spicy"} ] }
  ];

  /* ---------- RESULT DATA ---------- */
  const results = {
    floral: { name:"Delina – Parfums de Marly",
              img:"./img/delina.jpg",
              desc:"A luxurious bouquet of Turkish rose, lychee & rhubarb 🩷",
              link:"product-delina.html" },

    fresh : { name:"Chance Eau Fraîche – Chanel",
              img:"./img/chance-fresh.jpg",
              desc:"Crisp lemon, water hyacinth & teak wood for an airy glow 🍋",
              link:"product-chance.html" },

    spicy : { name:"Libre Intense – YSL",
              img:"./img/libre-intense.jpg",
              desc:"Orange blossom & warm vanilla wrapped in fiery spices 🔥",
              link:"product-libre.html" },

    woody : { name:"Santal 33 – Le Labo",
              img:"./img/santal-33.jpg",
              desc:"Iconic sandalwood & cedar with a smoky leather aura 🌲",
              link:"product-santal.html" }
  };

  /* ---------- STATE + ELEMENTS ---------- */
  let current = 0;
  const answers = new Array(questions.length);

  const qTitle   = document.getElementById('questionTitle');
  const optBox   = document.getElementById('optionContainer');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const progBar  = document.getElementById('progressBar');

  const resultCard = document.getElementById('resultCard');
  const resultImg  = document.getElementById('resultImg');
  const resultName = document.getElementById('resultName');
  const resultDesc = document.getElementById('resultDesc');
  const shopLink   = document.getElementById('shopLink');

  /* ---------- RENDER ONE QUESTION ---------- */
  function renderQuestion () {
    const q = questions[current];

    qTitle.textContent = `${current + 1}. ${q.text}`;
    optBox.innerHTML = '';                                   // clear old buttons

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-dark btn-option';
      btn.textContent = opt.label;
      if (answers[current] === opt.value) btn.classList.add('active');

      btn.onclick = () => {
        answers[current] = opt.value;
        [...optBox.children].forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        nextBtn.disabled = false;
      };

      optBox.appendChild(btn);
    });

    prevBtn.disabled  = current === 0;
    nextBtn.textContent = current === questions.length - 1 ? 'See Result' : 'Next';
    nextBtn.disabled  = !answers[current];

    progBar.style.width = `${(current / questions.length) * 100}%`;
  }

  /* ---------- SHOW FINAL RESULT ---------- */
  function showResult () {
    const tally = {floral:0, fresh:0, spicy:0, woody:0};
    answers.forEach(a => tally[a]++);
    const top = Object.keys(tally).reduce((a,b) => tally[a] > tally[b] ? a : b);

    const r = results[top];
    resultImg.src         = r.img;
    resultName.textContent = r.name;
    resultDesc.textContent = r.desc;
    shopLink.href         = r.link;

    progBar.style.width = '100%';

    document.querySelectorAll('#questionTitle, #optionContainer, #prevBtn, #nextBtn')
            .forEach(el => el.style.display = 'none');
    resultCard.style.display = 'block';
  }

  /* ---------- NAV BUTTONS ---------- */
  prevBtn.onclick = () => {
    if (current === 0) return;
    current--;
    renderQuestion();
  };

  nextBtn.onclick = () => {
    if (!answers[current]) return;

    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    } else {
      showResult();
    }
  };

  /* ---------- INITIAL CALL ---------- */
  renderQuestion();
});
