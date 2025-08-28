// utils/DateFormatter.ts

/**
 * Formats a date string consistently across server and client
 * This prevents hydration errors by ensuring consistent output
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateString}`);
      return dateString; // Return original string as fallback
    }
    
    // Use Intl.DateTimeFormat for consistent formatting
    return new Intl.DateTimeFormat('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Amsterdam'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string as fallback
  }
};

/**
 * Formats a date string for datetime attribute
 */
export const formatDateTimeAttribute = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  } catch (error) {
    console.error('Error formatting datetime attribute:', error);
    return dateString;
  }
};

/**
 * Alternative format for shorter date display
 */
export const formatDateShort = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    return new Intl.DateTimeFormat('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Europe/Amsterdam'
    }).format(date);
  } catch (error) {
    console.error('Error formatting short date:', error);
    return dateString;
  }
};