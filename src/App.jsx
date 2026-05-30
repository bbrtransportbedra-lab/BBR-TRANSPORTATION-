import { useState, useEffect, useRef, useCallback } from 'react'

/* ── Constants ── */
const PHONE1      = 'tel:+919008702735'
const PHONE2      = 'tel:+919972584546'
const PHONE1_DISP = '+91 90087 02735'
const PHONE2_DISP = '+91 99725 84546'
const WHATSAPP    = 'https://wa.me/919008702735'
const EMAIL       = 'mailto:bbrtransportbedra@gmail.com'
const EMAIL_DISP  = 'bbrtransportbedra@gmail.com'
const ADDRESS     = 'Moodubidire, Dakshina Kannada, Karnataka – 574227'

/* ── Carousel images (provided by user) ── */
const IMG_FLEET   = '/fleet.jpg'   // Both vehicles — slide 1
const IMG_ACE     = '/ace.jpg'     // Tata Ace — slide 2
const IMG_BOLERO  = '/bolero.jpg'  // Bolero Pickup — slide 3

/* ── Reveal Hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Counter ── */
function AnimCounter({ target, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0)
  const [ref, visible] = useReveal(0.3)
  const started = useRef(false)
  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const dur = 1800, fps = 60
    const steps = dur / (1000 / fps); let cur = 0; const inc = target / steps
    const t = setInterval(() => {
      cur = Math.min(cur + inc, target); setVal(Math.floor(cur))
      if (cur >= target) clearInterval(t)
    }, 1000 / fps)
    return () => clearInterval(t)
  }, [visible, target])
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>
}

/* ── Icons ── */
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const PhoneIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.21 1.15 2 2 0 012.22 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.61-.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)
const WAIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)
const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const ChevLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)
const ChevRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

/* ══════════════════════════════
   NAV
══════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
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
    ['Blog', 'blog'],
    ['Coverage', 'area'],
    ['Contact', 'contact'],
  ]

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => goto('hero')} aria-label="BBR Transportation home">
            <div className="nav-logo-mark" aria-hidden="true">
              <TruckIcon />
            </div>
            <div className="nav-logo-text">
              BBR Transportation
              <span>Moodubidire · Dakshina Kannada</span>
            </div>
          </button>

          <ul className="nav-links" role="list">
            {links.map(([label, id]) => (
              <li key={id}><button onClick={() => goto(id)}>{label}</button></li>
            ))}
          </ul>

          <a className="nav-cta" href={PHONE1} aria-label="Call BBR Transportation">
            <PhoneIcon size={14} /> {PHONE1_DISP}
          </a>

          <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
            <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
        {links.map(([label, id]) => (
          <button key={id} onClick={() => goto(id)}>{label}</button>
        ))}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a href={PHONE1} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
            <PhoneIcon size={14} /> Call Now
          </a>
          <a href={WHATSAPP} className="btn btn-wa btn-sm" target="_blank" rel="noreferrer" style={{ flex: 1, justifyContent: 'center' }}>
            <WAIcon size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}

/* ══════════════════════════════
   HERO CAROUSEL
══════════════════════════════ */
const heroSlides = [
  {
    bg: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&q=85',
    localImg: IMG_FLEET,
    eyebrow: 'Moodubidire · Est. 2010',
    titleLine1: 'BBR Transportation',
    titleLine2: "Moodubidire's",
    titleAccent: 'Trusted Partner',
    sub: 'Reliable transportation services for households, businesses, shops and industries across Moodubidire and Dakshina Kannada since 2010.',
    type: 'hero',
    btns: [
      { label: 'Call Now', href: PHONE1, cls: 'btn-primary', icon: <PhoneIcon size={16}/> },
      { label: 'WhatsApp Us', href: WHATSAPP, cls: 'btn-outline', icon: <WAIcon size={16}/>, ext: true },
    ],
    badges: ['500+ Customers Served', 'Since 2010', 'Dakshina Kannada Coverage'],
  },
  {
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85',
    localImg: IMG_ACE,
    eyebrow: 'Our Fleet · Vehicle 01',
    titleLine1: 'Tata Ace',
    titleAccent: 'Local Deliveries',
    titleSuffix: 'Perfected',
    sub: 'The ideal vehicle for narrow roads, grocery deliveries and light commercial transport across Moodubidire.',
    type: 'vehicle',
    features: ['Up to 750 Kg Capacity', 'Ideal for Grocery Deliveries', 'Fuel Efficient & Fast', 'Narrow Road Friendly', 'Available 24/7'],
    btns: [
      { label: 'Book Tata Ace', href: PHONE1, cls: 'btn-primary', icon: <PhoneIcon size={16}/> },
    ],
  },
  {
    bg: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&q=85',
    localImg: IMG_BOLERO,
    eyebrow: 'Our Fleet · Vehicle 02',
    titleLine1: 'Bolero Pickup',
    titleAccent: 'Bigger Loads',
    titleSuffix: 'Built For',
    sub: 'Designed for household shifting, bulk deliveries and construction material transport across Dakshina Kannada.',
    type: 'vehicle',
    features: ['Up to 1.5 Ton Capacity', 'Household Shifting', 'Material Transport', 'Bulk Deliveries', 'Commercial Transport'],
    btns: [
      { label: 'Book Bolero Pickup', href: PHONE1, cls: 'btn-primary', icon: <PhoneIcon size={16}/> },
    ],
  },
]

function Hero() {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStartX = useRef(0)
  const autoRef = useRef(null)
  const total = heroSlides.length

  const go = useCallback(idx => {
    setCurrent(((idx % total) + total) % total)
  }, [total])

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 5000)
  }, [total])

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current) }, [startAuto])

  const prev = () => { go(current - 1); startAuto() }
  const next = () => { go(current + 1); startAuto() }

  const onTouchStart = e => { dragStartX.current = e.touches[0].clientX; setDragging(false) }
  const onTouchMove  = e => { if (Math.abs(e.touches[0].clientX - dragStartX.current) > 10) setDragging(true) }
  const onTouchEnd   = e => {
    const dx = e.changedTouches[0].clientX - dragStartX.current
    if (dragging) { if (dx > 50) prev(); else if (dx < -50) next() }
  }

  const slide = heroSlides[current]

  return (
    <section id="hero" className="hero" aria-label="BBR Transportation Hero"
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="hero-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {heroSlides.map((s, i) => (
          <div key={i} className={`hero-slide${i === current ? ' active' : ''}`}>
            <div
              className="hero-slide-bg"
              style={{
                backgroundImage: `url(${s.localImg}), url(${s.bg})`,
              }}
              role="img"
              aria-label={s.eyebrow}
            />
            <div className={`hero-slide-overlay${s.type === 'vehicle' ? ' hero-slide-overlay--vehicle' : ''}`} />
            <div className="hero-content">
              <div className="hero-inner">
                <div className="hero-eyebrow">{s.eyebrow}</div>
                {s.type === 'hero' ? (
                  <>
                    <h1 className="hero-title">
                      {s.titleLine1}<br />
                      {s.titleLine2} <em>{s.titleAccent}</em>
                    </h1>
                    <p className="hero-sub">{s.sub}</p>
                    <div className="hero-badges">
                      {s.badges.map(b => (
                        <span key={b} className="hero-badge">
                          <CheckIcon /> {b}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="hero-title">
                      {s.titleLine1}<br />
                      <em>{s.titleAccent}</em>
                    </h2>
                    <p className="hero-sub">{s.sub}</p>
                    <div className="hero-features">
                      {s.features.map(f => (
                        <div key={f} className="hero-feature">
                          <div className="hero-feature-check"><CheckIcon /></div>
                          {f}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="hero-btns">
                  {s.btns.map(b => (
                    <a key={b.label} href={b.href} className={`btn btn-lg ${b.cls}`}
                       target={b.ext ? '_blank' : undefined} rel={b.ext ? 'noreferrer' : undefined}>
                      {b.icon} {b.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="hero-controls">
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero-dot${i === current ? ' active' : ''}`}
              onClick={() => { go(i); startAuto() }} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="hero-arrows">
          <button className="hero-arrow" onClick={prev} aria-label="Previous slide"><ChevLeft /></button>
          <button className="hero-arrow" onClick={next} aria-label="Next slide"><ChevRight /></button>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}

/* ══════════════════════════════
   TRUST BAR
══════════════════════════════ */
function TrustBar() {
  const stats = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
      num: <><AnimCounter target={500} suffix="+" /></>,
      label: 'Customers Served',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      num: 'Since 2010',
      label: '15+ Years Experience',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      num: 'Moodubidire',
      label: 'Locally Based & Operated',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      num: '24/7',
      label: 'Always Available',
    },
  ]
  return (
    <div className="trust-bar" aria-label="Trust indicators">
      <div className="trust-bar-inner container" style={{ maxWidth: '100%', padding: 0 }}>
        {stats.map((s, i) => (
          <div key={i} className="trust-stat">
            <div className="trust-stat-icon" aria-hidden="true">{s.icon}</div>
            <div className="trust-stat-body">
              <div className="trust-stat-num">{s.num}</div>
              <div className="trust-stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════
   SERVICES
══════════════════════════════ */
const services = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: 'Household Shifting',
    desc: 'Safe and careful household relocation services across Moodubidire and nearby areas. We handle your belongings with care.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    title: 'Goods Transportation',
    desc: 'Reliable goods transport for businesses across Dakshina Kannada. On-time delivery every time, with both vehicles.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    title: 'Shop Deliveries',
    desc: 'Regular shop stock and grocery delivery runs across Moodubidire. Our Tata Ace navigates narrow lanes effortlessly.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6V18M2 12h20"/></svg>,
    title: 'Construction Material',
    desc: 'Heavy material transport including sand, bricks, and construction supplies. Bolero Pickup handles up to 1.5 tons.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>,
    title: 'Loading & Unloading',
    desc: 'Professional loading and unloading assistance for heavy goods, furniture, and commercial consignments.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Local Transportation',
    desc: 'On-demand local transport for any requirement within Moodubidire and surrounding Dakshina Kannada areas.',
  },
]

function Services() {
  const [headerRef, headerVis] = useReveal(0.1)
  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div ref={headerRef} className={`reveal services-header${headerVis ? ' visible' : ''}`}>
          <div>
            <p className="section-eyebrow">What We Offer</p>
            <h2 className="section-title" id="services-title">Our Transport<br /><em>Services</em></h2>
          </div>
          <p className="section-sub">
            From household shifting to commercial deliveries — we cover every transport need across Moodubidire and Dakshina Kannada.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => {
            const [ref, vis] = useReveal(0.08)
            return (
              <div key={s.title} ref={ref} className={`service-card reveal${vis ? ' visible' : ''}`}
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                <div className="service-card-num">0{i + 1}</div>
                <div className="service-icon" aria-hidden="true">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════
   FLEET
══════════════════════════════ */
const vehicles = [
  {
    name: 'Tata Ace Gold',
    sub: 'Light Commercial Vehicle',
    cap: '750 Kg Payload Capacity',
    badge: 'Mini Truck',
    img: IMG_ACE,
    fallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    features: ['Up to 750 Kg Load', 'Narrow Road Access', 'Fuel Efficient Engine', 'Fast Local Delivery', 'Grocery & Shop Deliveries', 'Quick Loading/Unloading'],
  },
  {
    name: 'Mahindra Bolero Pickup',
    sub: 'Heavy Commercial Vehicle',
    cap: '1.5 Ton Payload Capacity',
    badge: 'Pickup Truck',
    img: IMG_BOLERO,
    fallback: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80',
    features: ['Up to 1.5 Ton Load', 'Household Shifting', 'Construction Materials', 'Bulk Commercial Delivery', 'Robust All-Road Performance', 'Wide Load Platform'],
  },
]

function Fleet() {
  const [headerRef, headerVis] = useReveal(0.1)
  return (
    <section className="section fleet-section" id="fleet" aria-labelledby="fleet-title">
      <div className="container">
        <div ref={headerRef} className={`reveal${headerVis ? ' visible' : ''}`} style={{ marginBottom: '3.5rem' }}>
          <p className="section-eyebrow section-eyebrow--light">Our Fleet</p>
          <h2 className="section-title section-title--light" id="fleet-title">
            Two Vehicles.<br /><em>Every Need Covered.</em>
          </h2>
          <p className="section-sub section-sub--light" style={{ marginTop: '0.5rem' }}>
            Whether your load is 50 kg or 1.5 tons — our Tata Ace and Bolero Pickup are ready to serve.
          </p>
        </div>

        <div className="fleet-grid">
          {vehicles.map((v, i) => {
            const [ref, vis] = useReveal(0.08)
            return (
              <div key={v.name} ref={ref} className={`fleet-card reveal${vis ? ' visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="fleet-card-img">
                  <div
                    className="fleet-card-img-inner"
                    style={{ backgroundImage: `url(${v.img}), url(${v.fallback})` }}
                    role="img"
                    aria-label={v.name}
                  />
                  <div className="fleet-card-img-overlay" />
                  <div className="fleet-card-badge">{v.badge}</div>
                </div>
                <div className="fleet-card-body">
                  <div className="fleet-label">{v.sub}</div>
                  <h3 className="fleet-name">{v.name}</h3>
                  <div className="fleet-cap">{v.cap}</div>
                  <ul className="fleet-features">
                    {v.features.map(f => (
                      <li key={f} className="fleet-feature-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a href={PHONE1} className="btn btn-primary">
                      <PhoneIcon size={14} /> Book Now
                    </a>
                    <a href={WHATSAPP} className="btn btn-outline" target="_blank" rel="noreferrer">
                      <WAIcon size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════
   ABOUT
══════════════════════════════ */
function About() {
  const [leftRef, leftVis] = useReveal(0.1)
  const [rightRef, rightVis] = useReveal(0.1)
  const pillars = [
    'Locally owned & operated', 'On-time, every time',
    'Careful goods handling', '24/7 availability',
    'Competitive fair pricing', 'Experienced operators',
  ]
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          <div ref={leftRef} className={`reveal-left${leftVis ? ' visible' : ''}`}>
            <div className="about-visual">
              <img
                src={IMG_FLEET}
                onError={e => { e.target.src='https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80' }}
                alt="BBR Transportation fleet — Tata Ace and Bolero Pickup"
                className="about-img-main"
                loading="lazy"
              />
              <img
                src={IMG_ACE}
                onError={e => { e.target.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' }}
                alt="BBR Transportation Tata Ace"
                className="about-img-accent"
                loading="lazy"
              />
              <div className="about-badge-float">
                <span className="num"><AnimCounter target={500} suffix="+" /></span>
                <span className="lbl">Customers<br />Served</span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className={`reveal-right${rightVis ? ' visible' : ''}`}>
            <p className="section-eyebrow">Who We Are</p>
            <h2 className="section-title" id="about-title">
              Moodubidire's<br /><em>Transport Heritage</em>
            </h2>

            <div className="about-since">
              <div className="about-since-num">2010</div>
              <div className="about-since-text">Year Founded<br />15+ Years of Service</div>
            </div>

            <div className="about-body">
              <p>
                BBR Transportation which is also called as Badigege Bedra Rider was established in 2010 and has proudly served the residents, businesses and commercial customers of Moodubidire and Dakshina Kannada for over 15 years. We built this business on a foundation of punctuality, care, and genuine service.
              </p>
              <p>
                Whether you're a homeowner moving across town, a shop owner needing stock replenishment, or a construction firm requiring daily material runs — our Tata Ace and Mahindra Bolero Pickup fleet is always ready.
              </p>
            </div>

            <div className="about-pillars">
              {pillars.map(p => (
                <div key={p} className="about-pillar">
                  <div className="about-pillar-dot"><CheckIcon /></div>
                  <span>{p}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <a href={PHONE1} className="btn btn-primary"><PhoneIcon size={14} /> Call to Book</a>
              <a href={WHATSAPP} className="btn btn-outline-dark" target="_blank" rel="noreferrer"><WAIcon size={14} /> WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════
   COVERAGE MARQUEE
══════════════════════════════ */
function CoverageStrip() {
  const places = ['Moodubidire','Mangalore','Karkala','Bantwal','Belthangady','Puttur','Sullia','Uppinangady','Vitla','Dharmasthala','Udupi','Dakshina Kannada']
  return (
    <div className="coverage-strip" aria-label="Service coverage areas">
      <div className="coverage-track">
        {[...places,...places].map((p, i) => (
          <div key={i} className="coverage-item">
            <span>{p}</span>
            <div className="coverage-dot" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════
   BLOG
══════════════════════════════ */
const blogPosts = [
  {
    slug: '/blog/trusted-transport-service-moodubidire',
    cat: 'Business',
    title: 'Why BBR Transportation is the Most Trusted Transport Service in Moodubidire',
    excerpt: 'Discover why 500+ customers trust BBR Transportation for all their logistics needs across Dakshina Kannada since 2010.',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: '/blog/history-of-moodubidire',
    cat: 'Heritage',
    title: 'History and Heritage of Moodubidire — The Jain Cultural Capital',
    excerpt: 'Explore the rich cultural and historical significance of Moodubidire — home to the iconic Thousand Pillar Temple.',
    img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
    readTime: '10 min read',
  },
  {
    slug: '/blog/house-shifting-guide-moodubidire',
    cat: 'Guide',
    title: 'Complete House Shifting Guide for Moodubidire Residents',
    excerpt: 'A comprehensive checklist and guide for anyone planning a household shift in Moodubidire or Dakshina Kannada.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    readTime: '12 min read',
  },
  {
    slug: '/blog/tata-ace-vs-bolero-pickup',
    cat: 'Comparison',
    title: 'Tata Ace vs Bolero Pickup — Which Vehicle Do You Need?',
    excerpt: 'A detailed comparison to help you choose the right vehicle for your transport requirement in Dakshina Kannada.',
    img: IMG_FLEET,
    readTime: '6 min read',
  },
  {
    slug: '/blog/transport-services-dakshina-kannada',
    cat: 'Local SEO',
    title: 'Best Transport Services in Dakshina Kannada — Complete Guide 2025',
    excerpt: 'Everything you need to know about finding reliable transport services across all of Dakshina Kannada.',
    img: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=600&q=80',
    readTime: '7 min read',
  },
  {
    slug: '/blog/business-delivery-solutions-moodubidire',
    cat: 'Business',
    title: 'How Small Businesses in Moodubidire Can Improve Deliveries',
    excerpt: 'Practical strategies for local businesses to optimize last-mile delivery and reduce logistics costs.',
    img: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&q=80',
    readTime: '5 min read',
  },
]

function Blog() {
  const [headerRef, headerVis] = useReveal(0.1)
  const featured = blogPosts.find(p => p.featured)
  const rest = blogPosts.filter(p => !p.featured)

  return (
    <section className="section blog-section" id="blog" aria-labelledby="blog-title">
      <div className="container">
        <div ref={headerRef} className={`reveal${headerVis ? ' visible' : ''}`} style={{ marginBottom: '3.5rem' }}>
          <p className="section-eyebrow">Resources & Insights</p>
          <h2 className="section-title" id="blog-title">
            Transport <em>Knowledge</em><br />Hub
          </h2>
          <p className="section-sub">
            Local insights, transport guides, and heritage stories from Moodubidire and Dakshina Kannada.
          </p>
        </div>

        <div className="blog-grid">
          {/* Featured Article */}
          {featured && (() => {
            const [ref, vis] = useReveal(0.08)
            return (
              <div ref={ref} className={`blog-featured reveal${vis ? ' visible' : ''}`} key={featured.slug}>
                <div className="blog-featured-img">
                  <div className="blog-featured-img-inner" style={{ backgroundImage: `url(${featured.img})` }} />
                </div>
                <div className="blog-featured-body">
                  <span className="blog-featured-tag">Featured Article</span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    {featured.cat} · {featured.readTime}
                  </div>
                  <h3>{featured.title}</h3>
                  <p>{featured.excerpt}</p>
                  <a href={featured.slug} className="btn btn-primary">
                    Read Article <ArrowRight />
                  </a>
                </div>
              </div>
            )
          })()}

          {/* Other Articles */}
          {rest.map((post, i) => {
            const [ref, vis] = useReveal(0.08)
            return (
              <div key={post.slug} ref={ref} className={`blog-card reveal${vis ? ' visible' : ''}`}
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                onClick={() => window.location.href = post.slug}
                role="article">
                <div className="blog-card-img">
                  <div className="blog-card-img-inner" style={{ backgroundImage: `url(${post.img})` }} />
                  <div className="blog-card-cat">{post.cat}</div>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">{post.readTime}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-card-link">Read More <ArrowRight /></span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════
   MAP
══════════════════════════════ */
function MapSection() {
  const mapEl = useRef(null)
  const instance = useRef(null)
  const [ref, visible] = useReveal(0.05)

  useEffect(() => {
    if (instance.current || !mapEl.current) return
    const init = () => {
      const L = window.L; if (!L) return
      const map = L.map(mapEl.current, { zoomControl: true, scrollWheelZoom: false }).setView([13.0683, 74.9915], 10)
      instance.current = map
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB', subdomains: 'abcd', maxZoom: 20,
      }).addTo(map)
      L.circle([13.0683, 74.9915], {
        radius: 12000, fillColor: '#FD5E02', fillOpacity: 0.08,
        color: '#FD5E02', weight: 2, dashArray: '6 4',
      }).addTo(map).bindTooltip('BBR Transportation Service Zone', { permanent: false, direction: 'top' })
      const icon = L.divIcon({
        html: `<div style="width:44px;height:44px;background:#013440;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(1,52,64,0.4);border:3px solid #FD5E02;">
                 <div style="transform:rotate(45deg);font-size:18px;">🚛</div>
               </div>`,
        className: '', iconSize: [44,44], iconAnchor: [22,44], popupAnchor: [0,-48],
      })
      L.marker([13.0683, 74.9915], { icon }).addTo(map).bindPopup(`
        <div style="font-family:'DM Sans',sans-serif;padding:4px 0;min-width:230px">
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
      const s = document.createElement('script'); s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.onload = init; document.head.appendChild(s)
    }
  }, [])

  return (
    <section className="section map-section" id="area" aria-labelledby="map-title">
      <div className="container">
        <div ref={ref} className={`reveal${visible ? ' visible' : ''}`}>
          <p className="section-eyebrow">Service Area</p>
          <h2 className="section-title" id="map-title">We Cover All of<br /><em>Dakshina Kannada</em></h2>
          <p className="section-sub">Based in Moodubidire, we serve every corner of Dakshina Kannada — from Mangalore to Belthangady.</p>
        </div>
        <div className="map-wrapper">
          <div id="bbr-map" ref={mapEl} aria-label="BBR Transportation service area map" />
        </div>
        <div className="map-chips">
          {['Based in Moodubidire','Serves Dakshina Kannada','Mangalore · Karkala · Bantwal · Belthangady','Available 24/7'].map(c => (
            <span key={c} className="map-chip">{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════
   CONTACT
══════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [ref, visible] = useReveal(0.05)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault()
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage:\n${form.message}`)
    window.location.href = `mailto:${EMAIL_DISP}?subject=BBR%20Transport%20Booking&body=${body}`
    setSubmitted(true)
  }

  const details = [
    { icon: <PhoneIcon />, label: 'Primary Line', val: PHONE1_DISP, href: PHONE1 },
    { icon: <PhoneIcon />, label: 'Secondary Line', val: PHONE2_DISP, href: PHONE2 },
    { icon: <MailIcon />, label: 'Email', val: EMAIL_DISP, href: EMAIL },
    { icon: <PinIcon />, label: 'Location', val: ADDRESS, href: null },
  ]

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <div ref={ref} className={`contact-info reveal-left${visible ? ' visible' : ''}`}>
            <p className="section-eyebrow section-eyebrow--light">Get In Touch</p>
            <h2 className="contact-info-title" id="contact-title">
              Book a<br /><em>Vehicle</em>
            </h2>
            <p className="contact-info-sub">
              Call or WhatsApp us directly for the fastest response. We're available 24/7 for transport bookings across Moodubidire and Dakshina Kannada.
            </p>
            <div className="contact-details">
              {details.map(d => (
                <div key={d.label} className="contact-detail">
                  <div className="contact-detail-icon" aria-hidden="true">{d.icon}</div>
                  <div>
                    <div className="contact-detail-label">{d.label}</div>
                    <div className="contact-detail-val">
                      {d.href ? <a href={d.href}>{d.val}</a> : d.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-cta-row">
              <a href={PHONE1} className="btn btn-primary btn-lg"><PhoneIcon size={16}/> Call Now</a>
              <a href={WHATSAPP} className="btn btn-wa btn-lg" target="_blank" rel="noreferrer"><WAIcon size={16}/> WhatsApp</a>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="contact-form-wrap">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ width: 56, height: 56, background: 'rgba(253,94,2,0.12)', border: '1px solid rgba(253,94,2,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--amber)' }}>
                    <CheckIcon />
                  </div>
                  <h3 className="form-title">Enquiry Sent!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>We'll reach out shortly to confirm your booking.</p>
                  <button className="btn btn-primary btn-sm" onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="form-title">Booking Enquiry</h3>
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
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════
   FOOTER
══════════════════════════════ */
function Footer() {
  const goto = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const year = new Date().getFullYear()
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
              <div style={{ width: 36, height: 36, background: 'var(--amber)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TruckIcon />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                BBR Transportation
              </span>
            </div>
            <p>Moodubidire's trusted local transport partner — reliable, on-time, and customer-first since 2010.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
              Moodubidire, Dakshina Kannada,<br />Karnataka – 574227
            </p>
          </div>

          <div className="footer-col">
            <h5>Navigate</h5>
            <ul>
              {[['Home','hero'],['Services','services'],['Fleet','fleet'],['About','about'],['Blog','blog'],['Coverage','area'],['Contact','contact']].map(([l,id]) => (
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
              <li>Moodubidire, Karnataka</li>
            </ul>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href={PHONE1} className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>
                <PhoneIcon size={13} /> Call to Book
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-wa" style={{ justifyContent: 'center' }}>
                <WAIcon size={13} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {year} BBR Transportation. All rights reserved. | bbrtransport.in | Moodubidire, Karnataka, India</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-wa">
              <WAIcon size={13} /> Quick WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════
   WHATSAPP FLOAT
══════════════════════════════ */
function WAFloat() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noreferrer" className="wa-float" aria-label="Chat on WhatsApp">
      <div className="wa-pulse" aria-hidden="true" />
      <WAIcon size={26} />
    </a>
  )
}

/* ══════════════════════════════
   APP
══════════════════════════════ */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Fleet />
        <About />
        <CoverageStrip />
        <Blog />
        <MapSection />
        <Contact />
      </main>
      <Footer />
      <WAFloat />
    </>
  )
}
