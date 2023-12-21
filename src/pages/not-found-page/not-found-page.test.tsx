import {render, screen} from '@testing-library/react';
import { withHistory } from '../../utils/mock-components/with-history';
import NotFoundPage from './not-found-page';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedHeaderText = '404. Page not found';
    const expectedLinkText = 'Вернуться на главную';

    render(withHistory(<NotFoundPage />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
