import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "linear-gradient(135deg,#f59e0b,#ea580c)",
        color: "#fff",
        border: "none",
        display: visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        zIndex: 999,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;