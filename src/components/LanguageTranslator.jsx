import React, { useEffect, useState } from 'react';

const LanguageTranslator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'te', name: 'Telugu' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh-CN', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'it', name: 'Italian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'tr', name: 'Turkish' },
    { code: 'ko', name: 'Korean' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' },
    { code: 'nl', name: 'Dutch' },
    { code: 'id', name: 'Indonesian' }
  ];

  useEffect(() => {
    // Delay loading the translator script to let React stabilize
    const timer = setTimeout(() => {
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: '',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          }, 'google_translate_element');
        };
        const addScript = document.createElement('script');
        addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(addScript);
        setLoaded(true);
      }
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (code) => {
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
      googleCombo.value = code;
      googleCombo.dispatchEvent(new Event('change'));
    }
    setIsOpen(false);
  };

  const filtered = languages.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <div className="fixed bottom-5 left-5 z-[99999]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all border border-blue-400"
          title="Change Language"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute bottom-12 left-0 w-64 bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2">
            <div className="p-3 border-b border-slate-700 bg-slate-800">
              <h3 className="text-white text-xs font-bold mb-2 uppercase tracking-wider">Select Language</h3>
              <input 
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-900 text-white text-sm px-2 py-1.5 rounded border border-slate-700 focus:outline-none focus:border-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filtered.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-blue-600 hover:text-white transition-colors border-b border-slate-800 last:border-0"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageTranslator;
