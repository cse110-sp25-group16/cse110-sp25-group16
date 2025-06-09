/**
 * @jest-environment jsdom
 */

import Horoscope from '../../source/backend/horoscope.js';

describe('Horoscope module', () => {
  describe('getDate', () => {
    it('parses MM/DD/YYYY format into {month, day}', () => {
      const result = Horoscope.getDate('10/25/1999');
      expect(result).toEqual({ month: 10, day: 25 });
    });

    it('throws on invalid date format', () => {
      expect(() => Horoscope.getDate('1999-10-25')).toThrow();
      expect(() => Horoscope.getDate('hello')).toThrow();
    });
  });

  describe('getHoroscope', () => {
    it('returns correct sign for known dates', () => {
      expect(Horoscope.getHoroscope({ month: 3, day: 21 })).toBe('Aries');
      expect(Horoscope.getHoroscope({ month: 6, day: 15 })).toBe('Gemini');
      expect(Horoscope.getHoroscope({ month: 12, day: 25 })).toBe('Capricorn');
    });

    it('returns Pisces for edge date Feb 20', () => {
      expect(Horoscope.getHoroscope({ month: 2, day: 20 })).toBe('Pisces');
    });
  });

  describe('generateReadingFromCurrentUser', () => {
    it('returns 3 strings: theme, mood, and advice', () => {
      const result = Horoscope.generateReadingFromCurrentUser();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(3);
      result.forEach((s) => expect(typeof s).toBe('string'));
    });
  });
});
