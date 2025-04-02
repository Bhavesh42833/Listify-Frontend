import { useEffect, useState } from "react";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
    {theme === "light" ? (
      <span style={{ backgroundColor: "white", padding: "5px", borderRadius: "50%" }}>
        <DarkModeOutlined style={{ color: "grey" }} />
      </span>
    ) : (
      <LightModeOutlined style={{ color: "yellow" }} />
    )}
  </button>
  
  );
};

export default DarkMode;
