import React from "react";

const SettingsForm = ({ settings, onSettingsChange }) => {
  return (
    <form className="settings-form">
      <label className="settings-label">
        Bullet Color:
        <input
          type="color"
          value={settings.bulletColor}
          onChange={(e) => onSettingsChange({
            ...settings,
            bulletColor: e.target.value
          })}
          className="settings-input"
        />
      </label>
      <label className="settings-label">
        Movement Speed:
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={settings.movementSpeed}
          onChange={(e) => onSettingsChange({
            ...settings,
            movementSpeed: Number(e.target.value)
          })}
          className="settings-input"
        />
        <span className="settings-value">{settings.movementSpeed}</span>
      </label>
      <label className="settings-label">
        Shooting Frequency (ms):
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={settings.shootingFrequency}
          onChange={(e) => onSettingsChange({
            ...settings,
            shootingFrequency: Number(e.target.value)
          })}
          className="settings-input"
        />
        <span className="settings-value">{settings.shootingFrequency}</span>
      </label>
    </form>
  );
};

export default SettingsForm;