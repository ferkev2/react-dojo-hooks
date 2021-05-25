import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

test('renders learn react link', async () => {
    render(<Home />);
    const homepage = screen.getByTestId("homepage");
    const list = screen.getByTestId('comment-list');
    await waitFor(() => screen.getAllByTestId('comment'));
    expect(homepage).toBeDefined();
    expect(list).toBeDefined();
});
