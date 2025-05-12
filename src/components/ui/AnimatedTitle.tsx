import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedTitle = ({ text, className = "", delay = 0 }: AnimatedTitleProps) => {
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 150); // Slightly slower typing speed

      return () => clearInterval(interval);
    }, delay);

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530); // Blink speed

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [text, delay]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={`relative ${className}`}
    >
      <motion.span
        animate={isTypingComplete ? {
          textShadow: [
            "0 0 20px rgba(0, 255, 255, 0.3)",
            "0 0 20px rgba(0, 255, 255, 0.6)",
            "0 0 20px rgba(0, 255, 255, 0.3)",
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#008080] relative"
        style={{
          textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
        }}
      >
        {displayText}
      </motion.span>
      <motion.span
        animate={{ 
          opacity: cursorVisible ? 1 : 0,
          boxShadow: cursorVisible ? "0 0 10px rgba(0, 255, 255, 0.8)" : "none"
        }}
        transition={{ duration: 0.1 }}
        className="absolute -right-[4px] top-0 h-full w-[2px] bg-[#00FFFF]"
      />
    </motion.div>
  );
};

export default AnimatedTitle; 