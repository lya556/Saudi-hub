import { Reserve, ReserveType } from './types';

export const RESERVES: Reserve[] = [
  {
    id: '1',
    name: 'محمية الإمام تركي بن عبدالله الملكية',
    type: ReserveType.ROYAL,
    region: 'الحدود الشمالية',
    area: '91,500 كم²',
    established: '2018',
    coordinates: [30.5, 42.5],
    shortDescription: 'تتميز بتنوع نباتي فريد وطبيعة خلابة.',
    description: 'تعتبر محمية الإمام تركي بن عبدالله الملكية من أكبر المحميات في المملكة، وتتميز بوجود غطاء نباتي كثيف ومتنوع، وتعتبر موطناً للعديد من الحيوانات البرية.',
    climate: 'قاري حار صيفاً وبارد شتاءً',
    wildlife: {
      animals: ['غزال الريم', 'المها العربي', 'الذئب العربي'],
      plants: ['الخزامى', 'الأقحوان', 'الشيخ'],
      birds: ['الحبارى', 'الصقور', 'النسر الذهبي']
    },
    activities: ['تخييم', 'رصد النجوم', 'رحلات سفاري'],
    contact: {
      phone: '920000000',
      email: 'info@itba.gov.sa',
      social: { twitter: '@ITBAReserve' }
    },
    stats: {
      monthlyVisitors: 1500,
      yearlyVisitors: 18000,
      rating: 4.8,
      peakSeason: 'الشتاء والربيع'
    },
    imageUrl: 'https://picsum.photos/800/600?random=1',
    gallery: [
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12',
      'https://picsum.photos/800/600?random=13',
      'https://picsum.photos/800/600?random=14'
    ]
  },
  {
    id: '2',
    name: 'محمية الملك سلمان بن عبدالعزيز الملكية',
    type: ReserveType.ROYAL,
    region: 'تبوك - الجوف - حائل',
    area: '130,700 كم²',
    established: '2018',
    coordinates: [29.0, 39.0],
    shortDescription: 'أكبر محمية في الشرق الأوسط، تاريخ وطبيعة.',
    description: 'تضم المحمية آثاراً تاريخية تعود لآلاف السنين، وتتميز بتضاريسها المتنوعة من جبال وسهول وأودية.',
    climate: 'معتدل في المرتفعات، حار في السهول',
    wildlife: {
      animals: ['الوعل', 'الضبع', 'الثعلب'],
      plants: ['الطلح', 'السمر', 'العرفج'],
      birds: ['العقاب', 'البوم', 'القبرة']
    },
    activities: ['هايكنج', 'تصوير فوتوغرافي', 'زيارة مواقع أثرية'],
    contact: {
      phone: '920000001',
      email: 'contact@ksr.gov.sa',
      social: { twitter: '@KSR_Gov' }
    },
    stats: {
      monthlyVisitors: 2500,
      yearlyVisitors: 30000,
      rating: 4.9,
      peakSeason: 'الربيع'
    },
    imageUrl: 'https://picsum.photos/800/600?random=2',
    gallery: [
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22',
      'https://picsum.photos/800/600?random=23',
      'https://picsum.photos/800/600?random=24'
    ]
  },
  {
    id: '3',
    name: 'محمية محازة الصيد',
    type: ReserveType.NATURAL,
    region: 'مكة المكرمة',
    area: '2,553 كم²',
    established: '1989',
    coordinates: [22.25, 41.8],
    shortDescription: 'محمية مسيجة بالكامل، موطن المها العربي.',
    description: 'تعد ثاني أكبر محمية مسيجة في العالم، وهي موقع رئيسي لبرامج إعادة توطين المها العربي والنعام والحبارى.',
    climate: 'صحراوي جاف',
    wildlife: {
      animals: ['المها العربي', 'غزال الرمال', 'الثعلب الرملي'],
      plants: ['السمر', 'السلم', 'الرمث'],
      birds: ['النعام أحمر الرقبة', 'الحبارى', 'النسر الأصلع']
    },
    activities: ['جولات تعليمية', 'مراقبة الطيور', 'أبحاث بيئية'],
    contact: {
      phone: '012-1234567',
      email: 'mahazat@ncw.gov.sa',
      social: { twitter: '@NCW_Mahazat' }
    },
    stats: {
      monthlyVisitors: 400,
      yearlyVisitors: 4800,
      rating: 4.5,
      peakSeason: 'الشتاء'
    },
    imageUrl: 'https://picsum.photos/800/600?random=3',
    gallery: [
      'https://picsum.photos/800/600?random=31',
      'https://picsum.photos/800/600?random=32',
      'https://picsum.photos/800/600?random=33',
      'https://picsum.photos/800/600?random=34'
    ]
  },
  {
    id: '4',
    name: 'محمية جزر فرسان',
    type: ReserveType.NATURAL,
    region: 'جازان',
    area: '5,408 كم²',
    established: '1989',
    coordinates: [16.7, 42.1],
    shortDescription: 'أرخبيل بحري، شعاب مرجانية وغزلان.',
    description: 'تتألف من 84 جزيرة، وتتميز بشواطئها البكر وشعابها المرجانية الغنية، وهي موطن لغزال فرسان المتوطن.',
    climate: 'حار رطب صيفاً، معتدل شتاءً',
    wildlife: {
      animals: ['غزال فرسان', 'الأطوم', 'السلاحف البحرية'],
      plants: ['المانجروف', 'الشورى'],
      birds: ['البجع وردي الظهر', 'العقاب النساري', 'الخرشنة']
    },
    activities: ['غوص', 'صيد أسماك', 'رحلات بحرية'],
    contact: {
      phone: '017-3214567',
      email: 'farasan@ncw.gov.sa',
      social: { twitter: '@FarasanReserve' }
    },
    stats: {
      monthlyVisitors: 3000,
      yearlyVisitors: 36000,
      rating: 4.7,
      peakSeason: 'الشتاء'
    },
    imageUrl: 'https://picsum.photos/800/600?random=4',
    gallery: [
      'https://picsum.photos/800/600?random=41',
      'https://picsum.photos/800/600?random=42',
      'https://picsum.photos/800/600?random=43',
      'https://picsum.photos/800/600?random=44'
    ]
  },
  {
    id: '5',
    name: 'محمية عروق بني معارض',
    type: ReserveType.NATURAL,
    region: 'نجران',
    area: '12,787 كم²',
    established: '1993',
    coordinates: [19.3, 45.5],
    shortDescription: 'كثبان رملية في الربع الخالي.',
    description: 'تقع على الحافة الغربية للربع الخالي، وتتميز بالكثبان الرملية الضخمة والهضاب الجيرية.',
    climate: 'صحراوي قاري شديد الحرارة صيفاً',
    wildlife: {
      animals: ['المها العربي', 'غزال الريم', 'الذئب'],
      plants: ['الغضى', 'الأرطى', 'الحاد'],
      birds: ['الحبارى', 'القطا', 'القبرة الهدهدية']
    },
    activities: ['تخييم صحراوي', 'تطعيس', 'مراقبة النجوم'],
    contact: {
      phone: '017-5432198',
      email: 'uruq@ncw.gov.sa',
      social: { instagram: 'uruq_reserve' }
    },
    stats: {
      monthlyVisitors: 600,
      yearlyVisitors: 7200,
      rating: 4.6,
      peakSeason: 'الشتاء'
    },
    imageUrl: 'https://picsum.photos/800/600?random=5',
    gallery: [
      'https://picsum.photos/800/600?random=51',
      'https://picsum.photos/800/600?random=52',
      'https://picsum.photos/800/600?random=53',
      'https://picsum.photos/800/600?random=54'
    ]
  },
  {
    id: '6',
    name: 'محمية الملك خالد الملكية',
    type: ReserveType.ROYAL,
    region: 'الرياض',
    area: '720 كم²',
    established: '2018',
    coordinates: [25.1, 46.8],
    shortDescription: 'متنفس طبيعي قرب العاصمة.',
    description: 'تتميز بموقعها القريب من الرياض، وتشمل جبال العرمة وتضاريس متنوعة.',
    climate: 'صحراوي',
    wildlife: {
      animals: ['الثعالب', 'الأرانب البرية', 'الجرابيع'],
      plants: ['السدر', 'الطلح', 'الشيح'],
      birds: ['الصقور', 'البوم', 'الدوري']
    },
    activities: ['نزهات عائلية', 'هايكنج', 'دراجات جبلية'],
    contact: {
      phone: '920000002',
      email: 'kkr@royalreserves.gov.sa',
      social: { twitter: '@KKR_Gov' }
    },
    stats: {
      monthlyVisitors: 5000,
      yearlyVisitors: 60000,
      rating: 4.4,
      peakSeason: 'الربيع والخريف'
    },
    imageUrl: 'https://picsum.photos/800/600?random=6',
    gallery: [
      'https://picsum.photos/800/600?random=61',
      'https://picsum.photos/800/600?random=62',
      'https://picsum.photos/800/600?random=63',
      'https://picsum.photos/800/600?random=64'
    ]
  }
];
