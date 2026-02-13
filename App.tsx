
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import ThemeToggle from './components/ThemeToggle';
import { NEWS_MOCK, OBLIGATIONS_MOCK } from './constants.tsx';
import { Entity, NewsArticle } from './types';
import { analyzeResolution, askTaxQuery } from './services/geminiService';

const App: React.FC = () => {
  const [filter, setFilter] = useState<Entity>(Entity.ALL);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isChatting, setIsChatting] = useState(false);

  const WHATSAPP_LINK = "https://wsab.me/ISNz2N";

  const filteredNews = filter === Entity.ALL 
    ? NEWS_MOCK 
    : NEWS_MOCK.filter(n => n.entity === filter);

  const handleAnalyze = async (news: NewsArticle) => {
    setSelectedNews(news);
    setIsAnalyzing(true);
    setAnalysis(null);
    const result = await analyzeResolution(news.title, news.excerpt);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    setIsChatting(true);
    setChatResponse(null);
    const result = await askTaxQuery(chatQuery);
    setChatResponse(result);
    setIsChatting(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirecting directly to the provided short link for security
    window.open(WHATSAPP_LINK, '_blank');
  };

  const services = [
    { 
      icon: 'savings', 
      title: 'Recuperación de Impuestos', 
      desc: 'Expertos líderes en Devolución de IVA, Impuesto a la Renta, beneficios para Exportadores y convenios de Doble Imposición (CDI). Recuperamos su capital con máxima eficiencia legal.',
      featured: true 
    },
    { 
      icon: 'fact_check', 
      title: 'Auditoría Externa', 
      desc: 'Examen exhaustivo de estados financieros para brindar transparencia a sus socios y cumplimiento ante los entes de control.' 
    },
    { 
      icon: 'gavel', 
      title: 'Defensa Legal', 
      desc: 'Patrocinio jurídico especializado para litigios administrativos y constitucionales ante el SRI, IESS y ministerios.' 
    },
    { 
      icon: 'query_stats', 
      title: 'Outsourcing Contable', 
      desc: 'Manejo integral de libros contables y nómina bajo normas NIIF, asegurando una operatividad impecable.' 
    }
  ];

  return (
    <div className="min-h-screen selection:bg-primary/30 scroll-smooth">
      <Navbar />

      {/* Floating CTA */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <a 
          href={WHATSAPP_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce"
          title="WhatsApp Nexo"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Business Center Ecuador" 
            className="w-full h-full object-cover grayscale opacity-40 dark:opacity-20 transition-opacity duration-1000"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-dark dark:via-transparent dark:to-dark"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-[11px] font-bold uppercase tracking-[0.25em] mb-10 animate-fade-in backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              Excelencia en Asesoría Tributaria y Legal
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold text-slate-900 dark:text-white leading-[0.95] mb-10 animate-fade-in">
              Potenciamos su <br/>
              <span className="text-primary italic relative">
                Crecimiento
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
              </span> 
              Empresarial
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-14 leading-relaxed font-medium max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              NEXO TRIBUTARIO le ofrece la tranquilidad fiscal que su empresa merece, con más de dos décadas de trayectoria impecable.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <a href="#contacto" className="group bg-dark dark:bg-primary text-white dark:text-dark px-12 py-5 rounded-2xl font-bold text-lg text-center transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                Agendar Consulta
                <span className="material-icons text-xl group-hover:translate-x-1 transition-transform">rocket_launch</span>
              </a>
              <a href="#servicios" className="group bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-12 py-5 rounded-2xl font-bold text-lg text-center transition-all border border-slate-200 dark:border-slate-700 hover:border-primary flex items-center justify-center gap-3 shadow-lg shadow-slate-200/50 dark:shadow-none">
                Ver Portafolio
                <span className="material-icons text-xl opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all">north_east</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <div className="mb-6">
                <Logo className="scale-75 origin-left mb-4" />
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                Soluciones Integrales para <br/><span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">Desafíos Complejos</span>
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-sm pb-2">
              Cubrimos todo el espectro regulatorio para asegurar el cumplimiento total de su organización ante los entes de control.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div 
                key={i} 
                className={`group p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border shadow-xl transition-all hover:-translate-y-3 relative overflow-hidden ${
                  s.featured 
                    ? 'border-primary shadow-primary/10 dark:shadow-primary/5' 
                    : 'border-slate-100 dark:border-slate-800 shadow-slate-200/20 dark:shadow-none hover:border-primary/40'
                }`}
              >
                {s.featured && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-dark text-[10px] font-black py-1 px-4 rounded-bl-xl uppercase tracking-tighter">
                      Especialidad Core
                    </div>
                  </div>
                )}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-colors duration-500 shadow-sm ${
                  s.featured ? 'bg-primary text-dark' : 'bg-slate-50 dark:bg-slate-800 group-hover:bg-primary group-hover:text-dark'
                }`}>
                  <span className={`material-icons text-3xl ${s.featured ? 'text-dark' : 'text-primary group-hover:text-dark'}`}>{s.icon}</span>
                </div>
                <h4 className={`text-2xl font-bold mb-6 transition-colors ${
                  s.featured ? 'text-primary' : 'dark:text-white group-hover:text-primary'
                }`}>{s.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm mb-8">
                  {s.desc}
                </p>
                <div className={`h-1 transition-all duration-500 ${
                  s.featured ? 'w-full bg-primary' : 'w-0 bg-primary group-hover:w-full'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-32 bg-white dark:bg-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-3xl border-8 border-slate-50 dark:border-slate-800/50 transition-transform duration-700 hover:scale-[1.02]">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" 
                  alt="Equipo Nexo Tributario Impecable en Mesa de Trabajo" 
                  className="w-full h-full object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent opacity-60"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-0"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-2xl -z-0"></div>
              <div className="absolute bottom-10 left-10 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-primary/20 backdrop-blur-sm z-20 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-icons text-primary">verified</span>
                  <p className="text-xs font-black uppercase tracking-widest text-dark dark:text-white">Excelencia Corporativa</p>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Profesionales con formación de élite al servicio de su empresa.</p>
              </div>
            </div>
            
            <div className="space-y-10">
              <div className="animate-fade-in">
                <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6">Nuestra Esencia</h2>
                <h3 className="text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight mb-8">
                  Evolución y <span className="text-primary italic">Compromiso</span> Inquebrantable
                </h3>
              </div>
              
              <div className="space-y-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                <p>
                  Desde el año <span className="text-slate-900 dark:text-white font-bold">2005</span>, iniciamos nuestra trayectoria como <span className="text-primary font-bold italic">Cortez & Asociados</span>. Hoy, nos hemos consolidado como una firma líder en servicios contables y tributarios en Ecuador, impulsando la tranquilidad de nuestros clientes.
                </p>
                <p>
                  Contamos con un <span className="text-slate-900 dark:text-white font-bold italic text-primary">staff de profesionales de tercer nivel</span> y de mucha experiencia, con capacidad formativa para adaptarnos a las necesidades de cada cliente de manera integral.
                </p>
                <p>
                  Nuestra experiencia nos permite atender a personas naturales y jurídicas en todo el Ecuador, adaptándonos a categorías del SRI como <span className="text-dark dark:text-white font-semibold italic">RIMPE, Emprendedores, Régimen General y PYMES</span>, garantizando un servicio confiable que impulse su crecimiento.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="text-4xl font-black text-primary mb-2">20+</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Años de Confianza</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-primary mb-2">100%</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rigor Técnico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern News Section */}
      <section id="noticias" className="py-32 bg-slate-50 dark:bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-20 gap-12">
            <div>
              <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6">Portal de Actualidad</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold dark:text-white mb-6">Boletín Informativo <span className="text-slate-400">NEXO</span></h3>
              <div className="flex flex-wrap gap-3">
                {[Entity.ALL, Entity.SRI, Entity.IESS, Entity.SUPERCIAS].map(e => (
                  <button
                    key={e}
                    onClick={() => setFilter(e)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${filter === e ? 'bg-primary text-dark shadow-xl shadow-primary/20' : 'bg-white dark:bg-slate-800 text-slate-500 hover:border-primary border border-transparent'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-primary/10 max-w-md">
              <div className="flex gap-4 items-center mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="material-icons text-primary">auto_awesome</span>
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white">Análisis con IA</h5>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "Seleccione cualquier noticia y nuestro motor de inteligencia artificial NexoGPT generará un resumen ejecutivo y puntos de acción para su empresa."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredNews.map((news) => (
              <article key={news.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/40 dark:shadow-none hover:shadow-primary/5 transition-all group border border-transparent hover:border-primary/20">
                <div className="h-64 relative overflow-hidden">
                  <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-primary text-dark px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {news.entity}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary mb-6">
                    <span className="material-icons text-sm">event</span>
                    {news.date}
                  </div>
                  <h4 className="text-2xl font-bold mb-6 dark:text-white leading-tight min-h-[4rem]">
                    {news.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-10 leading-relaxed">
                    {news.excerpt}
                  </p>
                  <button 
                    onClick={() => handleAnalyze(news)}
                    className="w-full py-4 rounded-2xl border-2 border-primary/20 text-primary font-bold text-xs uppercase tracking-[0.2em] group-hover:bg-primary group-hover:text-dark group-hover:border-primary transition-all flex items-center justify-center gap-3"
                  >
                    Interpretación IA <span className="material-icons text-lg">psychology</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Expanded AI View */}
          {selectedNews && (
            <div className="mt-20 bg-dark dark:bg-slate-900 rounded-[3rem] p-12 lg:p-16 text-white shadow-3xl animate-fade-in relative overflow-hidden border border-primary/30">
              <div className="absolute top-10 right-10">
                <button onClick={() => setSelectedNews(null)} className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-500/20 text-white transition-all">
                  <span className="material-icons">close</span>
                </button>
              </div>
              <div className="flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3">
                  <Logo light className="mb-10" />
                  <h3 className="text-3xl font-bold mb-6">Análisis de Impacto</h3>
                  <div className="inline-block px-4 py-2 bg-primary/20 text-primary border border-primary/40 rounded-xl text-xs font-mono mb-8">
                    {selectedNews.resolutionNumber}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Nuestro sistema NexoGPT procesa la resolución en tiempo real para extraer los lineamientos críticos para la operatividad de su negocio.
                  </p>
                </div>
                <div className="lg:w-2/3 border-l border-white/10 lg:pl-16">
                  {isAnalyzing ? (
                    <div className="space-y-6">
                      <div className="h-8 bg-white/5 rounded-full w-full animate-pulse"></div>
                      <div className="h-8 bg-white/5 rounded-full w-4/5 animate-pulse"></div>
                      <div className="h-40 bg-white/5 rounded-3xl w-full animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <div className="text-xl text-slate-200 leading-relaxed whitespace-pre-line italic font-light">
                        {analysis}
                      </div>
                      <div className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-3xl flex items-center gap-6">
                        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shrink-0">
                          <span className="material-icons text-dark text-3xl">verified_user</span>
                        </div>
                        <p className="text-sm font-bold text-primary uppercase tracking-widest">
                          Este análisis es una interpretación generada por IA. Para decisiones jurídicas, contacte a un especialista de Nexo Tributario.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tax Assistant Callout */}
      <section className="py-32 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 rounded-[4rem] p-12 lg:p-24 border border-primary/10 relative overflow-hidden">
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <Logo className="mb-10" />
                <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-8">
                  Dudas sobre sus <br/><span className="text-primary italic">Impuestos?</span>
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-md">
                  Pregunte a nuestro Asistente Nexo AI sobre normativas, porcentajes de retención o plazos específicos del SRI y obtenga respuestas al instante.
                </p>
                <div className="flex gap-4">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <img key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 object-cover" src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Expert" />
                      ))}
                   </div>
                   <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center">
                      Respaldado por nuestro equipo legal
                   </div>
                </div>
              </div>
              
              <div id="calendario" className="bg-slate-900 rounded-[3rem] p-10 shadow-3xl border border-white/10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <span className="material-icons text-primary text-3xl">chat</span>
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-bold">NEXO Chat AI</h4>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest">En línea ahora</p>
                  </div>
                </div>
                
                <form onSubmit={handleChat} className="space-y-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={chatQuery}
                      onChange={(e) => setChatQuery(e.target.value)}
                      placeholder="¿Cuál es el plazo para el IVA mensual?"
                      className="w-full bg-slate-950/80 border-slate-700 rounded-2xl py-6 px-8 text-white focus:ring-primary focus:border-primary transition-all placeholder-slate-600 shadow-inner text-lg"
                    />
                    <button 
                      type="submit"
                      disabled={isChatting}
                      className="absolute right-3 top-3 bottom-3 bg-primary text-dark px-8 rounded-xl hover:scale-105 active:scale-95 transition-all font-bold flex items-center justify-center"
                    >
                      {isChatting ? <span className="material-icons animate-spin">sync</span> : <span className="material-icons">send</span>}
                    </button>
                  </div>
                  
                  {chatResponse && (
                    <div className="p-8 bg-slate-950/40 rounded-3xl border border-primary/20 animate-fade-in">
                      <div className="flex gap-4">
                        <span className="material-icons text-primary shrink-0">auto_awesome</span>
                        <div className="space-y-4">
                           <p className="text-base text-slate-200 leading-relaxed font-light">{chatResponse}</p>
                           <a href="#contacto" className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase hover:underline">
                              Consultar con un humano <span className="material-icons text-sm">person</span>
                           </a>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Contact Section */}
      <section id="contacto" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-24 items-start">
             <div>
                <Logo className="mb-10" />
                <h3 className="text-5xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-10 leading-tight">
                  Construyamos su <br/><span className="text-primary">Legado Fiscal</span>
                </h3>
                <p className="text-xl text-slate-500 dark:text-slate-400 mb-16 max-w-md font-medium">
                  Atención personalizada y segura. Deja tu mensaje a nuestro WhatsApp para una respuesta inmediata.
                </p>
                
                <div className="grid gap-6">
                  {[
                    { icon: 'place', label: 'Ubicación Estratégica', val: 'Vía a la Costa Km 22, Edificio Nexo GYE' },
                    { icon: 'chat', label: 'WhatsApp Corporativo', val: 'Click para iniciar chat', link: WHATSAPP_LINK },
                    { icon: 'bolt', label: 'Enlace Directo', val: 'https://wsab.me/ISNz2N', link: WHATSAPP_LINK }
                  ].map((item, idx) => (
                    <a 
                      key={idx} 
                      href={item.link || "#"}
                      target={item.link ? "_blank" : "_self"}
                      className={`flex gap-6 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:border-primary/30 group ${item.link ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-dark transition-all">
                        <span className="material-icons text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-lg font-bold text-slate-800 dark:text-white">{item.val}</p>
                      </div>
                    </a>
                  ))}
                </div>
             </div>

             <div className="bg-white dark:bg-slate-900 p-12 lg:p-16 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-100 dark:border-slate-800 relative">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <span className="material-symbols-outlined text-[120px] text-primary">contact_mail</span>
                </div>
                <h4 className="text-3xl font-bold mb-10 dark:text-white">Formulario de Enlace</h4>
                <form onSubmit={handleFormSubmit} className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Nombre del Interesado</label>
                    <input required type="text" className="w-full bg-slate-50 dark:bg-dark border-transparent rounded-2xl px-8 py-5 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-slate-900 dark:text-white shadow-inner" placeholder="P. ej. Ing. Roberto Sánchez" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Empresa / RUC</label>
                    <input required type="text" className="w-full bg-slate-50 dark:bg-dark border-transparent rounded-2xl px-8 py-5 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-slate-900 dark:text-white shadow-inner" placeholder="Nombre de su organización" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Contexto de la Consulta</label>
                    <textarea required rows={4} className="w-full bg-slate-50 dark:bg-dark border-transparent rounded-2xl px-8 py-5 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none text-slate-900 dark:text-white shadow-inner" placeholder="¿En qué área podemos apoyarle?"></textarea>
                  </div>
                  <button type="submit" className="group w-full bg-[#25D366] text-white font-bold py-6 rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 text-lg">
                    Contactar vía WhatsApp
                    <span className="material-icons group-hover:translate-x-1 transition-transform">send</span>
                  </button>
                </form>
             </div>
           </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="bg-slate-900 text-white pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-4 gap-20 mb-24">
            <div className="lg:col-span-2">
              <Logo light className="mb-10" />
              <p className="text-slate-400 max-w-md text-xl leading-relaxed mb-12 font-light">
                Brindamos soluciones de alto impacto basadas en la ética, el rigor técnico y la innovación tecnológica para el ecosistema empresarial ecuatoriano.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-10 uppercase tracking-widest text-xs text-primary">Servicios</h5>
              <ul className="space-y-6 text-slate-400 text-sm font-semibold">
                <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Tributación Internacional</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Auditoría Forense</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Consultoría RIMPE</a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Defensa IESS</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-10 uppercase tracking-widest text-xs text-primary">Contacto</h5>
              <div className="space-y-6 text-slate-400">
                <div className="flex items-start gap-4">
                  <span className="material-icons text-primary text-xl">map</span>
                  <p className="text-sm font-medium">Kilómetro 22 Vía a la Costa, Guayaquil, Ecuador.</p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" className="flex items-center gap-4 hover:text-primary transition-all">
                  <span className="material-icons text-primary text-xl">chat</span>
                  <p className="text-sm font-medium">Deja tu mensaje a nuestro WhatsApp</p>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-4">
               <Logo className="scale-[0.4] origin-left -ml-4" light />
               <span>© 2026 NEXO TRIBUTARIO - TODOS LOS DERECHOS RESERVADOS</span>
            </div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Protección de Datos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
