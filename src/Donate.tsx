import { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

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
      <span className={`brand-name ${inverse ? "inverse" : ""}`}>Qur'anly</span>
    </div>
  );
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const gifts = [
  {
    number: "01 · BUILD WITH CARE",
    title: "A better Qur'anly",
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
    "Our goal is $3,500 / ₦5,000,000 to refine Qur'anly and work toward making it accessible to millions of users.",
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

function BankDetailsModal({ isOpen, onClose, amount, donorName, donorEmail, onSent }: { isOpen: boolean; onClose: () => void; amount: string; donorName: string; donorEmail: string; onSent: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="bank-details-content">
          <div className="success-icon-small">✓</div>
          <h2>Complete your Sadaqah</h2>
          <p className="modal-subtitle">Transfer ₦{Number(amount).toLocaleString()} to the account below</p>
          
          <div className="bank-details-card">
            <div className="bank-row">
              <span className="bank-label">Bank</span>
              <span className="bank-value">
	OPay (OPay Digital Services)
</span>
            </div>
            <div className="bank-row">
              <span className="bank-label">Account Name</span>
              <span className="bank-value">Monsur Raji</span>
            </div>
            <div className="bank-row">
              <span className="bank-label">Account Number</span>
              <span className="bank-value copyable" onClick={() => navigator.clipboard.writeText("7015038977")}>
                701 503 8977 <span className="copy-hint">Tap to copy</span>
              </span>
            </div>
            <div className="bank-row">
              <span className="bank-label">Reference</span>
              <span className="bank-value copyable" onClick={() => navigator.clipboard.writeText(`QUR-${Date.now().toString(36).toUpperCase()}`)}>
                QUR-{Date.now().toString(36).toUpperCase()} <span className="copy-hint">Tap to copy</span>
              </span>
            </div>
          </div>
          
          <p className="modal-note">After transfer, click "I've Sent" below to confirm your Sadaqah.</p>
          
          <div className="modal-actions">
            <button className="secondary" onClick={onClose}>Cancel</button>
            <button className="primary sent-btn" onClick={onSent}>
              I've Sent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ isOpen, onClose, amount }: { isOpen: boolean; onClose: () => void; amount: string }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gift-animation">
          <div className="gift-box">
            <div className="gift-lid"></div>
            <div className="gift-base"></div>
            <div className="gift-ribbon"></div>
            <div className="gift-bow"></div>
          </div>
          <div className="sparkles">
            <span>✦</span><span>✦</span><span>✦</span><span>✦</span>
          </div>
        </div>
        <div className="success-content">
          <h2>Jazakallahu Khayran!</h2>
          <p className="success-message">
            Your Sadaqah of <strong>₦{Number(amount).toLocaleString()}</strong> has been received.
          </p>
          <p className="success-dua">
            May Allah accept it from you and make it a source of ongoing reward (Sadaqah Jariyah).
            Your generosity helps millions memorize the Qur'an perfectly, one ayah at a time.
          </p>
          <p className="success-reward">
            In sha Allah, you'll be rewarded for making this possible — every letter recited, every ayah memorized,
            every heart touched by the Qur'an through Qur'anly carries your share of the reward.
          </p>
          <button className="primary" onClick={onClose} style={{ marginTop: "24px" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <span className="eyebrow">EARLY ACCESS</span>
        <h2>Join the Qur'anly waitlist.</h2>
        <p>Be among the first to build a gentler daily Qur'an practice.</p>
        <form onSubmit={(e) => { e.preventDefault(); onClose(); alert("Thank you! You're on the waitlist."); }}>
          <label>
            Name
            <input name="name" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required placeholder="you@example.com" />
          </label>
          <button type="submit" className="primary">Join the waitlist <span>↗</span></button>
        </form>
        <small>Stored privately on this device for this frontend demo.</small>
      </div>
    </div>
  );
}

function DonationForm() {
  const [currency, setCurrency] = useState<"USD" | "NGN">("NGN");
  const [amount, setAmount] = useState("10000");
  const [method, setMethod] = useState("Bank transfer");
  const [submitted, setSubmitted] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const symbol = currency === "USD" ? "$" : "₦";
  const amounts = currency === "USD" ? ["10", "25", "50", "100"] : ["5000", "10000", "25000", "50000"];

  const chooseCurrency = (next: "USD" | "NGN") => {
    if (next === "USD") {
      alert("USD donations coming soon. For now, please donate in NGN.");
      return;
    }
    setCurrency(next);
    setAmount(next === "USD" ? "25" : "10000");
    setSubmitted(false);
    setMethod("Bank transfer");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currency === "NGN" && method === "Bank transfer") {
      setShowBankModal(true);
    } else {
      setSubmitted(true);
    }
  };

  const handleSadaqahSent = async () => {
    setShowBankModal(false);
    setShowSuccessModal(true);

    // Send email notification
    if (donorEmail) {
      try {
        await emailjs.send(
          "service_idguhgy",
          "template_60skcuz",
          {
            to_email: "monsurrajiybs@gmail.com",
            donor_name: donorName || "Anonymous",
            donor_email: donorEmail,
            amount: amount,
            currency: currency,
            reference: `QUR-${Date.now().toString(36).toUpperCase()}`,
            date: new Date().toLocaleString(),
          },
          "_Ilcrgk_nxzz0DNf9"
        );
        console.log("Donation email sent successfully");
      } catch (error) {
        console.error("Failed to send donation email:", error);
      }
    }
  };

  return (
    <>
      <div className="form-frame">
        <form className="donation-form" onSubmit={handleSubmit}>
          <p className="eyebrow">A GIFT FOR WHAT COMES NEXT</p>
          <h2>Make a difference.</h2>
          <p className="form-intro">A one-time Sadaqah. Any amount, with gratitude.</p>

          <fieldset>
            <legend>Donation currency</legend>
            <div className="two-options">
              <button
                type="button"
                className={currency === "USD" ? "active" : ""}
                onClick={() => chooseCurrency("USD")}
                disabled={currency === "USD"}
              >
                USD · US dollar {currency === "USD" && <span className="coming-soon-badge">Coming Soon</span>}
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
          {currency === "USD" && (
            <p className="form-note usd-note">USD donations are coming soon. Please select NGN for now.</p>
          )}

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
              <input
                type="text"
                placeholder="Your name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </label>
            <label>
              Country / region
              <select defaultValue="Nigeria" disabled>
                <option value="Nigeria">Nigeria</option>
              </select>
            </label>
          </div>

          <label>
            Email for your receipt
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
            />
          </label>

          <fieldset>
            <legend>Payment method</legend>
            <div className="payment-options">
              {currency === "NGN" ? (
                <button
                  type="button"
                  key="Bank transfer"
                  className={method === "Bank transfer" ? "active" : ""}
                  onClick={() => setMethod("Bank transfer")}
                >
                  Bank transfer
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    key="Card"
                    className={method === "Card" ? "active" : ""}
                    onClick={() => setMethod("Card")}
                    disabled
                  >
                    Card
                  </button>
                  <button
                    type="button"
                    key="Apple Pay"
                    className={method === "Apple Pay" ? "active" : ""}
                    onClick={() => setMethod("Apple Pay")}
                    disabled
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    key="Bank transfer"
                    className={method === "Bank transfer" ? "active" : ""}
                    onClick={() => setMethod("Bank transfer")}
                    disabled
                  >
                    Bank transfer
                  </button>
                </>
              )}
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

      <BankDetailsModal
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        amount={amount}
        donorName={donorName}
        donorEmail={donorEmail}
        onSent={handleSadaqahSent}
      />
      <SuccessModal isOpen={showSuccessModal} onClose={() => { setShowSuccessModal(false); setSubmitted(false); }} amount={amount} />
    </>
  );
}

export default function Donate() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <div className="site-shell donate-page" id="top">
      <header className="header">
        <button className="logo-button" onClick={() => window.location.href = "/"} aria-label="Qur'anly home">
          <Logo />
        </button>
        <nav aria-label="Main navigation">
          <button onClick={() => scrollTo("sadaqah")}>Sadaqah</button>
          <button onClick={() => scrollTo("mission")}>Impact</button>
          <button onClick={() => scrollTo("commitment")}>Trust</button>
          <button onClick={() => scrollTo("questions")}>FAQs</button>
          <button className="nav-cta" onClick={() => setShowWaitlistModal(true)}>
            Join the waitlist
          </button>
        </nav>
      </header>

      <main>
        <section className="hero page-section" id="sadaqah">
          <div className="hero-copy">
            <p className="eyebrow">SADAQAH JARIYAH · ONGOING REWARD</p>
            <h1>
              Help a little
              <br />
              good reach
              <br />
              millions.
            </h1>
            <p className="lede">
              Help us refine Qur'anly and make a meaningful
              <br className="desktop-break" /> Qur'an learning journey accessible to millions
              <br className="desktop-break" /> of people, wherever they call home.
            </p>
            <div className="goal-card">
              <p className="eyebrow">ONE MISSION · OUR FUNDRAISING GOAL</p>
              <strong>₦5,000,000</strong>
              <span>Help build, improve and open the door to more learners.</span>
            </div>
            <h3>Give from wherever you are.</h3>
            <p className="support-copy">
              Choose your amount and complete your Sadaqah via bank transfer.
              <br className="desktop-break" /> Every contribution helps move the mission forward.
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

        <section className="commitment" id="commitment">
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
            One campaign goal: ₦5,000,000. This is a campaign target, not a live currency conversion.
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
              There's more than one way
              <br />
              to help something good grow.
            </h2>
            <p>
              Join the waitlist. Share the mission. Keep us in your du'a.
              <br className="desktop-break" /> Your encouragement belongs in this story, too.
            </p>
          </div>
          <div className="waitlist-action">
            <button
              type="button"
              onClick={() => setShowWaitlistModal(true)}
            >
              Join the waitlist&nbsp; ↗
            </button>
            <p>A little every day. A lifetime with Qur'an.</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <Logo inverse size={50} />
          <p>Grow closer. One ayah at a time.</p>
        </div>
        <nav aria-label="Footer navigation">
          <button onClick={() => scrollTo("sadaqah")}>Sadaqah</button>
          <button onClick={() => scrollTo("mission")}>Impact</button>
          <button onClick={() => scrollTo("commitment")}>Trust</button>
          <button onClick={() => scrollTo("questions")}>FAQs</button>
        </nav>
        <p className="copyright">© 2026 Qur'anly. A little every day.</p>
        <button className="back-top" onClick={() => scrollTo("top")}>
          Back to top&nbsp; ↑
        </button>
      </footer>

      <WaitlistModal isOpen={showWaitlistModal} onClose={() => setShowWaitlistModal(false)} />
    </div>
  );
}