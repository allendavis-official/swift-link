import { useEffect, useState } from "react";
import "./styles/App.scss";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme on toggle/load
  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleShorten = async () => {
    if (!inputUrl.trim()) return;
    setIsLoading(true);

    const backendUrl =
      process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${backendUrl}/api/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl: inputUrl }),
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      alert("Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div className="app">
      {/* Toggle Button (top-right corner) */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="theme-toggle"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      <div className="logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M10 20 L30 20 M20 10 L20 30"
            stroke="#2563eb"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="10" cy="20" r="3" fill="#7c3aed" />
          <circle cx="30" cy="20" r="3" fill="#7c3aed" />
        </svg>
        <h1>SwiftLink</h1>
      </div>

      <div className="url-form">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste your long URL"
          className="url-form__input"
        />
        <button
          onClick={handleShorten}
          className="url-form__button"
          disabled={isLoading}
        >
          {isLoading ? <div className="spinner"></div> : "Shorten"}
        </button>
        {shortUrl && (
          <div className="result-card">
            <p>Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button onClick={handleCopy}>Copy</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
