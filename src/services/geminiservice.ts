import { GoogleGenAI } from "@google/genai";
import { RESERVES } from '../constants';

// Initialize the Gemini client
// Ensure VITE_API_KEY is set in your .env file
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

const SYSTEM_INSTRUCTION = `
أنت مرشد سياحي خبير ومتخصص في المحميات الطبيعية والملكية في المملكة العربية السعودية.
دورك هو مساعدة الزوار في التخطيط لرحلاتهم، والإجابة عن الأسئلة المتعلقة بالحياة الفطرية، والأنشطة، والمناخ في هذه المحميات.
لديك معرفة عميقة بالمحميات التالية: ${RESERVES.map(r => r.name).join(', ')}.

عند الإجابة:
1. كن ودوداً ومتحمساً ومشجعاً للسياحة البيئية.
2. استخدم اللغة العربية الفصحى البسيطة والواضحة.
3. قدم معلومات دقيقة بناءً على الحقائق البيئية والجغرافية للمملكة.
4. إذا سألك المستخدم عن "أفضل محمية لـ..." (مثلاً: للتخييم، لرؤية المها، قرب الرياض)، قم بترشيح المحمية المناسبة واشرح السبب.
5. شجع المستخدمين دائماً على الحفاظ على البيئة وعدم ترك أثر.

لا تخرج عن سياق المحميات السعودية والسياحة البيئية.
`;

export const askGeminiGuide = async (userQuestion: string, context?: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the prompt with context if available
    let prompt = userQuestion;
    if (context) {
      prompt = `المستخدم يسأل وهو يتصفح صفحة: ${context}.\nالسؤال: ${userQuestion}`;
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "عذراً، لم أتمكن من الحصول على إجابة في الوقت الحالي. يرجى المحاولة مرة أخرى.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "واجهت مشكلة تقنية بسيطة. هل يمكنك إعادة صياغة سؤالك؟";
  }
};
