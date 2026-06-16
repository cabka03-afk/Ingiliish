import { useState, useEffect } from "react";

// ── PALETTE ──────────────────────────────────────────────
const C = {
  bg: "#07090F",
  surface: "#0D1220",
  card: "#121A2B",
  cardHover: "#172033",
  border: "#1C2A3F",
  gold: "#F5A623",
  blue: "#3B82F6",
  green: "#10B981",
  purple: "#8B5CF6",
  red: "#EF4444",
  cyan: "#06B6D4",
  text: "#EDF2FF",
  muted: "#8A9BB5",
  dim: "#3D5070",
};

// ── QUESTIONS (SOMALI) ────────────────────────────────────
const QUESTIONS = [
  {
    id: "q1", section: "Ku Saabsan Adiga",
    text: "Immisa jir ayaad leedahay?",
    hint: "Tani waxay naga caawisaa inaan fahanno cidda ugu baahan Ingiriisiga",
    type: "single",
    options: ["18 ka yar", "18 – 24", "25 – 34", "35 – 44", "45+"],
  },
  {
    id: "q2", section: "Ku Saabsan Adiga",
    text: "Maxaa si fiican kuugu tilmaama hadda?",
    hint: "Dooro kii ugu haboon",
    type: "single",
    options: [
      "Arday (dugsiga sare / jaamacadda)",
      "Milkiile ganacsiga / xirfadlaha",
      "Raadinta shaqo",
      "Shaqaale (shirkad)",
      "Haweenay guryaha jooga",
      "Kale",
    ],
  },
  {
    id: "q3", section: "Ku Saabsan Adiga",
    text: "Xaggee ayaad ku nooshahay?",
    hint: "Waxay naga caawisaa inaan xoogga saarno gobolada saxda ah",
    type: "single",
    options: [
      "Muqdisho",
      "Hargeysa",
      "Kismaayo",
      "Boosaaso",
      "Baydhabo",
      "Soomaalida dibadda (meel kale)",
      "Magaalo kale oo Soomaaliya ah",
    ],
  },
  {
    id: "q4", section: "Ingiriisigaaga Maanta",
    text: "Sidee ayaad ku tilmaami lahayd heerkaaga Ingiriisiga hadda?",
    hint: "Aamin — jawaab khalad ma jirto",
    type: "single",
    options: [
      "Eber — waxba ma garanayso",
      "Bilow — erayo yar ayaan garanyaa",
      "Aasaasi — waxaan dhihi karaa jumlado fudud",
      "Dhex-dhexaad — waxaan samayn karaa xiriir",
      "Wanaagsan — waxaan rabaa oo keliya inaan horumariyaa",
    ],
  },
  {
    id: "q5", section: "Ingiriisigaaga Maanta",
    text: "Maxaad u rabto inaad barato ama horumariso Ingiriisiga? (Dooro dhammaan ku khuseeya)",
    hint: "Tani waa su'aasha ugu muhiimsan noogu ah",
    type: "multi",
    options: [
      "Helitaanka shaqo wanaagsan ama kor u qaadista",
      "Kobcinta ganacsigayga / xiriirka macaamiisha caalamiga ah",
      "Safarka ama u guurida dibadda",
      "Waxbarashada jaamacadda",
      "Isticmaalka baraha bulshada iyo internetka si wanaagsan",
      "Hadla shisheeyaha / shaqaalaha NGO ee Soomaaliya",
      "Kalsooni shakhsi iyo horumar nafs",
    ],
  },
  {
    id: "q6", section: "Ingiriisigaaga Maanta",
    text: "Waa maxay caqabadda UGUGWEYNI ee aad la kulanto marka aad baranayso Ingiriisiga?",
    hint: "Dooro dhibaatooyintaada ugu weyn",
    type: "single",
    options: [
      "Macallin wanaagsan kuma jiro agteeyda",
      "Koorasyada waa aad u qaali",
      "Waxaan bilaabaa laakiin dhiirigelinta waxay badbaaday toddobaad kadib",
      "Ma garanayso meesha aan ka bilaabo",
      "Waxaan xishooda inaan hadlo oo aan khalad sameeyo",
      "Waqti ku filan ma lihi",
      "Abayaanaha sida Duolingo kuma fahmi karaan dadka Soomaalida",
    ],
  },
  {
    id: "q7", section: "Sida Aad U Baranayso",
    text: "Ma tijaabisay mid ka mid ah kuwan hore si aad u barato Ingiriisiga?",
    hint: "Dooro dhammaan kuwa aad tijaabisay",
    type: "multi",
    options: [
      "Bare gaar ah ama dugsiga Ingiriisiga",
      "Duolingo ama abayaan la mid ah",
      "Fiidiyowyada YouTube",
      "BBC / VOA Learning English",
      "Naf-barasho buugaagta la adeegsado",
      "Weli waxba si dhab ah uma tijaabinin",
    ],
  },
  {
    id: "q8", section: "Sida Aad U Baranayso",
    text: "Intee jeer ayaad u heli kartaa inuu waxbarasho ku haboon Ingiriisiga maalintiiba?",
    hint: "Aamin — ma aha waxa aad rabtay inaad samayso",
    type: "single",
    options: [
      "15 daqiiqo ka yar",
      "15 – 30 daqiiqo",
      "30 – 60 daqiiqo",
      "1 – 2 saacadood",
      "2 saacadood ka badan",
    ],
  },
  {
    id: "q9", section: "Sida Aad U Baranayso",
    text: "Qaabka waxbarasho ee aad ugu jecelahay waa kee?",
    hint: "Sidee ayaad si fiican u barataa?",
    type: "single",
    options: [
      "Casharro gaagaaban oo telefoonka lagu samayn karo",
      "Casharro fiidiyow leh oo leh macallin",
      "Akhrinta iyo barasho qoraalka",
      "Ku celcelin hadlida qof",
      "Ciyaaraha iyo tartamada",
      "Isku dar wax walba",
    ],
  },
  {
    id: "q10", section: "Ku Saabsan Abka",
    text: "Sifooyinka kuu muhiimsan UGUGBADAN ee abka Ingiriisiga? (Dooro ilaa 3)",
    hint: "Tani waxay saameynaysaa waxa aan marka hore dhisinno",
    type: "multi",
    max: 3,
    options: [
      "AI macallin aan wax weydiin karo mar kasta",
      "Casharro loogu talagalay gaar ahaan dadka Soomaalida",
      "Ku celcelin hadlida iyo caawinta ku dhawaaqidda",
      "La socoshada horumarinta si aan u arko waxaan horumaray",
      "Liiska tartamada si aan ula tartamo Soomaali kale",
      "Shahaado aan tusi karo shaqo-bixiyeyaasha",
      "Casharro Soomaali iyo Ingiriisi labadaba",
      "Helitaan internet la'aanteed (offline)",
    ],
  },
  {
    id: "q11", section: "Ku Saabsan Abka",
    text: "Qalab kee ayaad badanaa isticmaashaa?",
    hint: "Waxay nana caawisaa inaan go'aamino meesha marka hore dhisinno",
    type: "single",
    options: [
      "Telefoon Android",
      "iPhone",
      "Computer / laptop",
      "Labadaba telefoon iyo computer",
    ],
  },
  {
    id: "q12", section: "Qiimaha & Diyaarnaanta Lacag Bixinta",
    text: "Ma bixin lahayd lacag abka waxbarasho Ingiriisiga ee tayo leh ee loogu sameeye dadka Soomaalida?",
    hint: "Jawaab daacad ah waxay nana caawisaa inaan wax dhisno oo xoogga ah",
    type: "single",
    options: [
      "Haa — haddii si dhab ah u wanaagsan yahay oo natiijo leh",
      "Laga yaabaa — waxay ku xidantahay qiimaha iyo waxa ku jira",
      "Lacag bixin lahaa oo keliya haddii aan marka hore bilaabo bilaash",
      "Maya — waxaan filayaa inuu bilaash yahay",
    ],
  },
  {
    id: "q13", section: "Qiimaha & Diyaarnaanta Lacag Bixinta",
    text: "Haddii ay jirto nooc bilaash ah iyo mid lacag bixinta, qiimaha lacagta bishiiba intee ayaa macquul u ah?",
    hint: "Dooro waxa aad runtii bixin lahayd — ma aha waxa wanaagsan u muuqda",
    type: "single",
    options: [
      "$0 — Nooca bilaashka oo keliya ayaan isticmaali lahaa",
      "$3 – $5 bishiiba",
      "$6 – $10 bishiiba",
      "$11 – $15 bishiiba",
      "$16 – $20 bishiiba",
      "Ka badan $20 haddii tanaadka tayo sareyso",
    ],
  },
  {
    id: "q14", section: "Qiimaha & Diyaarnaanta Lacag Bixinta",
    text: "Ma dooran lahayd lacag bixinta bishiiba mise hal lacag bixin sannadlaha ah oo qiimo dhimis leh?",
    hint: "Tani waxay saameynaysaa sida aan u qaabayno qiimeysiinta",
    type: "single",
    options: [
      "Bishiiba — doorasho jilicsan ayaan dooran",
      "Sannadlaha — haddii aan badbaadiyaa ugu yaraan 30-40%",
      "Hal lacag bixin oo nolosha oo dhan",
      "Ma rabo inaan lacag bixiyo",
    ],
  },
  {
    id: "q15", section: "Fikradaha Ugu Dambeeya",
    text: "Intee baad u fikirtaa inaad abka Ingiriisiga ee Soomaalida loogu sameeye u soo jeediso asxaabtaada ama qoyskaaga?",
    hint: "1 = gebi ahaanba maya, 5 = si buuxda haa",
    type: "scale",
    options: ["1 — Ma fikiro", "2", "3 — Laga yaabaa", "4", "5 — Gebi ahaanba haa"],
  },
  {
    id: "q16", section: "Fikradaha Ugu Dambeeya",
    text: "Wax kale ma jiraan oo aad rabtaa inaan ogaanno? Maxaa abka kugu roon lahayn?",
    hint: "Ikhtiyaari — laakiin jawaabta aad bixiso waxay saami ah ku yeelan kartaa akhirka",
    type: "text",
  },
];

const SECTIONS = [...new Set(QUESTIONS.map(q => q.section))];

// ── STORAGE HELPERS (localStorage — works on Vercel) ──────
const STORAGE_KEY = "ingliish-survey-responses";

function loadResponses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveResponse(entry) {
  try {
    const existing = loadResponses();
    existing.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {}
}

function clearResponses() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── PHONE VALIDATION ──────────────────────────────────────
function validateSomaliPhone(phone) {
  // Remove spaces/dashes
  const cleaned = phone.replace(/[\s\-]/g, "");
  // Somali numbers: +252XXXXXXXXX or 0XXXXXXXXX or just 9 digits starting with 6/7
  return /^(\+252|00252|0)?[67]\d{7,8}$/.test(cleaned);
}

function formatPhoneDisplay(val) {
  // Auto-add +252 prefix hint
  return val;
}

// ── CHART ────────────────────────────────────────────────
function HBar({ label, count, total, color = C.blue }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4, color: C.muted }}>
        <span style={{ maxWidth: "75%", lineHeight: 1.3 }}>{label}</span>
        <span style={{ color, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 8 }}>{count} · {pct}%</span>
      </div>
      <div style={{ background: C.border, borderRadius: 99, height: 7, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

// ── INSIGHTS ──────────────────────────────────────────────
function computeInsights(responses) {
  if (responses.length === 0) return [];
  const n = responses.length;

  const count = (qid, val) => responses.filter(r => {
    const a = r[qid];
    return Array.isArray(a) ? a.includes(val) : a === val;
  }).length;

  const topOption = (qid) => {
    const q = QUESTIONS.find(q => q.id === qid);
    if (!q || !q.options) return null;
    let best = null, bestCount = 0;
    q.options.forEach(o => {
      const c = count(qid, o);
      if (c > bestCount) { bestCount = c; best = o; }
    });
    return best ? { label: best, count: bestCount, pct: Math.round(bestCount / n * 100) } : null;
  };

  const insights = [];

  const t = topOption("q1");
  if (t) insights.push({ icon: "👥", color: C.blue, title: "Kooxda Da'da Ugu Badan", body: `${t.pct}% ka jawaabay waxay ku jiraan qeybta "${t.label}" — tani waa macmiilkaaga ugu muhiimsan.` });

  const j = topOption("q2");
  if (j) insights.push({ icon: "💼", color: C.purple, title: "Cidda Ay Yihiin", body: `Qeybta ugu badan waa "${j.label}" (${j.pct}%). Qaab luqadda suuq-gelintooda u samee ujeedooyinkooda.` });

  const businessCount = count("q5", "Kobcinta ganacsigayga / xiriirka macaamiisha caalamiga ah");
  const jobCount = count("q5", "Helitaanka shaqo wanaagsan ama kor u qaadista");
  if (businessCount > 0 || jobCount > 0) insights.push({ icon: "🎯", color: C.gold, title: "Sabab-raadinta Ugu Horeysa", body: `${Math.round(businessCount / n * 100)}% waxay u baahan yihiin Ingiriisiga kobcinta ganacsiga, ${Math.round(jobCount / n * 100)}% shaqada. Horteed saaro natiijooyinka dhaqaale — ma aha oo keliya 'baro Ingiriisiga'.` });

  const bc = topOption("q6");
  if (bc) insights.push({ icon: "🚧", color: C.red, title: "Caqabadda Ugugweyn ee La Xalliyaa", body: `Dhibaatada #1 waa "${bc.label}" (${bc.pct}%). Abkaagu waa inuu si toos ah u xalliyaa tani — ka dhig qayb ka mid ah bannaanbaxyada.` });

  const yesPayCount = count("q12", "Haa — haddii si dhab ah u wanaagsan yahay oo natiijo leh") + count("q12", "Lacag bixin lahaa oo keliya haddii aan marka hore bilaabo bilaash");
  insights.push({ icon: "💰", color: C.green, title: "Diyaarnaanta Lacag Bixinta", body: `${Math.round(yesPayCount / n * 100)}% waxay bixin lahaayeen AMA bixin lahaayeen kadib tijaabinta bilaashka. Qaababkaaga bilaash/lacag-bixin waa la xaqiijiyay.` });

  const p1 = count("q13", "$3 – $5 bishiiba");
  const p2 = count("q13", "$6 – $10 bishiiba");
  const p3 = count("q13", "$11 – $15 bishiiba");
  const sweetSpot = p2 >= p1 && p2 >= p3 ? "$6–$10" : p1 >= p3 ? "$3–$5" : "$11–$15";
  const sweetCount = p2 >= p1 && p2 >= p3 ? p2 : p1 >= p3 ? p1 : p3;
  insights.push({ icon: "🏷️", color: C.cyan, title: "Qiimaha Ugu Haboon", body: `${sweetSpot}/bil waa qiimaha ugu caansan (${Math.round(sweetCount / n * 100)}%). Fiiri qiimaha $9/bil — si fiican ayuu ugu dhacaa xadkan.` });

  const android = count("q11", "Telefoon Android");
  const iphone = count("q11", "iPhone");
  insights.push({ icon: "📱", color: C.purple, title: "Mudnaanta Platform", body: `${Math.round(android / n * 100)}% waxay isticmaalaan Android vs ${Math.round(iphone / n * 100)}% iPhone. Dhis Android marka hore — taasi waa xaqiiqda suuqka Soomaalida.` });

  const promoters = responses.filter(r => r["q15"] === "5 — Gebi ahaanba haa").length;
  insights.push({ icon: "📣", color: C.gold, title: "Awoodda Afka-ku-Faafinta", body: `${Math.round(promoters / n * 100)}% si buuxda u soo jeedinayaan abka asxaabtood iyo qoyskooda. Koboc dabiici ah ayaa suurtagal ah — dhis barnaamij u-gudbin.` });

  return insights;
}

// ── PHONE STEP ────────────────────────────────────────────
function PhoneStep({ onNext }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = validateSomaliPhone(phone);

  function handleNext() {
    setTouched(true);
    if (!isValid) {
      setError("Fadlan geli lambarka telefoonka saxda ah (tusaale: +252611234567)");
      return;
    }
    onNext(phone);
  }

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "40px 20px" }}>
      {/* Logo area */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: C.gold, letterSpacing: -0.5 }}>Ingliish</div>
        <div style={{ fontSize: 14, color: C.muted, marginTop: 6 }}>Baaritaan Suuq-galeenka</div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 24px" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 8 }}>
          Ku soo dhawow! 👋
        </div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>
          Ka hor inta aanan bilaaban, fadlan geli lambarka telefoonkaaga. Tani waxay nana oggolaanaysaa inaan kula soo xiriirno natiijooyinka oo aan kuu soo dirsanno macluumaadka abka.
        </div>

        {/* Phone number label */}
        <div style={{ fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 8, letterSpacing: 0.5 }}>
          📱 LAMBARKA TELEFOONKA (WAAJIB)
        </div>

        {/* Prefix + input row */}
        <div style={{ display: "flex", gap: 0, marginBottom: 8 }}>
          {/* Flag + prefix */}
          <div style={{
            background: C.surface,
            border: `2px solid ${C.border}`,
            borderRight: "none",
            borderRadius: "10px 0 0 10px",
            padding: "13px 14px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: C.muted,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            🇸🇴 +252
          </div>
          <input
            type="tel"
            value={phone}
            onChange={e => {
              setPhone(e.target.value);
              setError("");
            }}
            onBlur={() => setTouched(true)}
            placeholder="611 234 567"
            style={{
              flex: 1,
              background: C.surface,
              border: `2px solid ${touched && !isValid ? C.red : isValid ? C.green : C.border}`,
              borderRadius: "0 10px 10px 0",
              padding: "13px 14px",
              color: C.text,
              fontSize: 16,
              outline: "none",
              width: "100%",
              letterSpacing: 1,
            }}
          />
        </div>

        {/* Validation feedback */}
        {touched && !isValid && (
          <div style={{ fontSize: 12, color: C.red, marginBottom: 16 }}>
            ⚠️ {error || "Fadlan geli lambarka saxda ah (tusaale: 611234567)"}
          </div>
        )}
        {isValid && (
          <div style={{ fontSize: 12, color: C.green, marginBottom: 16 }}>
            ✓ Lambarka waa saxan yahay
          </div>
        )}
        {!touched && (
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 16 }}>
            Tusaale: 611234567 ama 0611234567
          </div>
        )}

        {/* Privacy note */}
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 12,
          color: C.dim,
          lineHeight: 1.6,
          marginBottom: 24,
        }}>
          🔒 Lambarka telefoonaagu waa sir — lama wadaago oo kaliya loogu isticmaalaa xiriirinta baaritaanka.
        </div>

        <button
          onClick={handleNext}
          style={{
            width: "100%",
            background: isValid ? `linear-gradient(135deg, ${C.blue}, ${C.gold})` : C.border,
            border: "none",
            borderRadius: 12,
            padding: "15px",
            color: isValid ? "#fff" : C.dim,
            fontSize: 16,
            fontWeight: 800,
            cursor: isValid ? "pointer" : "not-allowed",
            transition: "all 0.2s",
            letterSpacing: 0.3,
          }}
        >
          Bilow Baaritaanka →
        </button>
      </div>
    </div>
  );
}

// ── SURVEY FORM ───────────────────────────────────────────
function SurveyForm({ phone, onSubmit }) {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);

  const sectionQs = QUESTIONS.filter(q => q.section === SECTIONS[step]);
  const totalAnswered = Object.keys(answers).filter(k => {
    const a = answers[k];
    return a !== undefined && a !== "" && (!Array.isArray(a) || a.length > 0);
  }).length;
  const totalRequired = QUESTIONS.filter(q => q.type !== "text").length;

  function answer(qid, val, type, max) {
    setAnswers(prev => {
      if (type === "multi") {
        const cur = prev[qid] || [];
        const next = cur.includes(val)
          ? cur.filter(v => v !== val)
          : max && cur.length >= max ? cur : [...cur, val];
        return { ...prev, [qid]: next };
      }
      return { ...prev, [qid]: val };
    });
  }

  function sectionComplete() {
    return sectionQs.every(q =>
      q.type === "text" ||
      (answers[q.id] !== undefined && (Array.isArray(answers[q.id]) ? answers[q.id].length > 0 : true))
    );
  }

  function submit() {
    saveResponse({ ...answers, _phone: phone, _ts: Date.now() });
    onSubmit();
  }

  const progressPct = Math.round(((step) / SECTIONS.length) * 100);
  const donePct = Math.round((totalAnswered / totalRequired) * 100);

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 14px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.gold }}>Ingliish Survey</div>
            <div style={{ fontSize: 12, color: C.muted }}>
              Qaybta {step + 1} / {SECTIONS.length} · {SECTIONS[step]}
            </div>
          </div>
          <div style={{ fontSize: 13, color: C.muted, textAlign: "right" }}>
            <div style={{ color: donePct === 100 ? C.green : C.muted }}>{donePct}% dhammaystay</div>
            <div style={{ fontSize: 11, color: C.dim }}>📱 {phone}</div>
          </div>
        </div>
        <div style={{ background: C.border, borderRadius: 99, height: 5 }}>
          <div style={{
            width: `${progressPct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${C.blue}, ${C.gold})`,
            borderRadius: 99,
            transition: "width 0.4s",
          }} />
        </div>
      </div>

      {/* Section label */}
      <div style={{ padding: "16px 20px 4px" }}>
        <div style={{ fontSize: 11, color: C.blue, letterSpacing: 2, textTransform: "uppercase" }}>
          {SECTIONS[step]}
        </div>
      </div>

      {/* Questions */}
      <div style={{ padding: "8px 20px" }}>
        {sectionQs.map((q) => (
          <div key={q.id} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4, marginBottom: 4, color: C.text }}>
              {q.text}
            </div>
            {q.hint && (
              <div style={{ fontSize: 12, color: C.dim, marginBottom: 12 }}>{q.hint}</div>
            )}

            {q.type === "text" ? (
              <textarea
                value={answers[q.id] || ""}
                onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
                placeholder="Halkan ku qor jawaabta..."
                rows={3}
                style={{
                  width: "100%",
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  color: C.text,
                  fontSize: 14,
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            ) : q.type === "scale" ? (
              <div style={{ display: "flex", gap: 8 }}>
                {q.options.map((o, i) => {
                  const sel = answers[q.id] === o;
                  const num = i + 1;
                  const scaleColor = num <= 2 ? C.red : num === 3 ? C.gold : C.green;
                  return (
                    <button key={o} onClick={() => answer(q.id, o, "single")}
                      style={{
                        flex: 1, padding: "14px 4px",
                        background: sel ? scaleColor + "33" : C.card,
                        border: `2px solid ${sel ? scaleColor : C.border}`,
                        borderRadius: 10,
                        color: sel ? scaleColor : C.muted,
                        fontWeight: 800, fontSize: 16, cursor: "pointer",
                      }}>
                      {num}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map(o => {
                  const sel = q.type === "multi"
                    ? (answers[q.id] || []).includes(o)
                    : answers[q.id] === o;
                  const atMax = q.type === "multi" && q.max &&
                    (answers[q.id] || []).length >= q.max && !sel;
                  return (
                    <button key={o}
                      onClick={() => !atMax && answer(q.id, o, q.type, q.max)}
                      style={{
                        background: sel ? C.blue + "25" : C.card,
                        border: `2px solid ${sel ? C.blue : C.border}`,
                        borderRadius: 10, padding: "12px 14px",
                        cursor: atMax ? "not-allowed" : "pointer",
                        textAlign: "left",
                        color: sel ? C.text : atMax ? C.dim : C.muted,
                        fontSize: 14, opacity: atMax ? 0.5 : 1,
                        transition: "all 0.15s",
                        display: "flex", alignItems: "center", gap: 10,
                      }}>
                      <span style={{
                        width: 18, height: 18,
                        border: `2px solid ${sel ? C.blue : C.border}`,
                        borderRadius: q.type === "multi" ? 4 : "50%",
                        background: sel ? C.blue : "transparent",
                        flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: "#fff",
                      }}>
                        {sel ? "✓" : ""}
                      </span>
                      {o}
                    </button>
                  );
                })}
              </div>
            )}
            {q.type === "multi" && q.max && (
              <div style={{ fontSize: 11, color: C.dim, marginTop: 6 }}>
                Dooro ilaa {q.max} · {(answers[q.id] || []).length} la doortay
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nav */}
      <div style={{ padding: "0 20px", display: "flex", gap: 12 }}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            style={{
              flex: 1, background: C.card,
              border: `1px solid ${C.border}`, borderRadius: 10,
              padding: 14, color: C.muted, fontSize: 14, cursor: "pointer",
            }}>
            ← Dib u noqo
          </button>
        )}
        {step < SECTIONS.length - 1 ? (
          <button
            onClick={() => sectionComplete() && setStep(s => s + 1)}
            disabled={!sectionComplete()}
            style={{
              flex: 2,
              background: sectionComplete() ? C.blue : C.border,
              border: "none", borderRadius: 10, padding: 14,
              color: sectionComplete() ? "#fff" : C.dim,
              fontSize: 15, fontWeight: 700,
              cursor: sectionComplete() ? "pointer" : "not-allowed",
            }}>
            Xiga →
          </button>
        ) : (
          <button onClick={submit}
            style={{
              flex: 2, background: C.gold, border: "none",
              borderRadius: 10, padding: 14, color: "#000",
              fontSize: 15, fontWeight: 800, cursor: "pointer",
            }}>
            Dir Baaritaanka ✓
          </button>
        )}
      </div>
    </div>
  );
}

// ── THANK YOU ─────────────────────────────────────────────
function ThankYou({ onViewResults }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 24px" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🙏</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: C.gold, marginBottom: 10 }}>
        Mahadsanid!
      </div>
      <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.7, maxWidth: 360, margin: "0 auto 28px" }}>
        Jawaabahaaga waa la kaydiyay. Kaalinta aad ku qaadatay waxay nana caawinaysaa inaan abka Ingiriisiga ugu fiican ee dadka Soomaalida u dhisno.
      </div>
      <button onClick={onViewResults}
        style={{
          background: C.blue, border: "none", borderRadius: 10,
          padding: "13px 28px", color: "#fff", fontSize: 15,
          fontWeight: 700, cursor: "pointer",
        }}>
        Arag Natiijooyinka →
      </button>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────
function Dashboard({ responses, onClear }) {
  const n = responses.length;
  const insights = computeInsights(responses);

  const tally = (qid) => {
    const q = QUESTIONS.find(q => q.id === qid);
    if (!q || !q.options) return [];
    return q.options.map(o => ({
      label: o,
      count: responses.filter(r => Array.isArray(r[qid]) ? r[qid].includes(o) : r[qid] === o).length,
    })).sort((a, b) => b.count - a.count);
  };

  const chartColors = [C.blue, C.gold, C.green, C.purple, C.cyan, C.red, "#F97316", "#EC4899"];

  const topPriceObj = tally("q13").find(t => t.count === Math.max(...tally("q13").map(t => t.count)));
  const topPrice = topPriceObj ? topPriceObj.label.replace(" bishiiba", "").replace("$0 — Nooca bilaashka oo keliya ayaan isticmaali lahaa", "Bilaash") : "?";

  return (
    <div style={{ padding: "20px", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: C.gold, marginBottom: 4 }}>
          Natiijooyinka Baaritaanka
        </div>
        <div style={{ fontSize: 14, color: C.muted }}>
          {n} jawaab la helay · Xogta tooska ah
        </div>
      </div>

      {n === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: C.dim }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 16 }}>Wali jawaab la ma helin. La wadaag xiriirka baaritaanka si aad u bilaabato ururinta xogta.</div>
        </div>
      ) : (
        <>
          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
            {[
              ["📋", n, "Jawaabaha"],
              ["%", Math.round(responses.filter(r => r["q12"] && !r["q12"].includes("Maya")).length / n * 100) + "%", "Bixin Lahaayeen"],
              ["💰", topPrice, "Qiimaha Ugu Fiican"],
              ["📱", tally("q11")[0]?.label?.split(" ").slice(0, 2).join(" ") || "?", "Qalab Badan"],
            ].map(([icon, val, label]) => (
              <div key={label} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: "14px 10px", textAlign: "center",
              }}>
                <div style={{ fontSize: 18 }}>{icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.gold, margin: "4px 0 2px", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 10, color: C.dim }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Phone numbers collected */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px", marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>
              📱 Lambaro La Ururiyay ({responses.filter(r => r._phone).length})
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {responses.filter(r => r._phone).map((r, i) => (
                <span key={i} style={{
                  background: C.surface, border: `1px solid ${C.border}`,
                  borderRadius: 6, padding: "4px 10px", fontSize: 13, color: C.muted,
                }}>
                  {r._phone}
                </span>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
              🧠 Fahamyada Ganacsiga
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {insights.map((ins, i) => (
                <div key={i} style={{
                  background: C.card,
                  border: `1px solid ${ins.color}30`,
                  borderLeft: `3px solid ${ins.color}`,
                  borderRadius: "0 12px 12px 0",
                  padding: "14px 16px",
                  display: "flex", gap: 12,
                }}>
                  <span style={{ fontSize: 20 }}>{ins.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: ins.color, marginBottom: 4 }}>{ins.title}</div>
                    <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{ins.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          {[
            { id: "q1", title: "Qaybinta Da'da" },
            { id: "q2", title: "Cidda Ay Yihiin?" },
            { id: "q3", title: "Goobta" },
            { id: "q4", title: "Heerka Ingiriisiga Hadda" },
            { id: "q5", title: "Sababta Ay U Baranayaan Ingiriisiga" },
            { id: "q6", title: "Caqabadda Ugugweyn" },
            { id: "q8", title: "Waqtiga Maalinlaha Ah" },
            { id: "q9", title: "Qaabka Waxbarasho ee La Doortay" },
            { id: "q10", title: "Sifooyinka Ugu Baahan" },
            { id: "q11", title: "Qalab La Isticmaalo" },
            { id: "q12", title: "Diyaarnaanta Lacag Bixinta" },
            { id: "q13", title: "Qiimaha Bishiiba ee La Aqbali Karo" },
            { id: "q14", title: "Doorashooyinka Lacag Bixinta" },
            { id: "q15", title: "Dhibcaha Faafinta Afka" },
          ].map(({ id, title }, chartIdx) => {
            const data = tally(id);
            return (
              <div key={id} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: "18px", marginBottom: 14,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: C.text }}>{title}</div>
                {data.map((d, i) => (
                  <HBar key={d.label} label={d.label} count={d.count} total={n}
                    color={chartColors[i % chartColors.length]} />
                ))}
              </div>
            );
          })}

          {/* Open text */}
          {responses.some(r => r["q16"]) && (
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: C.text }}>
                💬 Jawaabaha Furan — Waxa Ay Yidhaahdeen
              </div>
              {responses.filter(r => r["q16"]).map((r, i) => (
                <div key={i} style={{
                  padding: "10px 14px", background: C.surface,
                  borderRadius: 8, marginBottom: 8, fontSize: 13,
                  color: C.muted, lineHeight: 1.5, borderLeft: `2px solid ${C.gold}`,
                }}>
                  "{r["q16"]}"
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <button onClick={onClear} style={{
        background: "none", border: `1px solid ${C.border}`,
        borderRadius: 8, padding: "8px 16px", color: C.dim,
        fontSize: 12, cursor: "pointer", marginTop: 8,
      }}>
        🗑 Tirtir xogta tijaabada oo dhan
      </button>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("phone"); // phone | survey | thankyou | dashboard
  const [phone, setPhone] = useState("");
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    setResponses(loadResponses());
  }, []);

  function handlePhoneNext(ph) {
    setPhone(ph);
    setView("survey");
  }

  function handleSubmit() {
    setResponses(loadResponses());
    setView("thankyou");
  }

  function handleClear() {
    clearResponses();
    setResponses([]);
  }

  const navViews = ["survey", "dashboard"];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Top nav */}
      <div style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: "12px 20px", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div>
          <span style={{ fontWeight: 900, color: C.gold, fontSize: 16 }}>Ingliish</span>
          <span style={{ color: C.dim, fontSize: 13, marginLeft: 8 }}>Baaritaan</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setView(view === "dashboard" ? "phone" : "dashboard")}
            style={{
              background: view === "dashboard" ? C.blue : "transparent",
              border: `1px solid ${view === "dashboard" ? C.blue : C.border}`,
              borderRadius: 8, padding: "6px 14px",
              color: view === "dashboard" ? "#fff" : C.muted,
              fontSize: 13, cursor: "pointer",
              fontWeight: view === "dashboard" ? 700 : 400,
            }}>
            📊 Natiijooyinka ({responses.length})
          </button>
          {view === "dashboard" && (
            <button
              onClick={() => setView("phone")}
              style={{
                background: C.blue, border: "none",
                borderRadius: 8, padding: "6px 14px",
                color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 700,
              }}>
              📋 Baaritaanka
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {view === "phone" && <PhoneStep onNext={handlePhoneNext} />}
      {view === "survey" && <SurveyForm phone={phone} onSubmit={handleSubmit} />}
      {view === "thankyou" && <ThankYou onViewResults={() => setView("dashboard")} />}
      {view === "dashboard" && <Dashboard responses={responses} onClear={handleClear} />}
    </div>
  );
}
