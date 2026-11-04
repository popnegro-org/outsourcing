import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
  Code2,
  ExternalLink,
  Figma,
  Globe2,
  MapPin,
  Menu,
  Monitor,
  Server,
  Sparkles,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Project = {
  id: number;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  tags: string[];
  skills: string[];
  result: string;
  accent: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Sistema editorial modular',
    eyebrow: 'Maquetación · UI',
    description: 'Una experiencia de lectura flexible, con jerarquía visual clara y componentes preparados para crecer.',
    image: 'https://images.pexels.com/photos/68763/pexels-photo-68763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Layout responsive', 'Design system'],
    skills: ['HTML semántico', 'CSS responsive', 'Componentes reutilizables'],
    result: 'Arquitectura visual consistente en desktop, tablet y móvil.',
    accent: 'mint',
  },
  {
    id: 2,
    title: 'Producto digital, sin fricción',
    eyebrow: 'UX/UI · Prototipado',
    description: 'Flujos simples para convertir una tarea compleja en una secuencia intuitiva y fácil de entender.',
    image: 'https://images.pexels.com/photos/20870806/pexels-photo-20870806.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['UX research', 'Prototipo UI'],
    skills: ['User flows', 'Wireframes', 'Microinteracciones'],
    result: 'Menos decisiones por pantalla, más claridad en cada acción.',
    accent: 'peach',
  },
  {
    id: 3,
    title: 'Presencia local que convierte',
    eyebrow: 'SEO local · GEO',
    description: 'Una vidriera digital diseñada para que una marca de barrio sea encontrada, entendida y elegida.',
    image: 'https://images.pexels.com/photos/37797929/pexels-photo-37797929.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['SEO local', 'Google Business'],
    skills: ['Arquitectura SEO', 'Contenido geolocalizado', 'Datos estructurados'],
    result: 'Más señales de relevancia local y recorridos de contacto más directos.',
    accent: 'blue',
  },
  {
    id: 4,
    title: 'Backoffice que ordena',
    eyebrow: 'Backend · Integración',
    description: 'Interfaces operativas que conectan formularios, datos y estados sin perder legibilidad.',
    image: 'https://images.pexels.com/photos/907489/pexels-photo-907489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['API integration', 'Dashboard'],
    skills: ['Integración de datos', 'Estados de carga', 'Validación de formularios'],
    result: 'Una vista de trabajo que hace visible el estado real de cada operación.',
    accent: 'lime',
  },
  {
    id: 5,
    title: 'De local a publicado',
    eyebrow: 'Hosting · Entrega',
    description: 'Un flujo de entrega pensado para que el diseño llegue a producción rápido, estable y con criterio.',
    image: 'https://images.pexels.com/photos/17771078/pexels-photo-17771078.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Deploy', 'Performance'],
    skills: ['Configuración de hosting', 'Dominio y SSL', 'Checklist de publicación'],
    result: 'Implementación lista para publicar, medir y mantener.',
    accent: 'yellow',
  },
];

const filters = ['Todos', 'Maquetación', 'UX/UI', 'Backend', 'SEO local', 'Hosting'];

function App() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'Todos') return projects;
    return projects.filter((project) => project.eyebrow.toLowerCase().includes(activeFilter.toLowerCase()) || project.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase())));
  }, [activeFilter]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setFormError('');
    const formData = new FormData(event.currentTarget);
    const inquiry = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };
    const { error } = await supabase.from('portfolio_inquiries').insert(inquiry);
    setSending(false);
    if (error) {
      setFormError('No pudimos enviar el mensaje. Revisá los datos e intentá nuevamente.');
      return;
    }
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nave portfolio, inicio">
          <span className="brand-mark">N</span>
          <span>NAVE<span className="brand-dot">.</span></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menú">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Proyectos</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Cómo trabajo</a>
          <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Hablemos <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Portfolio de diseño web <span className="eyebrow-date">2026</span></p>
            <h1>Diseño digital<br /><em>con dirección.</em></h1>
            <p className="hero-lead">Interfaces que se ven bien, se entienden rápido y funcionan cuando llegan a producción.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Ver proyectos <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#contact">Contame tu idea <ChevronRight size={17} /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card hero-card-main">
              <div className="hero-card-top"><span>SELECTED / 05</span><span>01—05</span></div>
              <div className="hero-art"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-sun" /><div className="art-word">FORMA<br /><span>Y FUNCIÓN</span></div></div>
              <div className="hero-card-bottom"><span>Una mirada completa</span><span>↘</span></div>
            </div>
            <div className="floating-note"><Sparkles size={15} /><span>Diseño que<br />deja marca.</span></div>
          </div>
        </section>

        <section className="trust-strip"><div className="section-wrap trust-inner"><span>Lo que pide la convocatoria</span><div className="trust-items"><span><Monitor size={16} /> Maquetación</span><span><Figma size={16} /> UX / UI</span><span><Globe2 size={16} /> SEO + GEO</span><span><Server size={16} /> Hosting</span></div></div></section>

        <section className="work section-wrap" id="work">
          <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> Selección de trabajo</p><h2>Cinco formas de<br /><em>resolver mejor.</em></h2></div><p className="section-intro">Una selección orientada a los desafíos centrales de la convocatoria: forma, experiencia, integración y llegada real.</p></div>
          <div className="filter-row" role="tablist" aria-label="Filtrar proyectos">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter active' : 'filter'} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          <div className="projects-grid">{visibleProjects.map((project) => <article className={`project-card accent-${project.accent}`} key={project.id}><button className="project-image" onClick={() => setSelectedProject(project)} aria-label={`Abrir detalle de ${project.title}`}><img src={project.image} alt="" /><span className="image-overlay"><ExternalLink size={19} /></span><span className="project-number">0{project.id}</span></button><div className="project-content"><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-link" onClick={() => setSelectedProject(project)}>Ver caso <ArrowUpRight size={16} /></button></div></article>)}</div>
        </section>

        <section className="process section-wrap" id="process"><div className="process-intro"><p className="eyebrow"><span className="eyebrow-line" /> Método de trabajo</p><h2>Del primer<br /><em>pixel al deploy.</em></h2><p>El diseño no termina en el archivo. Acompaño cada decisión hasta que la experiencia funciona en el mundo real.</p></div><div className="process-list"><div className="process-step"><span>01</span><div><h3>Entender antes de dibujar</h3><p>Objetivos, audiencias y contenido para tomar decisiones con contexto.</p></div><Check size={18} /></div><div className="process-step"><span>02</span><div><h3>Diseñar para cada pantalla</h3><p>Maquetación responsive, sistemas visuales y estados que se sienten naturales.</p></div><Check size={18} /></div><div className="process-step"><span>03</span><div><h3>Publicar con criterio</h3><p>Integración, SEO técnico, hosting y una última revisión antes de abrir la puerta.</p></div><Check size={18} /></div></div></section>

        <section className="coverage"><div className="section-wrap coverage-grid"><div><p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Matriz de cobertura</p><h2>Todo lo que<br /><em>hay que cuidar.</em></h2></div><div className="coverage-items"><div><CircleCheck size={19} /><span><b>Visual</b> Maquetación y piezas dentro del sitio.</span></div><div><CircleCheck size={19} /><span><b>Experiencia</b> Interfaces web con enfoque UX/UI.</span></div><div><CircleCheck size={19} /><span><b>Negocio</b> Backend, SEO local y GEO.</span></div><div><CircleCheck size={19} /><span><b>Operación</b> Hosting, dominio y publicación.</span></div></div></div></section>

        <section className="contact section-wrap" id="contact"><div className="contact-card"><div className="contact-copy"><p className="eyebrow"><span className="eyebrow-line" /> Próximo proyecto</p><h2>Hagamos algo<br /><em>que importe.</em></h2><p>Si estás buscando una mirada de diseño que entienda el recorrido completo, este es un buen lugar para empezar.</p><div className="contact-meta"><span><MapPin size={16} /> Buenos Aires · Remoto</span><span><Code2 size={16} /> Disponible para proyectos</span></div></div><div className="form-panel">{submitted ? <div className="success-state"><CircleCheck size={36} /><h3>Mensaje recibido.</h3><p>Gracias por escribir. La propuesta quedó registrada y voy a revisar los detalles pronto.</p><button className="button button-dark" onClick={() => setSubmitted(false)}>Enviar otro mensaje</button></div> : <form onSubmit={handleSubmit}><label>Tu nombre<input name="name" required minLength={2} placeholder="¿Cómo te llamás?" /></label><label>Tu email<input name="email" required type="email" placeholder="nombre@empresa.com" /></label><label>Contame brevemente<textarea name="message" required minLength={10} rows={3} placeholder="¿Qué necesitás construir?" /></label>{formError && <p className="form-error">{formError}</p>}<button className="button button-dark form-submit" type="submit" disabled={sending}>{sending ? 'Enviando…' : 'Enviar mensaje'} <ArrowUpRight size={17} /></button></form>}</div></div></section>
      </main>

      <footer className="footer section-wrap"><a className="brand" href="#top"><span className="brand-mark">N</span><span>NAVE<span className="brand-dot">.</span></span></a><p>Diseño web con dirección.</p><span>© 2026</span></footer>

      {selectedProject && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Cerrar detalle"><X size={20} /></button><img src={selectedProject.image} alt="" /><div className="modal-body"><p className="project-eyebrow">{selectedProject.eyebrow}</p><h2 id="project-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="modal-result"><span>Qué demuestra</span><b>{selectedProject.result}</b></div><ul>{selectedProject.skills.map((skill) => <li key={skill}><CircleCheck size={16} /> {skill}</li>)}</ul><span className="evidence-note">Caso preparado para vincular con repositorio y evidencia de entrega.</span></div></div></div>}
    </div>
  );
}

export default App;
