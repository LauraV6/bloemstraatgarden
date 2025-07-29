import { formatDate, formatDateTimeAttribute, formatDateShort } from '@/utils/dateFormatter';

// Mock console methods to avoid noise in test output
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('dateFormatter utils', () => {
  describe('formatDate', () => {
    it('should format date correctly for Dutch locale', () => {
      const result = formatDate('2024-03-15');
      expect(result).toBe('15 maart 2024');
    });

    it('should handle invalid date gracefully', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('invalid-date');
    });

    it('should format date with time correctly', () => {
      const result = formatDate('2024-03-15T10:30:00Z');
      expect(result).toBe('15 maart 2024');
    });

    it('should handle empty string', () => {
      const result = formatDate('');
      expect(result).toBe('');
    });
  });

  describe('formatDateTimeAttribute', () => {
    it('should format datetime correctly', () => {
      const result = formatDateTimeAttribute('2024-03-15T10:30:00');
      expect(result).toBe('2024-03-15');
    });

    it('should handle date without time', () => {
      const result = formatDateTimeAttribute('2024-03-15');
      expect(result).toBe('2024-03-15');
    });

    it('should handle invalid date gracefully', () => {
      const result = formatDateTimeAttribute('invalid-date');
      expect(result).toBe('invalid-date');
    });

    it('should handle empty string', () => {
      const result = formatDateTimeAttribute('');
      expect(result).toBe('');
    });
  });

  describe('formatDateShort', () => {
    it('should format date in short format', () => {
      const result = formatDateShort('2024-03-15');
      expect(result).toBe('15 mrt 2024');
    });

    it('should handle invalid date gracefully', () => {
      const result = formatDateShort('invalid-date');
      expect(result).toBe('invalid-date');
    });

    it('should format date with time correctly', () => {
      const result = formatDateShort('2024-03-15T10:30:00Z');
      expect(result).toBe('15 mrt 2024');
    });

    it('should handle empty string', () => {
      const result = formatDateShort('');
      expect(result).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should handle dates at year boundaries', () => {
      expect(formatDate('2023-12-31')).toBe('31 december 2023');
      expect(formatDate('2024-01-01')).toBe('1 januari 2024');
    });

    it('should handle leap year dates', () => {
      expect(formatDate('2024-02-29')).toBe('29 februari 2024');
    });

    it('should handle very old dates', () => {
      const result = formatDate('1900-01-01');
      expect(result).toBe('1 januari 1900');
    });

    it('should handle future dates', () => {
      const result = formatDate('2050-12-25');
      expect(result).toBe('25 december 2050');
    });

    it('should format months correctly in Dutch', () => {
      expect(formatDateShort('2024-01-15')).toBe('15 jan 2024');
      expect(formatDateShort('2024-02-15')).toBe('15 feb 2024');
      expect(formatDateShort('2024-03-15')).toBe('15 mrt 2024');
      expect(formatDateShort('2024-04-15')).toBe('15 apr 2024');
      expect(formatDateShort('2024-05-15')).toBe('15 mei 2024');
      expect(formatDateShort('2024-06-15')).toBe('15 jun 2024');
      expect(formatDateShort('2024-07-15')).toBe('15 jul 2024');
      expect(formatDateShort('2024-08-15')).toBe('15 aug 2024');
      expect(formatDateShort('2024-09-15')).toBe('15 sep 2024');
      expect(formatDateShort('2024-10-15')).toBe('15 okt 2024');
      expect(formatDateShort('2024-11-15')).toBe('15 nov 2024');
      expect(formatDateShort('2024-12-15')).toBe('15 dec 2024');
    });
  });
});