import React, { useState } from 'react';
import { ViewState, Reserve } from './types';
import { MapSection } from './components/MapSection';
import { ReserveDetail } from './components/ReserveDetail';
import { AIPlanner } from './components/AIPlanner';
import { Map, Tent, MessageCircle } from 'lucide-react';

const Hero = ({ onStart }: { onStart: () => void }) => (
  <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-stone-900">
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-60 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1548115184-bc6544d06a58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/50" />
    
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
        محميات السعودية <br/>
        <span className="text-emerald-400 text-3xl md:text-5xl">كنز الطبيعة الأصيلة</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
        اكتشف جمال الحياة الفطرية في 19 محمية طبيعية وملكية. رحلة بين الكثبان الرملية، الجبال الشاهقة، والشعاب المرجانية.
      </p>
      <button 
        onClick={onStart}
        className="group bg-emerald-600 hover:bg-emerald-500 text-white text-xl font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto"
      >
        <span>ابدأ رحلتك الآن</span>
        <Map className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  </div>
);

const BookingModal = ({ isOpen, onClose, reserveName }: { isOpen: boolean, onClose: () => void, reserveName: string }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-fade-in relative">
                <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">✕</button>
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                        <Tent className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900">حجز رحلة</h2>
                    <p className="text-emerald-700 font-medium">{reserveName}</p>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('تم استلام طلبك! سيتم التواصل معك قريباً.'); onClose(); }}>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
                        <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="محمد أحمد" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">تاريخ الزيارة</label>
                        <input type="date" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">نوع النشاط</label>
                        <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                            <option>تخييم ليلي</option>
                            <option>رحلة سفاري نهارية</option>
                            <option>هايكنج</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition-colors">
                        تأكيد الحجز
                    </button>
                </form>
            </div>
        </div>
    );
};

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('HERO');
  const [selectedReserve, setSelectedReserve] = useState<Reserve | null>(null);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleStart = () => setViewState('MAP');
  
  const handleSelectReserve = (reserve: Reserve) => {
    setSelectedReserve(reserve);
    setViewState('DETAIL');
  };

  const handleBackToMap = () => {
    setSelectedReserve(null);
    setViewState('MAP');
  };

  return (
    <div className="min-h-screen font-sans bg-stone-50">
      
      {viewState === 'HERO' && <Hero onStart={handleStart} />}
      
      {viewState === 'MAP' && (
        <div className="animate-fade-in">
            <MapSection onSelectReserve={handleSelectReserve} />
        </div>
      )}

      {viewState === 'DETAIL' && selectedReserve && (
        <ReserveDetail 
            reserve={selectedReserve} 
            onBack={handleBackToMap} 
            onOpenBooking={() => setIsBookingOpen(true)}
        />
      )}

      {viewState !== 'HERO' && (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur shadow-sm z-50 flex items-center justify-between px-6 border-b border-gray-100">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackToMap}>
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                    <Map className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg text-stone-800">محميات السعودية</span>
            </div>
            
            <button 
                onClick={() => setIsAIPlannerOpen(!isAIPlannerOpen)}
                className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-bold animate-pulse-slow"
            >
                <MessageCircle className="w-4 h-4" />
                <span>اسأل المرشد الذكي</span>
            </button>
        </nav>
      )}

      {isAIPlannerOpen && (
        <div className="fixed bottom-4 left-4 z-[2000] w-96 h-[500px] shadow-2xl rounded-xl animate-slide-up-fade">
            <AIPlanner 
                currentContext={selectedReserve?.name} 
                onClose={() => setIsAIPlannerOpen(false)} 
            />
        </div>
      )}

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        reserveName={selectedReserve?.name || ''} 
      />

    </div>
  );
}
