import OpenAI from 'openai';
import { Vibe } from '../types';
import { vibeColors, vibeEmojis } from '../utils/vibeUtils';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
});

export const analyzeEmotion = async (text: string, language: string = 'en'): Promise<Vibe> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an emotion analysis assistant. Analyze the emotional tone of the text and respond with a single emotion label and confidence score. Valid emotions: happy, sad, angry, excited, relaxed, anxious, neutral, romantic, nostalgic, energetic, melancholic, hopeful, fearful, surprised, bored."
        },
        {
          role: "user",
          content: `Analyze the emotional tone of this text (language: ${language}): "${text}"`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    // Ensure we have a valid vibe label
    const vibeLabel = result.emotion.toLowerCase();
    const emoji = vibeEmojis[vibeLabel] || '😐';
    const color = vibeColors[vibeLabel] || 'bg-gray-500';
    
    return {
      label: vibeLabel,
      emoji,
      confidence: result.confidence,
      color
    };
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    return {
      label: 'neutral',
      emoji: '😐',
      confidence: 0.5,
      color: 'bg-gray-500'
    };
  }
};