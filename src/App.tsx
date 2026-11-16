import { FormEvent, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Donate, { WaitlistModal } from "./Donate";

const A = "/assets";

type ModalKind = "waitlist" | "support" | null;
type PhoneScreen = "today" | "learn" | "recite" | "arena" | "you" | "notifications";

const features = [
  {
    overline: "01 · REMEMBER",
    title: "Hifz & revision",
    body: "Learn ayah by ayah, then return to what you’ve memorized with a gentle revision rhythm.",
    label: "A LITTLE, EVERY DAY",
    preview: "Your next ayah awaits.",
    color: "var(--sage)",
  },
  {
    overline: "02 · RECITE",
    title: "Recitation & Tajweed",
    body: "Read, listen, and practise with care. Build confidence one sound at a time. Explore the way you recite.",
    label: "READ & LISTEN",
    preview: "All 114 surahs, together.",
    color: "var(--peach)",
  },
  {
    overline: "03 · REFLECT",
    title: "Hadith & reflection",
    body: "Carry meaningful words into your day, with references visible as you learn. Explore the words.",
    label: "KEEP IT CLOSE",
    preview: "Meaning that stays with you.",
    color: "var(--lilac)",
  },
];

const faqs = [
  [
    "Do I need to know Arabic to start?",
    "No. Begin with the Arabic alphabet, or start a guided Hifz journey at your own level.",
  ],
  [
    "Can I use Qur’anly if I have already memorized the Qur’an?",
    "Yes. Build a full-Qur’an revision rhythm, and give difficult passages a little more attention.",
  ],
  [
    "Does AI replace a qualified teacher?",
    "No. AI supports word-level practice. Tajweed and nuanced recitation need human guidance.",
  ],
  [
    "How do story rewards work?",
    "Complete your daily learning goal to unlock a mindful break with stories and reflections.",
  ],
];

function Logo({ light = false, large = false }: { light?: boolean; large?: boolean }) {
  return (
    <div className={`logo ${large ? "logo--large" : ""}`}>
      <span className="logo-mark">
        <img src={`${A}/${light ? "d13b8" : "f6b50"}.svg`} alt="" />
        <img className="logo-book" src={`${A}/${light ? "82a82" : "ef9f6"}.svg`} alt="" />
        <img className="logo-seed" src={`${A}/${light ? "8bc64" : "015a8"}.svg`} alt="" />
      </span>
      <span className="logo-word">Qur’anly</span>
    </div>
  );
}

function Icon({ file, alt = "" }: { file: string; alt?: string }) {
  return <img className="ui-icon" src={`${A}/${file}.svg`} alt={alt} />;
}

function PhonePrototype() {
  const [screen, setScreen] = useState<PhoneScreen>("today");
  const [toast, setToast] = useState("");
  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  const practice = [
    ["Hifz", "2 ayahs today", "a9c92", "var(--sage)", "learn" as PhoneScreen],
    ["Revision", "3 surahs due", "fcf86", "var(--peach)", "learn" as PhoneScreen],
    ["Recitation", "Find your flow", "2a4a7", "var(--lilac)", "recite" as PhoneScreen],
    ["Hadith", "Start with intention", "4b61c", "var(--sage)", "learn" as PhoneScreen],
  ];

  const screens: Record<
    Exclude<PhoneScreen, "today">,
    { eyebrow: string; title: string; body: string }
  > = {
    learn: {
      eyebrow: "YOUR LEARNING PATH",
      title: "Continue with Al-Ikhlas",
      body: "Return to your next ayah, revise gently, or explore Arabic.",
    },
    recite: {
      eyebrow: "RECITATION PRACTICE",
      title: "Find your natural flow",
      body: "Listen, repeat, and record when you feel ready.",
    },
    arena: {
      eyebrow: "QUR’ANLY ARENA",
      title: "Grow in good company",
      body: "Join a private challenge with thoughtful human guidance.",
    },
    you: {
      eyebrow: "YOUR GARDEN",
      title: "Seven days of steady growth",
      body: "You’ve learned 18 ayahs and completed 240 XP this week.",
    },
    notifications: {
      eyebrow: "NOTIFICATIONS",
      title: "A gentle reminder",
      body: "Your next ayah is waiting whenever you’re ready.",
    },
  };

  return (
    <div className="phone-shell" aria-label="Interactive Qur’anly app prototype">
      <div className="phone-top">
        <span>9:41</span>
        <span className="camera-island" />
        <button aria-label="Settings" onClick={() => showToast("Settings opened")}>
          <Icon file="4bb0f" />
        </button>
      </div>
      <div className="phone-content">
        {screen === "today" ? (
          <div className="phone-screen screen-enter">
            <div className="phone-greeting">
              <div>
                <span>ASSALAMU ALAIKUM, AMINA</span>
                <h3>Let’s keep growing.</h3>
              </div>
              <button aria-label="Notifications" onClick={() => setScreen("notifications")}>
                <Icon file="5687a" />
              </button>
            </div>
            <div className="chips">
              <span>7-day streak</span>
              <span>240 learning XP</span>
            </div>
            <button className="daily-plan" onClick={() => setScreen("learn")}>
              <small>YOUR DAILY SEED</small>
              <strong>
                A little effort.
                <br />
                Lasting roots.
              </strong>
              <span className="garden">
                <img className="garden-arch" src={`${A}/54d3e.svg`} alt="" />
                <img className="garden-plants" src={`${A}/1337d.svg`} alt="" />
                <img className="garden-stand" src={`${A}/34a21.svg`} alt="" />
                <img className="garden-cover" src={`${A}/7263c.svg`} alt="" />
                <img className="garden-pages" src={`${A}/39c04.svg`} alt="" />
                <img className="garden-sparkles" src={`${A}/c3d67.svg`} alt="" />
              </span>
              <em>6 / 10 min</em>
              <i>
                <b />
              </i>
              <span className="continue-label">
                Continue Al-Ikhlas <img src={`${A}/49216.svg`} alt="" />
              </span>
            </button>
            <div className="practice-head">
              <h4>Your practice</h4>
              <button onClick={() => setScreen("learn")}>See plan</button>
            </div>
            <div className="practice-grid">
              {practice.map(([title, sub, icon, color, target]) => (
                <button key={title} style={{ background: color }} onClick={() => setScreen(target)}>
                  <Icon file={icon} />
                  <strong>{title}</strong>
                  <span>{sub}</span>
                </button>
              ))}
            </div>
            <button className="arabic-card" onClick={() => setScreen("learn")}>
              <b>ع</b>
              <span>
                <strong>Learn Arabic</strong>
                <small>Letters, words & deeper meaning</small>
              </span>
            </button>
            <button
              className="reward"
              onClick={() => showToast("Complete today’s goal to unlock stories")}
            >
              <Icon file="7ffa3" />
              <span>
                <strong>Stories are almost yours</strong>
                <small>Finish your goal to unlock today’s stories</small>
              </span>
            </button>
          </div>
        ) : (
          <div className="phone-screen alt-screen screen-enter">
            <button className="phone-back" onClick={() => setScreen("today")}>
              ← Today
            </button>
            <span className="alt-eyebrow">{screens[screen].eyebrow}</span>
            <h3>{screens[screen].title}</h3>
            <p>{screens[screen].body}</p>
            <div className="ayah-card">
              <span>قُلْ هُوَ ٱللَّهُ أَحَدٌ</span>
              <small>Say, “He is Allah—One and Indivisible.”</small>
            </div>
            <button
              className="phone-primary"
              onClick={() =>
                showToast(screen === "recite" ? "Recording started" : "Practice started")
              }
            >
              {screen === "recite"
                ? "Start recording"
                : screen === "arena"
                  ? "View challenges"
                  : "Continue practice"}
            </button>
          </div>
        )}
      </div>
      <nav className="phone-nav">
        {[
          ["today", "89dba", "Today"],
          ["learn", "f059c", "Learn"],
          ["recite", "9a104", "Recite"],
          ["arena", "a834d", "Arena"],
          ["you", "a0dbb", "You"],
        ].map(([id, icon, label]) => (
          <button
            key={id}
            className={screen === id ? "active" : ""}
            onClick={() => setScreen(id as PhoneScreen)}
          >
            <Icon file={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      {toast && <div className="phone-toast">{toast}</div>}
    </div>
  );
}

function Modal({ kind, close }: { kind: Exclude<ModalKind, null>; close: () => void }) {
  const [done, setDone] = useState(false);
  if (kind === "waitlist") {
    return <WaitlistModal isOpen={true} onClose={close} />;
  }
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const key = "quranly-support";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(
      key,
      JSON.stringify([...existing, { ...data, createdAt: new Date().toISOString() }]),
    );
    setDone(true);
  };
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={close}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={close} aria-label="Close">
          ×
        </button>
        {done ? (
          <div className="success-state">
            <span>✓</span>
            <h2 id="modal-title">You’re all set.</h2>
            <p>
              {kind === "waitlist"
                ? "We’ll let you know when Qur’anly is ready."
                : "Your message has been saved. Our care team will follow up."}
            </p>
            <button onClick={close}>Close</button>
          </div>
        ) : (
          <>
            <span className="eyebrow">
              {kind === "waitlist" ? "EARLY ACCESS" : "WE’RE HERE TO HELP"}
            </span>
            <h2 id="modal-title">
              {kind === "waitlist" ? "Join the Qur’anly waitlist." : "How can we support you?"}
            </h2>
            <p>
              {kind === "waitlist"
                ? "Be among the first to build a gentler daily Qur’an practice."
                : "Tell us what you need and leave the best way to reach you."}
            </p>
            <form onSubmit={submit}>
              <label>
                Name
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                Email
                <input name="email" type="email" required placeholder="you@example.com" />
              </label>
              {kind === "support" && (
                <label>
                  Message
                  <textarea name="message" required rows={4} placeholder="How can we help?" />
                </label>
              )}
              <button type="submit">
                {kind === "waitlist" ? "Join the waitlist" : "Send message"} <span>↗</span>
              </button>
            </form>
            <small>Stored privately on this device for this frontend demo.</small>
          </>
        )}
      </div>
    </div>
  );
}

function Home() {
  const [modal, setModal] = useState<ModalKind>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [roomMessage, setRoomMessage] = useState("Connection stable");
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main>
      <header id="top" className="site-header">
        <button className="brand-button" onClick={() => scrollTo("top")}>
          <Logo />
        </button>
        <nav className="desktop-nav">
          <button onClick={() => scrollTo("app")}>The app</button>
          <button onClick={() => scrollTo("arabic")}>Learn Arabic</button>
          <button onClick={() => scrollTo("approach")}>Our approach</button>
          <button onClick={() => scrollTo("faqs")}>FAQs</button>
        </nav>
        <button className="primary small" onClick={() => setModal("waitlist")}>
          Get the app
        </button>
      </header>

      <section className="hero">
        <div className="hero-copy reveal">
          <span className="eyebrow">A LITTLE EVERY DAY. A LIFETIME WITH QUR’AN.</span>
          <h1>
            Grow closer.
            <br />
            One ayah
            <br />
            at a time.
          </h1>
          <p>
            Memorize with purpose. Recite with confidence.
            <br />
            Learn Arabic, and bring more meaning into every day.
            <br />A gentle learning journey, shaped around you.
          </p>
          <div className="button-row">
            <button className="primary" onClick={() => setModal("waitlist")}>
              Download Qur'anly <span>↗</span>
            </button>
            <button className="secondary" onClick={() => scrollTo("app")}>
              Explore the app <span>↓</span>
            </button>
          </div>
          <small>Made for your own pace. From your first ayah onward.</small>
        </div>
        <div className="product-showcase">
          <div className="note note-left">
            <strong>A gentle daily rhythm</strong>
            <span>Learn. Practise. Flourish.</span>
          </div>
          <PhonePrototype />
          <div className="note note-right">
            <strong>A space to begin again.</strong>
            <span>No rush. Just growth.</span>
          </div>
        </div>
      </section>

      <section className="promise">
        <h2>Not a race. A relationship.</h2>
        <p>
          Small daily steps. Space to start again.
          <br />A practice that grows with your life.
        </p>
      </section>

      <section id="app" className="section features">
        <span className="eyebrow">YOUR PRACTICE, TOGETHER IN ONE PLACE</span>
        <h2>A companion for every part of your journey.</h2>
        <div className="feature-grid">
          {features.map((f) => (
            <article key={f.title} style={{ background: f.color }}>
              <span>{f.overline}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <div>
                <small>{f.label}</small>
                <strong>{f.preview}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="arabic" className="section arabic">
        <div>
          <span className="eyebrow">FROM YOUR FIRST LETTER TO YOUR OWN VOICE</span>
          <h2>
            Let the words
            <br />
            open a new door.
          </h2>
          <p>
            Start with letter shapes. Build a word garden.
            <br />
            Practise little by little, and bring more understanding
            <br />
            to the words you meet.
          </p>
          <strong className="steps">
            01&nbsp;&nbsp; Meet the letters&nbsp;&nbsp;&nbsp;&nbsp; 02&nbsp;&nbsp; Discover
            words&nbsp;&nbsp;&nbsp;&nbsp; 03&nbsp;&nbsp; Review gently
          </strong>
          <button className="primary" onClick={() => setModal("waitlist")}>
            Start your Arabic journey <span>↗</span>
          </button>
        </div>
        <div className="journey-card">
          <span className="eyebrow">A PATH THAT GROWS WITH YOU</span>
          <h3>From “hello” to connection.</h3>
          {[
            ["01", "First conversations", "Beginner · Greetings & introductions"],
            ["02", "Everyday life", "Elementary · Family, food & travel"],
            ["03", "Tell your story", "Intermediate · Thoughts & opinions"],
            ["04", "Speak with nuance", "Advanced · Fluency & expression"],
          ].map((r, i) => (
            <div className={`journey-row row-${i}`} key={r[0]}>
              <b>{r[0]}</b>
              <span>
                <strong>{r[1]}</strong>
                <small>{r[2]}</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="approach" className="section approach">
        <h2>Make room for a meaningful habit.</h2>
        <div className="approach-grid">
          {[
            [
              "01",
              "Start where you are",
              "New to learning or continuing your Hifz? Choose the path that fits your experience.",
            ],
            [
              "02",
              "Set a gentle daily goal",
              "Five minutes or a little more. Find a rhythm you can return to.",
            ],
            [
              "03",
              "Let each day take root",
              "Learn, practise, and revisit. Small steps make a lasting journey.",
            ],
          ].map((x) => (
            <article key={x[0]}>
              <span>{x[0]}</span>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section challenges">
        <div className="challenge-copy">
          <span className="eyebrow">LIVE CHALLENGES · REAL HUMAN GUIDANCE</span>
          <h2>
            Courage grows
            <br />
            in good company.
          </h2>
          <p>
            A private video room. Qualified judges.
            <br />A fair rubric, and a community learning alongside you.
          </p>
          <small>Private sessions · Clear feedback · Thoughtful progress</small>
          <button onClick={() => setModal("waitlist")}>Discover your next challenge</button>
        </div>
        <div className="live-room">
          <div className="live-head">
            <Logo light />
            <span>● LIVE · Room A · {roomMessage}</span>
          </div>
          <h3>The Juz ʿAmma Challenge</h3>
          <p>Beginner · Hafs ʿan ʿAsim · 2 judges · 4 participants</p>
          <div className="video-grid">
            <figure className="main-video">
              <img src={`${A}/17efa.png`} alt="Amina Yusuf reciting" />
              <figcaption>Amina Yusuf · Reciting · 01:42 / 05:00</figcaption>
            </figure>
            {[
              ["4abda", "Maryam Ibrahim · Judge"],
              ["9d355", "Abdullah Khan · Judge"],
              ["4924e", "Omar · Up next"],
              ["f6f6d", "Fatima · Waiting"],
              ["a4929", "Yusuf · Waiting"],
            ].map((x) => (
              <figure key={x[0]}>
                <img src={`${A}/${x[0]}.png`} alt={x[1]} />
                <figcaption>{x[1]}</figcaption>
              </figure>
            ))}
          </div>
          <div className="scorecard">
            <h4>Score with intention.</h4>
            <small>AMINA YUSUF · AL-FALAQ</small>
            {[
              ["Memorization", "45 / 50"],
              ["Tajweed", "27 / 30"],
              ["Fluency & pacing", "18 / 20"],
            ].map((x) => (
              <div key={x[0]}>
                <b>{x[0]}</b>
                <span>{x[1]}</span>
              </div>
            ))}
            <strong>90 / 100</strong>
            <button onClick={() => setRoomMessage("Score saved")}>
              Save score & next participant
            </button>
          </div>
          <div className="room-controls">
            {["Mic on", "Camera on", "Participants · 6", "Admin view"].map((x) => (
              <button key={x} onClick={() => setRoomMessage(`${x} selected`)}>
                {x}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section trust">
        <h2>
          Care is part
          <br />
          of the practice.
        </h2>
        {[
          ["Sources you can see", "Hadith references and grades stay visible."],
          ["A private learning space", "Your recordings are not posted publicly."],
          ["AI that knows its place", "Practice support, not a tajweed certification."],
        ].map((x) => (
          <article key={x[0]}>
            <span>✓</span>
            <h3>{x[0]}</h3>
            <p>{x[1]}</p>
          </article>
        ))}
      </section>

      <section id="faqs" className="section faqs">
        <h2>A few things you may be wondering.</h2>
        <div>
          {faqs.map((faq, i) => (
            <article className={openFaq === i ? "open" : ""} key={faq[0]}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <strong>{faq[0]}</strong>
                <span>{openFaq === i ? "−" : "+"}</span>
              </button>
              <p>{faq[1]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section download">
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS SMALL</span>
        <h2>
          A little every day.
          <br />A lifetime with Qur’an.
        </h2>
        <p>Bring your learning journey into the moments you already have.</p>
        <div>
          <button onClick={() => setModal("waitlist")}>App Store</button>
          <button onClick={() => setModal("waitlist")}>Google Play</button>
          <small>iOS & Android · Join the early access waitlist</small>
        </div>
      </section>

      <footer>
        <div>
          <Logo light large />
          <p>Grow closer. One ayah at a time.</p>
        </div>
        <nav>
          <button onClick={() => scrollTo("app")}>The app</button>
          <button onClick={() => scrollTo("arabic")}>Learn Arabic</button>
          <button onClick={() => scrollTo("approach")}>Our approach</button>
          <button onClick={() => scrollTo("faqs")}>Questions & answers</button>
          <button onClick={() => setModal("support")}>Support</button>
          <button onClick={() => setModal("waitlist")}>Join waitlist</button>
        </nav>
        <small>© 2026 Qur’anly. A little every day.</small>
        <button className="back-top" onClick={() => scrollTo("top")} aria-label="Back to top">
        
        </button>
      </footer>
      <a href="/donate" style={{ textDecoration: "none" }}>
        <button className="support-pill">Donate</button>
      </a>
      {modal && <Modal kind={modal} close={() => setModal(null)} />}
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/donate" element={<Donate />} />
    </Routes>
  );
}
