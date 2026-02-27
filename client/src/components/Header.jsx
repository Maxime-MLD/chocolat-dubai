import React, { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-dxb-cream">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">
        {/* LOGO */}
        <div className="shrink-0">
          <span className="text-2xl font-serif font-bold text-dxb-dark tracking-tighter">
            DXB <span className="text-dxb-gold">Cacao</span>
          </span>
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-stone-600 font-medium">
            <li>
              <a href="#" className="hover:text-amber-600 transition">
                Nos Chocolats
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-600 transition">
                À propos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* BOUTON BURGER (Visible uniquement sur mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-amber-900 focus:outline-none p-2"
          >
            {/* Icône dynamique : Change entre Burger et Croix */}
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENU MOBILE (Slide Down) */}
      <div
        className={`md:hidden bg-dxb-cream overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col p-6 gap-4 text-stone-600 font-medium">
          <li>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="block hover:text-amber-600"
            >
              Nos Chocolats
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="block hover:text-amber-600"
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="block hover:text-amber-600"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
