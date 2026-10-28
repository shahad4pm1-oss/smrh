import { useMemo, useState } from 'react'
import { Reviews } from '../components/Details'
import { btnGhost, btnGold, chip, DemoTag, Empty, FavButton, Icon, Modal, Stars } from '../components/ui'
import { providerRoles, providers, type Provider, type ProviderRole } from '../data/providers'
import { sites } from '../data/sites'
import { sar } from '../lib/format'
import type { Actions } from '../App'

const roleTone: Record<ProviderRole, { from: string; to: string; icon: 'telescope' | 'star' | 'compass' }> = {
  'مرشد فلكي': { from: '#8B6CFF', to: '#13215A', icon: 'telescope' },
  'مصور فلكي': { from: '#E6B860', to: '#7A4A4A', icon: 'star' },
  'مرشد صحراوي': { from: '#C9864A', to: '#2D1A1C', icon: 'compass' },
}

export function Avatar({ p, size = 'w-16 h-16 text-2xl' }: { p: Provider; size?: string }) {
  const t = roleTone[p.role]
  return (
    <span className={`relative grid place-items-center rounded-full font-display text-white shrink-0 ${size}`} style={{ background: `linear-gradient(140deg, ${t.from}, ${t.to})` }} aria-hidden="true">
      {p.name.charAt(0)}
      <span className="absolute -bottom-0.5 -left-0.5 grid place-items-center w-6 h-6 rounded-full bg-night border border-white/15 text-gold">
        <Icon name={t.icon} className="w-3.5 h-3.5" />
      </span>
    </span>
  )
}

export function ProviderCard({ p, actions }: { p: Provider; actions: Actions }) {
  return (
    <article className="glass rounded-3xl p-5 flex flex-col gap-4 hover:border-gold/40 transition">
      <div className="flex items-start gap-4">
        <Avatar p={p} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl text-white">{p.name}</h3>
          <p className="text-sm text-gold">{p.role}</p>
          <p className="text-xs text-mist flex items-center gap-1 mt-0.5"><Icon name="pin" className="w-3.5 h-3.5" />{p.region}</p>
        </div>
        <FavButton active={actions.isFav('pro', p.id)} onClick={() => actions.toggleFav('pro', p.id)} compact />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {p.specialties.slice(0, 3).map((s) => (
          <span key={s} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-sand">{s}</span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-night/40 py-2"><Stars value={p.rating} /><p className="text-[10px] text-mist mt-0.5">التقييم</p></div>
        <div className="rounded-xl bg-night/40 py-2"><p className="font-mono text-sm text-sand num">{p.years}</p><p className="text-[10px] text-mist mt-0.5">سنوات خبرة</p></div>
        <div className="rounded-xl bg-night/40 py-2"><p className="font-mono text-sm text-sand num">{p.trips}</p><p className="text-[10px] text-mist mt-0.5">رحلة</p></div>
      </div>
      <div className="mt-auto pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] text-mist">{p.unit} · {p.duration}</p>
          <p className="font-display text-xl text-gold num">{sar(p.price)}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className={btnGhost + ' px-4'} onClick={() => actions.openPro(p.id)}>الملف الشخصي</button>
          <button type="button" className={btnGold + ' px-4'} onClick={() => actions.bookPro(p.id)}>احجز</button>
        </div>
      </div>
    </article>
  )
}

export function ProviderDetail({ p, actions, onClose }: { p: Provider | null; actions: Actions; onClose: () => void }) {
  if (!p) return null
  const site = sites.find((s) => s.id === p.baseSite)
  return (
    <Modal open onClose={onClose} label={p.name} wide>
      <div className="relative bg-gradient-to-l from-deep via-ink to-navy p-6 sm:p-8 pt-14 sm:pt-8">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar p={p} size="w-24 h-24 text-4xl" />
          <div className="min-w-0">
            <p className="text-gold text-sm">{p.role}</p>
            <h2 className="font-display text-3xl text-white">{p.name}</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mist mt-1">
              <Stars value={p.rating} />
              <span className="num">{p.years} سنوات خبرة</span>
              <span className="num">{p.trips} رحلة</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-7 grid gap-6">
        <div className="flex flex-wrap gap-2">
          {p.credentials.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
              <Icon name="shield" className="w-3.5 h-3.5" />{c}
            </span>
          ))}
          <DemoTag>ملف تجريبي</DemoTag>
        </div>
        <p className="text-mist leading-loose">{p.bio}</p>
        <div className="grid sm:grid-cols-2 gap-6">
          <section className="grid gap-2">
            <h3 className="font-display text-lg text-white">التخصصات</h3>
            <ul className="text-sm text-mist grid gap-2">
              {p.specialties.map((s) => <li key={s} className="flex gap-2"><Icon name="star" filled className="w-3.5 h-3.5 mt-1 text-gold shrink-0" />{s}</li>)}
            </ul>
          </section>
          <section className="grid gap-2">
            <h3 className="font-display text-lg text-white">المعدات</h3>
            <ul className="text-sm text-mist grid gap-2">
              {p.equipment.map((s) => <li key={s} className="flex gap-2"><Icon name="check" className="w-4 h-4 mt-0.5 text-emerald-300 shrink-0" />{s}</li>)}
            </ul>
          </section>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-night/40 p-3">
            <p className="text-xs text-mist">اللغات</p>
            <p className="text-sand mt-1">{p.languages.join('، ')}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-night/40 p-3">
            <p className="text-xs text-mist">منطقة العمل</p>
            {site ? (
              <button type="button" onClick={() => actions.openSite(site.id)} className="text-gold mt-1 hover:underline text-right">{p.region} · {site.name}</button>
            ) : (
              <p className="text-sand mt-1">{p.region}</p>
            )}
          </div>
        </div>
        <section className="grid gap-3">
          <h3 className="font-display text-lg text-white">التقييمات</h3>
          <Reviews reviews={p.reviews} />
        </section>
        <div className="flex flex-wrap items-center justify-between gap-3 sticky bottom-0 -mx-5 sm:-mx-7 px-5 sm:px-7 py-4 bg-navy/95 border-t border-white/10">
          <div>
            <p className="text-xs text-mist">{p.unit} · {p.duration} (تقديري)</p>
            <p className="font-display text-2xl text-gold num">{sar(p.price)}</p>
          </div>
          <div className="flex gap-2">
            <FavButton active={actions.isFav('pro', p.id)} onClick={() => actions.toggleFav('pro', p.id)} compact />
            <button type="button" className={btnGold} onClick={() => actions.bookPro(p.id)}>احجز مع {p.name.split(' ')[0]}</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

function JoinForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', role: 'مرشد فلكي', region: '', phone: '', years: '' })
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value })
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.region || !/^0?5\d{8}$/.test(form.phone.replace(/\s/g, ''))) {
      return setError('أكمل الاسم والمنطقة، واكتب رقم جوال سعودي صحيح مثل 05XXXXXXXX.')
    }
    setError('')
    setDone(true)
  }
  const field = 'rounded-xl bg-night border border-white/15 px-4 py-3 text-white focus:border-gold outline-none'
  return (
    <Modal open onClose={onClose} label="انضم كمقدم خدمة">
      {done ? (
        <div className="p-7 text-center grid gap-4 justify-items-center">
          <div className="grid place-items-center w-16 h-16 rounded-full bg-emerald-400/15 text-emerald-300 mt-4"><Icon name="check" className="w-8 h-8" /></div>
          <h2 className="font-display text-2xl text-white">وصلنا طلب انضمامك</h2>
          <p className="text-mist text-sm max-w-xs">شكراً {form.name}. في النسخة الفعلية يراجع الفريق الرخص والوثائق ويتواصل معك خلال 3 أيام عمل.</p>
          <DemoTag>طلب تجريبي: لم تُرسل أي بيانات</DemoTag>
          <button type="button" className={btnGold} onClick={onClose}>تم</button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="p-6 sm:p-7 grid gap-4">
          <div className="pl-10">
            <p className="text-gold text-sm">مقدمو الخدمات</p>
            <h2 className="font-display text-2xl text-white">انضم إلى سمرة</h2>
            <p className="text-mist text-sm mt-1">للمرشدين الفلكيين والصحراويين والمصورين الفلكيين.</p>
          </div>
          <label className="grid gap-1.5 text-sm"><span className="text-sand">الاسم الكامل</span><input id="join-name" value={form.name} onChange={set('name')} className={field} /></label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="grid gap-1.5 text-sm"><span className="text-sand">نوع الخدمة</span>
              <select id="join-role" value={form.role} onChange={set('role')} className={field}>{providerRoles.map((r) => <option key={r}>{r}</option>)}</select>
            </label>
            <label className="grid gap-1.5 text-sm"><span className="text-sand">المنطقة</span>
              <select id="join-region" value={form.region} onChange={set('region')} className={field}>
                <option value="">اختر المنطقة</option>
                {['الرياض', 'مكة المكرمة', 'المدينة المنورة', 'المنطقة الشرقية', 'تبوك', 'حائل', 'عسير', 'الجوف', 'نجران'].map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="grid gap-1.5 text-sm"><span className="text-sand">رقم الجوال</span><input id="join-phone" inputMode="tel" dir="ltr" placeholder="05XXXXXXXX" value={form.phone} onChange={set('phone')} className={field + ' text-right'} /></label>
            <label className="grid gap-1.5 text-sm"><span className="text-sand">سنوات الخبرة</span><input id="join-years" type="number" min="0" value={form.years} onChange={set('years')} className={field} /></label>
          </div>
          <p className="text-xs text-mist">يُطلب لاحقاً: رخصة الإرشاد السياحي، وشهادة الإسعافات الأولية، ونماذج من الأعمال للمصورين.</p>
          {error && <p className="text-rose-300 text-sm" role="alert">{error}</p>}
          <button type="submit" className={btnGold + ' py-3 text-base'}>إرسال طلب الانضمام</button>
        </form>
      )}
    </Modal>
  )
}

export default function ProvidersPage({ actions }: { actions: Actions }) {
  const [role, setRole] = useState<string>('all')
  const [q, setQ] = useState('')
  const [join, setJoin] = useState(false)
  const list = useMemo(() => {
    const t = q.trim()
    return providers.filter((p) => (role === 'all' || p.role === role) && (!t || (p.name + p.region + p.specialties.join(' ') + p.role).includes(t)))
  }, [role, q])

  return (
    <div className="gutter max-w-7xl mx-auto w-full py-8 grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-2 min-w-0">
          <p className="text-gold text-xs">مقدمو الخدمات</p>
          <h1 className="font-display text-3xl sm:text-4xl text-white">مرشدون ومصورون يعرفون السماء</h1>
          <p className="text-mist max-w-2xl">احجز مباشرة مع مرشد فلكي أو صحراوي أو مصور فلكي موثّق في منطقتك.</p>
          <div><DemoTag>ملفات تجريبية بأسماء افتراضية</DemoTag></div>
        </div>
        <button type="button" className={btnGhost} onClick={() => setJoin(true)}><Icon name="users" className="w-4 h-4" />انضم كمقدم خدمة</button>
      </header>

      <div className="glass rounded-3xl p-4 grid gap-3">
        <label className="relative block">
          <span className="sr-only">ابحث عن مقدم خدمة</span>
          <Icon name="search" className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-mist" />
          <input id="pro-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث بالاسم أو المنطقة أو التخصص…" className="w-full rounded-2xl bg-night/70 border border-white/10 py-3 pr-12 pl-4 text-white placeholder:text-mist/60 focus:border-gold outline-none" />
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="نوع الخدمة">
          <button type="button" className={chip(role === 'all')} onClick={() => setRole('all')}>الكل</button>
          {providerRoles.map((r) => <button type="button" key={r} className={chip(role === r)} onClick={() => setRole(r)}>{r}</button>)}
        </div>
      </div>

      <p className="text-sm text-mist num">{list.length} من {providers.length} مقدمي خدمات</p>
      {list.length === 0 ? (
        <Empty title="لا يوجد مقدم خدمة مطابق" hint="جرّب نوع خدمة آخر أو كلمة بحث مختلفة مثل «تصوير» أو «العلا»." action={<button type="button" className={btnGold} onClick={() => { setQ(''); setRole('all') }}>مسح البحث</button>} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p) => <ProviderCard key={p.id} p={p} actions={actions} />)}
        </div>
      )}

      <div className="rounded-3xl border border-gold/30 bg-gradient-to-l from-ink to-navy p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-2xl text-white">هل أنت مرشد أو مصور فلكي؟</h2>
          <p className="text-mist text-sm mt-1">اعرض خدماتك لآلاف المهتمين بالسياحة الفلكية واستقبل الحجوزات مباشرة.</p>
        </div>
        <button type="button" className={btnGold} onClick={() => setJoin(true)}>سجّل الآن</button>
      </div>
      {join && <JoinForm onClose={() => setJoin(false)} />}
    </div>
  )
}
