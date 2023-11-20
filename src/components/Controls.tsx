import React, { useEffect } from 'react';

export const Controls: React.FC = () => {
  const handleControl = (key: 'left' | 'right' | 'up' | 'down') => {
    console.log(key);
  };

  useEffect(() => {
    const listener = ({ key }: any) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        handleControl(key.substring(5).toLowerCase() as any);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div className={'flex scale-150'}>
      <button onClick={() => handleControl('left')}>⬅️</button>
      <div className={'flex flex-col'}>
        <button onClick={() => handleControl('up')}>⬆️</button>
        <button onClick={() => handleControl('down')}>⬇️</button>
      </div>
      <button onClick={() => handleControl('right')}>➡️</button>
    </div>
  );
};
