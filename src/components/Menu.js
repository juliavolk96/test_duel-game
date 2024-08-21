import React, { useState, useEffect, useCallback } from "react";
import SettingsForm from "./SettingsForm";

const Menu = ({ hero, onHeroChange, onClose }) => {
  const [settings, setSettings] = useState({
    bulletColor: '#000000',
    movementSpeed: 1,
    shootingFrequency: 2000
  });

  useEffect(() => {
    if (hero) {
      setSettings({
        bulletColor: hero.bullets[0]?.color || hero.color,
        movementSpeed: hero.movementSpeed,
        shootingFrequency: hero.shootingFrequency
      });
    }
  }, [hero]);

  const handleSettingsChange = useCallback((newSettings) => {
    setSettings(newSettings);
    if (onHeroChange) {
      onHeroChange(newSettings);
    }
  }, [onHeroChange]);

  const handleSaveClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="menu">
      <h3 className="menu-title">Hero Settings</h3>
      <SettingsForm
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
      <button onClick={handleSaveClick} className="save-button button">Close</button>
    </div>
  );
};

export default Menu;