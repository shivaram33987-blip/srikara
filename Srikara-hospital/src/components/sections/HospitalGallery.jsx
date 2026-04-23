import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Instagram, MapPin } from 'lucide-react'

/* ─── GALLERY PHOTOS ────────────────────────────────────────
   Sourced from Google Maps / public hospital imagery
──────────────────────────────────────────────────────────── */
const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200',
    label: 'LB Nagar — Flagship Centre', tag: 'Facility', span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&q=80&w=800',
    label: 'State-of-the-Art OT Complex', tag: 'Infrastructure', span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800',
    label: 'Robotic Surgery Suite', tag: 'Technology', span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
    label: 'Advanced Diagnostics Lab', tag: 'Diagnostics', span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    label: 'Cardiac Cath Lab', tag: 'Cardiology', span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    label: 'MRI & Imaging Centre', tag: 'Radiology', span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=1200',
    label: 'Patient Recovery Suites', tag: 'Patient Care', span: 'col-span-2 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=800',
    label: 'Specialist Consultation Rooms', tag: 'Consultation', span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&q=80&w=800',
    label: 'Intensive Care Unit', tag: 'Critical Care', span: 'col-span-1 row-span-1',
  },
]

/* ─── LIGHTBOX ──────────────────────────────────────────── */
function Lightbox({ photo, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <img src={photo.src} alt={photo.label} className="w-full max-h-[80vh] object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8B1A4A] mb-1 block">{photo.tag}</span>
            <p className="text-white text-xl font-bold">{photo.label}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#8B1A4A] transition-all"
          >
            <X size={18} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── PHOTO CARD ────────────────────────────────────────── */
function PhotoCard({ photo, index, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`${photo.span} group relative overflow-hidden rounded-3xl cursor-pointer`}
      onClick={() => onClick(photo)}
    >
      <img
        src={photo.src}
        alt={photo.label}
        className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
        style={{ minHeight: '200px' }}
        onError={e => { e.currentTarget.parentElement.style.display = 'none' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Tag */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#8B1A4A] text-white shadow-lg">
          {photo.tag}
        </span>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
          <ZoomIn size={15} />
        </div>
      </div>

      {/* Label */}
      <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
        <p className="text-white font-bold text-sm leading-tight">{photo.label}</p>
      </div>
    </motion.div>
  )
}

/* ─── MAIN COMPONENT ────────────────────────────────────── */
export function HospitalGallery() {
  const [lightbox, setLightbox] = useState(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="py-16 sm:py-28 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,26,74,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4 sm:mb-5"
            >
              <span className="w-8 h-[2px] bg-[#8B1A4A]" />
              <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.45em]">Inside Srikara</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1A202C] tracking-tighter leading-[0.95]"
            >
              Our Facilities &<br />
              <span className="text-[#8B1A4A]">Infrastructure</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-6 flex-shrink-0"
          >
            <div className="flex items-center gap-2 text-[#94A3B8] text-xs font-bold uppercase tracking-widest">
              <MapPin size={13} className="text-[#8B1A4A]" />
              9 Branches across AP & Telangana
            </div>
            <div className="flex items-center gap-2 text-[#94A3B8] text-xs font-bold uppercase tracking-widest">
              <Instagram size={13} className="text-[#8B1A4A]" />
              @srikarahospitals
            </div>
          </motion.div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[220px] gap-3 sm:gap-4">
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} onClick={setLightbox} />
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[#EDF2F7]"
        >
          <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-[0.3em]">
            Photos from our facilities across Hyderabad & Andhra Pradesh
          </p>
          <a
            href="https://www.google.com/maps/search/Srikara+Hospitals+Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#8B1A4A] border-b-2 border-[#8B1A4A] pb-0.5 hover:gap-4 transition-all duration-300"
          >
            View on Google Maps →
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
