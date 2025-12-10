import React, { createContext, useContext, useState, ReactNode } from 'react';

type Locale = 'sk' | 'en';

const translations: Record<Locale, Record<string, string>> = {
  sk: {
    // Header
    services: 'Služby + Cenník',
    activities: 'Aktivity',
    hut: 'Chata',
    
    // Booking
    reserve: 'Rezervovať ubytovanie',
    available_rooms: 'Zoznam dostupných izieb',
    select_date: 'Vyberte si dátum',
    select_start: 'Vyberte dátum začiatku',
    select_end: 'Vyberte dátum konca',
    people: 'Počet ľudí:',
    beds: 'Počet lôžok:',
    date_label: 'Dátum:',
    nights: 'nocí',
    per_night: 'noc',
    price_per_night: 'Cena za noc:',
    total: 'Celkom:',
    pay: 'Zaplatiť',
    create_account: 'Vytvoriť účet',
    payment_success: 'Platba Úspešná',
    contact_form_title: 'Kontaktný formulár:',
    book_room_no_account: 'Rezervovať ubytovanie bez účtu',
    select_help: 'Vyberte dátum a počet osôb na pravej strane, aby ste videli zoznam dostupných izieb podľa vašich požiadaviek.',
    loading: 'Nahráva sa...',
    back: 'Späť',
    
    // Auth
    login: 'Prihlásenie',
    register: 'Registrácia',
    login_desc: 'Zadajte svoje prihlasovacie údaje',
    register_desc: 'Vyplňte formulár na vytvorenie účtu',
    name: 'Meno',
    name_placeholder: 'Vaše meno',
    surname: 'Priezvisko',
    surname_placeholder: 'Vaše priezvisko',
    password: 'Heslo',
    password_min: 'Minimálne 6 znakov',
    confirm_password: 'Potvrdiť heslo',
    confirm_password_placeholder: 'Zopakujte heslo',
    login_btn: 'Prihlásiť sa',
    register_btn: 'Zaregistrovať sa',
    no_account: 'Nemáte účet? ',
    have_account: 'Už máte účet? ',
    login_success: 'Prihlásenie úspešné! (v príprave)',
    register_success: 'Registrácia úspešná! (v príprave)',
    password_mismatch: 'Heslá sa nezhodujú!',
    info_title: 'Dôležité:',
    info_desc: 'Vytvorením účtu si budete môcť rýchlejšie rezervovať miestnosti a prezerať si históriu vašich rezervácií.',

    // Home Page
    welcome_title: 'VITAJTE NA<br />ZBOJNÍCKEJ CHATE',
    home_desc: 'Nachádza sa vo Veľkej Studenej doline, ktorá je vo Vysokých Tatrách výnimočná najväčším počtom plies (26) rôznych veľkostí a charakterov, a je bohatá na tatranskú faunu i flóru. Je tu nespočetné množstvo turistických, horolezeckých, skialpinistických a prírodovedeckých aktivít. Chata má strategické miesto aj pre tých, ktorí plánujú viacdňové prechody Vysokými Tatrami.',
    year_round: 'CELOROČNÉ UBYTOVANIE:<br />ZAŽITE TATRY V KAŽDOM OBDOBÍ',
    hiking_info: 'Turistický chodník Vás ku nám privedie krásnou Veľkou Studenou dolinou z Hrebienka (2-2,5 h), na ktorý sa môžete vyviesť zubačkou zo Starého Smokovca. Tí zdatnejší môžu začať už v Smokovci (30min na viac). Pre iné prístupové trasy kliknite nižšie.',
    activities_info: 'Veľká Studená dolina ponúka množstvo aktivít v lete aj v zime – turistika, skialpinizmus, horolezectvo, a obdivovanie zvierat a rastlín. Sme si istí, že nudiť sa nebudete ani po dvoch dňoch.',

    // Res Page
    year_round_stay: 'Celoročné ubytovanie:<br/>Zažite Tatry v každom období',
    evening_view: 'Večerný výhľad na Veľkú studenú dolinu je očarujúci v každom ročnom období.',
    magical_morning: 'Rovnako magické je aj byť prvým dobrodruhom v doline pod lúčmi preberajúceho sa slnka.',
    online_booking: 'Online rezervácie',
    book_with_account: 'Rezervovať ubytovanie bez uctu',

    // Details Page
    description: 'Popis:',
    room_desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    activities_nearby: 'Aktivity v okolí:',
    hiking: 'Vysokohorská turistika',
    hiking_desc: 'Priamy prístup k náročným trasám.',
    ski_alpinism: 'Skialpinizmus',
    ski_alpinism_desc: 'Ideálny východiskový bod pre zimu.',

    // Contact Form
    contact_desc: 'Vzhľadom na to, že nemáte účet, prosíme vás, aby ste vyplnili kontaktné údaje nižšie, aby sme vás mohli zaregistrovať do nášho systému a vy ste mohli zaplatiť rezerváciu.',
    contact_name_placeholder: 'Meno',
    contact_surname_placeholder: 'Priezvisko',
    contact_phone_placeholder: 'Telefónne číslo',
    contact_email_placeholder: 'E-Mail',

    // Payment
    payment_title: 'Platba:',
    payment_amount: 'Suma:',
    card_number: 'Číslo karty',
    select_other_info: 'Vyberte ďalšie informácie',
    may_2023: 'Máj 2023',

    // Footer
    hut_name: 'Zbojnícka chata',
    hut_desc: 'Zbojnícka má celoročnú prevádzku. Nachádza sa v nadmorskej výške 1960m vo Veľkej Studenej doline a vedenie na ňu niekoľko prístupových trás.',
    owners: 'Majiteľmi chaty sú:',
    partners: 'Partneri',
    copyright: 'Copyright © 2023 | All Rights Reserved | Zbojnícka chata',

    // Details back button
    back_to_selection: 'Späť na výber',

    // Month names
    month_may: 'mája',
    month_june: 'júna',
    month_july: 'júla',
    month_august: 'augusta',

    // Day abbreviations
    day_mo: 'Mo',
    day_tu: 'Tu',
    day_we: 'We',
    day_th: 'Th',
    day_fr: 'Fr',
    day_sa: 'Sa',
    day_su: 'Su',

    // Error message
    error_no_room: 'Späť na výber',

    // Back button
    back_button: 'Späť',

    // Night text
    nights_text: 'nocí × {price} € / noc'
  },
  en: {
    // Header
    services: 'Services + Prices',
    activities: 'Activities',
    hut: 'Hut',
    
    // Booking
    reserve: 'Book accommodation',
    available_rooms: 'Available rooms',
    select_date: 'Choose a date',
    select_start: 'Select start date',
    select_end: 'Select end date',
    people: 'Number of people:',
    beds: 'Number of beds:',
    date_label: 'Date:',
    nights: 'nights',
    per_night: 'night',
    price_per_night: 'Price per night:',
    total: 'Total:',
    pay: 'Pay',
    create_account: 'Create account',
    payment_success: 'Payment Successful',
    contact_form_title: 'Contact form:',
    book_room_no_account: 'Book without account',
    select_help: 'Select a date and number of people on the right to see available rooms.',
    loading: 'Loading...',
    back: 'Back',
    
    // Auth
    login: 'Login',
    register: 'Register',
    login_desc: 'Enter your login credentials',
    register_desc: 'Fill out the form to create an account',
    name: 'Name',
    name_placeholder: 'Your name',
    surname: 'Surname',
    surname_placeholder: 'Your surname',
    password: 'Password',
    password_min: 'Minimum 6 characters',
    confirm_password: 'Confirm password',
    confirm_password_placeholder: 'Repeat password',
    login_btn: 'Sign In',
    register_btn: 'Sign Up',
    no_account: 'Don\'t have an account? ',
    have_account: 'Already have an account? ',
    login_success: 'Login successful! (in development)',
    register_success: 'Registration successful! (in development)',
    password_mismatch: 'Passwords do not match!',
    info_title: 'Important:',
    info_desc: 'Create an account to book rooms faster and view your reservation history.',

    // Home Page
    welcome_title: 'WELCOME TO<br />ZBOJNÍCKA HUT',
    home_desc: 'Located in Veľká Studená Valley, which is exceptional in the High Tatras for having the largest number of plies (26) of various sizes and characters, and is rich in Tatra fauna and flora. There are countless hiking, mountaineering, ski mountaineering and nature study activities. The hut is in a strategic location for those planning multi-day High Tatras traverses.',
    year_round: 'YEAR-ROUND ACCOMMODATION:<br />EXPERIENCE THE TATRAS IN EVERY SEASON',
    hiking_info: 'The hiking trail will take you to us through the beautiful Veľká Studená Valley from Hrebienka (2-2.5 hours), which you can reach by cogwheel railway from Starý Smokovec. More experienced hikers can start in Smokovec (30+ minutes). For other access routes click below.',
    activities_info: 'Veľká Studená Valley offers plenty of activities in summer and winter – hiking, ski mountaineering, mountaineering, and wildlife and plant observation. We\'re sure you won\'t be bored even after two days.',

    // Res Page
    year_round_stay: 'Year-round accommodation:<br/>Experience the Tatras in every season',
    evening_view: 'The evening view of Veľká Studená Valley is enchanting in every season.',
    magical_morning: 'It\'s equally magical to be the first adventurer in the valley under the rays of the rising sun.',
    online_booking: 'Online Booking',
    book_with_account: 'Book without account',

    // Details Page
    description: 'Description:',
    room_desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    activities_nearby: 'Nearby Activities:',
    hiking: 'High Mountain Hiking',
    hiking_desc: 'Direct access to challenging trails.',
    ski_alpinism: 'Ski Alpinism',
    ski_alpinism_desc: 'Ideal starting point for winter.',

    // Contact Form
    contact_desc: 'Since you don\'t have an account, please fill in your contact details below so we can register you in our system and you can pay for your reservation.',
    contact_name_placeholder: 'Name',
    contact_surname_placeholder: 'Surname',
    contact_phone_placeholder: 'Phone Number',
    contact_email_placeholder: 'Email',
    select_other_info: 'Select other info',
    hut_name: 'Zbojnícka Hut',
    hut_desc: 'Zbojnícka is open year-round. It is located at an altitude of 1960m in Veľká Studená Valley and has several access routes.',
    owners: 'Hut owners:',
    partners: 'Partners',
    copyright: 'Copyright © 2023 | All Rights Reserved | Zbojnícka Hut',

    // Details back button
    back_to_selection: 'Back to selection',

    // Month names
    month_may: 'May',
    month_june: 'June',
    month_july: 'July',
    month_august: 'August',

    // Day abbreviations
    day_mo: 'Mo',
    day_tu: 'Tu',
    day_we: 'We',
    day_th: 'Th',
    day_fr: 'Fr',
    day_sa: 'Sa',
    day_su: 'Su',

    // Error message
    error_no_room: 'Back to selection',

    // Back button
    back_button: 'Back',

    // Night text
    nights_text: 'nights × {price} € / night',

    // Footer
    hut_name: 'Zbojnícka Hut',
    hut_desc: 'Zbojnícka is open year-round. It is located at an altitude of 1960m in Veľká Studená Valley and has several access routes.',
    owners: 'Hut owners:',
    partners: 'Partners',
    copyright: 'Copyright © 2023 | All Rights Reserved | Zbojnícka Hut',

    // Details back button
    back_to_selection: 'Back to selection'
  }
};

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}>({
  locale: 'sk',
  setLocale: () => {},
  t: (k: string) => k
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('sk');
  const t = (key: string) => translations[locale][key] || key;
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);

export default I18nProvider;
