'use client';
import { useState } from 'react';
import styles from './page.module.scss';
import DemographicsChart from '@/app/(components)/DemographicsChart/DemographicsChart';

import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Age', 'Sex', 'Ethnicity', 'Language', 'Stay Type'];
  // --- Fake Data Generation ---
  // NOTE: The length and order of numbers in each array MUST correspond
  // to the 'labels' defined INSIDE the DemographicsChart component
  // for the respective 'demographic' key.

  // For demographic="age" (Labels: ["Child (0-17)", "Young Adult (18-39)", "Middle Age (40-59)", "Elderly (60+)"])
  const ageData1: number[] = [15, 45, 25, 10];
  const ageData2: number[] = [12, 30, 25, 33];

  // For demographic="sex" (Labels: ["Male", "Female", "Other"])
  const sexData1: number[] = [55, 60, 5];
  const sexData2: number[] = [130, 50, 20];

  // For demographic="ethnicity" (Labels: ["White", "Black", "Hispanic", "Asian", "Native American", "Hawaiian,Pacific Islander"])
  const ethnicityData1: number[] = [80, 25, 40, 35, 5, 2];
  const ethnicityData2: number[] = [23, 15, 10, 5, 2, 1];

  // For demographic="language" (Labels: ["English", "Spanish", "Chinese", "Arabic", "Hindi", "Russian", "Japanese", "Portuguese", "Other"])
  const languageData1: number[] = [120, 30, 15, 5, 8, 3, 10, 4, 18];
  const languageData2: number[] = [23, 15, 10, 5, 2, 1, 3, 4, 8];

  // For demographic="stayType" (Labels: ["Overnight", "Regular"])
  const stayTypeData1: number[] = [35, 90];
  const stayTypeData2: number[] = [23, 72];

  // --- Chart Dimensions (Optional - adjust as needed) ---
  const chartWidth = 400;
  const chartHeight = 350;


export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('Showers');
  
    const renderContent = (tab: string) => {
      switch (tab) {
        case 'Age':
            return (
                <div>
                    <DemographicsChart
                        width={chartWidth}
                        height={chartHeight}
                        demographic="age"
                        dataValues={ageData1}
                    />
                    <DemographicsChart
                        width={chartWidth}
                        height={chartHeight}
                        demographic="age"
                        dataValues={ageData2}
                        title="Age Group by Shower Service"
                    />
                </div>
            );
        case 'Sex':
          return (
            <div>
                <DemographicsChart
                    width={chartWidth}
                    height={chartHeight}
                    demographic="sex"
                    dataValues={sexData1}
                />
                <DemographicsChart
                    width={chartWidth}
                    height={chartHeight}
                    demographic="sex"
                    dataValues={sexData2}
                    title="Sex Group by Charging Service"
                />
            </div>
        );
        case 'Ethnicity':
          return (
                <div>
                    <DemographicsChart
                        width={chartWidth}
                        height={chartHeight}
                        demographic="ethnicity"
                        dataValues={ethnicityData1}
                    />
                    <DemographicsChart
                        width={chartWidth}
                        height={chartHeight}
                        demographic="ethnicity"
                        dataValues={ethnicityData2}
                        title="Ethnicity Group by Meal Service"
                    />
                </div>
            );
        case 'Language':
            return (
                <div>
                    <DemographicsChart
                        width={chartWidth}
                        height={chartHeight}
                        demographic="language"
                        dataValues={languageData1}
                    />
                    <DemographicsChart
                        width={chartWidth}
                        height={chartHeight}
                        demographic="language"
                        dataValues={languageData2}
                        title="Language Group by Shower Service"
                    />
                </div>
            );
        case 'Stay Type':
            return (
                <div>
                    <DemographicsChart
                        width={chartWidth}
                        height={chartHeight}
                        demographic="stayType"
                        dataValues={stayTypeData1}
                    />
                    <DemographicsChart
                        width={chartWidth}
                        height={chartHeight}
                        demographic="stayType"
                        dataValues={stayTypeData2}
                        title="Stay Type Group by Shower Service"
                    />
                </div>
            );

        default:
          return null;
      }
    };
  
    return (
<section className={styles.section}>
  {/* Tabs remain unchanged */}
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

  {/* Solution: Add a fixed-height wrapper with hidden overflow */}
  <div style={{ 
    minHeight: '450px', // Set this to your tallest tab's height
    position: 'relative', // Needed for absolute positioning
    overflow: 'hidden' // Prevents scroll jumps
  }}>
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        className={styles.content}
        initial={{ opacity: 0, y: 20 }} // Animate vertically instead of horizontally
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', width: '100%' }} // Prevents layout shift
      >
        {renderContent(activeTab)}
      </motion.div>
    </AnimatePresence>
  </div>
</section>
    );
  }