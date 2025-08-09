import PropTypes from 'prop-types';

const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  // Define size variants
  const sizeVariants = {
    small: { width: '1.5rem', borderWidth: '2px' },
    medium: { width: '2.5rem', borderWidth: '3px' },
    large: { width: '4rem', borderWidth: '4px' }
  };

  const spinnerStyle = {
    width: sizeVariants[size]?.width || sizeVariants.medium.width,
    height: sizeVariants[size]?.width || sizeVariants.medium.width,
    borderWidth: sizeVariants[size]?.borderWidth || sizeVariants.medium.borderWidth,
  };

  return (
    <div 
      className="loading-container" 
      data-testid="loading"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div 
        className="loading-spinner" 
        style={spinnerStyle}
        aria-hidden="true"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {message && (
        <p className="loading-message">
          {message}
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      )}
    </div>
  );
};

Loading.propTypes = {
  /**
   * The message to display below the loading spinner
   */
  message: PropTypes.string,
  /**
   * The size of the loading spinner
   */
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

// Add default props for better documentation
Loading.defaultProps = {
  message: 'Loading',
  size: 'medium'
};

export default Loading;
