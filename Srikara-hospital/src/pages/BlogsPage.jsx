import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, X, MapPin, Star } from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

const blogs = [
  {
    id: 7, category: 'Physiotherapy', tag: 'Doctor Profile',
    title: 'Restoring Strength and Mobility: Dr. Junaid at Srikara Hospitals, Lakdikapul',
    excerpt: 'Movement is life. At Srikara Hospitals Lakdikapul, Dr. Junaid is helping patients regain mobility, overcome pain, and return to active living through advanced physiotherapy.',
    date: 'April 10, 2025', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    doctor: { name: 'Dr. Junaid', title: 'Consultant Physiotherapist', qualification: 'MPT (Ortho), MIAP', branch: 'Lakdikapul', exp: '8+ Years', rating: '4.9', slug: 'junaid-physio' },
    content: '<h3>Movement is Life</h3><p>Dr. Junaid is a highly skilled Consultant Physiotherapist specialising in orthopedic rehabilitation at Srikara Hospitals, Lakdikapul.</p><h3>Orthopedic Physiotherapy</h3><p>He specialises in fracture rehabilitation, post-operative recovery, sports injuries, chronic back and neck pain, and arthritis management.</p><h3>Patient-Centric Philosophy</h3><p>Patients describe him as approachable, motivating, and deeply committed.</p><blockquote>"Mobility is freedom, and restoring it requires both science and empathy." — Dr. Junaid</blockquote>',
  },
  {
    id: 8, category: 'Urology', tag: 'Doctor Profile',
    title: 'Advanced Urology and Andrology Care: Dr. M. Harsha Vardhan at Srikara Hospitals, Lakdikapul',
    excerpt: 'At Srikara Hospitals Lakdikapul, Dr. M. Harsha Vardhan — a distinguished Consultant Urologist and Andrologist — is redefining kidney, urinary, and men\'s health care with advanced minimally invasive techniques and compassionate expertise.',
    date: 'April 18, 2025', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=800',
    doctor: { name: 'Dr. M. Harsha Vardhan', title: 'Consultant Urologist & Andrologist', qualification: 'MBBS, DNB (Gen Surg), MCh (Urology)', branch: 'Lakdikapul', exp: '10+ Years', rating: '4.9', slug: 'm-harsha-vardhan' },
    content: '<h3>Specialized Training and Academic Excellence</h3><p>Dr. Harsha Vardhan completed his MBBS, followed by a DNB in General Surgery, and then the prestigious <strong>MCh in Urology</strong> — one of the most advanced super-specialties in surgical medicine. This rigorous training equipped him with expertise in diagnosing and treating complex conditions of the urinary tract, kidneys, bladder, prostate, and male reproductive system.</p><h3>Urology: Comprehensive Care for Kidney and Urinary Health</h3><p>As a Urologist, Dr. Harsha Vardhan specialises in the management of conditions affecting the kidneys, bladder, ureters, and prostate. His expertise includes:</p><ul><li>Kidney stones and urinary tract stones</li><li>Prostate enlargement and related disorders</li><li>Urinary tract infections (UTIs)</li><li>Bladder dysfunction and incontinence</li><li>Urological cancers (kidney, bladder, prostate)</li></ul><p>By combining advanced diagnostic tools with minimally invasive surgical techniques, he ensures that patients receive precise, effective, and safe treatments.</p><h3>Andrology: Specialized Care for Men\'s Health</h3><p>Andrology — the branch of medicine focusing on male reproductive health — is an area where Dr. Harsha Vardhan excels. He provides specialised care for:</p><ul><li>Male infertility</li><li>Erectile dysfunction</li><li>Hormonal imbalances</li><li>Varicocele and testicular disorders</li><li>Sexual health counselling</li></ul><p>His patient-centric approach ensures that sensitive concerns are addressed with empathy and confidentiality, empowering men to seek timely care.</p><h3>Minimally Invasive and Advanced Surgical Techniques</h3><p>Dr. Harsha Vardhan is skilled in modern minimally invasive procedures including:</p><ul><li>Endoscopic stone removal</li><li>Laparoscopic urological surgeries</li><li>Laser treatments for prostate and kidney stones</li><li>Advanced reconstructive procedures</li></ul><p>These innovations allow patients to benefit from shorter hospital stays, reduced pain, and quicker return to daily activities.</p><h3>Patient-Centric Philosophy</h3><p>Beyond his technical expertise, what truly defines Dr. Harsha Vardhan is his holistic approach — addressing not only physical symptoms but also emotional and psychological well-being. Patients describe him as approachable, empathetic, and deeply committed to their recovery.</p><h3>Srikara Hospitals: A Hub for Urology Excellence</h3><p>The Lakdikapul branch of Srikara Hospitals is equipped with advanced diagnostic facilities, modern operating theatres, and specialised units for kidney and urinary care. A multidisciplinary team of urologists, nephrologists, endocrinologists, and counsellors collaborate to deliver holistic care.</p><h3>A Vision for Men\'s and Kidney Health</h3><p>Dr. Harsha Vardhan remains at the forefront of urological advancements, continuously updating his skills and embracing innovation. His vision is to make advanced kidney and men\'s health care accessible and affordable across Hyderabad and beyond.</p><blockquote>"Healthcare must be holistic — addressing not only physical symptoms but also emotional and psychological well-being." — Dr. M. Harsha Vardhan</blockquote>',
  },
  {
    id: 9, category: 'General Medicine', tag: 'Doctor Profile',
    title: 'Comprehensive Care for Everyday Health: Dr. Garath Ganesh at Srikara Hospitals, Lakdikapul',
    excerpt: 'At Srikara Hospitals Lakdikapul, Dr. Garath Ganesh — a Consultant General Physician and Diabetologist — provides holistic solutions for patients across all age groups, from routine check-ups to complex metabolic disorders.',
    date: 'April 22, 2025', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
    doctor: { name: 'Dr. Garath Ganesh', title: 'Consultant General Physician & Diabetologist', qualification: 'MBBS, DNB (General Medicine)', branch: 'Lakdikapul', exp: '10+ Years', rating: '4.8', slug: 'garath-ganesh' },
    content: '<h3>Academic Excellence and Professional Training</h3><p>Dr. Garath Ganesh completed his MBBS followed by a <strong>DNB in General Medicine</strong> — a qualification that reflects rigorous training and advanced clinical expertise. His dual specialisation as a General Physician and Diabetologist allows him to address a wide spectrum of health concerns, from routine check-ups and preventive care to complex metabolic disorders.</p><h3>General Medicine: The First Line of Care</h3><p>As a General Physician, Dr. Ganesh plays a vital role in diagnosing and managing a wide range of conditions — from fevers, infections, and respiratory illnesses to chronic diseases like hypertension and thyroid disorders. Patients often turn to him as their first point of contact, trusting his ability to evaluate symptoms, order appropriate investigations, and design personalised treatment plans.</p><h3>Diabetology: Managing a Growing Challenge</h3><p>Diabetes is one of the fastest-growing health challenges in India. As a Diabetologist, Dr. Ganesh specialises in the prevention, diagnosis, and management of diabetes and its complications. His expertise includes:</p><ul><li>Early detection of pre-diabetes and risk factors</li><li>Personalised diet and lifestyle counselling</li><li>Medication management and insulin therapy</li><li>Screening for complications such as neuropathy, nephropathy, and retinopathy</li><li>Long-term monitoring and patient education</li></ul><p>By combining medical science with patient empowerment, he helps individuals take control of their condition and live healthier, more fulfilling lives.</p><h3>Preventive Medicine: Building Health Before Illness Strikes</h3><p>Dr. Ganesh strongly advocates for preventive healthcare. He emphasises regular check-ups, screenings, and lifestyle modifications to reduce the risk of chronic diseases. His consultations often include guidance on nutrition, exercise, stress management, and sleep hygiene — factors that play a crucial role in overall well-being.</p><h3>Patient-Centric Philosophy</h3><p>What sets Dr. Ganesh apart is his patient-centric philosophy. He believes that medicine is not just about prescriptions — it is about listening, understanding, and guiding patients through their health journey. His approach emphasises:</p><ul><li>Clear communication about diagnosis and treatment options</li><li>Personalised care tailored to each patient\'s lifestyle and needs</li><li>Emotional support for patients managing chronic conditions</li><li>Empowering patients with knowledge to make informed decisions</li></ul><p>Patients often describe him as approachable, empathetic, and deeply committed. His ability to combine clinical expertise with genuine compassion makes him a trusted figure in the community.</p><h3>Srikara Hospitals: A Hub for Holistic Care</h3><p>The Lakdikapul branch of Srikara Hospitals is equipped with advanced diagnostic facilities, modern infrastructure, and a multidisciplinary team. With Dr. Ganesh\'s leadership in general medicine and diabetology, the hospital offers seamless care under one roof. Physicians, dietitians, and specialists collaborate to deliver holistic solutions.</p><h3>A Vision for Everyday Health</h3><p>Dr. Ganesh remains at the forefront of healthcare advancements, continuously updating his skills and embracing innovation. His vision is to make preventive and chronic care accessible to all, bridging the gap between modern medicine and everyday patient needs.</p><blockquote>"Health is life, and caring for it requires both science and empathy." — Dr. Garath Ganesh</blockquote>',
  },
  {
    id: 11, category: 'Neurosurgery', tag: 'Doctor Profile',
    title: 'Advancing Brain and Spine Care: Dr. Nikhil Veludandi at Srikara Hospitals, Lakdikapul',
    excerpt: 'At Srikara Hospitals Lakdikapul, Dr. Nikhil Veludandi — a Consultant Endoscopic Brain & Spine Surgeon — is redefining neurosurgical care with minimally invasive endoscopic techniques, compassionate guidance, and a patient-centric philosophy.',
    date: 'April 25, 2025', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    doctor: { name: 'Dr. Nikhil Veludandi', title: 'Consultant Endoscopic Brain & Spine Surgeon', qualification: 'MBBS, MS (GS), MCh (Neurosurgery)', branch: 'Lakdikapul', exp: '12+ Years', rating: '4.9', slug: 'nikhil-veludandi' },
    content: '<h3>Academic Excellence and Specialized Training</h3><p>Dr. Nikhil Veludandi completed his MBBS and MS in General Surgery, followed by the prestigious <strong>MCh in Neurosurgery</strong> — one of the most demanding super-specialties in medicine. This rigorous training equipped him with expertise in diagnosing and treating complex brain and spine conditions, while mastering minimally invasive endoscopic techniques.</p><h3>Endoscopic Neurosurgery: Precision with Minimal Invasion</h3><p>Traditional neurosurgery often involves large incisions and extended recovery times. Endoscopic neurosurgery has transformed the field by allowing surgeons to operate through small openings with advanced imaging and specialised instruments. Dr. Nikhil specialises in these minimally invasive techniques, which offer patients:</p><ul><li>Reduced surgical trauma</li><li>Faster recovery times</li><li>Less post-operative pain</li><li>Shorter hospital stays</li></ul><p>Whether treating brain tumours, pituitary lesions, or spinal disorders, his expertise ensures that patients benefit from cutting-edge procedures that prioritise both safety and quality of life.</p><h3>Spine Surgery: Restoring Strength and Mobility</h3><p>Spinal disorders can severely impact mobility and independence. From herniated discs to spinal stenosis, these conditions demand precise intervention. Dr. Nikhil\'s mastery of endoscopic spine surgery allows him to treat complex spinal problems with minimal disruption to surrounding tissues. His approach emphasises restoring mobility, reducing pain, and helping patients return to their daily lives with confidence.</p><h3>Brain Surgery: Navigating Complexity with Compassion</h3><p>Brain surgery is among the most delicate procedures in medicine. Dr. Nikhil\'s expertise in endoscopic brain surgery enables him to treat conditions such as tumours, cysts, and vascular malformations with remarkable precision. By using advanced imaging and minimally invasive techniques, he reduces risks while maximising outcomes. His patient-centric approach ensures that families are guided through every step of the journey — from diagnosis to recovery — with clarity and compassion.</p><h3>Patient-Centric Philosophy</h3><p>Beyond his technical expertise, what truly defines Dr. Nikhil Veludandi is his patient-centric philosophy. He believes that neurosurgical care must be personalised, empathetic, and holistic. He emphasises:</p><ul><li>Clear communication with patients and families</li><li>Individualised treatment plans tailored to each case</li><li>Emotional support during challenging times</li><li>Comprehensive rehabilitation strategies</li></ul><p>Patients often describe him as approachable, compassionate, and deeply committed. For him, success is not just measured in surgical outcomes but in the smiles of patients who regain independence and confidence.</p><h3>Srikara Hospitals: A Hub for Advanced Neurosurgical Care</h3><p>The Lakdikapul branch of Srikara Hospitals is equipped with state-of-the-art infrastructure, advanced imaging facilities, and modern operating theatres. With Dr. Nikhil\'s leadership, the hospital offers comprehensive neurosurgical services under one roof. Neurosurgeons, neurologists, physiotherapists, and rehabilitation specialists collaborate to deliver holistic care.</p><h3>A Vision for the Future</h3><p>Neurosurgery is evolving rapidly, with robotic assistance, advanced imaging, and regenerative therapies shaping the future. Dr. Nikhil remains at the forefront of these advancements, continuously updating his skills and embracing innovation. His vision is to make advanced neurosurgical care accessible and affordable, bridging the gap between global innovation and local needs.</p><blockquote>"The brain and spine are the essence of human life, and caring for them requires both science and empathy." — Dr. Nikhil Veludandi</blockquote>',
  },
  {
    id: 12, category: 'Cardiology', tag: 'Doctor Profile',
    title: 'Heart Care with Precision: Dr. Rameshwari Vishwakarma at Srikara Hospitals, Lakdikapul',
    excerpt: 'At Srikara Hospitals Lakdikapul, Dr. Rameshwari Vishwakarma — a distinguished Interventional Cardiologist with DM Cardiology — delivers world-class cardiac care through advanced interventional procedures and a compassionate patient-centric philosophy.',
    date: 'April 26, 2025', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800',
    doctor: { name: 'Dr. Rameshwari Vishwakarma', title: 'Interventional Cardiologist', qualification: 'MBBS, MD, DM Cardiology', branch: 'Lakdikapul', exp: '14+ Years', rating: '4.9', slug: 'rameshwari-vishwakarma' },
    content: '<h3>Academic Excellence and Specialized Training</h3><p>Dr. Rameshwari Vishwakarma completed her MBBS and MD, followed by a <strong>DM in Cardiology</strong> — the highest level of specialisation in the field. This rigorous training equipped her with deep knowledge of cardiovascular diseases, diagnostic techniques, and advanced interventional procedures.</p><h3>Interventional Cardiology: Restoring Life Through Innovation</h3><p>Interventional cardiology has revolutionised the treatment of heart disease. Dr. Rameshwari specialises in procedures such as:</p><ul><li>Coronary angioplasty and stenting to open blocked arteries</li><li>Balloon valvuloplasty for valve disorders</li><li>Pacemaker and device implantation for rhythm management</li><li>Complex coronary interventions for high-risk patients</li></ul><p>Her expertise ensures that patients receive precise, effective, and safe treatments that minimise recovery time and maximise outcomes.</p><h3>A Patient-Centric Philosophy</h3><p>What sets Dr. Rameshwari apart is her unwavering commitment to patient-centric care. She believes that every patient\'s journey is unique, and treatment must be tailored to individual needs. From the first consultation, she emphasises clear communication, ensuring patients and families understand their condition and treatment options. Her compassionate approach helps ease anxiety, empowering patients to make informed decisions about their health.</p><h3>Preventive Cardiology: Empowering Patients for a Healthier Future</h3><p>Dr. Rameshwari advocates strongly for preventive cardiology, educating patients about lifestyle changes, diet, exercise, and regular screenings. She emphasises that early detection and proactive management can significantly reduce the risk of heart attacks, strokes, and other complications.</p><h3>Srikara Hospitals: A Hub for Advanced Cardiac Care</h3><p>The Lakdikapul branch of Srikara Hospitals has established itself as a trusted centre for comprehensive healthcare. With state-of-the-art infrastructure, advanced diagnostic facilities, and a multidisciplinary team, it provides holistic solutions for cardiovascular health. Dr. Rameshwari\'s presence strengthens this reputation, ensuring that patients receive care that is both technologically advanced and deeply compassionate.</p><h3>A Vision for Cardiac Excellence</h3><p>Cardiology is a rapidly evolving field. Dr. Rameshwari remains at the forefront of these advancements, continuously updating her skills and embracing innovation. Her vision is to make advanced cardiac care accessible to all, bridging the gap between modern medicine and affordability.</p><blockquote>"The heart is the rhythm of life, and caring for it requires both science and empathy." — Dr. Rameshwari Vishwakarma</blockquote>',
  },
  {
    id: 13, category: 'Orthopaedics', tag: 'Doctor Profile',
    title: 'Redefining Orthopedic Care: Dr. Bhanu Pratap P at Srikara Hospitals, Lakdikapul',
    excerpt: 'At Srikara Hospitals Lakdikapul, Dr. Bhanu Pratap P — a Gold Medalist in MS Orthopaedics with fellowships in Joint Replacement, Arthroscopy, and Ilizarov techniques — is redefining orthopedic care through robotic precision and compassionate surgery.',
    date: 'April 27, 2025', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=800',
    doctor: { name: 'Dr. Bhanu Pratap P', title: 'Consultant Robotic Joint Replacement & Arthroscopic Surgeon', qualification: 'MBBS, MS (Ortho) – Gold Medalist, FIJR, FIAS, FILRDC', branch: 'Lakdikapul', exp: '12+ Years', rating: '4.9', slug: 'bhanu-pratap-p' },
    content: '<h3>A Career Built on Excellence</h3><p>From the very beginning of his medical journey, Dr. Bhanu Pratap distinguished himself as a scholar and clinician. His <strong>Gold Medal in Orthopaedics</strong> is a testament to his dedication and skill. He further honed his expertise through prestigious fellowships:</p><ul><li>FIJR – Fellowship in Joint Replacement</li><li>FIAS – Fellowship in Arthroscopy Surgery</li><li>FILRDC – Fellowship in Ilizarov & Reconstructive Deformity Correction</li></ul><p>These achievements reflect his commitment to continuous learning and his determination to bring the most advanced techniques to patients in India.</p><h3>Robotic Joint Replacement: Precision for Better Outcomes</h3><p>Dr. Bhanu Pratap is a pioneer in robotic-assisted joint replacement, a technique that allows surgeons to plan procedures with millimetre-level accuracy. By using robotic guidance, he ensures optimal alignment and placement of implants, which leads to faster recovery times, reduced post-operative pain, and longer implant lifespan. For patients suffering from severe arthritis or degenerative joint disease, this approach offers renewed mobility and confidence.</p><h3>Arthroscopy: Healing Through Minimal Intervention</h3><p>Using tiny incisions and specialised instruments, Dr. Bhanu Pratap treats ligament tears, cartilage damage, and sports injuries with remarkable precision. The benefits are clear: shorter hospital stays, quicker rehabilitation, and less scarring. For athletes and active individuals, arthroscopy means getting back to the field or gym sooner.</p><h3>Ilizarov Techniques and Complex Trauma Expertise</h3><p>Dr. Bhanu Pratap\'s expertise in the Ilizarov technique — a specialised method for bone lengthening and deformity correction — has given hope to patients facing conditions once thought untreatable. His skill in complex trauma surgery further sets him apart. Whether dealing with multiple fractures from accidents or intricate reconstructive challenges, he approaches each case with meticulous planning and unwavering focus.</p><h3>A Philosophy Rooted in Compassion</h3><p>What truly defines Dr. Bhanu Pratap is his patient-centric philosophy. He believes that every patient\'s journey is unique, and treatment must be tailored accordingly. From the first consultation to rehabilitation, he emphasises clear communication, empathy, and holistic care. His goal is not just to repair bones or joints — it is to restore lives, helping patients walk, run, and live without limitations.</p><h3>Srikara Hospitals: A Centre of Trust and Innovation</h3><p>The Lakdikapul branch of Srikara Hospitals is equipped with modern infrastructure, cutting-edge diagnostic tools, and a multidisciplinary team. Dr. Bhanu Pratap\'s leadership in robotic joint replacement and trauma care ensures that patients receive world-class treatment right here in Hyderabad.</p><blockquote>"Mobility is life, and restoring it requires both science and empathy." — Dr. Bhanu Pratap P</blockquote>',
  },
  {
    id: 14, category: 'Oncology', tag: 'Doctor Profile',
    title: 'Precision in Cancer Care: Dr. (Maj) Garapati Raja Bhagat Chandra Chowdary at Srikara Hospitals, Lakdikapul',
    excerpt: 'At Srikara Hospitals Lakdikapul, Dr. (Maj) Garapati Raja Bhagat Chandra Chowdary — a distinguished Consultant Surgical Oncologist and Robotic Surgeon with military discipline and FACS credentials — is redefining cancer care with precision and compassion.',
    date: 'April 28, 2025', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    doctor: { name: 'Dr. (Maj) Garapati Raja Bhagat Chandra Chowdary', title: 'Consultant Surgical Oncologist & Robotic Surgeon', qualification: 'MBBS, MS Gen Surg, DrNB Surg Onco, FALS, FACS, MNAMS', branch: 'Lakdikapul', exp: '18+ Years', rating: '5.0', slug: 'garapati-raja-bhagat' },
    content: '<h3>Academic Excellence and Distinguished Credentials</h3><p>Dr. Chowdary\'s journey in medicine began at Osmania Medical College, where he completed his MBBS, followed by an MS in General Surgery. His pursuit of specialisation led him to earn a <strong>DrNB in Surgical Oncology</strong> — one of the most rigorous qualifications in cancer surgery. His professional distinctions include:</p><ul><li>FALS – Fellowship in Advanced Laparoscopic Surgery</li><li>FACS – Fellowship of the American College of Surgeons</li><li>MNAMS – Membership of the National Academy of Medical Sciences</li></ul><p>These credentials reflect his commitment to excellence and his ability to integrate global best practices into patient care.</p><h3>Surgical Oncology: Fighting Cancer with Precision</h3><p>As a Surgical Oncologist, Dr. Chowdary specialises in the surgical management of cancers affecting the breast, gastrointestinal tract, head and neck, gynaecological organs, and more. His expertise lies in tailoring surgical approaches to each patient\'s condition, ensuring maximum tumour clearance while preserving quality of life.</p><h3>Robotic Surgery: Innovation for Better Outcomes</h3><p>Dr. Chowdary is a pioneer in robotic-assisted cancer surgery, which allows for:</p><ul><li>Smaller incisions and reduced surgical trauma</li><li>Enhanced visualisation and accuracy</li><li>Faster recovery times</li><li>Improved post-operative outcomes</li></ul><p>For patients, robotic surgery means less pain, shorter hospital stays, and quicker return to daily life.</p><h3>Military Discipline, Medical Compassion</h3><p>Dr. Chowdary\'s background as a Major in the Armed Forces adds a unique dimension to his practice. Military service instils discipline, resilience, and a commitment to service — qualities that translate seamlessly into patient care. His patients often describe him as approachable yet decisive, combining empathy with the confidence that comes from years of rigorous training and service.</p><h3>Patient-Centric Philosophy</h3><p>Beyond credentials and technology, what defines Dr. Chowdary is his patient-centric philosophy. He believes that cancer care must be holistic, addressing not only the disease but also the emotional and psychological needs of patients and families. His approach emphasises:</p><ul><li>Clear communication about diagnosis and treatment options</li><li>Personalised surgical plans tailored to each patient\'s condition</li><li>Emotional support during the cancer journey</li><li>Integration of rehabilitation and follow-up care</li></ul><h3>Srikara Hospitals: A Centre of Oncology Excellence</h3><p>The Lakdikapul branch of Srikara Hospitals is equipped with advanced oncology infrastructure, including robotic surgical systems, modern operating theatres, and comprehensive diagnostic facilities. With Dr. Chowdary\'s leadership, the hospital offers a full spectrum of cancer care — from early detection and surgical intervention to rehabilitation and survivorship programs.</p><h3>A Vision for Cancer Care</h3><p>Oncology is evolving rapidly, with new technologies, targeted therapies, and surgical innovations emerging worldwide. Dr. Chowdary remains at the forefront of these advancements, continuously updating his skills and contributing to research. His vision is to make advanced cancer care accessible and affordable, bridging the gap between innovation and patient needs.</p><blockquote>"Cancer care requires courage, precision, and empathy." — Dr. (Maj) Garapati Raja Bhagat Chandra Chowdary</blockquote>',
  },
  {
    id: 15, category: 'Nephrology', tag: 'Doctor Profile',
    title: 'Leading Kidney Care: Dr. Vaishnavi Pochineni at Srikara Hospitals, Lakdikapul',
    excerpt: 'At Srikara Hospitals Lakdikapul, Dr. Vaishnavi Pochineni — an American Board Certified Nephrologist with a Transplant Fellowship from Mayo Clinic — brings world-class kidney care and transplant medicine to Hyderabad.',
    date: 'April 29, 2025', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    doctor: { name: 'Dr. Vaishnavi Pochineni', title: 'Consultant Nephrologist & Kidney Transplant Physician', qualification: 'MBBS, MD (USA), FACP, FASN, Mayo Clinic Fellowship', branch: 'Lakdikapul', exp: '15+ Years', rating: '5.0', slug: 'vaishnavi-pochineni' },
    content: '<h3>Academic Excellence and Global Training</h3><p>Dr. Vaishnavi completed her MBBS followed by an <strong>MD in the United States</strong>, recognition as a Fellow of the American College of Physicians (FACP) and the American Society of Nephrology (FASN), and an advanced <strong>Transplant Fellowship at Mayo Clinic</strong>. In 2018, she achieved American Board Certification in Internal Medicine and Nephrology — a distinction that underscores her mastery of both general medical care and specialised kidney treatment.</p><h3>Expertise in Nephrology and Transplant Medicine</h3><p>Dr. Vaishnavi specialises in diagnosing and managing:</p><ul><li>Chronic kidney disease (CKD)</li><li>Hypertension and diabetic nephropathy</li><li>Acute kidney injury</li><li>Dialysis management (haemodialysis and peritoneal dialysis)</li><li>Kidney transplantation and post-transplant care</li></ul><p>Her dual expertise allows her to guide patients through every stage of kidney health — from early detection and prevention to advanced interventions and life-saving transplants.</p><h3>Kidney Transplantation: Restoring Hope</h3><p>Dr. Vaishnavi\'s fellowship training at Mayo Clinic equipped her with advanced skills in transplant evaluation, surgical coordination, and post-operative management. She ensures comprehensive care including thorough pre-transplant evaluation, coordination with surgical teams, post-transplant monitoring to prevent rejection, and long-term management of immunosuppressive therapy.</p><h3>Patient-Centric Philosophy</h3><p>Dr. Vaishnavi believes that kidney care is not just about treating disease — it is about empowering patients to live better lives. She emphasises clear communication and education about kidney health, personalised treatment plans, emotional support for patients and families navigating chronic illness, and preventive strategies to reduce the risk of progression.</p><h3>Preventive Nephrology: Protecting Kidney Health</h3><p>Prevention is a cornerstone of Dr. Vaishnavi\'s practice. She advocates for regular screenings, especially for individuals with diabetes, hypertension, or a family history of kidney disease. By promoting lifestyle changes such as balanced nutrition, hydration, and exercise, she helps patients reduce their risk of kidney complications.</p><h3>Srikara Hospitals: A Centre of Excellence</h3><p>The Lakdikapul branch of Srikara Hospitals is equipped with advanced diagnostic tools, dialysis units, and transplant facilities. With Dr. Vaishnavi\'s leadership, the hospital offers comprehensive nephrology services under one roof. Nephrologists, surgeons, dietitians, and counsellors work together to deliver holistic care.</p><h3>A Vision for Kidney Care</h3><p>Dr. Vaishnavi remains at the forefront of nephrology advancements, continuously updating her skills and contributing to research. Her vision is to make advanced kidney care accessible and affordable, bridging the gap between global innovation and local needs.</p><blockquote>"Kidney health is life, and caring for it requires both science and empathy." — Dr. Vaishnavi Pochineni</blockquote>',
  },
]

const CATEGORIES = ['All', 'Physiotherapy', 'Urology', 'General Medicine', 'Oncology', 'Neurosurgery', 'Cardiology', 'Orthopaedics', 'Nephrology']

const TAG_COLORS = {
  'Case Study':       { bg: '#F0FDF4', text: '#16a34a' },
  'Clinical Insight': { bg: '#EFF6FF', text: '#1d4ed8' },
  'Patient Story':    { bg: '#FFF7ED', text: '#c2410c' },
  'Health Guide':     { bg: '#F5F3FF', text: '#7c3aed' },
  'Innovation':       { bg: '#FDF2F8', text: '#9d174d' },
  'Doctor Profile':   { bg: '#ECFDF5', text: '#065f46' },
}

function BlogModal({ blog, onClose }) {
  const navigate = useNavigate()
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-[760px] max-h-[88vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <div className="relative h-56 flex-shrink-0">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white shadow">
            <X size={16} />
          </button>
          <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: TAG_COLORS[blog.tag]?.bg || '#F1F5F9', color: TAG_COLORS[blog.tag]?.text || '#475569' }}>
            {blog.tag}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto px-8 pb-10">
          <div className="flex items-center gap-4 text-xs text-[#94A3B8] mt-4 mb-3">
            <span className="font-semibold text-[#8B1A4A]">{blog.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Calendar size={11} />{blog.date}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{blog.readTime}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1A202C] mb-5 leading-tight">{blog.title}</h2>
          {blog.doctor && (
            <div className="flex items-center gap-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#8B1A4A]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-black text-[#8B1A4A]">{blog.doctor.name.split(' ').pop()[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-[#1A202C] text-sm">{blog.doctor.name}</p>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star size={9} className="fill-amber-500" /> {blog.doctor.rating}
                  </span>
                </div>
                <p className="text-[#8B1A4A] text-xs font-semibold">{blog.doctor.title} · {blog.doctor.qualification}</p>
                <p className="text-[#94A3B8] text-[10px] flex items-center gap-1 mt-0.5"><MapPin size={9} />{blog.doctor.branch} · {blog.doctor.exp}</p>
              </div>
            </div>
          )}
          <div
            className="text-[#475569] text-sm leading-relaxed [&_h3]:text-[#1A202C] [&_h3]:font-bold [&_h3]:text-base [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#8B1A4A] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#8B1A4A] [&_blockquote]:my-4 [&_strong]:text-[#1A202C] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="flex gap-3 mt-6 pt-6 border-t border-[#EDF2F7]">
            <button onClick={() => { navigate(blog.doctor?.slug ? `/doctors/${blog.doctor.slug}` : '/book'); onClose() }}
              className="flex items-center gap-2 bg-[#8B1A4A] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#6c1439] transition-all">
              View Doctor Profile
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function BlogsPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filtered = activeCategory === 'All' ? blogs : blogs.filter(b => b.category === activeCategory)
  const featured = filtered[0]
  const rest = filtered.slice(1)

  const handleSubscribe = e => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <>
      <Helmet><title>Clinical Journal | Srikara Hospitals</title></Helmet>
      {selectedBlog && <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />}

      <div className="min-h-screen bg-white font-sans text-[#1A202C] antialiased">
        <StickyNavbar />

        {/* HERO */}
        <section className="pt-28 pb-14 px-4 sm:px-8 text-center bg-white border-b border-[#EDF2F7]">
          <div className="max-w-2xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[#8B1A4A] text-[11px] font-black uppercase tracking-[0.5em] mb-4">
              The Clinical Journal
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl font-bold text-[#1A202C] tracking-tight leading-tight mb-4">
              Clinical Insights &amp; Patient Stories
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
              className="text-[#64748B] text-base mb-8">
              Subscribe to receive the latest case studies, health guides, and clinical breakthroughs from Srikara Hospitals.
            </motion.p>
            <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-11 px-4 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#8B1A4A]/40 placeholder-[#94A3B8]" />
              <button type="submit"
                className="h-11 px-6 bg-[#1A202C] text-white rounded-xl font-bold text-sm hover:bg-[#8B1A4A] transition-all whitespace-nowrap">
                {subscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </motion.form>
          </div>
        </section>

        {/* CATEGORY FILTER */}
        <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-b border-[#EDF2F7] px-4 sm:px-8 py-3">
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat ? 'bg-[#1A202C] text-white' : 'text-[#64748B] hover:text-[#1A202C] hover:bg-[#F1F5F9]'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* BLOG CONTENT */}
        <section className="py-12 sm:py-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-bold text-[#1A202C] mb-8">Recent blog posts</h2>

            {filtered.length === 0 ? (
              <p className="text-[#94A3B8] text-center py-20">No posts in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                {/* Featured large post — left */}
                {featured && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedBlog(featured)}
                    className="lg:col-span-7 group cursor-pointer">
                    <div className="relative h-[300px] sm:h-[380px] rounded-2xl overflow-hidden mb-5">
                      <img src={featured.image} alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' }} />
                      {featured.doctor && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow">
                          <div className="w-5 h-5 rounded-full bg-[#8B1A4A] flex items-center justify-center">
                            <span className="text-white text-[8px] font-black">{featured.doctor.name.split(' ').pop()[0]}</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#1A202C]">{featured.doctor.name}</span>
                          <span className="text-[9px] text-[#94A3B8]">· {featured.doctor.branch}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: TAG_COLORS[featured.tag]?.bg || '#F1F5F9', color: TAG_COLORS[featured.tag]?.text || '#475569' }}>
                        {featured.tag}
                      </span>
                      <span className="text-[#94A3B8] text-xs">· {featured.date}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1A202C] leading-snug mb-3 group-hover:text-[#8B1A4A] transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-[#64748B] text-sm leading-relaxed line-clamp-3 mb-4">{featured.excerpt}</p>
                    <div className="flex items-center gap-2 text-[#8B1A4A] text-xs font-bold uppercase tracking-wider">
                      Read More <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                )}

                {/* Right column — stacked smaller posts */}
                <div className="lg:col-span-5 flex flex-col divide-y divide-[#EDF2F7]">
                  {rest.slice(0, 4).map((blog, i) => (
                    <motion.div key={blog.id}
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                      onClick={() => setSelectedBlog(blog)}
                      className="group flex gap-4 py-5 cursor-pointer first:pt-0">
                      <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F1F5F9]">
                        <img src={blog.image} alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-[#94A3B8] mb-1.5">
                          <span className="font-bold text-[#64748B]">{blog.category}</span> · {blog.date}
                        </p>
                        <h4 className="font-bold text-[#1A202C] text-sm leading-snug mb-2 group-hover:text-[#8B1A4A] transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                        <p className="text-[#94A3B8] text-xs leading-relaxed line-clamp-2 mb-2">{blog.excerpt}</p>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ background: TAG_COLORS[blog.tag]?.bg || '#F1F5F9', color: TAG_COLORS[blog.tag]?.text || '#475569' }}>
                            {blog.tag}
                          </span>
                          {blog.doctor && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B]">
                              {blog.doctor.branch}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* More posts grid */}
            {filtered.length > 5 && (
              <div className="mt-16 pt-10 border-t border-[#EDF2F7]">
                <h2 className="text-lg font-bold text-[#1A202C] mb-8">More articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.slice(5).map((blog, i) => (
                    <motion.article key={blog.id}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setSelectedBlog(blog)}
                      className="group cursor-pointer">
                      <div className="h-44 rounded-xl overflow-hidden mb-4 bg-[#F1F5F9]">
                        <img src={blog.image} alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600' }} />
                      </div>
                      <p className="text-[10px] text-[#94A3B8] mb-2">
                        <span className="font-bold text-[#64748B]">{blog.category}</span> · {blog.date}
                      </p>
                      <h3 className="font-bold text-[#1A202C] text-base leading-snug mb-2 group-hover:text-[#8B1A4A] transition-colors">{blog.title}</h3>
                      <p className="text-[#94A3B8] text-sm leading-relaxed line-clamp-2 mb-3">{blog.excerpt}</p>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: TAG_COLORS[blog.tag]?.bg || '#F1F5F9', color: TAG_COLORS[blog.tag]?.text || '#475569' }}>
                        {blog.tag}
                      </span>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-8 bg-[#F8FAFC] border-t border-[#EDF2F7]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[#1A202C] text-2xl sm:text-3xl font-bold mb-1">Have a health concern?</p>
              <p className="text-[#64748B] text-sm">Our specialists are available across all 9 Srikara centres.</p>
            </div>
            <button onClick={() => navigate('/book')}
              className="bg-[#8B1A4A] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#6c1439] transition-all flex-shrink-0">
              Book a Consultation
            </button>
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
