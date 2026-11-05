import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  Braces,
  Check,
  Code2,
  Layers3,
  Menu,
  Palette,
  Search,
  Send,
  Workflow,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const services = [
  {
    number: '01',
    title: 'Estrategia & producto',
    description: 'Definición de problemas, objetivos, alcance y oportunidades. Una dirección clara antes de invertir en ejecución.',
    items: ['Discovery y definición', 'Estrategia digital', 'Arquitectura de producto'],
    icon: Layers3,
  },
  {
    number: '02',
    title: 'Diseño & comunicación',
    description: 'Identidades e interfaces que ordenan el mensaje, construyen reconocimiento y hacen más simple cada interacción.',
    items: ['Branding e identidad visual', 'UX/UI y design systems', 'Campañas y contenido digital'],
    icon: Palette,
  },
  {
    number: '03',
    title: 'Desarrollo & tecnología',
    description: 'Soluciones web conectadas con la operación real: desde una landing hasta herramientas y plataformas a medida.',
    items: ['Sitios y landing pages', 'Dashboards y plataformas', 'APIs e integraciones'],
    icon: Braces,
  },
  {
    number: '04',
    title: 'Marketing & crecimiento',
    description: 'Visibilidad, medición y mejora continua para conectar la experiencia digital con objetivos concretos.',
    items: ['SEO local y GEO', 'Analítica y conversión', 'Contenido y campañas'],
    icon: Search,
  },
  {
    number: '05',
    title: 'Automatización & evolución',
    description: 'Menos tareas repetitivas y más continuidad: procesos conectados, publicación y soporte técnico.',
    items: ['Automatizaciones y workflows', 'Hosting y publicación', 'Mantenimiento y optimización'],
    icon: Workflow,
  },
];

const steps = [
  ['01', 'Entender', 'Alineamos contexto, problema, usuarios y objetivos. Definimos qué vale la pena resolver y cómo medirlo.'],
  ['02', 'Diseñar', 'Traducimos la estrategia en una experiencia, un sistema visual y un plan de implementación claro.'],
  ['03', 'Construir', 'Desarrollamos, integramos y probamos cada parte. Diseño y tecnología trabajan sobre el mismo objetivo.'],
  ['04', 'Evolucionar', 'Publicamos, medimos y priorizamos mejoras. El trabajo no termina cuando el proyecto sale online.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [fallbackMailto, setFallbackMailto] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: silently discard automated submissions.
    if (String(formData.get('company_website') ?? '').trim()) {
      setSubmitted(true);
      return;
    }

    setSending(true);
    setFormError('');
    setFallbackMailto('');
    const inquiry = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };

    const mailto = 'mailto:grasso.luis@gmail.com?subject=' + encodeURIComponent('Consulta desde Pop Negro') + '&body=' + encodeURIComponent('Nombre: ' + inquiry.name + '\nEmail: ' + inquiry.email + '\n\n' + inquiry.message);

    try {
      if (!supabase) {
        setFormError('Este entorno todavía no tiene el formulario conectado. Podés enviar la consulta directamente por email.');
        setFallbackMailto(mailto);
        return;
      }
      const { error } = await supabase.from('portfolio_inquiries').insert(inquiry);
      if (error) throw error;
      setSubmitted(true);
      form.reset();
    } catch {
      setFormError('No pudimos registrar el mensaje. Podés continuar por email.');
      setFallbackMailto(mailto);
    } finally {
      setSending(false);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Pop Negro, inicio">
          <span className="brand-mark" aria-hidden="true"><Asterisk size={25} strokeWidth={2.5} /></span>
          <span className="brand-name">POP NEGRO</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#metodo" onClick={closeMenu}>Método</a>
          <a href="#perfil" onClick={closeMenu}>Quiénes somos</a>
          <a href="#contacto" className="nav-cta" onClick={closeMenu}>Hablemos <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Estrategia · Diseño · Tecnología</p>
            <h1>Ideas claras.<br /><em>Soluciones reales.</em></h1>
            <p className="hero-lead">Construimos experiencias, productos y herramientas digitales conectando negocio, diseño y tecnología.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#servicios">Explorar servicios <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#contacto">Contar un proyecto <ArrowDownRight size={17} /></a>
            </div>
            <p className="hero-location">Mendoza, Argentina <span>—</span> Trabajo remoto</p>
          </div>
          <div className="hero-visual" aria-label="Composición gráfica abstracta de Pop Negro">
            <div className="hero-visual-top"><span>POP NEGRO / STUDIO</span><span>INDEPENDENT PRACTICE</span></div>
            <div className="visual-composition">
              <div className="visual-orbit orbit-a" />
              <div className="visual-orbit orbit-b" />
              <div className="visual-disc" />
              <div className="visual-cross">+</div>
              <div className="visual-word">MAKE<br /><em>IT</em><br />MATTER<span>.</span></div>
              <span className="visual-index">DESIGN / BUILD / GROW</span>
            </div>
            <div className="hero-visual-bottom"><span>Una mirada integral</span><span>01—05</span></div>
            <div className="floating-note"><Asterisk size={17} /><span>Del concepto<br />a lo concreto.</span></div>
          </div>
        </section>

        <section className="capability-strip" aria-label="Áreas de trabajo">
          <div className="section-wrap capability-inner">
            <span>Capacidades integradas para cada desafío</span>
            <div className="capability-items"><span><Palette size={16} /> Diseño</span><span><Code2 size={16} /> Desarrollo</span><span><Search size={16} /> Marketing</span><span><Workflow size={16} /> Automatización</span></div>
          </div>
        </section>

        <section className="services section-wrap" id="servicios">
          <div className="section-heading">
            <div><p className="eyebrow"><span className="eyebrow-line" /> Qué hacemos</p><h2>Capacidades que<br /><em>se conectan.</em></h2></div>
            <p className="section-intro">No trabajamos en compartimentos aislados. Sumamos las disciplinas necesarias para resolver el problema completo, con un alcance definido para cada proyecto.</p>
          </div>
          <div className="services-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.number}>
                  <div className="service-top"><span>{service.number}</span><Icon size={22} strokeWidth={1.5} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>{service.items.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="method" id="metodo">
          <div className="section-wrap method-grid">
            <div className="method-intro">
              <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Cómo trabajamos</p>
              <h2>Del problema<br /><em>a la solución.</em></h2>
              <p>Cada proyecto necesita una combinación distinta de estrategia, diseño y tecnología. El proceso se adapta al desafío, sin perder claridad ni control.</p>
              <a className="method-link" href="#contacto">Hablemos de tu proyecto <ArrowUpRight size={16} /></a>
            </div>
            <div className="method-list">
              {steps.map(([number, title, description]) => (
                <article className="method-step" key={number}>
                  <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={17} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="profile section-wrap" id="perfil">
          <div className="profile-stamp"><Asterisk size={38} /><span>POP<br />NEGRO</span></div>
          <div className="profile-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Dirección y experiencia</p>
            <h2>Una visión amplia.<br /><em>Manos en el trabajo.</em></h2>
            <p>Pop Negro es la identidad de trabajo de Luis Grasso: una trayectoria que cruza diseño gráfico, branding, comunicación, UX/UI, desarrollo web y marketing digital.</p>
            <p>Más de 15 años de experiencia en agencias, startups y proyectos independientes. Un perfil creativo y técnico para pensar, diseñar y llevar soluciones a producción.</p>
            <div className="profile-facts"><span><b>15+</b> años de experiencia</span><span><b>360°</b> mirada integral</span><span><b>AR</b> base en Mendoza</span></div>
            <a className="text-link profile-link" href="https://www.linkedin.com/in/luis-grasso" target="_blank" rel="noreferrer">Conocer trayectoria <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="contact section-wrap" id="contacto">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> Próximo paso</p>
              <h2>¿Qué necesitás<br /><em>hacer posible?</em></h2>
              <p>Contanos en qué estás trabajando. Revisamos el contexto y definimos cómo podemos ayudarte.</p>
              <div className="contact-details">
                <a href="mailto:grasso.luis@gmail.com">grasso.luis@gmail.com <ArrowUpRight size={15} /></a>
                <span>Mendoza, Argentina · Remoto</span>
              </div>
            </div>
            <div className="form-panel">
              {submitted ? (
                <div className="success-state"><Send size={34} /><h3>Mensaje recibido.</h3><p>Gracias por contactar a Pop Negro. Vamos a revisar tu consulta.</p><button className="button button-dark" onClick={() => setSubmitted(false)}>Enviar otro mensaje</button></div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label>Tu nombre<input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="¿Cómo te llamás?" /></label>
                  <label>Tu email<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="nombre@empresa.com" /></label>
                  <label>¿Qué necesitás resolver?<textarea name="message" required minLength={10} maxLength={2000} rows={3} placeholder="Contanos brevemente sobre tu proyecto." /></label>
                  <div className="honeypot" aria-hidden="true"><label htmlFor="company_website">No completar</label><input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" /></div>
                  {formError && <div className="form-error" role="alert"><p>{formError}</p>{fallbackMailto && <a href={fallbackMailto}>Enviar consulta por email <ArrowUpRight size={14} /></a>}</div>}
                  <button className="button button-dark form-submit" type="submit" disabled={sending}>{sending ? 'Enviando…' : 'Enviar consulta'} <ArrowUpRight size={17} /></button>
                  <p className="form-privacy">Usaremos tus datos únicamente para responder esta consulta.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="brand" href="#inicio"><span className="brand-mark"><Asterisk size={23} /></span><span className="brand-name">POP NEGRO</span></a>
        <p>Estrategia, diseño y tecnología.</p>
        <a href="https://www.linkedin.com/in/luis-grasso" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
        <span>© {new Date().getFullYear()} Pop Negro</span>
      </footer>
    </div>
  );
}

export default App;
