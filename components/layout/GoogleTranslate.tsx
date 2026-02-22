"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Spanish", code: "es" },
  { label: "French", code: "fr" },
  { label: "German", code: "de" },
  { label: "Japanese", code: "ja" },
  { label: "Chinese (Simplified)", code: "zh-CN" },
  { label: "Arabic", code: "ar" },
  { label: "Portuguese", code: "pt" },
];

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function getCurrentLangFromCookie(): string {
  const cookie = getCookie("googtrans");
  if (!cookie) return "en";
  // googtrans cookie format: /en/es or /en/zh-CN
  const parts = cookie.split("/");
  if (parts.length >= 3 && parts[2]) return parts[2];
  return "en";
}

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lang = getCurrentLangFromCookie();
    setCurrentLang(lang);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectLanguage(code: string) {
    setCurrentLang(code);
    setIsOpen(false);

    if (code === "en") {
      // Restore original: clear cookie and reload
      document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "googtrans=; path=/; domain=" + window.location.hostname + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.reload();
      return;
    }

    // Set the googtrans cookie
    const cookieValue = `/en/${code}`;
    document.cookie = `googtrans=${encodeURIComponent(cookieValue)}; path=/`;
    document.cookie = `googtrans=${encodeURIComponent(cookieValue)}; path=/; domain=${window.location.hostname}`;

    // Trigger the hidden Google Translate select element
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    } else {
      // Widget not ready yet — reload to let it pick up the cookie
      window.location.reload();
    }
  }

  const currentLabel =
    LANGUAGES.find((l) => l.code === currentLang)?.label ?? "Language";

  return (
    // notranslate prevents Google Translate from localizing the widget itself
    <div className="relative notranslate" ref={dropdownRef} translate="no">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-1.5 text-slate-600 hover:text-[#2563A3] transition-colors px-2 py-1.5 rounded-md hover:bg-slate-50 text-sm font-medium"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4 flex-shrink-0" />
        <span className="hidden lg:inline whitespace-nowrap notranslate">{currentLabel}</span>
        <ChevronDown
          className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-lg shadow-lg z-[60] py-1 overflow-hidden notranslate"
          role="listbox"
          aria-label="Language options"
          translate="no"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={currentLang === lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                currentLang === lang.code
                  ? "text-[#2563A3] bg-blue-50 font-medium"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="notranslate">{lang.label}</span>
              {currentLang === lang.code && (
                <Check className="w-3.5 h-3.5 text-[#2563A3]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
