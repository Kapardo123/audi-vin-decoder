"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Search, Info, ShieldAlert, CheckCircle2, ChevronRight, AlertCircle, 
  Copy, Check, TrendingUp, Car, Gauge, Fuel, Settings, MapPin, 
  ArrowRight, Download, Share2, Sparkles, ShieldCheck, Zap, 
  Activity, Database, LayoutDashboard, Globe
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { decodeVin, VinData } from "@/lib/vin";
import { popularPRCodes } from "@/lib/pr-codes";

export default function Home() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VinData | null>(null);
  const [error, setError] = useState("");
  const [prInput, setPrInput] = useState("");
  const [decodedPrs, setDecodedPrs] = useState<{code: string, desc: string}[]>([]);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDecode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length !== 17) {
      setError("Wprowadź poprawny 17-znakowy numer VIN.");
      return;
    }
    setLoading(true);
    setError("");
    
    try {
      const data = await decodeVin(vin);
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      setResult(data);
      
      // Better scroll logic
      setTimeout(() => {
        const element = document.getElementById('results-section');
        if (element) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } catch (err) {
      setError("Wystąpił nieoczekiwany błąd.");
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setResult(null);
    setVin("");
    setPrInput("");
    setDecodedPrs([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrDecode = () => {
    const codes = prInput.split(/[\s,;]+/).filter(c => c.length === 3);
    const decoded = codes.map(code => ({
      code: code.toUpperCase(),
      desc: popularPRCodes[code.toUpperCase()] || "Kod nieznany w naszej bazie"
    }));
    setDecodedPrs(decoded);
  };

  const carVerticalLink = `https://www.carvertical.com/pl/raport?vin=${vin}&a=YOUR_AFFILIATE_ID`;

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-100 font-sans selection:bg-[#c00] selection:text-white overflow-x-hidden">
      {/* Immersive Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c00]/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/5 rounded-full blur-[140px] animate-pulse transition-all duration-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Futuristic Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/60 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#c00] blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div className="w-9 h-9 bg-[#c00] rounded-lg flex items-center justify-center transform -skew-x-12 relative z-10 border border-white/10 shadow-lg">
                <span className="text-white not-italic text-xl">A</span>
              </div>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">Audi</span>
            <span className="text-[#c00] drop-shadow-[0_0_8px_rgba(192,0,0,0.5)]">Spec</span>
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">
            {['Dekoder', 'Kody PR', 'Wycena', 'Baza wiedzy'].map((item) => (
              <a key={item} href="#" className="hover:text-white hover:tracking-[0.4em] transition-all duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c00] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white transition-colors">
              <Globe size={18} />
            </Button>
            <Button className="bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest px-6 h-10 rounded-full backdrop-blur-md">
              Panel
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - The "Control Center" */}
      <header className="relative pt-48 pb-32 px-8 overflow-hidden z-10">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-5xl mx-auto text-center relative"
        >
          {/* Floating HUD elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-20 hidden xl:block opacity-20"
          >
            <div className="border border-zinc-700 rounded-2xl p-4 backdrop-blur-xl rotate-12">
              <Activity className="text-blue-500 w-8 h-8 mb-2" />
              <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-blue-500 animate-[loading_2s_infinite]"></div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-2 rounded-full bg-zinc-900/50 border border-white/5 backdrop-blur-xl group cursor-default">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-200 transition-colors">Digital Vehicle Diagnostic 2.0</span>
            </div>
            
            <h1 className="text-7xl md:text-[9rem] font-black tracking-[-0.04em] mb-8 italic uppercase leading-[0.85] text-white">
              Przewaga <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#c00] to-[#600] drop-shadow-[0_10px_30px_rgba(192,0,0,0.4)]">Dzięki VIN</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed font-medium tracking-tight">
              Poznaj pełną historię i specyfikację swojego pojazdu. 
              <span className="text-white ml-2">Vorsprung durch Technik w cyfrowym wydaniu.</span>
            </p>
          </motion.div>

          {/* Futuristic Search Input */}
          <motion.form 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleDecode} 
            className="relative max-w-3xl mx-auto group"
          >
            {/* Animated glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#c00]/40 via-blue-500/40 to-[#c00]/40 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-60 transition duration-1000"></div>
            
            <div className="relative flex flex-col md:flex-row items-center bg-zinc-950/40 backdrop-blur-3xl border border-white/10 rounded-[2.2rem] overflow-hidden p-3 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
              <div className="flex-1 flex items-center w-full">
                <div className="pl-6 pr-4 text-zinc-600 group-focus-within:text-[#c00] transition-colors">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <Input
                  placeholder={result ? "Zresetuj, aby wpisać nowy VIN..." : "Wpisz 17-znakowy numer VIN..."}
                  className="bg-transparent border-none text-2xl h-20 focus-visible:ring-0 placeholder:text-zinc-800 font-black tracking-widest text-white italic uppercase disabled:opacity-50"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  maxLength={17}
                  disabled={loading || !!result}
                />
              </div>
              {result ? (
                <Button 
                  type="button"
                  onClick={resetSearch}
                  className="w-full md:w-auto h-20 px-12 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xl rounded-[1.8rem] transition-all active:scale-95"
                >
                  NOWY VIN
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="w-full md:w-auto h-20 px-12 bg-[#c00] hover:bg-[#a00] text-white font-black text-xl rounded-[1.8rem] transition-all relative overflow-hidden group/btn shadow-[0_10px_20px_-10px_rgba(192,0,0,0.5)] active:scale-95" 
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite] opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Activity className="animate-spin w-6 h-6" />
                      Analiza...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 italic">
                      DEKODUJ <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    </div>
                  )}
                </Button>
              )}
            </div>

            {/* Scanning Line Animation */}
            {loading && (
              <motion.div 
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#c00] to-transparent z-20 blur-[2px]"
              />
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-16 left-0 right-0 text-[#ff3333] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </header>

      {/* Main Experience */}
      <main ref={resultsRef} className="max-w-7xl mx-auto py-24 px-8 relative z-10">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Result Header - High Tech Identity */}
              <div className="lg:col-span-12 mb-4">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-[2px] bg-[#c00]"></div>
                      <span className="text-zinc-500 text-xs font-black uppercase tracking-[0.4em]">Specyfikacja fabryczna zweryfikowana</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
                      {result.make} <span className="text-zinc-600">{result.model}</span>
                    </h2>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-3xl flex items-center gap-8 shadow-2xl relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-2">Identyfikator VIN</p>
                      <code className="text-2xl font-black font-mono text-zinc-100 tracking-[0.2em]">{vin}</code>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={copyToClipboard} 
                      className="w-14 h-14 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                    >
                      {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6 text-zinc-500" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Data Grid Area */}
              <div className="lg:col-span-8 space-y-10">
                {/* Tech Specs Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Napęd", val: result.driveType, icon: Car, color: "text-blue-500" },
                    { label: "Jednostka", val: result.engine, icon: Activity, color: "text-[#c00]", sub: result.displacement },
                    { label: "Moc", val: result.horsepower ? `${result.horsepower} KM` : "Brak danych", icon: Zap, color: "text-yellow-500" },
                    { label: "Skrzynia", val: result.transmission, icon: Settings, color: "text-purple-500" },
                    { label: "Rocznik", val: result.year, icon: LayoutDashboard, color: "text-zinc-400" },
                    { label: "Paliwo", val: result.fuelType, icon: Fuel, color: "text-green-500" },
                    { label: "Produkcja", val: result.plantCity, icon: MapPin, color: "text-orange-500", sub: result.plantCountry },
                    { label: "Konfiguracja", val: result.trim || result.series, icon: Database, color: "text-zinc-400" }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 flex items-center gap-6 group cursor-default transition-all hover:border-white/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-zinc-950 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                        <item.icon size={28} />
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-xl font-black text-white italic tracking-tight">{item.val || "N/A"}</p>
                        {item.sub && <p className="text-[10px] text-zinc-500 font-black uppercase mt-1 tracking-wider">{item.sub}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* PR Decoder - High Precision Module */}
                <Card className="bg-zinc-900/20 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c00] to-transparent"></div>
                  
                  {/* Service Sticker Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                  <CardHeader className="p-10 pb-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-[#c00] text-[8px] font-black px-2 py-0">VAG-7741</Badge>
                          <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Service Protocol</span>
                        </div>
                        <CardTitle className="text-3xl font-black italic uppercase tracking-tighter text-white">Wlepka Serwisowa (Kody PR)</CardTitle>
                        <CardDescription className="text-zinc-400 text-xs font-black uppercase tracking-widest italic">Odkoduj pełne wyposażenie fabryczne</CardDescription>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#c00] transition-colors shadow-xl">
                        <Database size={28} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-10 pt-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-4 mb-10">
                      <div className="relative flex-1 group/input">
                        <div className="absolute inset-0 bg-[#c00]/10 blur-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity"></div>
                        <Input
                          placeholder="Wpisz kody (np. 1BE, 9VS, Q1D)..."
                          className="bg-zinc-950/80 border-white/5 h-20 text-white placeholder:text-zinc-700 font-black font-mono text-2xl pl-8 rounded-[1.5rem] relative z-10 focus:border-[#c00]/30 focus:ring-0 transition-all shadow-2xl"
                          value={prInput}
                          onChange={(e) => setPrInput(e.target.value.toUpperCase())}
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-zinc-600 font-black italic text-xs pointer-events-none">
                          PR-CODE INPUT
                        </div>
                      </div>
                      <Button 
                        onClick={handlePrDecode} 
                        className="h-20 px-12 bg-white hover:bg-[#c00] hover:text-white text-black font-black uppercase italic tracking-tighter transition-all rounded-[1.5rem] active:scale-95 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)]"
                      >
                        DEKODUJ SPECYFIKACJĘ
                      </Button>
                    </div>

                    <AnimatePresence mode="wait">
                      {decodedPrs.length > 0 ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative"
                        >
                          {/* Service Sticker Look */}
                          <div className="rounded-[2rem] border border-white/10 bg-zinc-950/50 overflow-hidden shadow-inner backdrop-blur-md">
                            <div className="bg-zinc-900/80 px-8 py-4 border-b border-white/5 flex justify-between items-center">
                              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em]">Authentication: SUCCESSFUL</span>
                              <span className="text-[9px] font-black text-[#c00] uppercase tracking-[0.3em]">Audi Genuine Parts & Specs</span>
                            </div>
                            <div className="p-2">
                              <Table>
                                <TableBody>
                                  {decodedPrs.map((item, idx) => (
                                    <TableRow key={idx} className="border-white/5 hover:bg-[#c00]/5 transition-all group/row">
                                      <TableCell className="w-[120px] py-6 pl-8">
                                        <div className="flex flex-col">
                                          <span className="text-[8px] text-zinc-500 font-black uppercase mb-1">Kod PR</span>
                                          <span className="font-mono text-[#c00] font-black text-2xl tracking-tighter">{item.code}</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-6">
                                        <div className="flex flex-col">
                                          <span className="text-[8px] text-zinc-500 font-black uppercase mb-1">Opis Wyposażenia</span>
                                          <span className="text-zinc-200 font-bold text-lg group-hover/row:text-white transition-colors">{item.desc}</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right pr-8">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity">
                                          <CheckCircle2 size={14} className="text-green-500" />
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-zinc-950/20 group/empty hover:bg-zinc-950/30 transition-colors">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                          >
                            <Database className="w-16 h-16 text-zinc-700 mx-auto mb-8 group-hover/empty:text-zinc-600 transition-colors" />
                          </motion.div>
                          <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px] max-w-[280px] mx-auto leading-relaxed">
                            Wprowadź 3-znakowe kody z naklejki serwisowej, aby uzyskać pełny wgląd w duszę pojazdu
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Modules */}
              <div className="lg:col-span-4 space-y-10">
                {/* Autovista Premium Valuation */}
                {result.marketValue && (
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className="bg-zinc-900/20 backdrop-blur-3xl border border-blue-500/20 rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] -mr-24 -mt-24"></div>
                      <CardHeader className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                            <TrendingUp size={24} />
                          </div>
                          <Badge variant="outline" className="text-[10px] text-blue-400 border-blue-500/30 uppercase font-black tracking-widest px-3 py-1">Market Analysis</Badge>
                        </div>
                        <CardTitle className="text-3xl font-black italic uppercase tracking-tighter text-white">Giełda Eurotax</CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 pt-0 space-y-8">
                        <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5 shadow-inner text-center">
                          <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-3">Wartość Rynkowa (PLN)</p>
                          <div className="text-5xl font-black text-white italic tracking-tighter mb-2">
                            {result.marketValue.min.toLocaleString()} 
                          </div>
                          <div className="text-blue-500 text-2xl font-black mb-2">DO</div>
                          <div className="text-5xl font-black text-white italic tracking-tighter">
                            {result.marketValue.max.toLocaleString()}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Płynność Sprzedaży</span>
                            <span className="text-xs font-black text-green-500 uppercase italic">Optymalna</span>
                          </div>
                          <div className="h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "82%" }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            />
                          </div>
                          <p className="text-[10px] text-zinc-600 font-bold leading-relaxed italic">
                            *Algorytm uwzględnia aktualne trendy na platformach OTOMOTO i Mobile.de dla modelu {result.model}.
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="p-8 pt-0">
                        <Button className="w-full h-14 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 font-black uppercase italic tracking-tighter rounded-2xl transition-all group/val">
                          POBIERZ ARKUSZ WYCENY <Download className="ml-2 w-4 h-4 group-hover/val:translate-y-1 transition-transform" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}

                {/* carVertical Ultimate CTA */}
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="bg-gradient-to-br from-[#c00] via-[#800] to-black border-none rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(192,0,0,0.4)] relative overflow-hidden group cursor-pointer">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] -mr-32 -mt-32"></div>
                    <CardHeader className="p-8">
                      <Badge className="w-fit mb-4 bg-white text-[#c00] font-black px-4 py-1 text-xs tracking-widest rounded-full">SECURITY PROTOCOL</Badge>
                      <CardTitle className="text-4xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">
                        Sprawdź <br />Historię <br />Kryminalną
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                      <p className="text-white/70 text-sm font-bold leading-relaxed italic">
                        Ryzyko dla rocznika {result.year}: Wykryto zwiększoną aktywność korygowania liczników w tej serii Audi.
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { l: 'Baza aut skradzionych', i: ShieldAlert },
                          { l: 'Archiwum szkód AC/OC', i: Activity },
                          { l: 'Historia przebiegu', i: Gauge },
                          { l: 'Zdjęcia z aukcji', i: LayoutDashboard }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-black/40 rounded-xl p-3 border border-white/10">
                            <item.i className="w-4 h-4 text-[#c00]" />
                            <span className="text-[10px] text-white font-black uppercase tracking-widest">{item.l}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-8 pt-0">
                      <a href={carVerticalLink} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button className="w-full bg-white hover:bg-zinc-100 text-black font-black py-10 text-2xl italic tracking-tighter rounded-[1.8rem] shadow-2xl transition-all group/cv">
                          GENERUJ RAPORT <ArrowRight className="ml-3 w-8 h-8 group-hover/cv:translate-x-3 transition-transform" />
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Service Access Module */}
                <Card className="bg-zinc-900/20 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 flex items-center gap-3">
                    <Zap className="w-4 h-4 text-[#c00]" /> Szybkie Odnośniki
                  </h4>
                  <div className="space-y-4">
                    {[
                      { l: "Oficjalne Akcje Serwisowe Audi", h: "https://www.audi.pl/pl/web/pl/serwis-i-akcesoria/akcje-przywolawcze.html" },
                      { l: "Katalog Części ETKA Online", h: "#" },
                      { l: "Instrukcja Obsługi PDF", h: "#" }
                    ].map((link, idx) => (
                      <a key={idx} href={link.h} target="_blank" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group/link">
                        <span className="text-xs font-black text-zinc-300 group-hover/link:text-white">{link.l}</span>
                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {[
                { title: "Deep Scan VIN", desc: "Dostęp do globalnej bazy danych VAG. Rozpoznawanie fabryki, silnika i pełnej specyfikacji.", icon: Activity, color: "text-[#c00]" },
                { title: "Opcje Fabryczne", desc: "Jedyny dekoder z tak obszerną bazą kodów PR. Sprawdź pakiety S-line i systemy Matrix LED.", icon: Sparkles, color: "text-blue-500" },
                { title: "Wycena Rynkowa", desc: "Inteligentny algorytm szacujący wartość pojazdu na podstawie aktualnych ofert giełdowych.", icon: TrendingUp, color: "text-green-500" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="p-12 rounded-[3rem] bg-zinc-900/20 border border-white/5 backdrop-blur-3xl hover:border-[#c00]/30 transition-all duration-500 group"
                >
                  <div className={`w-20 h-20 bg-zinc-950 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-2xl ${item.color}`}>
                    <item.icon size={40} />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6 text-white">{item.title}</h3>
                  <p className="text-zinc-500 font-bold leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cinematic Footer */}
      <footer className="border-t border-white/5 py-32 px-8 mt-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c00] to-transparent"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20 relative z-10">
          <div className="md:col-span-5 space-y-10">
            <div className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-4">
              <div className="w-12 h-12 bg-[#c00] rounded-lg flex items-center justify-center transform -skew-x-12 shadow-[0_0_20px_rgba(192,0,0,0.5)]">
                <span className="text-white not-italic text-2xl">A</span>
              </div>
              Audi <span className="text-[#c00]">Spec</span>
            </div>
            <p className="text-zinc-600 max-w-md text-base font-bold leading-relaxed italic">
              Najbardziej zaawansowany darmowy dekoder VIN Audi w Europie. Tworzony przez pasjonatów dla pasjonatów. Precision is our standard.
            </p>
            <div className="flex gap-6">
              {[Share2, Settings, ShieldCheck].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="w-14 h-14 rounded-2xl border-white/5 bg-white/5 hover:bg-[#c00] hover:text-white transition-all duration-500">
                  <Icon size={20} />
                </Button>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-10">Technologia</h4>
              <ul className="space-y-6 text-xs font-black uppercase tracking-widest text-zinc-500">
                <li><a href="#" className="hover:text-[#c00] transition-colors">API Diagnostic</a></li>
                <li><a href="#" className="hover:text-[#c00] transition-colors">VAG Data Hub</a></li>
                <li><a href="#" className="hover:text-[#c00] transition-colors">Eurotax Engine</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-10">Narzędzia</h4>
              <ul className="space-y-6 text-xs font-black uppercase tracking-widest text-zinc-500">
                <li><a href="#" className="hover:text-[#c00] transition-colors">Dekoder VIN</a></li>
                <li><a href="#" className="hover:text-[#c00] transition-colors">Baza Kodów PR</a></li>
                <li><a href="#" className="hover:text-[#c00] transition-colors">Wycena Aut</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-10">Prawnie</h4>
              <ul className="space-y-6 text-xs font-black uppercase tracking-widest text-zinc-500">
                <li><a href="#" className="hover:text-[#c00] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#c00] transition-colors">Terms of Use</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-30">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
            © 2026 AUDI SPEC PRECISION. ENGINEERED FOR PERFECTION.
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c00] rounded-full"></div> VORSPRUNG DURCH TECHNIK</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
