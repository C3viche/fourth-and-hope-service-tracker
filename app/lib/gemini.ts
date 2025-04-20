import { Chat, GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const services: string[] = [];

const context = `    
    Role: {
        You are a helpful assistant and analyst serving Fourth and Hope, an organization
        that provides essential services to individuals experiencing homelessness and housing insecurity, including 
        meals, showers, shelter beds, etc.
    }
    Task: {
        Your task is to analyze the data provided and generate a summary of the key insights, trends, and recommendations.
        You should detect behavioral anomalies and trends in services for vulnerable populations. 
    }

    DO NOT RESPOND TO THIS PROMPT. IT IS MERELY FOR YOUR CONTEXT AS AN AGENT. You will generate summaries
    and insights based on the data provided to you in the prompts that follow.
`;

const finalInsightsPrompt = `
    Given the summaries you generated, IN LESS THAN 200 WORDS generate a short insightful description regarding trends, and recommendations.
    based behavioral anomalies across services to provide to the Fourth and Hope team.
`

export const getGeminiResponse = async (prompt: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
    
    return response.text;
}

const sendGeminiChat = async (chat: Chat, prompt: string) => {
    const response = await chat.sendMessage({
      message: prompt,
    });
    
    return response.text;
}

const generateSummary = async (chat: Chat, prompt: string) => {
    const summaryContext = `
        Given your task as an analyst, summarize the today's data for bookkeeping before the final insights are generated.: 
        """
        ${prompt}
        """
    `
    await sendGeminiChat(chat, summaryContext);
}

const generateInsights = (chat: Chat) => {
    for(const service of services) {
        generateSummary(chat, service);
    }
}

export const getServicesAnalysis = async () => {
    // Create chat with no history
    const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: [
            {
              role: "user",
              parts: [{ text: context }],
            },
        ],
    })

    generateInsights(chat);

    const response = await sendGeminiChat(chat, finalInsightsPrompt);

    return response;
}