import "./styles/App.scss";

function App() {
  return (
    <div className="app">
      <div className="url-form">
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
        <input
          type="text"
          placeholder="Paste your long URL"
          className="url-form__input"
        />
        <button className="url-form__button">Shorten</button>
      </div>
    </div>
  );
}

export default App;
