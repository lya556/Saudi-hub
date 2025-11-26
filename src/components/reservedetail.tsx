import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, MapPin, Calendar, Thermometer, Wind, Phone, Mail, Twitter, 
  Instagram, Star, TrendingUp, Camera, Tent, Footprints, Image as ImageIcon,
  X, Move, Maximize
} from 'lucide-react';
import { Reserve } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ReserveDetailProps {
  reserve: Reserve;
  onBack: () => void;
  onOpenBooking: () => void;
}

const VirtualTourModal = ({ isOpen, onClose, title }: { isOpen: boolean; onClose: () => void; title: string }) => {
    const [position, setPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) setPosition(0);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX - position);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        setPosition(e.clientX - startX);
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX - position);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        setPosition(e.touches[0].clientX - startX);
    };

    return (
        <div className="fixed inset-0 z-[3000] bg-black flex flex-col animate-fade-in">
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="bg-red-600 text-white px-2 py-0.5 text-xs font-bold rounded animate-pulse">LIVE</div>
                    <h3 className="text-white font-bold text-lg drop-shadow-md">{title} - جولة افتراضية 360°</h3>
                </div>
                <button 
                    onClick={onClose} 
                    className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
                >
                    <X size={24}/>
                </button>
            </div>
            
            <div 
                ref={containerRef}
                className="flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden relative select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
            >
                 <div 
                    className="absolute inset-0 h-full"
                    style={{ 
                        backgroundImage: 'url("https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=3000&auto=format&fit=crop")', 
                        backgroundSize: 'cover',
                        width: '400%',
                        backgroundPosition: `${position}px center`,
                        backgroundRepeat: 'repeat-x',
                        transition: isDragging ? 'none' : 'background-position 0.2s ease-out'
                    }}
                 />
                 
                 <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                    <div className="w-8 h-8 border border-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full absolute"></div>
                 </div>

                 <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/60 px-6 py-3 rounded-full text-white pointer-events-none backdrop-blur-sm flex items-center gap-3 border border-white/10 shadow-xl">
                    <Move size={20} className="animate-pulse" />
                    <span className="text-sm font-medium">اسحب الشاشة للتحرك في كل الاتجاهات</span>
                 </div>
            </div>
        </div>
    );
};

export const ReserveDetail: React.FC<ReserveDetailProps> = ({ reserve, onBack, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'eco' | 'activities' | 'gallery'>('info');
  const [isTourOpen, setIsTourOpen] = useState(false);

  const statsData = [
    { name: 'الزوار شهرياً', value: reserve.stats.monthlyVisitors },
    { name: 'التقييم', value: reserve.stats.rating * 1000 },
  ];

  return (
    <div className="animate-fade-in bg-stone-50 min-h-screen pb-20">
      
      <VirtualTourModal 
        isOpen={isTourOpen} 
        onClose={() => setIsTourOpen(false)} 
        title={reserve.name}
      />

      <div className="relative h-[60vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${reserve.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
        
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full transition-all"
          >
            <ArrowRight className="w-5 h-5" />
            عودة للخريطة
          </button>
        </div>

        <div className="absolute bottom-0 w-full p-8 md:p-16 text-white z-10">
            <div className="container mx-auto">
                <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {reserve.type}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{reserve.name}</h1>
                <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-200">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                        {reserve.region}
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-400" />
                        تأسست: {reserve.established}
                    </div>
                    <div className="flex items-center gap-2">
                        <Thermometer className="w-5 h-5 text-emerald-400" />
                        {reserve.climate}
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="sticky top-0 bg-white shadow-md z-30">
        <div className="container mx-auto px-4 flex justify-center md:justify-start gap-8 overflow-x-auto py-4">
          <button 
            onClick={() => setActiveTab('info')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'info' ? 'border-emerald-600 text-emerald-800 font-bold' : 'border-transparent text-gray-500'}`}
          >
            معلومات عامة
          </button>
          <button 
            onClick={() => setActiveTab('eco')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'eco' ? 'border-emerald-600 text-emerald-800 font-bold' : 'border-transparent text-gray-500'}`}
          >
            النظام البيئي
          </button>
          <button 
            onClick={() => setActiveTab('activities')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'activities' ? 'border-emerald-600 text-emerald-800 font-bold' : 'border-transparent text-gray-500'}`}
          >
            السياحة والأنشطة
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'gallery' ? 'border-emerald-600 text-emerald-800 font-bold' : 'border-transparent text-gray-500'}`}
          >
            <ImageIcon className="w-4 h-4" />
            معرض الصور
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                {activeTab === 'info' && (
                    <div className="space-y-8 animate-slide-up">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-4 text-emerald-900">نبذة عن المحمية</h2>
                            <p className="text-lg leading-loose text-gray-700">{reserve.description}</p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-emerald-900">إحصائيات</h2>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={statsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4B5563'}} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip 
                                            cursor={{fill: 'transparent'}}
                                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
                                        />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                                            <Cell fill="#10B981" />
                                            <Cell fill="#F59E0B" />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                                <div>
                                    <div className="text-gray-500 text-sm mb-1">الزوار سنوياً</div>
                                    <div className="font-bold text-xl">{reserve.stats.yearlyVisitors.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm mb-1">التقييم</div>
                                    <div className="font-bold text-xl flex items-center justify-center gap-1">
                                        {reserve.stats.rating} <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm mb-1">موسم الذروة</div>
                                    <div className="font-bold text-lg text-emerald-700">{reserve.stats.peakSeason}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'eco' && (
                    <div className="space-y-6 animate-slide-up">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-emerald-800 flex items-center gap-2">
                                <Wind className="w-5 h-5" /> الحيوانات البرية
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {reserve.wildlife.animals.map((item, i) => (
                                    <span key={i} className="bg-stone-100 text-stone-700 px-4 py-2 rounded-lg font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-emerald-800 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" /> النباتات
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {reserve.wildlife.plants.map((item, i) => (
                                    <span key={i} className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-emerald-800 flex items-center gap-2">
                                <Twitter className="w-5 h-5" /> الطيور
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {reserve.wildlife.birds.map((item, i) => (
                                    <span key={i} className="bg-sky-50 text-sky-700 px-4 py-2 rounded-lg font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'activities' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
                        {reserve.activities.map((activity, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    {idx % 3 === 0 ? <Tent /> : idx % 3 === 1 ? <Camera /> : <Footprints />}
                                </div>
                                <span className="text-lg font-bold text-gray-800">{activity}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'gallery' && (
                    <div className="space-y-8 animate-slide-up">
                        <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg border-2 border-emerald-500" onClick={() => setIsTourOpen(true)}>
                            <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/30 transition-all z-10" />
                            <img 
                                src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop" 
                                alt="360 Tour" 
                                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                    <Maximize className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-1">جولة افتراضية 360°</h3>
                                <p className="text-sm opacity-90">انقر لبدء التجربة البانورامية</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {reserve.gallery.map((img, idx) => (
                                <div key={idx} className="relative group rounded-xl overflow-hidden shadow-sm aspect-video">
                                    <img 
                                        src={img} 
                                        alt={`Gallery ${idx + 1}`} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-100 sticky top-24">
                    <h3 className="text-xl font-bold mb-6">احجز رحلتك الآن</h3>
                    <button 
                        onClick={onOpenBooking}
                        className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl mb-6"
                    >
                        استكشف وخيم
                    </button>
                    
                    <div className="space-y-4 pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-gray-500 text-sm">التواصل</h4>
                        <a href={`tel:${reserve.contact.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-emerald-600">
                            <Phone className="w-5 h-5" />
                            <span dir="ltr">{reserve.contact.phone}</span>
                        </a>
                        <a href={`mailto:${reserve.contact.email}`} className="flex items-center gap-3 text-gray-700 hover:text-emerald-600">
                            <Mail className="w-5 h-5" />
                            <span>{reserve.contact.email}</span>
                        </a>
                        {reserve.contact.social.twitter && (
                            <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-emerald-600">
                                <Twitter className="w-5 h-5" />
                                <span dir="ltr">{reserve.contact.social.twitter}</span>
                            </a>
                        )}
                        {reserve.contact.social.instagram && (
                            <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-emerald-600">
                                <Instagram className="w-5 h-5" />
                                <span dir="ltr">{reserve.contact.social.instagram}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
