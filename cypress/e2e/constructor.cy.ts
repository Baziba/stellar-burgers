import { selectors } from 'cypress/support/selectors';

describe('Тестирование конструктора бургеров', () => {
  beforeEach(() => {
    /* Мок списка ингредиентов */
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
  });

  describe('Выбор ингредиентов', () => {
    it('Выбор булочки', () => {
      cy.get(selectors.buns)
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.get(selectors.constructorTopBun).should(
        'contain',
        'Краторная булка N-200i (верх)'
      );
      cy.get(selectors.constructorBottomBun).should(
        'contain',
        'Краторная булка N-200i (низ)'
      );
    });

    it('Выбор котлеточки', () => {
      cy.get(selectors.mains)
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.get(selectors.constructorBetweenBuns).should(
        'contain',
        'Биокотлета из Марсианской впадины'
      );
    });

    it('Выбор соуса', () => {
      cy.get(selectors.sauces)
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.get(selectors.constructorBetweenBuns).should(
        'contain',
        'Соус Spicy-X'
      );
    });
  });

  describe('Модальные окна', () => {
    it('Показываем ингредиент', () => {
      cy.get(selectors.buns).last().click();
      cy.get(selectors.modal).should('be.visible');

      /* Проверяем, что показывается нажатая булка */
      cy.get(selectors.ingredientDetails).should(
        'contain',
        'Флюоресцентная булка R2-D3'
      );
      cy.get(selectors.ingredientDetails).should('be.visible');
    });

    it('Закрываем крестиком', () => {
      cy.get(selectors.mains).first().click();
      cy.get(selectors.modal).should('be.visible');

      cy.get(selectors.modalCloseButton).click();
      cy.get(selectors.modal).should('not.exist');
    });

    it('Закрываем кликом на оверлей', () => {
      cy.get(selectors.sauces).first().click();
      cy.get(selectors.modal).should('be.visible');

      cy.get(selectors.modalOverlay).click({ force: true });
      cy.get(selectors.modal).should('not.exist');
    });

    it('Закрываем нажатием на ESC', () => {
      cy.get(selectors.buns).last().click();
      cy.get(selectors.modal).should('be.visible');

      cy.get('body').type('{esc}');
      cy.get(selectors.modal).should('not.exist');
    });
  });

  describe('Заказ', () => {
    beforeEach(() => {
      /* Мок данных пользователя */
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as(
        'checkUserAuthentication'
      );

      /* Мок заказа */
      cy.intercept('POST', '**/api/orders', { fixture: 'order' }).as(
        'createOrder'
      );

      window.localStorage.setItem('refreshToken', 'mock-refresh-token');
      cy.setCookie('accessToken', 'mock-access-token');

      cy.visit('http://localhost:4000');
    });

    afterEach(() => {
      window.localStorage.removeItem('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('Создание нового', () => {
      cy.get(selectors.buns)
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.get(selectors.mains)
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.get(selectors.sauces)
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      /* Инициируем создание заказа */
      cy.get(selectors.placeOrderButton).click();

      /* Проверяем номер заказа */
      cy.get(selectors.orderDetails).should('be.visible');
      cy.get(selectors.orderDetails).should('contain', '87612');

      /* Проверяем очистку формы */
      cy.get(selectors.constructorTopBun).should('contain', 'Выберите булки');
      cy.get(selectors.constructorBottomBun).should(
        'contain',
        'Выберите булки'
      );
      cy.get(selectors.constructorBetweenBuns).should(
        'contain',
        'Выберите начинку'
      );
пшке
      /* Закрываем модалку с заказом */
      cy.get(selectors.modalCloseButton).click();
      cy.get(selectors.orderDetails).should('not.exist');
    });
  });
});
