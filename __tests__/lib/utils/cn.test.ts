import { cn } from '@/lib/utils/cn';

describe('cn utility', () => {
  it('combines class names', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const result = cn('base', false && 'conditional', 'active');
    expect(result).toBe('base active');
  });

  it('handles undefined values', () => {
    const result = cn('base', undefined, 'active');
    expect(result).toBe('base active');
  });

  it('handles empty strings', () => {
    const result = cn('base', '', 'active');
    expect(result).toBe('base active');
  });

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles objects with boolean values', () => {
    const result = cn('base', {
      active: true,
      disabled: false,
      highlighted: true
    });
    expect(result).toBe('base active highlighted');
  });

  it('removes duplicate classes', () => {
    const result = cn('base active', 'active base');
    expect(result).toBe('base active');
  });

  it('handles no arguments', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles null values', () => {
    const result = cn('base', null, 'active');
    expect(result).toBe('base active');
  });

  it('merges Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    // Should override px-2 with px-4
    expect(result).toContain('px-4');
    expect(result).toContain('py-1');
  });
});