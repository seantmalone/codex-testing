const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Home({ settings }) {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {settings.username || 'Guest'}!</p>
      <p>Current theme: {settings.theme}</p>
    </div>
  );
}

function Settings({ settings, setSettings }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  return (
    <div>
      <h1>User Settings</h1>
      <div>
        <label>
          Username:
          <input
            name="username"
            value={settings.username}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Theme:
          <select name="theme" value={settings.theme} onChange={handleChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function App() {
  const [settings, setSettings] = useLocalStorage('settings', {
    username: '',
    theme: 'light',
  });

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/settings">Settings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home settings={settings} />} />
        <Route
          path="/settings"
          element={<Settings settings={settings} setSettings={setSettings} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
