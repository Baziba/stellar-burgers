import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { constructorActions } from '../../services/slices/constructor/constructorSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        constructorActions.moveItem({
          moveFrom: index,
          moveTo: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        constructorActions.moveItem({
          moveFrom: index,
          moveTo: index - 1
        })
      );
    };

    const handleClose = () => {
      dispatch(constructorActions.removeItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
