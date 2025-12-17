import React from 'react';
import { useI18n } from '../i18n';
import mountainsImage from '../assets/images/rooms/rez.jpg';
import hikersImage from '../assets/images/rooms/room2-1.png';
import snowImage from '../assets/images/rooms/6-12.jpg';

const Res: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="bg-beige font-sans">
      <main className="flex-grow">
        {/* Top Hero Section */}
        <section className="bg-primary text-white">
          <div className="grid lg:grid-cols-2 min-h-[450px]">
            {/* Image Left */}
            <div className="h-64 lg:h-auto relative">
              <img 
                src={mountainsImage} 
                alt="Mountains" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text Right */}
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold uppercase mb-6 leading-snug tracking-wide" dangerouslySetInnerHTML={{__html: t('year_round_stay')}}>
              </h1>
              <div className="w-24 h-1 bg-accent mb-8"></div>
              <p className="text-gray-200 mb-4 leading-relaxed max-w-lg text-sm lg:text-base">
                {t('evening_view')}
              </p>
              <p className="text-gray-200 leading-relaxed max-w-lg text-sm lg:text-base">
                {t('magical_morning')}
              </p>
            </div>
          </div>
        </section>

        {/* Booking Selection Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Title & Buttons */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold uppercase text-black mb-6">
                  {t('online_booking')}
                </h2>
                <div className="w-20 h-1 bg-accent mb-12"></div>
                
                <div className="flex flex-col gap-5 max-w-sm">
                  <button onClick={() => window.location.hash = '#/auth'} className="bg-secondary text-white text-lg font-bold py-4 px-8 rounded shadow-lg hover:bg-red-800 transition-colors uppercase text-left tracking-wide">
                    {t('register')} / {t('login')}
                  </button>
                  
                  <button 
                    onClick={() => window.location.hash = '#/booking'}
                    className="bg-secondary text-white text-lg font-bold py-4 px-8 rounded shadow-lg hover:bg-red-800 transition-colors uppercase text-left tracking-wide"
                  >
                    {t('book_with_account')}
                  </button>
                </div>
              </div>

              {/* Right: Overlapping Circles */}
              <div className="relative h-[350px] w-full flex items-center justify-center md:justify-end pr-0 md:pr-10">
                <div className="relative w-[320px] h-[300px] md:w-[400px]">
                    {/* Left Circle (Summer/Hikers) */}
                    <div className="absolute top-1/2 left-0 md:left-4 transform -translate-y-1/2 w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
                        <img src={hikersImage} className="w-full h-full object-cover" alt="Hikers" />
                    </div>

                    {/* Right Circle (Winter/Snow) */}
                    <div className="absolute top-1/2 right-0 md:right-4 transform -translate-y-1/2 w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white shadow-2xl z-20">
                         <img src={snowImage} className="w-full h-full object-cover" alt="Snow" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Res;