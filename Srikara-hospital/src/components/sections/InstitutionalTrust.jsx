import { motion } from 'framer-motion';
import { Award, Star, ShieldCheck, Cpu, Activity, Droplets, Heart, Brain, Microscope, Stethoscope, Syringe, Zap, UserCheck, Crosshair, Users, Globe, Building2, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';

const clinicalVerticals = [
  { icon: Heart,      label: 'Cardiac Sciences',     dept: 'cardiology' },
  { icon: Cpu,        label: 'Robotic Orthopedics',   dept: 'orthopaedics' },
  { icon: Brain,      label: 'Neuro & Spine Care',    dept: 'neurology' },
  { icon: Droplets,   label: 'Nephrology & Dialysis', dept: 'nephrology' },
  { icon: Microscope, label: 'Advanced Pathologies',  dept: 'radiology' },
  { icon: Zap,        label: 'ER & Trauma',           dept: 'emergency' },
  { icon: UserCheck,  label: 'Internal Medicine',     dept: 'gastroenterology' },
  { icon: Stethoscope,label: 'Critical Care',         dept: 'emergency' },
  { icon: Users,      label: 'Mother & Child',        dept: 'gynaecology' },
  { icon: Globe,      label: 'Medical Tourism',       dept: 'orthopaedics' },
  { icon: Landmark,   label: 'State Insurance',       dept: 'orthopaedics' },
  { icon: Building2,  label: 'Diagnostic Center',     dept: 'radiology' },
  { icon: Syringe,    label: 'Pain Management',       dept: 'physiotherapy' },
  { icon: Activity,   label: 'Rehabilitation',        dept: 'physiotherapy' },
  { icon: ShieldCheck,label: 'Preventive Health',     dept: 'radiology' },
];

const recognitions = [
  { 
    text: 'Honored by 14th President of India Shri Ram Nath Kovind',
    icon: Award 
  },
  { 
    text: 'Times Iconic Multi-Specialty Hospital 2024',
    icon: Star
  },
  { 
    text: 'NABH Accredited Tertiary Care Powerhouse',
    icon: ShieldCheck
  },
  {
    text: 'Ranked No. 1 Multi-Specialty in South India',
    icon: Star
  },
  {
    text: 'Limca Book Record Holder: Surgical Excellence',
    icon: Award
  },
  {
    text: 'Global Excellence Award in Robotic Precision',
    icon: ShieldCheck
  }
];

export function InstitutionalTrust() {
  const navigate = useNavigate()
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Branding */}
      <div className="absolute top-20 right-20 pointer-events-none select-none opacity-[0.02]">
        <h3 className="text-[180px] font-black text-[#8B1A4A] leading-none uppercase tracking-tighter">
          Trust
        </h3>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        
        {/* Modern Identity Header */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6 mb-8"
          >
            <span className="w-16 h-px bg-[#8B1A4A]" />
            <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.5em]">Global Accreditations</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl lg:text-8xl font-black text-[#1A1A1A] tracking-tighter leading-[0.9]"
            >
              Building a <br />
              Legacy of <span className="text-[#8B1A4A]">Trust.</span>
            </motion.h2>
            <p className="max-w-md text-[#4A4A4A] text-xl font-medium leading-relaxed italic border-l-2 border-[#8B1A4A]/20 pl-8">
              "Honored by the highest offices of national leadership for our commitment to ethical medical care."
            </p>
          </div>
        </div>

        {/* Clinical Domain Slider */}
        <div className="relative z-10 mb-32">
          <ImageAutoSlider
            items={clinicalVerticals}
            speed={50}
            renderItem={(item, idx) => (
              <motion.div
                key={item.label + idx}
                whileHover={{ y: -12, backgroundColor: '#8B1A4A', borderColor: '#8B1A4A' }}
                onClick={() => navigate(`/specialties/${item.dept}`)}
                className="group flex flex-col items-center bg-white p-10 w-[280px] rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-200/50 transition-all duration-500 mx-4 cursor-pointer"
              >
                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors">
                  <item.icon className="w-10 h-10 text-[#8B1A4A] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <p className="text-[#1A1A1A] font-black text-[10px] text-center uppercase tracking-[0.2em] leading-relaxed group-hover:text-white">
                  {item.label}
                </p>
              </motion.div>
            )}
          />
        </div>

        {/* Awards Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {recognitions.map((award, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-[#8B1A4A]/30 transition-all flex items-start gap-6 group"
             >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#8B1A4A] group-hover:bg-[#8B1A4A] group-hover:text-white transition-all">
                  <award.icon size={24} />
                </div>
                <p className="text-[#4A4A4A] font-bold text-sm leading-relaxed tracking-tight group-hover:text-[#1A1A1A]">
                  {award.text}
                </p>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
