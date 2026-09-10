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

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=919811036674&text&type=phone_number&app_absent=0";

const PRODUCTS = [
  { name: "DM (Demineralized) Water", img: "/dm-demineralized-water-supplier.jpg", 
    desc: "Industrial Grade",
    details: ["Purity: 99%", "Usage: Industrial"] },
  { name: "Distilled Water", img: "/distilled-water-supplier.jpg", 
    desc: "Source: H2O",
    details: ["Usage: Laboratory", "Boiling Point: 100°C"] },
  { name: "DI Water", img: "/DI-deionized-water.jpg", 
    desc: "Deionized Water",
    details: ["Conductivity: < 1.3", "Usage: Laboratory"] },
  { name: "Battery Water", img: "/battery-water-supplier.jpg", 
    desc: "Can Packaging",
    details: ["Capacity: 20 L", "Usage: Battery / Inverter"] },
  { name: "R.O. Water", img: "/ro-water-supplier.jpg", 
    desc: "Reverse Osmosis Purification",
    details: ["Type: Filtered RO Water", "Purity: 99%"] },
  { name: "Soft Water", img: "/soft-water-supplier.jpg", 
    desc: "Softened Water",
    details: ["Hardness: Low", "Usage: Industrial"] },
  { name: "RAW Water", img: "/raw-water-supplier.jpg",
    desc: "Liquid State",
    details: ["pH Value: 6.5-8.5", "Purity: 99%"] }
];

const WATER_DETAILS = [
  { name: "DM (Demineralized) Water", img: "/dm-demineralized-water-supplier.jpg",
    desc: "DM (Demineralized Water) is the water that is purified by using the technology to remove most of its mineral and salt ions such as Calcium, Chloride, Sulphate, Magnesium & Sodium. DM (Demineralized Water) is also known as demi water or deionised water. Demineralised water is generally considered different from distilled water.",
    uses: "DM (Demineralized Water) is used for Industrial & Scientific purposes in Laboratory, Car Wash, Computer Chip Washing, Lead-acid batteries & Cooling Systems, Boiler Feed, Laser Cutting, Optimisation of Fuel Cells, Steam Irons & Steam Raising Applications, Pharmaceutical Manufacturing, Cosmetics, Aquariums & Fire extinguishers." },
  { name: "Distilled Water", img: "/distilled-water-supplier.jpg",
    desc: "Distilled Water is the water that is boiled into vapor and condensed back into liquid in a separate container. Impurities in the original water that do not boil below or near the boiling point of water remain in the original container. Thus, distilled water is a type of purified water.",
    uses: "Distilled Water is used for steam irons, aquariums, watering plants, car cooling systems, laboratory experiments, certain medical devices etc." },
  { name: "DI (Deionized) Water", img: "/DI-deionized-water.jpg",
    desc: "Deionization (\"DI Water\") simply means the removal of ions. Ion exchange resins are used to exchange non desirable cations and anions with hydrogen and hydroxyl, respectively, forming pure water (H20), which is not an ion.",
    uses: "Deionized (DI) water is commonly used in scientific applications where experiments using water can be counted on to be 100% pure, leading to more predictable and repeatable results. This type of water is also used in pharmaceutical applications for safety and consistency reasons." },
  { name: "Battery Water", img: "/battery-water-supplier.jpg",
    desc: "In lead-acid batteries, water purity can have a major effect on product performance. Water usage needs to be viewed as a priority for maximum performance. The popular misconception is that any type of water can be used. Natural waters may vary considerably in the amount of impurities they contain. So Battery Water plays a key role in the performance and life of a battery.",
    uses: null },
  { name: "R.O. Water", img: "/ro-water-supplier.jpg",
    desc: "RO Water is produced through Reverse Osmosis (RO) which is a pressure-driven membrane process used for purification of water. In all pressure-driven membrane processes, water passes through the membranes more easily than the contaminants that are being removed. However, not all of the water supplied to an RO membrane passes through the membrane.",
    uses: null },
  { name: "Soft Water", img: "/soft-water-supplier.jpg",
    desc: "Soft Water is the water that is free from dissolved salts of such metals as calcium, iron, or magnesium, which form insoluble deposits such as appear as scale in boilers or soap curds in bathtubs and laundry equipment.",
    uses: null },
  { name: "RAW Water", img: "/raw-water-supplier.jpg",
    desc: "Raw Water is the water which is found in the environment that has not been treated and does not have any of its minerals, ions, particles, bacteria, or parasites removed. Raw water includes rainwater, ground water, water from infiltration wells, and water from bodies like lakes and rivers.",
    uses: null },
];

const FEATURES = [
  { icon: "💧", title: "99% Purity Guaranteed", desc: "Every batch tested for pH, conductivity and bacterial count before dispatch." },
  { icon: "🔬", title: "3-Stage Filtration", desc: "Sediment → Activated Carbon → RO/DM treatment for each water type." },
  { icon: "🚫", title: "Chemical-Free", desc: "No harmful additives. Pure, safe water meeting industrial standards." },
];

const STATS = [
  { n: "5,000+", l: "Happy Clients" },
  { n: "8+", l: "Product Types" },
  { n: "20+", l: "Years Experience" },
  { n: "678", l: "Bulk Deliveries / Month" },
];

const TESTIMONIALS = [
  { name: "Rajesh Sharma", role: "Factory Owner, Noida", text: "Vikku Water has been our DM water supplier for 3 years. Delivery is always on time and quality is consistently excellent. Highly recommend!", avatar: "RS" },
  { name: "Priya Mehta", role: "Lab Manager, Greater Noida", text: "We rely on Vikku for distilled and DI water for our laboratory. Their water meets all our purity requirements without fail.", avatar: "PM" },
  { name: "Suresh Gupta", role: "Proprietor, Gurugram", text: "Best battery water supplier in NCR. Our inverters last longer since we switched to Vikku's distilled alkaline battery water.", avatar: "SG" },
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

function NavBar({ currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    ["Home", "#home"],
    ["About Us", "#aboutus"],
    ["Water We Supply", "#products"],
    ["Contact Us", "#contact"],
    ["Enquiry", "#enquiry"],
  ];

  const isActive = (hash) => (currentPage || "#home") === hash || (!currentPage && hash === "#home");

  const go = (hash) => {
    setMenuOpen(false);
    window.location.hash = hash;
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled || menuOpen ? C.white : "rgba(255,255,255,0.97)", boxShadow: scrolled ? "0 2px 20px rgba(26,111,196,0.12)" : "none", transition: "all 0.3s", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}` }}>
      {/* Top bar */}
      <div className="top-bar" style={{ background: C.blue, padding: "6px 6%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 24, fontSize: 12, color: "rgba(255,255,255,0.9)", cursor: "pointer" }} onClick={() => window.location.hash = ""}>
          <span>📍 Vill.-Basai, Sector-70, Noida (U.P.)</span>
          <span>✉ vikkuwatersupplier@gmail.com</span>
          <span>📞 +91 9811036674</span>
        </div>
      </div>
      {/* Main nav */}
      <div className="nav-bar-inner">
        <div className="nav-logo" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => go("")}>
          <img src="/logo.png" alt="Vikku Water Supplier" className="nav-logo-img" style={{ height: 48, width: "auto", objectFit: "contain", borderRadius: 6 }} />
        </div>
        <div className="nav-links">
          {links.map(([l, hash]) => (
            <div key={l} onClick={() => go(hash)} style={{ fontSize: 14, fontWeight: isActive(hash) ? 700 : 500, color: isActive(hash) ? C.blue : C.text, textDecoration: "none", transition: "color 0.2s", fontFamily: "'Poppins', sans-serif", cursor: "pointer", borderBottom: isActive(hash) ? `2px solid ${C.blue}` : "2px solid transparent", paddingBottom: 4 }}
              onMouseEnter={e => e.target.style.color = C.blue} onMouseLeave={e => { if (!isActive(hash)) e.target.style.color = C.text; }}>{l}</div>
          ))}
        </div>
        <div className="nav-btn" style={{ display: "flex", gap: 10 }}>
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
        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none" }} />
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, padding: "12px 5% 24px", display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 24px 48px rgba(0,0,0,0.12)" }}>
          {links.map(([l, hash]) => (
            <div key={l} onClick={() => go(hash)} style={{ padding: "14px 8px", fontSize: 16, fontWeight: isActive(hash) ? 700 : 500, color: isActive(hash) ? C.blue : C.text, cursor: "pointer", borderBottom: `1px solid ${C.border}`, transition: "all 0.2s", background: isActive(hash) ? C.blueLight : "transparent", borderRadius: isActive(hash) ? 8 : 0 }}
              onMouseEnter={e => { e.target.style.color = C.blue; e.target.style.paddingLeft = "12px"; }}
              onMouseLeave={e => { if (!isActive(hash)) e.target.style.color = C.text; e.target.style.paddingLeft = "8px"; }}>{l}</div>
          ))}
          <button className="btn-blue" style={{ marginTop: 16, width: "100%", fontSize: 15, padding: "14px 20px" }} onClick={() => go("#enquiry")}>Get A Quote</button>
        </div>
      )}
    </nav>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(window.location.hash || "#home");

  useEffect(() => {
    const handleHash = () => {
      setCurrentPage(window.location.hash || "#home");
      window.scrollTo(0,0);
    };
    window.addEventListener("hashchange", handleHash);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    
    return () => {
      window.removeEventListener("hashchange", handleHash);
      observer.disconnect();
    };
  }, [currentPage]);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: C.white, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        html,body{overflow-x:hidden;max-width:100%}
        body{-webkit-font-smoothing:antialiased}
        img{max-width:100%}
        button,input,select,textarea{-webkit-tap-highlight-color:transparent;font-family:'Poppins',sans-serif}
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
        
        /* ─── RESPONSIVE STYLES ─── */
        .nav-links { display: flex; gap: 30px; align-items: center; }
        .nav-bar-inner { padding: 0 6%; display: flex; align-items: center; justify-content: space-between; height: 68px; gap: 20px; }
        .hamburger { display: none; flex-direction: column; justify-content: center; gap: 5px; cursor: pointer; padding: 8px; flex-shrink: 0; }
        .hamburger span { display: block; width: 24px; height: 2px; background: ${C.blue}; border-radius: 2px; transition: all 0.3s; }
        .hero-grid { max-width: 1200px; margin: 0 auto; padding: 60px 6%; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .grid-3-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; align-items: stretch; min-height: 320px; }
        .grid-4-col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .articles-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; }
        .articles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        .stat-cell { border-right: 1px solid rgba(255,255,255,0.2); }
        .stat-cell:last-child { border-right: none; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; }
        
        @media (max-width: 1024px) {
          .top-bar { display: none !important; }
          .nav-links { display: none; }
          .nav-btn { display: none !important; }
          .hamburger { display: flex; }
          .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 24px; }
          .hero-grid p { margin: 0 auto 20px auto; }
          .hero-grid .reveal > div:nth-child(4) { justify-content: center; }
          .hero-grid .reveal > div:nth-child(5) { justify-content: center; }
          .grid-3-col, .grid-4-col, .grid-2-col { grid-template-columns: 1fr; }
          .stat-cell { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.2); }
          .stat-cell:last-child { border-bottom: none; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          .footer-grid > div { margin: 0; }
          .footer-brand, .footer-subscribe { grid-column: auto; }
          .articles-header { flex-direction: column; align-items: center; text-align: center; gap: 16px; }
          .articles-grid { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 20px; margin: 0 -6%; padding-left: 6%; padding-right: 6%; gap: 16px; scroll-padding-left: 6%; }
          .articles-grid > div { min-width: 75vw; scroll-snap-align: start; flex-shrink: 0; margin-bottom: 0; }
          .hero-img { width: 240px !important; height: 240px !important; }
          .hero-decor { display: none; }
        }

        @media (max-width: 640px) {
          .nav-bar-inner { height: 56px; padding: 0 4%; }
          .nav-logo-img { height: 38px !important; }
          .hero { padding-top: 72px !important; min-height: auto !important; }
          .hero-grid { padding: 24px 4% 40px; gap: 20px; }
          .hero h1 { font-size: 26px !important; line-height: 1.3 !important; }
          .hero-img { width: 180px !important; height: 180px !important; }
          .hero-img-wrap { max-width: 100%; margin: 0 auto; }
          .hero-collage { max-width: 320px !important; margin-bottom: 20px !important; }
          .hero-collage-main { height: 210px !important; border-radius: 16px !important; }
          .hero-collage-float1 { width: 95px !important; height: 95px !important; top: -14px !important; left: -8px !important; border-radius: 12px !important; }
          .hero-collage-float2 { width: 88px !important; height: 88px !important; bottom: -12px !important; right: -8px !important; }
          .hero-collage-badge { padding: 7px 12px !important; }
          .hero-collage-badge div:first-child { font-size: 16px !important; }
          .hero-collage-ring { width: 100px !important; height: 100px !important; top: -20px !important; right: -14px !important; }
          .video-banner { height: 220px !important; border-radius: 12px !important; }
          .hero-badge-left { bottom: 30px !important; left: 10px !important; padding: 8px 10px !important; }
          .hero-badge-right { top: 10px !important; right: 10px !important; padding: 8px 10px !important; }
          .hero-badge-right > div:first-child { font-size: 16px !important; }
          .page-hero { padding: 90px 4% 32px !important; }
          .page-hero h1 { font-size: 26px !important; }
          .sec-h2 { font-size: 22px; line-height: 1.3; }
          .sec-tag { font-size: 11px; letter-spacing: 1px; }
          .stat-num { font-size: 28px !important; }
          .stat-cell { padding: 20px 12px !important; }
          .team-panel { padding: 24px 18px !important; }
          .form-card { padding: 20px 16px !important; }
          .hero-cta { width: 100%; flex-direction: column; gap: 10px; }
          .hero-cta .btn-blue, .hero-cta .btn-outline { width: 100%; text-align: center; padding: 12px 18px; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 18px; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-links { margin-bottom: 0; }
          .footer-bottom { flex-direction: column; text-align: center; gap: 10px; padding: 16px 0 !important; }
          .btn-blue, .btn-outline { padding: 11px 18px; font-size: 13px; }
          .tcard { padding: 20px; }
          .pcard { border-radius: 10px; }
          .pcard > div:first-child { height: 160px !important; }
          .why-choose-img { height: 180px !important; }
          .grid-3-col { gap: 16px; }
          .grid-4-col { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .icon-bounce { padding: 20px 16px !important; }
          .icon-bounce > div:first-child { width: 42px !important; height: 42px !important; font-size: 20px !important; }
        }
      `}</style>

      <NavBar currentPage={currentPage} />

      {currentPage !== "#home" && currentPage !== "" && (
        <section className="page-hero" style={{ paddingTop: 160, paddingBottom: 80, background: `linear-gradient(135deg, ${C.blueDark} 0%, ${C.blue} 100%)`, textAlign: "center", color: "white" }}>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, marginBottom: 12 }}>
            {currentPage === "#aboutus" ? "About Us" : currentPage === "#products" ? "Water We Supply" : currentPage === "#contact" ? "Contact Us" : currentPage === "#enquiry" ? "Enquiry" : "Page"}
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 600, margin: "0 auto" }}>Noida's Premium DM and RO Water Supplier</p>
        </section>
      )}

      {/* ─── HERO ─── */}
      {(currentPage === "#home" || currentPage === "") && (
      <section className="hero" style={{ paddingTop: 110, minHeight: "90vh", background: `linear-gradient(135deg, ${C.blueLight} 0%, #dbeeff 50%, #f0f8ff 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative dots */}
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: `${C.blue}30`, top: `${10 + i * 7}%`, left: `${2 + (i % 4) * 2}%`, animation: `floatUp ${3 + (i % 3)}s ease-in-out infinite alternate` }} />
        ))}
        {/* Animated wave bg circles */}
        <div className="hero-decor" style={{ position: "absolute", right: "5%", top: "10%", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}18 0%, transparent 70%)` }} />
        <div className="hero-decor" style={{ position: "absolute", right: "8%", top: "12%", width: 380, height: 380, borderRadius: "50%", border: `2px solid ${C.blue}20`, animation: "spin 30s linear infinite" }} />
        <div className="hero-decor" style={{ position: "absolute", right: "11%", top: "15%", width: 280, height: 280, borderRadius: "50%", border: `2px dashed ${C.blue}15`, animation: "spin 20s linear infinite reverse" }} />

        <div className="hero-grid">
          <div className="reveal">
            <div className="sec-tag">शुद्ध जल · शुद्ध जीवन</div>
            <h1 style={{ fontSize: "clamp(36px,5vw,62px)", fontWeight: 800, lineHeight: 1.1, color: C.text, marginBottom: 20 }}>
              हर बूंद आपको <br /><span className="text-shimmer">ताज़ा और शुद्ध</span> रखेगी!
            </h1>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 24, maxWidth: 520 }}>
              Founded in 2001, <strong>Vikku Water Supplier</strong> is a prominent and widely renowned Water Supplier of DM (Demineralized) Water, Distilled Water, Battery Water, Soft Water, R.O. Water, DI Water & RAW Water in Noida, Greater Noida, Ghaziabad, Delhi NCR & Meerut. We supply water to various Industries, Business Units, Builders, Contractors, Caterers etc.
            </p>
            <div className="hero-cta" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
              <button className="btn-blue">Get A Quote</button>
              <button className="btn-outline">Read More</button>
            </div>
            {/* Trust badges */}
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[["5,000+", "Happy Clients"], ["20+", "Years Experience"], ["99%", "Pure Water"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.blue }}><AnimatedNumber text={n} /></div>
                  <div style={{ fontSize: 12, color: C.muted }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero images collage */}
          <div className="hero-img-wrap" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div className="hero-collage" style={{ position: "relative", maxWidth: 460, width: "100%", marginBottom: 26 }}>
              {/* Decorative spinning ring */}
              <div className="hero-collage-ring" style={{ position: "absolute", top: -34, right: -26, width: 150, height: 150, borderRadius: "50%", border: `2px dashed ${C.blue}45`, animation: "spin 25s linear infinite", zIndex: 0 }} />
              {/* Main fleet image */}
              <img src="/vikkuwaters2.jpeg" alt="Vikku Water Fleet" className="hero-collage-main"
                style={{ width: "100%", height: 310, objectFit: "cover", objectPosition: "center 45%", borderRadius: 20, border: "6px solid white", boxShadow: "0 24px 60px rgba(26,111,196,0.28)", display: "block", position: "relative", zIndex: 1 }} />
              {/* Floating image – red tanker */}
              <img src="/vikkuwaters.jpeg" alt="Vikku Water Tanker" className="hero-collage-float1"
                style={{ position: "absolute", top: -26, left: -22, width: 155, height: 155, objectFit: "cover", objectPosition: "center 30%", borderRadius: 16, border: "5px solid white", boxShadow: "0 16px 40px rgba(26,111,196,0.32)", transform: "rotate(-4deg)", zIndex: 2 }} />
              {/* Floating image – orange tanker (circular) */}
              <img src="/vikkuwaters3.jpeg" alt="Vikku Water Supplier Tanker" className="hero-collage-float2"
                style={{ position: "absolute", bottom: -20, right: -16, width: 145, height: 145, objectFit: "cover", borderRadius: "50%", border: "5px solid white", boxShadow: "0 16px 40px rgba(26,111,196,0.32)", zIndex: 2 }} />
              {/* Years badge */}
              <div className="hero-collage-badge" style={{ position: "absolute", top: 14, right: 14, background: C.blue, color: "white", borderRadius: 12, padding: "10px 16px", boxShadow: "0 10px 24px rgba(26,111,196,0.45)", textAlign: "center", zIndex: 3 }}>
                <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1 }}>20+</div>
                <div style={{ fontSize: 10, opacity: 0.9 }}>Years of Trust</div>
              </div>
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
      )}

      {/* ─── BRAND LOGOS ─── */}
      {(currentPage === "#home" || currentPage === "") && (
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
      )}

      {/* ─── ABOUT US CONTENT ─── */}
      {currentPage === "#aboutus" && (
      <section style={{ padding: "clamp(52px, 8vw, 90px) 6%", background: C.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 2, marginBottom: 18 }}>
              Founded in 2001, <strong style={{ color: C.text }}>"Vikku Water Supplier"</strong> is a prominent and widely renowned Water Supplier of DM (Demineralized) Water, Distilled Water, Battery Water, Soft Water, R.O. Water, DI Water & RAW Water in Noida & Greater Noida as well as other nearby places such as Ghaziabad, Sahibabad, Mohan Nagar, Anand Vihar, Delhi NCR & Meerut. We supply Water to various Industries, Business Units, Builders, Contractors, Caterers etc. With each passing year, we have achieved new milestones and have now been positioned as pioneers in terms of techno-managerial acumen and quality of water in the water supply domain.
            </p>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 2, margin: 0 }}>
              Though a span of twenty years is not so long period in a water supplier's life but our relentless endeavour to prove ourselves trusts worthy in supplying quality DM (Demineralized) Water, Distilled Water, Battery Water, Soft Water, R.O. Water, DI Water & RAW Water, has made us synonymous in Noida, Greater Noida & Delhi NCR Region.
            </p>
          </div>
          {[
            { title: "Infrastructure", text: "We are well-equipped with Most Modern Machines, Technolgies, Treatment Plants & Transportation Vehicles to deliver quality water to our customers with an efficient team of Supervisors, Technical Experts & Drivers. We have 2 Sites for producing quality Water in Noida & Greater Noida." },
            { title: "Quality Assurance", text: "Starting right from the procurement of raw material till the final dispatch to the clients' place, we take stringent control of quality at every stage. This ensures our consciousness towards delivering flawless range of products to our customers. We value the time and prestige of our customers and thus we subject our products to various stringent norms so as to ensure their reliability." },
            { title: "Our Water Range", text: "Since the inception, we were supplying Distilled Water. To further strengthen and expand our enterprise, motivated by its grand success; we have introduced another range such as DM (Demineralized) Water, Battery Water, Soft Water, R.O. Water, DI Water & RAW Water to bring out the latest strategies in the field of water supply in Noida, Greater Noida & Delhi NCR." },
          ].map((b, i) => (
            <div key={b.title} className="reveal" style={{ background: "#f7fbff", borderRadius: 14, border: `1.5px solid ${C.border}`, padding: "clamp(20px, 4vw, 32px)", marginBottom: 20, transitionDelay: `${i * 0.1}s` }}>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: C.blue, marginBottom: 10 }}>{b.title}</h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 2, margin: 0 }}>{b.text}</p>
            </div>
          ))}
          <div className="reveal" style={{ background: C.blueLight, borderRadius: 14, padding: "clamp(20px, 4vw, 32px)", border: `1.5px solid ${C.border}` }}>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 2, margin: 0 }}>
              We have built up a sizeable customer base, many of whom are repeat customers who use us for their DM (Demineralized) Water, Distilled Water, Battery Water, Soft Water, R.O. Water, DI Water & RAW Water requirements every time the need arises.
            </p>
          </div>
        </div>
      </section>
      )}

      {/* ─── WHY CHOOSE US ─── */}
      {(currentPage === "#home" || currentPage === "" || currentPage === "#aboutus") && (
      <section id="aboutus" style={{ padding: "clamp(52px, 8vw, 90px) 6%", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="sec-tag">Why Choose Us</div>
            <h2 className="sec-h2">Noida का <span>विश्वसनीय</span> Water Supplier</h2>
            <p style={{ fontSize: 15, color: C.muted, maxWidth: 640, margin: "0 auto", lineHeight: 1.8 }}>2001 से Noida, Greater Noida, Ghaziabad, Delhi NCR और Meerut में हर तरह के businesses को शुद्ध जल की reliable supply।</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 20 }}>
              {["Industries", "Business Units", "Builders", "Contractors", "Caterers"].map(a => (
                <span key={a} style={{ fontSize: 13, fontWeight: 600, background: C.blueLight, color: C.blue, padding: "8px 16px", borderRadius: 30, border: `1.5px solid ${C.border}` }}>{a}</span>
              ))}
            </div>
          </div>
          <div className="grid-3-col">
            {[
              { img: "/dm-demineralized-water-supplier.jpg", title: "Industrial Water Supply", desc: "DM, DI और distilled water boilers, batteries और chemical processes के लिए। 99% purity guarantee।" },
              { img: "/distilled-water-supplier.jpg", title: "Laboratory Grade Quality", desc: "Lab-grade DI और distilled water जो सभी industrial standards को meet करता है। pH tested।" },
              { img: "/ro-water-supplier.jpg", title: "Bulk RO Water Delivery", desc: "10,000 litre तक bulk RO water। समय पर delivery। Competitive industrial pricing।" },
            ].map((c, i) => (
              <div key={i} className="pcard reveal" style={{ borderRadius: 14, transitionDelay: `${i * 0.15}s` }}>
                <div className="why-choose-img" style={{ overflow: "hidden", height: 200 }}>
                  <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.07)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                </div>
                <div style={{ padding: "20px 18px" }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                    {[["💧", "Pure"], ["🧪", "Tested"], ["🚚", "Fast"]].map(([ic, lb]) => (
                      <div key={lb} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.muted }}>
                        <span>{ic}</span>{lb}
                      </div>
                    ))}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>{c.desc}</p>
                  <a href="#products" style={{ fontSize: 13, fontWeight: 600, color: C.blue, textDecoration: "none" }}>Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── PRODUCTS ─── */}
      {(currentPage === "#home" || currentPage === "" || currentPage === "#products" || currentPage === "#services") && (
      <section id="products" style={{ padding: "clamp(52px, 8vw, 90px) 6%", background: "#f7fbff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="sec-tag">Our Products</div>
            <h2 className="sec-h2">हम जो <span>Bottles & Cans</span> Deliver करते हैं</h2>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.9, maxWidth: 900, margin: "16px auto 0" }}>
              Founded in 2001, "Vikku Water Supplier" is a prominent and widely renowned Water Supplier of DM (Demineralized) Water, Distilled Water, Battery Water, Soft Water, R.O. Water, DI Water & RAW Water in Noida & Greater Noida as well as other nearby places such as Ghaziabad, Sahibabad, Mohan Nagar, Anand Vihar, Delhi NCR & Meerut. We supply Water to various Industries, Business Units, Builders, Contractors, Caterers etc.
            </p>
          </div>
          <div className="grid-3-col" style={{ gap: 24 }}>
            {PRODUCTS.map((p, i) => (
              <div key={i} className="pcard reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", height: 200, overflow: "hidden" }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.08)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", minHeight: 24 }}>
                    {p.details.map(t => (
                      <span key={t} style={{ fontSize: 11, background: C.blueLight, color: C.blue, padding: "3px 8px", borderRadius: 4, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6 }}>{p.name}</h3>
                  <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button className="btn-blue" style={{ flex: 1, borderRadius: 6, padding: "12px 8px", fontSize: 13, fontWeight: 600 }} onClick={() => window.open(WHATSAPP_URL, "_blank")}>Get Best Price</button>
                    <button className="btn-outline" style={{ flex: 1, borderRadius: 6, padding: "10px 8px", fontSize: 13, fontWeight: 600, border: `1.5px solid ${C.blue}` }} onClick={() => window.open(WHATSAPP_URL, "_blank")}>Contact</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Detailed water info */}
          <div style={{ marginTop: 60 }}>
            {WATER_DETAILS.map((w, i) => (
              <div key={w.name} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "center", background: "white", borderRadius: 16, border: `1.5px solid ${C.border}`, padding: "clamp(20px, 4vw, 36px)", marginBottom: 24, flexDirection: i % 2 ? "row-reverse" : "row" }}>
                <div style={{ order: i % 2 ? 2 : 1 }}>
                  <img src={w.img} alt={w.name} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 12 }} />
                </div>
                <div style={{ order: i % 2 ? 1 : 2 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: C.blue, marginBottom: 12 }}>{w.name}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.9, marginBottom: w.uses ? 14 : 0 }}>{w.desc}</p>
                  {w.uses && (
                    <>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 6 }}>Uses of {w.name} :</div>
                      <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.9, margin: 0 }}>{w.uses}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── VIDEO / TRUST BANNER ─── */}
      {(currentPage === "#home" || currentPage === "" || currentPage === "#aboutus") && (
      <section style={{ padding: "0 6%", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", padding: "60px 0 30px" }}>
            <div className="sec-tag">Why We Are</div>
            <h2 className="sec-h2">Bottled Water Industry में <span>Trusted Name</span></h2>
          </div>
          <div className="video-banner" style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 400, marginBottom: 0 }}>
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
      )}

      {/* ─── 3 FEATURE ICONS ─── */}
      {(currentPage !== "#contact") && (
      <section style={{ padding: "clamp(40px, 5vw, 60px) 6%", background: C.white }}>
        <div className="grid-3-col" style={{ maxWidth: 1200, margin: "0 auto" }}>
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
      )}

      {/* ─── ACHIEVEMENTS ─── */}
      {(currentPage === "#home" || currentPage === "" || currentPage === "#aboutus") && (
      <section style={{ padding: "clamp(48px, 7vw, 70px) 6%", background: C.blue }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 8 }}>Our Achievements</div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, color: "white" }}>हमारी उपलब्धियां</h2>
          </div>
          <div className="grid-4-col">
            {STATS.map((s, i) => (
              <div key={i} className="stat-cell" style={{ textAlign: "center", padding: "24px 12px" }}>
                <div className="stat-num" style={{ fontSize: 38, fontWeight: 800, color: "white", lineHeight: 1 }}><AnimatedNumber text={s.n} /></div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── TESTIMONIALS ─── */}
      {(currentPage === "#home" || currentPage === "" || currentPage === "#aboutus" || currentPage === "#products") && (
      <section style={{ padding: "clamp(52px, 8vw, 90px) 6%", background: "#f7fbff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="sec-tag">Client Testimonials</div>
            <h2 className="sec-h2">हमारे <span>Clients</span> क्या कहते हैं</h2>
            <div style={{ width: 60, height: 3, background: C.blue, borderRadius: 2, margin: "12px auto 0" }} />
          </div>
          <div className="grid-3-col" style={{ gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="tcard reveal" style={{ position: "relative", transitionDelay: `${i * 0.1}s` }}>
                <div style={{ position: "absolute", top: 16, right: 20, fontSize: 48, color: C.blue, opacity: 0.08, fontFamily: "Georgia", lineHeight: 1 }}>"</div>
                <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#f39c12", fontSize: 14 }}>★</span>)}
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.blueMid})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 16, flexShrink: 0, boxShadow: `0 4px 12px ${C.blue}30` }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{t.role}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, fontStyle: "italic" }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── DEDICATED CONTACT PAGE FORM ─── */}
      {(currentPage === "#contact") && (
      <section style={{ padding: "clamp(52px, 8vw, 90px) 6%", background: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div>
            <div className="sec-tag">Get In Touch</div>
            <h2 className="sec-h2">हमसे <span>संपर्क</span> करें</h2>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>
              Water supply queries, bulk orders, या quality testing के लिए नीचे दिए गए तरीकों से हमसे संपर्क कर सकते हैं। हमारी team जल्द ही आपको respond करेगी।
            </p>
            {[
              { site: "Site 1", addr: "Vill. - Basai, Sector - 70, Noida (U.P.)", phone: "+91 - 9811036674", tel: "+919811036674", map: "https://maps.google.com/maps?q=Village+Basai,+Sector+70,+Noida,+Uttar+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed" },
              { site: "Site 2", addr: "Udyog Kendra 1, Ecotech III, Near Habibpur, Greater Noida (U.P.)", phone: "+91 - 9911096674", tel: "+919911096674", map: "https://maps.google.com/maps?q=Udyog+Kendra+1,+Ecotech+III,+Greater+Noida,+Uttar+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed" },
            ].map(o => (
              <div key={o.site} style={{ background: "white", borderRadius: 14, border: `1.5px solid ${C.border}`, padding: 20, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: C.blue, flexShrink: 0 }}>📍</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>Vikku Water Supplier</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.blue }}>:: {o.site} ::</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 2, marginBottom: 14 }}>
                  <div><strong style={{ color: C.text }}>Address :</strong> {o.addr}</div>
                  <div><strong style={{ color: C.text }}>Mobile No. :</strong> <a href={`tel:${o.tel}`} style={{ color: C.blue, textDecoration: "none" }}>{o.phone}</a></div>
                  <div><strong style={{ color: C.text }}>Email :</strong> <a href="mailto:vikkuwatersupplier@gmail.com" style={{ color: C.blue, textDecoration: "none" }}>vikkuwatersupplier@gmail.com</a></div>
                  <div><strong style={{ color: C.text }}>Website :</strong> www.vikkuwatersupplier.com</div>
                </div>
                <iframe src={o.map} title={`${o.site} Map`} style={{ width: "100%", height: 220, border: 0, borderRadius: 10 }} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── ENQUIRY PAGE ─── */}
      {currentPage === "#enquiry" && (
      <section style={{ padding: "clamp(52px, 8vw, 90px) 6%", background: C.bg }}>
        <div className="grid-2-col" style={{ maxWidth: 1200, margin: "0 auto", gap: "clamp(24px, 4vw, 50px)", alignItems: "start" }}>
          <div className="form-card" style={{ background: "white", padding: "40px", borderRadius: 16, boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 20 }}>Enquiry Form</h3>
            <form style={{ display: "flex", flexDirection: "column", gap: 16 }} onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Your Name" style={{ padding: "13px 16px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: "'Poppins', sans-serif" }} />
              <input type="email" placeholder="Email Address" style={{ padding: "13px 16px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: "'Poppins', sans-serif" }} />
              <input type="tel" placeholder="Phone Number" style={{ padding: "13px 16px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: "'Poppins', sans-serif" }} />
              <select style={{ padding: "13px 16px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: "'Poppins', sans-serif", color: C.muted }}>
                <option>DM (Demineralized) Water</option>
                <option>Distilled Water</option>
                <option>DI Water</option>
                <option>Battery Water</option>
                <option>R.O. Water</option>
                <option>Soft Water</option>
                <option>RAW Water</option>
                <option>Other Enquiry</option>
              </select>
              <textarea placeholder="Write your requirement here..." rows="5" style={{ padding: "13px 16px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: "'Poppins', sans-serif", resize: "vertical" }} />
              <button className="btn-blue" style={{ fontSize: 15, padding: "14px", marginTop: 8 }}>Submit Enquiry</button>
            </form>
          </div>
          <div>
            <div className="sec-tag">Enquiry</div>
            <h2 className="sec-h2">Have a Requirement? <span>Send Enquiry</span></h2>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 30 }}>
              Bulk orders, custom requirements या price quotes के लिए enquiry form भरें। हमारी team जल्द ही आपको आपके requirement के मुताबिक best price के साथ respond करेगी।
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["DM Water", "Distilled Water", "DI Water", "Battery Water", "RO Water", "Soft Water", "RAW Water"].map(w => (
                <div key={w} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: C.text, background: "white", padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${C.border}` }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: C.blue, flexShrink: 0 }}>💧</div>
                  {w}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ─── FOOTER ─── */}
      <footer id="contact" style={{ background: "#0d2137", color: "rgba(255,255,255,0.75)", padding: "40px 6% 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <img src="/logo.png" alt="Vikku Water Supplier" style={{ height: 52, width: "auto", objectFit: "contain", borderRadius: 6, background: "white", padding: 4 }} />
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.8, maxWidth: 260, marginBottom: 14 }}>
                Noida, UP में industrial water supply का trusted naam। 2001 से GST-verified, quality-assured service।
              </p>
              <div style={{ fontSize: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                <span>📍 <strong>Site 1:</strong> Vill.-Basai, Sector-70, Noida (U.P.)</span>
                <span>📍 <strong>Site 2:</strong> Udyog Kendra 1, Ecotech III, Near Habibpur, Greater Noida (U.P.)</span>
                <a href="tel:+919811036674" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>📞 +91 9811036674</a>
                <a href="tel:+919911096674" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>📞 +91 9911096674</a>
                <a href="mailto:vikkuwatersupplier@gmail.com" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>✉ vikkuwatersupplier@gmail.com</a>
              </div>
            </div>
            {/* Quick Links */}
            <div className="footer-links">
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 14 }}>Quick Links</h4>
              {[["Home",""],["About Us","#aboutus"],["Products","#products"],["Contact Us","#contact"],["Enquiry","#enquiry"]].map(([l, hash]) => (
                <a key={l} href={hash} style={{ display: "block", fontSize: 12, marginBottom: 8, color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#7ec8f7"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}>{l}</a>
              ))}
            </div>
            {/* Services */}
            <div className="footer-links">
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 14 }}>Services</h4>
              {["DM Water","RO Water","Distilled Water","Battery Water","DI Water"].map(s => (
                <a key={s} href="#products" style={{ display: "block", fontSize: 12, marginBottom: 8, color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#7ec8f7"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}>{s}</a>
              ))}
            </div>
          </div>
          {/* Bottom bar */}
          <div className="footer-bottom" style={{ padding: "16px 0", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
            <span>© 2024 Vikku Water Supplier. All Rights Reserved.</span>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP BUTTON ─── */}
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp Support"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(37,211,102,0.45)", cursor: "pointer", transition: "transform 0.2s", textDecoration: "none" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}