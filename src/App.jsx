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

/* ── Carousel images ── */
const IMG_FLEET  = '/fleet.jpg'
const IMG_ACE    = '/ace.jpg'
const IMG_BOLERO = '/bolero.jpg'

/* ══════════════════════════════
   HASH ROUTER
══════════════════════════════ */
function parseHash() {
  const h = window.location.hash.slice(1) || '/'
  if (h === '/' || h === '') return { view: 'home', slug: null }
  if (h === '/blog') return { view: 'blog', slug: null }
  if (h.startsWith('/blog/')) return { view: 'post', slug: h.slice(6) }
  // section anchors: #/services, #/fleet, #/about, #/coverage, #/contact
  const section = h.slice(1)
  const sections = ['services','fleet','about','blog','area','contact','hero']
  if (sections.includes(section)) return { view: 'home', slug: null, scroll: section }
  return { view: 'home', slug: null }
}

function go(path) {
  window.location.hash = path
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goSection(sectionId) {
  // Update hash AND scroll smoothly
  window.location.hash = '/' + sectionId
  setTimeout(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }, 50)
}

/* ── Reveal Hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
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
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

/* ══════════════════════════════
   NAV — with real hash URLs
══════════════════════════════ */
function Nav({ view }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // nav links: label, hash path, section id (null = full page)
  const links = [
    { label: 'Services',  href: '#/services',  section: 'services'  },
    { label: 'Fleet',     href: '#/fleet',      section: 'fleet'     },
    { label: 'About',     href: '#/about',      section: 'about'     },
    { label: 'Blog',      href: '#/blog',       section: null        },
    { label: 'Coverage',  href: '#/area',       section: 'area'      },
    { label: 'Contact',   href: '#/contact',    section: 'contact'   },
  ]

  const handleLink = (e, link) => {
    e.preventDefault()
    setOpen(false)
    if (link.section === null) {
      // Full page — Blog list
      go('/blog')
    } else {
      if (view !== 'home') {
        // Navigate home first, then scroll
        window.location.hash = '/' + link.section
        window.scrollTo({ top: 0, behavior: 'instant' })
        setTimeout(() => document.getElementById(link.section)?.scrollIntoView({ behavior: 'smooth' }), 120)
      } else {
        goSection(link.section)
      }
    }
  }

  const isActive = (link) => {
    if (link.section === null) return view === 'blog' || view === 'post'
    return false
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation" style={{ backgroundColor: '#033b43' }}>
        <div className="nav-inner">
          {/* Logo → always goes home */}
          <a
            className="nav-logo"
            href="#/"
            aria-label="BBR Transportation home"
            onClick={e => { e.preventDefault(); go('/') }}
          >
            <img
              src="/bbr-logo.png"
              alt="BBR Transportation"
              style={{ height: '52px', display: 'block', width: 'auto' }}
            />
          </a>

          <ul className="nav-links" role="list">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={isActive(link) ? 'active' : ''}
                  onClick={e => handleLink(e, link)}
                  aria-current={isActive(link) ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a className="nav-cta" href={PHONE1} aria-label="Call BBR Transportation">
            <PhoneIcon size={14} /> {PHONE1_DISP}
          </a>

          <button
            className="hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open} style={{ backgroundColor: '#033b43' }}>
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => handleLink(e, link)}
            className={isActive(link) ? 'active' : ''}
          >
            {link.label}
          </a>
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
  const dragStartX = useRef(0)
  const dragging = useRef(false)
  const autoRef = useRef(null)
  const total = heroSlides.length

  const go = useCallback(idx => setCurrent(((idx % total) + total) % total), [total])
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 5000)
  }, [total])
  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current) }, [startAuto])
  const prev = () => { go(current - 1); startAuto() }
  const next = () => { go(current + 1); startAuto() }

  const onTouchStart = e => { dragStartX.current = e.touches[0].clientX; dragging.current = false }
  const onTouchMove  = e => { if (Math.abs(e.touches[0].clientX - dragStartX.current) > 10) dragging.current = true }
  const onTouchEnd   = e => {
    const dx = e.changedTouches[0].clientX - dragStartX.current
    if (dragging.current) { if (dx > 50) prev(); else if (dx < -50) next() }
  }

  const slide = heroSlides[current]

  return (
    <section id="hero" className="hero" aria-label="BBR Transportation Hero"
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="hero-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {heroSlides.map((s, i) => (
          <div key={i} className={`hero-slide${i === current ? ' active' : ''}`}>
            <div className="hero-slide-bg" style={{ backgroundImage: `url(${s.localImg}), url(${s.bg})` }} role="img" aria-label={s.eyebrow} />
            <div className={`hero-slide-overlay${s.type === 'vehicle' ? ' hero-slide-overlay--vehicle' : ''}`} />
            <div className="hero-content">
              <div className="hero-inner">
                <div className="hero-eyebrow">{s.eyebrow}</div>
                {s.type === 'hero' ? (
                  <>
                    <h1 className="hero-title">{s.titleLine1}<br />{s.titleLine2} <em>{s.titleAccent}</em></h1>
                    <p className="hero-sub">{s.sub}</p>
                    <div className="hero-badges">
                      {s.badges.map(b => (
                        <span key={b} className="hero-badge"><CheckIcon /> {b}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="hero-title">{s.titleLine1}<br /><em>{s.titleAccent}</em></h2>
                    <p className="hero-sub">{s.sub}</p>
                    <div className="hero-features">
                      {s.features.map(f => (
                        <div key={f} className="hero-feature">
                          <div className="hero-feature-check"><CheckIcon /></div>{f}
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
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, title: 'Household Shifting', desc: 'Safe and careful household relocation services across Moodubidire and nearby areas. We handle your belongings with care.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>, title: 'Goods Transportation', desc: 'Reliable goods transport for businesses across Dakshina Kannada. On-time delivery every time, with both vehicles.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>, title: 'Shop Deliveries', desc: 'Regular shop stock and grocery delivery runs across Moodubidire. Our Tata Ace navigates narrow lanes effortlessly.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6V18M2 12h20"/></svg>, title: 'Construction Material', desc: 'Heavy material transport including sand, bricks, and construction supplies. Bolero Pickup handles up to 1.5 tons.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>, title: 'Loading & Unloading', desc: 'Professional loading and unloading assistance for heavy goods, furniture, and commercial consignments.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: 'Local Transportation', desc: 'On-demand local transport for any requirement within Moodubidire and surrounding Dakshina Kannada areas.' },
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
          <p className="section-sub">From household shifting to commercial deliveries — we cover every transport need across Moodubidire and Dakshina Kannada.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => {
            const [ref, vis] = useReveal(0.08)
            return (
              <div key={s.title} ref={ref} className={`service-card reveal${vis ? ' visible' : ''}`} style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
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
          <h2 className="section-title section-title--light" id="fleet-title">Two Vehicles.<br /><em>Every Need Covered.</em></h2>
          <p className="section-sub section-sub--light" style={{ marginTop: '0.5rem' }}>Whether your load is 50 kg or 1.5 tons — our Tata Ace and Bolero Pickup are ready to serve.</p>
        </div>
        <div className="fleet-grid">
          {vehicles.map((v, i) => {
            const [ref, vis] = useReveal(0.08)
            return (
              <div key={v.name} ref={ref} className={`fleet-card reveal${vis ? ' visible' : ''}`} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="fleet-card-img">
                  <div className="fleet-card-img-inner" style={{ backgroundImage: `url(${v.img}), url(${v.fallback})` }} role="img" aria-label={v.name} />
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a href={PHONE1} className="btn btn-primary"><PhoneIcon size={14} /> Book Now</a>
                    <a href={WHATSAPP} className="btn btn-outline" target="_blank" rel="noreferrer"><WAIcon size={14} /> WhatsApp</a>
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
  const pillars = ['Locally owned & operated', 'On-time, every time', 'Careful goods handling', '24/7 availability', 'Competitive fair pricing', 'Experienced operators']
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          <div ref={leftRef} className={`reveal-left${leftVis ? ' visible' : ''}`}>
            <div className="about-visual">
              <img src={IMG_FLEET} onError={e => { e.target.src='https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80' }} alt="BBR Transportation fleet" className="about-img-main" loading="lazy" />
              <img src={IMG_ACE} onError={e => { e.target.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' }} alt="BBR Transportation Tata Ace" className="about-img-accent" loading="lazy" />
              <div className="about-badge-float">
                <span className="num"><AnimCounter target={500} suffix="+" /></span>
                <span className="lbl">Customers<br />Served</span>
              </div>
            </div>
          </div>
          <div ref={rightRef} className={`reveal-right${rightVis ? ' visible' : ''}`}>
            <p className="section-eyebrow">Who We Are</p>
            <h2 className="section-title" id="about-title">Moodubidire's<br /><em>Transport Heritage</em></h2>
            <div className="about-since">
              <div className="about-since-num">2010</div>
              <div className="about-since-text">Year Founded<br />15+ Years of Service</div>
            </div>
            <div className="about-body">
              <p>BBR Transportation was established in 2010 and has proudly served the residents, businesses and commercial customers of Moodubidire and Dakshina Kannada for over 15 years.</p>
              <p>Whether you're a homeowner moving across town, a shop owner needing stock replenishment, or a construction firm requiring daily material runs — our Tata Ace and Mahindra Bolero Pickup fleet is always ready.</p>
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
   BLOG DATA
══════════════════════════════ */
const blogPosts = [
  {
    slug: 'trusted-transport-service-moodubidire',
    cat: 'Business',
    title: 'Why BBR Transportation is the Most Trusted Transport Service in Moodubidire',
    excerpt: 'Discover why 500+ customers trust BBR Transportation for all their logistics needs across Dakshina Kannada since 2010.',
    img: IMG_FLEET,
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'history-of-moodubidire',
    cat: 'Heritage',
    title: 'History and Heritage of Moodubidire — The Jain Cultural Capital',
    excerpt: 'Explore the rich cultural and historical significance of Moodubidire — home to the iconic Thousand Pillar Temple.',
    img: '/IMG_MDB.png',
    readTime: '10 min read',
  },
  {
    slug: 'house-shifting-guide-moodubidire',
    cat: 'Guide',
    title: 'Complete House Shifting Guide for Moodubidire Residents',
    excerpt: 'A comprehensive checklist and guide for anyone planning a household shift in Moodubidire or Dakshina Kannada.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    readTime: '12 min read',
  },
  {
    slug: 'tata-ace-vs-bolero-pickup',
    cat: 'Comparison',
    title: 'Tata Ace vs Bolero Pickup — Which Vehicle Do You Need?',
    excerpt: 'A detailed comparison to help you choose the right vehicle for your transport requirement in Dakshina Kannada.',
    img: IMG_FLEET,
    readTime: '6 min read',
  },
  {
    slug: 'transport-services-dakshina-kannada',
    cat: 'Local Guide',
    title: 'Best Transport Services in Dakshina Kannada — Complete Guide 2025',
    excerpt: 'Everything you need to know about finding reliable transport services across all of Dakshina Kannada.',
    img: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=600&q=80',
    readTime: '7 min read',
  },
  {
    slug: 'business-delivery-solutions-moodubidire',
    cat: 'Business Tips',
    title: 'How Small Businesses in Moodubidire Can Improve Deliveries',
    excerpt: 'Practical strategies for local businesses to optimize last-mile delivery and reduce logistics costs.',
    img: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&q=80',
    readTime: '5 min read',
  },
]

/* ══════════════════════════════
   BLOG SECTION (homepage)
══════════════════════════════ */
function Blog() {
  const [headerRef, headerVis] = useReveal(0.1)
  const featured = blogPosts.find(p => p.featured)
  const rest = blogPosts.filter(p => !p.featured)

  const openPost = (slug) => go('/blog/' + slug)

  return (
    <section className="section blog-section" id="blog" aria-labelledby="blog-title">
      <div className="container">
        <div ref={headerRef} className={`reveal${headerVis ? ' visible' : ''}`} style={{ marginBottom: '3.5rem' }}>
          <p className="section-eyebrow">Resources & Insights</p>
          <h2 className="section-title" id="blog-title">Transport <em>Knowledge</em><br />Hub</h2>
          <p className="section-sub">Local insights, transport guides, and heritage stories from Moodubidire and Dakshina Kannada.</p>
        </div>
        <div className="blog-grid">
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
                  <a
                    href={`#/blog/${featured.slug}`}
                    className="btn btn-primary"
                    onClick={e => { e.preventDefault(); openPost(featured.slug) }}
                  >
                    Read Article <ArrowRight />
                  </a>
                </div>
              </div>
            )
          })()}
          {rest.map((post, i) => {
            const [ref, vis] = useReveal(0.08)
            return (
              <div key={post.slug} ref={ref} className={`blog-card reveal${vis ? ' visible' : ''}`}
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }} role="article">
                <a
                  href={`#/blog/${post.slug}`}
                  onClick={e => { e.preventDefault(); openPost(post.slug) }}
                  style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}
                  aria-label={`Read: ${post.title}`}
                >
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
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════
   MAP SECTION
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
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap © CartoDB', subdomains: 'abcd', maxZoom: 20 }).addTo(map)
      L.circle([13.0683, 74.9915], { radius: 12000, fillColor: '#FD5E02', fillOpacity: 0.08, color: '#FD5E02', weight: 2, dashArray: '6 4' }).addTo(map).bindTooltip('BBR Transportation Service Zone', { permanent: false, direction: 'top' })
      const icon = L.divIcon({
        html: `<div style="width:44px;height:44px;background:#013440;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(1,52,64,0.4);border:3px solid #FD5E02;"><div style="transform:rotate(45deg);font-size:18px;">🚛</div></div>`,
        className: '', iconSize: [44,44], iconAnchor: [22,44], popupAnchor: [0,-48],
      })
      L.marker([13.0683, 74.9915], { icon }).addTo(map).bindPopup(`
        <div style="font-family:sans-serif;padding:4px 0;min-width:230px">
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
          <div ref={ref} className={`contact-info reveal-left${visible ? ' visible' : ''}`}>
            <p className="section-eyebrow section-eyebrow--light">Get In Touch</p>
            <h2 className="contact-info-title" id="contact-title">Book a<br /><em>Vehicle</em></h2>
            <p className="contact-info-sub">Call or WhatsApp us directly for the fastest response. Available 24/7 across Moodubidire and Dakshina Kannada.</p>
            <div className="contact-details">
              {details.map(d => (
                <div key={d.label} className="contact-detail">
                  <div className="contact-detail-icon" aria-hidden="true">{d.icon}</div>
                  <div>
                    <div className="contact-detail-label">{d.label}</div>
                    <div className="contact-detail-val">{d.href ? <a href={d.href}>{d.val}</a> : d.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-cta-row">
              <a href={PHONE1} className="btn btn-primary btn-lg"><PhoneIcon size={16}/> Call Now</a>
              <a href={WHATSAPP} className="btn btn-wa btn-lg" target="_blank" rel="noreferrer"><WAIcon size={16}/> WhatsApp</a>
            </div>
          </div>
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
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Enquiry</button>
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
  const year = new Date().getFullYear()

  const navLinks = [
    { label: 'Home',      href: '#/',          section: 'hero'     },
    { label: 'Services',  href: '#/services',  section: 'services' },
    { label: 'Fleet',     href: '#/fleet',     section: 'fleet'    },
    { label: 'About',     href: '#/about',     section: 'about'    },
    { label: 'Blog',      href: '#/blog',      section: null       },
    { label: 'Coverage',  href: '#/area',      section: 'area'     },
    { label: 'Contact',   href: '#/contact',   section: 'contact'  },
  ]

  const handleFooterLink = (e, link) => {
    e.preventDefault()
    if (link.section === null) {
      go('/blog')
    } else {
      goSection(link.section)
    }
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
              <img
                src="/bbr2-logo.png"
                alt="BBR Transportation"
                style={{ height: '50px', width: 'auto', display: 'block', marginBottom: '0.5rem' }}
              />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                BBR Transportation
              </span>
            </div>
            <p>Moodubidire's trusted local transport partner — reliable, on-time, and customer-first since 2010.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>Moodubidire, Dakshina Kannada,<br />Karnataka – 574227</p>
          </div>

          <div className="footer-col">
            <h5>Navigate</h5>
            <ul>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={e => handleFooterLink(e, link)}>{link.label}</a>
                </li>
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
              <a href={PHONE1} className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}><PhoneIcon size={13} /> Call to Book</a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-wa" style={{ justifyContent: 'center' }}><WAIcon size={13} /> WhatsApp Us</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {year} BBR Transportation. All rights reserved. | bbrtransport.in | Moodubidire, Karnataka</p>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-wa"><WAIcon size={13} /> Quick WhatsApp</a>
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
   BLOG LIST PAGE
══════════════════════════════ */
function BlogListPage() {
  return (
    <main style={{ paddingTop: 'var(--nav-h, 72px)' }}>
      <div style={{ background: 'var(--teal)', padding: '4rem 0 3rem' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
            <ol style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', listStyle: 'none', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
              <li><a href="#/" onClick={e => { e.preventDefault(); go('/') }} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a></li>
              <li style={{ opacity: 0.4 }}>›</li>
              <li style={{ color: 'var(--amber)' }}>Blog</li>
            </ol>
          </nav>
          <p className="section-eyebrow section-eyebrow--light">Knowledge Centre</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,8vw,5rem)', color: '#fff', lineHeight: 1, textTransform: 'uppercase', marginBottom: '1rem' }}>
            Transport <span style={{ color: 'var(--amber)' }}>Guides</span><br />& Local Stories
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, lineHeight: 1.75 }}>
            Expert articles on transport services, house shifting, local history, and business logistics across Dakshina Kannada.
          </p>
        </div>
      </div>

      <section style={{ padding: '4rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {blogPosts.map(post => (
              <article key={post.slug} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff', transition: 'transform 0.25s, box-shadow 0.25s', cursor: 'pointer' }}
                onMouseOver={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.12)' }}
                onMouseOut={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
                <a
                  href={`#/blog/${post.slug}`}
                  onClick={e => { e.preventDefault(); go('/blog/' + post.slug) }}
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                  aria-label={post.title}
                >
                  <div style={{ height: 200, backgroundImage: `url(${post.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: 12, left: 12, background: 'var(--amber)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', padding: '3px 10px', borderRadius: 100, textTransform: 'uppercase' }}>
                      {post.cat}
                    </span>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <p style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, marginBottom: '0.5rem' }}>{post.readTime}</p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#0d1117', marginBottom: '0.65rem', lineHeight: 1.15, textTransform: 'uppercase' }}>{post.title}</h2>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.65, marginBottom: '1rem' }}>{post.excerpt}</p>
                    <span style={{ color: 'var(--amber)', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      Read Article <ArrowRight />
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

/* ══════════════════════════════
   BLOG POST PAGE
══════════════════════════════ */
const blogContent = {
  'trusted-transport-service-moodubidire': {
    intro: 'When residents, shop owners, and businesses in Moodubidire need reliable transportation, one name consistently comes up — BBR Transportation. Since 2010, BBR Transportation has been the go-to transport service for hundreds of satisfied customers across Moodubidire and the wider Dakshina Kannada district.',
    sections: [
      { h2: '15+ Years of Local Experience', body: 'BBR Transportation was established in 2010 with a simple mission — to provide reliable, affordable, and timely transport solutions for the people of Moodubidire. Over 15 years, the company has built an unmatched understanding of local roads, neighbourhoods, businesses, and customer needs. Our drivers know every lane, every shop, and every residential colony in and around Moodubidire.' },
      { h2: 'Two Purpose-Built Fleet Vehicles', body: 'BBR Transportation operates two well-maintained, purpose-built vehicles: the Tata Ace Gold (750 kg capacity) — ideal for grocery deliveries, shop stock transport, and small household moves — and the Mahindra Bolero Pickup (1.5 ton capacity) — perfect for household shifting, construction material transport, and bulk goods delivery.' },
      { h2: 'Full Range of Transport Services', body: 'Our services cover household shifting, goods transport, shop and grocery delivery, construction material transport, loading and unloading, and on-demand local transport across Moodubidire and Dakshina Kannada.' },
      { h2: 'Affordable Pricing, 24/7 Availability', body: 'We offer transparent, competitive pricing with no hidden charges. Half-day and full-day hire options are available. Our team is reachable round the clock — call +91 90087 02735 or WhatsApp at any time for immediate assistance.' },
    ],
    faqs: [
      { q: 'What areas does BBR Transportation serve?', a: 'BBR Transportation is based in Moodubidire and serves all of Dakshina Kannada district, including Karkala, Bantwal, Belthangady, and Mangalore.' },
      { q: 'Are you available on weekends and holidays?', a: 'Yes, we are available 24/7 including weekends, public holidays, and festival days.' },
      { q: 'How do I book a transport service?', a: 'Call +91 90087 02735 or send a WhatsApp message to the same number. We respond quickly and confirm bookings within minutes.' },
    ],
  },
  'history-of-moodubidire': {
    intro: 'Moodubidire (also spelled Moodbidri) is a historically significant town in Dakshina Kannada district, Karnataka, known as the "Jain Kashi of South India." With over 18 Jain temples and the magnificent Thousand Pillar Temple, it is a centre of Jain heritage, scholarship, and culture.',
    sections: [
      { h2: 'The Thousand Pillar Temple', body: 'The Chandranatha Swami Basadi — popularly called the Thousand Pillar Temple — is a 15th-century Jain temple featuring 1,000 uniquely carved pillars. No two pillars are identical, making it one of the finest examples of Jain temple architecture in South India.' },
      { h2: 'Jain Heritage — The Jain Kashi', body: 'With over 18 Jain basadis (temples), Moodubidire is considered the holiest Jain pilgrimage destination in South India. The Jain Matha maintains a vast library of ancient manuscripts dating back centuries.' },
      { h2: 'Local Economy and Commerce', body: 'Moodubidire\'s economy is supported by gold and jewellery trade, agricultural commerce (rice, coconuts, arecanut, spices), retail services, and education. The growth of local commerce creates strong demand for transport services across the town.' },
    ],
    faqs: [
      { q: 'What is Moodubidire famous for?', a: 'Moodubidire is famous as the "Jain Kashi of South India" due to its 18 Jain temples, most notably the Thousand Pillar Temple.' },
      { q: 'Where is Moodubidire located?', a: 'Moodubidire is in Dakshina Kannada district, Karnataka, approximately 34 km northeast of Mangalore.' },
    ],
  },
  'house-shifting-guide-moodubidire': {
    intro: 'Moving house in Moodubidire? Whether relocating within the town or from a nearby area, proper planning is essential. This guide covers everything — from packing to choosing the right transport vehicle.',
    sections: [
      { h2: 'Plan Early — At Least 4 Weeks Ahead', body: 'Begin planning 4–6 weeks before your move. Take inventory of all belongings, decide what to keep or donate, arrange packing materials, and book transport in advance.' },
      { h2: 'Choose the Right Vehicle', body: 'Tata Ace (750 kg): Ideal for 1 BHK moves and locations with narrow road access. Mahindra Bolero Pickup (1.5 ton): Recommended for 2 BHK and 3 BHK homes with full furniture sets.' },
      { h2: 'Packing Tips', body: 'Use sturdy cardboard boxes, bubble wrap for fragile items, and stretch wrap for furniture. Label every box with contents and destination room. This speeds up unpacking significantly.' },
      { h2: 'Book BBR Transportation', body: 'Call +91 90087 02735 or WhatsApp us with your moving date, addresses, and volume. We provide an upfront quote with no hidden charges.' },
    ],
    faqs: [
      { q: 'How far in advance should I book?', a: 'We recommend at least 3–5 days in advance, and 7–10 days for weekends and festival seasons.' },
      { q: 'Which vehicle for a 2 BHK shift?', a: 'The Mahindra Bolero Pickup (1.5 ton) is recommended for a standard 2 BHK with full furniture.' },
    ],
  },
  'tata-ace-vs-bolero-pickup': {
    intro: 'Choosing between the Tata Ace and Mahindra Bolero Pickup for your transport need in Moodubidire? This comparison breaks down both vehicles across key parameters.',
    sections: [
      { h2: 'Tata Ace — The Compact Workhorse', body: 'Payload: 750 kg. Best for: grocery deliveries, shop stock, 1 BHK moves, narrow lanes. The Tata Ace\'s compact size makes it ideal for Moodubidire\'s older town areas with narrow approach roads.' },
      { h2: 'Mahindra Bolero Pickup — Power for Bigger Jobs', body: 'Payload: 1.5 tons. Best for: 2–3 BHK household shifts, construction materials, bulk agricultural produce, commercial goods. The spacious flatbed accommodates larger items efficiently.' },
      { h2: 'Which Should You Choose?', body: 'Choose Tata Ace if your goods weigh under 700 kg, if the destination has narrow roads, or for regular small-volume deliveries. Choose Bolero Pickup if your goods exceed 750 kg, you\'re shifting a 2+ BHK home, or you\'re transporting bulk materials.' },
    ],
    faqs: [
      { q: 'Can the Tata Ace carry a refrigerator?', a: 'Yes, standard-sized appliances fit in the Tata Ace. For a full household with multiple large appliances, the Bolero Pickup is recommended.' },
      { q: 'What if my goods are too heavy for one trip?', a: 'We advise you in advance and recommend two trips or the larger vehicle for the most efficient solution.' },
    ],
  },
  'transport-services-dakshina-kannada': {
    intro: 'Dakshina Kannada is one of Karnataka\'s most commercially active districts. From the port city of Mangalore to the cultural heartland of Moodubidire, reliable transport services are essential to the district\'s economy.',
    sections: [
      { h2: 'Transport Needs Across the District', body: 'Different areas have distinct needs: Mangalore requires heavy commercial transport; Moodubidire and temple towns need smaller vehicle services for shop deliveries and household shifting; interior areas need agricultural produce transport.' },
      { h2: 'BBR Transportation — Moodubidire\'s Choice', body: 'For transport originating in Moodubidire, BBR Transportation offers 15 years of local experience, transparent pricing, and 24/7 availability. Call +91 90087 02735 for immediate assistance.' },
      { h2: 'Choosing a Transport Provider', body: 'Key factors: local road knowledge, vehicle condition, pricing transparency, availability, and word-of-mouth reputation. BBR Transportation excels on all these fronts within Moodubidire and Dakshina Kannada.' },
    ],
    faqs: [
      { q: 'Does BBR serve areas outside Moodubidire?', a: 'Yes, we serve Karkala, Bantwal, Belthangady, and Mangalore for select services.' },
    ],
  },
  'business-delivery-solutions-moodubidire': {
    intro: 'For small business owners in Moodubidire — whether a grocery store, hardware shop, or bakery — delivery logistics represent both a significant cost and a critical competitive advantage.',
    sections: [
      { h2: 'Understand Your Delivery Patterns', body: 'Track every delivery for 1–2 weeks: destinations, timing, volume, and duration. This data reveals patterns you can optimise — batch geographically similar deliveries for maximum efficiency.' },
      { h2: 'Schedule Structured Delivery Runs', body: 'Instead of ad hoc deliveries, schedule morning runs for commercial customers and afternoon runs for residential. Hiring a Tata Ace from BBR Transportation for a morning run covers multiple Moodubidire shops efficiently.' },
      { h2: 'Partner with BBR Transportation', body: 'Establish a long-term relationship with BBR Transportation for predictable, reliable delivery capacity. We offer preferential arrangements for businesses with regular transport needs. Call +91 90087 02735.' },
    ],
    faqs: [
      { q: 'Can BBR do regular daily delivery runs?', a: 'Yes, we work with several Moodubidire businesses on regular delivery schedules. Contact us to discuss your requirements.' },
      { q: 'What is the minimum hire duration?', a: 'We offer half-day and full-day hire. For short delivery tasks, half-day hire is most economical.' },
    ],
  },
}

function BlogPostPage({ slug }) {
  const post = blogPosts.find(p => p.slug === slug)
  const content = blogContent[slug]
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [slug])

  if (!post || !content) {
    return (
      <main style={{ paddingTop: 120, textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Article not found.</p>
        <a href="#/blog" onClick={e => { e.preventDefault(); go('/blog') }} className="btn btn-primary">Back to Blog</a>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 'var(--nav-h, 72px)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0d1117 0%, var(--teal) 100%)', padding: '4rem 0 3rem' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
            <ol style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', listStyle: 'none', fontSize: '0.8rem', flexWrap: 'wrap' }}>
              <li><a href="#/" onClick={e => { e.preventDefault(); go('/') }} style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Home</a></li>
              <li style={{ color: 'rgba(255,255,255,0.25)' }}>›</li>
              <li><a href="#/blog" onClick={e => { e.preventDefault(); go('/blog') }} style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Blog</a></li>
              <li style={{ color: 'rgba(255,255,255,0.25)' }}>›</li>
              <li style={{ color: 'var(--amber)' }}>{post.cat}</li>
            </ol>
          </nav>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(253,94,2,0.15)', color: 'var(--amber)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', padding: '4px 12px', borderRadius: 100, textTransform: 'uppercase', border: '1px solid rgba(253,94,2,0.25)' }}>{post.cat}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>{post.readTime}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,5vw,3.5rem)', color: '#fff', lineHeight: 1.05, maxWidth: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>{post.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, lineHeight: 1.75, fontSize: '0.95rem' }}>{post.excerpt}</p>
        </div>
      </div>

      {/* Featured image */}
      <div style={{ height: 380, backgroundImage: `url(${post.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} role="img" aria-label={post.title} />

      {/* Content */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '3rem clamp(1rem,4vw,2rem)' }}>
        <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.85, marginBottom: '2rem', fontWeight: 500 }}>{content.intro}</p>

        {content.sections.map((s, i) => (
          <div key={i}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--teal)', margin: '2rem 0 0.75rem', textTransform: 'uppercase' }}>{s.h2}</h2>
            <p style={{ fontSize: '0.96rem', color: '#6b7280', lineHeight: 1.85, marginBottom: '1rem' }}>{s.body}</p>
          </div>
        ))}

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, var(--teal) 0%, #025e75 100%)', borderRadius: 16, padding: '2.5rem', margin: '2.5rem 0', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.8rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Need Transport in Moodubidire?</h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Call or WhatsApp BBR Transportation — available 24/7 across Dakshina Kannada.</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={PHONE1} className="btn btn-primary btn-lg"><PhoneIcon size={16}/> Call {PHONE1_DISP}</a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-wa btn-lg"><WAIcon size={16}/> WhatsApp Us</a>
          </div>
        </div>

        {/* FAQ */}
        {content.faqs && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--teal)', margin: '2rem 0 1.25rem', textTransform: 'uppercase' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {content.faqs.map((f, i) => (
                <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                  <button
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: openFaq === i ? '#fffaf8' : '#fff', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.93rem', fontWeight: 700, color: openFaq === i ? 'var(--amber)' : '#0d1117', cursor: 'pointer', textAlign: 'left' }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{f.q}</span>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--amber)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s' }}>
                      <PlusIcon />
                    </span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                    <div style={{ padding: '0.75rem 1.25rem 1.25rem', fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.75, borderTop: '1px solid #f3f4f6' }}>{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related posts */}
      <div style={{ background: '#f8f6f3', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--teal)', marginBottom: '2rem', textTransform: 'uppercase' }}>More Articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {blogPosts.filter(b => b.slug !== slug).slice(0, 3).map(p => (
              <a key={p.slug} href={`#/blog/${p.slug}`}
                onClick={e => { e.preventDefault(); go('/blog/' + p.slug) }}
                style={{ display: 'block', background: '#fff', borderRadius: 10, overflow: 'hidden', border: '1px solid #e5e7eb', textDecoration: 'none', color: 'inherit', transition: 'transform 0.25s, box-shadow 0.25s' }}
                onMouseOver={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)' }}
                onMouseOut={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
                <div style={{ height: 160, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.cat}</span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#0d1117', lineHeight: 1.15, margin: '0.4rem 0 0.65rem', textTransform: 'uppercase' }}>{p.title}</p>
                  <span style={{ color: 'var(--amber)', fontWeight: 700, fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>Read More <ArrowRight /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

/* ══════════════════════════════
   HOME PAGE
══════════════════════════════ */
function HomePage() {
  return (
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
  )
}

/* ══════════════════════════════
   APP — HASH ROUTER
══════════════════════════════ */
export default function App() {
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const onHashChange = () => {
      const newRoute = parseHash()
      setRoute(newRoute)
      // If navigating to home with a section anchor, scroll to it
      if (newRoute.view === 'home' && newRoute.scroll) {
        setTimeout(() => document.getElementById(newRoute.scroll)?.scrollIntoView({ behavior: 'smooth' }), 120)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Update document title based on route
  useEffect(() => {
    if (route.view === 'blog') {
      document.title = 'Blog — Transport Guides & Moodubidire Stories | BBR Transportation'
    } else if (route.view === 'post' && route.slug) {
      const post = blogPosts.find(p => p.slug === route.slug)
      document.title = post ? `${post.title} | BBR Transportation Moodubidire` : 'Blog | BBR Transportation'
    } else {
      document.title = 'BBR Transportation — Trusted Transport Service in Moodubidire, Dakshina Kannada | bbrtransport.in'
    }
  }, [route])

  // Inject favicon dynamically
  useEffect(() => {
    let link = document.querySelector("link[rel='icon']")
    if (!link) {
      link = document.createElement('link')
      document.head.appendChild(link)
    }
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = '/favicon.svg'
  }, [])

  return (
    <>
      <Nav view={route.view} />

      {route.view === 'home'  && <HomePage />}
      {route.view === 'blog'  && <BlogListPage />}
      {route.view === 'post'  && <BlogPostPage slug={route.slug} />}

      <Footer />
      <WAFloat />
    </>
  )
}
