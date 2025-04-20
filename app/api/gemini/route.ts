import  { getGeminiResponse } from "@/app/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        
        const text = await getGeminiResponse(prompt);
        return NextResponse.json(
            { status: 200, content: text },
            { headers: { "Content-Type": "application/json" } },
        );
    } catch (e) {
        console.error("Error:", e);
        return NextResponse.json(
            { error: e},
            { status: 500 },
        );
    }
}