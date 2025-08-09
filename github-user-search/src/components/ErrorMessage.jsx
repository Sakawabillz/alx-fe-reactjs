import PropTypes from 'prop-types';

const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;
  
  return (
    <div className="error-state" data-testid="error-message">
      <p>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="retry-button"
          aria-label="Retry search"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
            <path d="M4 12C4 7.58172 7.58172 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func
};

export default ErrorMessage;
