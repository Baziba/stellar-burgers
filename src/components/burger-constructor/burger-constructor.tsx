import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/slices/constructor/constructorSlice';
import { constructorActions } from '../../services/slices/constructor/constructorSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((store) => store.burgerConstructor);
  const orderRequest = useSelector(
    (state) => state.burgerConstructor.orderRequest
  );
  const orderModalData = useSelector((state) => state.burgerConstructor.order);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) return navigate('/login', { replace: true });

    const { bun, ingredients } = constructorItems;

    const order = [
      bun._id,
      ...ingredients.map((item: TIngredient) => item._id),
      bun._id
    ];

    dispatch(createOrder(order));
    dispatch(constructorActions.resetConstructor());
  };

  const closeOrderModal = () => {
    dispatch(constructorActions.resetOrder());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const readyToOrder = useMemo(
    () =>
      constructorItems.bun !== null && constructorItems?.ingredients.length > 0,
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      readyToOrder={readyToOrder}
    />
  );
};
