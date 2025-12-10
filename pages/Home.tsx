import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useI18n } from '../i18n';

const Home: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white">
          <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-[500px] overflow-hidden">
               <img 
                src="https://picsum.photos/id/1036/800/800" 
                alt="Snowy Hut" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" dangerouslySetInnerHTML={{__html: t('welcome_title')}}>
              </h1>
              <div className="w-20 h-1 bg-accent mb-6"></div>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {t('home_desc')}
              </p>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="bg-beige py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 uppercase" dangerouslySetInnerHTML={{__html: t('year_round')}}>
                </h2>
                <div className="w-20 h-1 bg-accent mb-6"></div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {t('hiking_info')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('activities_info')}
                </p>
              </div>
              <div className="order-1 md:order-2 h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl">
                 <img 
                  src="https://picsum.photos/id/231/800/600" 
                  alt="Cozy Interior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;