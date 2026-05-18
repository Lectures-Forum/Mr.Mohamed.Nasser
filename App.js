// ==========================================
// 1. محرك معالجة وترجمة الأسماء تلقائياً
// ==========================================
const commonNames = {
    'مصطفى': 'Mostafa', 'محمود': 'Mahmoud', 'محمد': 'Mohamed', 'احمد': 'Ahmed', 'أحمد': 'Ahmed',
    'مصطفى': 'Mostafa', 'علي': 'Ali', 'عمر': 'Omar', 'حسين': 'Hussein', 'حسن': 'Hassan',
    'يوسف': 'Youssef', 'ابراهيم': 'Ibrahim', 'خالد': 'Khaled', 'فاطمة': 'Fatma', 'مريم': 'Maryam',
    'mostafa': 'مصطفى', 'mahmoud': 'محمود', 'mohamed': 'محمد', 'ahmed': 'أحمد',
    'ali': 'علي', 'omar': 'عمر', 'hussein': 'حسين', 'hassan': 'حسن',
    'youssef': 'يوسف', 'ibrahim': 'إبراهيم', 'khaled': 'خالد', 'fatma': 'فاطمة', 'maryam': 'مريم'
};

const arToEnMap = { 'ا':'A', 'أ':'A', 'إ':'E', 'آ':'A', 'ب':'B', 'ت':'T', 'ث':'Th', 'ج':'J', 'ح':'H', 'خ':'Kh', 'د':'D', 'ذ':'Z', 'ر':'R', 'ز':'Z', 'س':'S', 'ش':'Sh', 'ص':'S', 'ض':'D', 'ط':'T', 'ظ':'Z', 'ع':'A', 'غ':'Gh', 'ف':'F', 'ق':'K', 'ك':'K', 'ل':'L', 'م':'M', 'ن':'N', 'ه':'H', 'و':'W', 'ي':'Y', 'ى':'A', 'ة':'A' };
const enToArMap = { 'a':'ا', 'b':'ب', 'c':'ك', 'd':'د', 'e':'ي', 'f':'ف', 'g':'ج', 'h':'ه', 'i':'ي', 'j':'ج', 'k':'ك', 'l':'ل', 'm':'م', 'n':'ن', 'o':'و', 'p':'ب', 'q':'ك', 'r':'ر', 's':'س', 't':'ت', 'u':'و', 'v':'ف', 'w':'و', 'x':'كس', 'y':'ي', 'z':'ز' };

function processName(inputName) {
    let name = inputName.trim();
    const isArabic = /[\u0600-\u06FF]/.test(name);
    
    let nameAr = '';
    let nameEn = '';

    if (isArabic) {
        nameAr = name;
        if (commonNames[name]) {
            nameEn = commonNames[name];
        } else {
            for (let i = 0; i < name.length; i++) {
                nameEn += arToEnMap[name[i]] || name[i];
            }
        }
    } else {
        nameEn = name;
        let lowerName = name.toLowerCase();
        if (commonNames[lowerName]) {
            nameAr = commonNames[lowerName];
        } else {
            for (let i = 0; i < lowerName.length; i++) {
                nameAr += enToArMap[lowerName[i]] || lowerName[i];
            }
        }
    }
    nameEn = nameEn.charAt(0).toUpperCase() + nameEn.slice(1);
    return { ar: nameAr, en: nameEn };
}

// ==========================================
// 2. مصفوفة الـ 100 رسالة المطولة والفاخرة جداً
// ==========================================
const messagesArray = [
    "Dear {nameEn}, it has been an absolute pleasure observing your tremendous progress this semester. Your dedication to mastering the English language is truly commendable, and your continuous efforts do not go unnoticed. Keep aiming for the stars! | عزيزي {nameAr}، لقد كان من دواعي سروري المطلق متابعة تقدمك الهائل هذا الفصل الدراسي. إن تفانيك في إتقان اللغة الإنجليزية يستحق الثناء حقًا، وجهودك المستمرة لا تمر دون أن يلاحظها أحد. استمر في السعي نحو النجوم!",
    "To the brilliant {nameEn}, your participation in class always adds a wonderful dynamic to our lessons. You have shown a deep understanding of complex grammar rules and a remarkable ability to express your thoughts clearly. I am exceedingly proud of your journey! | إلى المتألق {nameAr}، مشاركتك في الفصل تضفي دائمًا ديناميكية رائعة على دروسنا. لقد أظهرت فهمًا عميقًا للقواعد المعقدة وقدرة ملحوظة على التعبير عن أفكارك بوضوح. أنا فخور جدًا برحلتك العلمية!",
    "Fantastic effort, {nameEn}! Watching your confidence grow when speaking English has been one of the highlights of my teaching experience. You no longer hesitate, and your fluency is improving at a stunning rate. Keep up this magnificent work! | مجهود رائع يا {nameAr}! إن مشاهدة ثقتك بنفسك تنمو عند التحدث باللغة الإنجليزية كانت واحدة من أجمل لحظاتي في التدريس. لم تعد تتردد، وطلاقتك تتحسن بمعدل مذهل. واصل هذا العمل الرائع!",
    "My outstanding student {nameEn}, your written essays show a level of creativity and structural accuracy that is truly rare. The way you choose your vocabulary paints beautiful pictures in the reader's mind. Never stop writing and exploring your potential! | طالبي المتميز {nameAr}، تُظهر مقالاتك المكتوبة مستوى من الإبداع والدقة الهيكلية النادرة حقًا. الطريقة التي تختار بها مفرداتك ترسم صورًا جميلة في ذهن القارئ. لا تتوقف أبدًا عن الكتابة واستكشاف إمكاناتك!",
    "Thank you, {nameEn}, for the positive energy and endless curiosity you bring to the classroom every single day. Your questions challenge us to think deeper, and your eagerness to learn inspires everyone around you. You have a very bright future! | شكرًا لك يا {nameAr} على الطاقة الإيجابية والفضول الذي لا ينتهي والذي تجلبه إلى الفصل كل يوم. أسئلتك تدفعنا للتفكير بعمق أكبر، وحرصك على التعلم يلهم كل من حولك. مستقبلك مشرق للغاية!",
    "Exceptional work, {nameEn}! Your ability to absorb new vocabulary and immediately use it in meaningful conversations is extraordinary. It shows a highly intelligent and active mind. I have no doubt you will achieve greatness in everything you do. | عمل استثنائي يا {nameAr}! قدرتك على استيعاب المفردات الجديدة واستخدمها فورًا في محادثات هادفة هي قدرة غير عادية. هذا يدل على عقل ذكي ونشط للغاية. ليس لدي أدنى شك في أنك ستحقق العظمة في كل ما تفعله.",
    "{nameEn}, you are a shining example of what hard work and resilience look like. When you face a difficult linguistic challenge, you approach it with patience and a smile until you conquer it. That is the mindset of a true champion! | يا {nameAr}، أنت مثال ساطع لما يبدو عليه العمل الجاد والمرونة. عندما تواجه تحديًا لغويًا صعبًا، فإنك تقترب منه بصبر وابتسامة حتى تتغلب عليه. هذه هي عقلية البطل الحقيقي!",
    "Your progress is a masterpiece in the making, {nameEn}. Step by step, word by word, you have built a solid foundation in the English language. I am deeply impressed by your commitment to excellence and your polite demeanor. | تطورك هو تحفة فنية قيد الإنجاز يا {nameAr}. خطوة بخطوة، وكلمة بكلمة، قمت ببناء أساس متين في اللغة الإنجليزية. أنا معجب بشدة بالتزامك بالتفوق وأخلاقك المهذبة.",
    "Superb reading comprehension skills, {nameEn}! You don't just read the words; you understand the hidden meanings and the emotions behind the text. This analytical skill will serve you well not just in English, but in all your life's endeavors. | مهارات استيعاب قرائي ممتازة يا {nameAr}! أنت لا تقرأ الكلمات فحسب؛ بل تفهم المعاني الخفية والعواطف وراء النص. هذه المهارة التحليلية ستخدمك جيدًا ليس فقط في اللغة الإنجليزية، ولكن في جميع مساعي حياتك.",
    "A massive thank you to you, {nameEn}, for always being prepared, punctual, and highly attentive. Your respect for the educational process and your fellow classmates makes you a beloved leader in our classroom. Keep leading by example! | شكر جزيل لك يا {nameAr} لكونك دائمًا مستعدًا ومنضبطًا ومنتبهًا للغاية. احترامك للعملية التعليمية ولزملائك يجعلك قائدًا محبوبًا في فصلنا. استمر في القيادة بالقدوة!"
];

// توليد باقي الـ 100 رسالة بطريقة احترافية ومطولة
const praiseEnglish = [
    "Your pronunciation is becoming remarkably native-like, which is impressive.", "I am continually amazed by your flawless grammar structure in every task.", "Your unmatched enthusiasm makes teaching this language an absolute joy.",
    "You tackle complex reading passages and vocabulary with remarkable ease.", "Your conversational skills have reached a fantastic and advanced new level.", "You possess a unique, innate talent for mastering new languages efficiently."
];
const praiseArabic = [
    "نطقك أصبح يشبه إلى حد كبير نطق المتحدثين الأصليين وهو أمر مبهر.", "أنا مندهش باستمرار من هيكل قواعدك النحوية الخالية من الأخطاء.", "حماسك الذي لا ميل له يجعل التدريس متعة مطلقة لا توصف.",
    "أنت تتعامل مع نصوص القراءة المعقدة والمفردات بسهولة ملحوظة.", "مهاراتك في المحادثة وصلت إلى مستوى جديد ومتقدم ورائع.", "أنت تمتلك موهبة فريدة وفطرية في إتقان اللغات الجديدة بكفاءة."
];
const futureEnglish = [
    "I am absolutely certain that your future academic career is filled with immense success.", "Keep pushing your boundaries; there is absolutely no limit to what you can achieve.", "Language is a powerful tool, and you are currently wielding it like a true master.",
    "Never lose this incredible, burning passion for learning and growing.", "I clearly foresee you doing incredible things on the global stage very soon.", "Your beautiful persistence is your greatest asset; guard it well throughout your life."
];
const futureArabic = [
    "أنا على يقين تام بأن مسيرتك الأكاديمية المستقبلية مليئة بالنجاحات العظيمة.", "استمر في تخطي حدودك؛ لا يوجد سقف على الإطلاق لما يمكنك تحقيقه.", "اللغة أداة قوية، وأنت تستخدمها حاليًا كخبير ومتقن حقيقي.",
    "لا تفقد أبدًا هذا الشغف المذهل والمشتعل بالتعلم والنمو المستمر.", "أتوقع بوضوح أن تقوم بأشياء مذهلة على المستوى العالمي في القريب العاجل.", "إصرارك الجميل هو أعظم ثروة تمتلكها؛ حافظ عليه جيدًا طوال حياتك."
];

while(messagesArray.length < 100) {
    let pE = praiseEnglish[Math.floor(Math.random() * praiseEnglish.length)];
    let pA = praiseArabic[Math.floor(Math.random() * praiseArabic.length)];
    let fE = futureEnglish[Math.floor(Math.random() * futureEnglish.length)];
    let fA = futureArabic[Math.floor(Math.random() * futureArabic.length)];
    
    let templateEn = `Dear {nameEn}, it is truly wonderful to witness your constant growth and academic elegance. ${pE} It takes a lot of courage, focus, and hard work to reach this high level of proficiency. ${fE}`;
    let templateAr = `عزيزي {nameAr}، إنه لمن الرائع حقًا أن نشهد نموك المستمر وأناقتك الأكاديمية. ${pA} يتطلب الأمر الكثير من الشجاعة والتركيز والعمل الجاد للوصول إلى هذا المستوى العالي من الكفاءة. ${fA}`;
    
    messagesArray.push(`${templateEn} | ${templateAr}`);
}

// ==========================================
// 3. وظائف التحكم وعرض الشاشات
// ==========================================
function openMessage() {
    let rawName = document.getElementById('studentName').value;
    
    if (rawName.trim() === "") {
        alert("يرجى إدخال اسمك أولاً / Please enter your name first.");
        return;
    }

    let names = processName(rawName);
    let nameAr = names.ar;
    let nameEn = names.en;

    let randomIndex = Math.floor(Math.random() * messagesArray.length);
    let fullMessage = messagesArray[randomIndex];

    let parts = fullMessage.split("|");
    let engText = parts[0].trim();
    let arText = parts[1].trim();

    let formattedNameEn = `<span class="highlight-name">${nameEn}</span>`;
    let formattedNameAr = `<span class="highlight-name-ar">${nameAr}</span>`;
    
    engText = engText.replace(/{nameEn}/g, formattedNameEn);
    arText = arText.replace(/{nameAr}/g, formattedNameAr);

    let finalHTML = `
        <span class="eng-part">"${engText}"</span>
        <span class="ar-part">"${arText}"</span>
    `;

    document.getElementById('login-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('message-screen').style.display = 'block';
        document.getElementById('message-screen').style.opacity = '0';
        
        // إعادة التمرير لأعلى الصفحة تلقائياً لكي يرى الطالب بداية الرسالة
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            document.getElementById('message-screen').style.opacity = '1';
            document.getElementById('message-screen').style.transition = 'opacity 0.8s ease';
        }, 50);
        
        document.getElementById('message-box').innerHTML = finalHTML;
    }, 400); 
    
    document.getElementById('login-screen').style.transition = 'opacity 0.4s ease';
}

function goBack() {
    document.getElementById('message-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('studentName').value = "";
        document.getElementById('message-screen').style.display = 'none';
        
        document.getElementById('login-screen').style.display = 'block';
        setTimeout(() => {
            document.getElementById('login-screen').style.opacity = '1';
        }, 50);
    }, 400);
}