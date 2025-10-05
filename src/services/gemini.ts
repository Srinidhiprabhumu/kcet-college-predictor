import { GoogleGenerativeAI } from '@google/generative-ai';
import type { CollegeData, UserInput } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Cache for chatbot responses
const responseCache = new Map<string, string>();

// Sample of college data for faster responses (instead of full dataset)
const getSampleCollegeData = (collegeData: CollegeData[]) => {
  // Take a sample of colleges for faster processing
  const sample = collegeData.slice(0, 20).map(college => ({
    College: college.College,
    Branch: college.Branch,
    Location: college.Location,
    GM: college.GM,
    SCG: college.SCG,
    STG: college.STG
  }));
  return sample;
};

export async function getPredictions(collegeData: CollegeData[], userInput: UserInput) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Analyze the following college data for a student with KCET rank ${userInput.rank}, category ${userInput.category},
    preferred locations: ${userInput.locations.join(', ')}, and preferred branches: ${userInput.branches.join(', ')}.

    Provide clear, concise, and actionable recommendations. Format the output using markdown.

    **1. Top Recommendations:**
    List the top 5 colleges that are the best match. For each college, mention the branch and cutoff.

    **2. Option Entry Strategy:**
    Suggest a safe, moderate, and ambitious option entry strategy based on the provided data.

    **3. Alternative Options:**
    List a few alternative colleges or branches to consider.

    College data: ${JSON.stringify(collegeData)}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function getChatbotResponse(message: string, collegeData: CollegeData[]) {
  // Create a cache key based on the message
  const cacheKey = message.toLowerCase().trim();
  
  // Check cache first
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey)!;
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    generationConfig: {
      maxOutputTokens: 500, // Limit response length for faster generation
      temperature: 0.7, // Slightly more focused responses
    }
  });

  // Use sample data instead of full dataset for faster processing
  const sampleData = getSampleCollegeData(collegeData);

  const prompt = `
    You are a KCET counseling assistant. Provide quick, helpful responses about college selection.
    
    Sample college data: ${JSON.stringify(sampleData)}
    
    Student question: ${message}
    
    Keep your response concise and practical. Focus on the most relevant information.
  `;

  try {
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    );

    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise
    ]) as any;

    const response = await result.response;
    const responseText = response.text();

    // Cache the response
    responseCache.set(cacheKey, responseText);
    
    return responseText;
  } catch (error) {
    console.error('Chatbot error:', error);
    return 'I apologize, but I\'m having trouble processing your request right now. Please try asking a simpler question or try again in a moment.';
  }
}
