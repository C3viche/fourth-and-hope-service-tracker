// src/config/demographics.js (or similar shared location)
export const demographics = {
    age: {
      labels: ["Child (0-17)", "Young Adult (18-39)", "Middle Age (40-59)", "Elderly (60+)"],
      title: "Age",
      dbField: 'age_group' // Assumes a column named 'age_group' in your Client table
    },
    sex: {
      labels: ["Male", "Female", "Other"],
      title: "Sex",
      dbField: 'gender' // Assumes a column named 'gender'
    },
    ethnicity: {
      labels: ["White", "Black", "Hispanic", "Asian", "Native American", "Hawaiian,Pacific Islander"],
      title: "Ethnicity",
      dbField: 'ethnicity' // Assumes a column named 'ethnicity'
    },
    language: {
      labels: ["English", "Spanish", "Chinese", "Arabic", "Hindi", "Russian", "Japanese", "Portuguese", "Other"],
      title: "Language",
      dbField: 'primary_language' // Assumes a column named 'primary_language'
    },
    stayType: {
      // NOTE: Your chart code only had 'age', 'sex', 'ethnicity', 'language'. Added 'stayType' based on chart labels.
      // Double-check if your Client table has a corresponding field.
      labels: ["Overnight", "Regular"],
      title: "Stay Type",
      dbField: 'stay_type' // Assumes a column named 'stay_type'
    },
    // Add other demographics as needed
  };
  
  export type DemographicKey = keyof typeof demographics;
  
  // You can keep your original DemographicsChart component as is,
  // just make sure it also imports/uses this same `demographics` object
  // or receives the labels dynamically if you prefer.