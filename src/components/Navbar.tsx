'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, Timer, Music, Volume2, VolumeX } from 'lucide-react';
import { useWorkoutMode } from '@/context/WorkoutModeContext';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Transform', href: '#transform' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Classes', href: '#classes' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isWorkoutMode, toggleWorkoutMode, isMusicPlaying, toggleMusic } = useWorkoutMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-primary/95 backdrop-blur-md border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-neon-red flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading text-2xl tracking-wider">
                NO<span className="text-neon-red">EXCUSES</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Workout Mode Toggle */}
              <button
                onClick={toggleWorkoutMode}
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  isWorkoutMode 
                    ? 'bg-neon-red text-white' 
                    : 'bg-secondary text-gray-400 hover:text-white'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span className="text-sm">Workout Mode</span>
              </button>

              {/* Music Toggle */}
              <button
                onClick={toggleMusic}
                className="p-2 rounded-full bg-secondary hover:bg-white/10 transition-all"
              >
                {isMusicPlaying ? (
                  <Volume2 className="w-5 h-5 text-neon-green" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* CTA Button */}
              <button className="hidden md:block btn-primary py-2 px-6 text-sm">
                Join Now
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-heading uppercase"
                >
                  {link.name}
                </motion.a>
              ))}
              <button className="btn-primary mt-8">
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}