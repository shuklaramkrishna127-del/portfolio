import React, { useEffect, useRef, useState } from "react";
import {
  Linkedin, Mail, MapPin, Download, ArrowUpRight, ArrowUp,
  Ruler, Box, Users, GraduationCap, Award, Briefcase, ChevronRight, Ban
} from "lucide-react";

/* ---------------------------------------------------------------
   REAL DATA — extracted from the uploaded LinkedIn PDF only.
   Nothing here is invented; anything not present in the source
   is marked as a placeholder in the UI instead of being guessed.
---------------------------------------------------------------- */
const PROFILE = {
  name: "Pawan Singh",
  headline: "Mechanical Engineer · AutoCAD · SOLIDWORKS",
  location: "Indore, Madhya Pradesh, India",
  linkedin: "https://www.linkedin.com/in/pawansingh-07640a226",
  summary:
    "Mechanical CAD Designer with knowledge of AutoCAD 2D/3D and SOLIDWORKS for creating engineering drawings, 3D models, assemblies, and technical documentation. Skilled in mechanical design principles, drafting standards, dimensioning, and converting concepts into accurate design solutions. Able to develop detailed manufacturing drawings and support product development processes. Strong problem-solving ability, attention to detail, and willingness to learn and adapt to new design technologies. Seeking opportunities to apply technical and CAD skills in a professional engineering environment.",
  strengths: ["Attention to detail", "Problem solving", "Fast learner", "Drafting standards & dimensioning", "Cross-functional coordination"],
};

const EXPERIENCE = [
  {
    role: "Human Resources Executive",
    org: "Simplex Metal Processors",
    location: "Bhopal",
    duration: "Jan 2026 – May 2026",
    span: "5 months",
    points: [
      "Handled day-to-day operational tasks for the HR function.",
      "Supported requirements, coordination, onboarding, documentation, payroll, and employee queries.",
      "Executed HR policy and kept daily HR operations running smoothly.",
      "Acted as the point of contact between employees and management.",
    ],
  },
  {
    role: "Computer Operator",
    org: "Rosmerta Safety Systems Pvt. Ltd.",
    location: "Satna",
    duration: "Jan 2025 – Dec 2025",
    span: "1 year",
    points: [
      "Managed attendance, recruitment, and production records.",
      "Handled dispatch tracking through Memo24 and stock summary systems.",
      "Maintained laser-wise production data.",
    ],
  },
];

const EDUCATION = [
  {
    school: "Rewa Engineering College, Rewa",
    degree: "Bachelor of Engineering (B.E.), Mechanical Engineering",
    duration: "Jul 2015 – Jun 2019",
    tag: "DEGREE",
  },
  {
    school: "Bonanza Convent Sr. Sec. School",
    degree: "Higher Secondary, PCM",
    duration: "Jul 2013 – Apr 2015",
    tag: "SCHOOL",
  },
  {
    school: "Jawahar Navodaya Vidyalaya (JNV)",
    degree: "High School, All Subjects",
    duration: "Jul 2008 – Mar 2013",
    tag: "SCHOOL",
  },
];

const CERTIFICATIONS = [
  {
    name: "AutoCAD — CAD/CADD Drafting & Design Technology",
    issuer: "CAD Manic",
    date: "May 2026 – Jun 2026",
  },
  {
    name: "SOLIDWORKS",
    issuer: "CAD Manic",
    date: "Jun 2026 – Jul 2026",
  },
];

const SKILLS = [
  { group: "CAD & Design", items: [
    { name: "SOLIDWORKS", level: "Proficient" },
    { name: "3D Modeling", level: "Proficient" },
    { name: "AutoCAD 2D/3D", level: "Working knowledge" },
    { name: "Drafting standards & dimensioning", level: "Working knowledge" },
  ]},
  { group: "Professional", items: [
    { name: "Human Resources (HR)", level: "Working knowledge" },
    { name: "Cross-team coordination", level: "Proficient" },
  ]},
];

const HONORS = [
  { title: "Mukhyamantri Medhavi Vidyarthi Yojna", note: "Merit-based state honor" },
];

/* ------------------------- helpers ------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Tick({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1V6M1 1H6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function DrawingFrame({ children, className = "", label }) {
  return (
    <div className={`relative border border-white/10 rounded-2xl bg-white/[0.02] ${className}`}>
      <Tick className="absolute -top-1 -left-1 text-cyan-400/50" />
      <Tick className="absolute -top-1 -right-1 text-cyan-400/50 rotate-90" />
      <Tick className="absolute -bottom-1 -left-1 text-cyan-400/50 -rotate-90" />
      <Tick className="absolute -bottom-1 -right-1 text-cyan-400/50 rotate-180" />
      {label && (
        <span className="absolute -top-2.5 left-4 bg-[#0B1120] px-2 text-[10px] tracking-[0.2em] text-cyan-400/70 font-mono">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 bg-gradient-to-r from-cyan-400 to-violet-500" />
        <span className="font-mono text-[11px] tracking-[0.25em] text-cyan-400/80 uppercase">{eyebrow}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {title}
      </h2>
    </Reveal>
  );
}

/* ----------------------- animated counter ----------------------- */
function Counter({ to, suffix = "" }) {
  const [ref, visible] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(to / 40));
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setN(to); clearInterval(id); }
      else setN(start);
    }, 30);
    return () => clearInterval(id);
  }, [visible, to]);
  return (
    <span ref={ref} className="text-4xl md:text-5xl font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {n}{suffix}
    </span>
  );
}

/* ----------------------- isometric wireframe icon ----------------------- */
function WireframeCube() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_22s_linear_infinite]" style={{ transformOrigin: "50% 50%" }}>
      <g stroke="url(#grad)" strokeWidth="1" fill="none" opacity="0.9">
        <polygon points="100,20 170,58 170,132 100,170 30,132 30,58" />
        <line x1="100" y1="20" x2="100" y2="98" />
        <line x1="30" y1="58" x2="100" y2="98" />
        <line x1="170" y1="58" x2="100" y2="98" />
        <line x1="100" y1="98" x2="100" y2="170" />
        <line x1="30" y1="132" x2="100" y2="98" />
        <line x1="170" y1="132" x2="100" y2="98" />
        <circle cx="100" cy="98" r="3" fill="#22D3EE" />
      </g>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="200" y2="200">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* --------------------------- main --------------------------- */

const ROLE_WORDS = ["Mechanical CAD Designer", "SOLIDWORKS Modeler", "AutoCAD Drafter", "HR Executive"];

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [scrollPct, setScrollPct] = useState(0);
  const [typed, setTyped] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [glow, setGlow] = useState({ x: 50, y: 20 });

  // scroll progress
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      setScrollPct(pct || 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // typing effect
  useEffect(() => {
    const word = ROLE_WORDS[wordIdx % ROLE_WORDS.length];
    let i = 0;
    let deleting = false;
    const id = setInterval(() => {
      if (!deleting) {
        i++;
        setTyped(word.slice(0, i));
        if (i === word.length) { deleting = true; setTimeout(() => {}, 800); }
      } else {
        i--;
        setTyped(word.slice(0, i));
        if (i === 0) { clearInterval(id); setWordIdx((w) => w + 1); }
      }
    }, deleting ? 40 : 90);
    return () => clearInterval(id);
  }, [wordIdx]);

  // mouse glow in hero
  const heroRef = useRef(null);
  const onMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const bg = dark ? "#050816" : "#F4F6FB";
  const text = dark ? "text-white" : "text-slate-900";

  return (
    <div className={`min-h-screen ${text}`} style={{ background: bg, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .blueprint-grid {
          background-image:
            linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px);
          background-size: 36px 36px;
        }
      `}</style>

      {/* scroll progress */}
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 z-50 transition-[width]" style={{ width: `${scrollPct}%` }} />

      {/* navbar */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-[#050816]/60 border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-mono text-sm tracking-widest text-cyan-400">PS // DWG</a>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            {["About", "Experience", "Education", "Skills", "Certifications", "Contact"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">{s}</a>
            ))}
          </div>
          <a href="#contact" className="text-sm px-4 py-1.5 rounded-full border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 transition-colors">
            Hire me
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="top"
        ref={heroRef}
        onMouseMove={onMouseMove}
        className="relative pt-32 pb-24 px-6 overflow-hidden blueprint-grid"
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(139,92,246,0.15), transparent 60%)`,
          }}
        />
        <div className="max-w-6xl mx-auto relative grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-5 font-mono text-[11px] tracking-[0.25em] text-cyan-400/80 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open to opportunities
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {PROFILE.name}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-slate-300 h-8">
              <span className="text-cyan-400 font-mono">{typed}</span>
              <span className="inline-block w-[2px] h-6 bg-cyan-400 ml-1 align-middle animate-pulse" />
            </p>
            <p className="mt-6 max-w-xl text-slate-400 leading-relaxed">
              Turning mechanical concepts into precise 2D drawings and 3D models — with SOLIDWORKS and AutoCAD as the primary tools of the trade.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow">
                <Download size={16} /> Download Resume
              </button>
              <a href="#contact" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 hover:border-cyan-400/50 transition-colors">
                Contact Me <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={18} />
              </a>
              <span className="flex items-center gap-1.5 text-slate-400 text-sm"><MapPin size={14} /> {PROFILE.location}</span>
            </div>
          </div>

          <div className="relative h-72 md:h-96">
            <DrawingFrame label="ISO VIEW" className="w-full h-full flex items-center justify-center">
              <div className="w-56 h-56">
                <WireframeCube />
              </div>
            </DrawingFrame>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading eyebrow="01 · About" title="Summary" />
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10">
          <Reveal>
            <p className="text-slate-300 leading-relaxed text-lg">{PROFILE.summary}</p>
          </Reveal>
          <Reveal delay={100}>
            <DrawingFrame label="STRENGTHS" className="p-6">
              <ul className="space-y-3">
                {PROFILE.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-slate-300">
                    <ChevronRight size={14} className="text-cyan-400 mt-1 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </DrawingFrame>
          </Reveal>
        </div>

        {/* counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {[
            { to: 2, label: "Employers", icon: Briefcase },
            { to: 3, label: "Schools & College", icon: GraduationCap },
            { to: 2, label: "CAD Certifications", icon: Ruler },
          ].map((c) => (
            <Reveal key={c.label}>
              <DrawingFrame className="p-6 text-center">
                <c.icon className="mx-auto mb-2 text-cyan-400" size={20} />
                <Counter to={c.to} suffix="+" />
                <p className="text-slate-400 text-sm mt-1">{c.label}</p>
              </DrawingFrame>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading eyebrow="02 · Career" title="Experience" />
        <div className="relative border-l border-white/10 ml-2">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.role} delay={i * 100} className="relative pl-8 pb-12 last:pb-0">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{e.role}</h3>
                  <span className="font-mono text-xs text-cyan-400/80">{e.duration} · {e.span}</span>
                </div>
                <p className="text-slate-400 mt-1">{e.org} — {e.location}</p>
                <ul className="mt-4 space-y-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2 text-slate-300 text-sm">
                      <span className="text-violet-400 mt-0.5">▸</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading eyebrow="03 · Foundation" title="Education" />
        <div className="grid md:grid-cols-3 gap-6">
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.school} delay={i * 80}>
              <DrawingFrame label={ed.tag} className="p-6 h-full hover:border-violet-400/40 transition-colors">
                <GraduationCap className="text-violet-400 mb-3" size={20} />
                <h3 className="font-semibold leading-snug">{ed.school}</h3>
                <p className="text-slate-400 text-sm mt-2">{ed.degree}</p>
                <p className="font-mono text-xs text-slate-500 mt-3">{ed.duration}</p>
              </DrawingFrame>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading eyebrow="04 · Toolset" title="Skills" />
        <div className="grid md:grid-cols-2 gap-8">
          {SKILLS.map((group) => (
            <Reveal key={group.group}>
              <h3 className="font-mono text-xs tracking-[0.2em] text-cyan-400/80 uppercase mb-5">{group.group}</h3>
              <div className="space-y-5">
                {group.items.map((s) => {
                  const width = s.level === "Proficient" ? "88%" : "62%";
                  return (
                    <div key={s.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-200">{s.name}</span>
                        <span className="text-slate-500 font-mono text-xs">{s.level}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 transition-all duration-1000" style={{ width }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-6 font-mono">* Levels are self-assessed indicators, not numeric benchmarks.</p>
      </section>

      {/* PROJECTS — placeholder, none listed on profile */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading eyebrow="05 · Work" title="Projects" />
        <Reveal>
          <DrawingFrame label="PLACEHOLDER" className="p-10 text-center border-dashed">
            <Box className="mx-auto text-slate-500 mb-3" size={28} />
            <p className="text-slate-400 max-w-md mx-auto">
              No public project entries were listed on the LinkedIn profile. This section is ready to showcase SOLIDWORKS assemblies, AutoCAD drawing sets, or manufacturing drawings — just add title, stack, and screenshots.
            </p>
          </DrawingFrame>
        </Reveal>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading eyebrow="06 · Credentials" title="Certifications" />
        <div className="grid md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((c) => (
            <Reveal key={c.name}>
              <DrawingFrame className="p-6 h-full hover:border-emerald-400/30 transition-colors">
                <Award className="text-emerald-400 mb-3" size={20} />
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{c.issuer}</p>
                <p className="font-mono text-xs text-slate-500 mt-3">{c.date}</p>
              </DrawingFrame>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading eyebrow="07 · Recognition" title="Honors & Awards" />
        <div className="grid md:grid-cols-2 gap-6">
          {HONORS.map((h) => (
            <Reveal key={h.title}>
              <DrawingFrame className="p-6 flex items-start gap-4 hover:border-yellow-400/30 transition-colors">
                <Award className="text-yellow-400 shrink-0" size={22} />
                <div>
                  <h3 className="font-semibold">{h.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{h.note}</p>
                </div>
              </DrawingFrame>
            </Reveal>
          ))}
          <Reveal>
            <DrawingFrame label="PLACEHOLDER" className="p-6 flex items-center gap-3 border-dashed text-slate-500">
              <Ban size={18} /> No hackathon or competition entries listed.
            </DrawingFrame>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading eyebrow="08 · Reach out" title="Contact" />
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400/60" placeholder="Your name" />
              <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400/60" placeholder="Your email" type="email" />
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm h-32 focus:outline-none focus:border-cyan-400/60" placeholder="Message" />
              <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 font-medium hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-shadow">
                Send message
              </button>
              <p className="text-xs text-slate-500 font-mono">Form is UI-only in this preview — connect it to an email service (e.g. Formspree, EmailJS) to go live.</p>
            </form>
          </Reveal>
          <Reveal delay={100}>
            <DrawingFrame className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-slate-300"><MapPin size={16} className="text-cyan-400" /> {PROFILE.location}</div>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors">
                <Linkedin size={16} className="text-cyan-400" /> linkedin.com/in/pawansingh-07640a226
              </a>
              <div className="flex items-center gap-3 text-slate-500">
                <Mail size={16} /> Email not public on profile — add yours here
              </div>
            </DrawingFrame>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-slate-500">© {new Date().getFullYear()} Pawan Singh · Built with care</span>
          <a href="#top" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 transition-colors">
            <ArrowUp size={16} />
          </a>
        </div>
      </footer>
    </div>
  );
}
