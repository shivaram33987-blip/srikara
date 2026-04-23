import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Star, MapPin, Phone, Calendar, ArrowLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { ALL_DOCTORS, ACCENT_MAP } from '@/data/doctors'
import { branches } from '@/data/branches'

/* ─── Department config ─────────────────────────────────── */
export const DEPARTMENTS = {
  orthopaedics: {
    name: 'Orthopaedics & Robotic Surgery',
    icon: '🦴',
    accent: '#1a56db',
    accentLight: '#eff6ff',
    tagline: 'India\'s largest robotic joint replacement program',
    desc: 'NAVIO-assisted robotic knee & hip replacements, arthroscopy, complex limb reconstruction, and sports injury management with sub-millimetre precision.',
    specialtyIds: ['ortho'],
    highlights: ['Robotic Knee Replacement', 'Hip Arthroplasty', 'Arthroscopy', 'Spine Surgery', 'Sports Injury'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1200',
  },
  cardiology: {
    name: 'Cardiology & Cardiac Surgery',
    icon: '❤️',
    accent: '#dc2626',
    accentLight: '#fef2f2',
    tagline: '24/7 cath lab with interventional cardiology',
    desc: 'Comprehensive cardiac care including coronary angioplasty, bypass surgery, valve replacement, structural heart interventions, and advanced heart failure management.',
    specialtyIds: ['cardio'],
    highlights: ['Coronary Angioplasty', 'CABG', 'Valve Replacement', 'TAVR', 'Heart Failure'],
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1200',
  },
  neurology: {
    name: 'Neurology & Neurosurgery',
    icon: '🧠',
    accent: '#7c3aed',
    accentLight: '#f5f3ff',
    tagline: 'Precision care for brain, spine & nervous system',
    desc: 'Comprehensive stroke care, brain tumour resection, micro-neurosurgery, epilepsy management, deep brain stimulation, and minimally invasive spinal reconstruction.',
    specialtyIds: ['neuro', 'neurosurg'],
    highlights: ['Stroke Care', 'Brain Tumour Surgery', 'Spine Reconstruction', 'Epilepsy', 'DBS'],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200',
  },
  oncology: {
    name: 'Oncology & Cancer Care',
    icon: '🎗️',
    accent: '#9333ea',
    accentLight: '#faf5ff',
    tagline: 'Multidisciplinary tumour board. Targeted therapy.',
    desc: 'Surgical, medical, and radiation oncology under one roof. Personalised cancer care with targeted therapy, immunotherapy, and comprehensive palliative support.',
    specialtyIds: ['onco'],
    highlights: ['Surgical Oncology', 'Chemotherapy', 'Immunotherapy', 'Radiation Therapy', 'Palliative Care'],
    image: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=1200',
  },
  nephrology: {
    name: 'Nephrology & Dialysis',
    icon: '💧',
    accent: '#0891b2',
    accentLight: '#ecfeff',
    tagline: 'Advanced renal care & kidney transplant coordination',
    desc: 'State-of-the-art dialysis centre, kidney transplant coordination, CKD management, interventional nephrology, and renal replacement therapy.',
    specialtyIds: ['nephro'],
    highlights: ['Haemodialysis', 'Peritoneal Dialysis', 'Kidney Transplant', 'CKD Management'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
  },
  gynaecology: {
    name: 'Obstetrics & Gynaecology',
    icon: '🤰',
    accent: '#db2777',
    accentLight: '#fdf2f8',
    tagline: 'Comprehensive women\'s health at every stage',
    desc: 'High-risk pregnancy management, advanced laparoscopic gynaecology, fertility treatments, minimally invasive hysterectomy, and maternal wellness programs.',
    specialtyIds: ['gyn'],
    highlights: ['High-Risk Obstetrics', 'Laparoscopic Gynaecology', 'IVF & IUI', 'Hysterectomy'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
  },
  fertility: {
    name: 'Fertility & IVF',
    icon: '✨',
    accent: '#c026d3',
    accentLight: '#fdf4ff',
    tagline: 'Precision reproductive medicine & genetic screening',
    desc: 'Advanced fertility treatments including IVF, IUI, ICSI, preimplantation genetic testing, egg freezing, and comprehensive reproductive endocrinology.',
    specialtyIds: ['gyn'],
    highlights: ['IVF', 'IUI & ICSI', 'Egg Freezing', 'PGT', 'Reproductive Endocrinology'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
  },
  paediatrics: {
    name: 'Paediatrics & Neonatology',
    icon: '👶',
    accent: '#f59e0b',
    accentLight: '#fffbeb',
    tagline: 'Level III NICU. Expert care from day one.',
    desc: 'Level III NICU for premature and critically ill newborns, comprehensive child healthcare, paediatric subspecialties, and immunisation programs.',
    specialtyIds: ['peds'],
    highlights: ['Level III NICU', 'Paediatric ICU', 'Immunisation', 'Child Nutrition'],
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1200',
  },
  emergency: {
    name: 'Emergency & Critical Care',
    icon: '⚡',
    accent: '#dc2626',
    accentLight: '#fef2f2',
    tagline: 'Level I trauma centre. Golden-hour response.',
    desc: 'Round-the-clock emergency medicine, advanced trauma care, multi-specialty ICU with 1:1 nursing, ventilator management, and rapid response protocols.',
    specialtyIds: ['critical'],
    highlights: ['Trauma Resuscitation', 'Multi-Specialty ICU', 'Ventilator Management', 'ACLS', '24/7'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
  },
  pulmonology: {
    name: 'Pulmonology & Chest Medicine',
    icon: '🫁',
    accent: '#0d9488',
    accentLight: '#f0fdfa',
    tagline: 'Advanced respiratory care & bronchoscopy',
    desc: 'Comprehensive respiratory medicine including bronchoscopy, sleep study lab, COPD management, interstitial lung disease clinic, and pulmonary rehabilitation.',
    specialtyIds: ['pulmo'],
    highlights: ['Bronchoscopy', 'Sleep Study', 'COPD Management', 'ILD Clinic'],
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1200',
  },
  gastroenterology: {
    name: 'Gastroenterology & Hepatology',
    icon: '🔬',
    accent: '#16a34a',
    accentLight: '#f0fdf4',
    tagline: 'Therapeutic endoscopy & liver disease management',
    desc: 'Advanced therapeutic endoscopy, ERCP, liver disease management, IBD clinic, GI oncology, and minimally invasive GI surgery.',
    specialtyIds: ['general'],
    highlights: ['Therapeutic Endoscopy', 'ERCP', 'Hepatology', 'IBD Management'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
  },
  urology: {
    name: 'Urology & Andrology',
    icon: '🏥',
    accent: '#d97706',
    accentLight: '#fffbeb',
    tagline: 'Robotic urological surgery & kidney transplant',
    desc: 'Robotic-assisted urological procedures, kidney transplant, laser urology, stone disease management, and comprehensive men\'s health services.',
    specialtyIds: ['urology'],
    highlights: ['Robotic Prostatectomy', 'Kidney Transplant', 'Laser TURP', 'Stone Disease'],
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=1200',
  },
  radiology: {
    name: 'Radiology & Diagnostics',
    icon: '📡',
    accent: '#475569',
    accentLight: '#f8fafc',
    tagline: '3T MRI · PET-CT · AI-assisted reporting · NABL',
    desc: 'Advanced imaging with 3T MRI, 128-slice CT, PET-CT, interventional radiology, AI-assisted reporting, and NABL-accredited molecular pathology.',
    specialtyIds: ['radio', 'path'],
    highlights: ['3T MRI', '128-Slice CT', 'PET-CT', 'Interventional Radiology', 'Molecular Pathology'],
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1200',
  },
  physiotherapy: {
    name: 'Physiotherapy & Rehabilitation',
    icon: '🏃',
    accent: '#16a34a',
    accentLight: '#f0fdf4',
    tagline: 'Neuro-rehab · Sports injury · Post-surgical recovery',
    desc: 'Comprehensive rehabilitation including neuro-rehabilitation, sports injury recovery, post-surgical physiotherapy, and occupational therapy.',
    specialtyIds: ['physio'],
    highlights: ['Neuro Rehabilitation', 'Sports Injury', 'Post-Surgical Rehab', 'Occupational Therapy'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
  },
}

/* ─── Branch name → slug map ────────────────────────────── */
const BRANCH_SLUG_MAP = {
  'L.B. Nagar':   'lb-nagar',
  'Peerzadiguda': 'peerzadiguda',
  'ECIL':         'ecil',
  'Kompally':     'kompally',
  'Lakdikapul':   'lakdikapul',
  'RTC X Roads':  'rtc-x-roads',
  'Miyapur':      'miyapur',
  'Vijayawada':   'vijayawada',
  'Rajahmundry':  'rajahmundry',
}

const BRANCH_ORDER = ['L.B. Nagar', 'Peerzadiguda', 'ECIL', 'Kompally', 'Lakdikapul', 'RTC X Roads', 'Miyapur', 'Vijayawada', 'Rajahmundry']

/* ─── Doctor card ───────────────────────────────────────── */
function DoctorCard({ doctor }) {
  const navigate = useNavigate()
  const BRAND = '#8B1A4A'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-[#E8EDF2] hover:shadow-lg hover:border-[#8B1A4A]/20 transition-all duration-300 flex flex-col overflow-hidden group"
    >
      {/* Photo */}
      <div className="relative h-48 overflow-hidden bg-[#F1F5F9]">
        <img src={doctor.image} alt={doctor.name}
          className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
          onError={e => { if (doctor.fallback) e.target.src = doctor.fallback }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Specialty tag — bottom left */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-[#8B1A4A]/90">
            {doctor.specialty}
          </span>
        </div>
        {/* Rating badge — bottom right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white rounded-full px-2.5 py-1 shadow-md">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-bold text-[#1A202C]">{doctor.rating}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <h3 className="font-bold text-[#1A202C] text-sm leading-tight group-hover:text-[#8B1A4A] transition-colors">{doctor.name}</h3>
          {doctor.exp && (
            <span className="text-[9px] font-black text-white px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 bg-[#8B1A4A]">
              {doctor.exp}
            </span>
          )}
        </div>
        <p className="text-[11px] font-semibold mb-1 text-[#1091b2]">{doctor.label}</p>
        <p className="text-[#94A3B8] text-[10px] mb-4">{doctor.sub}</p>

        <div className="flex gap-2 mt-auto">
          <button onClick={() => navigate(`/doctors/${doctor.slug}`)}
            className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-[#2D3A4A] text-[#2D3A4A] hover:bg-[#2D3A4A] hover:text-white transition-all">
            Profile
          </button>
          <button onClick={() => navigate(`/book/${doctor.slug}`)}
            className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl text-white transition-all hover:opacity-90"
            style={{ background: '#8B1A4A' }}>
            Book
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Branch section ────────────────────────────────────── */
function BranchSection({ branchName, doctors, accent, accentLight }) {
  const navigate = useNavigate()
  const slug = BRANCH_SLUG_MAP[branchName] || ''
  const branchData = branches.find(b => b.slug === slug)

  return (
    <section className="mb-16">
      {/* Premium branch header */}
      <div className="relative overflow-hidden rounded-2xl mb-6 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#EDF2F7]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: accent + '15' }}>
              <MapPin size={18} style={{ color: accent }} />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#1A202C] tracking-tight">{branchName}</h2>
              {branchData?.address && (
                <p className="text-[#94A3B8] text-xs mt-0.5 line-clamp-1">{branchData.address}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs font-bold px-4 py-2 rounded-full border"
              style={{ background: accent + '10', color: accent, borderColor: accent + '30' }}>
              {doctors.length} Specialist{doctors.length !== 1 ? 's' : ''}
            </span>
            {slug && (
              <button onClick={() => navigate(`/branches/${slug}`)}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-wider px-5 py-2 rounded-full text-white hover:opacity-90 transition-all shadow-sm"
                style={{ background: '#1091b2' }}>
                Visit Branch <ChevronRight size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {doctors.map(doc => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export function DepartmentPage() {
  const { dept } = useParams()
  const navigate = useNavigate()
  const config = DEPARTMENTS[dept]

  const doctorsByBranch = useMemo(() => {
    if (!config) return {}
    const seen = new Set()
    const all = ALL_DOCTORS.filter(d => {
      if (!config.specialtyIds.includes(d.specialtyId)) return false
      if (seen.has(d.slug)) return false
      seen.add(d.slug)
      return true
    })
    return BRANCH_ORDER.reduce((acc, branch) => {
      const docs = all.filter(d => d.branch === branch)
      if (docs.length > 0) acc[branch] = docs
      return acc
    }, {})
  }, [config])

  const totalDoctors = Object.values(doctorsByBranch).flat().length
  const totalBranches = Object.keys(doctorsByBranch).length

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <p className="text-[#94A3B8] text-xl mb-4">Department not found</p>
          <button onClick={() => navigate('/specialties')} className="text-[#8B1A4A] font-bold hover:underline">
            ← Back to Specialties
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{config.name} | Srikara Hospitals</title>
        <meta name="description" content={config.desc} />
      </Helmet>

      <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1A202C] antialiased">
        <StickyNavbar />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, #0D1B2A 0%, ${config.accent}33 100%)` }}>
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
          {/* Hero image overlay */}
          <div className="absolute inset-0">
            <img src={config.image} alt={config.name} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 pt-32 pb-16">
            {/* Breadcrumb */}
            <button onClick={() => navigate('/specialties')}
              className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors mb-8">
              <ArrowLeft size={14} /> Specialties
            </button>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl">{config.icon}</span>
                  <div className="w-px h-8 bg-white/20" />
                  <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.4em]">Centre of Excellence</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-4">
                  {config.name}
                </h1>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                  {config.desc}
                </p>
                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {config.highlights.map(h => (
                    <span key={h} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/20 text-white/80">
                      <CheckCircle size={10} style={{ color: config.accent }} /> {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden flex-shrink-0">
                {[
                  { v: totalDoctors, l: 'Specialists' },
                  { v: totalBranches, l: 'Branches' },
                  { v: '24/7', l: 'Available' },
                ].map(s => (
                  <div key={s.l} className="px-8 py-5 text-center bg-white/5">
                    <div className="text-2xl font-black text-white tracking-tight">{s.v}</div>
                    <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA strip ── */}
        <div className="bg-white border-b border-[#EDF2F7] px-4 sm:px-8 py-4">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#64748B] text-sm">
              <span className="font-bold text-[#1A202C]">{totalDoctors} specialists</span> across{' '}
              <span className="font-bold text-[#1A202C]">{totalBranches} branches</span> — all available for consultation
            </p>
            <div className="flex gap-3">
              <button onClick={() => navigate('/book')}
                className="flex items-center gap-2 text-white text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all hover:opacity-90"
                style={{ background: '#2E7D32' }}>
                <Calendar size={13} /> Book Appointment
              </button>
              <a href="tel:04068324800"
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full border-2 transition-all hover:opacity-90"
                style={{ borderColor: '#8B1A4A', color: '#8B1A4A', background: 'white' }}>
                <Phone size={13} /> Call Now
              </a>
            </div>
          </div>
        </div>

        {/* ── DOCTORS BY BRANCH ── */}
        <main className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 pb-24">
          {Object.keys(doctorsByBranch).length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#94A3B8] text-lg">No specialists found for this department yet.</p>
            </div>
          ) : (
            Object.entries(doctorsByBranch).map(([branchName, docs]) => (
              <BranchSection
                key={branchName}
                branchName={branchName}
                doctors={docs}
                accent={config.accent}
              />
            ))
          )}
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
