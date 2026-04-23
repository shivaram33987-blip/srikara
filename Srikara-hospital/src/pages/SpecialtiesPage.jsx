import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, ChevronRight, Heart, Brain, Bone, Baby, Zap,
  Activity, ShieldCheck, Wind, Droplets, FlaskConical,
  Microscope, Sparkles, Radiation, Phone, Calendar,
  ArrowRight, CheckCircle
} from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

/* ─── DATA ─────────────────────────────────────────────────── */
const SPECIALTIES = [
  {
    id: 'ortho', name: 'Orthopaedics & Robotic Surgery',
    category: 'SURGICAL', icon: Bone, accent: '#1a56db',
    tagline: 'India\'s largest robotic joint replacement program',
    desc: 'NAVIO-assisted robotic knee & hip replacements, arthroscopy, complex limb reconstruction, and sports injury management with sub-millimetre precision.',
    procedures: ['Robotic Knee Replacement', 'Hip Arthroplasty', 'Arthroscopy', 'Spine Surgery', 'Fracture Management'],
    docs: 25, featured: true,
  },
  {
    id: 'cardio', name: 'Cardiology & Cardiac Surgery',
    category: 'MEDICAL', icon: Heart, accent: '#dc2626',
    tagline: '24/7 cath lab with interventional cardiology',
    desc: 'Comprehensive cardiac care including coronary angioplasty, bypass surgery, valve replacement, structural heart interventions, and advanced heart failure management.',
    procedures: ['Coronary Angioplasty', 'CABG', 'Valve Replacement', 'TAVR', 'Heart Failure Management'],
    docs: 18, featured: true,
  },
  {
    id: 'neuro', name: 'Neurology & Neurosurgery',
    category: 'SURGICAL', icon: Brain, accent: '#7c3aed',
    tagline: 'Precision care for brain, spine & nervous system',
    desc: 'Comprehensive stroke care, brain tumour resection, micro-neurosurgery, epilepsy management, deep brain stimulation, and minimally invasive spinal reconstruction.',
    procedures: ['Stroke Care', 'Brain Tumour Surgery', 'Spine Reconstruction', 'Epilepsy Management', 'DBS'],
    docs: 14,
  },
  {
    id: 'onco', name: 'Oncology & Cancer Care',
    category: 'MEDICAL', icon: Radiation, accent: '#9333ea',
    tagline: 'Multidisciplinary tumour board. Targeted therapy.',
    desc: 'Surgical, medical, and radiation oncology under one roof. Personalised cancer care with targeted therapy, immunotherapy, and comprehensive palliative support.',
    procedures: ['Surgical Oncology', 'Chemotherapy', 'Immunotherapy', 'Radiation Therapy', 'Palliative Care'],
    docs: 22, featured: true,
  },
  {
    id: 'nephro', name: 'Nephrology & Dialysis',
    category: 'MEDICAL', icon: Droplets, accent: '#0891b2',
    tagline: 'Advanced renal care & kidney transplant coordination',
    desc: 'State-of-the-art dialysis centre, kidney transplant coordination, CKD management, interventional nephrology, and renal replacement therapy.',
    procedures: ['Haemodialysis', 'Peritoneal Dialysis', 'Kidney Transplant', 'CKD Management', 'Interventional Nephrology'],
    docs: 11,
  },
  {
    id: 'gyn', name: 'Obstetrics & Gynaecology',
    category: 'WOMEN_CHILD', icon: Baby, accent: '#db2777',
    tagline: 'Comprehensive women\'s health at every stage',
    desc: 'High-risk pregnancy management, advanced laparoscopic gynaecology, fertility treatments, minimally invasive hysterectomy, and maternal wellness programs.',
    procedures: ['High-Risk Obstetrics', 'Laparoscopic Gynaecology', 'IVF & IUI', 'Hysterectomy', 'Maternal Wellness'],
    docs: 16,
  },
  {
    id: 'emergency', name: 'Emergency & Critical Care',
    category: 'EMERGENCY', icon: Zap, accent: '#dc2626',
    tagline: 'Level I trauma centre. Golden-hour response.',
    desc: 'Round-the-clock emergency medicine, advanced trauma care, multi-specialty ICU with 1:1 nursing, ventilator management, and rapid response protocols.',
    procedures: ['Trauma Resuscitation', 'Multi-Specialty ICU', 'Ventilator Management', 'ACLS', 'Rapid Response'],
    docs: 30, featured: true, live: true,
  },
  {
    id: 'pulmo', name: 'Pulmonology & Chest Medicine',
    category: 'MEDICAL', icon: Wind, accent: '#0d9488',
    tagline: 'Advanced respiratory care & bronchoscopy',
    desc: 'Comprehensive respiratory medicine including bronchoscopy, sleep study lab, COPD management, interstitial lung disease clinic, and pulmonary rehabilitation.',
    procedures: ['Bronchoscopy', 'Sleep Study', 'COPD Management', 'ILD Clinic', 'Pulmonary Rehab'],
    docs: 9,
  },
  {
    id: 'gastro', name: 'Gastroenterology & Hepatology',
    category: 'MEDICAL', icon: Activity, accent: '#16a34a',
    tagline: 'Therapeutic endoscopy & liver disease management',
    desc: 'Advanced therapeutic endoscopy, ERCP, liver disease management, IBD clinic, GI oncology, and minimally invasive GI surgery.',
    procedures: ['Therapeutic Endoscopy', 'ERCP', 'Hepatology', 'IBD Management', 'GI Surgery'],
    docs: 15,
  },
  {
    id: 'urology', name: 'Urology & Andrology',
    category: 'SURGICAL', icon: Activity, accent: '#d97706',
    tagline: 'Robotic urological surgery & kidney transplant',
    desc: 'Robotic-assisted urological procedures, kidney transplant, laser urology, stone disease management, and comprehensive men\'s health services.',
    procedures: ['Robotic Prostatectomy', 'Kidney Transplant', 'Laser TURP', 'Stone Disease', 'Men\'s Health'],
    docs: 12,
  },
  {
    id: 'peds', name: 'Paediatrics & Neonatology',
    category: 'WOMEN_CHILD', icon: Baby, accent: '#f59e0b',
    tagline: 'Level III NICU. Expert care from day one.',
    desc: 'Level III NICU for premature and critically ill newborns, comprehensive child healthcare, paediatric subspecialties, and immunisation programs.',
    procedures: ['Level III NICU', 'Paediatric ICU', 'Immunisation', 'Child Nutrition', 'Developmental Paediatrics'],
    docs: 22,
  },
  {
    id: 'radio', name: 'Radiology & Diagnostics',
    category: 'DIAGNOSTICS', icon: Microscope, accent: '#475569',
    tagline: '3T MRI · PET-CT · AI-assisted reporting · NABL',
    desc: 'Advanced imaging with 3T MRI, 128-slice CT, PET-CT, interventional radiology, AI-assisted reporting, and NABL-accredited molecular pathology.',
    procedures: ['3T MRI', '128-Slice CT', 'PET-CT', 'Interventional Radiology', 'Molecular Pathology'],
    docs: 20,
  },
  {
    id: 'physio', name: 'Physiotherapy & Rehabilitation',
    category: 'DIAGNOSTICS', icon: Activity, accent: '#16a34a',
    tagline: 'Neuro-rehab · Sports injury · Post-surgical recovery',
    desc: 'Comprehensive rehabilitation including neuro-rehabilitation, sports injury recovery, post-surgical physiotherapy, and occupational therapy.',
    procedures: ['Neuro Rehabilitation', 'Sports Injury', 'Post-Surgical Rehab', 'Occupational Therapy', 'Pain Management'],
    docs: 18,
  },
  {
    id: 'fertility', name: 'Fertility & Reproductive Medicine',
    category: 'WOMEN_CHILD', icon: Sparkles, accent: '#c026d3',
    tagline: 'Precision reproductive medicine & genetic screening',
    desc: 'Advanced fertility treatments including IVF, IUI, ICSI, preimplantation genetic testing, egg freezing, and comprehensive reproductive endocrinology.',
    procedures: ['IVF', 'IUI & ICSI', 'Egg Freezing', 'PGT', 'Reproductive Endocrinology'],
    docs: 5,
  },
]

const CATS = [
  { id: 'ALL',         label: 'All Specialties',  count: SPECIALTIES.length },
  { id: 'MEDICAL',     label: 'Medical',           count: SPECIALTIES.filter(s => s.category === 'MEDICAL').length },
  { id: 'SURGICAL',    label: 'Surgical',          count: SPECIALTIES.filter(s => s.category === 'SURGICAL').length },
  { id: 'WOMEN_CHILD', label: 'Women & Child',     count: SPECIALTIES.filter(s => s.category === 'WOMEN_CHILD').length },
  { id: 'DIAGNOSTICS', label: 'Diagnostics',       count: SPECIALTIES.filter(s => s.category === 'DIAGNOSTICS').length },
  { id: 'EMERGENCY',   label: 'Emergency',         count: SPECIALTIES.filter(s => s.category === 'EMERGENCY').length },
]

/* ─── SPECIALTY ROW ────────────────────────────────────────── */
function SpecialtyRow({ sp, index }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const Icon = sp.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group border-b border-[#EDF2F7] last:border-0"
    >
      {/* Main row */}
      <div
        className="flex items-center gap-6 py-6 px-6 cursor-pointer hover:bg-[#FAFBFC] transition-colors duration-200"
        onClick={() => setOpen(o => !o)}
      >
        {/* Index */}
        <span className="hidden sm:block w-8 text-[11px] font-bold text-[#CBD5E0] flex-shrink-0 text-right">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{ background: sp.accent + '12' }}>
          <Icon size={20} style={{ color: sp.accent }} />
        </div>

        {/* Name + tagline */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-[15px] font-bold text-[#1A202C] group-hover:text-[#8B1A4A] transition-colors duration-200 leading-tight">
              {sp.name}
            </h3>
            {sp.featured && (
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#8B1A4A]/8 text-[#8B1A4A] border border-[#8B1A4A]/15 flex-shrink-0">
                Centre of Excellence
              </span>
            )}
            {sp.live && (
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-200 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />24/7
              </span>
            )}
          </div>
          <p className="text-[12px] text-[#94A3B8] mt-0.5 font-medium hidden sm:block">{sp.tagline}</p>
        </div>

        {/* Specialists count */}
        <div className="hidden md:flex flex-col items-center flex-shrink-0 w-20">
          <span className="text-lg font-black text-[#1A202C]">{sp.docs}</span>
          <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Specialists</span>
        </div>

        {/* Book button */}
        <button
          onClick={e => { e.stopPropagation(); navigate('/book') }}
          className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full border-2 transition-all duration-200 flex-shrink-0"
          style={{ borderColor: sp.accent, color: sp.accent }}
          onMouseEnter={e => { e.currentTarget.style.background = sp.accent; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = sp.accent }}
        >
          Book <ArrowRight size={12} />
        </button>

        {/* Expand chevron */}
        <ChevronRight
          size={16}
          className={`text-[#CBD5E0] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
        />
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-8 pt-2 sm:ml-[3.75rem] border-l-2"
              style={{ borderColor: sp.accent + '30' }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description */}
                <div className="lg:col-span-2">
                  <p className="text-[#4A5568] text-sm leading-relaxed mb-6">{sp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {sp.procedures.map(p => (
                      <span key={p}
                        className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#475569]">
                        <CheckCircle size={10} style={{ color: sp.accent }} />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button onClick={() => navigate('/book')}
                    className="w-full h-11 rounded-xl text-white text-[11px] font-black uppercase tracking-widest transition-all duration-200 hover:opacity-90"
                    style={{ background: sp.accent }}>
                    Book Appointment
                  </button>
                  <button onClick={() => navigate('/doctors')}
                    className="w-full h-11 rounded-xl text-[11px] font-black uppercase tracking-widest border-2 transition-all duration-200 hover:bg-[#F8FAFC]"
                    style={{ borderColor: sp.accent + '40', color: sp.accent }}>
                    Meet Specialists
                  </button>
                  <a href="tel:04068324800"
                    className="w-full h-11 rounded-xl text-[11px] font-black uppercase tracking-widest border border-[#E2E8F0] text-[#64748B] flex items-center justify-center gap-2 hover:bg-[#F8FAFC] transition-all">
                    <Phone size={13} /> Call Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── PAGE ─────────────────────────────────────────────────── */
export function SpecialtiesPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [cat, setCat] = useState(searchParams.get('f') || 'ALL')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() =>
    SPECIALTIES.filter(s =>
      (cat === 'ALL' || s.category === cat) &&
      (!search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.procedures.some(p => p.toLowerCase().includes(search.toLowerCase())))
    ), [cat, search])

  return (
    <>
      <Helmet><title>Centres of Excellence | Srikara Hospitals</title></Helmet>

      <div className="min-h-screen bg-white font-sans text-[#1A202C] antialiased">
        <StickyNavbar />

        {/* ── HERO ── */}
        <section className="pt-24 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 bg-white border-b border-[#EDF2F7]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10">

              <div className="max-w-2xl">
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="w-8 h-[2px] bg-[#8B1A4A]" />
                  <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.45em]">Centres of Excellence</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1A202C] tracking-tighter leading-[1.0] mb-4 sm:mb-5">
                  Our Medical<br />
                  <span className="text-[#8B1A4A]">Specialties</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="text-[#64748B] text-sm sm:text-base leading-relaxed max-w-lg">
                  40+ departments staffed by 500+ board-certified specialists, delivering NABH-accredited care across every medical and surgical discipline.
                </motion.p>
              </div>

              {/* Stats strip */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-px bg-[#EDF2F7] border border-[#EDF2F7] rounded-2xl overflow-hidden flex-shrink-0">
                {[
                  { v: '40+',  l: 'Departments' },
                  { v: '500+', l: 'Specialists' },
                  { v: '27K+', l: 'Surgeries' },
                  { v: 'NABH', l: 'Accredited' },
                ].map(s => (
                  <div key={s.l} className="bg-white px-8 py-5 text-center min-w-[100px]">
                    <div className="text-2xl font-black text-[#8B1A4A] tracking-tight">{s.v}</div>
                    <div className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mt-0.5">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FILTER + SEARCH BAR ── */}
        <div className="sticky top-[64px] z-40 bg-white border-b border-[#EDF2F7] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-72 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={14} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search specialty…"
                className="w-full h-10 pl-9 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[13px] placeholder-[#94A3B8] focus:outline-none focus:border-[#8B1A4A]/40 transition-all" />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 w-full">
              {CATS.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)}
                  className={`flex-shrink-0 flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    cat === c.id
                      ? 'bg-[#8B1A4A] text-white'
                      : 'text-[#64748B] hover:bg-[#F1F5F9]'
                  }`}>
                  {c.label}
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full hidden sm:inline ${
                    cat === c.id ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#94A3B8]'
                  }`}>{c.count}</span>
                </button>
              ))}
            </div>

            <span className="hidden lg:block flex-shrink-0 text-[11px] font-bold text-[#94A3B8]">
              {filtered.length} of {SPECIALTIES.length}
            </span>
          </div>
        </div>

        {/* ── SPECIALTY LIST ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-16 sm:pb-24">

          {/* Column headers */}
          <div className="hidden sm:flex items-center gap-6 px-4 sm:px-6 pb-3 border-b border-[#EDF2F7] mb-2">
            <span className="w-8 flex-shrink-0" />
            <span className="w-11 flex-shrink-0" />
            <span className="flex-1 text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">Specialty</span>
            <span className="w-20 text-center text-[10px] font-black uppercase tracking-widest text-[#94A3B8] hidden md:block">Team</span>
            <span className="w-24 text-center text-[10px] font-black uppercase tracking-widest text-[#94A3B8] hidden sm:block">Appointment</span>
            <span className="w-4 flex-shrink-0" />
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-24">
                <p className="text-[#94A3B8] text-lg">No results for "{search}"</p>
              </motion.div>
            ) : (
              <motion.div key={cat + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white border border-[#EDF2F7] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                {filtered.map((sp, i) => (
                  <SpecialtyRow key={sp.id} sp={sp} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="bg-[#F8FAFC] border-t border-[#EDF2F7] py-20 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-white rounded-3xl border border-[#EDF2F7] shadow-[0_4px_32px_rgba(0,0,0,0.05)] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <p className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Get Started</p>
                <h2 className="text-4xl md:text-5xl font-black text-[#1A202C] tracking-tighter leading-tight mb-4">
                  Find the Right<br />Specialist for You.
                </h2>
                <p className="text-[#64748B] text-base leading-relaxed">
                  Our team of 500+ board-certified specialists is ready to provide world-class, personalised care.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
                <button onClick={() => navigate('/book')}
                  className="h-13 px-10 py-3.5 bg-[#8B1A4A] text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#5E0F30] transition-all shadow-[0_8px_24px_rgba(139,26,74,0.25)] flex items-center justify-center gap-2 group">
                  Book Appointment
                  <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate('/doctors')}
                  className="h-13 px-10 py-3.5 border-2 border-[#1A202C] text-[#1A202C] rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#1A202C] hover:text-white transition-all flex items-center justify-center gap-2">
                  Meet Our Doctors
                </button>
                <a href="tel:04068324800"
                  className="h-13 px-10 py-3.5 border border-[#E2E8F0] text-[#64748B] rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#F8FAFC] transition-all flex items-center justify-center gap-2">
                  <Phone size={13} /> 040 6832 4800
                </a>
              </div>
            </div>

            {/* Accreditation strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {['NABH Accredited', 'ISO 9001:2015', '500+ Specialists', '40+ Departments', '99% Success Rate', '24/7 Emergency Care'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                  <span className="w-1 h-1 rounded-full bg-[#8B1A4A]" />{t}
                </span>
              ))}
            </div>
          </div>
        </section>

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
