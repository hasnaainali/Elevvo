import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "477c608f7fb15015c5605eb9a15305ec";

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cities, setCities] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [confirm, setConfirm] = useState({ open: false, id: null, name: "" });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  async function fetchSuggestions(q) {
    if (!q || q.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        q
      )}&limit=5&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(Array.isArray(data) ? data : []);
    } catch {
      setSuggestions([]);
    }
  }

  async function addCityByCoords(lat, lon) {
    setError("");
    setLoading(true);
    try {
      const curRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!curRes.ok) throw new Error("Failed current");
      const current = await curRes.json();

      const fcRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!fcRes.ok) throw new Error("Failed forecast");
      const forecast = await fcRes.json();

      setCities((prev) => {
        const withoutDup = prev.filter((c) => c.id !== current.id);
        const next = [{ id: current.id, current, forecast, expanded: false }, ...withoutDup];
        return next.slice(0, 3); 
      });

      setQuery("");
      setSuggestions([]);
    } catch (e) {
      setError("Couldn't fetch weather for this location.");
    } finally {
      setLoading(false);
    }
  }

  async function addCityByName(name) {
    if (!name || !name.trim()) return;
    try {
      const geo = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          name
        )}&limit=1&appid=${API_KEY}`
      );
      const g = await geo.json();
      if (!Array.isArray(g) || g.length === 0) {
        setError("City not found.");
        return;
      }
      const { lat, lon } = g[0];
      addCityByCoords(lat, lon);
    } catch {
      setError("City not found.");
    }
  }

  function handleSelectSuggestion(s) {
    setQuery(`${s.name}${s.state ? ", " + s.state : ""}, ${s.country}`);
    addCityByCoords(s.lat, s.lon);
  }

  function handleDelete(cityId) {
    setCities((prev) => prev.filter((c) => c.id !== cityId));
    
    setConfirm({ open: false, id: null, name: "" });
  }

  function handleToggleForecast(cityId) {
    setCities((prev) =>
      prev.map((c) =>
        c.id === cityId ? { ...c, expanded: !c.expanded } : c
      )
    );
  }

  function requestDelete(cityId, cityName) {
    setConfirm({ open: true, id: cityId, name: cityName });
  }

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        addCityByCoords(latitude, longitude);
      },
      () => {
      }
    );
  }, []);

  const showSuggestions = useMemo(
    () => suggestions && suggestions.length > 0,
    [suggestions]
  );

  return (
    <div className="container">
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      />

      <main className="main-content">
        <div className="search-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCityByName(query);
            }}
            style={{ position: "relative" }}
          >
            <input
              type="text"
              value={query}
              placeholder="Search city…"
              onChange={(e) => {
                setQuery(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              autoComplete="off"
            />
            <button type="submit">Search</button>

            {showSuggestions && (
              <ul className="suggestions-list">
                {suggestions.map((s, idx) => (
                  <li key={`${s.lat}-${s.lon}-${idx}`} onClick={() => handleSelectSuggestion(s)}>
                    {s.name}
                    {s.state ? `, ${s.state}` : ""}, {s.country}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        {loading && <div className="loading">Loading…</div>}
        {error && <div className="error">{error}</div>}

        <div className="dashboard">
          {cities.map(({ id, current, forecast, expanded }) => (
            <WeatherCard
              key={id}
              data={{ current, forecast }}
              expanded={expanded}
              onToggle={() => handleToggleForecast(id)}
              onDelete={() => requestDelete(id, current?.name)}
            />
          ))}
        </div>
      </main>

      {confirm.open && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Delete <strong>{confirm.name}</strong>?</p>
            <div className="confirm-actions">
              <button
                className="confirm-yes"
                onClick={() => handleDelete(confirm.id)}
              >
                Yes
              </button>
              <button
                className="confirm-no"
                onClick={() => setConfirm({ open: false, id: null, name: "" })}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
