import { FormEvent, useState } from "react";

const assets = "/assets";

type LogoProps = {
  inverse?: boolean;
  size?: 44 | 50;
};

function Logo({ inverse = false, size = 44 }: LogoProps) {
  const footer = size === 50;
  return (
    <div className="brand-lockup">
      <span className="brand-icon" style={{ width: size, height: size }}>
        <img src={`${assets}/${footer ? "44520" : "cb991"}.svg`} alt="" />
        <img className="book" src={`${assets}/${footer ? "bc627" : "a663f"}.svg`} alt="" />
        <img className="seed" src={`${assets}/${footer ? "12dc0" : "6f356"}.svg`} alt="" />
      </span>
      <span className={`brand-name ${inverse ? "inverse" : ""}`}>Qur’anly</span>
    </div>
  );
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const gifts = [
  {
    number: "01 · BUILD WITH CARE",
    title: "A better Qur’anly",
    text: "Refine the experience, improve performance and work toward a reliable daily learning companion.",
    className: "sage",
  },
  {
    number: "02 · LEARN WITH MEANING",
    title: "Thoughtful learning",
    text: "Improve the Hifz, revision, recitation and Arabic experiences, with care for every step.",
    className: "peach",
  },
  {
    number: "03 · OPEN MORE DOORS",
    title: "Access for more people",
    text: "Work toward a more inclusive experience for learners across devices, abilities and borders.",
    className: "lilac",
  },
];

const questions = [
  [
    "Can I give from outside Nigeria?",
    "Yes. The donation experience is designed for supporters worldwide, with currency and payment choices for different regions.",
  ],
  [
    "Can I donate in naira?",
    "Choose NGN to give in naira. For international giving, choose USD or another available currency.",
  ],
  [
    "What is the fundraising goal?",
    "Our goal is $3,500 / ₦5,000,000 to refine Qur’anly and work toward making it accessible to millions of users.",
  ],
  [
    "Will I receive a receipt?",
    "Enter your email so a payment confirmation can be sent after a successful donation. A payment receipt is not a tax-deductibility guarantee.",
  ],
  [
    "Do I need to donate to join the waitlist?",
    "Not at all. Joining the waitlist is free. Giving is optional, and sharing the mission helps too.",
  ],
];

function DonationForm() {
  const [currency, setCurrency] = useState<"USD" | "NGN">("USD");
  const [amount, setAmount] = useState("25");
  const [method, setMethod] = useState("Card");
  const [submitted, setSubmitted] = useState(false);
  const symbol = currency === "USD" ? "$" : "₦";
  const amounts =
    currency === "USD" ? ["10", "25", "50", "100"] : ["5000", "10000", "25000", "50000"];

  const chooseCurrency = (next: "USD" | "NGN") => {
    setCurrency(next);
    setAmount(next === "USD" ? "25" : "10000");
    setSubmitted(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="form-frame">
      <form className="donation-form" onSubmit={submit}>
        <p className="eyebrow">A GIFT FOR WHAT COMES NEXT</p>
        <h2>Make a difference.</h2>
        <p className="form-intro">A one-time gift. Any amount, with gratitude.</p>

        <fieldset>
          <legend>Donation currency</legend>
          <div className="two-options">
            <button
              type="button"
              className={currency === "USD" ? "active" : ""}
              onClick={() => chooseCurrency("USD")}
            >
              USD · US dollar
            </button>
            <button
              type="button"
              className={currency === "NGN" ? "active" : ""}
              onClick={() => chooseCurrency("NGN")}
            >
              NGN · Nigerian naira
            </button>
          </div>
        </fieldset>
        <button type="button" className="more-currencies">
          More currencies: GBP, EUR &amp; others&nbsp;⌄
        </button>

        <fieldset>
          <legend>Choose an amount</legend>
          <div className="amount-options">
            {amounts.map((value) => (
              <button
                type="button"
                key={value}
                className={amount === value ? "active" : ""}
                onClick={() => {
                  setAmount(value);
                  setSubmitted(false);
                }}
              >
                {symbol}
                {Number(value).toLocaleString()}
              </button>
            ))}
          </div>
        </fieldset>

        <label>
          Or enter your amount ({currency})
          <input
            inputMode="decimal"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setSubmitted(false);
            }}
          />
        </label>

        <div className="split-fields">
          <label>
            Full name (optional)
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Country / region
            <select defaultValue="">
              <option value="" disabled>
                Select country
              </option>
              <option>Nigeria</option>
              <option>United Kingdom</option>
              <option>United States</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        <label>
          Email for your receipt
          <input type="email" placeholder="you@example.com" required />
        </label>

        <fieldset>
          <legend>Payment method</legend>
          <div className="payment-options">
            {["Card", "Apple Pay", "Bank transfer"].map((name) => (
              <button
                type="button"
                key={name}
                className={method === name ? "active" : ""}
                onClick={() => setMethod(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <p className="form-note">Available methods depend on your currency and country.</p>
        </fieldset>

        <button className="continue" type="submit">
          {submitted
            ? "Gift details ready  ✓"
            : `Continue with ${symbol}${Number(amount || 0).toLocaleString()}  →`}
        </button>
        <p className="form-note bottom-note">Review payment details before confirming your gift.</p>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="site-shell" id="top">
      <header className="header">
        <button className="logo-button" onClick={() => scrollTo("top")} aria-label="Qur’anly home">
          <Logo />
        </button>
        <nav aria-label="Main navigation">
          <button onClick={() => scrollTo("app")}>The app</button>
          <button onClick={() => scrollTo("mission")}>Our mission</button>
          <button onClick={() => scrollTo("donate")}>Donate</button>
          <button onClick={() => scrollTo("questions")}>Waitlist</button>
          <button className="nav-cta" onClick={() => scrollTo("waitlist")}>
            Join the waitlist
          </button>
        </nav>
      </header>

      <main>
        <section className="hero page-section" id="app">
          <div className="hero-copy">
            <p className="eyebrow">SMALL GIFTS. A LASTING DIFFERENCE.</p>
            <h1>
              Help a little
              <br />
              good reach
              <br />
              millions.
            </h1>
            <p className="lede">
              Help us refine Qur’anly and make a meaningful
              <br className="desktop-break" /> Qur’an learning journey accessible to millions
              <br className="desktop-break" /> of people, wherever they call home.
            </p>
            <div className="goal-card">
              <p className="eyebrow">ONE MISSION · OUR FUNDRAISING GOAL</p>
              <strong>$3,500</strong>
              <span>or ₦5,000,000</span>
              <p>Help build, improve and open the door to more learners.</p>
            </div>
            <h3>Give from wherever you are.</h3>
            <p className="support-copy">
              Choose your currency and a payment method that works
              <br className="desktop-break" /> for you. Every contribution helps move the mission
              forward.
            </p>
          </div>
          <div id="donate">
            <DonationForm />
          </div>
        </section>

        <section className="possibilities page-section" id="mission">
          <p className="eyebrow">THE PURPOSE BEHIND YOUR GIFT</p>
          <h2>A stronger foundation. A wider welcome.</h2>
          <div className="gift-grid">
            {gifts.map((gift) => (
              <article className={gift.className} key={gift.title}>
                <p className="eyebrow">{gift.number}</p>
                <h3>{gift.title}</h3>
                <p>{gift.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="commitment">
          <div>
            <p className="eyebrow">BUILT ON CARE. GROWN TOGETHER.</p>
            <h2>
              Your trust matters
              <br />
              as much as your gift.
            </h2>
          </div>
          <div className="priorities">
            <h3>Our priorities</h3>
            <p>
              01&nbsp;&nbsp;&nbsp;Put the learning experience first.
              <br />
              02&nbsp;&nbsp;&nbsp;Build for people, not just numbers.
              <br />
              03&nbsp;&nbsp;&nbsp;Keep supporters part of the journey.
            </p>
          </div>
          <p className="campaign-note">
            One campaign goal: $3,500 / ₦5,000,000. These are campaign targets, not a live currency
            conversion.
          </p>
        </section>

        <section className="faq page-section" id="questions">
          <h2>Giving, with a little more clarity.</h2>
          <div>
            {questions.map(([question, answer]) => (
              <article key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="waitlist page-section" id="waitlist">
          <div>
            <h2>
              There’s more than one way
              <br />
              to help something good grow.
            </h2>
            <p>
              Join the waitlist. Share the mission. Keep us in your du’a.
              <br className="desktop-break" /> Your encouragement belongs in this story, too.
            </p>
          </div>
          <div className="waitlist-action">
            <button
              type="button"
              onClick={() =>
                alert("Thank you for your interest in Qur’anly. The waitlist will open soon.")
              }
            >
              Join the waitlist&nbsp; ↗
            </button>
            <p>A little every day. A lifetime with Qur’an.</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <Logo inverse size={50} />
          <p>Grow closer. One ayah at a time.</p>
        </div>
        <nav aria-label="Footer navigation">
          <button onClick={() => scrollTo("app")}>The app</button>
          <button onClick={() => scrollTo("mission")}>Join the waitlist</button>
          <button onClick={() => scrollTo("donate")}>Support the mission</button>
          <button onClick={() => scrollTo("questions")}>Questions &amp; answers</button>
        </nav>
        <p className="copyright">© 2026 Qur’anly. A little every day.</p>
        <button className="back-top" onClick={() => scrollTo("top")}>
          Back to top&nbsp; ↑
        </button>
      </footer>
    </div>
  );
}
