import React, { useRef, useState, useEffect, useCallback } from 'react';
import Hero from './Hero';
import Menu from './Menu';

const CanvasField = () => {
  const canvasRef = useRef(null);
  const [hero1, setHero1] = useState(null);
  const [hero2, setHero2] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    
    canvas.width = 600;
    canvas.height = 400;

    const newHero1 = new Hero(2000, 2, '#007bff', 50, canvas.height / 2 - 20);
    const newHero2 = new Hero(2000, 2, '#ff0000', canvas.width - 90, canvas.height / 2 - 20);

    setHero1(newHero1);
    setHero2(newHero2);
    
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const animate = () => {
      if (!isPaused) {
        context.fillStyle = '#f0f0f0';
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (hero1 && hero2) {
          hero1.move(canvas.height, cursorPosition.x, cursorPosition.y);
          hero2.move(canvas.height, cursorPosition.x, cursorPosition.y);

          hero1.draw(context, hero2.x + 20, hero2.y + 20, hero2, canvas.width, canvas.height, cursorPosition.x, cursorPosition.y);
          hero2.draw(context, hero1.x + 20, hero1.y + 20, hero1, canvas.width, canvas.height, cursorPosition.x, cursorPosition.y);

          context.fillStyle = '#000';
          context.font = '20px Arial';
          context.fillText(`Hero 1 Hits: ${hero2.hitCount}`, 50, 30);
          context.fillText(`Hero 2 Hits: ${hero1.hitCount}`, canvas.width - 180, 30);
        }

        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hero1, hero2, isPaused, cursorPosition]);

  const handleHeroChange = useCallback((heroName, newSettings) => {
    if (heroName === 'hero1' && hero1) {
      hero1.updateSettings(newSettings);
    }
    if (heroName === 'hero2' && hero2) {
      hero2.updateSettings(newSettings);
    }
  }, [hero1, hero2]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleHeroClick = () => {
    if (isPaused) {
      setIsMenuVisible(true);
    }
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  return (
    <div className='game-container'>
      {isMenuVisible && (
        <div className='menu-container'>
          <Menu
            hero={hero1}
            onHeroChange={(newSettings) => handleHeroChange('hero1', newSettings)}
            onClose={handleCloseMenu}
          />
          <Menu
            hero={hero2}
            onHeroChange={(newSettings) => handleHeroChange('hero2', newSettings)}
            onClose={handleCloseMenu}
          />
        </div>
      )}
      <canvas ref={canvasRef} onClick={handleHeroClick} onMouseMove={handleMouseMove} />
      <button className="button" onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  );
}

export default CanvasField;
