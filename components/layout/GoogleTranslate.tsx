"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Hindi", code: "hi" },
  { label: "Marathi", code: "mr" },
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
  const parts = cookie.split("/");
  if (parts.length >= 3 && parts[2]) return parts[2];
  return "en";
}

function clearGoogTransCookie() {
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  const hostname = window.location.hostname;
  // Strip www. to get the apex domain for broad cookie clearing
  const apexDomain = hostname.replace(/^www\./, "");

  document.cookie = `googtrans=; path=/; ${expiry};`;
  document.cookie = `googtrans=; path=/; domain=${hostname}; ${expiry};`;
  document.cookie = `googtrans=; path=/; domain=.${apexDomain}; ${expiry};`;
  document.cookie = `googtrans=; path=/; domain=${apexDomain}; ${expiry};`;
}

function setGoogTransCookie(code: string) {
  const value = encodeURIComponent(`/en/${code}`);
  const hostname = window.location.hostname;
  const apexDomain = hostname.replace(/^www\./, "");

  document.cookie = `googtrans=${value}; path=/;`;
  document.cookie = `googtrans=${value}; path=/; domain=${hostname};`;
  document.cookie = `googtrans=${value}; path=/; domain=.${apexDomain};`;
}

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLang(getCurrentLangFromCookie());
  }, []);

  // When a non-English language is active, Google Translate mutates the DOM with
  // <font> wrappers. Next.js client-side navigation then tries to reconcile against
  // that mutated DOM and throws. Fix: intercept all internal anchor clicks and
  // convert them to full-page navigations so React never touches a translated DOM.
  useEffect(() => {
    if (currentLang === "en") return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        !anchor.target &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = anchor.href;
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [currentLang]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function selectLanguage(code: string) {
    setIsOpen(false);

    if (code === "en") {
      clearGoogTransCookie();
      window.location.reload();
      return;
    }

    setGoogTransCookie(code);
    // Always reload — avoids React/Google Translate DOM conflict and works
    // consistently across environments.
    window.location.reload();
  }

  const currentLabel = LANGUAGES.find((l) => l.code === currentLang)?.label ?? "Language";

  return (
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
