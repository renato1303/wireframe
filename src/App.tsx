import React, { useState, useRef } from 'react';
import { 
  Menu, X, ChevronRight, Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck, Leaf, 
  MapPin, Award, CheckCircle2, Phone, Mail, Building2, User, 
  MessageSquare, ShoppingBag, Coffee, Store, Hotel, Utensils, 
  Sparkles, ExternalLink, Send, Check, Instagram, Linkedin, Youtube, ChevronDown, Trash2, Plus, Minus, Star
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'catalogo'>('home');
  const [selectedProductModal, setSelectedProductModal] = useState<any | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Cart state
  const [cart, setCart] = useState<Array<{ id: string; name: string; weight: string; price: number; quantity: number; image: string }>>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    cnpj: ''
  });

  // Video player state & refs for 9:16 non-seekable video
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [lastValidTime, setLastValidTime] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      if (videoRef.current.currentTime > lastValidTime) {
        setLastValidTime(videoRef.current.currentTime);
      }
    }
  };

  const handleSeeking = () => {
    if (videoRef.current) {
      if (videoRef.current.currentTime > lastValidTime + 0.5) {
        videoRef.current.currentTime = lastValidTime;
      }
    }
  };

  // Catalog products matching reference image exactly
  const catalogProducts = [
    {
      id: 'gotas-210g',
      category: 'SERÁ RITUAL',
      name: 'Gotas de Será Cacau | 210g',
      weight: '210g',
      price: 103.20,
      oldPrice: 129.00,
      discount: '-20%',
      desc: 'Gotas de cacau puro em embalagem ideal para rotinas diárias e confeitarias.',
      image: '/sera-pote-reto.webp',
      soldOut: false
    },
    {
      id: 'kit-inicio',
      category: 'SERÁ CACAU',
      name: 'Kit Início Será | Gotas 105g & Xícara',
      weight: 'Kit',
      price: 143.20,
      oldPrice: 179.00,
      discount: '-20%',
      desc: 'Seleção especial contendo pote de gotas 105g e xícara cerâmica artesanal.',
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
      soldOut: false
    },
    {
      id: 'gotas-105g',
      category: 'SERÁ RITUAL',
      name: 'Gotas de Será Cacau | 105g',
      weight: '105g',
      price: 63.20,
      oldPrice: 79.00,
      discount: '-20%',
      desc: 'Cacau puro em formato de gotas, pensado para facilitar o preparo.',
      image: '/sera-pote-reto.webp',
      soldOut: false
    },
    {
      id: 'gotas-1kg',
      category: 'SERÁ CACAU',
      name: 'Gotas de Será Cacau | 1kg',
      weight: '1kg',
      price: 359.20,
      oldPrice: 449.00,
      discount: '-20%',
      desc: 'Embalagem profissional de 1kg para alta demanda e operações gastronômicas.',
      image: 'https://images.unsplash.com/photo-1582281298055-e25b89a50b7a?auto=format&fit=crop&w=800&q=80',
      soldOut: false
    },
    {
      id: 'nibs-75g',
      category: 'SERÁ CACAU',
      name: 'Nibs de Será Cacau | 75g',
      weight: '75g',
      price: 31.20,
      oldPrice: 39.00,
      discount: '-20%',
      desc: 'Amêndoas de cacau tostadas e trituradas para finalizações.',
      image: 'https://images.unsplash.com/photo-1599599810694-b5b36242c62d?auto=format&fit=crop&w=800&q=80',
      soldOut: false
    },
    {
      id: 'barra-200g',
      category: 'SERÁ RITUAL',
      name: 'Barra de Será Cacau | 200g',
      weight: '200g',
      price: 95.20,
      oldPrice: 119.00,
      discount: '-20%',
      desc: 'Bloco de cacau orgânico para raspas e confeitaria fina.',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
      soldOut: false
    },
    {
      id: 'fava-baunilha',
      category: 'SERÁ RITUAL',
      name: 'Será Fava de Baunilha | 1 unidade',
      weight: '1 un',
      price: 30.40,
      oldPrice: 38.00,
      discount: '-20%',
      desc: 'Fava de baunilha orgânica de origem para receitas refinadas.',
      image: 'https://images.unsplash.com/photo-1548848221-0c2eefb5a3dd?auto=format&fit=crop&w=800&q=80',
      soldOut: true
    },
    {
      id: 'disco-36g',
      category: 'SERÁ CACAU',
      name: 'Disco de Será Cacau | 36g',
      weight: '36g',
      price: 31.20,
      oldPrice: 39.00,
      discount: '-20%',
      desc: 'Disco de cacau puro com notas aromáticas da Costa do Cacau.',
      image: 'https://images.unsplash.com/photo-1548848221-0c2eefb5a3dd?auto=format&fit=crop&w=800&q=80',
      soldOut: false
    }
  ];

  // Products for landing page carousel (subset or same)
  const products = [
    {
      id: 'gotas-105g',
      name: 'Gotas de cacau',
      weight: '105g',
      price: 63.20,
      oldPrice: 79.00,
      desc: 'Cacau puro em formato de gotas, pensado para facilitar o preparo.',
      image: '/sera-pote-reto.webp',
      badge: 'Protagonista'
    },
    {
      id: 'gotas-210g',
      name: 'Gotas de cacau',
      weight: '210g',
      price: 103.20,
      oldPrice: 129.00,
      desc: 'Embalagem para maior rendimento na operação.',
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
      badge: 'Rendimento'
    },
    {
      id: 'barra-200g',
      name: 'Barra de cacau',
      weight: '200g',
      price: 95.20,
      oldPrice: 119.00,
      desc: 'Bloco de cacau orgânico para raspas e confeitaria fina.',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
      badge: 'Artesanal'
    },
    {
      id: 'nibs-75g',
      name: 'Nibs de cacau',
      weight: '75g',
      price: 31.20,
      oldPrice: 39.00,
      desc: 'Amêndoas de cacau tostadas e trituradas para finalizações.',
      image: 'https://images.unsplash.com/photo-1599599810694-b5b36242c62d?auto=format&fit=crop&w=800&q=80',
      badge: 'Orgânico'
    },
    {
      id: 'kit-inicio',
      name: 'Kit Início',
      weight: 'Kit',
      price: 143.20,
      oldPrice: 179.00,
      desc: 'Seleção completa com gotas e xícara.',
      image: 'https://images.unsplash.com/photo-1548848221-0c2eefb5a3dd?auto=format&fit=crop&w=800&q=80',
      badge: 'Completo'
    }
  ];

  const addToCart = (product: any, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { id: product.id, name: product.name, weight: product.weight || '105g', price: product.price, quantity: qty, image: product.image }];
    });
    setCartDrawerOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as any);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCart([]);
    }, 500);
  };

  const handleNavClick = (target: 'home' | 'catalogo' | 'origem' | 'duvidas') => {
    setMobileMenuOpen(false);
    if (target === 'catalogo') {
      setActiveTab('catalogo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'origem' || target === 'duvidas') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      setActiveTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EAE0] text-[#2B332F] selection:bg-[#C8704A] selection:text-white font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#F0EAE0]/95 backdrop-blur-md border-b border-[#2B332F]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          
          {/* Brand Logo */}
          <button onClick={() => handleNavClick('home')} className="flex items-center text-left">
            <img 
              src="/logo-sera-cacau.png" 
              alt="Será Cacau" 
              className="h-8 md:h-10 object-contain"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Nav Links (Desktop) - Strictly: Loja, Nossa origem, Dúvidas */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-[#2B332F]/80">
            <button 
              onClick={() => handleNavClick('catalogo')} 
              className={`hover:text-[#C8704A] transition-colors whitespace-nowrap ${activeTab === 'catalogo' ? 'border-b-2 border-[#C8704A] pb-0.5 font-semibold text-[#2B332F]' : ''}`}
            >
              Loja
            </button>
            <button 
              onClick={() => handleNavClick('origem')} 
              className="hover:text-[#C8704A] transition-colors whitespace-nowrap"
            >
              Nossa origem
            </button>
            <button 
              onClick={() => handleNavClick('duvidas')} 
              className="hover:text-[#C8704A] transition-colors whitespace-nowrap"
            >
              Dúvidas
            </button>
          </nav>

          {/* Right Actions: Cart Button + Menu */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCartDrawerOpen(true)}
              className="relative bg-[#2B332F] hover:bg-[#C8704A] text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
              aria-label="Carrinho de compras"
            >
              <ShoppingBag size={16} />
              <span>Carrinho</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C8704A] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2B332F]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#F0EAE0] border-b border-[#2B332F]/10 shadow-lg px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <button onClick={() => handleNavClick('catalogo')} className="text-left font-serif text-lg py-2 border-b border-[#2B332F]/5 font-semibold text-[#C8704A]">Loja</button>
            <button onClick={() => handleNavClick('origem')} className="text-left font-serif text-lg py-2 border-b border-[#2B332F]/5">Nossa origem</button>
            <button onClick={() => handleNavClick('duvidas')} className="text-left font-serif text-lg py-2 border-b border-[#2B332F]/5">Dúvidas</button>
          </div>
        )}
      </header>

      {/* MAIN VIEW ROUTING: HOME OR CATALOGO */}
      {activeTab === 'catalogo' ? (
        <main className="py-10 bg-[#F0EAE0]">
          <div className="max-w-6xl mx-auto px-6">

            <p className="text-xs sm:text-sm text-[#2B332F]/60 italic text-center max-w-xl mx-auto mb-8 leading-relaxed">
              Explore toda a linha Será — do cacau puro aos acessórios e ervas. Produtos criados com intenção, para quem busca qualidade, sabor e conexão com a natureza.
            </p>

            {/* Compact Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {catalogProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="bg-[#F0EAE0] rounded-md overflow-hidden border border-[#2B332F]/10 shadow-xs hover:shadow transition-all flex flex-col justify-between group relative text-xs"
                >
                  <div 
                    onClick={() => {
                      if (prod.id === 'gotas-105g') {
                        handleNavClick('home');
                      } else {
                        setSelectedProductModal(prod);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    <div className="relative aspect-square bg-[#EAE2D5] overflow-hidden">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* -20% Discount Badge */}
                      <div className="absolute top-2.5 left-2.5 bg-[#A85838] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                        {prod.discount}
                      </div>

                      {/* Sold Out Overlay */}
                      {prod.soldOut && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                          <span className="bg-black/80 text-white font-serif uppercase tracking-widest text-[10px] px-3 py-1.5 rounded font-bold shadow-lg">
                            VENDIDO
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 flex flex-col gap-1.5">
                      <span className="text-[9px] tracking-[0.15em] font-bold text-[#2B332F]/60 uppercase">
                        {prod.category}
                      </span>

                      <h3 className="font-serif text-xs sm:text-sm font-bold text-[#2B332F] leading-tight hover:text-[#C8704A] transition-colors">
                        {prod.name}
                      </h3>

                      {/* 5 Green Stars */}
                      <div className="flex items-center gap-0.5 text-[#4A7C59]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>

                      <div className="flex items-baseline gap-1.5 pt-0.5">
                        <span className="text-[11px] text-[#2B332F]/50 line-through">
                          R$ {prod.oldPrice.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="font-serif text-sm sm:text-base font-bold text-[#2B332F]">
                          R$ {prod.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 pt-0 flex flex-col gap-1.5">
                    <button 
                      onClick={() => setSelectedProductModal(prod)}
                      className="w-full py-1.5 bg-transparent hover:bg-black/5 text-[#2B332F] font-medium rounded text-[11px] transition-colors text-center border border-[#2B332F]/20"
                    >
                      Detalhes do produto
                    </button>
                    {!prod.soldOut && (
                      <button 
                        onClick={() => addToCart(prod)}
                        className="w-full py-2 bg-[#C8704A] hover:bg-[#b05d39] text-white font-bold tracking-wider text-[11px] uppercase rounded shadow transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={12} />
                        <span>Comprar agora</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>

      ) : (

        /* HOME LANDING PAGE */
        <main>
          
          {/* HERO B2B SECTION */}
          <section className="relative bg-[#2B332F] text-white overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
              
              {/* MOBILE VIEW (Headline -> Product Image -> Price -> Main Title -> Description at the top) */}
              <div className="lg:hidden flex flex-col gap-6">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#C4A26A] text-center">
                  Gotas de Será Cacau — 105g
                </span>

                <div className="flex justify-center my-2">
                  <div className="relative w-full max-w-[280px] aspect-[4/3] flex items-center justify-center">
                    <img 
                      src="/sera-pote-reto.webp" 
                      alt="Gotas de Será Cacau" 
                      className="w-full h-full object-contain drop-shadow-2xl scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 bg-white/5 p-5 rounded-2xl border border-white/10">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-white/70">Preço por embalagem</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-white/60 line-through">R$ {products[0].oldPrice.toFixed(2).replace('.', ',')}</span>
                      <span className="font-serif text-2xl font-bold text-white">R$ {products[0].price.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => addToCart(products[0])}
                    className="w-full bg-[#C8704A] hover:bg-[#b05d39] text-white font-bold tracking-wider text-xs uppercase py-3.5 rounded-full shadow-lg transition-all text-center"
                  >
                    COMPRAR AGORA
                  </button>
                </div>

                <h1 className="font-serif text-3xl font-bold leading-[1.1] text-balance text-center mt-2">
                  Cacau de verdade para o seu negócio ir mais longe.
                </h1>

                <p className="text-sm text-[#F0EAE0]/90 font-light leading-relaxed text-center">
                  Leve o sabor autêntico do cacau brasileiro para o seu estabelecimento. Uma experiência de cacau puro e orgânico, com possibilidades para o seu cardápio, sua prateleira e seus clientes.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                    <Leaf size={16} className="text-[#C4A26A] shrink-0" />
                    <span>100% cacau</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                    <ShieldCheck size={16} className="text-[#8FA888] shrink-0" />
                    <span>Orgânico</span>
                  </div>
                </div>
              </div>

              {/* DESKTOP VIEW (Two columns: Text left, Product right) */}
              <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
                <div className="col-span-6 flex flex-col gap-6">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#C4A26A]">
                    Gotas de Será Cacau — 105g
                  </span>

                  <h1 className="font-serif text-5xl lg:text-6xl font-bold leading-[1.1] text-balance">
                    Cacau de verdade para o seu negócio ir mais longe.
                  </h1>

                  <p className="text-lg text-[#F0EAE0]/90 max-w-xl font-light leading-relaxed">
                    Leve o sabor autêntico do cacau brasileiro para o seu estabelecimento. Uma experiência de cacau puro e orgânico, com possibilidades para o seu cardápio, sua prateleira e seus clientes.
                  </p>

                  <div className="flex flex-col gap-3 pt-2 max-w-sm">
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-white/60 line-through">R$ {products[0].oldPrice.toFixed(2).replace('.', ',')}</span>
                      <span className="font-serif text-3xl font-bold text-white">R$ {products[0].price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <p className="text-xs text-white/70">Preço por embalagem. Frete calculado na compra.</p>
                    
                    <button 
                      onClick={() => addToCart(products[0])}
                      className="w-full bg-[#C8704A] hover:bg-[#b05d39] text-white font-bold tracking-wider text-xs uppercase py-4 rounded-full shadow-lg transition-all text-center mt-1"
                    >
                      COMPRAR AGORA
                    </button>
                  </div>
                </div>

                <div className="col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-8 flex justify-center">
                    <div className="relative w-full max-w-[360px] h-[400px] flex items-center justify-center">
                      <img 
                        src="/sera-pote-reto.webp" 
                        alt="Gotas de Será Cacau" 
                        className="w-full h-full object-contain drop-shadow-2xl scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4 flex flex-col gap-3.5">
                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl">
                      <Leaf size={18} className="text-[#C4A26A] shrink-0" />
                      <span className="text-xs font-medium tracking-wide">100% cacau</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl">
                      <ShieldCheck size={18} className="text-[#8FA888] shrink-0" />
                      <span className="text-xs font-medium tracking-wide">Orgânico</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl">
                      <MapPin size={18} className="text-[#C4A26A] shrink-0" />
                      <span className="text-xs font-medium tracking-wide">Origem brasileira</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl">
                      <Award size={18} className="text-white shrink-0" />
                      <span className="text-xs font-medium tracking-wide">Produção responsável</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* PRODUTO E VÍDEO REVIEW (9:16 Video Player with restricted seeking) */}
          <section id="produto-destaque" className="py-20 bg-[#F0EAE0]">
            <div className="max-w-7xl mx-auto px-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: 9:16 Video Review Player */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-[9/16] w-full max-w-[280px] group border border-[#2B332F]/20 flex flex-col justify-between">
                    <video 
                      ref={videoRef}
                      src="/menos coisa (1).mp4"
                      className="absolute inset-0 w-full h-full object-cover"
                      playsInline
                      onTimeUpdate={handleTimeUpdate}
                      onSeeking={handleSeeking}
                      onClick={togglePlay}
                    />
                    
                    {/* Overlay click to play/pause */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={togglePlay}>
                      <div className="w-14 h-14 rounded-full bg-[#C8704A] text-white flex items-center justify-center shadow-xl">
                        {isPlaying ? <Pause size={24} /> : <Play size={24} className="translate-x-0.5" />}
                      </div>
                    </div>

                    {/* Custom Controls Bar: Pause/Resume + Volume */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-center justify-between gap-4 text-white">
                      <button 
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                        aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
                      </button>

                      <div className="flex items-center gap-2">
                        <button onClick={toggleMute} className="text-white hover:text-[#C4A26A] transition-colors">
                          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-20 accent-[#C8704A] cursor-pointer h-1.5 bg-white/30 rounded-lg"
                          aria-label="Volume"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#2B332F]/60 text-center mt-3">
                    Vídeo review exclusivo em formato 9x16.
                  </p>
                </div>

                {/* Right: Brand Info */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#C8704A]">
                    SOBRE A SERÁ CACAU
                  </span>

                  <p className="text-sm sm:text-base text-[#2B332F]/85 leading-relaxed">
                    Nascida na Costa do Cacau, na Bahia, a Será Cacau conecta o produtor ao seu estabelecimento através de um cacau orgânico, puro e de origem rastreada.
                  </p>

                  <ul className="flex flex-col gap-2.5 pt-2">
                    {[
                      "Compromisso com o cacau 100% puro e sem aditivos",
                      "Práticas orgânicas e sustentáveis na Costa do Cacau",
                      "Valorização direta dos produtores e cooperativas locais",
                      "Padrão superior e versatilidade para o seu negócio",
                      "Origem, qualidade e transparência em cada lote"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#2B332F]">
                        <CheckCircle2 size={16} className="text-[#C8704A] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </section>

          {/* APLICAÇÕES B2B (SEGMENTOS) */}
          <section id="segmentos" className="py-20 bg-white border-y border-[#2B332F]/10">
            <div className="max-w-7xl mx-auto px-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
                <div className="lg:col-span-7 flex flex-col gap-2.5">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#C8704A]">
                    PARA CADA SEGMENTO, UMA EXPERIÊNCIA ÚNICA
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B332F]">
                    Um produto, diferentes oportunidades para o seu negócio.
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-xs sm:text-sm text-[#2B332F]/70 leading-relaxed">
                    Do balcão ao cardápio, o cacau puro e orgânico da Será Cacau se adapta a diferentes modelos de negócio e cria novas experiências para os seus clientes.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="group bg-[#F0EAE0]/40 rounded-xl overflow-hidden border border-[#2B332F]/10 hover:shadow-lg transition-all flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" 
                      alt="Cafeterias" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-grow">
                    <h3 className="font-serif text-lg font-bold text-[#2B332F]">Cafeterias</h3>
                    <p className="text-xs text-[#2B332F]/70 leading-relaxed">
                      Amplie o cardápio com bebidas e surpreenda seus clientes.
                    </p>
                  </div>
                </div>

                <div className="group bg-[#F0EAE0]/40 rounded-xl overflow-hidden border border-[#2B332F]/10 hover:shadow-lg transition-all flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80" 
                      alt="Empórios" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-grow">
                    <h3 className="font-serif text-lg font-bold text-[#2B332F]">Empórios e lojas especializadas</h3>
                    <p className="text-xs text-[#2B332F]/70 leading-relaxed">
                      Um produto premium, com origem brasileira e história para contar.
                    </p>
                  </div>
                </div>

                <div className="group bg-[#F0EAE0]/40 rounded-xl overflow-hidden border border-[#2B332F]/10 hover:shadow-lg transition-all flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" 
                      alt="Hotéis e Pousadas" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-grow">
                    <h3 className="font-serif text-lg font-bold text-[#2B332F]">Hotéis e pousadas</h3>
                    <p className="text-xs text-[#2B332F]/70 leading-relaxed">
                      Valorize a experiência de quem se hospeda.
                    </p>
                  </div>
                </div>

                <div className="group bg-[#F0EAE0]/40 rounded-xl overflow-hidden border border-[#2B332F]/10 hover:shadow-lg transition-all flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" 
                      alt="Restaurantes e Confeitarias" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-grow">
                    <h3 className="font-serif text-lg font-bold text-[#2B332F]">Restaurantes e confeitarias</h3>
                    <p className="text-xs text-[#2B332F]/70 leading-relaxed">
                      Mais possibilidades na cozinha com um ingrediente sofisticado.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* ORIGEM E DIFERENCIAÇÃO */}
          <section id="origem" className="py-20 bg-[#2B332F] text-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img 
                    src="/cacau.webp" 
                    alt="Origem do Cacau na Bahia" 
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="lg:col-span-5 flex flex-col gap-3.5">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#C4A26A]">
                    ORIGEM E DIFERENCIAÇÃO
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                    Mais do que um produto. Uma história que chega até o seu negócio.
                  </h2>

                  <p className="text-[#F0EAE0]/85 text-xs sm:text-sm leading-relaxed">
                    Da Mata Atlântica à sua mesa, Será Cacau valoriza o cacau brasileiro e sua relação com o território, os produteres e práticas responsáveis de cultivo.
                  </p>
                </div>

                <div className="lg:col-span-3 flex flex-col gap-3 text-xs">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                    <Leaf size={16} className="text-[#C4A26A] shrink-0" />
                    <span>Mata Atlântica e Costa do Cacau (Bahia)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                    <ShieldCheck size={16} className="text-[#8FA888] shrink-0" />
                    <span>Sistema de cultivo cabruca</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                    <User size={16} className="text-[#C4A26A] shrink-0" />
                    <span>Produtores e cooperativas locais</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                    <Award size={16} className="text-white shrink-0" />
                    <span>Produção orgânica e responsável</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* VITRINE DE PRODUTOS (COM CARROSSEL MOBILE E GRID DESKTOP) */}
          <section id="produtos" className="py-20 bg-[#F0EAE0]">
            <div className="max-w-7xl mx-auto px-6">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#C8704A]">
                    CONHEÇA OUTRAS POSSIBILIDADES
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B332F]">
                    Conheça outras opções da linha Será Cacau.
                  </h2>
                </div>
                <button 
                  onClick={() => handleNavClick('catalogo')}
                  className="text-xs font-bold uppercase tracking-wider text-[#C8704A] hover:text-[#b05d39] flex items-center gap-1 w-fit"
                >
                  <span>Ver todos na loja</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:mx-0 lg:px-0 lg:gap-6 scrollbar-none">
                {products.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="bg-white rounded-2xl overflow-hidden border border-[#2B332F]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group w-[240px] sm:w-[280px] lg:w-auto snap-start flex-shrink-0"
                  >
                    <div>
                      <div className="relative aspect-[4/3] bg-[#F0EAE0] overflow-hidden">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 right-3 bg-[#C8704A] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                          {prod.weight}
                        </div>
                      </div>

                      <div className="p-5 flex flex-col gap-2">
                        <h3 className="font-serif text-lg font-bold text-[#2B332F]">{prod.name}</h3>
                        
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-xs text-[#2B332F]/50 line-through">R$ {prod.oldPrice.toFixed(2).replace('.', ',')}</span>
                          <span className="font-serif text-2xl font-bold text-[#2B332F]">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <p className="text-[11px] text-[#2B332F]/60">Preço por embalagem. Frete calculado na compra.</p>

                        <p className="text-xs text-[#2B332F]/70 line-clamp-2 mt-1">{prod.desc}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex flex-col gap-2">
                      <button 
                        onClick={() => setSelectedProductModal(prod)}
                        className="w-full py-2 bg-transparent hover:bg-black/5 text-[#2B332F] font-medium rounded-xl text-xs transition-colors text-center border border-[#2B332F]/20"
                      >
                        Detalhes do produto
                      </button>
                      <button 
                        onClick={() => addToCart(prod)}
                        className="w-full py-3 bg-[#C8704A] hover:bg-[#b05d39] text-white font-bold tracking-wider text-xs uppercase rounded-full shadow transition-all text-center flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} />
                        <span>COMPRAR AGORA</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* AVALIAÇÕES (TESTIMONIALS / REVIEWS) */}
          <section id="avaliacoes" className="py-20 bg-white border-y border-[#2B332F]/10">
            <div className="max-w-7xl mx-auto px-6">
              
              <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#C8704A]">
                  AVALIAÇÕES DE EMPRESAS PARCEIRAS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B332F]">
                  O que dizem os que já são parceiros
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote: "Nossa cafeteria incluiu as Gotas de Será Cacau no cardápio de bebidas especiais e o sucesso foi imediato. O sabor do cacau puro faz toda a diferença para nossos clientes.",
                    author: "Mariana Costa",
                    role: "Proprietária",
                    business: "Café Bistrô Terra"
                  },
                  {
                    quote: "Vendemos a linha completa no nosso empório gourmet. Os clientes adoram a história da Costa do Cacau e a embalagem de 105g tem excelente saída na prateleira.",
                    author: "Ricardo Silveira",
                    role: "Sócio",
                    business: "Empório Gourmet Brasil"
                  },
                  {
                    quote: "Utilizamos as gotas nas sobremesas e na confeitaria do hotel. Qualidade impecável, sabor marcante e entrega B2B super ágil e confiável.",
                    author: "Chef André Mendes",
                    role: "Chef Executivo",
                    business: "Hotel Boutique Mata Atlântica"
                  }
                ].map((rev, idx) => (
                  <div key={idx} className="bg-[#F0EAE0]/50 border border-[#2B332F]/10 p-8 rounded-2xl flex flex-col justify-between gap-6 shadow-sm">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-1 text-[#C4A26A]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-sm text-[#2B332F]/85 leading-relaxed italic">
                        "{rev.quote}"
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5 border-t border-[#2B332F]/10 pt-4">
                      <span className="font-serif text-base font-bold text-[#2B332F]">{rev.author}</span>
                      <span className="text-xs text-[#2B332F]/60">{rev.role} — {rev.business}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* DÚVIDAS FREQUENTES (FAQ) */}
          <section id="duvidas" className="py-20 bg-[#F0EAE0] border-y border-[#2B332F]/10">
            <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
              
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B332F] text-center mb-12">
                Quer saber mais?
              </h2>

              <div className="w-full flex flex-col gap-4">
                {[
                  {
                    q: "O que são as Gotas de Será Cacau?",
                    a: "São gotas de cacau puro e orgânico, produzidas na Costa do Cacau (Bahia), pensadas para facilitar o preparo, o uso em receitas e a ampliação de possibilidades no seu negócio."
                  },
                  {
                    q: "O sabor é igual ao de um chocolate doce?",
                    a: "Não. Como é cacau puro e de alta qualidade (100% cacau), o perfil de sabor é intenso, autêntico e aromático, sem adição de açúcares refinados ou gorduras hidrogenadas."
                  },
                  {
                    q: "Como usar no dia a dia?",
                    a: "Podem ser utilizadas no preparo de bebidas quentes ou geladas, derretidas para coberturas em confeitarias, ou incorporadas diretamente em receitas de doces e cafés especiais."
                  },
                  {
                    q: "Qual é o valor mínimo por compra?",
                    a: "Para pedidos B2B, o valor mínimo por compra é de R$ 700,00 em produtos da linha Será Cacau."
                  },
                  {
                    q: "Como vejo o valor do frete e as formas de pagamento?",
                    a: "O frete é calculado no momento do fechamento do pedido empresarial com base no seu endereço de entrega, e as condições de faturamento são informadas durante o processo B2B."
                  },
                  {
                    q: "Onde encontro os ingredientes e a tabela nutricional?",
                    a: "Todas as informações detalhadas sobre ingredientes, origem e tabela nutricional constam nos rótulos de cada embalagem e na descrição dos produtos da nossa vitrine."
                  }
                ].map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white border border-[#2B332F]/15 rounded-2xl overflow-hidden shadow-sm transition-all"
                    >
                      <button 
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-medium text-[#2B332F] hover:text-[#C8704A] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <div className="w-8 h-8 rounded-full bg-[#F0EAE0]/60 flex items-center justify-center text-[#C8704A] shrink-0 font-bold transition-transform duration-200">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-xs sm:text-sm text-[#2B332F]/80 leading-relaxed border-t border-[#2B332F]/5 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

        </main>
      )}

      {/* FOOTER - Strictly: Loja, Nossa origem, Dúvidas */}
      {/* FOOTER / SITEMAP */}
      <footer className="bg-[#1e2422] text-[#F0EAE0]/80 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Logo & About */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <button onClick={() => handleNavClick('home')} className="text-left w-fit">
              <img 
                src="/logo-sera-cacau.png" 
                alt="Será Cacau" 
                className="h-10 object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </button>
            <p className="text-xs text-[#F0EAE0]/70 leading-relaxed max-w-sm">
              Cacau puro e orgânico da Costa do Cacau (Bahia) para o seu negócio ir mais longe. Qualidade, origem e transparência.
            </p>
          </div>

          {/* Col 2: Sitemap Links */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Navegação</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button onClick={() => handleNavClick('catalogo')} className="text-left hover:text-white transition-colors w-fit">Loja</button>
              <button onClick={() => handleNavClick('origem')} className="text-left hover:text-white transition-colors w-fit">Nossa origem</button>
              <button onClick={() => handleNavClick('duvidas')} className="text-left hover:text-white transition-colors w-fit">Dúvidas</button>
            </div>
          </div>

          {/* Col 3: Contact & Social */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Contato & Redes</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <span>Comercial: (11) 99999-9999</span>
              <div className="flex items-center gap-3 pt-1">
                <a href="#" className="hover:text-white transition-colors p-2 bg-white/5 rounded-lg border border-white/10" aria-label="Instagram"><Instagram size={16} /></a>
                <a href="#" className="hover:text-white transition-colors p-2 bg-white/5 rounded-lg border border-white/10" aria-label="LinkedIn"><Linkedin size={16} /></a>
                <a href="#" className="hover:text-white transition-colors p-2 bg-white/5 rounded-lg border border-white/10" aria-label="YouTube"><Youtube size={16} /></a>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F0EAE0]/50 gap-4">
          <p>© {new Date().getFullYear()} Será Cacau. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </footer>

      {/* CART SLIDE-OVER DRAWER */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-[#F0EAE0] w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
            
            {/* Header */}
            <div className="p-6 border-b border-[#2B332F]/10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#C8704A]" />
                <h3 className="font-serif text-xl font-bold text-[#2B332F]">Carrinho B2B</h3>
              </div>
              <button 
                onClick={() => setCartDrawerOpen(false)}
                className="p-2 text-[#2B332F]/70 hover:text-[#2B332F] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-6 flex-grow overflow-y-auto flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 text-[#2B332F]/60">
                  <ShoppingBag size={48} className="stroke-1 text-[#2B332F]/30" />
                  <p className="text-sm font-medium">Seu carrinho empresarial está vazio.</p>
                  <button 
                    onClick={() => {
                      setCartDrawerOpen(false);
                      handleNavClick('catalogo');
                    }}
                    className="px-5 py-2.5 bg-[#2B332F] text-white rounded-xl text-xs font-medium hover:bg-[#C8704A] transition-colors"
                  >
                    Ver loja
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-[#2B332F]/10 flex items-center gap-4 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-[#F0EAE0]" referrerPolicy="no-referrer" />
                    <div className="flex-grow flex flex-col gap-1">
                      <h4 className="font-serif text-sm font-bold text-[#2B332F]">{item.name} ({item.weight})</h4>
                      <span className="text-xs font-bold text-[#C8704A]">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                      
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center border border-[#2B332F]/20 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-black/5 text-[#2B332F]"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-black/5 text-[#2B332F]"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => updateQuantity(item.id, -item.quantity)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remover"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-[#2B332F]/10 flex flex-col gap-4">
                <div className="flex items-center justify-between text-base font-bold text-[#2B332F]">
                  <span>Subtotal B2B:</span>
                  <span className="font-serif text-2xl text-[#C8704A]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <button 
                  onClick={() => {
                    setCartDrawerOpen(false);
                    setCheckoutModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-[#C8704A] hover:bg-[#b05d39] text-white font-medium rounded-xl text-sm transition-all shadow text-center"
                >
                  Finalizar Pedido B2B
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F0EAE0] rounded-3xl overflow-hidden max-w-lg w-full border border-[#2B332F]/15 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#2B332F] transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="p-8">
              {checkoutSuccess ? (
                <div className="text-center py-8 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#8FA888]/20 text-[#2B332F] flex items-center justify-center">
                    <Check size={32} />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#2B332F]">Pedido realizado com sucesso!</h3>
                  <p className="text-sm text-[#2B332F]/70 max-w-sm">
                    Seu pedido B2B foi registrado. Nossa equipe enviará os detalhes de faturamento e entrega para o seu e-mail corporativo.
                  </p>
                  <button 
                    onClick={() => {
                      setCheckoutSuccess(false);
                      setCheckoutModalOpen(false);
                    }}
                    className="mt-4 px-6 py-3 bg-[#2B332F] text-white text-sm font-medium rounded-xl hover:bg-[#C8704A] transition-colors"
                  >
                    Voltar à loja
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
                  <h3 className="font-serif text-2xl font-bold text-[#2B332F]">Finalizar Pedido Empresarial</h3>
                  <p className="text-xs text-[#2B332F]/70">Insira os dados do seu estabelecimento para faturamento.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-[#2B332F]">Nome completo *</label>
                      <input 
                        type="text" 
                        required 
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                        className="px-3 py-2 rounded-lg border border-[#2B332F]/20 text-xs bg-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-[#2B332F]">Nome da empresa *</label>
                      <input 
                        type="text" 
                        required 
                        value={checkoutForm.company}
                        onChange={(e) => setCheckoutForm({...checkoutForm, company: e.target.value})}
                        className="px-3 py-2 rounded-lg border border-[#2B332F]/20 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-[#2B332F]">CNPJ da empresa *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="00.000.000/0001-00"
                        value={checkoutForm.cnpj}
                        onChange={(e) => setCheckoutForm({...checkoutForm, cnpj: e.target.value})}
                        className="px-3 py-2 rounded-lg border border-[#2B332F]/20 text-xs bg-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-[#2B332F]">Telefone / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required 
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                        className="px-3 py-2 rounded-lg border border-[#2B332F]/20 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-[#2B332F]">E-mail corporativo *</label>
                    <input 
                      type="email" 
                      required 
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                      className="px-3 py-2 rounded-lg border border-[#2B332F]/20 text-xs bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-[#2B332F]">Endereço de entrega *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Rua, Número, Bairro, Cidade - UF"
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                      className="px-3 py-2 rounded-lg border border-[#2B332F]/20 text-xs bg-white"
                    />
                  </div>

                  <div className="pt-2 bg-white p-4 rounded-xl border border-[#2B332F]/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#2B332F]">Total a faturar:</span>
                    <span className="font-serif text-xl font-bold text-[#C8704A]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <button 
                    type="submit"
                    className="mt-2 w-full py-3.5 bg-[#C8704A] hover:bg-[#b05d39] text-white font-medium rounded-xl text-sm transition-all shadow text-center"
                  >
                    Confirmar Pedido B2B
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F0EAE0] rounded-3xl overflow-hidden max-w-xl w-full border border-[#2B332F]/15 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#2B332F] transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="relative aspect-square bg-white">
                <img 
                  src={selectedProductModal.image} 
                  alt={selectedProductModal.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#C8704A] bg-[#C8704A]/10 px-2.5 py-0.5 rounded-md w-fit">
                    {selectedProductModal.badge || selectedProductModal.category}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B332F]">{selectedProductModal.name}</h3>
                  <p className="text-xs font-semibold text-[#2B332F]/60">Apresentação: {selectedProductModal.weight}</p>
                  
                  <div className="flex items-baseline gap-2 pt-1">
                    {selectedProductModal.oldPrice && (
                      <span className="text-xs text-[#2B332F]/50 line-through">R$ {selectedProductModal.oldPrice.toFixed(2).replace('.', ',')}</span>
                    )}
                    <span className="font-serif text-2xl font-bold text-[#2B332F]">R$ {selectedProductModal.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className="text-[11px] text-[#2B332F]/60">Preço por embalagem. Frete calculado na compra.</p>

                  <p className="text-xs text-[#2B332F]/80 leading-relaxed">{selectedProductModal.desc}</p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {!selectedProductModal.soldOut && (
                    <button 
                      onClick={() => {
                        addToCart(selectedProductModal);
                        setSelectedProductModal(null);
                      }}
                      className="w-full py-3 bg-[#C8704A] hover:bg-[#b05d39] text-white font-bold tracking-wider text-xs uppercase rounded-full shadow transition-all text-center flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      <span>COMPRAR AGORA</span>
                    </button>
                  )}
                  <button 
                    onClick={() => setSelectedProductModal(null)}
                    className="w-full py-2 bg-transparent hover:bg-black/5 text-[#2B332F] font-medium rounded-xl text-xs transition-colors text-center"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
