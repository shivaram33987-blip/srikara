import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { VideoHero } from '@/components/sections/VideoHero'
import { SmartCareFinder } from '@/components/sections/SmartCareFinder'
import { LandingSpecialtiesGrid } from '@/components/sections/LandingSpecialtiesGrid'
import { PremiumLocationsSection } from '@/components/sections/PremiumLocationsSection'
import { InstitutionalTrust } from '@/components/sections/InstitutionalTrust'
import { LuxuryBlogSection } from '@/components/sections/LuxuryBlogSection'
import { GoogleReviewsSection } from '@/components/sections/GoogleReviewsSection'
import { lbNagar as branch } from '@/data/branches/lb-nagar'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Srikara Hospitals | {branch.title} Landing</title>
        <meta name="description" content={branch.description} />
      </Helmet>

      <div className="min-h-screen bg-surface font-body text-on-surface antialiased">
        <StickyNavbar currentBranch={branch} />

        <VideoHero branch={branch}>
          <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-24">
            
            {/* Architectural Identity Tag */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-12"
            >
               <span className="h-0.5 w-16 bg-[#8B1A4A]" />
               <span className="text-white text-[10px] font-black uppercase tracking-[0.5em] drop-shadow-lg">
                 South India's Premier Robotic Multi-Specialty Hospital
               </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <h1 className="text-white text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em] mb-12">
                Redefining <br />
                <span className="text-[#8B1A4A]">Life-Saving</span> <br />
                Clinical <span className="italic font-serif font-light text-white/90">Precision.</span>
              </h1>
              
              <div className="flex flex-col md:flex-row gap-12 items-start md:items-center border-t border-white/10 pt-12">
                <p className="text-white/70 text-lg font-medium max-w-xl leading-relaxed border-l-2 border-[#8B1A4A] pl-10">
                  Srikara Hospitals is a premier <span className="text-white font-bold">Multi-Specialty</span> ecosystem 
                  integrating world-class robotic precision with compassionate clinical wisdom across 
                  <span className="text-white"> Cardiology, Orthopedics, Neurology,</span> and beyond.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => navigate('/book')}
                    className="bg-[#8B1A4A] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-[0_20px_40px_rgba(139,26,74,0.3)] hover:scale-105 transition-all text-center"
                  >
                    Schedule Consultation
                  </button>
                  <button
                    onClick={() => navigate('/branches')}
                    className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all text-center"
                  >
                    Locate a Branch
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Premium Stats Grid */}
            <div className="hidden sm:grid absolute bottom-8 sm:bottom-16 right-4 sm:right-12 lg:right-24 grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
               {[
                 { label: 'Patient Journeys', value: '500K+' },
                 { label: 'Expert Consultants', value: '150+' },
                 { label: 'Robotic Centers', value: '08' },
                 { label: 'Clinical Specialties', value: '25+' }
               ].map((stat, idx) => (
                 <div key={idx} className="p-4 sm:p-8 hover:bg-white/5 transition-colors">
                    <div className="text-2xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>

          </div>
        </VideoHero>

        <section id="specialties">
          <LandingSpecialtiesGrid />
        </section>

        <SmartCareFinder />

        <InstitutionalTrust />

        <section id="locations" className="bg-white">
          <PremiumLocationsSection />
        </section>

        <GoogleReviewsSection />

        <LuxuryBlogSection />

        <div className="xl:pl-0">

          <Footer />
          <MobileBottomNav />
        </div>
      </div>
    </>
  )
}

