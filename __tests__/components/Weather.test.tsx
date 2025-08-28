import React from 'react';
import { render, screen } from '@testing-library/react';
import Weather from '@/components/features/weather/Weather';
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons';

// Mock FontAwesomeIcon to avoid rendering complexity
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: { icon: { iconName?: string } }) => {
    const iconName = icon.iconName || 'default-icon';
    return <span data-testid={`icon-${iconName}`}>{iconName}</span>;
  }
}));

describe('Weather Component', () => {
  it('should not render when no weatherType is provided', () => {
    const { container } = render(<Weather weatherType="" />);
    expect(container.firstChild).toBeNull();
  });

  it('should render with sun icon for "veel zon" weather type', () => {
    render(<Weather weatherType="veel zon" />);
    
    // Check if the weather text is displayed
    expect(screen.getByText('veel zon')).toBeInTheDocument();
    
    // Check if sun icon is rendered
    expect(screen.getByTestId('icon-sun')).toBeInTheDocument();
  });

  it('should render with cloud-sun icon for "halfschaduw" weather type', () => {
    render(<Weather weatherType="halfschaduw" />);
    
    expect(screen.getByText('halfschaduw')).toBeInTheDocument();
    expect(screen.getByTestId('icon-cloud-sun')).toBeInTheDocument();
  });

  it('should render with cloud icon for "schaduw" weather type', () => {
    render(<Weather weatherType="schaduw" />);
    
    expect(screen.getByText('schaduw')).toBeInTheDocument();
    expect(screen.getByTestId('icon-cloud')).toBeInTheDocument();
  });

  it('should render with sun icon as default for unknown weather type', () => {
    render(<Weather weatherType="unknown weather" />);
    
    expect(screen.getByText('unknown weather')).toBeInTheDocument();
    expect(screen.getByTestId('icon-sun')).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { container } = render(
      <Weather weatherType="veel zon" className="custom-class" />
    );
    
    const weatherDiv = container.firstChild as HTMLElement;
    expect(weatherDiv).toHaveClass('custom-class');
  });

  it('should render the correct structure', () => {
    const { container } = render(<Weather weatherType="veel zon" />);
    
    // Check if the main container exists
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toBeInTheDocument();
    
    // Check if the inner div with icon and text exists
    const innerDiv = mainDiv?.querySelector('div');
    expect(innerDiv).toBeInTheDocument();
    
    // Check if both icon and text are present
    const icon = innerDiv?.querySelector('[data-testid^="icon-"]');
    const text = innerDiv?.querySelector('span:last-child');
    
    expect(icon).toBeInTheDocument();
    expect(text).toHaveTextContent('veel zon');
  });
});