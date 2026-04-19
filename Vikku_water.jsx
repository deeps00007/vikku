import { useState, useEffect, useRef } from "react";

/* ─── colour tokens matching the reference ─── */
const C = {
  blue: "#1a6fc4",
  blueDark: "#1258a0",
  blueLight: "#e8f4fd",
  blueMid: "#2e86de",
  accent: "#27ae60",
  text: "#2c3e50",
  muted: "#7f8c8d",
  white: "#ffffff",
  bg: "#f0f8ff",
  border: "#d6eaf8",
};

const PRODUCTS = [
  { name: "DM Water (20 L Can)", price: "₹80", old: "₹100", img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80", desc: "Demineralised water, mineral-free. Ideal for boilers, batteries & labs." },
  { name: "RO Purified Water (20 L)", price: "₹60", old: "₹80", img: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=300&q=80", desc: "Reverse osmosis filtered water for safe everyday industrial use." },
  { name: "Distilled Water (5 L)", price: "₹40", old: "₹55", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&q=80", desc: "Distilled, lab-grade purity. Perfect for chemical processes & hospitals." },
  { name: "Battery Water (5 L)", price: "₹35", old: "₹50", img: "https://images.unsplash.com/photo-1620714223084-8fcacc2dfd4d?w=300&q=80", desc: "Conductivity <1.3 μS/cm. Extends inverter & lead-acid battery life." },
  { name: "Soft Water (Bulk)", price: "₹500", old: "₹700", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=300&q=80", desc: "Scale-free soft water protecting your pipes, boilers and machinery." },
  { name: "Raw Water (Tanker)", price: "₹1,200", old: "₹1,500", img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&q=80", desc: "Bulk untreated water for construction, cooling towers & civil works." },
];

const FEATURES = [
  { icon: "💧", title: "99% Purity Guaranteed", desc: "Every batch tested for pH, conductivity and bacterial count before dispatch." },
  { icon: "🔬", title: "3-Stage Filtration", desc: "Sediment → Activated Carbon → RO/DM treatment for each water type." },
  { icon: "🚫", title: "Chemical-Free", desc: "No harmful additives. Pure, safe water meeting industrial standards." },
];

const STATS = [
  { n: "5,000+", l: "Happy Clients" },
  { n: "8+", l: "Product Types" },
  { n: "10+", l: "Years in Noida" },
  { n: "678", l: "Bulk Deliveries / Month" },
];

const TESTIMONIALS = [
  { name: "Rajesh Sharma", role: "Factory Owner, Noida", text: "Vikku Water has been our DM water supplier for 3 years. Delivery is always on time and quality is consistently excellent. Highly recommend!", avatar: "RS" },
  { name: "Priya Mehta", role: "Lab Manager, Greater Noida", text: "We rely on Vikku for distilled and DI water for our laboratory. Their water meets all our purity requirements without fail.", avatar: "PM" },
  { name: "Suresh Gupta", role: "Proprietor, Gurugram", text: "Best battery water supplier in NCR. Our inverters last longer since we switched to Vikku's distilled alkaline battery water.", avatar: "SG" },
];

const ARTICLES = [
  { date: "12 मार्च 2024", cat: "Guide", title: "DM Water vs RO Water: आपके बॉयलर के लिए कौन सा बेहतर है?", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { date: "5 फरवरी 2024", cat: "Tips", title: "Battery Water से इन्वर्टर की उम्र कैसे बढ़ाएं — 5 जरूरी टिप्स", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80" },
  { date: "20 जनवरी 2024", cat: "Industry", title: "नोएडा के औद्योगिक क्षेत्र में शुद्ध जल की बढ़ती मांग", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80" },
];

const BRANDS = ["AQUA PURE", "NOIDA IND.", "NCR WATER", "HI-PURE", "VIKKU CO."];

function AnimatedNumber({ text }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  const numMatch = text.match(/\d+(?:,\d+)?/);
  const numText = numMatch ? numMatch[0] : "";
  const target = numText ? parseInt(numText.replace(/,/g, ""), 10) : 0;
  
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        // Small delay to ensure it doesn't trigger immediately on page load
        setTimeout(() => setStarted(true), 150);
      }
    }, { threshold: 0.8, rootMargin: "0px 0px -50px 0px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || target === 0) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  if (!numMatch) return <span>{text}</span>;
  return (
    <span ref={ref}>
      {text.replace(numText, count.toLocaleString("en-IN"))}
    </span>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? C.white : "rgba(255,255,255,0.97)", boxShadow: scrolled ? "0 2px 20px rgba(26,111,196,0.12)" : "none", transition: "all 0.3s", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}` }}>
      {/* Top bar */}
      <div style={{ background: C.blue, padding: "6px 6%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 24, fontSize: 12, color: "rgba(255,255,255,0.9)" }}>
          <span>📍 Village-Basai, Sector-70, Noida – 201308</span>
          <span>✉ info@vikkuwater.in</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {["f", "t", "in", "yt"].map(s => (
            <div key={s} style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", cursor: "pointer" }}>{s}</div>
          ))}
        </div>
      </div>
      {/* Main nav */}
      <div style={{ padding: "0 6%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blue}, ${C.blueMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>💧</div>
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: C.blue, lineHeight: 1 }}>Vikku</div>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>Water Supplier</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
          {["Home", "About Us", "Services", "Products", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "")}`} style={{ fontSize: 14, fontWeight: 500, color: C.text, textDecoration: "none", transition: "color 0.2s", fontFamily: "'Poppins', sans-serif" }}
              onMouseEnter={e => e.target.style.color = C.blue} onMouseLeave={e => e.target.style.color = C.text}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ padding: "10px 22px", borderRadius: 6, border: `2px solid ${C.blue}`, background: "transparent", color: C.blue, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.blue; }}>
            Read More
          </button>
          <button style={{ padding: "10px 22px", borderRadius: 6, border: "none", background: C.blue, color: "white", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 14px rgba(26,111,196,0.35)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.blueDark}
            onMouseLeave={e => e.currentTarget.style.background = C.blue}>
            Get A Quote
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: C.white, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        @keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes splash{0%{transform:scale(1);opacity:0.6}100%{transform:scale(2.2);opacity:0}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ripple{0%{transform:scale(0.8);opacity:0.5}100%{transform:scale(1.8);opacity:0}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes waveAnim{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes bounceGently{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .hero-img{animation:floatUp 4s ease-in-out infinite}
        .pulse-water{position:absolute;width:380px;height:380px;border-radius:50%;background:${C.blue}14;animation:ripple 3s infinite cubic-bezier(0.4, 0, 0.2, 1);z-index:0}
        .pulse-play{animation:ripple 2s infinite cubic-bezier(0.4, 0, 0.2, 1)}
        .reveal{opacity:0;transform:translateY(30px);transition:all 0.8s cubic-bezier(0.5,0,0,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .pcard{background:white;border-radius:12px;overflow:hidden;border:1.5px solid ${C.border};transition:all 0.4s cubic-bezier(0.4,0,0.2,1);cursor:pointer}
        .pcard:hover{transform:translateY(-10px) scale(1.01);box-shadow:0 20px 40px rgba(26,111,196,0.18);border-color:${C.blue}}
        .text-shimmer{background:linear-gradient(90deg, ${C.blueDark}, ${C.blue}, #00d2ff, ${C.blue}, ${C.blueDark});background-size:200% auto;color:transparent;-webkit-background-clip:text;background-clip:text;animation:shimmer 4s linear infinite}
        .icon-bounce:hover{animation:bounceGently 1s ease-in-out infinite}
        .btn-blue{position:relative;overflow:hidden;background:${C.blue};color:white;border:none;border-radius:6px;padding:12px 28px;font-weight:600;font-size:14px;cursor:pointer;font-family:'Poppins',sans-serif;transition:all 0.3s;box-shadow:0 4px 14px rgba(26,111,196,0.3)}
        .btn-blue:hover{background:${C.blueDark};transform:translateY(-1px);box-shadow:0 6px 20px rgba(26,111,196,0.4)}
        .btn-outline{background:transparent;color:${C.blue};border:2px solid ${C.blue};border-radius:6px;padding:11px 28px;font-weight:600;font-size:14px;cursor:pointer;font-family:'Poppins',sans-serif;transition:all 0.2s}
        .btn-outline:hover{background:${C.blue};color:white}
        .sec-tag{display:inline-block;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${C.blue};margin-bottom:12px}
        .sec-h2{font-size:clamp(26px,3.5vw,40px);font-weight:700;color:${C.text};line-height:1.2;margin-bottom:16px}
        .sec-h2 span{color:${C.blue}}
        .star{color:#f39c12}
        .tcard{background:white;border-radius:14px;padding:28px;border:1.5px solid ${C.border};transition:all 0.3s}
        .tcard:hover{box-shadow:0 10px 30px rgba(26,111,196,0.1);border-color:${C.blue}}
        .acard img{transition:transform 0.4s}
        .acard:hover img{transform:scale(1.06)}
        .wave-container{overflow:hidden;position:relative;height:80px;background:${C.blueLight}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#f0f8ff}::-webkit-scrollbar-thumb{background:${C.blue}55;border-radius:3px}
      `}</style>

      <NavBar />

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: 110, minHeight: "90vh", background: `linear-gradient(135deg, ${C.blueLight} 0%, #dbeeff 50%, #f0f8ff 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative dots */}
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: `${C.blue}30`, top: `${10 + i * 7}%`, left: `${2 + (i % 4) * 2}%`, animation: `floatUp ${3 + (i % 3)}s ease-in-out infinite alternate` }} />
        ))}
        {/* Animated wave bg circles */}
        <div style={{ position: "absolute", right: "5%", top: "10%", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}18 0%, transparent 70%)` }} />
        <div style={{ position: "absolute", right: "8%", top: "12%", width: 380, height: 380, borderRadius: "50%", border: `2px solid ${C.blue}20`, animation: "spin 30s linear infinite" }} />
        <div style={{ position: "absolute", right: "11%", top: "15%", width: 280, height: 280, borderRadius: "50%", border: `2px dashed ${C.blue}15`, animation: "spin 20s linear infinite reverse" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 6%", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div className="reveal">
            <div className="sec-tag">शुद्ध जल · शुद्ध जीवन</div>
            <h1 style={{ fontSize: "clamp(36px,5vw,62px)", fontWeight: 800, lineHeight: 1.1, color: C.text, marginBottom: 20 }}>
              हर बूंद आपको <br /><span className="text-shimmer">ताज़ा और शुद्ध</span> रखेगी!
            </h1>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 32, maxWidth: 460 }}>
              Noida और Greater Noida में DM Water, Battery Water, RO Water, Distilled Water की reliable supply। 99% purity guarantee। ₹35 से शुरू।
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
              <button className="btn-blue">Get A Quote</button>
              <button className="btn-outline">Read More</button>
            </div>
            {/* Trust badges */}
            <div style={{ display: "flex", gap: 28 }}>
              {[["5,000+", "Happy Clients"], ["10+", "Years Experience"], ["99%", "Pure Water"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.blue }}><AnimatedNumber text={n} /></div>
                  <div style={{ fontSize: 12, color: C.muted }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero image – big water can/splash illustration */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div className="pulse-water" />
            <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", background: `${C.blue}14`, zIndex: 1 }} />
            <img className="hero-img"
              src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=85"
              alt="Pure water"
              style={{ width: 420, height: 420, objectFit: "cover", borderRadius: "50%", position: "relative", zIndex: 2, border: `6px solid white`, boxShadow: `0 20px 60px ${C.blue}30` }}
            />
            {/* Floating badges */}
            <div style={{ position: "absolute", bottom: 60, left: 0, background: "white", borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 10, zIndex: 2 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✅</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>GST Verified</div>
                <div style={{ fontSize: 11, color: C.muted }}>Registered Supplier</div>
              </div>
            </div>
            <div style={{ position: "absolute", top: 40, right: -10, background: C.blue, borderRadius: 12, padding: "12px 18px", color: "white", zIndex: 2 }}>
              <div style={{ fontSize: 20, fontWeight: 800 }}>10,000 L</div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>Max Bulk Capacity</div>
            </div>
          </div>
        </div>
        {/* Animated Wave bottom */}
        <div style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: 75, overflow: "hidden", lineHeight: 0 }}>
          <svg style={{ width: "200%", height: "100%", animation: "waveAnim 12s linear infinite" }} viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 C1680,70 1920,0 2160,35 C2400,70 2640,0 2880,35 L2880,70 L0,70 Z" fill={`${C.white}b3`} />
          </svg>
          <svg style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "waveAnim 20s linear infinite" }} viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path d="M0,35 C240,0 480,70 720,35 C960,0 1200,70 1440,35 C1680,0 1920,70 2160,35 C2400,0 2640,70 2880,35 L2880,70 L0,70 Z" fill={C.white} />
          </svg>
        </div>
      </section>

      {/* ─── BRAND LOGOS ─── */}
      <section style={{ padding: "28px 0", borderBottom: `1px solid ${C.border}`, overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", width: "max-content", animation: "marquee 20s linear infinite" }}>
          {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.55, cursor: "pointer", transition: "opacity 0.2s", margin: "0 40px" }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.55}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, animation: "spin 10s linear infinite" }}>💧</div>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.blue, letterSpacing: 1 }}>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section id="aboutus" style={{ padding: "90px 6%", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="sec-tag">Why Choose Us</div>
            <h2 className="sec-h2">Noida का <span>विश्वसनीय</span> Water Supplier</h2>
            <p style={{ fontSize: 15, color: C.muted, maxWidth: 540, margin: "0 auto", lineHeight: 1.8 }}>2017 से Gautam Budh Nagar में industries, labs और households को शुद्ध जल की supply।</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {[
              { img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500&q=80", title: "Industrial Water Supply", desc: "DM, DI और distilled water boilers, batteries और chemical processes के लिए। 99% purity guarantee।" },
              { img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=80", title: "Laboratory Grade Quality", desc: "Lab-grade DI और distilled water जो सभी industrial standards को meet करता है। pH tested।" },
              { img: "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=500&q=80", title: "Bulk RO Water Delivery", desc: "10,000 litre तक bulk RO water। समय पर delivery। Competitive industrial pricing।" },
            ].map((c, i) => (
              <div key={i} className="pcard reveal" style={{ borderRadius: 14, transitionDelay: `${i * 0.15}s` }}>
                <div style={{ overflow: "hidden", height: 200 }}>
                  <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.07)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                </div>
                <div style={{ padding: "22px 20px" }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                    {[["💧", "Pure"], ["🧪", "Tested"], ["🚚", "Fast"]].map(([ic, lb]) => (
                      <div key={lb} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.muted }}>
                        <span>{ic}</span>{lb}
                      </div>
                    ))}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 10 }}>{c.title}</h3>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 16 }}>{c.desc}</p>
                  <a href="#products" style={{ fontSize: 13, fontWeight: 600, color: C.blue, textDecoration: "none" }}>Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCED WORKERS BANNER ─── */}
      <section style={{ background: C.blueLight, padding: "0 6%", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch", minHeight: 320 }}>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1581093458791-9d15482442f5?w=700&q=80" alt="worker"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", maxHeight: 340, display: "block" }} />
            <div style={{ position: "absolute", bottom: 20, left: 20, background: C.blue, borderRadius: 10, padding: "12px 20px", color: "white" }}>
              <div style={{ fontSize: 24, fontWeight: 800 }}><AnimatedNumber text="5,000+" /></div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Satisfied Clients</div>
            </div>
          </div>
          <div style={{ background: C.blue, padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 14 }}>Our Team</div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.25, marginBottom: 20 }}>
              Experienced &amp; Dedicated Water Experts
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.85, marginBottom: 28 }}>
              Ashok Kumar के नेतृत्व में Vikku Water की team 2017 से NCR की industries को timely, pure water supply कर रही है। हर order personally monitored और quality-checked।
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {["GST Registered Verified Business", "pH &amp; Conductivity Tested Every Batch", "Flexible Order Size: 5L से 10,000L तक"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>✓</div>
                  <span dangerouslySetInnerHTML={{ __html: f }} />
                </div>
              ))}
            </div>
            <button className="btn-blue" style={{ alignSelf: "flex-start", background: "white", color: C.blue }}>Read More</button>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section id="products" style={{ padding: "90px 6%", background: "#f7fbff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="sec-tag">Our Products</div>
            <h2 className="sec-h2">हम जो <span>Bottles & Cans</span> Deliver करते हैं</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {PRODUCTS.map((p, i) => (
              <div key={i} className="pcard reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", height: 200, overflow: "hidden" }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.08)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                    {["4 x 5 L", "5 x 20 L"].slice(0, i % 2 + 1).map(t => (
                      <span key={t} style={{ fontSize: 11, background: C.blueLight, color: C.blue, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 8 }}>{p.name}</h3>
                  <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div>
                      <span style={{ fontSize: 18, fontWeight: 700, color: C.blue }}>{p.price}</span>
                      <span style={{ fontSize: 12, color: C.muted, textDecoration: "line-through", marginLeft: 6 }}>{p.old}</span>
                    </div>
                  </div>
                  <button className="btn-blue" style={{ width: "100%", borderRadius: 6, padding: "11px", fontSize: 13 }}>Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO / TRUST BANNER ─── */}
      <section style={{ padding: "0 6%", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", padding: "60px 0 30px" }}>
            <div className="sec-tag">Why We Are</div>
            <h2 className="sec-h2">Bottled Water Industry में <span>Trusted Name</span></h2>
          </div>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 400, marginBottom: 0 }}>
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=80" alt="team"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${C.blue}88, transparent)` }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="pulse-play" style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", background: "white", zIndex: 0 }} />
              <div style={{ width: 70, height: 70, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, cursor: "pointer", boxShadow: "0 0 0 14px rgba(255,255,255,0.2)", transition: "transform 0.2s", zIndex: 1 }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>▶</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 FEATURE ICONS ─── */}
      <section style={{ padding: "60px 6%", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="icon-bounce" style={{ background: C.blueLight, borderRadius: 16, padding: "32px 28px", display: "flex", gap: 18, alignItems: "flex-start", border: `1.5px solid ${C.border}`, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.boxShadow = `0 10px 30px ${C.blue}18`; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.blueLight; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${C.blue}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ACHIEVEMENTS ─── */}
      <section style={{ padding: "70px 6%", background: C.blue }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 10 }}>Our Achievements</div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, color: "white" }}>हमारी उपलब्धियां</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "30px 16px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: "white", lineHeight: 1 }}><AnimatedNumber text={s.n} /></div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: "90px 6%", background: "#f7fbff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="sec-tag">Client Testimonials</div>
            <h2 className="sec-h2">हमारे <span>Clients</span> क्या कहते हैं</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="tcard">
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.blueMid})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{t.role}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, marginBottom: 16 }}>"{t.text}"</p>
                <div style={{ fontSize: 22, color: C.blue, opacity: 0.3, fontFamily: "Georgia", lineHeight: 1 }}>"</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ARTICLES ─── */}
      <section style={{ padding: "90px 6%", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 50 }}>
            <div>
              <div className="sec-tag">News &amp; Articles</div>
              <h2 className="sec-h2">Latest <span>Articles</span></h2>
            </div>
            <button className="btn-outline" style={{ fontSize: 13 }}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {ARTICLES.map((a, i) => (
              <div key={i} className="pcard acard" style={{ borderRadius: 14 }}>
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 14, left: 14, background: C.blue, color: "white", borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 600 }}>{a.cat}</div>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>📅 {a.date} &nbsp;·&nbsp; By Vikku Water</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.5, marginBottom: 16 }}>{a.title}</h3>
                  <a href="#" style={{ fontSize: 13, fontWeight: 600, color: C.blue, textDecoration: "none" }}>Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="contact" style={{ background: "#0d2137", color: "rgba(255,255,255,0.75)", padding: "70px 6% 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 50, paddingBottom: 50, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.blueMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💧</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "white", lineHeight: 1 }}>Vikku Water</div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Supplier</div>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.9, maxWidth: 270, marginBottom: 22 }}>
                Noida, UP में industrial water supply का trusted naam। 2017 से GST-verified, quality-assured service।
              </p>
              <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 8 }}>
                <span>📍 Village-Basai, Barauddin Nagar, Sector-70 Noida, UP – 201308</span>
                <span>📞 +91 99999 XXXXX</span>
                <span>✉ info@vikkuwater.in</span>
              </div>
            </div>
            {/* Services */}
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 20 }}>Services</h4>
              {["DM Water Supply","Battery Water","Distilled Water","RO Water","Soft Water","Raw Water","Boiler Chemicals"].map(s => (
                <div key={s} style={{ fontSize: 13, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#7ec8f7"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}>{s}</div>
              ))}
            </div>
            {/* Useful Links */}
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 20 }}>Useful Links</h4>
              {["Home","About Us","Products","Quality Specs","Bulk Orders","Contact Us","GST Info"].map(l => (
                <div key={l} style={{ fontSize: 13, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#7ec8f7"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}>{l}</div>
              ))}
            </div>
            {/* Subscribe */}
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 20 }}>Subscribe</h4>
              <p style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>Latest offers और water quality tips के लिए subscribe करें।</p>
              <div style={{ display: "flex", gap: 0, marginBottom: 24 }}>
                <input placeholder="Your Email Address" style={{ flex: 1, padding: "11px 14px", border: "none", borderRadius: "6px 0 0 6px", fontSize: 13, background: "rgba(255,255,255,0.1)", color: "white", outline: "none" }} />
                <button style={{ padding: "11px 16px", background: C.blue, border: "none", borderRadius: "0 6px 6px 0", color: "white", cursor: "pointer", fontSize: 14 }}>➤</button>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "white", marginBottom: 12, fontWeight: 600 }}>📞 Office Number</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#7ec8f7" }}>+91 99999 XXXXX</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Mon–Sat, 8am – 7pm</div>
              </div>
            </div>
          </div>
          {/* Bottom bar */}
          <div style={{ padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            <span>© 2024 Vikku Water Supplier. All Rights Reserved. | Proprietor: Ashok Kumar</span>
            <div style={{ display: "flex", gap: 12 }}>
              {["f","t","in","yt"].map(s => (
                <div key={s} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.blue} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}