# Pop Negro — Landing v2

## Decisiones de identidad

- Marca principal: **Pop Negro**.
- Luis Grasso es la persona y referencia profesional detrás de la marca.
- Posicionamiento: construir experiencias, productos y herramientas digitales conectando negocio, diseño y tecnología.
- Base: Mendoza, Argentina. Modalidad: trabajo remoto.
- Outsourcing describe una modalidad de contratación; no compite como marca.

## Criterio de contenido

La versión anterior mostraba cinco casos genéricos con fotografías de stock, resultados no verificables y una nota que reconocía que faltaba vincular evidencia. Se reemplazaron por capacidades y servicios. No se publican nombres de clientes, métricas ni resultados que no estén respaldados.

La trayectoria de Luis se resume a partir del CV: más de 15 años de experiencia; diseño gráfico, branding, comunicación, UI/UX, diseño web y campañas digitales; experiencia en agencias, startups y proyectos freelance. Los datos de contacto y LinkedIn se mantienen como referencias profesionales.

## Arquitectura

1. Hero y propuesta de valor.
2. Áreas de servicio agrupadas en cinco capacidades.
3. Método de trabajo en cuatro etapas.
4. Perfil profesional y experiencia de Luis Grasso.
5. Contacto con formulario y alternativa por email.

## Criterios de aceptación

- [x] Pop Negro es la marca principal en navegación, contenido y metadatos.
- [x] Luis Grasso aparece como referente profesional detrás de la marca.
- [x] Mendoza y trabajo remoto reemplazan la referencia geográfica incorrecta.
- [x] Los servicios tienen alcance comprensible y están agrupados por capacidad.
- [x] Se eliminan proyectos ficticios, resultados no demostrados e imágenes de stock.
- [x] El formulario valida y limita los campos; incorpora honeypot y alternativa de email.
- [x] Se elimina el acceso de lectura general de usuarios autenticados a consultas en una migración nueva.
- [x] La interfaz contempla navegación móvil, foco visible y preferencia de movimiento reducido.
- [x] Metadatos SEO y Open Graph identifican la marca.
- [ ] Confirmar si `outsourcing-it.vercel.app` será el dominio definitivo o reemplazarlo por el dominio comercial final; generar imagen OG propia.
- [ ] Aplicar la migración de seguridad en el proyecto Supabase correspondiente y verificar RLS real.
- [x] Añadir fallback mailto si Supabase no está configurado o falla.
- [ ] Configurar variables de Supabase en el entorno de despliegue y probar un envío real autorizado.
- [ ] Ejecutar QA final en preview Vercel y validar el dominio público definitivo.

## Riesgos y límites conocidos

- El repositorio no incluye una suite E2E previa. Se agrega un conjunto de pruebas de regresión de contenido; el QA visual se realiza en navegador.
- El honeypot reduce envíos automatizados simples, pero no sustituye rate limiting, CAPTCHA adaptativo o validación server-side. El proyecto Vercel inspeccionado no tiene variables de entorno configuradas; por eso, el formulario ofrece una salida mailto hasta que se configure el endpoint de persistencia.
- La migración SQL queda versionada; no se aplica automáticamente a producción desde este cambio.
- El repositorio no acredita casos de estudio publicables. Para incorporarlos se necesita seleccionar proyectos reales y reunir evidencias verificables.
