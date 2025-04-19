'use client'

// import styles from "./DemographicsChart.module.scss"
import React from 'react';
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

type DemographicChartData = {
    width: number,
    height: number,
    demographic: string,
    dataValues: number[]
}

const colors = [
    "#CCD5AE",
    "#E9EDC9",
    "#FEFAE0",
    "#FAEDCD",
    "#D4A373",
    "#805A36",
    "#D9BF77",
    "#E2B0A1",
    "#D9BF77",
    "#E2B0A1",
]

const demographics = {
    age: {labels: ["Child (0-17)", "Young Adult (18-39)", "Middle Age (40-59)", "Elderly (60+)"], title: "Age"},
    sex: {labels: ["Male", "Female", "Other"], title: "Sex"},
    ethnicity: {labels: ["White", "Black", "Hispanic", "Asian", "Native American", "Hawaiian,Pacific Islander"], title: "Ethnicity"},
    language: {labels: ["English", "Spanish", "Chinese", "Arabic", "Hindi", "Russian", "Japanese", "Portuguese", "Other"], title: "Language"},
    stayType: {labels: ["Overnight", "Regular"], title: "Stay Type"},
}

const DemographicsChart = ({ width, height, demographic, dataValues }: DemographicChartData) => {
    
    const demographicType = demographics[demographic as keyof typeof demographics];
    const colorScheme = colors.slice(0, demographicType.labels.length);

    const data: Plotly.Data[] = [{
        values: dataValues,
        labels: demographicType.labels,
        type: 'pie',
        marker: {
            colors: colorScheme
        },
    }];
    
    const layout: Partial<Plotly.Layout> = {
        width: width, height: height, title: {text: demographicType.title}
    }
    
    return (
        <Plot data={data} layout={layout}/>
    );
}

export default DemographicsChart;