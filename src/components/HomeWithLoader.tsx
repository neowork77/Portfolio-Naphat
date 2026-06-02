'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import LoadingScreen so Three.js is never bundled server-side
const LoadingScreen = dynamic(() => import('./LoadingScreen'), { ssr: false });

export default function HomeWithLoader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loading animation – shown until assembly-shatter sequence finishes */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Homepage content – fades in once loader is done */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
