import {render, screen} from '@testing-library/react';
import { withHistory } from '../../utils/mock-components/with-history';
import { withStore } from '../../utils/mock-components/with-store';
import userEvent from '@testing-library/user-event';
import LoginPage from './login-page';
import { AuthorizationStatus, RequestStatus } from '../../const';

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    const emailElementTestId = 'emailElement';
    const passwordElementTestId = 'passwordElement';
    const {withStoreComponent} = withStore(<LoginPage/>, {
      USER_DATA: {
        user: null,
        authorizationStatus: AuthorizationStatus.Unknown,
        loginSendingStatus: RequestStatus.Idle
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(emailElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordElementTestId)).toBeInTheDocument();
  });

  it('shourd render correctly when user enter email and password', async () => {
    const emailElementTestId = 'emailElement';
    const passwordElementTestId = 'passwordElement';
    const expectedEmailValue = 'test@test.com';
    const expectedPasswordValue = '123456a';

    const {withStoreComponent} = withStore(<LoginPage/>, {
      USER_DATA: {
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginSendingStatus: RequestStatus.Idle
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(emailElementTestId),
      expectedEmailValue
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
