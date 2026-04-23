import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Search, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { useState, useRef } from 'react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { BranchSideNav } from '@/components/layout/BranchSideNav'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { ALL_DOCTORS, getSpecialties, ACCENT_MAP } from '@/data/doctors'
import { branches } from '@/data/branches'

// Branch display order & metadata
const BRANCH_ORDER = [
  'L.B. Nagar', 'Peerzadiguda', 'ECIL', 'Kompally',
  'Lakdikapul', 'RTC X Roads', 'Miyapur', 'Vijayawada', 'Rajahmundry',
]

const BRANCH_META = {
  'L.B. Nagar':   { icon: '🏥', color: '#8B1A4A', slug: 'lb-nagar' },
  'Peerzadiguda': { icon: '🔬', color: '#1a56db', slug: 'peerzadiguda' },
  'ECIL':         { icon: '🧠', color: '#7c3aed', slug: 'ecil' },
  'Kompally':     { icon: '❤️', color: '#dc2626', slug: 'kompally' },
  'Lakdikapul':   { icon: '🦴', color: '#0891b2', slug: 'lakdikapul' },
  'RTC X Roads':  { icon: '🤖', color: '#d97706', slug: 'rtc-x-roads' },
  'Miyapur':      { icon: '🩺', color: '#16a34a', slug: 'miyapur' },
  'Vijayawada':   { icon: '⚕️', color: '#9333ea', slug: 'vijayawada' },
  'Rajahmundry':  { icon: '🏨', color: '#0d9488', slug: 'rajahmundry' },
}

function DoctorCard({ doctor, onView, onBook }) {
  const { accent } = ACCENT_MAP[doctor.specialtyId] || { accent: '#8B1A4A' }
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-5 border border-[#E8EDF2] hover:shadow-lg hover:border-[#8B1A4A]/20 transition-all duration-300 flex flex-col items-center text-center">
      <div className="relative mb-3">
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#F1F5F9] shadow-md">
          <img src={doctor.image} alt={doctor.name}
            className="w-full h-full object-cover object-[center_15%]"
            onError={e => { if (doctor.fallback) e.target.src = doctor.fallback }} />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-full px-2 py-0.5 shadow-sm">
          <Star size={9} className="fill-amber-400 text-amber-400" />
          <span className="text-[10px] font-bold text-[#1A202C]">{doctor.rating}</span>
        </div>
      </div>

      <h3 className="font-bold text-[#1A202C] text-xs sm:text-sm leading-tight mb-1">{doctor.name}</h3>
      <p className="text-[10px] font-semibold mb-1" style={{ color: accent }}>{doctor.specialty}</p>
      <p className="text-[#94A3B8] text-[10px] mb-2 hidden sm:block">⏱ {doctor.exp}</p>
      <p className="text-[#64748B] text-[10px] leading-relaxed mb-3 line-clamp-2 hidden sm:block">{doctor.label}</p>

      <div className="w-full flex flex-col gap-1.5 mt-auto">
        <button onClick={() => onView(doctor)}
          className="w-full py-1.5 bg-white text-[#2D3A4A] border border-[#2D3A4A] text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#2D3A4A] hover:text-white transition-all duration-300">
          Profile
        </button>
        <button onClick={() => onBook(doctor)}
          className="w-full py-1.5 bg-[#8B1A4A] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#6c1439] transition-all duration-300">
          Book
        </button>
      </div>
    </div>
  )
}

function BranchSection({ branchName, doctors, onView, onBook, navigate }) {
  const meta = BRANCH_META[branchName] || { icon: '🏥', color: '#8B1A4A', slug: '' }
  // branches data uses 'LB Nagar' while doctors use 'L.B. Nagar' — normalize for lookup
  const normalizedTitle = branchName === 'L.B. Nagar' ? 'LB Nagar' : branchName
  const branchData = branches.find(b => b.title === normalizedTitle)
  const address = branchData?.address || ''

  // Deduplicate by slug
  const unique = doctors.filter((d, i, arr) => i === arr.findIndex(x => x.slug === d.slug))

  if (unique.length === 0) return null

  return (
    <section className="mb-14">
      {/* Branch header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2"
        style={{ borderColor: meta.color + '30' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0"
            style={{ background: meta.color + '15' }}>
            {meta.icon}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1A202C]">{branchName}</h2>
            {address && (
              <p className="text-[#94A3B8] text-xs flex items-center gap-1 mt-0.5 line-clamp-1">
                <MapPin size={10} /> {address}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: meta.color + '15', color: meta.color }}>
            {unique.length} Doctor{unique.length !== 1 ? 's' : ''}
          </span>
          {meta.slug && (
            <button
              onClick={() => navigate(`/branches/${meta.slug}`)}
              className="text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all hover:text-white"
              style={{ borderColor: meta.color, color: meta.color }}
              onMouseEnter={e => { e.currentTarget.style.background = meta.color }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
              Visit Branch →
            </button>
          )}
        </div>
      </div>

      {/* Doctors grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {unique.map(doc => (
          <DoctorCard key={doc.id} doctor={doc} onView={onView} onBook={onBook} />
        ))}
      </div>
    </section>
  )
}

export function DoctorsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeBranch, setActiveBranch] = useState('all')
  const tabsRef = useRef(null)

  const branchList = ['all', ...BRANCH_ORDER.filter(b => ALL_DOCTORS.some(d => d.branch === b))]
  const specialties = getSpecialties(activeBranch === 'all' ? null : activeBranch)

  const filtered = ALL_DOCTORS.filter(doc => {
    const matchSearch = search === '' ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.label.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase())
    const matchFilter = activeFilter === 'all' || doc.specialtyId === activeFilter
    const matchBranch = activeBranch === 'all' || doc.branch === activeBranch
    return matchSearch && matchFilter && matchBranch
  })

  // Group by branch in defined order
  const grouped = BRANCH_ORDER.reduce((acc, b) => {
    const docs = filtered.filter(d => d.branch === b)
    if (docs.length > 0) acc[b] = docs
    return acc
  }, {})

  const totalUnique = filtered.filter((d, i, arr) => i === arr.findIndex(x => x.slug === d.slug)).length

  const scrollTabs = (dir) => {
    if (tabsRef.current) tabsRef.current.scrollLeft += dir * 160
  }

  return (
    <>
      <Helmet><title>Our Doctors | Srikara Hospitals</title></Helmet>
      <div className="min-h-screen bg-[#F0F4F8] font-body text-[#1A202C] antialiased">
        <StickyNavbar currentBranch={{ branchLogo: 'https://i.ibb.co/CK9bqmXK/sri-logo.jpg' }} />
        <BranchSideNav currentSlug={null} />

        <div className="xl:pl-16">
          {/* Hero */}
          <section className="pt-24 pb-10 px-4 sm:px-8 text-center bg-[#F0F4F8]">
            <span className="inline-block bg-[#8B1A4A]/10 text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.5em] px-4 py-2 rounded-full mb-6">
              Our Medical Team
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
              Meet Our Expert <span className="text-[#8B1A4A]">Doctors</span>
            </h1>
            <p className="text-[#64748B] text-sm sm:text-base max-w-xl mx-auto mb-8">
              Board-certified specialists across all branches, dedicated to your care.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, specialty..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-full text-sm text-[#1A202C] placeholder-[#94A3B8] focus:outline-none focus:border-[#8B1A4A]/40 shadow-sm" />
            </div>

            {/* Branch filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-4 px-2">
              {branchList.map(b => (
                <button key={b} onClick={() => { setActiveBranch(b); setActiveFilter('all') }}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeBranch === b ? 'bg-[#0D1B2A] text-white' : 'bg-white border border-[#E2E8F0] text-[#4A4A4A] hover:border-[#8B1A4A]/30'
                  }`}>
                  {b === 'all' ? 'All' : b === 'L.B. Nagar' ? 'LB Nagar' : b}
                </button>
              ))}
            </div>

            {/* Specialty filter */}
            <div className="flex items-center gap-2 max-w-4xl mx-auto px-2">
              <button onClick={() => scrollTabs(-1)} className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#8B1A4A] hover:text-white hover:border-[#8B1A4A] transition-all shadow-sm">
                <ChevronLeft size={16} />
              </button>
              <div ref={tabsRef} className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth flex-1">
                {specialties.map(s => (
                  <button key={s.id} onClick={() => setActiveFilter(s.id)}
                    className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeFilter === s.id ? 'bg-[#2D3A4A] text-white shadow-md' : 'bg-white text-[#4A4A4A] border border-[#E2E8F0] hover:border-[#8B1A4A]/30'
                    }`}>
                    {s.name}
                  </button>
                ))}
              </div>
              <button onClick={() => scrollTabs(1)} className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#8B1A4A] hover:text-white hover:border-[#8B1A4A] transition-all shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </section>

          {/* Grouped by branch */}
          <section className="pb-20 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
              <p className="text-xs text-[#94A3B8] mb-8">
                {totalUnique} specialist{totalUnique !== 1 ? 's' : ''} across {Object.keys(grouped).length} branch{Object.keys(grouped).length !== 1 ? 'es' : ''}
              </p>

              {Object.keys(grouped).length > 0 ? (
                Object.entries(grouped).map(([branchName, docs]) => (
                  <BranchSection
                    key={branchName}
                    branchName={branchName}
                    doctors={docs}
                    onView={d => navigate(`/doctors/${d.slug}`)}
                    onBook={d => navigate(`/book/${d.slug}`)}
                    navigate={navigate}
                  />
                ))
              ) : (
                <div className="text-center py-24">
                  <p className="text-[#94A3B8] text-lg">No doctors found for "{search}"</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  )
}
