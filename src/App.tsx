import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag, Info, Mail, MapPin, MessageCircle, X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { products, Product } from './types';

const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const Page = ({ product, index, total, direction }: { 
  product: Product; 
  index: number; 
  total: number; 
  direction: number;
  key?: React.Key;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const WHATSAPP_NUMBER = "22890989454";

  const handleOrder = () => {
    const unitPrice = parsePrice(product.price);
    let message = `Bonjour bkfamily, je souhaite commander :\n\nArticle : ${product.name}\nQuantité : ${quantity}`;
    
    if (unitPrice > 0) {
      const totalPrice = unitPrice * quantity;
      message += `\nPrix Unitaire : ${product.price}\n*Total : ${totalPrice} FCFA*`;
    } else {
      message += `\nPrix : ${product.price}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.div
      initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0, scale: 0.95 }}
      animate={{ rotateY: 0, opacity: 1, scale: 1 }}
      exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 w-full h-full bg-stone-900/40 backdrop-blur-xl shadow-2xl rounded-xl md:rounded-r-2xl overflow-hidden flex flex-col md:flex-row border border-white/10"
      style={{ 
        transformOrigin: "left center", 
        backfaceVisibility: "hidden",
        willChange: "transform, opacity"
      }}
    >
      {/* Product Image Section - Made larger on mobile with Levitation Effect */}
      <div className={`w-full md:w-1/2 h-[50%] md:h-full relative overflow-hidden group/img flex items-center justify-center ${product.name === "Kinder Bueno" ? "p-0" : "p-4 md:p-12"}`}>
        <div className="relative w-full h-full flex items-center justify-center">
          {product.name === "Kinder Bueno" ? (
            <div className="relative w-full h-full">
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-stone-900/20 backdrop-blur-md z-20">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                  />
                </div>
              )}
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: isVideoLoading ? 0 : 1 }}
                transition={{ duration: 0.8 }}
                src="https://image2url.com/r2/default/videos/1773063494650-5da6f4ce-0781-4068-8694-7ddf5829e551.mp4"
                autoPlay
                loop
                muted
                playsInline
                onCanPlayThrough={() => setIsVideoLoading(false)}
                className="w-full h-full object-cover z-10 relative"
              />
              {/* Seamless transition gradients */}
              <div className="absolute inset-0 z-11 pointer-events-none">
                {/* Desktop: Fade to right */}
                <div className="hidden md:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/60 to-transparent" />
                {/* Mobile: Fade to bottom */}
                <div className="md:hidden absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                {/* General subtle overlay */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Main Product Image */}
              <div className="relative flex-1 flex items-center justify-center">
                {/* Levitation Shadow */}
                <motion.div 
                  animate={{ 
                    scale: [1, 0.7, 1],
                    opacity: [0.3, 0.15, 0.3],
                    filter: ["blur(12px)", "blur(16px)", "blur(12px)"]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-[15%] w-24 md:w-32 h-4 md:h-6 bg-black/20 rounded-[100%] z-0"
                />

                <motion.img 
                  initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    rotate: 0,
                    y: [0, -20, 0] 
                  }}
                  transition={{ 
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    default: { delay: 0.2, type: "spring", stiffness: 200, damping: 20 }
                  }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  src={product.image} 
                  alt={product.name}
                  className="max-w-full max-h-[80%] object-contain drop-shadow-2xl z-10 relative"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}
        </div>
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-white border border-white/20 z-30 shadow-lg"
        >
          {product.category}
        </motion.div>
      </div>

      {/* Product Info Section */}
      <div className="w-full md:w-1/2 p-6 md:p-12 pb-24 md:pb-12 flex flex-col justify-center text-[#fffcf5] overflow-y-auto custom-scrollbar relative z-20">
        {/* Subtle background glow to separate from image slightly without a line */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none -z-10" />
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-xs md:text-sm font-serif italic text-stone-400"
        >
          bkfamily — {index + 1} / {total}
        </motion.div>
        
        <AnimatedText 
          text={product.name} 
          className="text-2xl md:text-5xl font-serif font-light mb-2 md:mb-6 leading-tight tracking-tight text-white"
          delay={0.4}
        />
        
        <AnimatedText 
          text={product.description} 
          className="text-stone-300 text-xs md:text-base mb-4 md:mb-8 leading-relaxed font-light"
          delay={0.6}
        />
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3 md:gap-6 mt-auto"
        >
          <div className="flex items-center justify-between">
            <div className="cursor-default">
              <span className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1">Prix</span>
              <span className="text-xl md:text-3xl font-serif font-bold text-white">{product.price}</span>
            </div>
            
            <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-sm text-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white active:scale-90"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 md:w-10 text-center font-medium text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white active:scale-90"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOrder}
              className="bg-[#25D366] text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-lg font-bold"
            >
              <MessageCircle size={20} fill="white" />
              <span className="text-xs md:text-sm uppercase tracking-widest">Commander via WhatsApp</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Cover = ({ onStart }: { onStart: () => void; key?: React.Key }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ rotateY: -90, opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 bg-stone-900/40 backdrop-blur-xl text-[#fffcf5] flex flex-col items-center justify-center p-12 pb-24 md:pb-12 text-center shadow-2xl rounded-r-lg border-l border-white/10 overflow-hidden"
      style={{ 
        transformOrigin: "left center",
        willChange: "transform, opacity"
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a120d]/90 via-[#1a120d]/70 to-[#1a120d]/95" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-24 h-px bg-white/30 mb-8" 
        />
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl md:text-8xl font-serif italic mb-4 drop-shadow-lg"
        >
          bkfamily
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm md:text-lg tracking-[0.4em] uppercase font-light mb-12 opacity-80"
        >
          Douceurs & Célébrations
        </motion.p>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-24 h-px bg-white/30 mb-12" 
        />
        
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={onStart}
          className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-full hover:bg-[#fffcf5] hover:text-[#3d2b1f] transition-all duration-500 group flex items-center gap-3 shadow-xl"
        >
          <span className="text-sm tracking-widest uppercase font-medium">Explorer le Catalogue</span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
      
      <div className="absolute bottom-12 text-[10px] tracking-[0.3em] uppercase opacity-40 z-10">
        L'Art de Recevoir — Depuis 2026
      </div>
    </motion.div>
  );
};

const EndPage = ({ onRestart }: { onRestart: () => void; key?: React.Key }) => {
  return (
    <motion.div 
      initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
      animate={{ rotateY: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 bg-stone-900/40 backdrop-blur-3xl text-[#fffcf5] flex flex-col items-center justify-center p-6 md:p-12 pb-24 md:pb-12 text-center shadow-2xl rounded-xl md:rounded-r-2xl border border-white/10 overflow-y-auto custom-scrollbar"
      style={{ transformOrigin: "left center" }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-serif italic mb-6 tracking-tight">L'Excellence bkfamily</h2>
        <p className="text-stone-300 max-w-lg mb-12 leading-relaxed font-light text-sm md:text-lg italic">
          "bkfamily n'est pas seulement une marque, c'est une promesse d'exception. Nous sélectionnons les ingrédients les plus nobles pour créer des moments inoubliables. Que ce soit pour un cadeau prestigieux ou un pur plaisir personnel, nous transformons chaque dégustation en un souvenir éternel."
        </p>
      </motion.div>

      <div className="grid gap-4 md:gap-6 mb-12 w-full max-w-sm">
        <motion.div 
          whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
          className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
            <MapPin size={20} />
          </div>
          <div className="text-left">
            <p className="text-[9px] uppercase tracking-widest opacity-50">Localisation</p>
            <p className="text-xs md:text-sm font-medium">Tokoin Solidarité, Lomé, Togo</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
          className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
            <Mail size={20} />
          </div>
          <div className="text-left">
            <p className="text-[9px] uppercase tracking-widest opacity-50">Email Direct</p>
            <p className="text-xs md:text-sm font-medium">jbvnn55@gmail.com</p>
          </div>
        </motion.div>

        <motion.a 
          href="https://wa.me/22890989454"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-4 bg-[#25D366] p-4 rounded-2xl text-white shadow-xl shadow-[#25D366]/20 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle size={24} fill="white" />
          </div>
          <div className="text-left">
            <p className="text-[9px] uppercase tracking-widest opacity-80">WhatsApp Business</p>
            <p className="text-sm font-bold">+228 90 98 94 54</p>
          </div>
        </motion.a>
      </div>

      <button 
        onClick={onRestart}
        className="text-white/30 hover:text-white transition-colors flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] mt-4"
      >
        <ChevronLeft size={14} />
        Revenir à l'accueil
      </button>
    </motion.div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(-1);
  const [direction, setDirection] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Tous');

  const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = activeCategory === 'Tous' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const nextPage = () => {
    if (currentPage < filteredProducts.length) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > -1) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center p-4 md:p-12 overflow-x-hidden bg-[#1a120d] pt-8 pb-32 md:py-24 relative">
      {/* Glass Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#2b1d14]" />
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#5c4033]/40 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#3d2b1f]/50 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 backdrop-blur-2xl" />
      </div>

      {/* Book Wrapper with Perspective */}
      <div className="relative z-10 w-full max-w-6xl perspective-1000">
        {/* Book Container */}
        <div className="relative w-full aspect-[4/7] md:aspect-[16/9] lg:aspect-[16/8] flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden bg-stone-900/20 backdrop-blur-xl border border-white/10 mb-8 md:mb-0">
          
          {/* Left Side (Static Spine/Back) */}
          <div className="hidden md:block w-16 bg-gradient-to-r from-[#1a120d] via-[#2b1d14] to-[#3d2b1f] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.5)] border-r border-black/40 relative">
            <div className="absolute inset-y-0 right-0 w-px bg-white/5" />
          </div>

          {/* Right Side (Flipping Pages) */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {currentPage === -1 ? (
                <Cover key="cover" onStart={nextPage} />
              ) : currentPage === filteredProducts.length ? (
                <EndPage key="end" onRestart={() => setCurrentPage(-1)} />
              ) : (
                <Page 
                  key={`${activeCategory}-${filteredProducts[currentPage].id}`}
                  product={filteredProducts[currentPage]}
                  index={currentPage}
                  total={filteredProducts.length}
                  direction={direction}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Improved for Mobile */}
      <div className="fixed md:relative bottom-6 md:bottom-auto left-0 right-0 z-50 flex justify-center items-center gap-8 md:gap-24 px-6 md:px-0 md:mt-12">
        <motion.button 
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevPage}
          disabled={currentPage === -1}
          className={`p-3 md:p-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-xl transition-all shadow-2xl ${currentPage === -1 ? 'opacity-10 cursor-not-allowed' : 'text-white hover:bg-white/20'}`}
        >
          <ChevronLeft size={20} className="md:w-10 md:h-10" />
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextPage}
          disabled={currentPage === filteredProducts.length}
          className={`p-3 md:p-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-xl transition-all shadow-2xl ${currentPage === filteredProducts.length ? 'opacity-10 cursor-not-allowed' : 'text-white hover:bg-white/20'}`}
        >
          <ChevronRight size={20} className="md:w-10 md:h-10" />
        </motion.button>
      </div>

      {/* Info Icon */}
      <div className="fixed top-8 left-8 text-stone-400 hover:text-stone-600 transition-colors cursor-help z-50">
        <Info size={20} />
      </div>
    </div>
  );
}
