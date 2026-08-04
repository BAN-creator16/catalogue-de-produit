import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, Plus, Minus, ChevronRight, Info } from 'lucide-react';
import { products, Product } from './types';

const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const WHATSAPP_NUMBER = "22890989454";

  const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products.filter(p => {
    return activeCategory === 'Tous' || p.category === activeCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (parsePrice(item.product.price) * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let message = `*NOUVELLE COMMANDE BKFAMILY*\n\n`;
    cart.forEach(item => {
      message += `🛒 ${item.product.name} (x${item.quantity}) - ${parsePrice(item.product.price) * item.quantity} FCFA\n`;
    });
    message += `\n*Total : ${cartTotal} FCFA*`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-[#f8f4ec] min-h-screen text-[#3d2314] font-sans selection:bg-[#e2001a] selection:text-white">
      {/* Header */}
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-[#3d2314] hover:text-[#e2001a] transition-colors">
              <Menu size={28} />
            </button>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter cursor-pointer">
              <span className="text-[#3d2314]">bk</span>
              <span className="text-[#e2001a]">family</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-bold text-[#3d2314]">
            <a href="#" className="hover:text-[#e2001a] transition-colors">Accueil</a>
            <a href="#" className="hover:text-[#e2001a] transition-colors">Produits</a>
            <a href="#" className="hover:text-[#e2001a] transition-colors">Notre Histoire</a>
          </nav>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#3d2314] hover:bg-[#f8f4ec] rounded-full transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={28} />
            <span className="hidden md:block font-bold">Panier</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 md:right-auto md:left-6 bg-[#e2001a] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="bg-[#e2001a] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-28 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left text-white md:w-1/2">
              <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                Le goût de <br className="hidden md:block" /> la joie.
              </h2>
              <p className="text-lg md:text-xl font-medium mb-8 opacity-90 max-w-xl mx-auto md:mx-0">
                Commencez votre journée avec le sourire. Découvrez notre sélection gourmande pour des moments inoubliables en famille.
              </p>
              <button className="bg-white text-[#e2001a] px-8 py-4 rounded-full font-black uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Découvrir
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white opacity-10 rounded-full scale-150" />
                <motion.img 
                  src="https://www.image2url.com/r2/default/files/1785806888737-ea3f30d3-17fd-41c1-9c90-d4132d0bc51f.png" 
                  alt="Nutella B-ready" 
                  className="w-64 md:w-96 relative z-10"
                  animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
          
          {/* Custom shape divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-24">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8f4ec"></path>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-5xl font-black text-[#3d2314] mb-4">Nos Produits</h3>
            <div className="w-24 h-2 bg-[#e2001a] mx-auto rounded-full" />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#e2001a] text-white shadow-lg shadow-red-500/30 scale-105' 
                    : 'bg-white text-[#3d2314] hover:bg-[#3d2314] hover:text-white border border-[#e8dfcf]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={product.id}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all border border-[#f0eadd] flex flex-col group"
                >
                  {/* Image Container with generous padding */}
                  <div className="relative aspect-square p-8 flex items-center justify-center bg-[#fcf9f2] group-hover:bg-[#f8f4ec] transition-colors">
                    {product.video ? (
                      <video
                        src={product.video}
                        poster={product.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          if (product.id === 10) e.currentTarget.src = "https://i.pinimg.com/1200x/a9/2d/cb/a92dcb887a1b0e776a446d3780688aa1.jpg"
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 text-center items-center">
                    <h3 className="text-xl md:text-2xl font-black text-[#3d2314] mb-3 leading-tight">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-[#3d2314]/70 mb-6 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-auto w-full">
                      <div className="text-3xl font-black text-[#e2001a] mb-6">
                        {product.price}
                      </div>
                      
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-[#3d2314] hover:bg-[#e2001a] text-white py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-colors shadow-lg active:scale-95 flex justify-center items-center gap-2"
                      >
                        <ShoppingCart size={18} /> Ajouter
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-[#3d2314]/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-[#f8f4ec] z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 bg-white border-b border-[#f0eadd] flex items-center justify-between sticky top-0 z-10">
                <h2 className="text-2xl font-black text-[#3d2314]">Mon Panier</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 bg-[#f8f4ec] text-[#3d2314] hover:bg-[#e2001a] hover:text-white rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <ShoppingCart size={40} className="text-[#e8dfcf]" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-[#3d2314] mb-2">C'est un peu vide ici !</p>
                      <p className="text-[#3d2314]/60">Découvrez nos délices et remplissez votre panier.</p>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-[#e2001a] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Voir les produits
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.product.id} className="bg-white p-4 rounded-2xl shadow-sm flex gap-4 items-center">
                      <div className="w-20 h-20 bg-[#fcf9f2] rounded-xl p-2 flex-shrink-0">
                        {item.product.video ? (
                          <video src={item.product.video} poster={item.product.image} className="w-full h-full object-contain" muted playsInline />
                        ) : (
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#3d2314] leading-tight mb-1">{item.product.name}</h4>
                        <p className="text-[#e2001a] font-black">{item.product.price}</p>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center bg-[#f8f4ec] rounded-full border border-[#f0eadd]">
                            <button onClick={() => updateQuantity(item.product.id, -1)} className="w-8 h-8 flex items-center justify-center text-[#3d2314] hover:bg-white rounded-full transition-colors">
                              <Minus size={14} strokeWidth={3} />
                            </button>
                            <span className="w-8 text-center font-bold text-[#3d2314]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, 1)} className="w-8 h-8 flex items-center justify-center text-[#3d2314] hover:bg-white rounded-full transition-colors">
                              <Plus size={14} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right self-end">
                        <p className="font-black text-[#3d2314]">{parsePrice(item.product.price) * item.quantity} F</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#f0eadd] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-[#3d2314]/70 font-bold text-lg">Total ({cartCount} art.)</span>
                    <span className="font-black text-3xl text-[#e2001a]">{cartTotal} FCFA</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-[#e2001a] hover:bg-[#c40016] text-white py-4 rounded-full font-black text-lg shadow-lg shadow-red-500/20 flex items-center justify-center gap-3 transition-transform active:scale-95"
                  >
                    Commander via WhatsApp <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="bg-white py-12 mt-20 border-t border-[#f0eadd]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-black mb-6">
            <span className="text-[#3d2314]">bk</span>
            <span className="text-[#e2001a]">family</span>
          </h2>
          <p className="text-[#3d2314]/60 font-medium mb-8 max-w-md mx-auto">
            Sélection de gourmandises et douceurs pour partager le bonheur au quotidien.
          </p>
          <div className="text-sm text-[#3d2314]/40 font-bold">
            &copy; {new Date().getFullYear()} bkfamily. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
