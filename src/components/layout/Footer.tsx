import React from 'react';
import { PARTNERS } from '../../constants';
import { Facebook, Instagram } from 'lucide-react';
import { useI18n } from '../../i18n';

const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
        
        {/* Left Column: Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 font-serif">{t('hut_name')}</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4 max-w-md">
            {t('hut_desc')}
          </p>
          <p className="text-sm text-gray-300 mb-6">
            {t('owners')}
          </p>
          <div className="flex gap-4">
             {/* Placeholder Stamps */}
             <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-center">
                JAMES
             </div>
             <div className="w-12 h-12 rounded-full bg-accent border-2 border-secondary flex items-center justify-center text-[10px] font-bold text-secondary text-center">
                KST
             </div>
          </div>
        </div>

        {/* Right Column: Partners */}
        <div>
          <h3 className="text-xl font-bold mb-4 font-serif">{t('partners')}</h3>
          <div className="grid grid-cols-2 gap-2 max-w-sm">
            {PARTNERS.map((partner, idx) => (
              <img key={idx} src={partner.logo} alt={partner.name} className="h-25 w-full object-cover rounded shadow-sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 mt-12 pt-6 border-t border-teal-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>{t('copyright')}</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Facebook className="hover:text-white cursor-pointer" size={16} />
          <Instagram className="hover:text-white cursor-pointer" size={16} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;