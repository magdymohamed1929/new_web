import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.team': 'Team',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Get Started',
    
    // Hero Section
    'hero.title': 'Building Digital Excellence',
    'hero.subtitle': 'Transforming Ideas Into',
    'hero.highlight': 'Powerful Solutions',
    'hero.description': 'We are a team of passionate developers and designers creating innovative digital experiences that drive business growth and user engagement.',
    'hero.cta.primary': 'Start Your Project',
    'hero.cta.secondary': 'View Our Work',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'What We Offer',
    'services.description': 'Comprehensive digital solutions tailored to your business needs',
    'services.webDev.title': 'Web Development',
    'services.webDev.description': 'Custom websites and web applications built with modern technologies and best practices.',
    'services.mobileDev.title': 'Mobile Development',
    'services.mobileDev.description': 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    'services.uiux.title': 'UI/UX Design',
    'services.uiux.description': 'User-centered design solutions that combine aesthetics with functionality.',
    'services.consulting.title': 'Digital Consulting',
    'services.consulting.description': 'Strategic guidance to help you navigate the digital landscape and achieve your goals.',
    
    // Projects Section
    'projects.title': 'Our Projects',
    'projects.subtitle': 'Featured Work',
    'projects.description': 'Showcasing our latest and greatest digital creations',
    'projects.viewProject': 'View Project',
    'projects.viewCode': 'View Code',
    
    // About Section
    'about.title': 'About Us',
    'about.subtitle': 'Our Story',
    'about.description': 'We are a passionate team of digital innovators dedicated to creating exceptional experiences that make a difference.',
    'about.story': 'Founded with a vision to bridge the gap between technology and human needs, we have been at the forefront of digital innovation. Our team combines technical expertise with creative thinking to deliver solutions that not only meet but exceed expectations.',
    'about.stats.projects': 'Projects Completed',
    'about.stats.clients': 'Happy Clients',
    'about.stats.experience': 'Years Experience',
    'about.stats.awards': 'Awards Won',
    'about.values.innovation': 'Innovation',
    'about.values.innovation.desc': 'We embrace cutting-edge technologies and creative approaches to solve complex problems.',
    'about.values.quality': 'Quality',
    'about.values.quality.desc': 'Every project is crafted with attention to detail and commitment to excellence.',
    'about.values.collaboration': 'Collaboration',
    'about.values.collaboration.desc': 'We work closely with our clients to ensure their vision becomes reality.',
    
    // Team Section
    'team.title': 'Our Team',
    'team.subtitle': 'Meet the Experts',
    'team.description': 'The talented individuals behind our success',
    
    // Testimonials Section
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Testimonials',
    'testimonials.description': 'Don\'t just take our word for it - hear from our satisfied clients',
    
    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Contact Us',
    'contact.description': 'Ready to start your next project? We\'d love to hear from you.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.namePlaceholder': 'Enter your full name',
    'contact.form.emailPlaceholder': 'Enter your email address',
    'contact.form.subjectPlaceholder': 'What is this about?',
    'contact.form.messagePlaceholder': 'Tell us about your project...',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.company': 'Digital Agency',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.tryAgain': 'Try Again',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.projects': 'المشاريع',
    'nav.about': 'من نحن',
    'nav.team': 'الفريق',
    'nav.testimonials': 'آراء العملاء',
    'nav.contact': 'تواصل معنا',
    'nav.getStarted': 'ابدأ الآن',
    
    // Hero Section
    'hero.title': 'بناء التميز الرقمي',
    'hero.subtitle': 'نحول الأفكار إلى',
    'hero.highlight': 'حلول قوية',
    'hero.description': 'نحن فريق من المطورين والمصممين المتحمسين نصنع تجارب رقمية مبتكرة تقود نمو الأعمال وتفاعل المستخدمين.',
    'hero.cta.primary': 'ابدأ مشروعك',
    'hero.cta.secondary': 'اطلع على أعمالنا',
    
    // Services Section
    'services.title': 'خدماتنا',
    'services.subtitle': 'ما نقدمه',
    'services.description': 'حلول رقمية شاملة مصممة خصيصاً لاحتياجات عملك',
    'services.webDev.title': 'تطوير المواقع',
    'services.webDev.description': 'مواقع وتطبيقات ويب مخصصة مبنية بأحدث التقنيات وأفضل الممارسات.',
    'services.mobileDev.title': 'تطوير التطبيقات',
    'services.mobileDev.description': 'تطبيقات محمولة أصلية ومتعددة المنصات تقدم تجارب مستخدم استثنائية.',
    'services.uiux.title': 'تصميم واجهات المستخدم',
    'services.uiux.description': 'حلول تصميم تركز على المستخدم تجمع بين الجماليات والوظائف.',
    'services.consulting.title': 'الاستشارات الرقمية',
    'services.consulting.description': 'إرشادات استراتيجية لمساعدتك في التنقل في المشهد الرقمي وتحقيق أهدافك.',
    
    // Projects Section
    'projects.title': 'مشاريعنا',
    'projects.subtitle': 'أعمال مميزة',
    'projects.description': 'عرض لأحدث وأفضل إبداعاتنا الرقمية',
    'projects.viewProject': 'عرض المشروع',
    'projects.viewCode': 'عرض الكود',
    
    // About Section
    'about.title': 'من نحن',
    'about.subtitle': 'قصتنا',
    'about.description': 'نحن فريق متحمس من المبدعين الرقميين مكرسون لخلق تجارب استثنائية تحدث فرقاً.',
    'about.story': 'تأسسنا برؤية سد الفجوة بين التكنولوجيا والاحتياجات البشرية، كنا في المقدمة من الابتكار الرقمي. يجمع فريقنا بين الخبرة التقنية والتفكير الإبداعي لتقديم حلول لا تلبي التوقعات فحسب بل تتجاوزها.',
    'about.stats.projects': 'مشروع مكتمل',
    'about.stats.clients': 'عميل سعيد',
    'about.stats.experience': 'سنوات خبرة',
    'about.stats.awards': 'جائزة مكتسبة',
    'about.values.innovation': 'الابتكار',
    'about.values.innovation.desc': 'نتبنى التقنيات المتطورة والأساليب الإبداعية لحل المشاكل المعقدة.',
    'about.values.quality': 'الجودة',
    'about.values.quality.desc': 'كل مشروع مصنوع بعناية بالتفاصيل والتزام بالتميز.',
    'about.values.collaboration': 'التعاون',
    'about.values.collaboration.desc': 'نعمل بشكل وثيق مع عملائنا لضمان تحقيق رؤيتهم.',
    
    // Team Section
    'team.title': 'فريقنا',
    'team.subtitle': 'تعرف على الخبراء',
    'team.description': 'الأفراد الموهوبون وراء نجاحنا',
    
    // Testimonials Section
    'testimonials.title': 'ماذا يقول عملاؤنا',
    'testimonials.subtitle': 'آراء العملاء',
    'testimonials.description': 'لا تأخذ كلامنا فقط - استمع من عملائنا الراضين',
    
    // Contact Section
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'اتصل بنا',
    'contact.description': 'مستعد لبدء مشروعك التالي؟ نحب أن نسمع منك.',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'عنوان البريد الإلكتروني',
    'contact.form.subject': 'الموضوع',
    'contact.form.message': 'الرسالة',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.form.namePlaceholder': 'أدخل اسمك الكامل',
    'contact.form.emailPlaceholder': 'أدخل عنوان بريدك الإلكتروني',
    'contact.form.subjectPlaceholder': 'ما هو موضوع الرسالة؟',
    'contact.form.messagePlaceholder': 'أخبرنا عن مشروعك...',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.company': 'الوكالة الرقمية',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.tryAgain': 'حاول مرة أخرى',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return String(translation || key);
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};