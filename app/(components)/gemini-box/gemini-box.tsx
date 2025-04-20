'use client';

import { useEffect, useState } from 'react';
const shouldRun = true;

const context = `    
    Role: {
        You are a helpful assistant and analyst serving Fourth and Hope, an organization
        that provides essential services to individuals experiencing homelessness and housing insecurity, including 
        meals, showers, shelter beds, etc.
    }
`

export default function GeminiBox() {
    const [modelResponse, setModelResponse] = useState("");
    const [fullText, setFullText] = useState("");

    // Typing effect when full text is set
    useEffect(() => {
        if(!shouldRun) { return; }

        let i = -1;
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
            body: JSON.stringify({ prompt: `${context} Introduce yourself. Write only three sentences` }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setFullText(data.content); // triggers typing
        };

        if (shouldRun) { fetchResponse(); };
    }, []);

return (
    <div >
        <h3>Model Insights</h3>
        <p>{modelResponse}</p>
    </div>
    );
}