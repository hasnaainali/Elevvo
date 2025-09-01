import React, { useMemo } from "react";
import "./WeatherCard.css";
import ForecastCard from "./ForecastCard";
import { FaSun, FaCloud, FaCloudRain } from "react-icons/fa";

export default function WeatherCard({ data, expanded, onToggle, onDelete }) {
  const { current, forecast } = data;

  const localDateStr = useMemo(() => {
    const tz = current?.timezone || 0;
    const utc = current?.dt ? current.dt * 1000 : Date.now();
    const local = new Date(
      utc + tz * 1000 - new Date().getTimezoneOffset() * 60000
    );
    const weekday = local.toLocaleDateString(undefined, { weekday: "short" });
    const mdY = local.toLocaleDateString(undefined, {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
    return `${weekday} • ${mdY}`;
  }, [current]);

  const next3Days = useMemo(() => {
    if (!forecast?.list) return [];

    const tz = forecast.city?.timezone || 0;
    const toLocalDateKey = (dt) => {
      const d = new Date(
        dt * 1000 + tz * 1000 - new Date().getTimezoneOffset() * 60000
      );
      return d.toISOString().slice(0, 10);
    };

    const todayKey = toLocalDateKey(
      current?.dt || Math.floor(Date.now() / 1000)
    );
    const byDay = new Map();

    for (const item of forecast.list) {
      const key = toLocalDateKey(item.dt);
      if (!byDay.has(key)) byDay.set(key, []);
      byDay.get(key).push(item);
    }

    const summaries = [];
    for (const [key, items] of byDay.entries()) {
      if (key === todayKey) continue;
      let tMax = -Infinity,
        tMin = Infinity,
        bestAtNoon = null,
        maxPop = 0,
        descCount = new Map();

      for (const it of items) {
        tMax = Math.max(tMax, it.main.temp_max);
        tMin = Math.min(tMin, it.main.temp_min);
        maxPop = Math.max(maxPop, it.pop ?? 0);

        const desc = it.weather?.[0]?.description || "";
        descCount.set(desc, (descCount.get(desc) || 0) + 1);

        if (
          it.dt_txt?.includes("12:00:00") ||
          (!bestAtNoon && it.dt_txt?.includes("15:00:00"))
        ) {
          bestAtNoon = it;
        }
      }
      if (!bestAtNoon) bestAtNoon = items[Math.floor(items.length / 2)];

      let description = "";
      let maxCount = -1;
      for (const [d, c] of descCount.entries()) {
        if (c > maxCount) {
          description = d;
          maxCount = c;
        }
      }

      const dDate = new Date(
        new Date(key).getTime() +
          tz * 1000 -
          new Date().getTimezoneOffset() * 60000
      );
      const weekday = dDate.toLocaleDateString(undefined, { weekday: "short" });
      const mdY = dDate.toLocaleDateString(undefined, {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });

      summaries.push({
        key,
        weekday,
        dateStr: mdY,
        max: Math.round(tMax),
        min: Math.round(tMin),
        description,
        popPct: Math.round((maxPop || 0) * 100),
        icon: bestAtNoon.weather?.[0]?.icon,
        rain: bestAtNoon.rain?.["3h"] || null,
      });
    }

    summaries.sort((a, b) => (a.key < b.key ? -1 : 1));
    return summaries.slice(0, 3);
  }, [forecast, current]);

  const desc = current?.weather?.[0]?.description || "";
  const main = current?.weather?.[0]?.main?.toLowerCase() || "";

  const precipNow =
    (current?.rain && (current.rain["1h"] || current.rain["3h"])) || null;

  const getConditionIcon = () => {
    if (main.includes("clear")) return <FaSun className="cond-icon sun" />;
    if (main.includes("cloud")) return <FaCloud className="cond-icon cloud" />;
    if (main.includes("rain")) return <FaCloudRain className="cond-icon rain" />;
    return null;
  };

  return (
    <div className="card">
      <button
        className="delete-btn"
        onClick={() => onDelete && onDelete()}
        title="Delete this city"
        aria-label={`Delete ${current.name}`}
      >
        ×
      </button>

      <div className="card-head">
        <div className="title">
          <h2 className="city">{current.name}</h2>
          <div className="date">{localDateStr}</div>
        </div>
        <div className="weather-icon-block">
          <img
            className="wicon"
            src={`https://openweathermap.org/img/wn/${current.weather?.[0]?.icon}@2x.png`}
            alt={desc}
          />
          <div className={`desc-badge ${main}`}>
            {getConditionIcon()}
            <span>{desc}</span>
          </div>
        </div>
      </div>

      <div className="today">
        <div className="temp">{Math.round(current.main?.temp)}°</div>
        <div className="meta">
          <div className="stat">💧 Humidity: {current.main?.humidity}%</div>
          <div className="stat">💨 Wind: {Math.round(current.wind?.speed)} m/s</div>

          {precipNow ? (
            <div className="stat">🌧 Expected Rain: {precipNow} mm</div>
          ) : current.pop ? (
            <div className="stat">🌧 {Math.round(current.pop * 100)}% chance</div>
          ) : (
            <div className="stat">🌧 No rain expected</div>
          )}
        </div>
      </div>

      <button className="toggle-forecast" onClick={onToggle}>
        {expanded ? "Hide 3-Day Forecast" : "Show 3-Day Forecast"}
      </button>

      {expanded && (
        <div className="forecast3">
          {next3Days.map((d) => (
            <ForecastCard key={d.key} {...d} />
          ))}
        </div>
      )}
    </div>
  );
}
