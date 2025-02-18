import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import planeIcon from "../../assets/plane.webp"; // Ícone do avião

function ScrollButtons() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollStep, setScrollStep] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToNext = () => {
    const mapSection = document.getElementById("flight-map");
    const staffSection = document.getElementById("staff-section");

    if (scrollStep === 0 && mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
      setScrollStep(1);
    } else if (scrollStep === 1 && staffSection) {
      staffSection.scrollIntoView({ behavior: "smooth" });
      setScrollStep(2);
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setScrollStep(0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScrollStep(0);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-3">
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="scroll-btn"
          aria-label="Voltar ao topo"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          whileHover={{ scale: 1.2, rotate: -10 }}
        >
          <img src={planeIcon} alt="Subir" className="w-8 h-8 transform rotate-[-45deg]" />
        </motion.button>
      )}
      <motion.button
        onClick={scrollToNext}
        className="scroll-btn"
        aria-label="Descer"
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        <img src={planeIcon} alt="Descer" className="w-8 h-8 transform rotate-[135deg]" />
      </motion.button>

      {/* Gradiente estilizado */}
      <div
        className="scroll-gradient"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(270deg, rgb(168, 85, 247) 0%, rgba(163, 57, 227, 0) 100%)"
              : "linear-gradient(270deg, rgb(37, 99, 235) 0%, rgba(37, 99, 235, 0) 100%)",
        }}
      />
    </div>
  );
}

export default ScrollButtons;
