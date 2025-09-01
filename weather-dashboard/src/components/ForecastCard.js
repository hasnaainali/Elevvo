import React from "react";
import "./ForecastCard.css";

export default function ForecastCard({
  weekday,
  dateStr,
  max,
  min,
  description,
  popPct,
  icon,
  rain
}) {
  return (
    <div className="fcard">
      <div className="fhead">
        <div className="fday">{weekday}</div>
        <div className="fdate">{dateStr}</div>
      </div>

      <div className="fmain">
        <img
          className="ficon"
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
        />
        <div className="ftemp">
          {max}° / {min}°
        </div>
      </div>

      <div className="fdesc">{description}</div>
      {rain ? (
        <div className="fpop">🌧 Expected Rain: {rain} mm</div>
      ) : popPct > 0 ? (
        <div className="fpop">🌧 {popPct}% chance</div>
      ) : (
        <div className="fpop">🌧 No rain expected</div>
      )}
    </div>
  );
}
