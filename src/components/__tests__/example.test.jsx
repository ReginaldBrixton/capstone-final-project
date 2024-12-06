'use client';

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// This is just an example test suite
describe('Example Test Suite', () => {
  it('should render without crashing', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('demonstrates how to test user interactions', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<button onClick={handleClick}>Click me</button>);
    
    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows how to test async operations', async () => {
    const mockData = { message: 'Success' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    // Example async component test
    const AsyncComponent = () => {
      const [data, setData] = React.useState(null);
      React.useEffect(() => {
        fetch('/api/data')
          .then(res => res.json())
          .then(setData);
      }, []);

      return data ? <div>{data.message}</div> : <div>Loading...</div>;
    };

    render(<AsyncComponent />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Success')).toBeInTheDocument();
  });
}); 