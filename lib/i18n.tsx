"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ── Supported languages ──────────────────────────────────────
export type LangCode = "en" | "hi" | "ta" | "te" | "mr" | "bn" | "kn" | "gu";

export interface Language {
  code: LangCode;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", label: "English",  nativeLabel: "English"    },
  { code: "hi", label: "Hindi",    nativeLabel: "हिन्दी"     },
  { code: "ta", label: "Tamil",    nativeLabel: "தமிழ்"      },
  { code: "te", label: "Telugu",   nativeLabel: "తెలుగు"     },
  { code: "mr", label: "Marathi",  nativeLabel: "मराठी"      },
  { code: "bn", label: "Bengali",  nativeLabel: "বাংলা"      },
  { code: "kn", label: "Kannada",  nativeLabel: "ಕನ್ನಡ"      },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી"   },
];

// ── Translation dictionary ───────────────────────────────────
export type TranslationKey = string;

const translations: Record<LangCode, Record<string, string>> = {
  en: {
    // Header & Nav
    "nav.home": "Home", "nav.about": "About Us", "nav.locate": "Locate Centre",
    "nav.pickup": "Pickup", "nav.contact": "Contact", "nav.services": "Services",
    "nav.login": "Login", "nav.register": "Register",
    "header.govt": "Government of India", "header.portal": "Official Portal",
    "header.tollFree": "Toll Free",

    // Hero
    "hero.badge.official": "Official Portal", "hero.badge.verified": "CPCB Authorized",
    "hero.title": "Responsible E-Waste Management for a Sustainable India",
    "hero.subtitle": "EcoRoute helps citizens responsibly dispose of electronic waste through AI-powered identification, doorstep pickup, and government-authorized recycling centers across the country.",
    "hero.cta.pickup": "Request Pickup", "hero.cta.locate": "Locate Recycling Center",
    "hero.trust.authorized": "Government Authorized", "hero.trust.security": "Data Secure · ISO 27001",
    "hero.trust.madeInIndia": "Made in India", "hero.stat.pickups": "12,500+ Pickups Done",
    "hero.stat.recycled": "28 Tons Recycled",

    // Trust Indicators
    "trust.1.title": "Government Authorized", "trust.1.sub": "Certified by MoEFCC & CPCB",
    "trust.2.title": "AI-Powered Classification", "trust.2.sub": "Instant device identification",
    "trust.3.title": "Authorized Recycling Network", "trust.3.sub": "350+ licensed partners",
    "trust.4.title": "Citizen-Friendly Platform", "trust.4.sub": "Available in 8 Indian languages",
    "trust.5.title": "Environment First", "trust.5.sub": "95% safe recycling rate",

    // How It Works
    "how.title": "How EcoRoute Works",
    "how.subtitle": "A simple five-step process to responsibly dispose of your electronic waste — from your doorstep to a certified recycling facility.",
    "how.step1.title": "Upload Device Photo", "how.step1.desc": "Take a clear photo of your electronic device and upload it through the EcoRoute portal.",
    "how.step2.title": "AI Identifies Category", "how.step2.desc": "Our AI engine analyses the image, identifies the device type, and classifies its hazard level.",
    "how.step3.title": "Schedule Pickup", "how.step3.desc": "Choose a convenient date and time for doorstep collection from your address.",
    "how.step4.title": "Authorised Collection", "how.step4.desc": "A trained EcoRoute field agent visits your address and safely collects the e-waste.",
    "how.step5.title": "Safe Recycling & Certificate", "how.step5.desc": "Processed at CPCB facility. Receive a digital recycling certificate.",

    // Marketplace
    "home.marketplace.title": "Live Scrap Marketplace",
    "home.marketplace.subtitle": "Browse available scrap listings from citizens and recyclers",
    "home.marketplace.search": "Search by device, brand, or city...",
    "home.marketplace.refresh": "Refresh", "home.marketplace.noItems": "No scrap items found",
    "home.marketplace.buyBid": "Buy / Bid", "home.marketplace.available": "Available",
    "home.marketplace.govReserved": "Gov Reserved", "home.marketplace.sold": "Sold",

    // Stats
    "stats.title": "National E-Waste Impact",
    "stats.subtitle": "Measuring our collective contribution towards a cleaner environment",
    "stats.recycled": "Tonnes Recycled", "stats.citizens": "Citizens Served",
    "stats.centres": "Authorized Centres", "stats.co2": "CO2 Saved (Tonnes)",

    // CTA & Footer
    "cta.title": "Ready to Dispose of Your E-Waste Responsibly?",
    "cta.subtitle": "Join thousands of citizens making India cleaner and greener.",
    "cta.pickup": "Schedule Doorstep Pickup", "cta.locate": "Find Nearest Collection Centre",
    "footer.tagline": "Official E-Waste Management Platform of Government of India",
    "footer.rights": "All rights reserved. Government of India.",
    "lang.select": "Select Language",
  },

  hi: {
    // Header & Nav
    "nav.home": "होम", "nav.about": "हमारे बारे में", "nav.locate": "केंद्र खोजें",
    "nav.pickup": "पिकअप", "nav.contact": "संपर्क", "nav.services": "सेवाएं",
    "nav.login": "लॉगिन", "nav.register": "पंजीकरण",
    "header.govt": "भारत सरकार", "header.portal": "आधिकारिक पोर्टल",
    "header.tollFree": "टोल फ्री",

    // Hero
    "hero.badge.official": "आधिकारिक पोर्टल", "hero.badge.verified": "CPCB प्रमाणित",
    "hero.title": "सतत भारत के लिए जिम्मेदार ई-अपशिष्ट प्रबंधन",
    "hero.subtitle": "EcoRoute नागरिकों को AI-आधारित पहचान, घर-घर पिकअप और देश भर में सरकार द्वारा अधिकृत पुनर्चक्रण केंद्रों के माध्यम से इलेक्ट्रॉनिक्स का सुरक्षित निपटान करने में मदद करता है।",
    "hero.cta.pickup": "पिकअप बुक करें", "hero.cta.locate": "पुनर्चक्रण केंद्र खोजें",
    "hero.trust.authorized": "सरकार द्वारा अधिकृत", "hero.trust.security": "डेटा सुरक्षित · ISO 27001",
    "hero.trust.madeInIndia": "मेक इन इंडिया", "hero.stat.pickups": "12,500+ पिकअप संपन्न",
    "hero.stat.recycled": "28 टन पुनर्चक्रित",

    // Trust Indicators
    "trust.1.title": "सरकार द्वारा अधिकृत", "trust.1.sub": "MoEFCC एवं CPCB द्वारा प्रमाणित",
    "trust.2.title": "AI-आधारित वर्गीकरण", "trust.2.sub": "त्वरित उपकरण पहचान",
    "trust.3.title": "अधिकृत पुनर्चक्रण नेटवर्क", "trust.3.sub": "350+ लाइसेंस प्राप्त भागीदार",
    "trust.4.title": "नागरिक-अनुकूल मंच", "trust.4.sub": "8 भारतीय भाषाओं में उपलब्ध",
    "trust.5.title": "पर्यावरण सर्वोपरि", "trust.5.sub": "95% सुरक्षित पुनर्चक्रण दर",

    // How It Works
    "how.title": "EcoRoute कैसे काम करता है",
    "how.subtitle": "आपके ई-कचरे का आपके दरवाजे से प्रमाणित रीसाइक्लिंग सुविधा तक सुरक्षित निपटान करने की आसान 5-चरणीय प्रक्रिया।",
    "how.step1.title": "उपकरण का फोटो अपलोड करें", "how.step1.desc": "अपने पुराने उपकरण की स्पष्ट तस्वीर लें और पोर्टल पर अपलोड करें।",
    "how.step2.title": "AI श्रेणी की पहचान करता है", "how.step2.desc": "हमारा AI इंजन उपकरण के प्रकार और जोखिम स्तर का विश्लेषण करता है।",
    "how.step3.title": "पिकअप शेड्यूल करें", "how.step3.desc": "अपने पते से घर-घर संग्रह के लिए सुविधाजनक तिथि और समय चुनें।",
    "how.step4.title": "अधिकृत संग्रह", "how.step4.desc": "EcoRoute का प्रशिक्षित एजेंट आपके पते पर आकर सुरक्षित संग्रह करता है।",
    "how.step5.title": "सुरक्षित रीसाइक्लिंग व प्रमाणपत्र", "how.step5.desc": "CPCB सुविधा में रीसायकल होने पर डिजिटल प्रमाणपत्र प्राप्त करें।",

    // Marketplace
    "home.marketplace.title": "लाइव स्क्रैप मार्केटप्लेस",
    "home.marketplace.subtitle": "नागरिकों और रीसायकलर्स की ई-कचरा लिस्टिंग देखें",
    "home.marketplace.search": "उपकरण, ब्रांड या शहर से खोजें...",
    "home.marketplace.refresh": "रीफ्रेश", "home.marketplace.noItems": "कोई स्क्रैप आइटम नहीं मिला",
    "home.marketplace.buyBid": "खरीदें / बोली लगाएं", "home.marketplace.available": "उपलब्ध",
    "home.marketplace.govReserved": "सरकार आरक्षित", "home.marketplace.sold": "बिक गया",

    // Stats
    "stats.title": "राष्ट्रीय ई-अपशिष्ट प्रभाव",
    "stats.subtitle": "स्वच्छ पर्यावरण की दिशा में हमारे सामूहिक योगदान का मापन",
    "stats.recycled": "टन पुनर्चक्रित", "stats.citizens": "लाभान्वित नागरिक",
    "stats.centres": "अधिकृत केंद्र", "stats.co2": "CO2 बचत (टन)",

    // CTA & Footer
    "cta.title": "अपने ई-कचरे का जिम्मेदार निपटान करने के लिए तैयार हैं?",
    "cta.subtitle": "भारत को स्वच्छ और हरा-भरा बनाने वाले हजारों नागरिकों से जुड़ें।",
    "cta.pickup": "डोरस्टेप पिकअप बुक करें", "cta.locate": "निकटतम संग्रह केंद्र खोजें",
    "footer.tagline": "भारत सरकार का आधिकारिक ई-अपशिष्ट प्रबंधन मंच",
    "footer.rights": "सर्वाधिकार सुरक्षित। भारत सरकार।",
    "lang.select": "भाषा चुनें",
  },

  ta: {
    // Header & Nav
    "nav.home": "முகப்பு", "nav.about": "எங்களை பற்றி", "nav.locate": "மையம் கண்டறி",
    "nav.pickup": "பிக்கப்", "nav.contact": "தொடர்பு", "nav.services": "சேவைகள்",
    "nav.login": "உள்நுழைவு", "nav.register": "பதிவு செய்",
    "header.govt": "இந்திய அரசு", "header.portal": "அதிகாரப்பூர்வ போர்டல்",
    "header.tollFree": "கட்டணமில்லா",

    // Hero
    "hero.badge.official": "அதிகாரப்பூர்வ போர்டல்", "hero.badge.verified": "CPCB அங்கீகரிக்கப்பட்டது",
    "hero.title": "நிலையான இந்தியாவுக்கான பொறுப்பான ஈ-கழிவு மேலாண்மை",
    "hero.subtitle": "EcoRoute செயற்கை நுண்ணறிவு அடையாளம்காணல், வீட்டுப் பிக்கப் மற்றும் அரசு அங்கீகரித்த மறுசுழற்சி மையங்கள் மூலம் பழைய மின்னணு கழிவுகளை பாதுகாப்பாக அகற்ற உதவுகிறது.",
    "hero.cta.pickup": "பிக்கப் பதிவு செய்", "hero.cta.locate": "மறுசுழற்சி மையம் கண்டறி",
    "hero.trust.authorized": "அரசு அங்கீகாரம் பெற்றது", "hero.trust.security": "தரவு பாதுகாப்பு · ISO 27001",
    "hero.trust.madeInIndia": "மேக் இன் இந்தியா", "hero.stat.pickups": "12,500+ பிக்கப்கள் நிறைவடைந்தன",
    "hero.stat.recycled": "28 டன்கள் மறுசுழற்சி செய்யப்பட்டது",

    // Trust Indicators
    "trust.1.title": "அரசு அங்கீகாரம் பெற்றது", "trust.1.sub": "MoEFCC மற்றும் CPCB சான்றளித்தது",
    "trust.2.title": "AI-சார்ந்த வகைப்பாடு", "trust.2.sub": "உடனடி சாதன அடையாளம்",
    "trust.3.title": "அங்கீகரிக்கப்பட்ட மறுசுழற்சி நெட்வொர்க்", "trust.3.sub": "350+ உரிமம் பெற்ற பங்காளிகள்",
    "trust.4.title": "குடிமக்களுக்கான எளிய தளம்", "trust.4.sub": "8 இந்திய மொழிகளில் கிடைக்கிறது",
    "trust.5.title": "சுற்றுச்சூழலுக்கு முதலிடம்", "trust.5.sub": "95% பாதுகாப்பான மறுசுழற்சி விகிதம்",

    // How It Works
    "how.title": "EcoRoute எப்படி செயல்படுகிறது",
    "how.subtitle": "உங்கள் வீட்டு வாசலில் இருந்து அங்கீகரிக்கப்பட்ட மறுசுழற்சி மையம் வரை மின்னணுக் கழிவுகளை அகற்றுவதற்கான எளிய 5 படிகள்.",
    "how.step1.title": "சாதன புகைப்படத்தை பதிவேற்றுங்கள்", "how.step1.desc": "உங்கள் சாதனத்தின் தெளிவான புகைப்படத்தை எடுத்து தளத்தில் பதிவேற்றுங்கள்.",
    "how.step2.title": "AI வகையை கண்டறியும்", "how.step2.desc": "எங்கள் AI பொறி சாதனத்தின் வகை மற்றும் அபாய அளவை பகுப்பாய்வு செய்யும்.",
    "how.step3.title": "பிக்கப் நேரத்தை தேர்வு செய்", "how.step3.desc": "உங்கள் முகவரியில் பிக்கப் செய்ய உகந்த நாள் மற்றும் நேரத்தை தேர்வு செய்யுங்கள்.",
    "how.step4.title": "அங்கீகரிக்கப்பட்ட சேகரிப்பு", "how.step4.desc": "EcoRoute முகவர் உங்கள் முகவரிக்கு வந்து பாதுகாப்பாக கழிவுகளை சேகரிப்பார்.",
    "how.step5.title": "பாதுகாப்பான மறுசுழற்சி & சான்றிதழ்", "how.step5.desc": "CPCB மையத்தில் மறுசுழற்சி செய்யப்பட்டு டிஜிட்டல் சான்றிதழ் வழங்கப்படும்.",

    // Marketplace
    "home.marketplace.title": "நேரடி ஸ்கிராப் சந்தை",
    "home.marketplace.subtitle": "குடிமக்கள் மற்றும் மறுசுழற்சியாளர்களின் ஈ-கழிவு பட்டியல்களை உலாவுங்கள்",
    "home.marketplace.search": "சாதனம், பிராண்ட் அல்லது நகரம் தேடுங்கள்...",
    "home.marketplace.refresh": "புதுப்பி", "home.marketplace.noItems": "ஸ்கிராப் பொருட்கள் எதுவும் கிடைக்கவில்லை",
    "home.marketplace.buyBid": "வாங்கு / ஏலம்", "home.marketplace.available": "கிடைக்கிறது",
    "home.marketplace.govReserved": "அரசு ஒதுக்கீடு", "home.marketplace.sold": "விற்கப்பட்டது",

    // Stats
    "stats.title": "தேசிய ஈ-கழிவு தாக்கம்",
    "stats.subtitle": "சுத்தமான சூழலை உருவாக்க நமது கூட்டு பங்களிப்பின் அளவீடு",
    "stats.recycled": "டன்கள் மறுசுழற்சி", "stats.citizens": "பயனடைந்த குடிமக்கள்",
    "stats.centres": "அங்கீகரிக்கப்பட்ட மையங்கள்", "stats.co2": "CO2 சேமிப்பு (டன்கள்)",

    // CTA & Footer
    "cta.title": "உங்கள் ஈ-கழிவுகளை பாதுகாப்பாக அகற்ற தயாரா?",
    "cta.subtitle": "இந்தியாவை தூய்மையாகவும் பசுமையாகவும் மாற்றும் ஆயிரக்கணக்கான குடிமக்களுடன் இணையுங்கள்.",
    "cta.pickup": "வீட்டுப் பிக்கப் பதிவு செய்", "cta.locate": "அருகிலுள்ள மையம் கண்டறி",
    "footer.tagline": "இந்திய அரசின் அதிகாரப்பூர்வ ஈ-கழிவு மேலாண்மை தளம்",
    "footer.rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. இந்திய அரசு.",
    "lang.select": "மொழி தேர்வு",
  },

  te: {
    "nav.home": "హోమ్", "nav.about": "మా గురించి", "nav.locate": "కేంద్రాన్ని కనుగొనండి",
    "nav.pickup": "పికప్", "nav.contact": "సంప్రదించండి", "nav.services": "సేవలు",
    "nav.login": "లాగిన్", "nav.register": "నమోదు చేయండి",
    "header.govt": "భారత ప్రభుత్వం", "header.portal": "అధికారిక పోర్టల్",
    "header.tollFree": "టోల్ ఫ్రీ",

    "hero.badge.official": "అధికారిక పోర్టల్", "hero.badge.verified": "CPCB ధృవీకరించబడింది",
    "hero.title": "సుస్థిర భారతదేశం కోసం బాధ్యతాయుతమైన ఈ-వేస్ట్ మేనేజ్‌మెంట్",
    "hero.subtitle": "EcoRoute AI గుర్తింపు, డోర్‌స్టెప్ పికప్ మరియు ప్రభుత్వం ధృవీకరించిన రీసైక్లింగ్ కేంద్రాల ద్వారా పాత ఎలక్ట్రానిక్స్ సురక్షిత తొలగింపుకు సహాయపడుతుంది.",
    "hero.cta.pickup": "పికప్ బుక్ చేయండి", "hero.cta.locate": "రీసైక్లింగ్ కేంద్రం కనుగొనండి",
    "hero.trust.authorized": "ప్రభుత్వం ధృవీకరించింది", "hero.trust.security": "డేటా సెక్యూరిటీ · ISO 27001",
    "hero.trust.madeInIndia": "మేక్ ఇన్ ఇండియా", "hero.stat.pickups": "12,500+ పికప్‌లు పూర్తయ్యాయి",
    "hero.stat.recycled": "28 టన్నులు రీసైకిల్ చేయబడ్డాయి",

    "trust.1.title": "ప్రభుత్వం ధృవీకరించింది", "trust.1.sub": "MoEFCC & CPCB ధృవీకరించింది",
    "trust.2.title": "AI వర్గీకరణ", "trust.2.sub": "తక్షణ పరికర గుర్తింపు",
    "trust.3.title": "రీసైక్లింగ్ నెట్‌వర్క్", "trust.3.sub": "350+ లైసెన్స్ పొందిన భాగస్వాములు",
    "trust.4.title": "పౌరుల అనుకూల వేదిక", "trust.4.sub": "8 భారతీయ భాషలలో అందుబాటులో ఉంది",
    "trust.5.title": "పర్యావరణానికి ప్రథమ పీఠం", "trust.5.sub": "95% సురక్షిత రీసైక్లింగ్ రేటు",

    "how.title": "EcoRoute ఎలా పనిచేస్తుంది",
    "how.subtitle": "మీ ఇంటి వద్ద నుండి ధృవీకరించబడిన రీసైక్లింగ్ కేంద్రం వరకు ఈ-వేస్ట్ తొలగింపుకు 5 సులువైన దశలు.",
    "how.step1.title": "పరికరం ఫోటో అప్‌లోడ్ చేయండి", "how.step1.desc": "మీ పాత పరికరం స్పష్టమైన ఫోటో తీసి పోర్టల్‌లో అప్‌లోడ్ చేయండి.",
    "how.step2.title": "AI వర్గాన్ని గుర్తిస్తుంది", "how.step2.desc": "మా AI పరికరం రకం మరియు ప్రమాద స్థాయిని విశ్లేషిస్తుంది.",
    "how.step3.title": "పికప్ షెడ్యూల్ చేయండి", "how.step3.desc": "మీ చిరునామా నుండి పికప్ కోసం సౌకర్యవంతమైన తేదీ మరియు సమయం ఎంచుకోండి.",
    "how.step4.title": "అధికారిక సేకరణ", "how.step4.desc": "EcoRoute ప్రతినిధి మీ చిరునామాకు వచ్చి సురక్షితంగా సేకరిస్తారు.",
    "how.step5.title": "సురక్షిత రీసైక్లింగ్ & సర్టిఫికేట్", "how.step5.desc": "CPCB కేంద్రంలో రీసైకిల్ చేసిన తర్వాత డిజిటల్ సర్టిఫికేట్ పొందండి.",

    "home.marketplace.title": "లైవ్ స్క్రాప్ మార్కెట్‌ప్లేస్",
    "home.marketplace.subtitle": "పౌరులు మరియు రీసైక్లర్ల ఈ-వేస్ట్ జాబితాలను చూడండి",
    "home.marketplace.search": "పరికరం, బ్రాండ్ లేదా నగరం వెతకండి...",
    "home.marketplace.refresh": "రిఫ్రెష్", "home.marketplace.noItems": "ఏవీ కనుగొనబడలేదు",
    "home.marketplace.buyBid": "కొనండి / బిడ్", "home.marketplace.available": "అందుబాటులో ఉంది",
    "home.marketplace.govReserved": "ప్రభుత్వం రిజర్వ్", "home.marketplace.sold": "అమ్మబడింది",

    "stats.title": "జాతీయ ఈ-వేస్ట్ ప్రభావం",
    "stats.subtitle": "పరిశుభ్రమైన పర్యావరణం కోసం మన ఉమ్మడి సహకారం",
    "stats.recycled": "టన్నులు రీసైకిల్", "stats.citizens": "లబ్ధి పొందిన పౌరులు",
    "stats.centres": "అధికారిక కేంద్రాలు", "stats.co2": "CO2 ఆదా (టన్నులు)",

    "cta.title": "మీ ఈ-వేస్ట్ బాధ్యతాయుతంగా తొలగించడానికి సిద్ధంగా ఉన్నారా?",
    "cta.subtitle": "భారతదేశాన్ని పరిశుభ్రంగా మరియు హరితంగా మారుస్తున్న వేలాది మంది పౌరులతో చేరండి.",
    "cta.pickup": "డోర్‌స్టెప్ పికప్ బుక్ చేయండి", "cta.locate": "సమీప సేకరణ కేంద్రం కనుగొనండి",
    "footer.tagline": "భారత ప్రభుత్వం యొక్క అధికారిక ఈ-వేస్ట్ మేనేజ్‌మెంట్ వేదిక",
    "footer.rights": "అన్ని హక్కులు రక్షించబడ్డాయి. భారత ప్రభుత్వం.",
    "lang.select": "భాష ఎంచుకోండి",
  },

  mr: {
    "nav.home": "मुख्यपृष्ठ", "nav.about": "आमच्याबद्दल", "nav.locate": "केंद्र शोधा",
    "nav.pickup": "पिकअप", "nav.contact": "संपर्क", "nav.services": "सेवा",
    "nav.login": "लॉगिन", "nav.register": "नोंदणी",
    "header.govt": "भारत सरकार", "header.portal": "अधिकृत पोर्टल",
    "header.tollFree": "टोल फ्री",

    "hero.badge.official": "अधिकृत पोर्टल", "hero.badge.verified": "CPCB प्रमाणित",
    "hero.title": "शाश्वत भारतासाठी जबाबदार ई-कचरा व्यवस्थापन",
    "hero.subtitle": "EcoRoute नागरिकांना AI-आधारित ओळख, घरपोच पिकअप आणि देशभरातील सरकार-प्रमाणित पुनर्वापर केंद्रांद्वारे इलेक्ट्रॉनिक्सची सुरक्षित विल्हेवाट लावण्यास मदत करते.",
    "hero.cta.pickup": "पिकअप बुक करा", "hero.cta.locate": "पुनर्वापर केंद्र शोधा",
    "hero.trust.authorized": "शासकीय मान्यताप्राप्त", "hero.trust.security": "डेटा सुरक्षित · ISO 27001",
    "hero.trust.madeInIndia": "मेक इन इंडिया", "hero.stat.pickups": "12,500+ पिकअप पूर्ण",
    "hero.stat.recycled": "28 टन पुनर्वापर",

    "trust.1.title": "शासकीय मान्यताप्राप्त", "trust.1.sub": "MoEFCC व CPCB द्वारे प्रमाणित",
    "trust.2.title": "AI वर्गवारी", "trust.2.sub": "झटपट उपकरण ओळख",
    "trust.3.title": "पुनर्वापर नेटवर्क", "trust.3.sub": "350+ परवानाधारक भागीदार",
    "trust.4.title": "नागरिक स्नेही व्यासपीठ", "trust.4.sub": "8 भारतीय भाषांमध्ये उपलब्ध",
    "trust.5.title": "पर्यावरण प्रथम", "trust.5.sub": "95% सुरक्षित पुनर्वापर दर",

    "how.title": "EcoRoute कसे कार्य करते",
    "how.subtitle": "तुमच्या ई-कचऱ्याची तुमच्या दारापासून ते प्रमाणित पुनर्वापर केंद्रापर्यंत सुरक्षित विल्हेवाट लावण्याची सोपी 5-पायरी प्रक्रिया.",
    "how.step1.title": "उपकरणाचा फोटो अपलोड करा", "how.step1.desc": "तुमच्या उपकरणाचा स्पष्ट फोटो काढा आणि पोर्टलवर अपलोड करा.",
    "how.step2.title": "AI वर्गवारी ओळखते", "how.step2.desc": "आमचे AI इंजिन उपकरणाचा प्रकार आणि धोक्याची पातळी ओळखते.",
    "how.step3.title": "पिकअप शेड्यूल करा", "how.step3.desc": "तुमच्या पत्यावरून संकलनासाठी सोयीची तारीख आणि वेळ निवडा.",
    "how.step4.title": "अधिकृत संकलन", "how.step4.desc": "EcoRoute चा प्रशिक्षित प्रतिनिधी तुमच्या पत्यावर येऊन सुरक्षित संकलन करतो.",
    "how.step5.title": "सुरक्षित पुनर्वापर व प्रमाणपत्र", "how.step5.desc": "CPCB केंद्रात प्रक्रिया झाल्यावर डिजिटल प्रमाणपत्र मिळवा.",

    "home.marketplace.title": "थेट भंगार बाजार",
    "home.marketplace.subtitle": "नागरिक आणि पुनर्वापरकर्त्यांच्या ई-कचरा याद्या पहा",
    "home.marketplace.search": "उपकरण, ब्रँड किंवा शहर शोधा...",
    "home.marketplace.refresh": "रिफ्रेश", "home.marketplace.noItems": "काहीही आढळले नाही",
    "home.marketplace.buyBid": "खरेदी / बोली", "home.marketplace.available": "उपलब्ध",
    "home.marketplace.govReserved": "सरकार राखीव", "home.marketplace.sold": "विकले",

    "stats.title": "राष्ट्रीय ई-कचरा प्रभाव",
    "stats.subtitle": "स्वच्छ पर्यावरणासाठी आमच्या सामूहिक योगदानाचे मोजमाप",
    "stats.recycled": "टन पुनर्वापर", "stats.citizens": "लाभार्थी नागरिक",
    "stats.centres": "अधिकृत केंद्रे", "stats.co2": "CO2 बचत (टन)",

    "cta.title": "तुमच्या ई-कचऱ्याची जबाबदारीने विल्हेवाट लावण्यास तयार आहात?",
    "cta.subtitle": "भारताला स्वच्छ आणि हिरवेगार बनवणाऱ्या हजारो नागरिकांमध्ये सामील व्हा.",
    "cta.pickup": "घरपोच पिकअप बुक करा", "cta.locate": "जवळचे संकलन केंद्र शोधा",
    "footer.tagline": "भारत सरकारचे अधिकृत ई-कचरा व्यवस्थापन व्यासपीठ",
    "footer.rights": "सर्व हक्क राखीव. भारत सरकार.",
    "lang.select": "भाषा निवडा",
  },

  bn: {
    "nav.home": "হোম", "nav.about": "আমাদের সম্পর্কে", "nav.locate": "কেন্দ্র খুঁজুন",
    "nav.pickup": "পিকআপ", "nav.contact": "যোগাযোগ", "nav.services": "সেবা",
    "nav.login": "লগইন", "nav.register": "নিবন্ধন",
    "header.govt": "ভারত সরকার", "header.portal": "সরকারি পোর্টাল",
    "header.tollFree": "টোল ফ্রি",

    "hero.badge.official": "সরকারি পোর্টাল", "hero.badge.verified": "CPCB অনুমোদিত",
    "hero.title": "টেকসই ভারতের জন্য দায়িত্বশীল ই-বর্জ্য ব্যবস্থাপনা",
    "hero.subtitle": "EcoRoute এআই-চালিত শনাক্তকরণ, ডোরস্টেপ পিকআপ এবং সরকারি অনুমোদিত পুনর্ব্যবহার কেন্দ্রের মাধ্যমে পুরনো ইলেকট্রনিক্স নিরাপদে নিষ্পত্তি করতে সহায়তা করে।",
    "hero.cta.pickup": "পিকআপ বুক করুন", "hero.cta.locate": "পুনর্ব্যবহার কেন্দ্র খুঁজুন",
    "hero.trust.authorized": "সরকার অনুমোদিত", "hero.trust.security": "ডেটা সুরক্ষিত · ISO 27001",
    "hero.trust.madeInIndia": "মেক ইন ইন্ডিয়া", "hero.stat.pickups": "১২,৫০০+ পিকআপ সম্পন্ন",
    "hero.stat.recycled": "২৮ টন পুনর্ব্যবহৃত",

    "trust.1.title": "সরকার অনুমোদিত", "trust.1.sub": "MoEFCC ও CPCB দ্বারা প্রত্যয়িত",
    "trust.2.title": "AI শ্রেণীকরণ", "trust.2.sub": "তাত্ক্ষণিক ডিভাইস শনাক্তকরণ",
    "trust.3.title": "পুনর্ব্যবহার নেটওয়ার্ক", "trust.3.sub": "৩৫০+ লাইসেন্সপ্রাপ্ত অংশীদার",
    "trust.4.title": "নাগরিক-বান্ধব প্ল্যাটফর্ম", "trust.4.sub": "৮টি ভারতীয় ভাষায় উপলব্ধ",
    "trust.5.title": "পরিবেশ প্রথম", "trust.5.sub": "৯৫% নিরাপদ পুনর্ব্যবহারের হার",

    "how.title": "EcoRoute যেভাবে কাজ করে",
    "how.subtitle": "আপনার ঘর থেকে অনুমোদিত কেন্দ্র পর্যন্ত ই-বর্জ্য নিষ্পত্তির সহজ ৫টি ধাপ।",
    "how.step1.title": "ডিভাইসের ছবি আপলোড করুন", "how.step1.desc": "আপনার ডিভাইসের স্পষ্ট ছবি তুলুন এবং পোর্টালে আপলোড করুন।",
    "how.step2.title": "AI বিভাগ শনাক্ত করে", "how.step2.desc": "আমাদের এআই ইঞ্জিন ডিভাইসের ধরণ ও ঝুঁকির মাত্রা বিশ্লেষণ করে।",
    "how.step3.title": "পিকআপের সময় নির্ধারণ করুন", "how.step3.desc": "আপনার ঠিকানা থেকে সংগ্রহের জন্য সুবিধাজনক তারিখ ও সময় বাছুন।",
    "how.step4.title": "অনুমোদিত সংগ্রহ", "how.step4.desc": "EcoRoute প্রতিনিধি আপনার ঠিকানায় এসে নিরাপদে সংগ্রহ করবেন।",
    "how.step5.title": "নিরাপদ পুনর্ব্যবহার ও সার্টিফিকেট", "how.step5.desc": "CPCB কেন্দ্রে পুনর্ব্যবহারের পর ডিজিটাল সার্টিফিকেট পাবেন।",

    "home.marketplace.title": "লাইভ স্ক্র্যাপ মার্কেটপ্লেস",
    "home.marketplace.subtitle": "নাগরিক ও রিসাইকেলারদের ই-বর্জ্য তালিকা দেখুন",
    "home.marketplace.search": "ডিভাইস, ব্র্যান্ড বা শহর খুঁজুন...",
    "home.marketplace.refresh": "রিফ্রেশ", "home.marketplace.noItems": "কিছু পাওয়া যায়নি",
    "home.marketplace.buyBid": "কিনুন / বিড করুন", "home.marketplace.available": "উপলব্ধ",
    "home.marketplace.govReserved": "সরকার সংরক্ষিত", "home.marketplace.sold": "বিক্রি হয়েছে",

    "stats.title": "জাতীয় ই-বর্জ্য প্রভাব",
    "stats.subtitle": "পরিচ্ছন্ন পরিবেশের জন্য আমাদের যৌথ অবদানের পরিমাপ",
    "stats.recycled": "টন পুনর্ব্যবহৃত", "stats.citizens": "উপকৃত নাগরিক",
    "stats.centres": "অনুমোদিত কেন্দ্র", "stats.co2": "CO2 সঞ্চয় (টন)",

    "cta.title": "আপনার ই-বর্জ্য দায়িত্বের সাথে নিষ্পত্তি করতে প্রস্তুত?",
    "cta.subtitle": "ভারতকে পরিচ্ছন্ন ও সবুজ করে তোলা হাজার হাজার নাগরিকের সাথে যোগ দিন।",
    "cta.pickup": "ডোরস্টেপ পিকআপ বুক করুন", "cta.locate": "নিকটস্থ কেন্দ্র খুঁজুন",
    "footer.tagline": "ভারত সরকারের সরকারি ই-বর্জ্য ব্যবস্থাপনা প্ল্যাটফর্ম",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত। ভারত সরকার।",
    "lang.select": "ভাষা নির্বাচন করুন",
  },

  kn: {
    "nav.home": "ಮುಖಪುಟ", "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ", "nav.locate": "ಕೇಂದ್ರ ಹುಡುಕಿ",
    "nav.pickup": "ಪಿಕಪ್", "nav.contact": "ಸಂಪರ್ಕ", "nav.services": "ಸೇವೆಗಳು",
    "nav.login": "ಲಾಗಿನ್", "nav.register": "ನೋಂದಣಿ",
    "header.govt": "ಭಾರತ ಸರ್ಕಾರ", "header.portal": "ಅಧಿಕೃತ ಪೋರ್ಟಲ್",
    "header.tollFree": "ಟೋಲ್ ಫ್ರೀ",

    "hero.badge.official": "ಅಧಿಕೃತ ಪೋರ್ಟಲ್", "hero.badge.verified": "CPCB ಪ್ರಮಾಣೀಕೃತ",
    "hero.title": "ಸುಸ್ಥಿರ ಭಾರತಕ್ಕಾಗಿ ಜವಾಬ್ದಾರಿಯುತ ಇ-ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ",
    "hero.subtitle": "EcoRoute ಎಐ-ಆಧಾರಿತ ಗುರುತಿಸುವಿಕೆ, ಮನೆಬಾಗಿಲಿನ ಪಿಕಪ್ ಮತ್ತು ಸರ್ಕಾರಿ ಪ್ರಮಾಣೀಕೃತ ಮರುಬಳಕೆ ಕೇಂದ್ರಗಳ ಮೂಲಕ ಹಳೆಯ ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಸುರಕ್ಷಿತ ವಿಲೇವಾರಿಗೆ ನೆರವಾಗುತ್ತದೆ.",
    "hero.cta.pickup": "ಪಿಕಪ್ ಬುಕ್ ಮಾಡಿ", "hero.cta.locate": "ಮರುಬಳಕೆ ಕೇಂದ್ರ ಹುಡುಕಿ",
    "hero.trust.authorized": "ಸರ್ಕಾರದಿಂದ ಅಧಿಕೃತ", "hero.trust.security": "ಡೇಟಾ ಸುರಕ್ಷಿತ · ISO 27001",
    "hero.trust.madeInIndia": "ಮೇಕ್ ಇನ್ ಇಂಡಿಯಾ", "hero.stat.pickups": "12,500+ ಪಿಕಪ್ ಪೂರ್ಣಗೊಂಡಿದೆ",
    "hero.stat.recycled": "28 ಟನ್ ಮರುಬಳಕೆಯಾಗಿದೆ",

    "trust.1.title": "ಸರ್ಕಾರದಿಂದ ಅಧಿಕೃತ", "trust.1.sub": "MoEFCC & CPCB ಪ್ರಮಾಣೀಕೃತ",
    "trust.2.title": "AI ವರ್ಗೀಕರಣ", "trust.2.sub": "ತತ್ಕ್ಷಣದ ಸಾಧನ ಗುರುತಿಸುವಿಕೆ",
    "trust.3.title": "ಮರುಬಳಕೆ ನೆಟ್‌ವರ್ಕ್", "trust.3.sub": "350+ ಲೈಸೆನ್ಸ್ ಪಾಲುದಾರರು",
    "trust.4.title": "ನಾಗರಿಕ ಸ್ನೇಹಿ ವೇದಿಕೆ", "trust.4.sub": "8 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ",
    "trust.5.title": "ಪರಿಸರಕ್ಕೆ ಮೊದಲ ಆದ್ಯತೆ", "trust.5.sub": "95% ಸುರಕ್ಷಿತ ಮರುಬಳಕೆ ದರ",

    "how.title": "EcoRoute ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    "how.subtitle": "ನಿಮ್ಮ ಮನೆಬಾಗಿಲಿನಿಂದ ಪ್ರಮಾಣೀಕೃತ ಕೇಂದ್ರದವರೆಗೆ ಇ-ತ್ಯಾಜ್ಯ ವಿಲೇವಾರಿಗೆ 5 ಸುಲಭ ಹಂತಗಳು.",
    "how.step1.title": "ಸಾಧನದ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ", "how.step1.desc": "ನಿಮ್ಮ ಸಾಧನದ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆದು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "how.step2.title": "AI ವರ್ಗ ಗುರುತಿಸುತ್ತದೆ", "how.step2.desc": "ನಮ್ಮ ಎಐ ತಂತ್ರಜ್ಞಾನ ಸಾಧನದ ಪ್ರಕಾರ ಮತ್ತು ಅಪಾಯದ ಮಟ್ಟವನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.",
    "how.step3.title": "ಪಿಕಪ್ ನಿಗದಿಪಡಿಸಿ", "how.step3.desc": "ನಿಮ್ಮ ವಿಳಾಸದಿಂದ ಸಂಗ್ರಹಿಸಲು ಅನುಕೂಲಕರ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ ಆಯ್ಕೆಮಾಡಿ.",
    "how.step4.title": "ಅಧಿಕೃತ ಸಂಗ್ರಹಣೆ", "how.step4.desc": "EcoRoute ಪ್ರತಿನಿಧಿ ನಿಮ್ಮ ವಿಳಾಸಕ್ಕೆ ಬಂದು ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸುತ್ತಾರೆ.",
    "how.step5.title": "ಸುರಕ್ಷಿತ ಮರುಬಳಕೆ & ಸರ್ಟಿಫಿಕೇಟ್", "how.step5.desc": "CPCB ಕೇಂದ್ರದಲ್ಲಿ ಮರುಬಳಕೆಯಾದ ನಂತರ ಡಿಜಿಟಲ್ ಸರ್ಟಿಫಿಕೇಟ್ ಪಡೆಯಿರಿ.",

    "home.marketplace.title": "ಲೈವ್ ಸ್ಕ್ರ್ಯಾಪ್ ಮಾರ್ಕೆಟ್‌ಪ್ಲೇಸ್",
    "home.marketplace.subtitle": "ನಾಗರಿಕರು ಮತ್ತು ಮರುಬಳಕೆದಾರರ ಇ-ತ್ಯಾಜ್ಯ ಪಟ್ಟಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "home.marketplace.search": "ಸಾಧನ, ಬ್ರ್ಯಾಂಡ್ ಅಥವಾ ನಗರ ಹುಡುಕಿ...",
    "home.marketplace.refresh": "ರಿಫ್ರೆಶ್", "home.marketplace.noItems": "ಯಾವುದೂ ಕಂಡುಬಂದಿಲ್ಲ",
    "home.marketplace.buyBid": "ಖರೀದಿ / ಬಿಡ್", "home.marketplace.available": "ಲಭ್ಯವಿದೆ",
    "home.marketplace.govReserved": "ಸರ್ಕಾರ ಮೀಸಲಾದ", "home.marketplace.sold": "ಮಾರಾಟವಾಗಿದೆ",

    "stats.title": "ರಾಷ್ಟ್ರೀಯ ಇ-ತ್ಯಾಜ್ಯ ಪ್ರಭಾವ",
    "stats.subtitle": "ಪರಿಸರ ನೈರ್ಮಲ್ಯಕ್ಕಾಗಿ ನಮ್ಮ ಸಾಮೂಹಿಕ ಕೊಡುಗೆಯ ಅಳತೆ",
    "stats.recycled": "ಟನ್ ಮರುಬಳಕೆ", "stats.citizens": "ಫಲಾನುಭವಿ ನಾಗರಿಕರು",
    "stats.centres": "ಅಧಿಕೃತ ಕೇಂದ್ರಗಳು", "stats.co2": "CO2 ಉಳಿತಾಯ (ಟನ್)",

    "cta.title": "ನಿಮ್ಮ ಇ-ತ್ಯಾಜ್ಯವನ್ನು ಜವಾಬ್ದಾರಿಯಿಂದ ವಿಲೇವಾರಿ ಮಾಡಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    "cta.subtitle": "ಭಾರತವನ್ನು ಸ್ವಚ್ಛ ಮತ್ತು ಹಸಿರಾಗಿಸುತ್ತಿರುವ ಸಾವಿರಾರು ನಾಗರಿಕರೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ.",
    "cta.pickup": "ಮನೆಬಾಗಿಲಿನ ಪಿಕಪ್ ಬುಕ್ ಮಾಡಿ", "cta.locate": "ಹತ್ತಿರದ ಕೇಂದ್ರ ಹುಡುಕಿ",
    "footer.tagline": "ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಇ-ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣಾ ವೇದಿಕೆ",
    "footer.rights": "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಭಾರತ ಸರ್ಕಾರ.",
    "lang.select": "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ",
  },

  gu: {
    "nav.home": "હોમ", "nav.about": "અમારા વિશે", "nav.locate": "કેન્દ્ર શોધો",
    "nav.pickup": "પિકઅપ", "nav.contact": "સંપર્ક", "nav.services": "સેવાઓ",
    "nav.login": "લૉગિન", "nav.register": "નોંધણી",
    "header.govt": "ભારત સરકાર", "header.portal": "સત્તાવાર પોર્ટલ",
    "header.tollFree": "ટોલ ફ્રી",

    "hero.badge.official": "સત્તાવાર પોર્ટલ", "hero.badge.verified": "CPCB પ્રમાણિત",
    "hero.title": "શાશ્વત ભારત માટે જવાબદાર ઈ-કચરો વ્યવસ્થાપન",
    "hero.subtitle": "EcoRoute AI-આધારિત ઓળખ, ઘરઆંગણે પિકઅપ અને સરકાર દ્વારા માન્યતા પ્રાપ્ત રિસાયક્લિંગ કેન્દ્રો દ્વારા ઈ-કચરાનો સુરક્ષિત નિકાલ કરવામાં મદદ કરે છે.",
    "hero.cta.pickup": "પિકઅપ બુક કરો", "hero.cta.locate": "રિસાયક્લિંગ કેન્દ્ર શોધો",
    "hero.trust.authorized": "સરકાર દ્વારા માન્યતા પ્રાપ્ત", "hero.trust.security": "ડેટા સુરક્ષિત · ISO 27001",
    "hero.trust.madeInIndia": "મેક ઇન ઇન્ડિયા", "hero.stat.pickups": "12,500+ પિકઅપ પૂર્ણ",
    "hero.stat.recycled": "28 ટન રિસાયકલ",

    "trust.1.title": "સરકાર દ્વારા માન્યતા પ્રાપ્ત", "trust.1.sub": "MoEFCC અને CPCB દ્વારા પ્રમાણિત",
    "trust.2.title": "AI વર્ગીકરણ", "trust.2.sub": "ત્વરિત ઉપકરણ ઓળખ",
    "trust.3.title": "રિસાયક્લિંગ નેટવર્ક", "trust.3.sub": "350+ લાયસન્સ પ્રાપ્ત ભાગીદારો",
    "trust.4.title": "નાગરિક અહલ્યા પ્લેટફોર્મ", "trust.4.sub": "8 ભારતીય ભાષાઓમાં ઉપલબ્ધ",
    "trust.5.title": "પર્યાવરણ પ્રથમ", "trust.5.sub": "95% સુરક્ષિત રિસાયક્લિંગ દર",

    "how.title": "EcoRoute કેવી રીતે કામ કરે છે",
    "how.subtitle": "તમારા ઘરઆંગણેથી પ્રમાણિત રિસાયક્લિંગ કેન્દ્ર સુધી ઈ-કચરાના નિકાલ માટેના 5 સરળ પગલાં.",
    "how.step1.title": "ઉપકરણનો ફોટો અપલોડ કરો", "how.step1.desc": "તમારા ઉપકરણનો સ્પષ્ટ ફોટો પાડો અને પોર્ટલ પર અપલોડ કરો.",
    "how.step2.title": "AI શ્રેણી ઓળખે છે", "how.step2.desc": "અમારું AI એન્જિન ઉપકરણના પ્રકાર અને જોખમ સ્તરનું પૃથક્કરણ કરે છે.",
    "how.step3.title": "પિકઅપ શેડ્યૂલ કરો", "how.step3.desc": "તમારા સરનામેથી એકત્ર કરવા માટે અનુકૂળ તારીખ અને સમય પસંદ કરો.",
    "how.step4.title": "સત્તાવાર સંગ્રહ", "how.step4.desc": "EcoRoute નો તાલીમબદ્ધ પ્રતિનિધિ તમારા સરનામે આવીને સુરક્ષિત સંગ્રહ કરે છે.",
    "how.step5.title": "સુરક્ષિત રિસાયક્લિંગ અને પ્રમાણપત્ર", "how.step5.desc": "CPCB કેન્દ્રમાં પ્રક્રિયા થયા પછી ડિજિટલ પ્રમાણપત્ર મેળવો.",

    "home.marketplace.title": "લાઇવ ભંગાર માર્કેટ",
    "home.marketplace.subtitle": "નાગરિકો અને રિસાયકલર્સની ઈ-કચરો યાદી જુઓ",
    "home.marketplace.search": "ઉપકરણ, બ્રાન્ડ અથવા શહેર શોધો...",
    "home.marketplace.refresh": "રિફ્રેશ", "home.marketplace.noItems": "કોઈ આઇટમ મળ્યા નથી",
    "home.marketplace.buyBid": "ખરીદો / બિડ", "home.marketplace.available": "ઉપલબ્ધ",
    "home.marketplace.govReserved": "સરકાર અનામત", "home.marketplace.sold": "વેચાઈ ગયું",

    "stats.title": "રાષ્ટ્રીય ઈ-કચરો પ્રભાવ",
    "stats.subtitle": "સ્વચ્છ પર્યાવરણ માટે આપણા સામૂહિક યોગદાનનું માપન",
    "stats.recycled": "ટન રિસાયકલ", "stats.citizens": "લાભાર્થી નાગરિકો",
    "stats.centres": "સત્તાવાર કેન્દ્રો", "stats.co2": "CO2 બચત (ટન)",

    "cta.title": "તમારા ઈ-કચરાનો જવાબદારીપૂર્વક નિકાલ કરવા તૈયાર છો?",
    "cta.subtitle": "ભારતને સ્વચ્છ અને હરિયાળું બનાવતા હજારો નાગરિકો સાથે જોડાઓ.",
    "cta.pickup": "ઘરઆંગણે પિકઅપ બુક કરો", "cta.locate": "નજીકનું કેન્દ્ર શોધો",
    "footer.tagline": "ભારત સરકારનું સત્તાવાર ઈ-કચરો વ્યવસ્થાપન પ્લેટફોર્મ",
    "footer.rights": "સર્વ હકો અનામત. ભારત સરકાર.",
    "lang.select": "ભાષા પસંદ કરો",
  },
};

// ── Context ───────────────────────────────────────────────────
interface LanguageContextValue {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: (key: string) => string;
  currentLanguage: Language;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  currentLanguage: SUPPORTED_LANGUAGES[0],
});

const STORAGE_KEY = "ecoroute_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
      if (saved && translations[saved]) {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {}
  }, []);

  const setLang = (code: LangCode) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
      document.documentElement.lang = code;
    } catch {}
  };

  const t = (key: string): string => {
    if (!key) return "";
    return translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
  };

  const currentLanguage = SUPPORTED_LANGUAGES.find((l) => l.code === lang) ?? SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
