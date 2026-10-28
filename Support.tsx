import { useState } from 'react'
import { btnGold, DemoTag, Icon } from '../components/ui'

const channels = [
  { icon: 'clock' as const, title: 'الهاتف الموحد', value: '800 000 0000', note: 'يومياً من 4 عصراً حتى 2 فجراً' },
  { icon: 'users' as const, title: 'واتساب', value: '+966 50 000 0000', note: 'رد خلال 15 دقيقة تقريباً' },
  { icon: 'info' as const, title: 'البريد الإلكتروني', value: 'care@samra.sa', note: 'رد خلال يوم عمل' },
]

const faqs = [
  { q: 'كيف ألغي حجزي أو أعدّل موعده؟', a: 'يمكن الإلغاء المجاني قبل 48 ساعة من موعد التجربة. للتعديل تواصل معنا برقم الحجز الذي يبدأ بـ SMR وسنقترح أقرب موعد متاح.' },
  { q: 'ماذا يحدث إذا كانت السماء غائمة؟', a: 'يتابع فريقنا توقعات الطقس والغبار قبل الرحلة بـ 24 ساعة. إذا كانت ظروف الرصد سيئة نعرض عليك موعداً بديلاً أو استرداد المبلغ كاملاً.' },
  { q: 'ماذا أحضر معي لليلة الرصد؟', a: 'ملابس دافئة حتى في الربيع لأن الصحراء تبرد ليلاً، وحذاء مغلق، ومياه، ومصباح بإضاءة حمراء إن توفر. المعدات الفلكية يوفرها المرشد.' },
  { q: 'هل التجارب مناسبة للأطفال؟', a: 'أغلب أمسيات الرصد مناسبة من عمر 8 سنوات. رحلات التخييم الطويلة مثل الربع الخالي تتطلب عمر 12 سنة فأكثر. العمر المناسب مذكور في تفاصيل كل تجربة.' },
  { q: 'كيف أتأكد من موثوقية المرشد؟', a: 'كل مقدم خدمة في سمرة يرفع رخصة الإرشاد السياحي وشهادة الإسعافات الأولية، وتظهر الشارات الموثقة والتقييمات في ملفه الشخصي.' },
  { q: 'هل يوجد دفع إلكتروني؟', a: 'في هذا النموذج الأولي لا. الحجز تجريبي لعرض الفكرة، وسيُربط الدفع لاحقاً ببوابة دفع محلية معتمدة.' },
]

const topics = ['استفسار عن حجز', 'إلغاء أو تعديل موعد', 'شكوى على تجربة', 'اقتراح', 'أخرى']

function CopyRow({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(value).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 1500) },
      () => setCopied(false),
    )
  }
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-night/50 border border-white/10 px-3 py-2">
      <span className="font-mono text-sand num select-all" dir="ltr">{value}</span>
      <button type="button" onClick={copy} className="text-xs text-gold hover:underline shrink-0">{copied ? 'تم النسخ' : 'نسخ'}</button>
    </div>
  )
}

export default function SupportPage() {
  const [form, setForm] = useState({ name: '', booking: '', topic: topics[0], message: '' })
  const [error, setError] = useState('')
  const [ticket, setTicket] = useState<string | null>(null)
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value })
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || form.message.trim().length < 10) return setError('اكتب اسمك ورسالة لا تقل عن 10 أحرف حتى نقدر نساعدك.')
    setError('')
    setTicket('TCK-' + Math.floor(10000 + Math.random() * 89999))
  }
  const field = 'rounded-xl bg-night border border-white/15 px-4 py-3 text-white focus:border-gold outline-none'

  return (
    <div className="gutter max-w-6xl mx-auto w-full py-8 grid gap-8">
      <header className="grid gap-2">
        <p className="text-gold text-xs">خدمة العملاء</p>
        <h1 className="font-display text-3xl sm:text-4xl text-white">نحن هنا طوال الليل</h1>
        <p className="text-mist max-w-2xl">فريق الدعم متاح في ساعات الرصد نفسها، من العصر حتى الفجر.</p>
        <div><DemoTag>أرقام وعناوين تجريبية للعرض</DemoTag></div>
      </header>

      <div className="grid sm:grid-cols-3 gap-4">
        {channels.map((c) => (
          <div key={c.title} className="glass rounded-3xl p-5 grid gap-3">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-violet/15 text-violet-soft"><Icon name={c.icon} className="w-5 h-5" /></span>
              <div>
                <h2 className="font-display text-lg text-white">{c.title}</h2>
                <p className="text-xs text-mist">{c.note}</p>
              </div>
            </div>
            <CopyRow value={c.value} />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
        <section className="grid gap-3">
          <h2 className="font-display text-2xl text-white">أسئلة شائعة</h2>
          {faqs.map((f) => (
            <details key={f.q} className="group glass rounded-2xl px-5 py-4 open:border-gold/40">
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-sand font-medium">
                {f.q}
                <span className="text-gold text-xl leading-none transition group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="text-sm text-mist leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="glass rounded-3xl p-5 sm:p-6">
          {ticket ? (
            <div className="text-center grid gap-4 justify-items-center py-6">
              <div className="grid place-items-center w-16 h-16 rounded-full bg-emerald-400/15 text-emerald-300"><Icon name="check" className="w-8 h-8" /></div>
              <h2 className="font-display text-2xl text-white">استلمنا رسالتك</h2>
              <p className="text-mist text-sm max-w-xs">شكراً {form.name}، سيتواصل معك أحد أعضاء الفريق قريباً بخصوص «{form.topic}».</p>
              <div className="rounded-2xl border border-white/10 bg-night/50 px-5 py-3 grid gap-1">
                <span className="text-xs text-mist">رقم التذكرة التجريبي</span>
                <span className="font-mono text-xl text-gold tracking-widest" dir="ltr">{ticket}</span>
              </div>
              <button type="button" className="text-gold text-sm hover:underline" onClick={() => { setTicket(null); setForm({ name: '', booking: '', topic: topics[0], message: '' }) }}>إرسال رسالة أخرى</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4">
              <div>
                <h2 className="font-display text-2xl text-white">راسلنا</h2>
                <p className="text-sm text-mist">اكتب استفسارك وسنرد عليك في أقرب وقت.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="grid gap-1.5 text-sm"><span className="text-sand">الاسم</span><input id="sup-name" value={form.name} onChange={set('name')} className={field} /></label>
                <label className="grid gap-1.5 text-sm"><span className="text-sand">رقم الحجز <span className="text-mist">(اختياري)</span></span><input id="sup-booking" dir="ltr" placeholder="SMR-XXXXX" value={form.booking} onChange={set('booking')} className={field + ' text-right'} /></label>
              </div>
              <label className="grid gap-1.5 text-sm"><span className="text-sand">الموضوع</span>
                <select id="sup-topic" value={form.topic} onChange={set('topic')} className={field}>{topics.map((t) => <option key={t}>{t}</option>)}</select>
              </label>
              <label className="grid gap-1.5 text-sm"><span className="text-sand">الرسالة</span>
                <textarea id="sup-message" rows={4} value={form.message} onChange={set('message')} className={field + ' resize-y'} />
              </label>
              {error && <p className="text-rose-300 text-sm" role="alert">{error}</p>}
              <button type="submit" className={btnGold + ' py-3 text-base'}>إرسال</button>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}
