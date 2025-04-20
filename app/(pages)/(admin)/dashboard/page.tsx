'use client';
import { useState } from 'react';
import styles from './page.module.scss';

import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['food', 'shelter', 'hygiene'];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('food');
  
    const renderContent = (tab: string) => {
      switch (tab) {
        case 'food':
          return <p>Food service content here.</p>;
        case 'shelter':
          return <p>Shelter service content here.</p>;
        case 'hygiene':
          return <p>Hygiene service content here.</p>;
        default:
          return null;
      }
    };
  
    return (
      <section className={styles.section}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            >
              {tab}
            </button>
          ))}
          <motion.div
            className={styles.slider}
            layoutId="tab-slider"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              width: `${100 / tabs.length}%`,
              left: `${tabs.indexOf(activeTab) * (100 / tabs.length)}%`,
            }}
          />
        </div>
  
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.content}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent(activeTab)}
          </motion.div>
        </AnimatePresence>
      </section>
    );
  }