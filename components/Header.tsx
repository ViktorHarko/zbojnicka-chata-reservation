import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { Menu, X, Mountain } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { locale, setLocale, t } = useI18n();

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="text-primary group-hover:opacity-80 transition-opacity">
             <Mountain size={40} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-primary text-xl tracking-tight leading-none">ZBOJNÍCKA<br/>CHATA</span>
            <span className="text-[10px] text-primary tracking-widest">1960 M.N.M.</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-primary">
          <a href="#" className="hover:text-secondary transition-colors">{t('services')}</a>
          <a href="#" className="hover:text-secondary transition-colors">{t('activities')}</a>
          <a href="#" className="hover:text-secondary transition-colors">{t('hut')}</a>
          
          <button
            onClick={() => setLocale(locale === 'sk' ? 'en' : 'sk')}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
          >
            {locale === 'sk' ? 'EN' : 'SK'}
          </button>
          
          <a href="#/res" className="bg-secondary text-white px-6 py-3 rounded font-bold hover:bg-red-800 transition-colors uppercase tracking-wide">
            {t('reserve')}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 flex flex-col gap-4 shadow-lg absolute w-full">
          <a href="#" className="text-primary font-semibold">{t('services')}</a>
          <a href="#" className="text-primary font-semibold">{t('activities')}</a>
          <a href="#" className="text-primary font-semibold">{t('hut')}</a>
          <div className="flex items-center gap-4">
            <button onClick={() => setLocale(locale === 'sk' ? 'en' : 'sk')} className="bg-gray-200 px-3 py-1 rounded">{locale === 'sk' ? 'EN' : 'SK'}</button>
          </div>
          <a href="#/res" className="bg-secondary text-white px-6 py-3 rounded font-bold text-center uppercase">
            {t('reserve')}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;