import React, { useEffect } from 'react';
import './landing.css';
import CarouselComponent from './sections/carousel/carousel';
import Rubriques from './sections/rubriques/rubriques';
import Chiffre from './sections/chiffre';
import Vdeo from './sections/video';
import Actions from './sections/Actions';
import Blogs from './sections/blogs';
import { motion, useAnimation, useInView } from 'framer-motion';

const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const rotateIn = {
  hidden: { opacity: 0, rotate: -15 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const bounceIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 10 } },
};

const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function AnimatedSection({ children, animation }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div ref={ref} variants={animation} initial="hidden" animate={controls}>
      {children}
    </motion.div>
  );
}

export default function Landing() {
  return (
    <section>
      <AnimatedSection animation={zoomIn}>
        <CarouselComponent />
      </AnimatedSection>
      <AnimatedSection animation={slideInLeft}>
        <Rubriques />
      </AnimatedSection>
      <AnimatedSection animation={slideInRight}>
        <Chiffre />
      </AnimatedSection>
      <AnimatedSection animation={rotateIn}>
        <Vdeo />
      </AnimatedSection>
      <AnimatedSection animation={bounceIn}>
        <Actions />
      </AnimatedSection>
      <AnimatedSection animation={slideInUp}>
        <Blogs />
      </AnimatedSection>
    </section>
  );
}
