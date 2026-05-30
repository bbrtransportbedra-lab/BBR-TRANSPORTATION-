import { useState, useEffect, useRef, useCallback } from 'react'

/* ── Constants ──────────────────────────────────────────────────────── */
const PHONE1      = 'tel:+919008702735'
const PHONE2      = 'tel:+919972584546'
const PHONE1_DISP = '+91 90087 02735'
const PHONE2_DISP = '+91 99725 84546'
const WHATSAPP    = 'https://wa.me/919008702735'
const EMAIL       = 'mailto:bbrtransportbedra@gmail.com'
const EMAIL_DISP  = 'bbrtransportbedra@gmail.com'
const ADDRESS     = 'Moodbidri, Dakshina Kannada, Karnataka – 574227'

/* ── SVG Icons ──────────────────────────────────────────────────────── */
const icons = {
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  construct: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6V18M2 12h20"/>
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  loader: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
    </svg>
  ),
  local: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.21 1.15 2 2 0 012.22 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.61-.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  wa: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
}

/* ── Reveal Hook ─────────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Counter ─────────────────────────────────────────────────────────── */
function AnimCounter({ target, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0)
  const [ref, visible] = useReveal(0.3)
  const started = useRef(false)
  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const dur = 1600, fps = 60
    const steps = dur / (1000 / fps)
    let cur = 0
    const inc = target / steps
    const t = setInterval(() => {
      cur = Math.min(cur + inc, target)
      setVal(Math.floor(cur))
      if (cur >= target) clearInterval(t)
    }, 1000 / fps)
    return () => clearInterval(t)
  }, [visible, target])
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>
}

/* ── Nav ─────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const goto = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const links = [
    ['Services', 'services'],
    ['Fleet', 'fleet'],
    ['About', 'about'],
    ['Coverage', 'area'],
    ['Contact', 'contact'],
  ]

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => goto('hero')} aria-label="BBR Transportation home" style={{background:'none',border:'none',cursor:'pointer',padding:0,display:'flex',alignItems:'center',gap:'0.75rem'}}>
            <div className="nav-logo-mark" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <div className="nav-logo-text">
              BBR Transportation
              <span>Moodbidri · Dakshina Kannada</span>
            </div>
          </button>

          <ul className="nav-links" role="list">
            {links.map(([label, id]) => (
              <li key={id}>
                <button onClick={() => goto(id)}>{label}</button>
              </li>
            ))}
          </ul>

          <a className="nav-cta" href={PHONE1} aria-label="Call BBR Transportation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.21 1.15 2 2 0 012.22 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.61-.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            {PHONE1_DISP}
          </a>

          <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
            <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'none' }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
        {links.map(([label, id]) => (
          <button key={id} onClick={() => goto(id)}>{label}</button>
        ))}
        <a href={PHONE1} className="btn btn-primary" style={{display:'flex',justifyContent:'center',marginTop:'1rem'}}>
          Call {PHONE1_DISP}
        </a>
      </div>
    </>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80',
    eyebrow: 'Moodbidri · Dakshina Kannada',
    title: <>Trusted<br /><em>Local</em><br />Transport</>,
    sub: 'Reliable household shifting, goods transport, and material delivery across Dakshina Kannada — with two dependable vehicles and a commitment to on-time service.',
    badges: ['Tata Ace – 750 Kg', 'Bolero Pickup – 1.5 T', '24/7 Available'],
    btns: [
      { label: 'Call Now', href: PHONE1, cls: 'btn-primary' },
      { label: 'WhatsApp Us', href: WHATSAPP, cls: 'btn-outline', ext: true },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    eyebrow: 'Fleet · Tata Ace',
    title: <>Compact.<br /><em>Agile.</em><br />Reliable.</>,
    sub: 'The Tata Ace carries up to 750 Kg and navigates narrow lanes effortlessly — perfect for grocery deliveries, shop stock, and small household moves.',
    badges: ['Payload: 750 Kg', 'Narrow Lane Friendly', 'Half / Full Day Hire'],
    btns: [
      { label: 'Book Tata Ace', href: PHONE1, cls: 'btn-primary' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80',
    eyebrow: 'Fleet · Mahindra Bolero Pickup',
    title: <>Power.<br /><em>Built</em><br />For More.</>,
    sub: 'The Mahindra Bolero Pickup handles up to 1.5 tons with a spacious flatbed — ideal for bulk goods, household shifting, and construction material transport.',
    badges: ['Payload: 1.5 Tons', 'Spacious Flatbed', 'All Road Types'],
    btns: [
      { label: 'Book Bolero Pickup', href: PHONE1, cls: 'btn-primary' },
    ],
  },
]

function Hero() {
  const [current, setCurrent] = useState(0)
  const timer = useRef(null)

  const next = useCallback(() => setCurrent(c => (c + 1) % heroSlides.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length), [])

  useEffect(() => {
    timer.current = setInterval(next, 5000)
    return () => clearInterval(timer.current)
  }, [next])

  const resetTimer = (fn) => {
    clearInterval(timer.current)
    fn()
    timer.current = setInterval(next, 5000)
  }

  return (
    <section className="hero" id="hero" aria-label="Hero carousel">
      {heroSlides.map((s, i) => (
        <div key={i} className={`hero-slide${i === current ? ' active' : ''}`} aria-hidden={i !== current}>
          <div className="hero-slide-img" role="img" aria-label={`Hero image ${i + 1}`}>
            <div className="hero-card-img-inner" style={{
              position:'absolute', inset:0,
              backgroundImage: `url(${s.img})`,
              backgroundSize:'cover', backgroundPosition:'center',
            }} />
          </div>
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-eyebrow">{s.eyebrow}</p>
            <h1 className="hero-title">{s.title}</h1>
            {s.badges.length > 0 && (
              <div className="hero-badges">
                {s.badges.map(b => (
                  <span key={b} className="hero-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FD5E02" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    {b}
                  </span>
                ))}
              </div>
            )}
            <p className="hero-subtitle">{s.sub}</p>
            <div className="hero-actions">
              {s.btns.map(btn => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={`btn ${btn.cls}`}
                  target={btn.ext ? '_blank' : undefined}
                  rel={btn.ext ? 'noreferrer' : undefined}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="hero-controls" aria-label="Carousel controls">
        <button className="hero-arrow" onClick={() => resetTimer(prev)} aria-label="Previous slide">&#8592;</button>
        <div className="hero-dots" role="tablist" aria-label="Slides">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === current ? ' active' : ''}`}
              onClick={() => resetTimer(() => setCurrent(i))}
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              role="tab"
            />
          ))}
        </div>
        <button className="hero-arrow" onClick={() => resetTimer(next)} aria-label="Next slide">&#8594;</button>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}

/* ── Stats Bar ─────────────────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { num: 500, suf: '+', label: 'Happy Customers' },
    { num: 2, suf: '', label: 'Fleet Vehicles' },
    { num: 6, suf: '+', label: 'Service Types' },
    { num: 24, suf: '/7', label: 'Availability' },
  ]
  return (
    <div className="stats-bar" role="region" aria-label="Key statistics">
      <div className="stats-bar-inner">
        {stats.map(s => (
          <div key={s.label} className="stat-item">
            <div className="stat-number">
              <AnimCounter target={s.num} suffix={s.suf} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Services ──────────────────────────────────────────────────────────── */
const servicesData = [
  { icon: icons.home, name: 'Household Shifting', desc: 'Safe, careful relocation of your household belongings across Moodbidri and the surrounding district.' },
  { icon: icons.shop, name: 'Shop & Grocery Delivery', desc: 'Timely stock replenishment and delivery for retail stores and grocery outlets — keeping your shelves full.' },
  { icon: icons.construct, name: 'Construction Materials', desc: 'Heavy transport of sand, bricks, steel, cement and other construction materials across Dakshina Kannada.' },
  { icon: icons.box, name: 'Goods & Parcel Delivery', desc: 'Point-to-point delivery of parcels, commercial goods and packages with speed and accountability.' },
  { icon: icons.loader, name: 'Loading & Unloading', desc: 'Professional, careful handling of cargo — loading and unloading executed with efficiency.' },
  { icon: icons.local, name: 'On-Demand Local Transport', desc: 'Flexible same-day transport bookings for urgent requirements anywhere in Moodbidri zone.' },
]

function Services() {
  const [ref, visible] = useReveal(0.05)
  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div ref={ref} className={`reveal${visible ? ' visible' : ''}`}>
          <p className="section-label">What We Do</p>
          <h2 className="section-title" id="services-title">Our Services</h2>
          <p style={{maxWidth:'520px',color:'var(--muted)',fontSize:'0.95rem',lineHeight:1.8}}>
            End-to-end transport solutions for homes, businesses, and industry across Dakshina Kannada.
          </p>
        </div>
        <div className="services-grid" role="list">
          {servicesData.map((s, i) => (
            <ServiceCard key={s.name} service={s} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, delay }) {
  const [ref, visible] = useReveal(0.1)
  return (
    <div
      ref={ref}
      className={`service-card reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      role="listitem"
    >
      <div className="service-icon" aria-hidden="true">{service.icon}</div>
      <h3 className="service-name">{service.name}</h3>
      <p className="service-desc">{service.desc}</p>
    </div>
  )
}

/* ── Fleet ──────────────────────────────────────────────────────────────── */
const fleetData = [
  {
    name: 'Tata Ace',
    sub: 'Mini Truck',
    cap: '750 Kg Payload',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    features: ['Compact, fits narrow lanes', 'Ideal for grocery & shop stock', 'Half-day & full-day hire', 'Fuel-efficient & reliable', 'Quick availability'],
  },
  {
    name: 'Bolero Pickup',
    sub: 'Mahindra Bolero',
    cap: '1.5 Ton Payload',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    features: ['Spacious open flatbed', 'Heavy load capacity', 'Strong build, all road types', 'Bulk material transport', 'Household shifting ready'],
  },
]

function Fleet() {
  const [ref, visible] = useReveal(0.05)
  return (
    <section className="section fleet-section" id="fleet" aria-labelledby="fleet-title">
      <div className="container">
        <div ref={ref} className={`reveal${visible ? ' visible' : ''}`}>
          <p className="section-label" style={{color:'var(--amber)'}}>Our Vehicles</p>
          <h2 className="section-title section-title--light" id="fleet-title">The Fleet</h2>
          <p style={{maxWidth:'480px',color:'rgba(255,255,255,0.5)',fontSize:'0.95rem',lineHeight:1.8}}>
            Two purpose-built vehicles, always maintained and ready to move your goods safely.
          </p>
        </div>
        <div className="fleet-grid">
          {fleetData.map((v, i) => <FleetCard key={v.name} vehicle={v} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  )
}

function FleetCard({ vehicle, delay }) {
  const [ref, visible] = useReveal(0.1)
  return (
    <div ref={ref} className={`fleet-card reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
      <div className="fleet-card-img">
        <div className="fleet-card-img-inner" style={{ backgroundImage: `url(${vehicle.img})` }} role="img" aria-label={vehicle.name} />
      </div>
      <div className="fleet-card-body">
        <div className="fleet-capacity-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          {vehicle.cap}
        </div>
        <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.35)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'0.4rem',fontWeight:500}}>
          {vehicle.sub}
        </div>
        <h3 className="fleet-name">{vehicle.name}</h3>
        <ul className="fleet-features" role="list">
          {vehicle.features.map(f => <li key={f} role="listitem">{f}</li>)}
        </ul>
        <a href={PHONE1} className="btn btn-primary" style={{display:'inline-flex'}}>
          Book This Vehicle
        </a>
      </div>
    </div>
  )
}

/* ── About ──────────────────────────────────────────────────────────────── */
function About() {
  const [leftRef, leftVis] = useReveal(0.1)
  const [rightRef, rightVis] = useReveal(0.1)
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          {/* Visual */}
          <div ref={leftRef} className={`reveal-left${leftVis ? ' visible' : ''}`}>
            <div className="about-visual" aria-hidden="true">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80"
                alt="BBR Transportation truck in operation"
                className="about-img-main"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"
                alt="BBR Transportation delivery vehicle"
                className="about-img-accent"
                loading="lazy"
              />
              <div className="about-badge-float">
                <span className="num"><AnimCounter target={500} suffix="+" /></span>
                <span className="lbl">Customers<br />Served</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div ref={rightRef} className={`reveal-right${rightVis ? ' visible' : ''}`}>
            <p className="section-label">Who We Are</p>
            <h2 className="section-title" id="about-title">Moodbidri's Transport<br />Partner</h2>
            <div className="about-body">
              <p>
                BBR Transportation is a locally owned and operated transport company based in Moodbidri, Dakshina Kannada. We built this business on a foundation of punctuality, care, and genuine service — and that philosophy shapes every delivery we make.
              </p>
              <p>
                Whether you're a homeowner moving across town, a shop owner needing stock replenishment, or a construction firm requiring daily material runs — our Tata Ace and Mahindra Bolero Pickup fleet is ready to serve.
              </p>
            </div>
            <div className="trust-points">
              {[
                'Locally owned & operated',
                'On-time, every time',
                'Careful goods handling',
                '24/7 availability',
                'Competitive fair pricing',
                'Experienced operators',
              ].map(p => (
                <div key={p} className="trust-point">
                  <div className="trust-dot" aria-hidden="true" />
                  <span className="trust-point-text">{p}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:'2.5rem',display:'flex',gap:'1rem',flexWrap:'wrap'}}>
              <a href={PHONE1} className="btn btn-dark">Call to Book</a>
              <a href={WHATSAPP} className="btn btn-outline" target="_blank" rel="noreferrer" style={{color:'var(--teal)',borderColor:'var(--teal)'}}>WhatsApp Enquiry</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Map ────────────────────────────────────────────────────────────────── */
function MapSection() {
  const mapEl = useRef(null)
  const instance = useRef(null)
  const [ref, visible] = useReveal(0.05)

  useEffect(() => {
    if (instance.current || !mapEl.current) return

    const init = () => {
      const L = window.L
      if (!L) return
      const map = L.map(mapEl.current, { zoomControl: true, scrollWheelZoom: false }).setView([13.0683, 74.9915], 10)
      instance.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map)

      // Service zone
      L.circle([13.0683, 74.9915], {
        radius: 9000,
        fillColor: '#FD5E02',
        fillOpacity: 0.1,
        color: '#FD5E02',
        weight: 2,
        dashArray: '6 4',
      }).addTo(map).bindTooltip('Moodbidri Primary Zone', { permanent: false, direction: 'top' })

      // Marker
      const icon = L.divIcon({
        html: `<div style="width:44px;height:44px;background:#013440;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(1,52,64,0.35);border:3px solid #FD5E02;">
                 <div style="transform:rotate(45deg);color:#FD5E02;font-size:18px;">🚛</div>
               </div>`,
        className: '',
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -48],
      })

      L.marker([13.0683, 74.9915], { icon }).addTo(map).bindPopup(`
        <div style="font-family:'Outfit',sans-serif;padding:4px 0;min-width:210px">
          <strong style="font-size:1rem;color:#013440;display:block;margin-bottom:8px">BBR Transportation</strong>
          <div style="font-size:0.82rem;color:#555;line-height:2">
            📍 ${ADDRESS}<br>
            📞 <a href="${PHONE1}" style="color:#FD5E02;font-weight:600">${PHONE1_DISP}</a><br>
            📞 <a href="${PHONE2}" style="color:#FD5E02;font-weight:600">${PHONE2_DISP}</a><br>
            📧 ${EMAIL_DISP}<br>
            <a href="${WHATSAPP}" target="_blank" style="color:#25D366;font-weight:600">💬 WhatsApp Us</a>
          </div>
        </div>
      `, { maxWidth: 260 }).openPopup()
    }

    if (window.L) { init() } else {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = init
      document.head.appendChild(script)
    }
  }, [])

  return (
    <section className="section map-section" id="area" aria-labelledby="map-title">
      <div className="container">
        <div ref={ref} className={`reveal${visible ? ' visible' : ''}`}>
          <p className="section-label">Where We Operate</p>
          <h2 className="section-title" id="map-title">Service Coverage Area</h2>
          <p style={{maxWidth:'500px',color:'var(--muted)',fontSize:'0.95rem',lineHeight:1.8}}>
            Based in Moodbidri, we serve households and businesses across the Dakshina Kannada district.
          </p>
        </div>
        <div className="map-wrapper">
          <div id="bbr-map" ref={mapEl} aria-label="Service area map" />
        </div>
        <div className="map-chips" role="list">
          {['Based in Moodbidri, Karnataka', 'Serving all of Dakshina Kannada', 'Available 24 hours, 7 days'].map(c => (
            <span key={c} className="map-chip" role="listitem">{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ─────────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [ref, visible] = useReveal(0.05)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nService Needed: ${form.service}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:${EMAIL_DISP}?subject=BBR%20Transport%20Booking%20Enquiry&body=${body}`
    setSubmitted(true)
  }

  const contactDetails = [
    { icon: icons.phone, label: 'Primary Line', val: PHONE1_DISP, href: PHONE1 },
    { icon: icons.phone, label: 'Secondary Line', val: PHONE2_DISP, href: PHONE2 },
    { icon: icons.mail, label: 'Email', val: EMAIL_DISP, href: EMAIL },
    { icon: icons.pin, label: 'Location', val: ADDRESS, href: null },
  ]

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{marginBottom:'3rem'}}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title section-title--light" id="contact-title">Book a Vehicle<br /><em style={{fontStyle:'normal',color:'var(--amber)'}}>or Enquire</em></h2>
        </div>
        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div style={{textAlign:'center',padding:'3rem 1rem'}}>
                <div style={{width:56,height:56,background:'rgba(253,94,2,0.12)',border:'1px solid rgba(253,94,2,0.3)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1.25rem',color:'var(--amber)'}}>
                  {icons.check}
                </div>
                <h3 style={{fontFamily:'var(--font-display)',color:'#fff',fontSize:'1.8rem',marginBottom:'0.75rem',textTransform:'uppercase'}}>Enquiry Sent</h3>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'0.9rem',marginBottom:'1.5rem'}}>We'll reach out to confirm your booking shortly.</p>
                <button className="btn btn-primary btn-sm" onClick={() => setSubmitted(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{fontFamily:'var(--font-display)',color:'#fff',fontSize:'1.5rem',marginBottom:'1.75rem',textTransform:'uppercase',letterSpacing:'0.02em'}}>Booking Enquiry</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required autoComplete="tel" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Required</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service...</option>
                    <option>Household Shifting</option>
                    <option>Shop &amp; Grocery Delivery</option>
                    <option>Construction Material Transport</option>
                    <option>Goods &amp; Parcel Delivery</option>
                    <option>Loading &amp; Unloading</option>
                    <option>On-Demand Local Transport</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message / Details</label>
                  <textarea id="message" name="message" placeholder="Describe your requirement — location, timing, quantity..." value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="contact-info-block">
            <div>
              <p className="contact-info-title">Let's<br /><em>Talk</em></p>
              <p className="contact-info-sub">
                Call or WhatsApp us directly for the fastest response. We're available 24/7 for transport bookings across Moodbidri and Dakshina Kannada.
              </p>
            </div>
            <div className="contact-detail-list">
              {contactDetails.map(d => (
                <div key={d.label} className="contact-detail-item">
                  <div className="contact-detail-icon" aria-hidden="true">{d.icon}</div>
                  <div>
                    <div className="contact-detail-label">{d.label}</div>
                    <div className="contact-detail-val">
                      {d.href
                        ? <a href={d.href}>{d.val}</a>
                        : d.val
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-cta-row">
              <a href={PHONE1} className="btn btn-primary">{icons.phone} Call Now</a>
              <a href={WHATSAPP} className="btn btn-outline" target="_blank" rel="noreferrer" style={{color:'#fff',borderColor:'rgba(255,255,255,0.25)'}}>
                {icons.wa} WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  const goto = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.25rem'}}>
              <div style={{width:34,height:34,background:'var(--amber)',borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.15rem',color:'#fff',textTransform:'uppercase',letterSpacing:'0.02em'}}>BBR Transportation</span>
            </div>
            <p>Moodbidri's trusted local transport partner — reliable, on-time, and customer-first.</p>
            <p style={{marginTop:'0.5rem',fontSize:'0.78rem',color:'rgba(255,255,255,0.3)'}}>Moodbidri, Dakshina Kannada,<br />Karnataka – 574227</p>
          </div>

          <div className="footer-col">
            <h5>Navigation</h5>
            <ul>
              {[['Home','hero'],['Services','services'],['Fleet','fleet'],['About','about'],['Coverage','area'],['Contact','contact']].map(([l,id]) => (
                <li key={id}><button onClick={() => goto(id)}>{l}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              {['Household Shifting','Shop Delivery','Construction Materials','Goods Transport','Loading & Unloading','Local Transport'].map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href={PHONE1}>{PHONE1_DISP}</a></li>
              <li><a href={PHONE2}>{PHONE2_DISP}</a></li>
              <li><a href={EMAIL}>{EMAIL_DISP}</a></li>
            </ul>
            <div style={{marginTop:'1.5rem',display:'flex',flexDirection:'column',gap:'0.6rem'}}>
              <a href={PHONE1} className="btn btn-primary btn-sm" style={{justifyContent:'center'}}>Call to Book</a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-wa" style={{justifyContent:'center'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 BBR Transportation. All rights reserved. | Moodbidri, Karnataka, India</p>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-wa">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Quick WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ── WhatsApp Float ──────────────────────────────────────────────────────── */
function WAFloat() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noreferrer" className="wa-float" aria-label="Chat on WhatsApp">
      <div className="wa-pulse" aria-hidden="true" />
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

/* ── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Fleet />
        <About />
        <MapSection />
        <Contact />
      </main>
      <Footer />
      <WAFloat />
    </>
  )
}
