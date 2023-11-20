import React, { useState } from 'react';
import { Matrix } from '../components/Matrix';
import { Controls } from '../components/Controls';

export const HomePage: React.FC = () => {
  const [mode, setMode] = useState('snake');
  return (
    <div className={'flex flex-col center-full'}>
      <label htmlFor={'select'}>Режим:</label>
      <select
        id="select"
        className={'h-8 my-2'}
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value={'snake'}>Змейка</option>
        <option value={'draw'}>Рисовалка</option>
      </select>
      <div className={' center-full'}>
        {mode === 'snake' ? <Controls /> : <Matrix />}
      </div>
    </div>
  );
};
