import React, { useState, useEffect, useMemo } from 'react';
import { categories, categoryEmojis, deals, products as localProducts } from './data/products';
import { Product, CartItem, Category } from './types';
import AuthModal from './AuthModal';
import LoginPage from './LoginPage';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

// Inline custom SVGs for perfect type compatibility
const Icons = {
  Search: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  ShoppingBag: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  ),
  Heart: ({ className, style, fill }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill={fill || "none"} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  Plus: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Minus: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Trash2: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
  Star: ({ className, style, fill }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill={fill || "none"} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  MapPin: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Gift: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  ),
  CheckCircle: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  Clock: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Truck: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  ),
  Smile: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
      <line x1="9" y1="9" x2="9.01" y2="9"></line>
      <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
  ),
  X: ({ className, style, onClick }: IconProps) => (
    <svg className={className} style={style} onClick={onClick} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  AlertCircle: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
  Filter: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  ),
  Sun: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  ),
  Moon: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ),
  User: ({ className, style }: IconProps) => (
    <svg className={className} style={style} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )
};

type Language = 'en' | 'kn' | 'hi';

// Complete translations dictionary for fully functional multi-language support
const dict: Record<Language, Record<string, string>> = {
  en: {
    searchPlaceholder: "Search fresh groceries...",
    cyberDeals: "FLASH DEALS",
    endsIn: "ENDS IN",
    shopByCategory: "SHOP BY CATEGORIES",
    filters: "FILTERS",
    reset: "RESET",
    offerBadges: "OFFER BADGES",
    maxPrice: "MAX PRICE",
    minimumRating: "MINIMUM RATING",
    showInStockOnly: "Show In-Stock Only",
    favoritesTitle: "FAVORITES",
    noProducts: "No Groceries Found",
    clearFilters: "Try resetting filters or search terms.",
    orderSecured: "ORDER SECURED!",
    dispatchMessage: "Your express delivery is dispatched. Watch tracking below!",
    startTracking: "Start Live Tracking",
    cartTitle: "SHOPPING DRAWER",
    cartEmpty: "Your cart is empty",
    addItemsMsg: "Add fresh items to get speed delivery.",
    promoLabel: "PROMO CODE",
    promoDesc: "Apply code NEON20 on checkout for an instant 20% discount.",
    enterPromo: "Enter NEON20",
    apply: "Apply",
    applied: "Applied",
    subtotal: "Subtotal",
    discount: "Discount",
    deliveryFee: "Delivery Fee",
    free: "FREE",
    addMoreForFree: "Add ₹T more for Free Delivery!",
    billTotal: "Bill Total",
    secureCheckout: "SECURE CHECKOUT",
    trackerTitle: "EXPRESS DELIVERY TRACKER",
    trackerStatus: "Order status is live simulated",
    forceStep: "Force Progress Step",
    step1: "Order Placed",
    step1Desc: "Awaiting store pack",
    step2: "Preparing",
    step2Desc: "Bagging fresh goods",
    step3: "Out for Delivery",
    step3Desc: "Rider on express speed",
    step4: "Delivered",
    step4Desc: "Enjoy your fresh food",
    footerBrandDesc: "Providing ultra-fresh organic foods via premium express delivery since 2026.",
    services: "Services",
    support: "Support",
    all: "All Products",
    fruits: "Fruits",
    vegetables: "Vegetables",
    dairy: "Dairy & Eggs",
    beverages: "Beverages",
    snacks: "Snacks",
    bakery: "Bakery",
    meat: "Meat & Seafood",
    frozen: "Frozen Foods",
    anyRating: "Any Rating",
    items: "items",
    estimated: "Estimated",
    mins: "12 Mins",
    secCheckout: "SECURE CHECKOUT"
  },
  kn: {
    searchPlaceholder: "ತಾಜಾ ದಿನಸಿ ಹುಡುಕಿ...",
    cyberDeals: "ಫ್ಲಾಶ್ ಡೀಲ್‌ಗಳು",
    endsIn: "ಮುಕ್ತಾಯಗೊಳ್ಳುವುದು",
    shopByCategory: "ವರ್ಗಗಳ ಮೂಲಕ ಶಾಪಿಂಗ್ ಮಾಡಿ",
    filters: "ಫಿಲ್ಟರ್‌ಗಳು",
    reset: "ಮರುಹೊಂದಿಸಿ",
    offerBadges: "ಆಫರ್ ಬ್ಯಾಡ್ಜ್‌ಗಳು",
    maxPrice: "ಗರಿಷ್ಠ ಬೆಲೆ",
    minimumRating: "ಕನಿಷ್ಠ ರೇಟಿಂಗ್",
    showInStockOnly: "ಸ್ಟಾಕ್‌ನಲ್ಲಿರುವ ವಸ್ತುಗಳನ್ನು ಮಾತ್ರ ತೋರಿಸಿ",
    favoritesTitle: "ಮೆಚ್ಚಿನವುಗಳು",
    noProducts: "ಯಾವುದೇ ದಿನಸಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    clearFilters: "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ.",
    orderSecured: "ಆದೇಶ ಖಚಿತವಾಗಿದೆ!",
    dispatchMessage: "ನಿಮ್ಮ ತ್ವರಿತ ವಿತರಣೆಯನ್ನು ಕಳುಹಿಸಲಾಗಿದೆ. ಕೆಳಗೆ ಟ್ರ್ಯಾಕಿಂಗ್ ನೋಡಿ!",
    startTracking: "ಟ್ರ್ಯಾಕಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ",
    cartTitle: "ಶಾಪಿಂಗ್ ಕಾರ್ಟ್",
    cartEmpty: "ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ",
    addItemsMsg: "ವೇಗದ ವಿತರಣೆಗೆ ತಾಜಾ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಿ.",
    promoLabel: "ಪ್ರೋಮೋ ಕೋಡ್",
    promoDesc: "ತಕ್ಷಣದ 20% ರಿಯಾಯಿತಿಗಾಗಿ ಚೆಕ್ಔಟ್‌ನಲ್ಲಿ NEON20 ಕೋಡ್ ಬಳಸಿ.",
    enterPromo: "NEON20 ನಮೂದಿಸಿ",
    apply: "ಅನ್ವಯಿಸಿ",
    applied: "ಅನ್ವಯಿಸಲಾಗಿದೆ",
    subtotal: "ಉಪಮೊತ್ತ",
    discount: "ರಿಯಾಯಿತಿ",
    deliveryFee: "ವಿತರಣಾ ಶುಲ್ಕ",
    free: "ಉಚಿತ",
    addMoreForFree: "ಉಚಿತ ವಿತರಣೆಗಾಗಿ ₹T ಹೆಚ್ಚು ಸೇರಿಸಿ!",
    billTotal: "ಒಟ್ಟು ಬಿಲ್",
    secureCheckout: "ಸುರಕ್ಷಿತ ಚೆಕ್ಔಟ್",
    trackerTitle: "ಎಕ್ಸ್‌ಪ್ರೆಸ್ ವಿತರಣೆ ಟ್ರ್ಯಾಕರ್",
    trackerStatus: "ಆದೇಶ ಸ್ಥಿತಿ ಲೈವ್ ಸಿಮ್ಯುಲೇಟೆಡ್",
    forceStep: "ಮುಂದಿನ ಹಂತಕ್ಕೆ ಹೋಗಿ",
    step1: "ಆದೇಶಿಸಲಾಗಿದೆ",
    step1Desc: "ಸ್ಟೋರ್ ಪ್ಯಾಕ್‌ಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ",
    step2: "ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ",
    step2Desc: "ತಾಜಾ ಸರಕುಗಳನ್ನು ಪ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ",
    step3: "ವಿತರಣೆಗೆ ಹೊರಟಿದೆ",
    step3Desc: "ರೈಡರ್ ವೇಗದಲ್ಲಿದ್ದಾರೆ",
    step4: "ವಿತರಿಸಲಾಗಿದೆ",
    step4Desc: "ನಿಮ್ಮ ತಾಜಾ ಆಹಾರವನ್ನು ಆನಂದಿಸಿ",
    footerBrandDesc: "2026 ರಿಂದ ಪ್ರೀಮಿಯಂ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ವಿತರಣೆಯ ಮೂಲಕ ಅಲ್ಟ್ರಾ-ಫ್ರೆಶ್ ಸಾವಯವ ಆಹಾರಗಳನ್ನು ಒದಗಿಸುತ್ತಿದೆ.",
    services: "ಸೇವೆಗಳು",
    support: "ಬೆಂಬಲ",
    all: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು",
    fruits: "ಹಣ್ಣುಗಳು",
    vegetables: "ತರಕಾರಿಗಳು",
    dairy: "ಡೈರಿ ಮತ್ತು ಮೊಟ್ಟೆಗಳು",
    beverages: "ಪಾನೀಯಗಳು",
    snacks: "ತಿಂಡಿಗಳು",
    bakery: "ಬೇಕರಿ",
    meat: "ಮಾಂಸ ಮತ್ತು ಸಮುದ್ರಾಹಾರ",
    frozen: "ಹೆಪ್ಪುಗಟ್ಟಿದ ಆಹಾರಗಳು",
    anyRating: "ಯಾವುದೇ ರೇಟಿಂಗ್",
    items: "ವಸ್ತುಗಳು",
    estimated: "ಅಂದಾಜು",
    mins: "12 ನಿಮಿಷ",
    secCheckout: "ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಿ"
  },
  hi: {
    searchPlaceholder: "ताज़ा किराने का सामान खोजें...",
    cyberDeals: "फ्लैश डील्स",
    endsIn: "समाप्त होने में",
    shopByCategory: "श्रेणी के अनुसार खरीदारी करें",
    filters: "फ़िल्टर",
    reset: "रीसेट",
    offerBadges: "ऑफ़र बैज",
    maxPrice: "अधिकतम मूल्य",
    minimumRating: "न्यूनतम रेटिंग",
    showInStockOnly: "केवल स्टॉक में दिखाएं",
    favoritesTitle: "पसंदीदा",
    noProducts: "कोई किराना नहीं मिला",
    clearFilters: "फ़िल्टर रीसेट करने का प्रयास करें।",
    orderSecured: "ऑर्डर सुरक्षित!",
    dispatchMessage: "आपकी एक्सप्रेस डिलीवरी भेज दी गई है। नीचे ट्रैकिंग देखें!",
    startTracking: "ट्रैकिंग शुरू करें",
    cartTitle: "शॉपिंग कार्ट",
    cartEmpty: "आपकी कार्ट खाली है",
    addItemsMsg: "तेज डिलीवरी पाने के लिए ताज़ा आइटम जोड़ें।",
    promoLabel: "प्रोमो कोड",
    promoDesc: "तत्काल 20% छूट के लिए चेकआउट पर NEON20 कोड लागू करें।",
    enterPromo: "NEON20 दर्ज करें",
    apply: "लागू करें",
    applied: "लागू",
    subtotal: "उप-योग",
    discount: "छूट",
    deliveryFee: "वितरण शुल्क",
    free: "मुफ्त",
    addMoreForFree: "मुफ्त डिलीवरी के लिए ₹T और जोड़ें!",
    billTotal: "कुल बिल",
    secureCheckout: "सुरक्षित चेकआउट",
    trackerTitle: "एक्सप्रेस डिलीवरी ट्रैकर",
    trackerStatus: "ऑर्डर की स्थिति लाइव सिम्युलेटेड है",
    forceStep: "अगले चरण पर जाएँ",
    step1: "ऑर्डर किया गया",
    step1Desc: "स्टोर पैक की प्रतीक्षा में",
    step2: "तैयार किया जा रहा है",
    step2Desc: "ताज़ा सामान पैक किया जा रहा है",
    step3: "डिलीवरी के लिए निकल गया",
    step3Desc: "राइडर एक्सप्रेस गति पर है",
    step4: "पहुंचा दिया गया",
    step4Desc: "अपने ताज़ा भोजन का आनंद लें",
    footerBrandDesc: "2026 से प्रीमियम एक्सप्रेस डिलीवरी के माध्यम से अति-ताज़ा जैविक खाद्य पदार्थ प्रदान करना।",
    services: "सेवाएं",
    support: "समर्थन",
    all: "सभी उत्पाद",
    fruits: "फल",
    vegetables: "सब्जियां",
    dairy: "डेयरी और अंडे",
    beverages: "पेय पदार्थ",
    snacks: "नमकीन",
    bakery: "बेकरी",
    meat: "मांस और समुद्री भोजन",
    frozen: "जमे हुए खाद्य पदार्थ",
    anyRating: "कोई भी रेटिंग",
    items: "सामान",
    estimated: "अनुमानित",
    mins: "12 मिनट",
    secCheckout: "सुरक्षित भुगतान"
  }
};
function App() {
  // Theme & Language states
  const [lang, setLang] = useState<Language>('en');
  const [isLightMode, setIsLightMode] = useState(false);

  // Translation helper
  const t = (key: string): string => {
    // Check dynamic product / category match
    const lowercaseKey = key.toLowerCase();
    if (lowercaseKey === 'all') return dict[lang].all;
    if (lowercaseKey === 'fruits') return dict[lang].fruits;
    if (lowercaseKey === 'vegetables') return dict[lang].vegetables;
    if (lowercaseKey === 'dairy') return dict[lang].dairy;
    if (lowercaseKey === 'beverages') return dict[lang].beverages;
    if (lowercaseKey === 'snacks') return dict[lang].snacks;
    if (lowercaseKey === 'bakery') return dict[lang].bakery;
    if (lowercaseKey === 'meat') return dict[lang].meat;
    if (lowercaseKey === 'frozen') return dict[lang].frozen;

    return dict[lang][key] || key;
  };

  // App States
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showHelpcenter, setShowHelpcenter] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([{ sender: 'bot', text: 'Hi! How can I help you today?' }]);
  const [chatInput, setChatInput] = useState('');
  const [expandedHelp, setExpandedHelp] = useState<number | null>(null);
  
  // Auth & Backend States
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Backend error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const mappedProducts = data.map((p: any) => ({
            ...p,
            id: p._id || p.id,
            emoji: p.imageUrl || p.emoji,
            inStock: p.stock !== undefined ? p.stock > 0 : p.inStock,
            badge: p.stock !== undefined ? (p.stock < 10 ? 'hot' : null) : p.badge
          }));
          setProducts(mappedProducts);
        } else {
          console.warn("Backend didn't return an array, falling back to local products.");
          setProducts(localProducts);
        }
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setProducts(localProducts);
      });
  }, []);

  // Fetch profile and cart if logged in
  useEffect(() => {
    if (token) {
      fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (!res.ok) throw new Error('Profile error');
        return res.json();
      })
      .then(data => {
        if (data && data.name) {
          setUser(data);
        } else {
          setToken(null);
        }
      })
      .catch(() => setToken(null));

      fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (!res.ok) throw new Error('Cart fetch error');
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data.items)) {
          setCart(data.items.map((item: any) => {
            const productInfo = item.product || {};
            return {
              ...productInfo,
              id: productInfo._id || productInfo.id || item._id,
              emoji: productInfo.imageUrl || productInfo.emoji,
              quantity: item.quantity,
              price: item.priceAtAddition || productInfo.price || 0
            };
          }));
        }
      })
      .catch(err => console.error("Cart error:", err));
    } else {
      setUser(null);
      setCart([]);
    }
  }, [token]);
  
  // Sidebar Filters
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string>('All');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  
  // Checkout & Promo
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Delivery Tracker Status Simulation
  const [deliveryStep, setDeliveryStep] = useState(1);
  const [isTrackingActive, setIsTrackingActive] = useState(false);

  // Countdown timer for Deals
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 45, seconds: 10 }; // reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDealClick = (dealId: number) => {
    if (dealId === 1) {
      setSelectedCategory('Dairy');
    } else if (dealId === 2) {
      setSelectedCategory('Fruits');
      setSelectedBadge('sale');
    } else if (dealId === 3) {
      setSelectedCategory('All');
    } else if (dealId === 4) {
      setSelectedCategory('Bakery');
    }
    document.querySelector('.categories-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    
    setTimeout(() => {
      let botResponse = "I'm your QuickBot! Ask me about deliveries, refunds, or products.";
      const lower = chatInput.toLowerCase();
      if (lower.includes('delivery')) botResponse = "We offer 15-minute ultra-fast delivery. Free on orders above ₹50!";
      else if (lower.includes('refund') || lower.includes('return')) botResponse = "We have a no-questions-asked refund policy. Let us know what's wrong!";
      else if (lower.includes('hi') || lower.includes('hello')) botResponse = "Hello! Looking for any specific groceries?";
      
      setChatMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  // Theme effect
  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle('light-theme');
  };

  // Delivery simulator timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTrackingActive && deliveryStep < 4) {
      interval = setInterval(() => {
        setDeliveryStep(prev => {
          if (prev >= 4) {
            setIsTrackingActive(false);
            return 4;
          }
          return prev + 1;
        });
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isTrackingActive, deliveryStep]);

  // Wishlist actions
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Cart actions
  const addToCart = async (product: Product) => {
    if (!product.inStock) return;
    if (!token) {
      setIsAuthModalOpen(true);
      return;
    }
    
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: (product as any)._id || product.id, quantity: 1 })
      });
      if (res.ok) {
        setCart(prev => {
          const existing = prev.find(item => item.id === product.id);
          if (existing) {
            return prev.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            );
          }
          return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (productId: number, amount: number) => {
    if (!token) return;
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    const newQty = item.quantity + amount;

    try {
      await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: newQty })
      });
      setCart(prev => 
        prev.map(item => {
          if (item.id === productId) {
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        }).filter(item => item.quantity > 0)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!token) return;
    try {
      await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: 0 })
      });
      setCart(prev => prev.filter(item => item.id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  // Apply promo logic
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'NEON20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid Coupon Code');
      setTimeout(() => setPromoError(''), 3000);
    }
  };

  // Checkout handling
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!token) {
      setIsAuthModalOpen(true);
      return;
    }
    
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ shippingAddress: { street: '123 Main', city: 'City', state: 'State', zipCode: '00000', country: 'Country' } })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter products reactively
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const safeSearch = (searchQuery || '').toLowerCase();
      const matchesSearch = (product.name || '').toLowerCase().includes(safeSearch) || 
                            (product.description || '').toLowerCase().includes(safeSearch);
      const matchesPrice = product.price <= maxPrice;
      const matchesRating = (product.rating || 0) >= minRating;
      const matchesStock = !onlyInStock || product.inStock;
      const matchesBadge = selectedBadge === 'All' || (product.badge || '') === selectedBadge.toLowerCase();
      const matchesWishlistOnly = !showWishlistOnly || wishlist.includes(product.id);

      return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesStock && matchesBadge && matchesWishlistOnly;
    });
  }, [products, selectedCategory, searchQuery, maxPrice, minRating, onlyInStock, selectedBadge, showWishlistOnly, wishlist]);

  // Totals calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const deliveryFee = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount + deliveryFee;

  if (!token) {
    return <LoginPage onLogin={(newToken) => {
      setToken(newToken);
      localStorage.setItem('token', newToken);
    }} />;
  }

  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo" onClick={() => { setSelectedCategory('All'); setShowWishlistOnly(false); }}>
          QUICK<span>CART</span>
        </div>

        <div className="search-bar-container">
          <input 
            type="text" 
            placeholder={t("searchPlaceholder")} 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Icons.Search className="search-icon" />
        </div>

        <div className="nav-actions">
          {/* Language Selector Selector */}
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as Language)}
            className="control-select"
            title="Choose Language"
          >
            <option value="en">English (EN)</option>
            <option value="kn">ಕನ್ನಡ (KN)</option>
            <option value="hi">हिंदी (HI)</option>
          </select>

          {/* Light/Dark Toggle */}
          <button 
            className="nav-btn" 
            onClick={toggleTheme} 
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? <Icons.Moon /> : <Icons.Sun />}
          </button>

          <button 
            className={`nav-btn ${showWishlistOnly ? 'active' : ''}`} 
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            title="Wishlist Favorites"
          >
            <Icons.Heart fill={wishlist.length > 0 ? 'var(--accent-rose)' : 'none'} style={{ color: wishlist.length > 0 ? 'var(--accent-rose)' : 'inherit' }} />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </button>
          
          <button 
            className="nav-btn" 
            onClick={() => {
              if (token) {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
                setCart([]);
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            title={user ? "Logout" : "Login"}
          >
            {user && user.name ? <span style={{fontSize:'0.8rem', fontWeight:600}}>{user.name.split(' ')[0]}</span> : <Icons.User />}
          </button>

          <button 
            className="nav-btn cart-btn" 
            onClick={() => setIsCartOpen(true)}
            title="Open Shopping Cart"
          >
            <Icons.ShoppingBag />
            {cart.length > 0 && <span className="badge" style={{ background: 'var(--accent-primary)', boxShadow: 'var(--glow-primary)' }}>{cart.length}</span>}
          </button>
        </div>
      </header>

      {/* Hero / Deals Carousel */}
      <section className="hero-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">⚡ QUICK {t("cyberDeals")}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Freshness powered by express lightspeed delivery.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-rose)', letterSpacing: '0.5px' }}>{t("endsIn")}:</span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <span style={{ background: 'var(--bg-secondary)', color: 'var(--accent-rose)', padding: '0.25rem 0.5rem', borderRadius: '6px', fontWeight: 'bold', border: '1px solid var(--border-color)' }}>
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span style={{ color: 'var(--accent-rose)', fontWeight: 'bold' }}>:</span>
              <span style={{ background: 'var(--bg-secondary)', color: 'var(--accent-rose)', padding: '0.25rem 0.5rem', borderRadius: '6px', fontWeight: 'bold', border: '1px solid var(--border-color)' }}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span style={{ color: 'var(--accent-rose)', fontWeight: 'bold' }}>:</span>
              <span style={{ background: 'var(--bg-secondary)', color: 'var(--accent-rose)', padding: '0.25rem 0.5rem', borderRadius: '6px', fontWeight: 'bold', border: '1px solid var(--border-color)' }}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="deals-carousel">
          {deals.map(deal => (
            <div 
              key={deal.id} 
              className="deal-card"
              onClick={() => handleDealClick(deal.id)}
              style={{
                cursor: 'pointer',
                background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${deal.emoji}) center/cover no-repeat`,
                borderColor: `${deal.color}40`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2)`
              }}
            >
              <div className="deal-content">
                <span className="deal-glow-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: deal.color, marginBottom: '0.75rem', boxShadow: `0 0 10px ${deal.color}` }}></span>
                <h4 className="deal-title" style={{ color: '#ffffff' }}>{deal.title}</h4>
                <p className="deal-subtitle" style={{ color: 'rgba(255,255,255,0.85)' }}>{deal.subtitle}</p>
              </div>
              <div className="deal-action" style={{ color: '#ffffff' }}>
                Shop Now <Icons.Plus />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-icon"><Icons.ShoppingBag /></div>
            <div>
              <div className="stat-value">48+</div>
              <div className="stat-label">Cyber Products</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><Icons.Clock /></div>
            <div>
              <div className="stat-value">15 Mins</div>
              <div className="stat-label">Ultra Fast Delivery</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><Icons.MapPin /></div>
            <div>
              <div className="stat-value">Free</div>
              <div className="stat-label">On orders above ₹50</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="categories-section">
        <h3 className="section-title" style={{ marginBottom: '1rem' }}>{t("shopByCategory")}</h3>
        <div className="category-list">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <div 
                key={cat}
                className={`category-card ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat as Category);
                  setShowWishlistOnly(false);
                }}
              >
                <img src={categoryEmojis[cat]} alt={cat} className="category-card-bg" />
                <span className="category-name">{t(cat)}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content Layout with Grid and Sidebar */}
      <div className="main-content">
        {/* Sidebar Filters */}
        <aside className="sidebar-filters">
          <div>
            <div className="filter-group-title">
              <span><Icons.Filter style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> {t("filters")}</span>
              <button 
                style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => {
                  setMaxPrice(1000);
                  setMinRating(0);
                  setOnlyInStock(false);
                  setSelectedBadge('All');
                  setShowWishlistOnly(false);
                }}
              >
                {t("reset")}
              </button>
            </div>
          </div>

          {/* Badges Filter */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{t("offerBadges")}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['All', 'Sale', 'New', 'Hot', 'Organic'].map((badge) => {
                const isActive = selectedBadge === badge;
                return (
                  <button
                    key={badge}
                    onClick={() => setSelectedBadge(badge)}
                    style={{
                      background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-primary)',
                      color: isActive ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                      border: `1.5px solid ${isActive ? 'var(--accent-secondary)' : 'var(--border-color)'}`,
                      padding: '0.35rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    {badge}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600 }}>{t("maxPrice")}</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>₹{maxPrice.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="1000" 
              step="1"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-range-slider"
            />
          </div>

          {/* Star Ratings */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t("minimumRating")}</h4>
            <div className="filter-options">
              {[4.7, 4.5, 4.3, 0].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`filter-btn ${minRating === rating ? 'active' : ''}`}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', width: '100%', justifyContent: 'space-between' }}>
                    <span>{rating === 0 ? t("anyRating") : `${rating}★ & Above`}</span>
                    {rating !== 0 && <Icons.Star fill="currentColor" style={{ width: '14px', height: '14px' }} />}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* In Stock toggle */}
          <div>
            <label className="filter-checkbox-label">
              <input 
                type="checkbox" 
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              <div className="custom-checkbox"></div>
              <span>{t("showInStockOnly")}</span>
            </label>
          </div>

          {/* Live Discount promo code helper box */}
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '16px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Icons.Gift style={{ color: 'var(--accent-primary)', fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h5 style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 800 }}>{t("promoLabel")}</h5>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                {t("promoDesc")}
              </p>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="products-wrapper">
          <div className="section-header">
            <div>
              <h3 className="section-title">
                {showWishlistOnly ? t("favoritesTitle") : t(selectedCategory)}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                Showing {filteredProducts.length} {t("items")}
              </p>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1.5px solid var(--border-color)' }}>
              <Icons.Search style={{ fontSize: '2.5rem', color: 'var(--accent-rose)', display: 'block', margin: '0 auto 1.5rem', filter: 'drop-shadow(var(--glow-rose))' }} />
              <h4 style={{ margin: '1rem 0 0.5rem', fontWeight: 700 }}>{t("noProducts")}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{t("clearFilters")}</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const isFavorite = wishlist.includes(product.id);
                return (
                  <div key={product.id} className="product-card">
                    <div className="card-top">
                      {product.badge ? (
                        <span className={`product-badge badge-${product.badge}`}>{product.badge}</span>
                      ) : (
                        <span></span>
                      )}
                      <button 
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Icons.Heart fill={isFavorite ? 'var(--accent-rose)' : 'none'} />
                      </button>
                    </div>

                    <div className="product-display">
                      <img src={product.emoji} alt={product.name} className="product-image" />
                    </div>

                    <div className="product-details">
                      <div className="product-meta">
                        <span>{product.weight}</span>
                        <span className="product-rating">
                          <Icons.Star fill="currentColor" /> {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-desc">{product.description}</p>
                    </div>

                    <div className="product-footer">
                      <div className="price-box">
                        <span className="current-price">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <button 
                        className={`add-to-cart-btn ${!product.inStock ? 'out-of-stock' : ''}`}
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        title={product.inStock ? "Add to cart" : "Out of stock"}
                      >
                        {product.inStock ? <Icons.Plus /> : <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>OUT</span>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Live Order Tracker Banner Simulation */}
      {isTrackingActive && (
        <section className="delivery-tracker-section">
          <div className="tracker-card">
            <div className="tracker-header">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>⚡ {t("trackerTitle")}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', marginTop: '0.25rem' }}>{t("trackerStatus")}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t("estimated")}: <strong style={{ color: 'var(--accent-primary)' }}>{t("mins")}</strong></span>
                <button className="sim-btn" onClick={() => setDeliveryStep(prev => (prev < 4 ? prev + 1 : 1))}>
                  {t("forceStep")}
                </button>
              </div>
            </div>

            <div className="tracker-timeline">
              <div className={`timeline-step ${deliveryStep >= 1 ? (deliveryStep === 1 ? 'active' : 'completed') : ''}`}>
                <div className="step-icon-wrapper">
                  <Icons.CheckCircle />
                </div>
                <h4 className="step-title">{t("step1")}</h4>
                <p className="step-desc">{t("step1Desc")}</p>
              </div>

              <div className={`timeline-step ${deliveryStep >= 2 ? (deliveryStep === 2 ? 'active' : 'completed') : ''}`}>
                <div className="step-icon-wrapper">
                  <Icons.Clock />
                </div>
                <h4 className="step-title">{t("step2")}</h4>
                <p className="step-desc">{t("step2Desc")}</p>
              </div>

              <div className={`timeline-step ${deliveryStep >= 3 ? (deliveryStep === 3 ? 'active' : 'completed') : ''}`}>
                <div className="step-icon-wrapper">
                  <Icons.Truck />
                </div>
                <h4 className="step-title">{t("step3")}</h4>
                <p className="step-desc">{t("step3Desc")}</p>
              </div>

              <div className={`timeline-step ${deliveryStep >= 4 ? 'completed' : ''}`}>
                <div className="step-icon-wrapper">
                  <Icons.Smile />
                </div>
                <h4 className="step-title">{t("step4")}</h4>
                <p className="step-desc">{t("step4Desc")}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Checkout Success Popup Modal */}
      {orderCompleted && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1.5px solid var(--accent-primary)', boxShadow: 'var(--glow-primary)', borderRadius: '28px', maxWidth: '420px', width: '100%', padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
            <Icons.CheckCircle style={{ fontSize: '3.5rem', color: 'var(--accent-primary)', display: 'block', margin: '0 auto 1.5rem', filter: 'drop-shadow(var(--glow-primary))' }} />
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '1rem 0 0.5rem', color: 'var(--accent-primary)' }}>{t("orderSecured")}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {t("dispatchMessage")}
            </p>
            <button 
              className="checkout-btn" 
              style={{ background: 'var(--accent-primary)', color: 'white', boxShadow: 'var(--glow-primary)' }}
              onClick={() => setOrderCompleted(false)}
            >
              {t("startTracking")}
            </button>
          </div>
        </div>
      )}

      {/* Side Shopping Drawer (Cart) */}
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)} />
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-header-title">
            <Icons.ShoppingBag style={{ color: 'var(--accent-secondary)' }} /> {t("cartTitle")}
          </div>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
            <Icons.X />
          </button>
        </div>

        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <Icons.ShoppingBag style={{ fontSize: '3.5rem', color: 'var(--accent-secondary)', display: 'block', margin: '0 auto 1.5rem', filter: 'drop-shadow(var(--glow-secondary))' }} />
              <h4 style={{ fontWeight: 700 }}>{t("cartEmpty")}</h4>
              <p style={{ fontSize: '0.8rem', textAlign: 'center' }}>{t("addItemsMsg")}</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img src={item.emoji} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h5 className="cart-item-name">{item.name}</h5>
                  <div className="cart-item-weight">{item.weight}</div>
                  <span className="cart-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
                
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}><Icons.Minus /></button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}><Icons.Plus /></button>
                </div>

                <button className="remove-item-btn" onClick={() => removeFromCart(item.id)} title="Remove item">
                  <Icons.Trash2 />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Order Summary Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            {/* Cyber Promo code element */}
            <div className="promo-code-container">
              <input 
                type="text" 
                placeholder={t("enterPromo")}
                className="promo-input"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
              />
              <button 
                className="promo-btn"
                onClick={handleApplyPromo}
                disabled={promoApplied}
                style={{
                  background: promoApplied ? 'var(--accent-primary)' : 'var(--accent-secondary)',
                  boxShadow: promoApplied ? 'var(--glow-primary)' : 'var(--glow-secondary)',
                }}
              >
                {promoApplied ? t("applied") : t("apply")}
              </button>
            </div>

            {promoError && (
              <div style={{ color: 'var(--accent-rose)', fontSize: '0.75rem', display: 'flex', gap: '0.25rem', alignItems: 'center', marginBottom: '0.75rem', fontWeight: 600 }}>
                <Icons.AlertCircle /> {promoError}
              </div>
            )}

            {promoApplied && (
              <div style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', display: 'flex', gap: '0.25rem', alignItems: 'center', marginBottom: '0.75rem', fontWeight: 600 }}>
                <Icons.CheckCircle /> Code Applied! 20% discount saved.
              </div>
            )}

            {/* Bill Details Breakdown */}
            <div className="bill-details">
              <div className="bill-row">
                <span>{t("subtotal")}</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              {promoApplied && (
                <div className="bill-row" style={{ color: 'var(--accent-primary)' }}>
                  <span>{t("discount")} (20%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="bill-row">
                <span>{t("deliveryFee")}</span>
                <span>{deliveryFee === 0 ? t("free") : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>

              {deliveryFee > 0 && (
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'right', marginTop: '-0.25rem' }}>
                  {t("addMoreForFree").replace("$T", (50 - subtotal).toFixed(2))}
                </p>
              )}

              <div className="bill-row total">
                <span>{t("billTotal")}</span>
                <span style={{ color: 'var(--accent-primary)', textShadow: 'var(--glow-primary)' }}>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              {t("secCheckout")}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>QUICKCART</h4>
            <p>{t("footerBrandDesc")}</p>
            <div className="footer-socials">
              <div className="social-btn">f</div>
              <div className="social-btn">t</div>
              <div className="social-btn">i</div>
            </div>
          </div>

          <div className="footer-links">
            <h5>{t("shopByCategory")}</h5>
            <ul>
              <li><a href="#All" onClick={() => setSelectedCategory('All')}>{t("all")}</a></li>
              <li><a href="#Fruits" onClick={() => setSelectedCategory('Fruits')}>{t("fruits")}</a></li>
              <li><a href="#Vegetables" onClick={() => setSelectedCategory('Vegetables')}>{t("vegetables")}</a></li>
              <li><a href="#Dairy" onClick={() => setSelectedCategory('Dairy')}>{t("dairy")}</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h5>{t("services")}</h5>
            <ul>
              <li><a href="#Fast">15 Min Express</a></li>
              <li><a href="#Organic">Organic Farms</a></li>
              <li><a href="#Refund">No-Questions Refund</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h5>{t("support")}</h5>
            <ul>
              <li><a href="#Help">Help Center</a></li>
              <li><a href="#Contact">000-QUICK-CART</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 QuickCart Express. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#Privacy">Privacy Policy</a>
            <a href="#Terms">Terms of Service</a>
          </div>
        </div>
      </footer>
      
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={(token: string) => {
            setToken(token);
            localStorage.setItem('token', token);
            setIsAuthModalOpen(false);
          }}
        />
      )}

      {/* Floating Buttons */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 1000 }}>
        <button 
          onClick={() => setShowHelpcenter(true)}
          style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          title="Help Center"
        >
          <Icons.AlertCircle />
        </button>
        <button 
          onClick={() => setShowChatbot(true)}
          style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-rose)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          title="Chatbot"
        >
          <Icons.Smile />
        </button>
      </div>

      {/* Chatbot Modal */}
      {showChatbot && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', width: '300px', height: '400px', background: 'var(--bg-secondary)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 1001, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <div style={{ padding: '15px', background: 'var(--accent-rose)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}><Icons.Smile /> QuickBot</h4>
            <Icons.X style={{ cursor: 'pointer' }} onClick={() => setShowChatbot(false)} />
          </div>
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} style={{ 
                background: msg.sender === 'bot' ? 'var(--bg-primary)' : 'var(--accent-primary)', 
                color: msg.sender === 'bot' ? 'var(--text-primary)' : 'white',
                padding: '10px', 
                borderRadius: '8px', 
                alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end', 
                maxWidth: '80%' 
              }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '5px' }}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendChat()}
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} 
            />
            <button onClick={handleSendChat} style={{ padding: '8px 15px', background: 'var(--accent-rose)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      )}

      {/* Helpcenter Modal */}
      {showHelpcenter && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '400px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Help Center</h3>
              <Icons.X style={{ cursor: 'pointer' }} onClick={() => setShowHelpcenter(false)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div onClick={() => setExpandedHelp(expandedHelp === 1 ? null : 1)} style={{ padding: '15px', background: 'var(--bg-primary)', borderRadius: '8px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>Track Order</h4>
                  <span>{expandedHelp === 1 ? '-' : '+'}</span>
                </div>
                {expandedHelp === 1 ? (
                  <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: 'var(--accent-primary)' }}>Your recent order is currently being packed! Check the Express Delivery Tracker for live updates.</p>
                ) : (
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Check the status of your recent orders.</p>
                )}
              </div>
              <div onClick={() => setExpandedHelp(expandedHelp === 2 ? null : 2)} style={{ padding: '15px', background: 'var(--bg-primary)', borderRadius: '8px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>Refunds & Returns</h4>
                  <span>{expandedHelp === 2 ? '-' : '+'}</span>
                </div>
                {expandedHelp === 2 ? (
                  <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: 'var(--accent-primary)' }}>We offer a 100% no-questions-asked refund on damaged goods. Simply click 'Report Issue' in your order history.</p>
                ) : (
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Learn about our return policies.</p>
                )}
              </div>
              <div onClick={() => setExpandedHelp(expandedHelp === 3 ? null : 3)} style={{ padding: '15px', background: 'var(--bg-primary)', borderRadius: '8px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>Contact Support</h4>
                  <span>{expandedHelp === 3 ? '-' : '+'}</span>
                </div>
                {expandedHelp === 3 ? (
                  <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: 'var(--accent-primary)' }}>Call us anytime at 000-QUICK-CART or email support@quickcart.com. We reply within 5 minutes!</p>
                ) : (
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Call us at 000-QUICK-CART or email support@quickcart.com</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
