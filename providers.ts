import type { Review } from '../types'

export type ProviderRole = 'مرشد فلكي' | 'مصور فلكي' | 'مرشد صحراوي'

export interface Provider {
  id: string
  name: string
  role: ProviderRole
  region: string
  baseSite?: string
  years: number
  rating: number
  trips: number
  languages: string[]
  specialties: string[]
  credentials: string[]
  price: number
  unit: string
  duration: string
  bio: string
  equipment: string[]
  reviews: Review[]
}

// مقدمو خدمات افتراضيون لأغراض العرض، والأسماء ليست لأشخاص حقيقيين
export const providers: Provider[] = [
  {
    id: 'p-sultan',
    name: 'سلطان العنزي',
    role: 'مرشد فلكي',
    region: 'المدينة المنورة',
    baseSite: 'alula',
    years: 9,
    rating: 4.9,
    trips: 340,
    languages: ['العربية', 'الإنجليزية'],
    specialties: ['النجوم بأسمائها العربية', 'رصد السدم والعناقيد', 'أمسيات العائلات'],
    credentials: ['رخصة مرشد سياحي', 'عضو جمعية فلكية', 'إسعافات أولية'],
    price: 600,
    unit: 'للجلسة',
    duration: '3 ساعات',
    bio: 'يقود أمسيات الرصد في محميات العُلا منذ تسع سنوات، ويحب ربط النجوم بقصص البادية والأنواء التي عرفها العرب قبل قرون.',
    equipment: ['تلسكوب دوبسوني 12 إنش', 'مناظير 10×50', 'مؤشر ليزر فلكي'],
    reviews: [
      { name: 'هند', rating: 5, text: 'شرحه للأنواء العربية كان ممتعاً جداً، أطفالي ما ملّوا أبداً.', date: 'مارس 2026' },
      { name: 'Lukas', rating: 5, text: 'Knowledgeable and patient. Best guide we had in Saudi.', date: 'فبراير 2026' },
    ],
  },
  {
    id: 'p-reem',
    name: 'ريم الحربي',
    role: 'مصور فلكي',
    region: 'حائل',
    baseSite: 'jubbah',
    years: 6,
    rating: 4.8,
    trips: 180,
    languages: ['العربية', 'الإنجليزية'],
    specialties: ['تصوير درب التبانة', 'التايم لابس', 'المعالجة والتركيب'],
    credentials: ['مدربة تصوير معتمدة', 'رخصة مرشد سياحي'],
    price: 900,
    unit: 'للجلسة',
    duration: 'ليلة كاملة',
    bio: 'مصورة فلكية نُشرت أعمالها عن سماء النفود في معارض محلية. تعلّمك من إعداد الكاميرا حتى إخراج الصورة النهائية.',
    equipment: ['حامل تتبع نجمي', 'عدسات واسعة سريعة', 'جهاز معالجة محمول'],
    reviews: [{ name: 'تركي', rating: 5, text: 'خرجت بصورة لدرب التبانة فوق النقوش، ما توقعت أقدر أصوّر كذا.', date: 'يناير 2026' }],
  },
  {
    id: 'p-mohammed',
    name: 'محمد اليامي',
    role: 'مرشد صحراوي',
    region: 'المنطقة الشرقية',
    baseSite: 'rub',
    years: 14,
    rating: 4.9,
    trips: 520,
    languages: ['العربية'],
    specialties: ['الملاحة بالنجوم', 'رحلات الربع الخالي', 'التخييم الآمن'],
    credentials: ['رخصة مرشد بري', 'تدريب إنقاذ صحراوي', 'هاتف أقمار صناعية'],
    price: 1500,
    unit: 'لليوم',
    duration: 'يوم كامل',
    bio: 'نشأ على أطراف الربع الخالي ويعرف دروبه بالنجوم قبل الخرائط. يقود رحلات المغامرة الطويلة بأعلى معايير السلامة.',
    equipment: ['سيارتا دفع رباعي', 'معدات تخييم كاملة', 'حقيبة إسعاف متقدمة'],
    reviews: [{ name: 'ناصر', rating: 5, text: 'إحساس بالأمان من أول لحظة، وقصصه عن النجوم والملاحة ما تنسى.', date: 'ديسمبر 2025' }],
  },
  {
    id: 'p-lama',
    name: 'لمى الغامدي',
    role: 'مرشد فلكي',
    region: 'الرياض',
    baseSite: 'edge',
    years: 4,
    rating: 4.7,
    trips: 150,
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    specialties: ['رصد الكواكب', 'ورش الأطفال', 'رحلات المدارس'],
    credentials: ['بكالوريوس فيزياء', 'رخصة مرشد سياحي'],
    price: 350,
    unit: 'للجلسة',
    duration: 'ساعتان',
    bio: 'متخصصة في تبسيط الفلك للأطفال والمبتدئين، وتنظم أمسيات قريبة من الرياض لرصد القمر والكواكب.',
    equipment: ['تلسكوبان آليان', 'خرائط سماء مطبوعة', 'أنشطة تفاعلية للأطفال'],
    reviews: [{ name: 'أم فيصل', rating: 5, text: 'رائعة مع الأطفال، وشرحها بسيط وواضح.', date: 'أكتوبر 2025' }],
  },
  {
    id: 'p-faisal',
    name: 'فيصل البلوي',
    role: 'مصور فلكي',
    region: 'تبوك',
    baseSite: 'disah',
    years: 7,
    rating: 4.8,
    trips: 210,
    languages: ['العربية', 'الإنجليزية'],
    specialties: ['بانوراما الوادي الليلية', 'تصوير الشهب', 'جلسات تصوير شخصية تحت النجوم'],
    credentials: ['رخصة مرشد سياحي', 'مصور معتمد'],
    price: 750,
    unit: 'للجلسة',
    duration: '5 ساعات',
    bio: 'يصوّر وادي الديسة ليلاً منذ سنوات، ويقدم جلسات تصوير شخصية للأزواج والعائلات مع السماء المرصعة بالنجوم.',
    equipment: ['كاميرتان احترافيتان', 'إضاءة ناعمة للتصوير الشخصي', 'حامل بانوراما'],
    reviews: [{ name: 'سارة', rating: 5, text: 'صور زواجنا تحت النجوم كانت حلم، شكراً فيصل.', date: 'أبريل 2026' }],
  },
  {
    id: 'p-abdulrahman',
    name: 'عبدالرحمن الزهراني',
    role: 'مرشد فلكي',
    region: 'مكة المكرمة',
    baseSite: 'wahbah',
    years: 11,
    rating: 4.6,
    trips: 290,
    languages: ['العربية', 'الأردية', 'الإنجليزية'],
    specialties: ['الكسوف والخسوف', 'الجيولوجيا البركانية', 'رصد الشمس الآمن'],
    credentials: ['رخصة مرشد سياحي', 'مدرب رصد شمسي آمن'],
    price: 500,
    unit: 'للجلسة',
    duration: '4 ساعات',
    bio: 'يجمع بين الجيولوجيا والفلك في جولات فوهة الوعبة، ويحضّر لاستقبال زوار الكسوف الكلي في أغسطس 2027.',
    equipment: ['تلسكوب بمرشح شمسي', 'نظارات كسوف معتمدة', 'مناظير'],
    reviews: [{ name: 'خالد', rating: 4, text: 'معلومات غزيرة عن الفوهة وتاريخها، تجربة مفيدة.', date: 'مارس 2026' }],
  },
]

export const providerRoles: ProviderRole[] = ['مرشد فلكي', 'مصور فلكي', 'مرشد صحراوي']
