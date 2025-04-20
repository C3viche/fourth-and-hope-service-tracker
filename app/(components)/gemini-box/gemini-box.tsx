'use client';

import { useEffect, useState } from 'react';
const shouldRun = false;

export default function GeminiBox() {
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
    <div>
        <h3>Model Review</h3>
        <p>{modelResponse}</p>
    </div>
    );
}