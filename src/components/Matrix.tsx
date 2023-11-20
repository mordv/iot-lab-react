import React, { useEffect, useState } from 'react';
import { intRange } from '@mordv/utils';
import { produce } from 'immer';

// TODO подтягивать начальное состояние матрицы при подключении к плате
// TODO обновлять локальное значение только после успешного запроса на палату
export const Matrix: React.FC = () => {
  // useState hook
  // Принимает начальное состояние ИЛИ лямбду, возвращающую начальное значение (ленивая инициализация)
  // Возвращает пару [значение, функцияДляОбновленияЭтогоЗначения(сеттер)]
  // после вызова сеттера произойдет ререндер (компонент перерисуется)
  // синтаксис слева от равно называется Destructuring_assignment
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  const [matrix, setMatrix] = useState(() =>
    Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => false)),
  );

  const mutateMatrix = (i: number, j: number, value: boolean) => {
    // сеттер принимает лямбду. Ее параметр - текущее значение
    // в react нельзя мутировать. Для того чтобы изменить поля объекта,
    // мы должны собрать объект заново (в нашем случае это двумерный массив)
    // для удобства используется библиотека immer
    // она принимает текущее состояние и функцию-мутатор. Возвращает новый объект, не трогая при этом исходный.
    setMatrix((currentState) =>
      produce(currentState, (mutableDraft) => {
        mutableDraft[i][j] = value;
      }),
    );
  };

  // Хук useEffect принимает лямбду и depsArray.
  // Дергает лямбду при изменении какого-либо элемента из этого массива.
  // Если массив пустой - лямбда сработает один раз при первом рендере

  useEffect(() => {
    // Лямбда может вернуть лямбду, тогда, при следующем срабатывании useEffect
    // эта возвращенная лямбда будет вызвана. По сути - деструктор. В компоненте Controls.tsx есть примет
    // return () => {}
  }, []);

  // Компонент-функция и два хука это по сути весь react =)

  // className содержит css классы. В проекте настроен tailwind-css можно использовать его, можно редактировать .css и писать свои классы
  // в отличии от ванильного html. jsx/tsx позволяет составлять динамические деревья в зависимости от состояния, использовать циклы итд.
  return (
    <div className={'center bg-neutral-700 flex flex-col'}>
      {intRange(8).map((i) => (
        <div key={i} className={'flex'}>
          {intRange(8).map((j) => {
            const v = matrix[i][j];
            return (
              <div
                key={j}
                onClick={() => {
                  mutateMatrix(i, j, !v);
                }}
                className={`w-4 h-4 m-0.5 rounded-full hover:bg-red-200 cursor-pointer ${
                  v ? 'bg-red-500' : 'bg-neutral-50'
                }`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
