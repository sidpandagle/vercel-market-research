import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { CONTACT_INFO } from "@/lib/contact";

const quickLinks = [
  { href: "/reports", label: "Research Reports" },
  { href: "/blog", label: "Blog" },
  { href: "/press-releases", label: "Press Releases" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const consultingLinks = [
  { href: "/consulting/market-assessment", label: "Market Assessment" },
  { href: "/consulting/healthcare-competitive-intelligence", label: "Competitive Intelligence" },
  { href: "/consulting/rd-analysis", label: "R&D Analysis" },
  { href: "/consulting/primary-market-research", label: "Primary Research" },
  { href: "/consulting/mergers-acquisitions", label: "M&A Advisory" },
];

const legalLinks = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/refund-policy", label: "Refund Policy" },
  { href: "/legal/cancellation-policy", label: "Cancellation Policy" },
];

const socialLinks = [
  {
    href: "https://facebook.com/synapticresearch",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://instagram.com/synapticresearch",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://linkedin.com/company/synapticresearch",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://twitter.com/synapticresearch",
    label: "X (Twitter)",
    Icon: Twitter,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-6 py-14 md:py-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/images/logo.png"
                alt="Synaptic Research - Research. Insights. Intelligence."
                width={160}
                height={45}
                className="h-9 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[220px]">
              Comprehensive market intelligence and strategic insights for the global healthcare industry.
            </p>
            <div className="flex gap-3.5">
              {socialLinks.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:bg-bright-500/15 hover:text-bright-400 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Consulting services */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              Consulting
            </h3>
            <ul className="space-y-2.5">
              {consultingLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors duration-150"
              >
                <Mail className="w-4 h-4 text-bright-400 shrink-0" />
                {CONTACT_INFO.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-bright-400 shrink-0" />
                <span>USA: {CONTACT_INFO.offices.usa.phoneFormatted}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-bright-400 shrink-0" />
                <span>India: {CONTACT_INFO.offices.india.phoneFormatted}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Synaptic Research Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
