import React from 'react';
import { useI18n } from '../i18n';
import featureImage from '../assets/images/rooms/room3.jpeg';

const Home: React.FC = () => {
  const { t } = useI18n();

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary text-white">
          <div className="grid lg:grid-cols-2">
            <div className="h-64 lg:h-[500px] overflow-hidden">
               <img 
                src="https://zbojnickachata.sk/wp-content/uploads/2023/01/zbojnicka-zima-600x400.jpg" 
                alt="Snowy Hut" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight" dangerouslySetInnerHTML={{__html: t('welcome_title')}}>
              </h1>
              <div className="w-20 h-1 bg-accent mb-6"></div>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
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
                  src="https://zbojnickachata.sk/wp-content/uploads/2022/06/zbojnicka-jedalen.jpg"
                  alt="Cozy Interior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
  );
};

export default Home;