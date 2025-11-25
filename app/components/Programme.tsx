"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ParticleWaveCanvas from "./ParticleWave";
import styles from "./Programme.module.css";

export default function Programme() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [entered, setEntered] = useState(false);

  // Sync state with URL on mount and when URL changes
  useEffect(() => {
    setEntered(searchParams.get("entered") === "true");
  }, [searchParams]);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setEntered(params.get("entered") === "true");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    router.push("/?entered=true", { scroll: false });
  };

  const handleBack = () => {
    setEntered(false);
    router.push("/", { scroll: false });
  };

  return (
    <main className={styles.main}>
      {/* The 3D Background */}
      <ParticleWaveCanvas entered={entered} />

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="landing"
            className={styles.content}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={styles.headline}
            >
              THE PROGRAMME REWARDS AVERAGES.
            </motion.h1>

            {/* Sub-headline with delay */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className={styles.subheadline}
            >
              He became infinite.
            </motion.p>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.0, duration: 0.5 }}
              className={styles.ctaWrapper}
            >
              <button className={styles.cta} onClick={handleEnter}>
                <span className={styles.ctaText}>ENTER THE SIMULATION</span>
                <div className={styles.ctaHover} />
              </button>
            </motion.div>

            {/* Footer Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 4 }}
              className={styles.footer}
            >
              &quot;You have to die before you learn the trick.&quot;
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="entered"
            className={styles.content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.2 }}
              className={styles.headline}
            >
              WELCOME TO THE PROGRAMME.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1.5 }}
              className={styles.subheadline}
            >
              You are now part of the simulation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.5 }}
              className={styles.ctaWrapper}
            >
              <a
                href="https://github.com/ibsukru/zarathustra"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                <span className={styles.ctaText}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      marginRight: "0.5rem",
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  VIEW SOURCE
                </span>
                <div className={styles.ctaHover} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 0.5 }}
              className={styles.ctaWrapper}
            >
              <button className={styles.ctaBack} onClick={handleBack}>
                <span className={styles.ctaText}>← BACK</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 4 }}
              className={styles.footer}
            >
              &quot;The ash remembers what the fire forgot.&quot;
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
