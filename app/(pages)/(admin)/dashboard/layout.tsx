'use client';

import { useEffect, useState } from 'react';
import styles from './layout.module.scss'

const shouldRun = false;

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [modelResponse, setModelResponse] = useState("");
  const [fullText, setFullText] = useState("");

  // Typing effect when full text is set
  useEffect(() => {
    if(!shouldRun) { return; }

    let i = 0;
    if (!fullText) return;

    const interval = setInterval(() => {
      setModelResponse(prev => prev + fullText[i]);
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 30); // adjust speed here

    return () => clearInterval(interval);
  }, [fullText]);

  // Get Gemini response when page loads
  useEffect(() => {
    const fetchResponse = async () => {
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ prompt: "Introduce yourself. Write only three sentences" }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setFullText(data.content); // triggers typing
    };

    if (shouldRun) { fetchResponse(); };
  }, []);

  return (
    <main className={styles.page}>
        <h1>Dashboard</h1>
        <div className={styles.spotlight}>
            <h2>Spotlight</h2>
            <div className={styles.spotlightElements}>
                <div className={styles.spotlightElement}>
                    <h3>Model Review</h3>
                    <p>{modelResponse}</p>
                </div>
                <div className={styles.spotlightElement}>
                    <h3>Demographic Data</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore porro sint iure accusamus numquam maiores praesentium, error sequi eum exercitationem aspernatur provident quasi dolorum perferendis quos adipisci corrupti aperiam assumenda?</p>
                </div>
            </div>
        </div>
        <div className={styles.services}>
            <h2>Services</h2>
            <div className={styles.tabs}>
                {children} {/* This is where tab content loads */}
            </div>
        </div>
    </main>
  );
}

export default Dashboard;