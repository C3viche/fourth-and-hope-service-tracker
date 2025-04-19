'use client'

// import styles from "./FirstPlot.module.scss"
import React from 'react';
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

const FirstPlot = () => {
    const data: Plotly.Data[] = [
        {
          x: ['giraffes', 'orangutans', 'monkeys'],
          y: [20, 14, 23],
          type: 'bar'
        }
      ];
    
    const layout: Partial<Plotly.Layout> = {
        width: 320, height: 240, title: {text: 'A Bar Chart'}
    }
    
    return (
        <Plot data={data} layout={layout}/>
    );
}

export default FirstPlot;