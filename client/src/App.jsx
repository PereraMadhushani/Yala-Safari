import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', message: '' })

  const whatsappNumber = '+94771234567'
  const callNumber = '+94771234567'

  const whatsappLink = useMemo(() => {
    const message = encodeURIComponent(
      'Hello Yala Safari Team, I would like to book a safari in Yala National Park. Please share available options.',
    )

    return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`
  }, [whatsappNumber])

  const packages = [
    {
      title: 'Half Day Safari',
      price: 'From LKR 18,000',
      duration: '4 to 5 hours',
      includes: 'Private jeep, experienced tracker guide, bottled water',
    },
    {
      title: 'Full Day Safari',
      price: 'From LKR 32,000',
      duration: '10 to 12 hours',
      includes: 'Private jeep, picnic breakfast, lunch stop, guide, water',
    },
    {
      title: 'Morning Safari',
      price: 'From LKR 20,000',
      duration: 'Sunrise to late morning',
      includes: 'Jeep, naturalist guide, park entry assistance, refreshments',
    },
    {
      title: 'Evening Safari',
      price: 'From LKR 19,500',
      duration: 'Afternoon to sunset',
      includes: 'Jeep, local guide, bottled water, wildlife spotting support',
    },
  ]

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=900&q=80',
      alt: 'Leopard resting on tree branch in Yala National Park',
    },
    {
      src: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&w=900&q=80',
      alt: 'Wild elephant walking through grassy landscape',
    },
    {
      src: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?auto=format&fit=crop&w=900&q=80',
      alt: 'Open safari jeep during wildlife tour',
    },
    {
      src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80',
      alt: 'Birds near a lake at sunset in Sri Lanka',
    },
    {
      src: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=900&q=80',
      alt: 'Tourists enjoying a safari with camera equipment',
    },
    {
      src: 'https://images.unsplash.com/photo-1581852017103-68f16ff6f780?auto=format&fit=crop&w=900&q=80',
      alt: 'Dry zone landscape and trail in Yala National Park',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    const revealElements = document.querySelectorAll('[data-reveal]')
    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const handleContactSubmit = (event) => {
    event.preventDefault()

    const userMessage = encodeURIComponent(
      `Hello, my name is ${contactForm.name}. ${contactForm.message}`,
    )

    window.open(
      `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${userMessage}`,
      '_blank',
      'noopener,noreferrer',
    )

    setContactForm({ name: '', message: '' })
  }

  return (
    <div className="site-shell">
      <a
        className="floating-whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book safari via WhatsApp"
      >
        WhatsApp
      </a>

      <header className="topbar">
        <div className="brand">Yala Safari Sri Lanka</div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          Menu
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#packages" onClick={() => setMenuOpen(false)}>
            Packages
          </a>
          <a href="#yala-info" onClick={() => setMenuOpen(false)}>
            Yala Info
          </a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>
            Gallery
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-overlay" />
          <div className="hero-content" data-reveal>
            <p className="eyebrow">Authentic Yala Safari Experiences</p>
            <h1>Explore Yala National Park with Experts</h1>
            <p>
              Join our trusted local team for unforgettable leopard sightings,
              elephant encounters, and breathtaking landscapes in Sri Lanka.
            </p>
            <div className="hero-cta-group">
              <a
                className="btn btn-primary"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us on WhatsApp
              </a>
              <a className="btn btn-secondary" href={`tel:${callNumber}`}>
                Call Now
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="content-section" data-reveal>
          <h2>About Us</h2>
          <p>
            We are a locally owned Yala Safari service built by wildlife lovers
            from the southern coast of Sri Lanka. With years of field
            experience, our guides know Yala blocks, animal movement patterns,
            and safe routes to help you enjoy a smooth and responsible safari.
          </p>
          <p>
            Your comfort and safety come first, and every tour is designed to be
            friendly, informative, and full of nature moments you will remember.
          </p>
        </section>

        <section id="packages" className="content-section package-section">
          <div data-reveal>
            <h2>Safari Packages</h2>
            <p>
              Choose the safari plan that matches your travel style. Pricing is
              approximate and may vary by season and park entrance rates.
            </p>
          </div>
          <div className="package-grid">
            {packages.map((tourPackage) => (
              <article className="package-card" data-reveal key={tourPackage.title}>
                <h3>{tourPackage.title}</h3>
                <p className="package-price">{tourPackage.price}</p>
                <p>
                  <strong>Duration:</strong> {tourPackage.duration}
                </p>
                <p>
                  <strong>Included:</strong> {tourPackage.includes}
                </p>
                <a
                  className="btn btn-outline"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book via WhatsApp
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="yala-info" className="content-section yala-info">
          <div data-reveal>
            <h2>Yala National Park Information</h2>
            <p>
              Yala National Park is Sri Lanka&apos;s most famous wildlife reserve,
              known for one of the world&apos;s highest leopard densities. Visitors
              can also spot elephants, sloth bears, crocodiles, peacocks, and
              hundreds of bird species.
            </p>
            <p>
              Best time to visit Yala is generally from February to July for dry
              weather and easier wildlife sightings, though safari trips run in
              multiple seasons.
            </p>
          </div>
          <a
            className="btn btn-primary"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
          >
            Book via WhatsApp
          </a>
        </section>

        <section id="gallery" className="content-section gallery-section">
          <div data-reveal>
            <h2>Gallery</h2>
            <p>
              Moments from our Yala Safari tours in Sri Lanka: wildlife,
              open-jeep adventures, and stunning park landscapes.
            </p>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <figure className="gallery-card" data-reveal key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="contact-info" data-reveal>
            <h2>Contact Us</h2>
            <p>
              Ready for your Leopard Safari in Yala? Reach us directly and we
              will help plan your ideal trip.
            </p>
            <a
              className="btn btn-primary"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact on WhatsApp
            </a>
            <a className="contact-line" href={`tel:${callNumber}`}>
              Phone: +94 77 123 4567
            </a>
            <a className="contact-line" href="mailto:hello@yalasafari.lk">
              Email: hello@yalasafari.lk
            </a>
            <a
              className="contact-line"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook: facebook.com/yalasafari
            </a>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit} data-reveal>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={contactForm.name}
              onChange={(event) =>
                setContactForm((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              required
              placeholder="Your name"
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={(event) =>
                setContactForm((previous) => ({
                  ...previous,
                  message: event.target.value,
                }))
              }
              required
              placeholder="Tell us your preferred date, group size, and safari type"
            />

            <button className="btn btn-primary" type="submit">
              Send via WhatsApp
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <h3>Quick Links</h3>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#packages">Packages</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div>
          <h3>Contact Details</h3>
          <p>Phone: +94 77 123 4567</p>
          <p>Email: hello@yalasafari.lk</p>
          <p>Tissamaharama, Sri Lanka</p>
        </div>

        <div>
          <h3>Follow Us</h3>
          <div className="social-row">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
