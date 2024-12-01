'use client'
import { useParallax } from '../hooks/useParallax'

interface ParallaxSectionProps {
  imageUrl: string
  title: string
  content: string
  reverse?: boolean
  id: string
}

export function ParallaxSection({ imageUrl, title, content, reverse = false, id }: ParallaxSectionProps) {
  const parallaxRef = useParallax()

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      aria-labelledby={`${id}-title`}
    >
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div className="relative z-20 w-full max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 ${reverse ? 'md:flex-row-reverse' : ''}`}>
          <div className="w-full md:w-1/2">
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg transition-all duration-300 hover:bg-white/20">
              <h2
                id={`${id}-title`}
                className="text-3xl sm:text-4xl font-bold mb-4 text-white"
              >
                {title}
              </h2>
              <p className="text-base sm:text-lg text-white mb-6">
                {content}
              </p>
              <button
                className="px-4 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2" />
        </div>
      </div>
    </section>
  )
}
