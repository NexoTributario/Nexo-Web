
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Calendario', href: '#calendario' },
  { label: 'Contacto', href: '#contacto' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
        ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-lg shadow-xl shadow-slate-200/20 dark:shadow-none border-b border-slate-100 dark:border-slate-800 py-2' 
        : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div onClick={scrollToTop}>
            <Logo />
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-all relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
              <ThemeToggle />
              <a 
                href="#contacto"
                className="bg-primary text-dark px-6 py-2.5 rounded-xl font-bold hover:bg-white hover:ring-2 hover:ring-primary transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
              >
                Asesoría
                <span className="material-icons text-sm">arrow_forward</span>
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <span className="material-icons">{isOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white dark:bg-dark border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-4 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            <a 
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-primary text-dark py-4 rounded-xl font-bold shadow-lg shadow-primary/10"
            >
              Consultoría Gratuita
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
