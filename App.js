// ==========================================
// 1. محرك معالجة وترجمة الأسماء تلقائياً
// ==========================================
const commonNames = {
    'مصطفى': 'Mostafa', 'محمود': 'Mahmoud', 'محمد': 'Mohamed', 'احمد': 'Ahmed', 'أحمد': 'Ahmed',
    'علي': 'Ali', 'عمر': 'Omar', 'حسين': 'Hussein', 'حسن': 'Hassan', 'يوسف': 'Youssef', 
    'ابراهيم': 'Ibrahim', 'خالد': 'Khaled', 'فاطمة': 'Fatma', 'مريم': 'Maryam',
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
// 2. مصفوفة الرسائل والمولد الذكي لمنع التكرار
// ==========================================
const messagesArray = [
    "Dear {nameEn}, your hard work this term is truly remarkable. Keep aiming high! | عزيزي {nameAr}، عملك الجاد هذا الفصل استثنائي حقاً. استمر في السعي نحو القمة!",
    "To the brilliant {nameEn}, your class participation is wonderful. I am exceedingly proud of you! | إلى المتألق {nameAr}، مشاركتك في الفصل رائعة. أنا فخور بك جداً!",
    "Fantastic effort, {nameEn}! Your fluency in English is improving rapidly. Keep it up! | مجهود رائع يا {nameAr}! طلاقتك في الإنجليزية تتحسن بسرعة. واصل الإبداع!",
    "My outstanding student {nameEn}, your writing skills are highly creative. Never stop writing! | طالبي المتميز {nameAr}، مهاراتك الكتابية مبدعة جداً. لا تتوقف عن الكتابة أبداً!",
    "Thank you, {nameEn}, for the positive energy you bring to the classroom. You have a bright future! | شكراً يا {nameAr} للطاقة الإيجابية التي تجلبها للفصل. مستقبلك مشرق!",
    "Exceptional work, {nameEn}! Your ability to use new vocabulary is extraordinary. | عمل استثنائي يا {nameAr}! قدرتك على استخدام المفردات الجديدة مبهرة."
];

// مضاعفة الجمل لتكوين 120 رسالة فريدة تماماً
const praiseEnglish = [
    "Your pronunciation is becoming remarkably native-like.", 
    "I am continually amazed by your flawless grammar.", 
    "Your unmatched enthusiasm makes teaching an absolute joy.",
    "You tackle complex reading passages with ease.", 
    "Your conversational skills have reached a fantastic new level.",
    "Your dedication to daily practice is paying off beautifully.",
    "You always complete your tasks with utmost precision.",
    "Your ability to think critically in English is outstanding.",
    "Your ability to seamlessly grasp complex grammar concepts is impressive.",
    "Your vocabulary expands daily, showcasing your commitment.",
    "You bring a unique and creative perspective to every assignment.",
    "Your listening skills have sharpened significantly, allowing for great discussions."
];
const praiseArabic = [
    "نطقك أصبح يشبه المتحدثين الأصليين وهو أمر مبهر.", 
    "أنا مندهش باستمرار من دقة قواعدك النحوية.", 
    "حماسك الذي لا مثيل له يجعل التدريس متعة مطلقة.",
    "أنت تتعامل مع نصوص القراءة المعقدة بسهولة فائقة.", 
    "مهاراتك في المحادثة وصلت إلى مستوى متقدم ورائع.",
    "التزامك بالتدريب اليومي يؤتي ثماره بشكل جميل.",
    "أنت تنجز مهامك دائماً بأقصى درجات الدقة.",
    "قدرتك على التفكير النقدي باللغة الإنجليزية متميزة.",
    "قدرتك على استيعاب مفاهيم القواعد المعقدة بسلاسة هي أمر مثير للإعجاب.",
    "مفرداتك تتوسع يومياً، مما يدل على التزامك الكبير.",
    "أنت تجلب منظوراً فريداً ومبدعاً لكل واجب في اللغة الإنجليزية.",
    "مهارات الاستماع لديك تطورت بشكل كبير، مما يسمح بنقاشات رائعة."
];
const futureEnglish = [
    "I am absolutely certain that your future is filled with immense success.", 
    "Keep pushing your boundaries; there is no limit to what you can achieve.", 
    "Language is a powerful tool, and you are wielding it like a master.",
    "Never lose this incredible burning passion for learning.", 
    "I clearly foresee you doing incredible things very soon.",
    "Your beautiful persistence is your greatest asset; guard it well.",
    "I am confident that your linguistic skills will open countless doors for you.",
    "Keep striving for excellence; your potential is truly limitless.",
    "The world is yours to conquer with such strong communication skills.",
    "I look forward to hearing about your future academic triumphs."
];
const futureArabic = [
    "أنا على يقين تام بأن مستقبلك مليء بالنجاحات العظيمة.", 
    "استمر في تخطي حدودك؛ لا يوجد سقف لما يمكنك تحقيقه.", 
    "اللغة أداة قوية، وأنت تستخدمها كخبير ومتقن حقيقي.",
    "لا تفقد أبدًا هذا الشغف المذهل بالتعلم والنمو.", 
    "أتوقع بوضوح أن تقوم بأشياء مذهلة في القريب العاجل.",
    "إصرارك الجميل هو أعظم ثروة تمتلكها؛ حافظ عليه جيدًا.",
    "أنا واثق من أن مهاراتك اللغوية ستفتح لك أبواباً لا حصر لها.",
    "استمر في السعي نحو التميز؛ إمكانياتك لا حدود لها حقاً.",
    "العالم بانتظارك لتتألق بفضل مهارات التواصل القوية التي تمتلكها.",
    "أتطلع لسماع أخبار انتصاراتك الأكاديمية والمهنية في المستقبل."
];

// دمج الجمل لتكوين التركيبات
for(let i=0; i < praiseEnglish.length; i++) {
    for(let j=0; j < futureEnglish.length; j++) {
        let templateEn = `Dear {nameEn}, it is truly wonderful to witness your constant growth. ${praiseEnglish[i]} It takes a lot of focus to reach this level. ${futureEnglish[j]}`;
        let templateAr = `عزيزي {nameAr}، إنه لمن الرائع أن نشهد نموك المستمر. ${praiseArabic[i]} يتطلب الأمر الكثير من التركيز للوصول لهذا المستوى. ${futureArabic[j]}`;
        messagesArray.push(`${templateEn} | ${templateAr}`);
    }
}

// ==========================================
// 3. التحكم وعرض الشاشات (مع خوارزمية منع التكرار)
// ==========================================
let lastShownIndex = -1; 

function openMessage() {
    let rawName = document.getElementById('studentName').value;
    
    if (rawName.trim() === "") {
        alert("يرجى إدخال اسمك أولاً / Please enter your name first.");
        return;
    }

    let names = processName(rawName);
    let nameAr = names.ar;
    let nameEn = names.en;

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * messagesArray.length);
    } while (randomIndex === lastShownIndex);
    
    lastShownIndex = randomIndex; 

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
        
        // التمرير لأعلى حتى يرى المستخدم بداية الرسالة
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