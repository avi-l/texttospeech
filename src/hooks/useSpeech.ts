import { useState, useEffect } from "react";

interface SpeechHook {
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

export const useSpeech = (): SpeechHook => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      console.error("Speech synthesis not supported in this browser.");
    }
  }, []);

  const speak = (text: string): void => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const stopSpeaking = (): void => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return { speak, stopSpeaking, isSpeaking };
};
