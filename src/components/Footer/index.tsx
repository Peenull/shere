'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Mail, Phone, Facebook, MessageCircle } from 'react-feather';

export default function Footer() {
  return (
    <footer className="bg-slate-950/50 border-t border-gray-800/50 text-gray-400">
      <div className="max-w-7xl mx-auto py-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Shere */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black text-yellow-400 italic mb-4">SHERE.</h3>
            <p className="max-w-md">
              Building a community of earners across Africa. We believe in the power of networks to create financial opportunities for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white tracking-wider uppercase mb-4">Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/faq" className="hover:text-yellow-400 transition-colors">FAQ</Link></li>
              <li><Link href="/signup" className="hover:text-yellow-400 transition-colors">Join Now</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white tracking-wider uppercase mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={16} className="mr-3 text-yellow-400" />
                <a href="mailto:shereltd@gmail.com" className="hover:text-yellow-400 transition-colors">shereltd@gmail.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 text-yellow-400" />
                <a href="tel:+237676736946" className="hover:text-yellow-400 transition-colors">+237 676 736 946</a>
              </li>
              <li className="flex items-center">
                <MessageCircle size={16} className="mr-3 text-yellow-400" />
                <a href="https://wa.me/237676736946" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center">
                <Globe size={16} className="mr-3 text-yellow-400" />
                <span>Douala, Cameroon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Shere.app - All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors"><Facebook /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
