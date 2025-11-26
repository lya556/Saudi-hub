import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Reserve, ReserveType } from '../types';
import { RESERVES } from '../constants';
import { Info, ArrowRight } from 'lucide-react';

interface MapSectionProps {
  onSelectReserve: (reserve: Reserve) => void;
}

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const createCustomIcon = (type: ReserveType) => {
    const colorClass = type === ReserveType.ROYAL ? 'bg-purple-600' : 'bg-emerald-600';
    return L.divIcon({
        className: 'custom-marker',
        html: `<div class="${colorClass} w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

export const MapSection: React.FC<MapSectionProps> = ({ onSelectReserve }) => {
  const [filter, setFilter] = useState<'ALL' | ReserveType>('ALL');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');

  const defaultCenter: [number, number] = [23.8859, 45.0792];
  const defaultZoom = 5;

  const filteredReserves = RESERVES.filter(r => {
    const typeMatch = filter === 'ALL' || r.type === filter;
    const regionMatch = selectedRegion === 'ALL' || r.region.includes(selectedRegion);
    return typeMatch && regionMatch;
  });

  const regions = Array.from(new Set(RESERVES.map(r => r.region.split(' - ')[0])));

  return (
    <div className="w-full h-screen relative bg-stone-100 flex flex-col md:flex-row">
      <div className="w-full md:w-80 bg-white shadow-2xl z-[1000] p-6 flex flex-col gap-6 overflow-y-auto order-2 md:order-1 h-1/3 md:h-full">
        <div>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">اكتشف المحميات</h2>
          <p className="text-stone-500 text-sm mb-6">استخدم الفلاتر أدناه للعثور على وجهتك القادمة.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-bold text-sm text-stone-700">نوع المحمية</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter('ALL')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${filter === 'ALL' ? 'bg-stone-800 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-600'}`}
              >
                الكل
              </button>
              <button 
                onClick={() => setFilter(ReserveType.NATURAL)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${filter === ReserveType.NATURAL ? 'bg-emerald-600 text-white' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'}`}
              >
                طبيعية
              </button>
              <button 
                onClick={() => setFilter(ReserveType.ROYAL)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${filter === ReserveType.ROYAL ? 'bg-purple-600 text-white' : 'bg-purple-50 hover:bg-purple-100 text-purple-700'}`}
              >
                ملكية
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm text-stone-700">المنطقة</label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <option value="ALL">جميع المناطق</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-800 font-bold mb-2">
              <Info className="w-5 h-5" />
              <span>نصيحة</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              انقر على الدبابيس في الخريطة لرؤية التفاصيل السريعة، ثم اضغط على زر "استكشف" للدخول للصفحة الكاملة.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative order-1 md:order-2 h-2/3 md:h-full">
        <MapContainer center={defaultCenter} zoom={defaultZoom} className="w-full h-full" zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeView center={defaultCenter} zoom={defaultZoom} />
            
            {filteredReserves.map(reserve => (
                <Marker 
                    key={reserve.id} 
                    position={reserve.coordinates}
                    icon={createCustomIcon(reserve.type)}
                >
                    <Popup className="custom-popup">
                        <div className="text-right p-1 min-w-[200px]" dir="rtl">
                            <div className="h-24 w-full rounded-lg bg-gray-200 mb-3 overflow-hidden">
                                <img src={reserve.imageUrl} alt={reserve.name} className="w-full h-full object-cover" />
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold mb-1 inline-block ${reserve.type === ReserveType.ROYAL ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {reserve.type}
                            </span>
                            <h3 className="font-bold text-stone-900 text-sm mb-1">{reserve.name}</h3>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{reserve.shortDescription}</p>
                            <button 
                                onClick={() => onSelectReserve(reserve)}
                                className="w-full bg-stone-900 text-white text-xs py-2 rounded flex items-center justify-center gap-1 hover:bg-stone-700 transition-colors"
                            >
                                استكشف المحمية <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};
