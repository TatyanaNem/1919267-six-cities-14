import {render, screen} from '@testing-library/react';
import Logo from './logo';
import { withHistory } from '../../utils/mock-components/with-history';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedAltText = '6 cities logo';

    render(withHistory(<Logo />));

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
