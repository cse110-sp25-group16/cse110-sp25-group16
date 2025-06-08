import Horoscope from '../../source/backend/horoscope.js';

describe('Horoscope', () => {
  describe('getDate()', () => {
    it('correctly parses "31/10/2004" into a Date object', () => {
      const date = Horoscope.getDate('31/10/2004');
      expect(date.getFullYear()).toBe(2004);
      expect(date.getMonth()).toBe(9);
      expect(date.getDate()).toBe(31);
    });

    it('correctly parses "15-06-1999"', () => {
      const date = Horoscope.getDate('15-06-1999');
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(5);
      expect(date.getDate()).toBe(15);
    });
  });

  describe('getHoroscope()', () => {
    it('returns "Scorpio" for 31 Oct 2004', () => {
      const date = new Date(2004, 9, 31);
      expect(Horoscope.getHoroscope(date)).toBe('Scorpio');
    });

    it('returns "Cancer" for 21 Jun 2001', () => {
      const date = new Date(2001, 5, 21);
      expect(Horoscope.getHoroscope(date)).toBe('Cancer');
    });

    it('returns "Aries" for 1 Apr 2020', () => {
      const date = new Date(2020, 3, 1);
      expect(Horoscope.getHoroscope(date)).toBe('Aries');
    });
  });

  describe('generateReading()', () => {
    it('returns the same result for same input (deterministic)', () => {
      const date = new Date(2024, 5, 7);
      const reading1 = Horoscope.generateReading('Gemini', date);
      const reading2 = Horoscope.generateReading('Gemini', date);
      expect(reading1).toEqual(reading2);
    });

    it('returns different result for different dates', () => {
      const date1 = new Date(2024, 5, 7);
      const date2 = new Date(2024, 5, 8);
      const reading1 = Horoscope.generateReading('Gemini', date1);
      const reading2 = Horoscope.generateReading('Gemini', date2);
      expect(reading1).not.toEqual(reading2);
    });
  });
});
