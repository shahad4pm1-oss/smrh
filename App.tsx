import { useCallback, useState } from 'react'
import { BookingModal, ExperienceDetail, SiteDetail, type Bookable } from './components/Details'
import { Icon } from './components/ui'
import { experiences } from './data/experiences'
import { providers } from './data/providers'
import { sites } from './data/sites'
import { useFavorites, useHashRoute, type FavKind, type Route } from './lib/store'
import logo from './assets/samra-logo.png'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import { CalendarPage, ExperiencesPage, FavoritesPage } from './pages/OtherPages'
import ProvidersPage, { ProviderDetail } from './pages/Providers'
import SupportPage from './pages/Support'

export interface Actions {
  openSite: (id: string) => void
  openExp: (id: string) => void
  openPro: (id: string) => void
  book: (id: string) => void
  bookPro: (id: string) => void
  isFav: (k: FavKind, id: string) => boolean
  toggleFav: (k: FavKind, id: string) => void
}

const nav: { id: Route; label: string; short: string; icon: Parameters<typeof Icon>[0]['name'] }[] = [
  { id: 'home', label: 'الرئيسية', short: 'الرئيسية', icon: 'star' },
  { id: 'map', label: 'الخريطة', short: 'الخريطة', icon: 'map' },
  { id: 'calendar', label: 'التقويم', short: 'التقويم', icon: 'calendar' },
  { id: 'experiences', label: 'التجارب', short: 'التجارب', icon: 'telescope' },
  { id: 'providers', label: 'مقدمو الخدمات', short: 'المرشدون', icon: 'users' },
  { id: 'support', label: 'خدمة العملاء', short: 'الدعم', icon: 'info' },
]

type Booking = { item: Bookable; kind: string } | null

export default function App() {
  const { route, go } = useHashRoute()
  const { favs, has, toggle } = useFavorites()
  const [siteId, setSiteId] = useState<string | null>(null)
  const [expId, setExpId] = useState<string | null>(null)
  const [proId, setProId] = useState<string | null>(null)
  const [booking, setBooking] = useState<Booking>(null)
  const [mapSel, setMapSel] = useState<string | null>(null)

  const closeAll = () => { setSiteId(null); setExpId(null); setProId(null) }
  const actions: Actions = {
    openSite: useCallback((id: string) => { setExpId(null); setProId(null); setSiteId(id) }, []),
    openExp: useCallback((id: string) => { setSiteId(null); setProId(null); setExpId(id) }, []),
    openPro: useCallback((id: string) => { setSiteId(null); setExpId(null); setProId(id) }, []),
    book: useCallback((id: string) => {
      const e = experiences.find((x) => x.id === id)
      setExpId(null)
      if (e) setBooking({ item: e, kind: 'تجربة' })
    }, []),
    bookPro: useCallback((id: string) => {
      const p = providers.find((x) => x.id === id)
      setProId(null)
      if (p) setBooking({ item: { id: p.id, title: p.name, location: `${p.role} · ${p.region}`, duration: p.duration, price: p.price }, kind: 'مقدم خدمة' })
    }, []),
    isFav: has,
    toggleFav: toggle,
  }
  const site = sites.find((s) => s.id === siteId) ?? null
  const exp = experiences.find((e) => e.id === expId) ?? null
  const pro = providers.find((p) => p.id === proId) ?? null
  const favCount = favs.length
  const navGo = (r: Route) => { closeAll(); go(r) }

  const favButton = (
    <button
      type="button"
      onClick={() => navGo('favorites')}
      aria-label={`المفضلة (${favCount})`}
      aria-current={route === 'favorites' ? 'page' : undefined}
      className={`relative grid place-items-center w-10 h-10 rounded-full border transition ${route === 'favorites' ? 'border-gold/60 text-gold bg-white/10' : 'border-white/15 text-sand hover:text-gold'}`}
    >
      <Icon name="heart" className="w-5 h-5" filled={route === 'favorites'} />
      {favCount > 0 && <span className="absolute -top-1 -left-1 min-w-[18px] h-[18px] grid place-items-center rounded-full bg-gold text-night text-[10px] font-bold px-1 num">{favCount}</span>}
    </button>
  )

  return (
    <div className="min-h-screen flex flex-col pb-20 lg:pb-0">
      <div className="sky" />
      <header className="sticky z-[900] bg-night/75 backdrop-blur-md border-b border-white/5" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
        <div className="gutter max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
          <button type="button" onClick={() => navGo('home')} className="flex items-center gap-2.5" aria-label="سمرة: الصفحة الرئيسية">
            <img src={logo} alt="" className="w-11 h-auto" />
            <span className="font-display text-2xl text-gold-soft leading-none">سمرة</span>
            <span className="hidden sm:inline text-xs text-mist border-r border-white/15 pr-2.5">ليلٌ يُروى، وسماءٌ تُكتشف</span>
          </button>
          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-1" aria-label="التنقل الرئيسي">
              {nav.map((n) => (
                <button
                  type="button"
                  key={n.id}
                  onClick={() => navGo(n.id)}
                  aria-current={route === n.id ? 'page' : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm transition whitespace-nowrap ${route === n.id ? 'bg-white/10 text-gold' : 'text-mist hover:text-white'}`}
                >
                  {n.label}
                </button>
              ))}
            </nav>
            {favButton}
          </div>
        </div>
      </header>

      <main className="flex-1" key={route}>
        <div className="fade-up">
          {route === 'home' && <Home go={navGo} actions={actions} />}
          {route === 'map' && <MapPage actions={actions} selected={mapSel} setSelected={setMapSel} />}
          {route === 'calendar' && <CalendarPage actions={actions} />}
          {route === 'experiences' && <ExperiencesPage actions={actions} />}
          {route === 'providers' && <ProvidersPage actions={actions} />}
          {route === 'support' && <SupportPage />}
          {route === 'favorites' && <FavoritesPage actions={actions} favs={favs} go={navGo} />}
        </div>
      </main>

      <footer className="gutter border-t border-white/5 mt-10">
        <div className="max-w-7xl mx-auto py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-mist">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="w-12 h-auto opacity-90" />
            <div>
              <p className="font-display text-base text-gold-soft">سمرة · SAMRA</p>
              <p>نموذج أولي لهاكاثون السياحة الفلكية في المملكة العربية السعودية</p>
            </div>
          </div>
          <div className="grid gap-1">
            <button type="button" onClick={() => navGo('support')} className="text-gold hover:underline text-right">تحتاج مساعدة؟ تواصل مع خدمة العملاء</button>
            <p>جميع المواقع والأسعار والتقييمات بيانات تجريبية لأغراض العرض. بيانات الخريطة © OpenStreetMap.</p>
          </div>
        </div>
      </footer>

      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-[900] bg-night/90 backdrop-blur-md border-t border-white/10 grid grid-cols-6"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)', paddingLeft: 'env(safe-area-inset-left, 0px)', paddingRight: 'env(safe-area-inset-right, 0px)' }}
        aria-label="التنقل السفلي"
      >
        {nav.map((n) => (
          <button type="button" key={n.id} onClick={() => navGo(n.id)} aria-current={route === n.id ? 'page' : undefined} className={`flex flex-col items-center gap-1 py-2.5 text-[10.5px] whitespace-nowrap ${route === n.id ? 'text-gold' : 'text-mist'}`}>
            <Icon name={n.icon} className="w-5 h-5" />
            {n.short}
          </button>
        ))}
      </nav>

      <SiteDetail
        site={site}
        onClose={() => setSiteId(null)}
        fav={site ? has('site', site.id) : false}
        onFav={() => site && toggle('site', site.id)}
        onShowMap={site ? () => { setMapSel(site.id); setSiteId(null); go('map') } : undefined}
        onOpenExp={actions.openExp}
      />
      <ExperienceDetail
        exp={exp}
        onClose={() => setExpId(null)}
        fav={exp ? has('exp', exp.id) : false}
        onFav={() => exp && toggle('exp', exp.id)}
        onBook={() => exp && actions.book(exp.id)}
        onOpenSite={actions.openSite}
      />
      <ProviderDetail p={pro} actions={actions} onClose={() => setProId(null)} />
      {booking && <BookingModal key={booking.item.id} exp={booking.item} kind={booking.kind} onClose={() => setBooking(null)} />}
    </div>
  )
}
