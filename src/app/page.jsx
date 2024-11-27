'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';

export default function Home() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: "Project Organization",
      description: "Keep your capstone projects organized and on track with our intuitive management tools.",
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "blue"
    },
    {
      title: "Team Collaboration",
      description: "Work seamlessly with your team members and advisors in real-time.",
      icon: (
        <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "green"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your capstone project milestones and track progress in real-time.",
      icon: (
        <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "purple"
    }
  ];

  const testimonials = [
    {
      quote: "This platform has revolutionized how we manage our research projects. The collaboration features are outstanding.",
      author: "Dr. Sarah Chen",
      role: "Research Advisor",
      image: "/avatars/sarah.jpg"
    },
    {
      quote: "As a student, having all my project resources and communication in one place has been incredibly helpful.",
      author: "Michael Rodriguez",
      role: "Graduate Student",
      image: "/avatars/michael.jpg"
    },
    {
      quote: "The progress tracking and milestone management have made supervising multiple projects effortless.",
      author: "Prof. James Wilson",
      role: "Department Head",
      image: "/avatars/james.jpg"
    }
  ];

  const stats = [
    { number: "1000+", label: "Active Projects" },
    { number: "50+", label: "Universities" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="main-container">
      {/* Hero Section */}
      <section className="section">
        <div className="parallax-bg parallax-deep">
          <motion.div 
            className="w-full h-full"
            style={{
              backgroundImage: 'url("/grid-pattern.svg")',
              backgroundSize: '50px 50px',
              opacity: 0.1
            }}
          />
        </div>
        
        <div className="parallax-bg parallax-medium">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl"
          />
        </div>

        <div className="section-content">
          {/* Hero Content */}
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              {/* Title with Enhanced Gradient */}
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
                />
                <h1 className="relative text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-gradient">
                  <TypeAnimation
                    sequence={[
                      'Capstone Project Management',
                      1000,
                      'Research Made Simple',
                      1000,
                      'Collaborate Effectively',
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </h1>
              </div>

              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed glass-effect p-6">
                Streamline your research workflow with our comprehensive management solution. 
                <span className="block mt-2 text-gradient font-semibold">Built for students, researchers, and advisors.</span>
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/signup"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto overflow-hidden hover-lift"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/demo"
                  className="group px-8 py-4 glass-effect text-gray-800 dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto hover-lift"
                >
                  <span className="relative z-10">Watch Demo</span>
                  <motion.svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="section-divider" />
      </section>

      {/* Features Section */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="parallax-bg parallax-shallow">
          <div className="absolute inset-0 bg-grid-pattern transform rotate-45 opacity-5"></div>
        </div>
        
        <div className="section-content">
          <div className="max-w-6xl mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Powerful Features for Research Excellence
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Everything you need to manage your research projects effectively
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    translateZ: 20
                  }}
                  className="glass-effect p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform perspective-1000 hover-lift"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 bg-gradient-to-r ${
                    feature.color === 'blue' ? 'from-blue-500 to-purple-500' :
                    feature.color === 'green' ? 'from-green-500 to-teal-500' :
                    'from-purple-500 to-pink-500'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gradient mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="section-divider" />
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white dark:bg-gray-800">
        <div className="parallax-bg parallax-medium">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 30, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
          />
        </div>
        
        <div className="section-content">
          <div className="max-w-6xl mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Trusted by Research Teams Worldwide
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                See what our users have to say about their experience
              </p>
            </motion.div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glass-effect p-8 rounded-xl shadow-lg hover-lift"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="relative w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-800"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gradient">
                          {testimonial.author}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="section-divider" />
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="parallax-bg parallax-shallow">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900 opacity-50"></div>
        </div>
        
        <div className="section-content">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Research Process?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of researchers who have already improved their project management
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/signup"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Now
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
