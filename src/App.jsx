import { useState } from 'react';
import logo from './assets/logo.png';
import galleryHouse from './assets/gallery-house.png';
import galleryDriveway from './assets/gallery-driveway.png';
import galleryRoof from './assets/gallery-roof.png';
import galleryCommercial from './assets/gallery-commercial.png';
import contactWash from './assets/contact-wash.png';
import map from './assets/map.png';

const PHONE_DISPLAY = '352-782-8586';
const PHONE_LINK = 'tel:+13527828586';
const EMAIL = 'dswaterrestore@gmail.com';

const services = [
  ['⌂', 'House Washing'],
  ['▥', 'Commercial Building Cleaning'],
  ['╱', 'Driveways & Sidewalks'],
  ['⌁', 'Roof Cleaning'],
  ['╫', 'Fence Cleaning'],
  ['▤', 'Deck Cleaning'],
  ['◒', 'Concrete Cleaning'],
  ['◉', 'Soft Washing'],
  ['⌄', 'Gutter Brightening'],
  ['＋', 'And More!'],
];

const trustItems = [
  ['✓', 'Licensed & Insured', 'Your property is in safe hands'],
  ['◇', 'Free Estimates', 'No obligation, fast and easy quotes'],
  ['▥', 'Residential & Commercial', 'We service homes and businesses'],
  ['◎', 'Professional Equipment', 'Top-of-the-line pressure washing'],
  ['✦', 'Satisfaction Guaranteed', "We’re not happy until you are"],
];

const gallery = [
  [galleryHouse, 'House washing before and after'],
  [galleryDriveway, 'Driveway cleaning before and after'],
  [galleryRoof, 'Roof cleaning before and after'],
  [galleryCommercial, 'Commercial building cleaning before and after'],
];

function Icon({ children }) {
  return <span className="icon" aria-hidden="true">{children}</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setSubmitting(true);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Unable to submit your request.');
        form.reset();
        setStatus('Thanks! Your estimate request has been sent.');
      } else {
        const subject = encodeURIComponent(`Free estimate request — ${data.service || 'Exterior cleaning'}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\nProperty address: ${data.address}\n\nMessage:\n${data.message || 'No additional message.'}`,
        );
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setStatus('Your email app has been opened with the request details.');
      }
    } catch (error) {
      setStatus(error.message || 'Something went wrong. Please call us instead.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="site-shell">
      <div className="utility-bar">
        <div className="container utility-inner">
          <span><Icon>♢</Icon> Licensed & Insured</span>
          <span><Icon>◇</Icon> Free Estimates</span>
          <span><Icon>♙</Icon> Family Owned Business</span>
          <a href={PHONE_LINK}><Icon>☎</Icon> {PHONE_DISPLAY}</a>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="D&S Water Restore Solutions home">
            <img src={logo} alt="D&S Water Restore Solutions" />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
            <span className="sr-only">Toggle menu</span>
          </button>
          <nav id="primary-navigation" className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#about" onClick={closeMenu}>About Us</a>
            <a href="#gallery" onClick={closeMenu}>Gallery</a>
            <a href="#reviews" onClick={closeMenu}>Reviews</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <a className="btn btn-small nav-cta" href="#contact">Get Free Estimate</a>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-grid container">
            <div className="hero-logo-wrap">
              <img src={logo} alt="D&S Water Restore Solutions pressure washing logo" />
            </div>
            <div className="hero-copy">
              <p className="eyebrow">Professional</p>
              <h1><span>Pressure Washing</span><br />&amp; Exterior Cleaning</h1>
              <p className="hero-sub">Residential &amp; Commercial Services</p>
              <p className="licensed">Licensed &amp; Insured</p>
            </div>
          </div>
          <div className="hero-bottom container">
            <div><Icon>●</Icon><span>Serving Central Florida<br />and all 50 states</span></div>
            <div><Icon>◆</Icon><span>Nationwide service<br />available</span></div>
            <div><Icon>♟</Icon><span>Family owned<br />and operated</span></div>
          </div>
          <div className="hero-actions">
            <a className="btn" href="#contact"><Icon>▣</Icon> Get Free Estimate</a>
            <a className="btn btn-outline" href={PHONE_LINK}><Icon>☎</Icon> Call Now {PHONE_DISPLAY}</a>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-heading"><span>Our</span> Services</div>
            <div className="service-grid">
              {services.map(([icon, title]) => (
                <article className="service-card" key={title}>
                  <Icon>{icon}</Icon>
                  <h3>{title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Company benefits">
          <div className="container trust-grid">
            {trustItems.map(([icon, title, text]) => (
              <div className="trust-item" key={title}>
                <Icon>{icon}</Icon>
                <div><strong>{title}</strong><span>{text}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <div className="container">
            <div className="section-heading"><span>Before &amp; After</span> Gallery</div>
            <div className="gallery-grid">
              {gallery.map(([src, alt]) => (
                <figure className="gallery-card" key={alt}>
                  <img src={src} alt={alt} />
                </figure>
              ))}
            </div>
            <div className="centered"><a className="btn btn-compact" href="#contact">View Full Gallery</a></div>
          </div>
        </section>

        <section id="about" className="serve-section">
          <div className="container serve-grid">
            <div className="map-panel"><img src={map} alt="Map representing nationwide pressure washing service" /></div>
            <div className="serve-copy">
              <p className="eyebrow">We Proudly Serve</p>
              <h2>Central Florida &amp; All 50 States!</h2>
              <div className="serve-lists">
                <ul>
                  <li>Local experts you can trust</li>
                  <li>Fast, reliable and professional</li>
                  <li>Residential and commercial</li>
                </ul>
                <ul>
                  <li>Nationwide service available</li>
                  <li>Fully licensed and insured</li>
                  <li>Family owned and operated</li>
                </ul>
              </div>
              <p>No matter where you’re located, we’re ready to help restore and protect your property.</p>
            </div>
          </div>
        </section>

        <section id="reviews" className="reviews-section">
          <div className="container">
            <div className="section-heading"><span>Customer</span> Reviews</div>
            <div className="review-grid">
              <blockquote><div>★★★★★</div>“Prompt, professional, and the difference was incredible. Our driveway looks brand new.”<cite>— Residential Customer</cite></blockquote>
              <blockquote><div>★★★★★</div>“Great communication and reliable service from start to finish.”<cite>— Commercial Customer</cite></blockquote>
              <blockquote><div>★★★★★</div>“They treated our property with care and delivered exactly what they promised.”<cite>— Central Florida Customer</cite></blockquote>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div className="contact-photo" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.65)), url(${contactWash})` }} aria-hidden="true" />
            <div className="contact-info">
              <p className="eyebrow">Want a Free Estimate Today?</p>
              <a href={PHONE_LINK}><Icon>☎</Icon> {PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`}><Icon>✉</Icon> {EMAIL}</a>
              <em>Fast, Free &amp; No Obligation.</em>
              <span>We look forward to working with you!</span>
              <a className="btn" href={PHONE_LINK}><Icon>☎</Icon> Call Now</a>
            </div>
            <form className="estimate-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label><span>Full Name</span><input name="name" type="text" placeholder="Full Name" required /></label>
                <label><span>Phone Number</span><input name="phone" type="tel" placeholder="Phone Number" required /></label>
              </div>
              <div className="form-row">
                <label><span>Email Address</span><input name="email" type="email" placeholder="Email Address" required /></label>
                <label><span>Service Needed</span>
                  <select name="service" defaultValue="" required>
                    <option value="" disabled>Service Needed</option>
                    {services.slice(0, -1).map(([, title]) => <option key={title}>{title}</option>)}
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <label><span>Property Address</span><input name="address" type="text" placeholder="Property Address" required /></label>
              <label><span>Message</span><textarea name="message" rows="4" placeholder="Message (Optional)" /></label>
              <button className="btn submit-btn" type="submit" disabled={submitting}>
                <Icon>➤</Icon> {submitting ? 'Sending…' : 'Send Request'}
              </button>
              <p className="form-status" role="status" aria-live="polite">{status}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="D&S Water Restore Solutions" />
            <div><strong>D&amp;S Water Restore Solutions</strong><span>Professional Pressure Washing<br />&amp; Exterior Cleaning Services</span><em>Commercial • Residential</em><b>Licensed &amp; Insured</b></div>
          </div>
          <div><h3>Quick Links</h3><a href="#home">Home</a><a href="#services">Services</a><a href="#about">About Us</a><a href="#gallery">Gallery</a><a href="#reviews">Reviews</a><a href="#contact">Contact</a></div>
          <div><h3>Contact Info</h3><a href={PHONE_LINK}>☎ {PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>✉ {EMAIL}</a><span>● Serving Central Florida<br />and all 50 states</span></div>
          <div><h3>Follow Us</h3><div className="socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a></div></div>
        </div>
        <div className="copyright">© {new Date().getFullYear()} D&amp;S Water Restore Solutions. All Rights Reserved.</div>
      </footer>

      <a className="mobile-call" href={PHONE_LINK} aria-label={`Call ${PHONE_DISPLAY}`}>☎ Call Now</a>
    </div>
  );
}

export default App;
