import React from 'react';
import { App } from '../containers/App';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('Application Container', () => {
  it('renders to the dom', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('checkboxes (and radios) must use click', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange} />,
    );
    const checkbox = container.firstChild as HTMLInputElement;
    // for checkboxes, the event that's fired is the click event,
    // and that causes the change event handler to be called.
    // learn more: https://github.com/kentcdodds/react-testing-library/issues/156
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox.checked).toBe(true);
  });
});
