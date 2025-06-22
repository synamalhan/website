import { useEffect, useState, useRef } from 'react';
import { pipeline } from '@xenova/transformers';

function useTransformersChat() {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const historyRef = useRef([]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('🧠 Loading local GPT-2 model...');
        const generator = await pipeline('text-generation', '/models/gpt2', {
          local_files_only: true,
        });
        setModel(() => generator);
        console.log('✅ Model loaded!');
      } catch (err) {
        console.error('❌ Failed to load model:', err);
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, []);

  const ask = async (userMessage) => {
    if (!model || !userMessage.trim()) return '';
    setGenerating(true);

    // Simple conversation memory
    historyRef.current.push(`User: ${userMessage}`);
    const prompt = historyRef.current.join('\n') + '\nAI:';

    try {
      const output = await model(prompt, {
        max_new_tokens: 60,
        do_sample: true,
        temperature: 0.7,
      });
      const response = output[0].generated_text.split('AI:').pop().trim();
      historyRef.current.push(`AI: ${response}`);
      return response;
    } catch (err) {
      console.error('❌ Generation error:', err);
      return 'Sorry, I had trouble generating a response.';
    } finally {
      setGenerating(false);
    }
  };

  return { ask, loading, generating };
}

export default useTransformersChat;
