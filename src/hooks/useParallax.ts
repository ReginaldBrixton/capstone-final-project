import { useEffect, useRef } from 'react';

// Extend HTMLDivElement to include isIntersecting property
interface ParallaxElement extends HTMLDivElement {
  isIntersecting?: boolean;
}

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<ParallaxElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      if (!element.isIntersecting) return;
      
      const rect = element.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const relativeScroll = scrollPosition - scrollPositionRef.current;
      
      const translateY = relativeScroll * speed;
      element.style.transform = `translateY(${translateY}px)`;
      
      scrollPositionRef.current = scrollPosition;
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        element.isIntersecting = entry.isIntersecting;
        
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll);
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      },
      { threshold: 0 }
    );

    observerRef.current.observe(element);
    scrollPositionRef.current = window.scrollY;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return elementRef;
}; 