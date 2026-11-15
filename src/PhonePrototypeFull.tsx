import { useState } from "react";

type Screen =
  | "welcome"
  | "account"
  | "starting"
  | "goal"
  | "today"
  | "hifz"
  | "verse"
  | "checkpoint"
  | "complete"
  | "revision"
  | "learn"
  | "recite"
  | "tajweed"
  | "hadith"
  | "arena"
  | "profile"
  | "arabic"
  | "signin"
  | "stories"
  | "preferences"
  | "saved"
  | "lesson"
  | "hadith-detail"
  | "challenge"
  | "competition-entry"
  | "entry-confirmed"
  | "live-assessment"
  | "device-check"
  | "video-room"
  | "participants"
  | "record"
  | "reader"
  | "forgot"
  | "inbox"
  | "new-password"
  | "notifications"
  | "account-privacy"
  | "help"
  | "teacher-review"
  | "review-sent"
  | "password-updated"
  | "hifz-levels"
  | "recall"
  | "checkpoint-recall"
  | "checkpoint-passed"
  | "checkpoint-retry"
  | "revision-plan"
  | "revision-session"
  | "feedback"
  | "quran-library"
  | "arabic-mastery"
  | "story-unlocked"
  | "arabic-path"
  | "arabic-words"
  | "arabic-practice"
  | "arabic-retry"
  | "arabic-correct"
  | "vocabulary";

const A = "/assets";

function Icon({ name, size, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <span className={`icon ${className}`} style={size ? { width: size, height: size } : undefined}>
      <img src={`${A}/${name}`} alt="" />
    </span>
  );
}

function Back({
  onClick,
  eyebrow,
  icon = "e2164.svg",
}: {
  onClick: () => void;
  eyebrow: string;
  icon?: string;
}) {
  return (
    <>
      <button className="back" onClick={onClick} aria-label="Back">
        <Icon name={icon} size={22} />
      </button>
      <p className="eyebrow top-eyebrow">{eyebrow}</p>
    </>
  );
}

function PrimaryButton({
  children,
  onClick,
  icon = "ac908.svg",
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: string;
}) {
  return (
    <button className="primary" onClick={onClick}>
      <span>{children}</span>
      <Icon name={icon} size={20} />
    </button>
  );
}

function Garden({ variant }: { variant: "large" | "small" | "signin" | "complete" }) {
  const files =
    variant === "large"
      ? ["768e6.svg", "dd715.svg", "32dad.svg", "4174a.svg", "77fe4.svg", "d7c9a.svg"]
      : variant === "signin"
        ? ["f70dd.svg", "ae0a9.svg", "584ec.svg", "a8b70.svg", "66f41.svg", "2b456.svg"]
        : variant === "small"
          ? ["113ac.svg", "bfc46.svg", "ab79d.svg", "f9a93.svg", "7b299.svg", "0233d.svg"]
          : ["b86f7.svg", "1daae.svg", "dc609.svg", "ecc4b.svg", "e4129.svg", "54f1f.svg"];
  return (
    <div className={`garden garden-${variant}`} aria-hidden="true">
      {files.map((file, i) => (
        <img key={file} className={`garden-part garden-part-${i}`} src={`${A}/${file}`} alt="" />
      ))}
    </div>
  );
}

function Welcome({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen welcome">
      <h1 className="brand">Qur’anly</h1>
      <div className="motto">A LITTLE EVERY DAY. A LIFETIME WITH QUR’AN.</div>
      <Garden variant="large" />
      <h2 className="welcome-title">
        Grow closer.
        <br />
        One ayah at a time.
      </h2>
      <p className="welcome-copy">
        Memorize with purpose. Recite with confidence.
        <br />
        Build a beautiful habit that stays with you.
      </p>
      <div className="peach-pill">Learn&nbsp; • &nbsp;Practice&nbsp; • &nbsp;Flourish</div>
      <div className="welcome-cta">
        <PrimaryButton onClick={() => go("account")}>Begin my journey</PrimaryButton>
      </div>
      <button className="text-link welcome-signin" onClick={() => go("signin")}>
        Already growing with us?&nbsp; Sign in
      </button>
    </main>
  );
}

function Account({ go }: { go: (screen: Screen) => void }) {
  const [agreed, setAgreed] = useState(true);
  return (
    <main className="screen account">
      <Back onClick={() => go("welcome")} eyebrow="WELCOME TO QUR’ANLY" />
      <h1 className="page-title">Your journey starts here.</h1>
      <p className="page-subtitle">A small commitment. A meaningful beginning.</p>
      <div className="trust">
        <Icon name="9d014.svg" size={22} />
        <span>Your learning, your pace. Always private.</span>
      </div>
      <form
        className="account-form"
        onSubmit={(event) => {
          event.preventDefault();
          go("starting");
        }}
      >
        <label>
          Full name
          <input defaultValue="Amina Yusuf" aria-label="Full name" />
        </label>
        <label>
          Email address
          <input defaultValue="amina@example.com" type="email" aria-label="Email address" />
        </label>
        <label>
          Password
          <input defaultValue="quranly12345" type="password" aria-label="Password" />
        </label>
        <button className="agreement" type="button" onClick={() => setAgreed(!agreed)}>
          <span className={`check-box ${agreed ? "checked" : ""}`}>
            {agreed && <Icon name="6486f.svg" size={20} />}
          </span>
          <span>I agree to the Terms and Privacy Policy.</span>
        </button>
        <PrimaryButton onClick={() => go("starting")}>Create my account</PrimaryButton>
        <button className="secondary-button" type="button" onClick={() => go("starting")}>
          Continue with Apple
        </button>
      </form>
      <button className="text-link account-signin" onClick={() => go("signin")}>
        Already have an account?&nbsp; Sign in
      </button>
    </main>
  );
}

const pathChoices = [
  ["Starting fresh", "Learn short surahs, one ayah at a time.", "5bc8d.svg"],
  ["Building my Hifz", "Continue from what I already know.", "a03db.svg"],
  ["I’ve memorized the Qur’an", "Keep my Hifz strong with daily revision.", "3b2d9.svg"],
];

function Starting({ go }: { go: (screen: Screen) => void }) {
  const [choice, setChoice] = useState(0);
  const [level, setLevel] = useState("Beginner");
  return (
    <main className="screen">
      <Back onClick={() => go("account")} eyebrow="MAKE IT YOURS · 1 OF 2" />
      <h1 className="page-title">Start where you are.</h1>
      <p className="page-subtitle">We’ll shape your path around your experience.</p>
      <div className="path-choices">
        {pathChoices.map(([title, copy, icon], index) => (
          <button
            className={`choice-card ${choice === index ? "selected" : ""}`}
            key={title}
            onClick={() => setChoice(index)}
          >
            <Icon name={icon} size={26} />
            <span>
              <strong>{title}</strong>
              <small>{copy}</small>
            </span>
            {choice === index && <Icon className="choice-check" name="5951b.svg" size={18} />}
          </button>
        ))}
      </div>
      <p className="eyebrow level-label">STARTING LEVEL</p>
      <div className="segmented levels">
        {["Beginner", "Intermediate", "Expert"].map((item) => (
          <button
            className={level === item ? "active" : ""}
            onClick={() => setLevel(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="starting-note">
        A short placement check can help you choose.
        <br />
        You can change your path at any time.
      </p>
      <div className="bottom-cta">
        <PrimaryButton onClick={() => go("goal")}>Continue</PrimaryButton>
      </div>
    </main>
  );
}

function Goal({ go }: { go: (screen: Screen) => void }) {
  const [goal, setGoal] = useState(10);
  const [reminder, setReminder] = useState(true);
  const choices = [
    [5, "A gentle beginning"],
    [10, "Build a steady rhythm"],
    [20, "Make more room to grow"],
  ];
  return (
    <main className="screen">
      <Back onClick={() => go("starting")} eyebrow="MAKE IT YOURS · 2 OF 2" />
      <h1 className="page-title">Small steps. Deep roots.</h1>
      <p className="page-subtitle">Choose a daily goal you can return to.</p>
      <div className="goal-choices">
        {choices.map(([minutes, copy]) => (
          <button
            key={minutes}
            className={`goal-choice ${goal === minutes ? "selected" : ""}`}
            onClick={() => setGoal(minutes as number)}
          >
            <strong>{minutes} min</strong>
            <span>{copy}</span>
            {goal === minutes && <Icon name="5269c.svg" size={20} />}
          </button>
        ))}
      </div>
      <button className="reminder" onClick={() => setReminder(!reminder)}>
        <Icon name="7e310.svg" size={23} />
        <span>
          <strong>A gentle nudge</strong>
          <small>Every day at 7:00 PM</small>
        </span>
        <em>{reminder ? "On" : "Off"}</em>
      </button>
      <div className="daily-plan">
        <h2>Your daily plan</h2>
        <p>
          New memorization + a little revision.
          <br />
          Rest days are part of a lasting habit.
        </p>
      </div>
      <div className="bottom-cta">
        <PrimaryButton onClick={() => go("today")}>Let’s begin</PrimaryButton>
      </div>
    </main>
  );
}

const navItems: [string, string, string, Screen][] = [
  ["Today", "85b7a.svg", "85b7a.svg", "today"],
  ["Learn", "0a21f.svg", "0a21f.svg", "learn"],
  ["Recite", "9a82d.svg", "9a82d.svg", "recite"],
  ["Arena", "bacc4.svg", "045bc.svg", "arena"],
  ["You", "ff763.svg", "37e32.svg", "profile"],
];

const journeyNavIcons: Record<string, string> = {
  Today: "40a0d.svg",
  Learn: "34aec.svg",
  Recite: "213f1.svg",
  Arena: "f5fe2.svg",
  You: "03dc1.svg",
};

function BottomNav({
  active,
  go,
  journeyIcons = false,
}: {
  active: "Today" | "Learn" | "Recite" | "Arena" | "You";
  go: (screen: Screen) => void;
  journeyIcons?: boolean;
}) {
  return (
    <nav className="bottom-nav">
      {navItems.map(([label, icon, activeIcon, destination]) => (
        <button
          className={label === active ? "active" : ""}
          key={label}
          onClick={() => go(destination)}
        >
          <Icon
            name={journeyIcons ? journeyNavIcons[label] : label === active ? activeIcon : icon}
            size={22}
          />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Today({ go }: { go: (screen: Screen) => void }) {
  const cards = [
    ["Hifz", "2 ayahs today", "a6433.svg", "mint", "hifz"],
    ["Revision", "3 surahs due", "61bb7.svg", "peach", "revision"],
    ["Recitation", "Find your flow", "28d7c.svg", "lilac", "verse"],
    ["Hadith", "Start with intention", "a6433.svg", "mint", "hifz"],
  ];
  return (
    <main className="screen today">
      <p className="today-greeting">ASSALAMU ALAIKUM, AMINA</p>
      <h1>Let’s keep growing.</h1>
      <button className="today-bell" aria-label="Notifications" onClick={() => go("notifications")}>
        <Icon name="a89f2.svg" size={22} />
      </button>
      <div className="today-pills">
        <span>7-day streak</span>
        <span>240 learning XP</span>
      </div>
      <button className="seed-card" onClick={() => go("verse")}>
        <small>YOUR DAILY SEED</small>
        <h2>
          A little effort.
          <br />
          Lasting roots.
        </h2>
        <Garden variant="small" />
        <p>6 / 10 min</p>
        <div className="progress">
          <i />
        </div>
        <strong>Continue Al-Ikhlas</strong>
        <Icon name="49ab6.svg" size={18} />
      </button>
      <div className="practice-heading">
        <h2>Your practice</h2>
        <button onClick={() => go("hifz")}>See plan</button>
      </div>
      <div className="practice-grid">
        {cards.map(([title, copy, icon, color, destination]) => (
          <button
            className={`practice-card ${color}`}
            key={title}
            onClick={() => go(destination as Screen)}
          >
            <Icon name={icon} size={22} />
            <strong>{title}</strong>
            <small>{copy}</small>
          </button>
        ))}
      </div>
      <button className="arabic-card" onClick={() => go("arabic")}>
        <span>ع</span>
        <strong>Learn Arabic</strong>
        <small>Letters, words &amp; deeper meaning</small>
      </button>
      <button className="stories-card" onClick={() => go("stories")}>
        <Icon name="b6268.svg" size={21} />
        <strong>Stories are almost yours</strong>
        <small>Finish your goal to unlock today’s stories</small>
      </button>
      <BottomNav active="Today" go={go} />
    </main>
  );
}

function Hifz({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen hifz">
      <Back onClick={() => go("learn")} eyebrow="LEARN · HIFZ" icon="2055b.svg" />
      <h1 className="page-title">Your Hifz journey</h1>
      <p className="page-subtitle">Every ayah is a step worth celebrating.</p>
      <div className="segmented hifz-tabs">
        <button className="active">Hifz</button>
        <button onClick={() => go("hadith")}>Hadith</button>
        <button onClick={() => go("tajweed")}>Tajweed</button>
      </div>
      <button className="unit-card">
        <small>BEGINNER · UNIT 1</small>
        <strong>A beautiful beginning</strong>
        <span>Short surahs · 2 of 4 lessons complete</span>
      </button>
      <div className="learning-path">
        <img src={`${A}/0acc0.svg`} alt="" />
        <div className="path-node node-one complete-node">
          <Icon name="708a9.svg" size={24} />
          <span>Al-Fatihah</span>
        </div>
        <div className="path-node node-two complete-node">
          <Icon name="708a9.svg" size={24} />
          <span>Al-Falaq</span>
        </div>
        <button className="path-node node-three current-node" onClick={() => go("verse")}>
          <Icon name="c39c8.svg" size={24} />
          <span>Al-Ikhlas</span>
        </button>
        <button className="continue-pill" onClick={() => go("verse")}>
          CONTINUE
        </button>
        <button className="path-node node-four locked-node" onClick={() => go("checkpoint")}>
          <Icon name="8d3c6.svg" size={24} />
          <span>Checkpoint</span>
        </button>
      </div>
      <BottomNav active="Learn" go={go} journeyIcons />
    </main>
  );
}

const reciterNames = [
  "Mishary Alafasy",
  "Abdul Rahman Al-Sudais",
  "Saud Al-Shuraim",
  "Maher Al-Muaiqly",
  "Abdul Basit Abdus Samad",
  "Minshawi",
  "Husary",
  "Saad Al-Ghamdi",
  "Yasser Al-Dosari",
  "Nasser Al-Qatami",
  "Ahmed Al-Ajmi",
  "Abdullah Basfar",
  "Ibrahim Al-Akhdar",
  "Abu Bakr Al-Shatri",
];

function Verse({ go }: { go: (screen: Screen) => void }) {
  const [mode, setMode] = useState("Listen");
  const [reciter, setReciter] = useState("Mishary Alafasy");
  const [choosingReciter, setChoosingReciter] = useState(false);
  return (
    <main className="screen verse">
      <Back onClick={() => go("hifz")} eyebrow="HIFZ · AL-IKHLAS" />
      <h1 className="page-title">Let it settle in.</h1>
      <p className="page-subtitle">Listen. Repeat. Then try from memory.</p>
      <div className="lesson-progress">
        <i />
      </div>
      <div className="verse-meta">
        <span>Ayah 3 of 4</span>
        <span>Hafs · ʿAsim</span>
      </div>
      <div className="ayah-card">
        <small>112 : 3</small>
        <p className="arabic-ayah" dir="rtl">
          لَمْ يَلِدْ وَلَمْ يُولَدْ
        </p>
        <p className="translation">
          He has never had offspring,
          <br />
          nor was He born.
        </p>
        <em>The Clear Quran · Dr. Mustafa Khattab</em>
      </div>
      <button className="reciter" onClick={() => setChoosingReciter(true)}>
        <Icon name="3fd00.svg" size={26} />
        <span>
          <strong>{reciter}</strong>
          <small>Repeat 3× &nbsp;·&nbsp; 0.75× speed</small>
        </span>
      </button>
      <p className="eyebrow your-turn">YOUR TURN</p>
      <div className="segmented practice-modes">
        {["Listen", "Repeat", "Recall"].map((item) => (
          <button
            className={mode === item ? "active" : ""}
            onClick={() => setMode(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="verse-cta">
        <PrimaryButton icon="f4efa.svg" onClick={() => go("recall")}>
          Hide ayah &amp; practice
        </PrimaryButton>
      </div>
      {choosingReciter && (
        <div className="reciter-sheet verse-reciter-sheet">
          <i className="sheet-handle" />
          <button onClick={() => setChoosingReciter(false)}>×</button>
          <h2>Choose your reciter</h2>
          <p>Hafs ʿan ʿAsim · Murattal recitations</p>
          <input aria-label="Find a reciter" placeholder="⌕   Find a reciter" />
          <div className="reciter-catalog">
            {reciterNames.map((name) => (
              <button
                key={name}
                onClick={() => {
                  setReciter(name);
                  setChoosingReciter(false);
                }}
              >
                <strong>{name}</strong>
                <small>Hafs ʿan ʿAsim · Murattal</small>
                <Arrow />
              </button>
            ))}
          </div>
          <p className="reciter-help">Tap a name to select and return to listening.</p>
        </div>
      )}
    </main>
  );
}

function Checkpoint({ go }: { go: (screen: Screen) => void }) {
  const rows = [
    ["9803a.svg", "Recall every word, in the right order."],
    ["c9ad5.svg", "Pass again at your next revision."],
    ["c5bea.svg", "Ask a teacher to review if needed."],
  ];
  return (
    <main className="screen checkpoint">
      <Back onClick={() => go("hifz")} eyebrow="BEGINNER · CHECKPOINT" />
      <h1 className="page-title">Ready for the next step?</h1>
      <p className="page-subtitle">Recite Al-Ikhlas without looking.</p>
      <div className="level-up">Level 1 → Level 2</div>
      <div className="challenge">
        <Icon name="b638f.svg" size={42} />
        <h2>A calm space for recall</h2>
        <p>4 ayahs · No timer · Unlimited retries</p>
        <p>
          Text stays hidden while you recite.
          <br />
          Request a hint whenever you need one.
        </p>
      </div>
      <div className="checkpoint-rows">
        {rows.map(([icon, copy]) => (
          <div key={copy}>
            <Icon name={icon} size={19} />
            <span>{copy}</span>
          </div>
        ))}
      </div>
      <p className="checkpoint-note">
        AI checks words, not certified tajweed.
        <br />
        Passing unlocks the next memorization level.
      </p>
      <div className="verse-cta">
        <PrimaryButton icon="f4efa.svg" onClick={() => go("checkpoint-recall")}>
          Start checkpoint
        </PrimaryButton>
      </div>
    </main>
  );
}

function Complete({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen complete">
      <div className="complete-badge">DAILY GOAL COMPLETE</div>
      <Garden variant="complete" />
      <h1>
        You showed up.
        <br />
        You grew a little.
      </h1>
      <p>
        2 new ayahs. A stronger connection.
        <br />
        Alhamdulillah for another meaningful day.
      </p>
      <div className="rewards">
        <div>
          <strong>+40</strong>
          <span>Learning XP</span>
        </div>
        <div>
          <strong>7 days</strong>
          <span>Your streak</span>
        </div>
      </div>
      <div className="unlock-pill">Stories unlocked · Enjoy a mindful break</div>
      <div className="complete-cta">
        <PrimaryButton icon="04eab.svg" onClick={() => go("stories")}>
          Explore today’s stories
        </PrimaryButton>
      </div>
      <button className="text-link complete-back" onClick={() => go("today")}>
        Back to my journey
      </button>
    </main>
  );
}

function Revision({ go }: { go: (screen: Screen) => void }) {
  const rows = [
    ["Al-Fatihah", "7 ayahs · Due today", "Needs a little care"],
    ["Al-Falaq", "5 ayahs · Due today", "Growing stronger"],
    ["An-Nas", "6 ayahs · Due today", "Growing stronger"],
  ];
  return (
    <main className="screen revision">
      <Back onClick={() => go("today")} eyebrow="KEEP IT STRONG" />
      <h1 className="page-title">Your revision garden</h1>
      <p className="page-subtitle">Nurture what you’ve already planted.</p>
      <div className="segmented revision-tabs">
        <button className="active">My memorization</button>
        <button onClick={() => go("revision-plan")}>Full Qur’an</button>
      </div>
      <div className="revision-summary">
        <h2>3 surahs ready for review</h2>
        <p>Spaced for stronger, lasting recall.</p>
        <span>About 6 minutes</span>
      </div>
      <h2 className="queue-title">Today’s review queue</h2>
      <div className="review-list">
        {rows.map(([title, subtitle, note]) => (
          <button key={title} onClick={() => title === "Al-Fatihah" && go("revision-session")}>
            <Icon name="6af88.svg" size={23} />
            <span>
              <strong>{title}</strong>
              <small>{subtitle}</small>
              <em>{note}</em>
            </span>
            <Icon name="5d9d0.svg" size={18} />
          </button>
        ))}
      </div>
      <button className="revision-note" onClick={() => go("revision-plan")}>
        Completed Hifz? Build a full-Qur’an revision plan.
      </button>
      <BottomNav active="Learn" go={go} />
    </main>
  );
}

const Arrow = () => <span className="row-arrow">›</span>;

function HubHeader({
  eyebrow,
  title,
  subtitle,
  back,
  go,
  instant = false,
  backIcon = "d22ed.svg",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  back: Screen;
  go: (screen: Screen, instant?: boolean) => void;
  instant?: boolean;
  backIcon?: string;
}) {
  return (
    <header className="hub-header">
      <button onClick={() => go(back, instant)} aria-label="Back">
        <Icon name={backIcon} size={22} />
      </button>
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

function FeatureRow({
  title,
  copy,
  tone = "white",
  icon,
  onClick,
}: {
  title: string;
  copy: string;
  tone?: "white" | "sage" | "peach" | "lilac";
  icon?: string;
  onClick?: () => void;
}) {
  return (
    <button className={`feature-row ${tone}`} onClick={onClick}>
      {icon && <Icon name={icon} size={24} />}
      <span>
        <strong>{title}</strong>
        <small>{copy}</small>
      </span>
      {!icon && <Arrow />}
    </button>
  );
}

function LearnHub({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen hub-screen">
      <HubHeader
        eyebrow="YOUR LEARNING"
        title="Many ways to grow."
        subtitle="Choose where you want to begin today."
        back="today"
        go={go}
      />
      <div className="hub-list learn-list">
        <FeatureRow
          title="Hifz journey"
          copy="Memorize, one ayah at a time"
          tone="sage"
          onClick={() => go("hifz")}
        />
        <FeatureRow
          title="Tajweed academy"
          copy="Care for every sound"
          tone="peach"
          onClick={() => go("tajweed")}
        />
        <FeatureRow
          title="Hadith library"
          copy="Words to live by"
          tone="lilac"
          onClick={() => go("hadith")}
        />
        <FeatureRow
          title="Learn Arabic"
          copy="Letters, words & deeper meaning"
          tone="sage"
          onClick={() => go("arabic")}
        />
        <FeatureRow
          title="Your saved collection"
          copy="Return to what moved you"
          onClick={() => go("saved")}
        />
      </div>
      <BottomNav active="Learn" go={go} />
    </main>
  );
}

function Recite({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen hub-screen">
      <HubHeader
        eyebrow="RECITATION"
        title="Find your voice."
        subtitle="A space to listen, learn, and recite with care."
        back="today"
        go={go}
      />
      <button className="dark-feature recite-feature" onClick={() => go("reader")}>
        <small>CONTINUE READING</small>
        <h2>Al-Ikhlas</h2>
        <p>Surah 112 · 4 ayahs · Meccan</p>
        <Icon name="e56b8.svg" size={39} />
        <strong>Open Qur’an</strong>
        <Arrow />
      </button>
      <h2 className="section-title recite-title">How would you like to recite?</h2>
      <div className="hub-list recite-list">
        <FeatureRow
          title="Learn to recite"
          copy="Guided lessons, from letters to verses"
          tone="sage"
          icon="7040a.svg"
          onClick={() => go("arabic-path")}
        />
        <FeatureRow
          title="Recite with AI"
          copy="Practice recall with word-level feedback"
          tone="peach"
          icon="3fb09.svg"
          onClick={() => go("record")}
        />
        <FeatureRow
          title="Read & listen"
          copy="Explore all 114 surahs at your own pace"
          icon="91e1a.svg"
          onClick={() => go("quran-library")}
        />
      </div>
      <button className="inline-link" onClick={() => go("tajweed")}>
        Explore Tajweed →
      </button>
      <BottomNav active="Recite" go={go} />
    </main>
  );
}

function Tajweed({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen hub-screen">
      <HubHeader
        eyebrow="LEARN · TAJWEED"
        title={
          <>
            Beautiful recitation,
            <br />
            one rule at a time.
          </>
        }
        subtitle="Listen closely. Practice gently."
        back="learn"
        go={go}
      />
      <div className="course-card">
        <small>THE FOUNDATIONS</small>
        <h2>Give every letter its right.</h2>
        <p>2 of 12 lessons complete</p>
        <div>
          <i />
        </div>
      </div>
      <div className="hub-list course-list">
        <FeatureRow
          title="Letter articulation"
          copy="Makharij · Completed"
          tone="sage"
          icon="45d46.svg"
        />
        <FeatureRow
          title="Short & long vowels"
          copy="Harakat and madd · Completed"
          tone="sage"
          icon="45d46.svg"
        />
        <FeatureRow
          title="The gentle nasal sound"
          copy="Ghunnah · Up next"
          tone="peach"
          icon="7a441.svg"
          onClick={() => go("lesson")}
        />
        <FeatureRow
          title="Noon sakinah & tanween"
          copy="Idhhar, idgham, iqlab, ikhfa"
          icon="ef9b9.svg"
        />
      </div>
      <p className="screen-note">Guided by qualified reciters. No speed pressure.</p>
      <BottomNav active="Learn" go={go} />
    </main>
  );
}

function Hadith({ go }: { go: (screen: Screen) => void }) {
  const items = [
    ["01", "Begin with intention", "Sahih al-Bukhari 1 · Opening excerpt"],
    ["02", "The best among you", "Sahih al-Bukhari 5027"],
    ["03", "A good word is charity", "Sahih al-Bukhari 2989 · Excerpt"],
  ];
  return (
    <main className="screen hub-screen">
      <HubHeader
        eyebrow="LEARN · HADITH"
        title="Words to live by."
        subtitle="Memorize with meaning. Carry it into your day."
        back="learn"
        go={go}
      />
      <FeatureRow
        title="Authenticity comes first"
        copy="Collection, reference & grade on every lesson."
        tone="sage"
        icon="fc9f8.svg"
      />
      <div className="filter-pills">
        <b>Short hadiths</b>
        <span>Qudsi</span>
        <span>Prophetic</span>
        <span>Long narrations</span>
      </div>
      <p className="list-label">START WITH THE ESSENTIALS</p>
      <div className="hadith-list">
        {items.map(([n, t, c], i) => (
          <button className={i === 0 ? "selected" : ""} key={n} onClick={() => go("hadith-detail")}>
            <em>{n}</em>
            <span>
              <strong>{t}</strong>
              <small>{c}</small>
            </span>
          </button>
        ))}
      </div>
      <p className="screen-note">Qudsi is a narration type, not an authenticity grade.</p>
      <BottomNav active="Learn" go={go} />
    </main>
  );
}

function Arena({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen hub-screen">
      <HubHeader
        eyebrow="QUR’ANLY ARENA"
        title="Rise through practice."
        subtitle="A shared challenge. A personal journey."
        back="today"
        go={go}
        backIcon="b3a2f.svg"
      />
      <div className="arena-tabs">
        <b>Upcoming</b>
        <span>My entries</span>
        <span>Previous</span>
      </div>
      <button className="dark-feature arena-feature" onClick={() => go("challenge")}>
        <mark>OPEN FOR ENTRY</mark>
        <Icon name="c76c5.svg" size={55} />
        <h2>
          The Juz ʿAmma
          <br />
          Challenge
        </h2>
        <p>Beginner · Live online · Hafs</p>
        <strong>21 Nov 2026 · 17:00 UTC</strong>
        <small>View challenge →</small>
      </button>
      <h2 className="section-title arena-title">More ways to grow</h2>
      <div className="hub-list arena-list">
        <FeatureRow
          title="Intermediate circle"
          copy="28 Nov · Selected surahs · Online"
          tone="sage"
          icon="35ef4.svg"
          onClick={() => go("challenge")}
        />
        <FeatureRow
          title="Full-Qur’an showcase"
          copy="05 Dec · Expert · Applications open"
          tone="peach"
          icon="35ef4.svg"
          onClick={() => go("challenge")}
        />
      </div>
      <p className="screen-note">Qualified judges. Published rubrics. Private recordings.</p>
      <BottomNav active="Arena" go={go} />
    </main>
  );
}

function CompetitionDetails({ go }: { go: (screen: Screen) => void }) {
  const rubric = [
    ["Memorization", "50%", 50],
    ["Tajweed", "30%", 30],
    ["Fluency & pacing", "20%", 20],
  ] as const;
  return (
    <main className="screen competition-details">
      <Back onClick={() => go("arena")} eyebrow="COMPETITION · BEGINNER" icon="b3a2f.svg" />
      <h1 className="competition-title">
        The Juz ʿAmma
        <br />
        Challenge
      </h1>
      <div className="competition-pills">
        <span>LIVE ONLINE</span>
        <span>Hafs · ʿAsim</span>
      </div>
      <div className="competition-schedule">
        <Icon name="33562.svg" size={28} />
        <strong>21 Nov 2026 · 17:00 UTC</strong>
        <small>Your local time shown after entry</small>
      </div>
      <section className="expectation">
        <h2>Know what to expect</h2>
        <p>
          Recite a randomly selected passage from
          <br />
          Juz ʿAmma. Up to 5 minutes. Two human judges.
        </p>
        <b>A CLEAR, PUBLISHED RUBRIC</b>
        <div className="rubric">
          {rubric.map(([label, percentage, width]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{percentage}</strong>
              <i>
                <em style={{ width: `${width}%` }} />
              </i>
            </div>
          ))}
        </div>
      </section>
      <p className="competition-fineprint">
        Free entry · Registration closes 19 Nov
        <br />
        Connection retry policy &amp; 48-hour appeal window
      </p>
      <button className="competition-action" onClick={() => go("competition-entry")}>
        <span>Apply for this challenge</span>
        <Icon name="ac908.svg" size={20} />
      </button>
      <button className="competition-rules">Read full rules &amp; privacy details</button>
    </main>
  );
}

function CompetitionEntry({ go }: { go: (screen: Screen) => void }) {
  const [rubric, setRubric] = useState(true);
  const [recording, setRecording] = useState(true);
  return (
    <main className="screen competition-entry">
      <Back onClick={() => go("challenge")} eyebrow="COMPETITION · YOUR ENTRY" icon="b3a2f.svg" />
      <h1 className="page-title">Save your place.</h1>
      <p className="page-subtitle">The Juz ʿAmma Challenge · 21 Nov 2026</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          go("entry-confirmed");
        }}
      >
        <label>
          Participant name
          <input defaultValue="Amina Yusuf" />
        </label>
        <label>
          Category
          <button type="button">
            Beginner · Juz ʿAmma <Icon name="2951f.svg" size={17} />
          </button>
        </label>
        <label>
          Riwayah
          <button type="button">
            Hafs ʿan ʿAsim <Icon name="2951f.svg" size={17} />
          </button>
        </label>
        <div className="mic-ready">
          <Icon name="d6d5c.svg" size={24} />
          <strong>Microphone check passed</strong>
          <small>Try again · Headphones recommended</small>
        </div>
        <button className="entry-consent" type="button" onClick={() => setRubric(!rubric)}>
          <span>{rubric && <Icon name="6d7f6.svg" size={21} />}</span>I accept the judging rubric
          and retry rules.
        </button>
        <button
          className="entry-consent recording"
          type="button"
          onClick={() => setRecording(!recording)}
        >
          <span>{recording && <Icon name="6d7f6.svg" size={21} />}</span>
          <i>
            I consent to a private judging recording.
            <small>Only judges and appeal reviewers can access it.</small>
          </i>
        </button>
        <p className="guardian-note">
          Under 18? Guardian consent is required.
          <br />
          No public posting without separate permission.
        </p>
        <button className="competition-action" type="submit">
          <span>Confirm my entry</span>
          <Icon name="a41d0.svg" size={20} />
        </button>
      </form>
    </main>
  );
}

function EntryConfirmed({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen entry-confirmed">
      <div className="registered-pill">YOU’RE REGISTERED</div>
      <div className="registered-mark">
        <Icon name="da6df.svg" size={46} />
      </div>
      <h1>Your place is saved.</h1>
      <h2>The Juz ʿAmma Challenge</h2>
      <button className="confirmed-date" onClick={() => go("live-assessment")}>
        <strong>21 November 2026</strong>
        <b>17:00 UTC · Live online</b>
        <small>Join 10 minutes early for your sound check.</small>
      </button>
      <div className="confirmed-list">
        <p>
          <Icon name="90944.svg" size={20} />
          Reminder set for 30 minutes before
        </p>
        <p>
          <Icon name="099ba.svg" size={20} />
          Microphone check complete
        </p>
        <p>
          <Icon name="0c429.svg" size={20} />
          Your session is private
        </p>
      </div>
      <button className="competition-action calendar-action" onClick={() => go("live-assessment")}>
        <span>Add to my calendar</span>
        <Icon name="823cb.svg" size={20} />
      </button>
      <button className="entry-links" onClick={() => go("challenge")}>
        View my entry&nbsp; · &nbsp;Withdraw entry
      </button>
    </main>
  );
}

const waveform = [
  7, 41, 16, 38, 24, 34, 31, 28, 36, 20, 40, 12, 41, 11, 40, 19, 37, 27, 32, 33, 25, 38, 17, 41, 8,
  41, 14, 39, 23, 35, 30, 29, 35, 22, 39, 13, 41,
];

function LiveAssessment({ go }: { go: (screen: Screen, instant?: boolean) => void }) {
  return (
    <main className="screen live-assessment dark-room">
      <button className="room-back" onClick={() => go("entry-confirmed")} aria-label="Back">
        ‹
      </button>
      <div className="live-pill">LIVE · PRIVATE SESSION</div>
      <h1>Your moment to recite.</h1>
      <p className="assessment-subtitle">The Juz ʿAmma Challenge</p>
      <div className="passage-card">
        <b>YOUR ASSIGNED PASSAGE</b>
        <Icon name="02a92.svg" size={53} />
        <h2>Al-Falaq · 113:1–5</h2>
        <p>Begin when the judge invites you.</p>
      </div>
      <div className="live-waveform">
        {waveform.map((height, index) => (
          <i key={index} style={{ height }} />
        ))}
      </div>
      <div className="assessment-time">01:42 / 05:00</div>
      <p className="connection-copy">Microphone on · Connection stable</p>
      <div className="judges-listening">
        <Icon name="420b5.svg" size={25} />
        <strong>Two qualified judges are listening</strong>
        <small>Your recording is not public.</small>
      </div>
      <button className="room-gold-action" onClick={() => go("device-check", true)}>
        Enter live video challenge <Icon name="0128e.svg" size={20} />
      </button>
    </main>
  );
}

function DeviceCheck({ go }: { go: (screen: Screen, instant?: boolean) => void }) {
  return (
    <main className="screen dark-room device-check">
      <b className="room-kicker">BEFORE YOU JOIN</b>
      <h1>Make yourself comfortable.</h1>
      <VideoTile src="17efa.png" label="Your camera preview" className="camera-preview" />
      <div className="device-status">
        ✓ Camera connected
        <br />✓ Microphone detected
        <br />✓ Connection is stable
      </div>
      <p className="device-privacy">
        This room is private. Judges and participants can see
        <br />
        your video. Recording requires your consent.
      </p>
      <button className="room-gold-action" onClick={() => go("video-room", true)}>
        Join challenge room
      </button>
      <button className="room-sage-action" onClick={() => go("live-assessment", true)}>
        Back to assessment
      </button>
    </main>
  );
}

function VideoTile({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`video-tile ${className}`}>
      <img src={`${A}/${src}`} alt="" />
      <strong>{label}</strong>
    </div>
  );
}

function VideoRoom({ go }: { go: (screen: Screen, instant?: boolean) => void }) {
  const [leaving, setLeaving] = useState(false);
  return (
    <main className="screen dark-room video-room">
      <b className="room-kicker">● LIVE · PRIVATE CHALLENGE</b>
      <h1>The Juz ʿAmma Challenge</h1>
      <p className="room-meta">6 in this room&nbsp; · &nbsp;Connection stable</p>
      <VideoTile src="17efa.png" label="Amina Yusuf · You are reciting" className="speaker-video" />
      <VideoTile src="4abda.png" label="Maryam · Judge" className="judge-video judge-one" />
      <VideoTile src="9d355.png" label="Abdullah · Judge" className="judge-video judge-two" />
      <div className="turn-card">
        <b>YOUR TURN · 01:42 / 05:00</b>
        <strong>Al-Falaq · 113:1–5</strong>
      </div>
      <div className="room-controls">
        <button>Mic on</button>
        <button>Camera</button>
        <button onClick={() => go("participants", true)}>People · 6</button>
        <button className="leave-control" onClick={() => setLeaving(true)}>
          Leave
        </button>
      </div>
      <button className="finish-turn" onClick={() => go("arena", true)}>
        Finish my turn
      </button>
      {leaving && (
        <div className="leave-scrim" role="presentation" onClick={() => setLeaving(false)}>
          <section
            className="leave-dialog"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>Leave the challenge room?</h2>
            <p>
              Your turn has not been submitted. You can rejoin
              <br />
              while the session is open. Judges will be notified.
            </p>
            <button onClick={() => setLeaving(false)}>Stay in the room</button>
            <button onClick={() => go("arena", true)}>Leave room</button>
          </section>
        </div>
      )}
    </main>
  );
}

const participants = [
  ["4abda.png", "Maryam · Judge"],
  ["9d355.png", "Abdullah · Judge"],
  ["17efa.png", "Amina · Reciting"],
  ["4924e.png", "Omar · Up next"],
  ["f6f6d.png", "Fatima · Waiting"],
  ["a4929.png", "Yusuf · Waiting"],
];

function Participants({ go }: { go: (screen: Screen, instant?: boolean) => void }) {
  return (
    <main className="screen dark-room participants-screen">
      <b className="room-kicker">● LIVE · ROOM A</b>
      <h1>Together, with care.</h1>
      <p className="room-meta">2 judges · 4 participants · Everyone visible</p>
      <div className="participant-grid">
        {participants.map(([src, label]) => (
          <VideoTile key={label} src={src} label={label} />
        ))}
      </div>
      <button className="room-sage-action" onClick={() => go("video-room", true)}>
        Return to speaker view
      </button>
    </main>
  );
}

function Profile({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen profile-screen">
      <h1>Your growing journey</h1>
      <button className="settings-button" onClick={() => go("account-privacy")}>
        <Icon name="43fe9.svg" size={22} />
      </button>
      <section className="profile-card">
        <h2>Amina Yusuf</h2>
        <b>Beginner · Level 1</b>
        <small>Growing since November 2026</small>
        <div className="profile-garden" aria-hidden="true">
          <img className="pg-arch" src={`${A}/784d7.svg`} alt="" />
          <img className="pg-garden" src={`${A}/d69d4.svg`} alt="" />
          <img className="pg-stand" src={`${A}/edb56.svg`} alt="" />
          <img className="pg-cover" src={`${A}/5edb8.svg`} alt="" />
          <img className="pg-pages" src={`${A}/4211d.svg`} alt="" />
          <img className="pg-sparkles" src={`${A}/a517c.svg`} alt="" />
        </div>
      </section>
      <div className="stats">
        <div>
          <strong>7</strong>
          <small>Day streak</small>
        </div>
        <div>
          <strong>240</strong>
          <small>Learning XP</small>
        </div>
        <div>
          <strong>3</strong>
          <small>Surahs learned</small>
        </div>
      </div>
      <h2 className="profile-heading week-heading">This week, you showed up.</h2>
      <div className="week">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={`${d}${i}`} className={i < 3 ? "done" : i === 3 ? "today-dot" : ""}>
            <b>
              {i < 3 ? (
                <Icon name="76ee0.svg" size={16} />
              ) : i === 3 ? (
                <Icon name="5540c.svg" size={16} />
              ) : (
                ""
              )}
            </b>
            <small>{d}</small>
          </span>
        ))}
      </div>
      <h2 className="profile-heading milestone-heading">Milestones worth keeping</h2>
      <div className="milestones">
        <div>
          <Icon name="33ff7.svg" size={34} />
          <small>First steps</small>
        </div>
        <div>
          <Icon name="fc03b.svg" size={34} />
          <small>7-day rhythm</small>
        </div>
        <div>
          <Icon name="b1cd6.svg" size={34} />
          <small>First challenge</small>
        </div>
      </div>
      <button className="preferences-link" onClick={() => go("preferences")}>
        Goals &amp; preferences <Arrow />
      </button>
      <BottomNav active="You" go={go} />
    </main>
  );
}

function Arabic({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen hub-screen">
      <HubHeader
        eyebrow="LEARN · ARABIC"
        title={
          <>
            A new language.
            <br />A deeper connection.
          </>
        }
        subtitle="Begin with letters. Grow into meaning."
        back="learn"
        go={go}
      />
      <button className="dark-feature arabic-feature" onClick={() => go("arabic-path")}>
        <small>YOUR STARTING POINT</small>
        <h2>Small words. Open doors.</h2>
        <p>Letters → Words → Simple phrases</p>
        <strong>Explore your path →</strong>
      </button>
      <div className="hub-list arabic-list">
        <FeatureRow
          title="The Arabic alphabet"
          copy="28 letters · Start from the beginning"
          tone="sage"
          onClick={() => go("arabic-path")}
        />
        <FeatureRow
          title="Words from the Qur’an"
          copy="Build a meaningful vocabulary"
          tone="peach"
          onClick={() => go("arabic-words")}
        />
        <FeatureRow
          title="My word garden"
          copy="Review the words you have learned"
          tone="lilac"
          onClick={() => go("vocabulary")}
        />
      </div>
      <button className="speak-card" onClick={() => go("lesson")}>
        <strong>Speak Arabic, with confidence</strong>
        <small>Beginner → Advanced · Everyday conversation ›</small>
      </button>
      <BottomNav active="Learn" go={go} />
    </main>
  );
}

function SignIn({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen signin-screen">
      <HubHeader
        eyebrow="WELCOME BACK"
        title="Your journey continues."
        subtitle="Let’s return to what matters."
        back="welcome"
        go={go}
      />
      <div className="signin-art">
        <Garden variant="signin" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go("today");
        }}
      >
        <label>
          Email address
          <input type="email" defaultValue="amina@example.com" />
        </label>
        <label>
          Password
          <input type="password" defaultValue="quranly12345" />
        </label>
        <button type="button" className="forgot-link" onClick={() => go("forgot")}>
          Forgot password?
        </button>
        <PrimaryButton onClick={() => go("today")}>Sign in</PrimaryButton>
        <button type="button" className="secondary-button" onClick={() => go("today")}>
          Continue with Apple
        </button>
      </form>
      <button className="text-link signin-create" onClick={() => go("account")}>
        New here? Create an account
      </button>
    </main>
  );
}

function Stories({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen stories-screen">
      <HubHeader
        eyebrow="A MINDFUL REWARD"
        title="First, a little growth."
        subtitle="Your stories will be here when you finish."
        back="today"
        go={go}
      />
      <div className="story-preview">
        <img src={`${A}/096a7.svg`} alt="" />
        <span>
          <Icon name="9a3ba.svg" size={28} />
        </span>
        <h2>A meaningful break awaits</h2>
        <p>Stories of the prophets · Qur’an reflections</p>
      </div>
      <div className="story-progress">
        <h2>4 more minutes to your goal</h2>
        <div>
          <i />
        </div>
        <p>6 of 10 minutes complete</p>
      </div>
      <p className="story-copy">
        Learn first. Unwind with intention.
        <br />
        Stories unlock after your daily learning goal.
      </p>
      <div className="story-cta">
        <PrimaryButton icon="fae77.svg" onClick={() => go("story-unlocked")}>
          Continue my daily practice
        </PrimaryButton>
      </div>
      <button className="text-link story-manage" onClick={() => go("preferences")}>
        Manage story rewards
      </button>
    </main>
  );
}

function StoryUnlocked({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen story-unlocked">
      <div className="story-scene">
        {[
          "75e4e.svg",
          "eaca1.svg",
          "2f2a1.svg",
          "776fd.svg",
          "3bead.svg",
          "7a3a1.svg",
          "b0632.svg",
          "90116.svg",
          "8e4a8.svg",
        ].map((asset) => (
          <img key={asset} src={`${A}/${asset}`} alt="" />
        ))}
      </div>
      <button className="story-back" onClick={() => go("today")} aria-label="Back">
        ‹
      </button>
      <h1>For your heart</h1>
      <span className="story-duration">5 min mindful break</span>
      <button className="story-play" aria-label="Play story">
        ▶
      </button>
      <div className="story-side-actions">
        <b>♡</b>
        <small>Save</small>
        <b>▱</b>
        <small>Source</small>
      </div>
      <section>
        <small>STORIES OF THE PROPHETS</small>
        <h2>A lesson in certainty</h2>
        <p>Reflections on Prophet Ibrahim’s story</p>
        <em>Qur’an 6:75–79 · Illustrated story · 03:20</em>
        <div>
          <i />
        </div>
        <button onClick={() => go("today")}>Continue my daily practice ↑</button>
      </section>
    </main>
  );
}

function ArabicPath({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen arabic-path-screen">
      <Back onClick={() => go("learn")} eyebrow="ARABIC · FOUNDATIONS" />
      <h1 className="page-title">Your first roots.</h1>
      <p className="page-subtitle">Learn the shapes before you join the words.</p>
      <section className="arabic-unit">
        <small>UNIT 1 · THE ALPHABET</small>
        <h2>Meet your first letters.</h2>
        <p>3 short lessons · Listen, trace, recall</p>
      </section>
      <div className="arabic-lessons">
        <button onClick={() => go("lesson")}>
          <b>01</b>
          <span>
            <strong>ا · ب · ت</strong>
            <small>Three letters · Ready to begin</small>
          </span>
          <em>›</em>
        </button>
        <button>
          <b>02</b>
          <span>
            <strong>ث · ج · ح</strong>
            <small>Unlock after lesson 1</small>
          </span>
          <em>○</em>
        </button>
        <button>
          <b>03</b>
          <span>
            <strong>خ · د · ذ</strong>
            <small>Unlock after lesson 2</small>
          </span>
          <em>○</em>
        </button>
      </div>
      <div className="arabic-path-cta">
        <PrimaryButton onClick={() => go("lesson")}>Begin lesson 1</PrimaryButton>
      </div>
    </main>
  );
}

function ArabicWords({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen arabic-word-screen">
      <Back onClick={() => go("arabic")} eyebrow="ARABIC · WORDS 2 OF 3" />
      <h1 className="page-title">A word to carry with you.</h1>
      <p className="page-subtitle">Hear it. Understand it. Keep it close.</p>
      <div className="word-progress">
        <i />
      </div>
      <section className="word-card">
        <small>WORD 2 OF 3</small>
        <p dir="rtl">كِتَاب</p>
        <h2>kitāb</h2>
        <strong>a book</strong>
        <hr />
        <span>
          The long <b>ā</b> sound comes from the letter alif.
        </span>
      </section>
      <div className="arabic-word-cta">
        <PrimaryButton onClick={() => go("arabic-practice")}>Try a quick practice</PrimaryButton>
      </div>
    </main>
  );
}

function ArabicPractice({
  go,
  result,
}: {
  go: (screen: Screen) => void;
  result?: "retry" | "correct";
}) {
  const feedback =
    result === "retry"
      ? "Not quite. You’re still learning."
      : result === "correct"
        ? "That’s right. Kitāb means “a book”."
        : "";
  return (
    <main className="screen arabic-practice-screen">
      <Back onClick={() => go("arabic")} eyebrow="ARABIC · QUICK PRACTICE" />
      <h1 className="page-title">What does this mean?</h1>
      <p className="page-subtitle">Choose the meaning of the word.</p>
      <section className="practice-word">
        <small>READ THE WORD</small>
        <p dir="rtl">كِتَاب</p>
        <span>kitāb</span>
      </section>
      <div className="meaning-choices">
        <button
          className={result === "correct" ? "correct" : ""}
          onClick={() => go("arabic-correct")}
        >
          A book {result === "correct" && <b>✓</b>}
        </button>
        <button className={result === "retry" ? "wrong" : ""} onClick={() => go("arabic-retry")}>
          A house {result === "retry" && <b>×</b>}
        </button>
      </div>
      {feedback && <p className={`practice-feedback ${result}`}>{feedback}</p>}
      {result === "retry" && (
        <button className="practice-action" onClick={() => go("arabic-practice")}>
          Try again
        </button>
      )}
      {result === "correct" && (
        <button className="practice-action" onClick={() => go("vocabulary")}>
          Complete this lesson
        </button>
      )}
    </main>
  );
}

function Vocabulary({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen vocabulary-screen">
      <Back onClick={() => go("arabic")} eyebrow="LEARN · MY WORD GARDEN" />
      <h1 className="page-title">Your word garden.</h1>
      <p className="page-subtitle">Every word you remember becomes a deeper connection.</p>
      <section className="garden-progress">
        <small>YOUR GARDEN</small>
        <h2>A small beginning counts.</h2>
        <p>1 word learned · Keep tending it</p>
      </section>
      <section className="garden-word">
        <small>YOUR FIRST WORD</small>
        <p dir="rtl">كِتَاب</p>
        <h2>kitāb</h2>
        <strong>a book</strong>
      </section>
      <button className="practice-action garden-action" onClick={() => go("arabic-practice")}>
        Practice this word
      </button>
      <p className="garden-note">Words return gently over time, so they can take root.</p>
      <BottomNav active="Learn" go={go} />
    </main>
  );
}

function Preferences({ go }: { go: (screen: Screen) => void }) {
  const plan = [
    ["Daily goal", "10 minutes"],
    ["Focus", "Hifz + revision"],
    ["Starting level", "Beginner · Change"],
    ["Daily reminder", "7:00 PM · On"],
  ];
  const reading = [
    ["Language", "English"],
    ["Qur’an script", "Uthmani · Hafs"],
    ["Story rewards", "After daily goal"],
    ["Mindful break", "5 minutes"],
  ];
  return (
    <main className="screen utility-screen preferences-screen">
      <HubHeader
        eyebrow="YOUR PREFERENCES"
        title="Make room to grow."
        subtitle="Your learning should fit your life."
        back="profile"
        go={go}
      />
      <p className="utility-label plan-label">MY LEARNING PLAN</p>
      <div className="settings-list plan-list">
        {plan.map(([label, value]) => (
          <button key={label} onClick={() => label === "Starting level" && go("starting")}>
            <span>{label}</span>
            <strong>{value}</strong>
          </button>
        ))}
      </div>
      <p className="utility-label rewards-label">READING &amp; REWARDS</p>
      <div className="settings-list rewards-list compact">
        {reading.map(([label, value]) => (
          <button key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </button>
        ))}
      </div>
      <button className="privacy-note" onClick={() => go("account-privacy")}>
        Private by default · Manage voice recordings →
      </button>
      <button className="wide-action" onClick={() => go("profile")}>
        <span>Save preferences</span>
        <Icon name="a41d0.svg" size={20} />
      </button>
    </main>
  );
}

function Notifications({ go }: { go: (screen: Screen) => void }) {
  const updates: [string, string, string, Screen][] = [
    ["Your word garden is ready", "Review kitāb in a quiet moment. · Just now", "sage", "saved"],
    [
      "A little care for your Hifz",
      "3 surahs are ready for review. · 1 hour ago",
      "white",
      "revision",
    ],
    ["Your place is saved", "Juz ʿAmma Challenge · 21 Nov, 17:00 UTC", "peach", "challenge"],
  ];
  return (
    <main className="screen utility-screen notifications-screen">
      <HubHeader
        eyebrow="YOUR UPDATES"
        title="Gentle reminders."
        subtitle="A little encouragement, never pressure."
        back="today"
        go={go}
      />
      <p className="utility-label notice-today">TODAY</p>
      <div className="notice-list">
        {updates.map(([title, copy, tone, destination]) => (
          <FeatureRow
            key={title}
            title={title}
            copy={copy}
            tone={tone as "sage" | "peach" | "white"}
            onClick={() => go(destination)}
          />
        ))}
      </div>
      <p className="utility-label earlier-label">EARLIER</p>
      <div className="earlier-notice">
        <FeatureRow
          title="Seven days of showing up"
          copy="Your rhythm is taking root. · Yesterday"
          onClick={() => go("profile")}
        />
      </div>
      <button className="manage-reminders" onClick={() => go("preferences")}>
        Manage reminders →
      </button>
      <BottomNav active="Today" go={go} />
    </main>
  );
}

function SavedCollection({ go }: { go: (screen: Screen) => void }) {
  const rows: [string, string, "sage" | "peach" | "lilac" | "white", Screen][] = [
    ["Qur’an bookmarks", "Al-Ikhlas · Ayah 3 · Continue reading", "sage", "reader"],
    ["Hadith to remember", "Begin with intention · Sahih al-Bukhari 1", "peach", "hadith-detail"],
    ["A lesson in certainty", "Prophet Ibrahim · Qur’an 6:75–79", "lilac", "stories"],
    ["Arabic vocabulary", "1 word · Open your word garden", "white", "arabic"],
  ];
  return (
    <main className="screen utility-screen saved-screen">
      <HubHeader
        eyebrow="SAVED FOR LATER"
        title="Keep it close."
        subtitle="A personal collection to return to."
        back="learn"
        go={go}
      />
      <div className="saved-list">
        {rows.map(([title, copy, tone, destination]) => (
          <FeatureRow
            key={title}
            title={title}
            copy={copy}
            tone={tone}
            onClick={() => go(destination)}
          />
        ))}
      </div>
      <p className="saved-note">
        Your collection is private. Save from any lesson
        <br />
        or story to find it here.
      </p>
      <BottomNav active="Learn" go={go} />
    </main>
  );
}

function AccountPrivacy({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen utility-screen account-privacy-screen">
      <HubHeader
        eyebrow="ACCOUNT & PRIVACY"
        title="Yours, by intention."
        subtitle="Control your account and your data."
        back="profile"
        go={go}
      />
      <div className="account-links">
        <FeatureRow title="Amina Yusuf" copy="amina@example.com · Email verified" tone="sage" />
        <FeatureRow
          title="Learning preferences"
          copy="Goals, reminders, language & rewards"
          onClick={() => go("preferences")}
        />
        <FeatureRow
          title="Private voice recordings"
          copy="Only you and assigned reviewers can listen."
          onClick={() => go("teacher-review")}
        />
        <FeatureRow
          title="Saved collection"
          copy="Your bookmarks, Hadith & stories"
          onClick={() => go("saved")}
        />
        <FeatureRow
          title="Help & support"
          copy="Find an answer or contact the team"
          onClick={() => go("help")}
        />
      </div>
      <button className="signout-action" onClick={() => go("signin")}>
        Sign out
      </button>
    </main>
  );
}

function HelpSupport({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen utility-screen help-screen">
      <HubHeader
        eyebrow="HELP & SUPPORT"
        title="A little guidance."
        subtitle="You don’t have to figure it out alone."
        back="account-privacy"
        go={go}
      />
      <div className="help-list">
        <FeatureRow
          title="How does Arabic learning work?"
          copy="Letters → words → practice → gentle review"
          tone="sage"
          onClick={() => go("arabic")}
        />
        <FeatureRow
          title="How is recitation checked?"
          copy="AI helps match words; a teacher checks tajweed."
          onClick={() => go("record")}
        />
        <FeatureRow
          title="How do I change my daily goal?"
          copy="Choose a rhythm that works for you."
          onClick={() => go("preferences")}
        />
        <FeatureRow
          title="Ask for a teacher review"
          copy="Get a human perspective on your practice."
          tone="peach"
          onClick={() => go("teacher-review")}
        />
      </div>
      <div className="support-card">
        <h2>Need something else?</h2>
        <p>Write to the Qur’anly support team.</p>
      </div>
      <a className="support-action" href="mailto:support@quranly.app">
        Contact support
      </a>
    </main>
  );
}

function TeacherReview({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen utility-screen teacher-screen">
      <HubHeader
        eyebrow="PRIVATE TEACHER REVIEW"
        title={
          <>
            A human ear.
            <br />A thoughtful response.
          </>
        }
        subtitle="Request a review of your recitation."
        back="record"
        go={go}
      />
      <div className="review-recording">
        <strong>Al-Ikhlas · 00:42</strong>
        <small>Your latest private practice session</small>
      </div>
      <label className="review-message">
        What would you like help with?
        <textarea defaultValue="I’d appreciate help with the ending of ayah 3 and holding the ghunnah for the right length." />
      </label>
      <div className="review-consent">
        <strong>✓ &nbsp; Share only with an assigned teacher</strong>
        <p>
          Your recording is never posted publicly.
          <br />
          You can withdraw a request before review.
        </p>
      </div>
      <p className="response-time">Typical response: within 2 working days.</p>
      <button className="support-action review-submit" onClick={() => go("review-sent")}>
        Submit review request
      </button>
    </main>
  );
}

function ReviewSent({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen utility-screen sent-screen">
      <HubHeader
        eyebrow="PRIVATE TEACHER REVIEW"
        title="Your request is with us."
        subtitle="A little guidance is on its way."
        back="record"
        go={go}
      />
      <div className="sent-card">
        <small>REQUEST QL-R1024</small>
        <h2>Al-Ikhlas · 00:42</h2>
        <p>
          Your recording will only be shared with
          <br />
          your assigned teacher.
          <br />
          <br />
          Typical response: within 2 working days.
          <br />
          We’ll send an update to your notifications.
        </p>
      </div>
      <button className="support-action sent-notifications" onClick={() => go("notifications")}>
        View my notifications
      </button>
      <button className="secondary-action" onClick={() => go("recite")}>
        Back to recitation
      </button>
    </main>
  );
}

function PasswordUpdated({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen utility-screen password-screen">
      <HubHeader
        eyebrow="ACCOUNT RECOVERY"
        title="You’re ready to return."
        subtitle="Your password has been updated."
        back="signin"
        go={go}
        instant
      />
      <div className="password-success">
        <b>✓</b>
        <h2>Your learning is still here.</h2>
        <p>
          Sign in with your new password to
          <br />
          continue where you left off.
        </p>
      </div>
      <button className="support-action password-action" onClick={() => go("signin")}>
        Back to sign in
      </button>
    </main>
  );
}

function ResetPassword({ go }: { go: (screen: Screen, instant?: boolean) => void }) {
  return (
    <main className="screen utility-screen recovery-screen reset-screen">
      <HubHeader
        eyebrow="ACCOUNT RECOVERY"
        title="Let’s get you back."
        subtitle="We’ll send a secure link to your email."
        back="signin"
        go={go}
        instant
      />
      <div className="recovery-reassurance">
        <h2>Your progress stays with you.</h2>
        <p>
          Resetting your password won’t change
          <br />
          your Hifz, words, or learning streak.
        </p>
      </div>
      <form
        className="reset-form"
        onSubmit={(event) => {
          event.preventDefault();
          go("inbox", true);
        }}
      >
        <label>
          Email address
          <input type="email" defaultValue="amina@example.com" aria-label="Email address" />
        </label>
        <button className="recovery-primary" type="submit">
          Send reset link
        </button>
      </form>
      <p className="recovery-security">For your security, the link expires after 30 minutes.</p>
      <button className="recovery-secondary recovery-bottom" onClick={() => go("signin", true)}>
        Back to sign in
      </button>
    </main>
  );
}

function CheckInbox({ go }: { go: (screen: Screen, instant?: boolean) => void }) {
  return (
    <main className="screen utility-screen recovery-screen inbox-screen">
      <HubHeader
        eyebrow="ACCOUNT RECOVERY"
        title="Check your inbox."
        subtitle="If an account exists, a reset link is on its way."
        back="forgot"
        go={go}
        instant
      />
      <div className="inbox-confirmation">
        <h2>A fresh start, securely.</h2>
        <strong>amina@example.com</strong>
        <p>
          Open the email and follow the secure link.
          <br />
          Don’t see it? Check your spam folder.
        </p>
      </div>
      <button className="recovery-primary inbox-primary" onClick={() => go("new-password", true)}>
        I have my reset link
      </button>
      <button className="recovery-secondary inbox-different" onClick={() => go("forgot", true)}>
        Use a different email
      </button>
      <button className="recovery-secondary recovery-bottom" onClick={() => go("signin", true)}>
        Return to sign in
      </button>
    </main>
  );
}

function CreateNewPassword({ go }: { go: (screen: Screen, instant?: boolean) => void }) {
  return (
    <main className="screen utility-screen recovery-screen new-password-screen">
      <HubHeader
        eyebrow="SECURE ACCOUNT RECOVERY"
        title="A fresh start."
        subtitle="Choose a password only you know."
        back="forgot"
        go={go}
        instant
      />
      <form
        className="new-password-form"
        onSubmit={(event) => {
          event.preventDefault();
          go("password-updated", true);
        }}
      >
        <label>
          New password
          <input type="password" defaultValue="quranly12345" aria-label="New password" />
        </label>
        <label>
          Confirm new password
          <input type="password" defaultValue="quranly12345" aria-label="Confirm new password" />
        </label>
        <p>
          Use at least 12 characters. A mix of words
          <br />
          can be easier to remember and harder to guess.
        </p>
        <button className="recovery-primary" type="submit">
          Update my password
        </button>
      </form>
    </main>
  );
}

function HifzLevels({ go }: { go: (screen: Screen) => void }) {
  const levels = [
    [
      "Beginner",
      "Short surahs · Guided ayah-by-ayah learning",
      "Your current path",
      "sage",
      "347b8.svg",
    ],
    [
      "Intermediate",
      "Longer passages · Connected recall",
      "Unlock through level checkpoints",
      "peach",
      "ca8c9.svg",
    ],
    [
      "Expert",
      "Long surahs · Juz-by-juz memorization",
      "Placement assessment available",
      "lilac",
      "6da9f.svg",
    ],
  ];
  return (
    <main className="screen flow-screen">
      <HubHeader
        eyebrow="HIFZ · YOUR PATH"
        title="Room for every learner."
        subtitle="Start small. Deepen your practice. Keep growing."
        back="hifz"
        go={go}
        backIcon="e2164.svg"
      />
      <div className="level-cards">
        {levels.map(([t, c, n, tone, icon]) => (
          <div className={tone} key={t}>
            <Icon name={icon} size={29} />
            <h2>{t}</h2>
            <p>{c}</p>
            <strong>{n}</strong>
          </div>
        ))}
      </div>
      <p className="flow-note">
        Already memorized some or all of the Qur’an?
        <br />
        Take a placement check or choose Revision.
      </p>
      <button className="flow-primary" onClick={() => go("hifz")}>
        Continue my Hifz path <Arrow />
      </button>
    </main>
  );
}

function MemoryRecall({
  go,
  checkpointMode = false,
}: {
  go: (screen: Screen, instant?: boolean) => void;
  checkpointMode?: boolean;
}) {
  return (
    <main className="screen flow-screen">
      <HubHeader
        eyebrow={`HIFZ · ${checkpointMode ? "CHECKPOINT" : "FROM MEMORY"}`}
        title="Let your memory lead."
        subtitle="Al-Ikhlas · 4 ayahs · No timer"
        back={checkpointMode ? "checkpoint" : "verse"}
        go={go}
        instant={checkpointMode}
      />
      <div className="memory-card">
        <small>TEXT HIDDEN FOR RECALL</small>
        <h2>Recite at your own pace.</h2>
        <p>
          No lost progress. No pressure to rush.
          <br />
          You can return to practice at any time.
        </p>
      </div>
      <p className="mic-private">Microphone on · Your recording stays private</p>
      <p className="memory-instruction">
        {checkpointMode ? (
          <>
            Finish when you have recalled all 4 ayahs.
            <br />A teacher can help if the result feels wrong.
          </>
        ) : (
          <>
            Recite the passage once more without looking.
            <br />
            Return to the ayah whenever you need to.
          </>
        )}
      </p>
      <button
        className="flow-primary memory-finish"
        onClick={() => go(checkpointMode ? "checkpoint-passed" : "complete", true)}
      >
        {checkpointMode ? "Finish checkpoint" : "Complete my lesson"}
      </button>
      <button
        className="flow-secondary"
        onClick={() => go(checkpointMode ? "checkpoint-retry" : "verse", checkpointMode)}
      >
        {checkpointMode ? "I need more practice" : "Return to the ayah"}
      </button>
    </main>
  );
}

function CheckpointPassed({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen passed-screen">
      <div className="passed-pill">CHECKPOINT PASSED</div>
      <div className="medallion">
        <Icon name="6cfca.svg" size={65} />
      </div>
      <div className="level-pill">BEGINNER · LEVEL 2</div>
      <h1>
        A new chapter
        <br />
        is yours.
      </h1>
      <p>
        Al-Ikhlas recalled without hints.
        <br />
        Your next Hifz lesson is now open.
      </p>
      <div className="retention">
        <Icon name="40b24.svg" size={25} />
        <span>
          <strong>Help it stay with you</strong>
          <small>Al-Ikhlas returns in tomorrow’s revision.</small>
        </span>
      </div>
      <em>Word recall checked · Not tajweed certification</em>
      <button className="flow-primary" onClick={() => go("hifz")}>
        Explore my next lesson <Arrow />
      </button>
      <button className="passed-back" onClick={() => go("today")}>
        Back to Today
      </button>
    </main>
  );
}

function CheckpointRetry({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen retry-screen">
      <Back
        onClick={() => go("checkpoint")}
        eyebrow="CHECKPOINT · KEEP PRACTICING"
        icon="ca6af.svg"
      />
      <h1 className="page-title">A little more practice.</h1>
      <p className="page-subtitle">A little more practice will make it stronger.</p>
      <div className="retry-summary">
        <Icon name="7ba79.svg" size={45} />
        <h2>2 phrases to revisit</h2>
        <p>No lost progress. No limit on your tries.</p>
      </div>
      <h2 className="retry-heading">Your next step</h2>
      <div className="retry-ayahs">
        <div>
          <strong>Al-Ikhlas · Ayah 3</strong>
          <small>Listen, repeat, then try without the text.</small>
        </div>
        <div>
          <strong>Al-Ikhlas · Ayah 4</strong>
          <small>Connect the ending with a calm pace.</small>
        </div>
      </div>
      <p className="retry-note">
        The next level stays locked until you pass.
        <br />
        Disagree with the result? Request teacher review.
      </p>
      <div className="retry-action">
        <PrimaryButton icon="7894c.svg" onClick={() => go("verse")}>
          Practice &amp; try again
        </PrimaryButton>
      </div>
    </main>
  );
}

function RevisionPlan({ go }: { go: (screen: Screen) => void }) {
  const [cycle, setCycle] = useState("60 days");
  return (
    <main className="screen flow-screen">
      <HubHeader
        eyebrow="REVISION · FULL QUR’AN"
        title="Keep your Hifz strong."
        subtitle="A sustainable rhythm for your complete Hifz."
        back="revision"
        go={go}
      />
      <p className="cycle-label">YOUR REVIEW CYCLE</p>
      <div className="cycle-list">
        {[
          ["30 days", "1 juz each day"],
          ["60 days", "½ juz each day"],
          ["Custom", "Build a plan with your teacher"],
        ].map(([t, c]) => (
          <button className={cycle === t ? "active" : ""} onClick={() => setCycle(t)} key={t}>
            <strong>{t}</strong>
            <span>{c}</span>
            {cycle === t && <b>✓</b>}
          </button>
        ))}
      </div>
      <div className="first-session">
        <small>YOUR FIRST SESSION</small>
        <h2>Juz 1 · First half</h2>
        <p>Start at Al-Fatihah. Adjust to your capacity.</p>
      </div>
      <p className="plan-note">
        Difficult passages return sooner. A missed day
        <br />
        shifts your plan gently—no catch-up punishment.
      </p>
      <button className="flow-primary" onClick={() => go("revision")}>
        Create my revision plan ✓
      </button>
    </main>
  );
}

function RevisionSession({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen flow-screen">
      <HubHeader
        eyebrow="REVISION · 1 OF 3"
        title="Keep Al-Fatihah close."
        subtitle="Recall first. Check gently. Repeat with care."
        back="revision"
        go={go}
      />
      <div className="session-progress">
        <i />
      </div>
      <div className="session-card">
        <b>7 ayahs · From memory</b>
        <Icon name="7040a.svg" size={42} />
        <h2>Your memory leads the way.</h2>
        <small>Tap to reveal a hint</small>
      </div>
      <div className="waveform">
        {Array.from({ length: 26 }, (_, i) => (
          <i key={i} style={{ height: `${18 + ((i * 13) % 38)}px` }} />
        ))}
      </div>
      <h3 className="listening-label">Listening to your recitation...</h3>
      <p className="record-time">00:24 · Recording stays private</p>
      <button className="flow-primary" onClick={() => go("revision")}>
        Finish &amp; check recall ✓
      </button>
      <button className="passed-back" onClick={() => go("revision")}>
        Pause session
      </button>
    </main>
  );
}

const ayahs = [
  ["01", "قُلْ هُوَ ٱللَّهُ أَحَدٌ", "Say, ˹O Prophet,˺ “He is Allah—One ˹and Indivisible˺;"],
  ["02", "ٱللَّهُ ٱلصَّمَدُ", "Allah—the Sustainer ˹needed by all˺."],
  ["03", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "He has never had offspring, nor was He born."],
  ["04", "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", "And there is none comparable to Him.”"],
];
function QuranReader({ go }: { go: (screen: Screen) => void }) {
  const [reciters, setReciters] = useState(false);
  return (
    <main className="screen reader-screen">
      <HubHeader eyebrow="AL-IKHLAS" title="The Sincerity" back="recite" go={go} />
      <div className="surah-meta">112 · Meccan · 4 ayahs</div>
      <div className="ayah-list">
        {ayahs.map(([n, a, t]) => (
          <div className={n === "03" ? "active" : ""} key={n}>
            <small>{n}</small>
            <p dir="rtl">{a}</p>
            <span>{t}</span>
          </div>
        ))}
      </div>
      <small className="credit">The Clear Quran · Dr. Mustafa Khattab</small>
      <button className="reader-player" onClick={() => setReciters(true)}>
        <span>▷</span>
        <b>
          Mishary Alafasy<small>Ayah 1 / 4 · Repeat off</small>
        </b>
        <em>↔</em>
      </button>
      <button className="reader-links" onClick={() => go("saved")}>
        Translation · Tafsir · Bookmarks
      </button>
      {reciters && (
        <div className="reciter-sheet">
          <button onClick={() => setReciters(false)}>×</button>
          <h2>Choose your reciter</h2>
          <p>Hafs ʿan ʿAsim · Murattal recitations</p>
          {[
            "Mishary Alafasy",
            "Abdul Rahman Al-Sudais",
            "Saud Al-Shuraim",
            "Maher Al-Muaiqly",
            "Abdul Basit Abdus Samad",
          ].map((n) => (
            <button key={n} onClick={() => setReciters(false)}>
              <strong>{n}</strong>
              <small>Hafs ʿan ʿAsim · Murattal</small>
              <Arrow />
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

function AiRecord({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen flow-screen">
      <HubHeader
        eyebrow="AI RECITATION · PRACTICE"
        title="A quiet space to recite."
        subtitle="Al-Ikhlas · Hafs ʿan ʿAsim"
        back="recite"
        go={go}
      />
      <div className="record-tabs">
        <b>Read along</b>
        <span>From memory</span>
      </div>
      <div className="record-ayah">
        <small>AYAH 3 / 4</small>
        <p dir="rtl">لَمْ يَلِدْ وَلَمْ يُولَدْ</p>
        <span>Take your time. Every word matters.</span>
      </div>
      <div className="waveform record-wave">
        {Array.from({ length: 26 }, (_, i) => (
          <i key={i} style={{ height: `${18 + ((i * 13) % 38)}px` }} />
        ))}
      </div>
      <h2 className="record-listening">Listening · 00:28</h2>
      <div className="mic-circle">
        <Icon name="f4efa.svg" size={26} />
      </div>
      <p className="record-private">Microphone on · Your voice stays private</p>
      <button className="flow-primary" onClick={() => go("feedback")}>
        Finish &amp; see feedback ✓
      </button>
      <button className="passed-back" onClick={() => go("recite")}>
        Pause recording
      </button>
    </main>
  );
}

function Feedback({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="screen flow-screen">
      <HubHeader
        eyebrow="AI PRACTICE · SESSION REVIEW"
        title="Every try is progress."
        subtitle="Al-Ikhlas · 4 ayahs · 00:42"
        back="recite"
        go={go}
      />
      <div className="score-card">
        <strong>92%</strong>
        <span>Word match</span>
        <Icon name="eb998.svg" size={45} />
        <b>1 possible omission</b>
      </div>
      <h2 className="revisit-title">Let’s revisit one moment</h2>
      <div className="omission">
        <b>POSSIBLE WORD OMISSION</b>
        <p dir="rtl">يُولَدْ</p>
        <span>Ayah 3 · 00:28–00:31</span>
        <small>Replay your voice / Listen to reciter</small>
      </div>
      <p className="ai-note">
        AI can miss or mishear words. This is practice
        <br />
        feedback, not a tajweed grade or certification.
      </p>
      <button className="flag-link">Something not right? Flag this feedback</button>
      <button className="flow-primary" onClick={() => go("record")}>
        Practice this ayah again ↔
      </button>
      <button className="passed-back" onClick={() => go("teacher-review")}>
        Request a teacher review
      </button>
    </main>
  );
}

function QuranLibrary({ go }: { go: (screen: Screen) => void }) {
  const surahs = [
    ["01", "Al-Fatihah", "7 ayahs"],
    ["02", "Al-Baqarah", "286 ayahs"],
    ["03", "Ali Imran", "200 ayahs"],
    ["04", "An-Nisa", "176 ayahs"],
    ["05", "Al-Ma’idah", "120 ayahs"],
  ];
  return (
    <main className="screen library-screen">
      <HubHeader
        eyebrow="QUR’AN · READ & LISTEN"
        title="A surah for every day."
        subtitle="All 114 surahs, together in one place."
        back="recite"
        go={go}
      />
      <button className="continue-surah" onClick={() => go("reader")}>
        <small>CONTINUE WHERE YOU LEFT OFF</small>
        <strong>Al-Ikhlas · Ayah 3 of 4 →</strong>
      </button>
      <input aria-label="Search surahs" placeholder="⌕  Search surah name or number" />
      <p className="library-label">
        SURAHS · 114 <span>Qur’an order</span>
      </p>
      <div className="surah-list">
        {surahs.map(([n, t, c]) => (
          <button key={n} onClick={() => go("reader")}>
            <b>{n}</b>
            <span>
              <strong>{t}</strong>
              <small>{c} · Read or listen</small>
            </span>
            <Arrow />
          </button>
        ))}
      </div>
    </main>
  );
}

function ArabicMastery({ go }: { go: (screen: Screen) => void }) {
  const rows = [
    ["01", "ا ب ت", "Ready to learn"],
    ["02", "ث ج ح", "Unlock after group 1"],
    ["03", "خ د ذ", "Unlock after group 2"],
    ["04", "ر ز س", "Unlock after group 3"],
  ];
  return (
    <main className="screen flow-screen">
      <HubHeader
        eyebrow="ARABIC · ALPHABET MASTERY"
        title={
          <>
            Small groups.
            <br />
            Strong foundations.
          </>
        }
        subtitle="28 letters · 10 groups · Learn, recall, then unlock."
        back="arabic"
        go={go}
      />
      <div className="alphabet-progress">
        <small>YOUR ALPHABET JOURNEY</small>
        <h2>0 / 28 letters mastered</h2>
        <i />
      </div>
      <div className="alphabet-list">
        {rows.map(([n, a, c], i) => (
          <button
            className={i === 0 ? "active" : ""}
            key={n}
            onClick={() => i === 0 && go("lesson")}
          >
            <b>{n}</b>
            <span>
              <strong dir="rtl">{a}</strong>
              <small>{c}</small>
            </span>
            <em>{i === 0 ? "›" : "○"}</em>
          </button>
        ))}
      </div>
      <p className="alphabet-note">
        Get every letter right before the next group opens.
        <br />
        Review is always available. No lost hearts.
      </p>
    </main>
  );
}

function SimpleDetail({
  go,
  kind,
}: {
  go: (screen: Screen) => void;
  kind: "preferences" | "saved" | "lesson" | "hadith" | "challenge" | "record" | "reader";
}) {
  const data = {
    preferences: [
      "YOUR JOURNEY",
      "Goals & preferences",
      "Shape a rhythm that works for you.",
      "Save preferences",
      "profile",
    ],
    saved: [
      "YOUR COLLECTION",
      "Saved for your heart.",
      "Verses, hadiths and reflections you kept close.",
      "Return to learning",
      "learn",
    ],
    lesson: [
      "GUIDED LESSON",
      "Practice gently.",
      "Listen, repeat, and let each sound settle.",
      "Begin lesson",
      "learn",
    ],
    hadith: [
      "HADITH · LESSON 1",
      "Begin with intention.",
      "Actions are judged by intentions, and every person will have what they intended.",
      "Hide text & test recall",
      "hadith",
    ],
    challenge: [
      "QUR’ANLY ARENA",
      "The Juz ʿAmma Challenge",
      "A live, welcoming space to recite and grow.",
      "Apply for this challenge",
      "arena",
    ],
    record: [
      "RECITE WITH AI",
      "Recite when you’re ready.",
      "Your recording stays private. Pause or retry at any time.",
      "Finish & see feedback",
      "recite",
    ],
    reader: ["READ & LISTEN", "Al-Ikhlas", "قُلْ هُوَ ٱللَّهُ أَحَدٌ", "Continue reading", "recite"],
  } as const;
  const [eyebrow, title, copy, cta, back] = data[kind];
  const backTarget = back as Screen;
  const actionTarget = back as Screen;
  return (
    <main className="screen simple-detail">
      <HubHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={kind === "reader" ? "Surah 112 · Meccan" : undefined}
        back={backTarget}
        go={go}
      />
      <section className={`detail-focus ${kind === "reader" ? "arabic-focus" : ""}`}>
        <p>{copy}</p>
        {kind === "preferences" && (
          <>
            <label>
              Daily learning goal <b>10 minutes</b>
            </label>
            <label>
              Gentle reminder <b>7:00 PM</b>
            </label>
          </>
        )}
      </section>
      <div className="detail-cta">
        <PrimaryButton onClick={() => go(actionTarget)}>{cta}</PrimaryButton>
      </div>
      <button className="text-link detail-back" onClick={() => go(backTarget)}>
        Back
      </button>
    </main>
  );
}

export default function PhonePrototypeFull({ onClose, fullscreen }: { onClose: () => void; fullscreen?: boolean }) {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [transitioning, setTransitioning] = useState(false);
  const [hifzIntroduced, setHifzIntroduced] = useState(false);

  const go = (next: Screen, instant = false) => {
    let destination = next;
    if (next === "hifz" && !hifzIntroduced) {
      if (screen === "hifz-levels") {
        setHifzIntroduced(true);
      } else {
        destination = "hifz-levels";
      }
    }
    if (destination === screen) return;
    if (instant) {
      setScreen(destination);
      window.scrollTo({ top: 0 });
      return;
    }
    setTransitioning(true);
    window.setTimeout(() => {
      setScreen(destination);
      window.scrollTo({ top: 0 });
      setTransitioning(false);
    }, 150);
  };

  const props = { go };

  if (fullscreen) {
    return (
      <div className={`app ${transitioning ? "is-transitioning" : ""}`} style={{ minHeight: "100vh", minWidth: "320px" }}>
        <button
          aria-label="Close prototype"
          onClick={onClose}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 1000,
            padding: 12,
            background: "rgba(22, 63, 54, 0.9)",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          <Icon name="4bb0f.svg" size={24} />
        </button>
        {screen === "welcome" && <Welcome {...props} />}
        {screen === "account" && <Account {...props} />}
        {screen === "starting" && <Starting {...props} />}
        {screen === "goal" && <Goal {...props} />}
        {screen === "today" && <Today {...props} />}
        {screen === "hifz" && <Hifz {...props} />}
        {screen === "verse" && <Verse {...props} />}
        {screen === "checkpoint" && <Checkpoint {...props} />}
        {screen === "complete" && <Complete {...props} />}
        {screen === "revision" && <Revision {...props} />}
        {screen === "learn" && <LearnHub {...props} />}
        {screen === "recite" && <Recite {...props} />}
        {screen === "tajweed" && <Tajweed {...props} />}
        {screen === "hadith" && <Hadith {...props} />}
        {screen === "arena" && <Arena {...props} />}
        {screen === "profile" && <Profile {...props} />}
        {screen === "arabic" && <Arabic {...props} />}
        {screen === "signin" && <SignIn {...props} />}
        {screen === "stories" && <Stories {...props} />}
        {screen === "story-unlocked" && <StoryUnlocked {...props} />}
        {screen === "preferences" && <Preferences {...props} />}
        {screen === "saved" && <SavedCollection {...props} />}
        {screen === "lesson" && <SimpleDetail {...props} kind="lesson" />}
        {screen === "hadith-detail" && <SimpleDetail {...props} kind="hadith" />}
        {screen === "challenge" && <CompetitionDetails {...props} />}
        {screen === "competition-entry" && <CompetitionEntry {...props} />}
        {screen === "entry-confirmed" && <EntryConfirmed {...props} />}
        {screen === "live-assessment" && <LiveAssessment {...props} />}
        {screen === "device-check" && <DeviceCheck {...props} />}
        {screen === "video-room" && <VideoRoom {...props} />}
        {screen === "participants" && <Participants {...props} />}
        {screen === "record" && <AiRecord {...props} />}
        {screen === "reader" && <QuranReader {...props} />}
        {screen === "forgot" && <ResetPassword {...props} />}
        {screen === "inbox" && <CheckInbox {...props} />}
        {screen === "new-password" && <CreateNewPassword {...props} />}
        {screen === "notifications" && <Notifications {...props} />}
        {screen === "account-privacy" && <AccountPrivacy {...props} />}
        {screen === "help" && <HelpSupport {...props} />}
        {screen === "teacher-review" && <TeacherReview {...props} />}
        {screen === "review-sent" && <ReviewSent {...props} />}
        {screen === "password-updated" && <PasswordUpdated {...props} />}
        {screen === "hifz-levels" && <HifzLevels {...props} />}
        {screen === "recall" && <MemoryRecall {...props} />}
        {screen === "checkpoint-recall" && <MemoryRecall {...props} checkpointMode />}
        {screen === "checkpoint-passed" && <CheckpointPassed {...props} />}
        {screen === "checkpoint-retry" && <CheckpointRetry {...props} />}
        {screen === "revision-plan" && <RevisionPlan {...props} />}
        {screen === "revision-session" && <RevisionSession {...props} />}
        {screen === "feedback" && <Feedback {...props} />}
        {screen === "quran-library" && <QuranLibrary {...props} />}
        {screen === "arabic-mastery" && <ArabicMastery {...props} />}
        {screen === "arabic-path" && <ArabicPath {...props} />}
        {screen === "arabic-words" && <ArabicWords {...props} />}
        {screen === "arabic-practice" && <ArabicPractice {...props} />}
        {screen === "arabic-retry" && <ArabicPractice {...props} result="retry" />}
        {screen === "arabic-correct" && <ArabicPractice {...props} result="correct" />}
        {screen === "vocabulary" && <Vocabulary {...props} />}
      </div>
    );
  }

  return (
    <div className="phone-shell" aria-label="Interactive Qur'anly app prototype">
      <div className="phone-top">
        <span>9:41</span>
        <span className="camera-island" />
        <button aria-label="Close prototype" onClick={onClose} style={{ padding: 8, background: "none", border: "none" }}>
          <Icon name="4bb0f.svg" size={22} />
        </button>
      </div>
      <div className="phone-content">
        <div className={`app ${transitioning ? "is-transitioning" : ""}`}>
          {screen === "welcome" && <Welcome {...props} />}
          {screen === "account" && <Account {...props} />}
          {screen === "starting" && <Starting {...props} />}
          {screen === "goal" && <Goal {...props} />}
          {screen === "today" && <Today {...props} />}
          {screen === "hifz" && <Hifz {...props} />}
          {screen === "verse" && <Verse {...props} />}
          {screen === "checkpoint" && <Checkpoint {...props} />}
          {screen === "complete" && <Complete {...props} />}
          {screen === "revision" && <Revision {...props} />}
          {screen === "learn" && <LearnHub {...props} />}
          {screen === "recite" && <Recite {...props} />}
          {screen === "tajweed" && <Tajweed {...props} />}
          {screen === "hadith" && <Hadith {...props} />}
          {screen === "arena" && <Arena {...props} />}
          {screen === "profile" && <Profile {...props} />}
          {screen === "arabic" && <Arabic {...props} />}
          {screen === "signin" && <SignIn {...props} />}
          {screen === "stories" && <Stories {...props} />}
          {screen === "story-unlocked" && <StoryUnlocked {...props} />}
          {screen === "preferences" && <Preferences {...props} />}
          {screen === "saved" && <SavedCollection {...props} />}
          {screen === "lesson" && <SimpleDetail {...props} kind="lesson" />}
          {screen === "hadith-detail" && <SimpleDetail {...props} kind="hadith" />}
          {screen === "challenge" && <CompetitionDetails {...props} />}
          {screen === "competition-entry" && <CompetitionEntry {...props} />}
          {screen === "entry-confirmed" && <EntryConfirmed {...props} />}
          {screen === "live-assessment" && <LiveAssessment {...props} />}
          {screen === "device-check" && <DeviceCheck {...props} />}
          {screen === "video-room" && <VideoRoom {...props} />}
          {screen === "participants" && <Participants {...props} />}
          {screen === "record" && <AiRecord {...props} />}
          {screen === "reader" && <QuranReader {...props} />}
          {screen === "forgot" && <ResetPassword {...props} />}
          {screen === "inbox" && <CheckInbox {...props} />}
          {screen === "new-password" && <CreateNewPassword {...props} />}
          {screen === "notifications" && <Notifications {...props} />}
          {screen === "account-privacy" && <AccountPrivacy {...props} />}
          {screen === "help" && <HelpSupport {...props} />}
          {screen === "teacher-review" && <TeacherReview {...props} />}
          {screen === "review-sent" && <ReviewSent {...props} />}
          {screen === "password-updated" && <PasswordUpdated {...props} />}
          {screen === "hifz-levels" && <HifzLevels {...props} />}
          {screen === "recall" && <MemoryRecall {...props} />}
          {screen === "checkpoint-recall" && <MemoryRecall {...props} checkpointMode />}
          {screen === "checkpoint-passed" && <CheckpointPassed {...props} />}
          {screen === "checkpoint-retry" && <CheckpointRetry {...props} />}
          {screen === "revision-plan" && <RevisionPlan {...props} />}
          {screen === "revision-session" && <RevisionSession {...props} />}
          {screen === "feedback" && <Feedback {...props} />}
          {screen === "quran-library" && <QuranLibrary {...props} />}
          {screen === "arabic-mastery" && <ArabicMastery {...props} />}
          {screen === "arabic-path" && <ArabicPath {...props} />}
          {screen === "arabic-words" && <ArabicWords {...props} />}
          {screen === "arabic-practice" && <ArabicPractice {...props} />}
          {screen === "arabic-retry" && <ArabicPractice {...props} result="retry" />}
          {screen === "arabic-correct" && <ArabicPractice {...props} result="correct" />}
          {screen === "vocabulary" && <Vocabulary {...props} />}
        </div>
      </div>
      {screen !== "welcome" && screen !== "account" && screen !== "starting" && screen !== "goal" && screen !== "signin" && (
        <nav className="bottom-nav">
          {[
            ["Today", "85b7a.svg", "85b7a.svg", "today"],
            ["Learn", "0a21f.svg", "0a21f.svg", "learn"],
            ["Recite", "9a82d.svg", "9a82d.svg", "recite"],
            ["Arena", "bacc4.svg", "045bc.svg", "arena"],
            ["You", "ff763.svg", "37e32.svg", "profile"],
          ].map(([label, icon, activeIcon, destination]) => (
            <button
              className={screen === destination ? "active" : ""}
              key={label}
              onClick={() => go(destination)}
            >
              <Icon name={label === destination ? activeIcon : icon} size={22} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
