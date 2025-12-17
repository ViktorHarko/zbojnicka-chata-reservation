import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { Layout } from '../components/layout';
import { BookingState, BookingStep, Room } from '../types';
import { MOCK_ROOMS } from '../constants';
import { getNights } from '../utils';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight, 
  Users, 
  BedDouble, 
  Wifi, 
  Signal, 
  Tv, 
  ArrowUpRight,
  CreditCard,
  User,
  CheckCircle,
  TrendingUp,
  Smartphone
} from 'lucide-react';

const Booking: React.FC = () => {
  const [booking, setBooking] = useState<BookingState>({
    step: BookingStep.SEARCH, // Start at search since we come from Res page
    dateFrom: new Date(2023, 4, 1), // Fixed date for demo: May 1
    dateTo: new Date(2023, 4, 3), // Fixed date for demo: May 3
    people: 1,
    beds: 1,
    selectedRoom: null,
    guest: { name: '', surname: '', phone: '', email: '' }
  });
  const nextStep = () => setBooking(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setBooking(prev => ({ ...prev, step: Math.max(BookingStep.SEARCH, prev.step - 1) }));
  
  const selectRoom = (room: Room) => {
    setBooking(prev => ({ ...prev, selectedRoom: room, step: BookingStep.DETAILS }));
  };

  const updateGuest = (field: keyof typeof booking.guest, value: string) => {
    setBooking(prev => ({ ...prev, guest: { ...prev.guest, [field]: value } }));
  };

  const getStepContent = () => {
    switch(booking.step) {
      case BookingStep.PRE_AUTH:
        // Kept for backward compatibility if needed, but not used by default
        return <PreAuthStep onNext={() => setBooking(p => ({ ...p, step: BookingStep.SEARCH }))} />;
      case BookingStep.SEARCH:
        return <SearchStep booking={booking} setBooking={setBooking} onSelectRoom={selectRoom} />;
      case BookingStep.DETAILS:
        return <DetailsStep booking={booking} onNext={nextStep} onBack={() => setBooking(p => ({...p, step: BookingStep.SEARCH}))} />;
      case BookingStep.CONTACT:
        return <ContactStep booking={booking} updateGuest={updateGuest} onNext={nextStep} onBack={prevStep} />;
      case BookingStep.PAYMENT:
        return <PaymentStep booking={booking} onNext={nextStep} onBack={prevStep} />;
      case BookingStep.SUCCESS:
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-beige">
      <main className="flex-grow flex flex-col">
        {getStepContent()}
      </main>
    </div>
  );
};

// ---------------- SUB COMPONENTS ---------------- //

// STEP 0: PRE-AUTH
const PreAuthStep = ({ onNext }: { onNext: () => void }) => (
  <div className="flex-grow flex flex-col items-center justify-center p-6 bg-beige relative overflow-hidden min-h-[600px]">
    <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <div>
        <h1 className="text-4xl font-bold mb-4 uppercase text-black">{t('online_booking')}</h1>
        <div className="w-20 h-1 bg-accent mb-12"></div>

        <div className="space-y-6">
          <button onClick={() => window.location.hash = '#/auth'} className="block w-full md:w-auto px-10 py-4 bg-secondary text-white font-bold text-lg rounded shadow-lg hover:bg-red-800 transition-colors uppercase tracking-wide">
            {t('register')} / {t('login')}
          </button>
          
          <button 
            onClick={onNext}
            className="block w-full md:w-auto px-10 py-4 bg-secondary text-white font-bold text-lg rounded shadow-lg hover:bg-red-800 transition-colors uppercase tracking-wide">
            {t('book_room_no_account')}
          </button>
        </div>
      </div>
      
      <div className="relative h-[450px] w-full flex justify-center md:block">
         {/* Top Right Circle */}
         <div className="absolute top-0 right-10 md:right-12 w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl z-10">
            <img src="https://picsum.photos/id/1018/400/400" className="w-full h-full object-cover" alt="Hiking" />
         </div>
         {/* Bottom Left Circle */}
         <div className="absolute bottom-10 left-10 md:left-20 w-72 h-72 rounded-full overflow-hidden border-4 border-white shadow-xl z-20">
            <img src="https://picsum.photos/id/1015/400/400" className="w-full h-full object-cover" alt="View" />
         </div>
      </div>
    </div>
  </div>
);

// STEP 1 & 2: SEARCH
const SearchStep = ({ booking, setBooking, onSelectRoom }: { booking: BookingState, setBooking: React.Dispatch<React.SetStateAction<BookingState>>, onSelectRoom: (r: Room) => void }) => {
  const [selectingEnd, setSelectingEnd] = useState(false);
  const { t } = useI18n();

  const handleDateClick = (day: number) => {
    // For demo we use May 2023
    const clicked = new Date(2023, 4, day);

    if (!selectingEnd) {
      // Start date selected
      setBooking(prev => ({ ...prev, dateFrom: clicked, dateTo: clicked }));
      setSelectingEnd(true);
    } else {
      // End date selected
      if (clicked >= booking.dateFrom) {
        setBooking(prev => ({ ...prev, dateTo: clicked }));
      } else {
        // If clicked before start, swap
        setBooking(prev => ({ ...prev, dateFrom: clicked, dateTo: prev.dateFrom }));
      }
      setSelectingEnd(false);
    }
  };

  const isDateInRange = (day: number) => {
    const d = new Date(2023, 4, day);
    return d >= booking.dateFrom && d <= booking.dateTo;
  };

  const isDateStart = (day: number) => day === booking.dateFrom.getDate();
  const isDateEnd = (day: number) => day === booking.dateTo.getDate();

  return (
    <div className="flex flex-col lg:flex-row flex-grow min-h-[600px]">
      {/* Left Sidebar: Results */}
      <div className="bg-primary text-white w-full lg:w-1/3 p-8 flex flex-col">
        <h2 className="text-3xl font-bold mb-8">{t('available_rooms')}</h2>
        
        {/* Room List */}
        <div className="flex-grow space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          {MOCK_ROOMS.filter(room => (
            // only show rooms that meet capacity and hide the shared dorm (id=1) for small groups
            room.capacity >= booking.people && !(room.id === 1 && booking.people < 6)
          )).map(room => (
            <div 
              key={room.id} 
              onClick={() => onSelectRoom(room)}
              className="bg-beige text-primary rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all group border-0"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-tr-lg">
                   {room.price} € / noc
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-lg leading-tight">{room.name}</h3>
                </div>
                
                <div className="flex gap-4 text-sm mb-4 font-bold text-gray-700">
                   <div className="flex items-center gap-1.5"><Users size={16} className="text-secondary"/> {room.capacity}</div>
                   <div className="flex items-center gap-1.5"><BedDouble size={16} className="text-secondary"/> {room.beds}</div>
                </div>

                <div className="flex gap-3 text-primary opacity-60">
                   {room.amenities.includes('wifi') && <Wifi size={16} />}
                   {room.amenities.includes('signal') && <Signal size={16} />}
                   {room.amenities.includes('tv') && <Tv size={16} />}
                   {room.amenities.includes('stairs') && <TrendingUp size={16} />}
                </div>
              </div>
            </div>
          ))}
           <p className="text-sm opacity-70 mt-4 leading-relaxed p-2">{t('select_help')}</p>
        </div>
      </div>

      {/* Right Content: Filters */}
      <div className="bg-beige w-full lg:w-2/3 p-8 md:p-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Calendar Section */}
          <div>
            <h3 className="text-3xl font-bold text-primary mb-6">{t('select_date')}</h3>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
               <div className="flex justify-between items-center mb-6">
                 <h4 className="font-bold text-xl text-primary">{t('may_2023')}</h4>
                 <div className="flex gap-2 text-primary">
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20}/></button>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20}/></button>
                 </div>
               </div>
               
               <div className="grid grid-cols-7 text-center text-xs mb-4 font-bold text-gray-400 uppercase tracking-wider">
                  <div>{t('day_mo')}</div><div>{t('day_tu')}</div><div>{t('day_we')}</div><div>{t('day_th')}</div><div>{t('day_fr')}</div><div>{t('day_sa')}</div><div>{t('day_su')}</div>
               </div>
               
               <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center text-sm font-medium">
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const isStart = isDateStart(day);
                    const isEnd = isDateEnd(day);
                    const isRange = isDateInRange(day);
                    const isPast = false; 
                    return (
                      <div 
                        key={i}
                        onClick={() => !isPast && handleDateClick(day)} 
                        className={`
                          w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all mx-auto font-bold
                          ${isStart || isEnd ? 'bg-primary text-white shadow-md transform scale-110' : isRange ? 'bg-primary bg-opacity-40 text-primary' : 'text-gray-700 hover:bg-gray-100'}
                          ${isPast ? 'text-gray-300 pointer-events-none' : ''}
                        `}
                      >
                        {day}
                      </div>
                    )
                  })}
                  {[1,2,3,4].map(d => <div key={`next-${d}`} className="text-gray-200">{d}</div>)}
               </div>
              <div className="text-center mt-4 text-sm font-bold text-primary">
                {selectingEnd ? t('select_end') : t('select_start')}
              </div>
               <div className="text-center mt-2 text-lg font-bold text-primary">
                  {booking.dateFrom.getDate()}. - {booking.dateTo.getDate()}. {t('month_may')}
               </div>
            </div>
          </div>

          {/* Controls Section */}
          <div>
            <h3 className="text-3xl font-bold text-primary mb-6">{t('select_other_info')}</h3>
            
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center h-24">
                  <span className="font-bold text-lg text-primary">{t('people')}</span>
                 <div className="flex items-center gap-4 font-bold text-xl text-primary">
                    <button 
                      onClick={() => setBooking(prev => ({...prev, people: Math.max(1, prev.people - 1)}))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <span className="w-6 text-center">{booking.people}</span>
                    <button 
                      onClick={() => setBooking(prev => ({...prev, people: prev.people + 1}))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                 </div>
              </div>

                <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center h-24">
                  <span className="font-bold text-lg text-primary">{t('beds')}</span>
                 <div className="flex items-center gap-4 font-bold text-xl text-primary">
                    <button 
                      onClick={() => setBooking(prev => ({...prev, beds: Math.max(1, prev.beds - 1)}))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <span className="w-6 text-center">{booking.beds}</span>
                    <button 
                      onClick={() => setBooking(prev => ({...prev, beds: prev.beds + 1}))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// HELPER: Summary Card for Steps 3-6
const SummarySidebar = ({ booking }: { booking: BookingState }) => {
  const { t } = useI18n();
  return (
  <div className="bg-beige border-4 border-primary rounded-xl p-8 h-full min-h-[400px]">
    <h3 className="text-2xl font-bold text-primary mb-6">{t('date_label')} {booking.dateFrom.getDate()}. - {booking.dateTo.getDate()}. {t('month_may')}</h3>
     <div className="space-y-6 text-primary">
       {/* Price summary */}
       <div className="flex items-center justify-between text-lg font-bold border-b border-gray-300 pb-4">
         <span>{t('price_per_night')}:</span>
         <span>{booking.selectedRoom ? booking.selectedRoom.price : 0} €</span>
       </div>
       <div className="flex items-center justify-between text-lg font-bold border-b border-gray-300 pb-4">
         <span>{t('nights')}:</span>
         <span>{getNights(booking.dateFrom, booking.dateTo)}</span>
       </div>
       <div className="flex items-center justify-between text-xl font-extrabold pt-4">
         <span>{t('total')}:</span>
         <span>{booking.selectedRoom ? (booking.selectedRoom.price * getNights(booking.dateFrom, booking.dateTo)) : 0} €</span>
       </div>
       <div className="flex items-center gap-3 text-xl font-bold border-b border-gray-300 pb-4">
          <Users size={24} className="text-secondary"/> 
          <span>{booking.selectedRoom?.capacity || booking.people} Osôb</span>
       </div>
       <div className="flex items-center gap-3 text-xl font-bold border-b border-gray-300 pb-4">
          <BedDouble size={24} className="text-secondary"/> 
          <span>{booking.selectedRoom?.beds || booking.beds} Lôžok</span>
       </div>
       
       <div className="pt-2 space-y-4 opacity-80">
          <div className="flex items-center gap-3 text-lg font-bold"><Wifi size={20}/> WI-FI</div>
          <div className="flex items-center gap-3 text-lg font-bold"><Signal size={20}/> LTE</div>
          <div className="flex items-center gap-3 text-lg font-bold"><TrendingUp size={20}/> Stairs</div>
          <div className="flex items-center gap-3 text-lg font-bold"><Tv size={20}/> TV</div>
       </div>
    </div>
  </div>
  );
};

// STEP 3: DETAILS
const DetailsStep = ({ booking, onNext, onBack }: { booking: BookingState, onNext: () => void, onBack: () => void }) => {
  const { t } = useI18n();
  
  if (!booking.selectedRoom) {
    return (
      <div className="flex-grow flex items-center justify-center bg-beige">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">{t('loading')}</h2>
          <button 
            onClick={onBack} 
            className="bg-primary text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md mx-auto"
          >
            <ChevronLeft size={20}/> {t('back_to_selection')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <button onClick={onBack} className="bg-primary text-white px-6 py-2 rounded-full font-bold mb-6 flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md">
         <ChevronLeft size={20}/> {t('back')}
      </button>

      <div className="grid md:grid-cols-12 gap-8">
         {/* Sidebar Summary */}
         <div className="md:col-span-5">
            <SummarySidebar booking={booking} />
         </div>

         {/* Main Content */}
         <div className="md:col-span-7 space-y-8">
            {/* Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               <img src={booking.selectedRoom.image} className="rounded-xl w-full h-64 object-cover col-span-2 shadow-md" alt="Room Main" />
               <img src="https://picsum.photos/id/238/400/300" className="rounded-xl w-full h-64 object-cover shadow-md" alt="Detail 1" />
            </div>

            {/* Content Box with thick border */}
            <div className="grid lg:grid-cols-2 gap-8 bg-surface p-8 rounded-xl border-4 border-primary shadow-sm relative">
               <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <User size={100} />
               </div>

               {/* Description */}
               <div className="pt-4 md:pt-0 relative z-10">
                  <h3 className="text-2xl font-bold text-primary mb-4">{t('description')}</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                     {t('room_desc')}
                  </p>
               </div>

               {/* Activities Nearby */}
               <div className="pt-4 md:pt-0 relative z-10">
                  <h3 className="text-2xl font-bold text-primary mb-4">{t('activities_nearby')}</h3>
                  <div className="space-y-4">
                     <div>
                        <h4 className="font-bold text-primary flex items-center gap-2"><TrendingUp size={16}/> {t('hiking')}</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 font-medium pl-1">
                            <li>{t('hiking_desc')}</li>
                        </ul>
                     </div>
                     <div>
                        <h4 className="font-bold text-primary flex items-center gap-2"><ArrowUpRight size={16}/> {t('ski_alpinism')}</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 font-medium pl-1">
                            <li>{t('ski_alpinism_desc')}</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-end">
            <button onClick={onNext} className="bg-primary text-white text-xl font-bold px-10 py-4 rounded hover:bg-teal-900 transition-colors flex items-center gap-3 shadow-lg group">
              {t('reserve')} <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
         </div>
      </div>
    </div>
  );
};

// STEP 4: CONTACT FORM
const ContactStep = ({ booking, updateGuest, onNext, onBack }: { booking: BookingState, updateGuest: (f: any, v: string) => void, onNext: () => void, onBack: () => void }) => {
  const { t } = useI18n();
  return (
  <div className="container mx-auto px-6 py-8">
    <button onClick={onBack} className="bg-primary text-white px-6 py-2 rounded-full font-bold mb-6 flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md">
         <ChevronLeft size={20}/> {t('back_button')}
    </button>
    
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-4xl font-bold text-primary mb-4">{t('contact_form_title')}</h2>
      <div className="bg-gray-200 px-6 py-4 rounded-lg text-center max-w-2xl text-sm text-gray-700 font-medium border border-gray-300">
         {t('contact_desc')}
      </div>
    </div>

    <div className="grid md:grid-cols-12 gap-8">
      <div className="md:col-span-5">
        <SummarySidebar booking={booking} />
      </div>

      <div className="md:col-span-7 flex flex-col items-center justify-center">
         <div className="w-full max-w-md space-y-5">
            <input 
              type="text" 
              placeholder="Meno"
              value={booking.guest.name}
              onChange={(e) => updateGuest('name', e.target.value)}
              className="w-full border-4 border-primary rounded-xl p-4 text-xl font-bold placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors"
            />
             <input 
              type="text" 
              placeholder="Priezvisko"
              value={booking.guest.surname}
              onChange={(e) => updateGuest('surname', e.target.value)}
              className="w-full border-4 border-primary rounded-xl p-4 text-xl font-bold placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors"
            />
             <input 
              type="text" 
              placeholder="Telefónne číslo"
              value={booking.guest.phone}
              onChange={(e) => updateGuest('phone', e.target.value)}
              className="w-full border-4 border-primary rounded-xl p-4 text-xl font-bold placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors"
            />
             <input 
              type="email" 
              placeholder="E-Mail"
              value={booking.guest.email}
              onChange={(e) => updateGuest('email', e.target.value)}
              className="w-full border-4 border-primary rounded-xl p-4 text-xl font-bold placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors"
            />
            
            <button onClick={onNext} className="w-full bg-primary text-white text-xl font-bold px-8 py-4 rounded-full hover:bg-teal-900 transition-colors flex items-center justify-center gap-2 mt-8 shadow-lg group">
               {t('pay')} <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </div>
    </div>
  </div>
  );
};

// STEP 5: PAYMENT
const PaymentStep = ({ booking, onNext, onBack }: { booking: BookingState, onNext: () => void, onBack: () => void }) => {
  const { t } = useI18n();
  return (
  <div className="container mx-auto px-6 py-8">
    <button onClick={onBack} className="bg-primary text-white px-6 py-2 rounded-full font-bold mb-6 flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md">
         <ChevronLeft size={20}/> {t('back_button')}
    </button>
    
    <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">
       <h2 className="text-4xl font-bold text-primary text-center md:text-left">Platba:</h2>
       <h2 className="text-4xl font-bold text-primary text-center md:text-left">Suma:</h2>
    </div>

    <div className="grid md:grid-cols-12 gap-8">
      <div className="md:col-span-6">
        <SummarySidebar booking={booking} />
      </div>

      <div className="md:col-span-6">
         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Payment Method Selection */}
            <div className="flex flex-col gap-6">
               <div className="bg-gray-200 px-6 py-4 rounded-lg text-sm text-gray-700 font-medium border border-gray-300">
                  Vyberte si nižšie spôsob platby za rezerváciu
               </div>

               {/* Credit Card Form Mockup */}
               <div className="space-y-6 mt-2">
                  <div className="relative">
                     <label className="bg-beige px-2 absolute -top-3 left-4 font-bold text-sm text-primary">{t('card_number')}</label>
                     <div className="w-full border-4 border-primary rounded-xl p-4 flex items-center gap-2 bg-white">
                        <CreditCard className="text-primary"/>
                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="bg-transparent w-full outline-none font-bold text-xl placeholder-gray-300 tracking-wider"/>
                     </div>
                  </div>

                  <div className="relative">
                     <label className="bg-beige px-2 absolute -top-3 left-4 font-bold text-sm text-primary">Meno na karte</label>
                     <div className="w-full border-4 border-primary rounded-xl p-4 bg-white">
                        <input type="text" placeholder="Name on Card" className="bg-transparent w-full outline-none font-bold text-xl placeholder-gray-300"/>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="relative w-1/2">
                        <label className="bg-beige px-2 absolute -top-3 left-4 font-bold text-sm text-primary">Platnosť</label>
                        <div className="w-full border-4 border-primary rounded-xl p-4 bg-white">
                           <input type="text" placeholder="MM/YY" className="bg-transparent w-full outline-none font-bold text-xl placeholder-gray-300"/>
                        </div>
                     </div>
                     <div className="relative w-1/2">
                        <label className="bg-beige px-2 absolute -top-3 left-4 font-bold text-sm text-primary">CVV</label>
                        <div className="w-full border-4 border-primary rounded-xl p-4 bg-white">
                           <input type="text" placeholder="XXX" className="bg-transparent w-full outline-none font-bold text-xl placeholder-gray-300"/>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="text-center text-sm font-bold text-gray-500 my-2">alebo</div>

               <div className="flex justify-center gap-4">
                  <button className="border-2 border-black rounded px-8 py-3 flex items-center gap-2 font-bold hover:bg-gray-100 text-xl transition-colors bg-white">
                     <Smartphone size={24} /> Apple Pay
                  </button>
                  <button className="border-2 border-black rounded px-8 py-3 flex items-center gap-2 font-bold hover:bg-gray-100 text-xl transition-colors bg-white">
                     <Smartphone size={24} /> Google Pay
                  </button>
               </div>

              <button onClick={onNext} className="w-full bg-primary text-white text-xl font-bold px-8 py-4 rounded-full hover:bg-teal-900 transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg group">
                {t('pay')} <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Price Box */}
            <div className="order-first md:order-last">
               <div className="border-4 border-primary rounded-xl p-12 flex items-center justify-center h-full min-h-[200px] bg-beige shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary opacity-5 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-6xl font-bold text-primary">{booking.selectedRoom ? (booking.selectedRoom.price * getNights(booking.dateFrom, booking.dateTo)) : 0} €</div>
                    <div className="text-sm font-bold text-gray-600 mt-2">{getNights(booking.dateFrom, booking.dateTo)} nocí × {booking.selectedRoom ? booking.selectedRoom.price : 0} € / noc</div>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  </div>
  );
};

// STEP 6: SUCCESS
const SuccessStep = () => {
  const { t } = useI18n();
  return (
  <div className="container mx-auto px-6 py-8">
     <button onClick={() => window.location.reload()} className="bg-primary text-white px-6 py-2 rounded-full font-bold mb-6 flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md">
         <ChevronLeft size={20}/> {t('back_button')}
    </button>
    
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-4xl font-bold text-primary mb-2">{t('payment_success')}</h2>
    </div>

    <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8">
       <div className="border-4 border-primary rounded-xl p-8 bg-surface text-center w-full shadow-sm flex flex-col items-center">
          <CheckCircle size={64} className="text-secondary mb-6" />
          <p className="mb-4 text-gray-800 font-bold text-xl">Ďakujeme za vašu rezerváciu, tešíme sa na vás.</p>
          <p className="text-gray-600 text-sm max-w-sm">
            Všetky informácie o platbe a rezervácii boli zaslané na vašu e-mailovú adresu.
          </p>
       </div>

       <div className="border-4 border-primary rounded-xl p-8 bg-surface text-center w-full shadow-sm">
          <p className="text-gray-600 text-sm leading-relaxed font-medium">
            Môžete si u nás vytvoriť vlastný účet, aby ste si mohli prezerať svoje rezervácie, komunikovať s nami a dostávať špeciálne ponuky.
          </p>
       </div>

       <button onClick={() => window.location.hash = '#/auth'} className="bg-primary text-white text-xl font-bold px-12 py-4 rounded-full hover:bg-teal-900 transition-colors flex items-center justify-center gap-2 shadow-lg mt-4 group">
          {t('create_account')} <ChevronRight className="group-hover:translate-x-1 transition-transform" />
       </button>
    </div>
  </div>
  );
};

export default Booking;