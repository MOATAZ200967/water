
const questions = [
  {
    text: "ما هو مصدر المياه الرئيسي في منزلك؟",
    options: [
      { icon: "🏭", text: "شبكة مياه الحكومة (محطة معالجة)" },
      { icon: "🌊", text: "ترعة أو نهر" },
      { icon: "🕳️", text: "بئر أرضية" },
      { icon: "🚛", text: "صهريج (عربية مياه)" }
    ]
  },
  {
    text: "هل تلاحظ أي من هذه المشاكل في المياه عندك؟",
    options: [
      { icon: "🟡", text: "لون مصفر أو عكارة" },
      { icon: "👃", text: "رائحة كريهة أو كلور زائد" },
      { icon: "🦷", text: "طعم غريب أو مالح" },
      { icon: "✅", text: "المياه تبدو طبيعية" }
    ]
  },
  {
    text: "ما هو الاستخدام الأساسي اللي عايز تفلتر المياه من أجله؟",
    options: [
      { icon: "🥤", text: "الشرب والطبخ فقط" },
      { icon: "🚿", text: "الاستحمام والاستخدام اليومي" },
      { icon: "🏠", text: "كل استخدامات المنزل" },
      { icon: "🌱", text: "ري النباتات والزراعة" }
    ]
  },
  {
    text: "ما هي ميزانيتك التقريبية للفلتر؟",
    options: [
      { icon: "💰", text: "اقتصادي (أقل من ٥٠٠ جنيه)" },
      { icon: "💵", text: "متوسط (٥٠٠ - ٢٠٠٠ جنيه)" },
      { icon: "💎", text: "عالي (أكثر من ٢٠٠٠ جنيه)" },
      { icon: "🤔", text: "مش عارف بعد" }
    ]
  }
];

let current = 0;
let answers = [];
let selected = null;

function renderQuestion() {
  const q = questions[current];
  document.getElementById('questionNum').textContent = `السؤال ${current + 1}`;
  document.getElementById('questionText').textContent = q.text;

  const pct = (current / questions.length) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `السؤال ${current + 1} من ${questions.length}`;
  document.getElementById('progressPct').textContent = Math.round(pct) + '%';

  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  selected = null;
  document.getElementById('btnNext').classList.remove('visible');

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = `<span class="option-icon">${opt.icon}</span><span>${opt.text}</span>`;
    btn.onclick = () => selectOption(i, btn);
    container.appendChild(btn);
  });

  const card = document.getElementById('quizCard');
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = 'slideUp 0.5s ease';
}

function selectOption(index, btn) {
  document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  btn.classList.add('selected');
  selected = index;
  document.getElementById('btnNext').classList.add('visible');
}

function nextQuestion() {
  if (selected === null) return;
  answers.push(selected);

  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showLoading();
  }
}

function showLoading() {
  document.getElementById('quizCard').style.display = 'none';
  document.getElementById('progressWrap').style.display = 'none';
  document.getElementById('loadingScreen').classList.add('active');

  const steps = ['step1', 'step2', 'step3', 'step4'];
  steps.forEach((id, i) => {
    setTimeout(() => {
      document.getElementById(id).classList.add('done');
    }, 700 * (i + 1));
  });

  setTimeout(showResult, 3800);
}

function getResult() {
  const src    = answers[0]; 
  const prob   = answers[1]; 
  const use    = answers[2]; 
  const budget = answers[3]; 

  if (src === 2 || src === 1) { 
    return {
      icon: "⚠️",
      title: "مياهك تحتاج معالجة قوية!",
      subtitle: "مصدر المياه عندك يحتوي على ملوثات متعددة",
      urgency: "high",
      urgencyText: "⚠️ الأولوية عالية — يُنصح بالتصرف فوراً",
      filterName: "فلتر RO (التناضح العكسي)",
      filterDesc: "النظام الأمثل لمياه الآبار والترع. يزيل 99% من الملوثات والبكتيريا والمعادن الثقيلة ويمنحك مياه نقية تماماً.",
      tags: ["إزالة البكتيريا", "إزالة الأملاح", "إزالة المعادن الثقيلة", "مناسب للشرب"],
      meters: [
        { label: "نقاء المياه بعد الفلترة", val: 92, type: "high" },
        { label: "خطورة المياه الحالية",    val: 80, type: "low"  },
        { label: "كفاءة الفلتر الموصى به", val: 95, type: "high" }
      ],
      steps: [
        "🔬 اعمل تحليل للمياه في معمل متخصص أولاً",
        "💧 ثبّت فلتر RO متعدد المراحل (٥-٧ مراحل)",
        "🔄 غيّر الفلاتر كل ٦ أشهر",
        "📋 احتفظ بسجل صيانة دوري"
      ]
    };
  }

  if (prob === 0 || prob === 2) { 
    return {
      icon: "🔍",
      title: "مياهك تحتاج تنقية متخصصة",
      subtitle: "المشكلة محددة ويمكن حلها بفلتر مناسب",
      urgency: "mid",
      urgencyText: "🟡 أولوية متوسطة — يُنصح بالمعالجة قريباً",
      filterName: "فلتر الكربون النشط + UF",
      filterDesc: "مزيج مثالي لإزالة العكارة والألوان والطعم الغريب. الكربون النشط يمتص الكلور والمواد العضوية، وفلتر UF يزيل الجسيمات الدقيقة.",
      tags: ["إزالة العكارة", "تحسين الطعم", "إزالة الكلور", "سعر معقول"],
      meters: [
        { label: "تحسن الطعم والرائحة",     val: 88, type: "high" },
        { label: "إزالة الملوثات المرئية",  val: 75, type: "high" },
        { label: "خطورة المياه الحالية",    val: 45, type: "mid"  }
      ],
      steps: [
        "🏷️ اختر فلتر كربون نشط ٥ مراحل",
        "🔧 ثبّته على حنفية المطبخ أو تحت الحوض",
        "🔄 غيّر فلتر الكربون كل ٣-٤ أشهر",
        "✅ افحص لون ورائحة المياه بانتظام"
      ]
    };
  }

  if (prob === 1) { 
    return {
      icon: "✨",
      title: "مياهك آمنة لكن محتاجة تحسين",
      subtitle: "المشكلة في الكلور الزائد وهي سهلة الحل",
      urgency: "low",
      urgencyText: "✅ أولوية منخفضة — المياه آمنة بشكل عام",
      filterName: "فلتر الكربون النشط",
      filterDesc: "الحل الاقتصادي المثالي لإزالة الكلور وتحسين الطعم والرائحة. بسيط التركيب وفعّال جداً لمياه شبكة الحكومة.",
      tags: ["إزالة الكلور", "تحسين الطعم", "اقتصادي", "سهل التركيب"],
      meters: [
        { label: "جودة المياه الحالية",  val: 68, type: "mid"  },
        { label: "تحسن بعد الفلتر",      val: 90, type: "high" },
        { label: "خطورة المياه الحالية", val: 20, type: "high" }
      ],
      steps: [
        "🛒 اشتري فلتر كربون نشط حنفية (بيبدأ من ١٥٠ جنيه)",
        "🔧 ركّبه مباشرة على الحنفية",
        "🔄 غيّر الكارتريدج كل شهرين",
        "😊 استمتع بمياه بدون رائحة كلور"
      ]
    };
  }

  
  return {
    icon: "💚",
    title: "مياهك في حالة جيدة!",
    subtitle: "لكن الفلترة الاحترازية دائماً فكرة ممتازة",
    urgency: "low",
    urgencyText: "✅ أولوية منخفضة — للوقاية والتحسين فقط",
    filterName: "فلتر UF (الترشيح الفائق)",
    filterDesc: "مثالي للمياه التي تبدو نظيفة ولكن قد تحتوي على جراثيم أو ملوثات غير مرئية. يحافظ على المعادن المفيدة ويزيل البكتيريا.",
    tags: ["وقاية احترازية", "يحافظ على المعادن", "بدون كهرباء", "صديق للبيئة"],
    meters: [
      { label: "جودة المياه الحالية",  val: 78, type: "high" },
      { label: "تحسن بعد الفلتر",      val: 92, type: "high" },
      { label: "خطورة المياه الحالية", val: 15, type: "high" }
    ],
    steps: [
      "🎯 ركز على الفلترة الاحترازية",
      "💧 فلتر UF أو كربون نشط كافي تماماً",
      "🔄 صيانة دورية كل ٦ أشهر",
      "📊 اعمل تحليل للمياه مرة في السنة"
    ]
  };
}

function showResult() {
  document.getElementById('loadingScreen').classList.remove('active');
  const r  = getResult();
  const rs = document.getElementById('resultScreen');
  rs.classList.add('active');

  document.getElementById('resultIcon').textContent    = r.icon;
  document.getElementById('resultTitle').textContent   = r.title;
  document.getElementById('resultSubtitle').textContent = r.subtitle;

  const badge = document.getElementById('urgencyBadge');
  badge.textContent = r.urgencyText;
  badge.className   = `urgency ${r.urgency}`;

  document.getElementById('filterName').textContent = r.filterName;
  document.getElementById('filterDesc').textContent = r.filterDesc;

  const tags = document.getElementById('filterTags');
  tags.innerHTML = r.tags.map(t => `<span class="tag">${t}</span>`).join('');

  const meters = document.getElementById('metersContainer');
  meters.innerHTML = r.meters.map(m => `
    <div class="quality-meter">
      <div class="meter-label">
        <span>${m.label}</span>
        <span class="pct-label">0%</span>
      </div>
      <div class="meter-bar">
        <div class="meter-fill ${m.type}" data-val="${m.val}" style="width:0%"></div>
      </div>
    </div>
  `).join('');

  
  setTimeout(() => {
    document.querySelectorAll('.meter-fill').forEach(el => {
      const target = parseInt(el.dataset.val);
      el.style.width = target + '%';

      const pctEl = el.closest('.quality-meter').querySelector('.pct-label');
      let count = 0;
      const interval = 1500 / target;
      const counter = setInterval(() => {
        count++;
        pctEl.textContent = count + '%';
        if (count >= target) clearInterval(counter);
      }, interval);
    });
  }, 300);

  const steps = document.getElementById('stepsContainer');
  steps.innerHTML = r.steps.map(s => `<div>${s}</div>`).join('');

  document.getElementById('progressWrap').style.display = 'none';
}

function restart() {
  current  = 0;
  answers  = [];
  selected = null;
  document.getElementById('resultScreen').classList.remove('active');
  document.getElementById('quizCard').style.display    = 'block';
  document.getElementById('progressWrap').style.display = 'block';
  renderQuestion();
}

renderQuestion();
