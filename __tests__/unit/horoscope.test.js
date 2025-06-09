/**
 * @jest-environment jsdom
 */

import Horoscope from '../../source/backend/horoscope.js';

describe('Horoscope module', () => {
  describe('getDate', () => {
    it('parses MM/DD/YYYY format into a Date object', () => {
      const result = Horoscope.getDate('10/25/1999');
      expect(result instanceof Date).toBe(true);
      expect(result.getMonth()).toBe(9); // October is 9
      expect(result.getDate()).toBe(25);
    });

    it('returns Invalid Date for bad input', () => {
      const result = Horoscope.getDate('hello');
      expect(isNaN(result.getTime())).toBe(true);
    });

    it('returns Invalid Date for another bad format', () => {
      const result = Horoscope.getDate('1999-10-25');
      expect(isNaN(result.getTime())).toBe(true);
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

    it('returns Aquarius for Feb 10', () => {
      expect(Horoscope.getHoroscope({ month: 2, day: 10 })).toBe('Aquarius');
    });
  });

  describe('generateReadingFromCurrentUser', () => {
    beforeEach(() => {
      localStorage.setItem('tarotUserInfo', JSON.stringify({ dob: '10/25/1999' }));
    });

    it('returns 3 strings: theme, mood, and advice', () => {
      const result = Horoscope.generateReadingFromCurrentUser();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(3);
      result.forEach((s) => expect(typeof s).toBe('string'));
    });

    it('returns fallback values if dob is missing', () => {
      localStorage.setItem('tarotUserInfo', JSON.stringify({}));
      const result = Horoscope.generateReadingFromCurrentUser();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);
      result.forEach((s) => expect(typeof s).toBe('string'));
    });
  });
});
