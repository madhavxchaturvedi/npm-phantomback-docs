import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setVisible(v > 0.01);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <motion.div
      className="fixed top-14 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-primary via-violet-400 to-cyan-400 pointer-events-none"
      style={{ scaleX, opacity: visible ? 1 : 0 }}
    />
  );
}
