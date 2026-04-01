import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionValueEvent } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag, Info, Mail, MapPin, MessageCircle, X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { products, Product } from './types';

const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.div>
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

  const productVideos: Record<string, string> = {
    "Kinder Bueno": "https://image2url.com/r2/default/videos/1773063494650-5da6f4ce-0781-4068-8694-7ddf5829e551.mp4",
    "Mini M&M'S": "https://image2url.com/r2/default/videos/1773066092696-402ef6bb-19be-4578-bc89-a548c098eb36.mp4",
    "Biscuit Nutella": "https://image2url.com/r2/default/videos/1774140719969-45600ee8-0181-4fa2-9ad8-33affe449a32.mp4",
    "Nutella B-ready (x6)": "https://image2url.com/r2/default/videos/1775077047132-c2ae0cf0-f547-4bac-8931-2e6b6e39f7dc.mp4"
  };
  const videoUrl = productVideos[product.name];

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
      initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`absolute inset-0 w-full h-full shadow-2xl rounded-xl md:rounded-r-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 ${
        product.name === "Mini M&M'S" 
          ? "bg-white/40 backdrop-blur-3xl" 
          : "bg-stone-900/40 backdrop-blur-xl"
      }`}
      style={{ 
        transformOrigin: "left center", 
        backfaceVisibility: "hidden",
        willChange: "transform, opacity"
      }}
    >
      {/* Background Elements for M&M'S - Trapped in ice effect */}
      {product.name === "Mini M&M'S" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-red-500/20 rounded-full blur-2xl" />
          <div className="absolute top-[40%] right-[10%] w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl" />
          <div className="absolute bottom-[20%] left-[15%] w-36 h-36 bg-blue-500/20 rounded-full blur-2xl" />
          <div className="absolute top-[60%] left-[40%] w-28 h-28 bg-green-500/20 rounded-full blur-2xl" />
          <div className="absolute bottom-[10%] right-[30%] w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
          {/* Frost texture overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/ice-age.png')] opacity-10 mix-blend-overlay" />
        </div>
      )}
      {/* Product Image Section - Made larger on mobile with Levitation Effect */}
      <div className="w-full md:w-1/2 h-[50%] md:h-full relative overflow-hidden group/img flex items-center justify-center p-4 md:p-12">
        <div className="relative w-full h-full flex items-center justify-center">
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

            {videoUrl ? (
              <div className="relative w-full h-full flex items-center justify-center">
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
                  key={videoUrl}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isVideoLoading ? 0 : 1
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 }
                  }}
                  src={videoUrl}
                  poster={product.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedData={() => setIsVideoLoading(false)}
                  className="max-w-full max-h-[80%] object-contain drop-shadow-2xl z-10 relative"
                />
              </div>
            ) : (
              <motion.img 
                initial={{ scale: 1, opacity: 0, rotate: -10 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  rotate: 0
                }}
                transition={{ 
                  default: { delay: 0.2, type: "spring", stiffness: 200, damping: 20 }
                }}
                whileHover={{ rotate: 2 }}
                src={product.image} 
                alt={product.name}
                className="max-w-full max-h-[80%] object-contain drop-shadow-2xl z-10 relative"
                referrerPolicy="no-referrer"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            )}
          </div>
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
      <div className={`w-full md:w-1/2 p-6 md:p-12 pb-24 md:pb-12 flex flex-col justify-center overflow-y-auto custom-scrollbar relative z-20 ${product.name === "Mini M&M'S" ? "text-stone-900" : "text-[#fffcf5]"}`}>
        {/* Subtle background glow to separate from image slightly without a line */}
        <div className={`absolute inset-0 bg-gradient-to-br pointer-events-none -z-10 ${product.name === "Mini M&M'S" ? "from-white/40 to-transparent" : "from-black/20 to-transparent"}`} />
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
          className={`text-2xl md:text-5xl font-serif font-light mb-2 md:mb-6 leading-tight tracking-tight ${product.name === "Mini M&M'S" ? "text-stone-900" : "text-white"}`}
          delay={0.4}
        />
        
        <AnimatedText 
          text={product.description} 
          className={`${product.name === "Mini M&M'S" ? "text-stone-600" : "text-stone-300"} text-xs md:text-base mb-4 md:mb-8 leading-relaxed font-light`}
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
              <span className={`block text-[10px] uppercase tracking-widest ${product.name === "Mini M&M'S" ? "text-stone-500" : "text-stone-400"} mb-1`}>Prix</span>
              <span className={`text-xl md:text-3xl font-serif font-bold ${product.name === "Mini M&M'S" ? "text-stone-900" : "text-white"}`}>{product.price}</span>
            </div>
            
            {product.available !== false ? (
              <div className={`flex items-center ${product.name === "Mini M&M'S" ? "bg-white/60 text-stone-900 border-black/10" : "bg-black/40 text-white border-white/10"} backdrop-blur-md rounded-full p-1 border shadow-sm`}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${product.name === "Mini M&M'S" ? "hover:bg-black/5" : "hover:bg-white/20"} transition-all active:scale-90`}
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 md:w-10 text-center font-medium text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${product.name === "Mini M&M'S" ? "hover:bg-black/5" : "hover:bg-white/20"} transition-all active:scale-90`}
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <div className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest ${product.name === "Mini M&M'S" ? "bg-stone-200 text-stone-600" : "bg-white/10 text-white/60"}`}>
                Bientôt disponible
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            {product.available !== false ? (
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOrder}
                className="bg-[#25D366] text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-lg font-bold"
              >
                <MessageCircle size={20} fill="white" />
                <span className="text-xs md:text-sm uppercase tracking-widest">Commander via WhatsApp</span>
              </motion.button>
            ) : (
              <button 
                disabled
                className={`px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all font-bold cursor-not-allowed ${product.name === "Mini M&M'S" ? "bg-stone-300 text-stone-500" : "bg-white/5 text-white/40 border border-white/10"}`}
              >
                <span className="text-xs md:text-sm uppercase tracking-widest">Indisponible pour le moment</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Cover = ({ onStart }: { onStart: () => void; key?: React.Key }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX / window.innerWidth) - 0.5;
        const y = (e.touches[0].clientY / window.innerHeight) - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
    window.addEventListener('touchstart', handleGlobalTouchMove, { passive: true });

    let interval: any;
    const initSketchfab = () => {
      if (!iframeRef.current || !(window as any).Sketchfab) return false;
      
      const client = new (window as any).Sketchfab('1.12.1', iframeRef.current);
      client.init('99a623a4cbd84b8488050ac8162705b5', {
        success: (api: any) => {
          api.start();
          api.addEventListener('viewerready', () => {
            apiRef.current = api;
            setIsLoaded(true);
            // Set initial camera position (targetZ = 6 to move rabbit down)
            api.setCameraLookAt([0, -20, 6], [0, 0, 6], 0);
          });
        },
        error: () => {
          console.error('Sketchfab API error');
        },
        autostart: 1,
        preload: 1,
        transparent: 1,
        ui_controls: 0,
        ui_infos: 0,
        ui_inspector: 0,
        ui_stop: 0,
        ui_watermark: 0,
        ui_hint: 0,
        double_click: 0,
        scrollwheel: 0,
        navigation: 0
      });
      return true;
    };

    // Retry initialization if script not ready
    if (!initSketchfab()) {
      interval = setInterval(() => {
        if (initSketchfab()) clearInterval(interval);
      }, 500);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchstart', handleGlobalTouchMove);
      if (interval) clearInterval(interval);
    };
  }, []);

  // Update camera based on mouse movement with maximum sensitivity
  useMotionValueEvent(mouseX, "change", (x) => {
    if (apiRef.current && isLoaded && apiRef.current.setCameraLookAt) {
      const y = mouseY.get();
      // theta (horizontal rotation)
      const theta = x * 2; 
      const phi = y * 1.5;
      
      const radius = 20;
      const targetZ = 6; // Offset to move the rabbit down in the frame
      const camX = radius * Math.sin(theta) * Math.cos(phi);
      const camY = -radius * Math.cos(theta) * Math.cos(phi);
      const camZ = radius * Math.sin(phi) + targetZ;
      
      apiRef.current.setCameraLookAt([camX, camY, camZ], [0, 0, targetZ], 0);
    }
  });

  useMotionValueEvent(mouseY, "change", (y) => {
    if (apiRef.current && isLoaded && apiRef.current.setCameraLookAt) {
      const x = mouseX.get();
      const theta = x * 2;
      const phi = y * 1.5;
      
      const radius = 20;
      const targetZ = 6; // Offset to move the rabbit down in the frame
      const camX = radius * Math.sin(theta) * Math.cos(phi);
      const camY = -radius * Math.cos(theta) * Math.cos(phi);
      const camZ = radius * Math.sin(phi) + targetZ;
      
      apiRef.current.setCameraLookAt([camX, camY, camZ], [0, 0, targetZ], 0);
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    if (apiRef.current && isLoaded && apiRef.current.setCameraLookAt) {
      apiRef.current.setCameraLookAt([0, -20, 6], [0, 0, 6], 1.5); // Smooth return
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ rotateY: -90, opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 bg-stone-900/40 backdrop-blur-xl text-[#fffcf5] flex flex-col items-center justify-center p-8 md:p-12 pb-24 md:pb-12 text-center shadow-2xl rounded-r-lg border-l border-white/10 overflow-hidden"
      style={{ 
        transformOrigin: "left center",
        willChange: "transform, opacity"
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a120d]/90 via-[#1a120d]/70 to-[#1a120d]/95" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8 md:gap-16">
        {/* Left Side: Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 order-2 md:order-1">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-px bg-white/30 mb-8 hidden md:block" 
          />
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif italic mb-4 drop-shadow-lg"
          >
            bkfamily
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xs md:text-lg tracking-[0.4em] uppercase font-light mb-8 md:mb-12 opacity-80"
          >
            Douceurs & Célébrations
          </motion.p>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-24 h-px bg-white/30 mb-8 md:mb-12" 
          />
          
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            onClick={onStart}
            className="bg-white/10 backdrop-blur-md border border-white/20 px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-[#fffcf5] hover:text-[#3d2b1f] transition-all duration-500 group flex items-center gap-3 shadow-xl"
          >
            <span className="text-xs md:text-sm tracking-widest uppercase font-medium">Explorer le Catalogue</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Right Side: 3D Model with Tilt Effect */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 20, opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{ 
            rotateX, 
            rotateY, 
            perspective: 1200,
            transformStyle: "preserve-3d"
          }}
          className="flex-1 w-full max-w-md h-[300px] md:h-[450px] relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm order-1 md:order-2 mt-4 md:mt-8"
        >
          <iframe
            ref={iframeRef}
            title="bkfamily 3D Experience"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src="https://sketchfab.com/models/99a623a4cbd84b8488050ac8162705b5/embed?autostart=1&preload=1&transparent=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_hint=0"
            className="w-full h-full pointer-events-none z-10"
          ></iframe>
          
          {/* Interaction Hint Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2, duration: 3, repeat: Infinity, repeatDelay: 5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[8px] uppercase tracking-widest border border-white/20 whitespace-nowrap z-30"
          >
            Le lapin suit votre regard
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 md:bottom-12 text-[8px] md:text-[10px] tracking-[0.3em] uppercase opacity-40 z-10">
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

  // Preload images for faster rendering
  useEffect(() => {
    products.forEach(product => {
      const img = new Image();
      img.src = product.image;
    });
  }, []);

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
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#5c4033]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#3d2b1f]/50 rounded-full blur-3xl" />
        <div className="absolute inset-0 backdrop-blur-xl" />
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
