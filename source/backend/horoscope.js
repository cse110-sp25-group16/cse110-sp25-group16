class Horoscope {
  static getDate(birthday) {
    const parts = birthday.split(/-|\//);

    const formatParts = ['dd', 'mm', 'yyyy'];

    // 31/10/2004 -> [31, 10, 2004]

    const dateObj = {};
    for (let i = 0; i < parts.length; i++) {
      dateObj[formatParts[i]] = parseInt(parts[i]);
    }

    return new Date(dateObj.yyyy, dateObj.mm - 1, dateObj.dd);
  }

  static getHoroscope(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() is 0-based
    switch (month) {
      case 1:
        return day < 20 ? 'Capricorn' : 'Aquarius';
      case 2:
        return day < 19 ? 'Aquarius' : 'Pisces';
      case 3:
        return day < 21 ? 'Pisces' : 'Aries';
      case 4:
        return day < 20 ? 'Aries' : 'Taurus';
      case 5:
        return day < 21 ? 'Taurus' : 'Gemini';
      case 6:
        return day < 21 ? 'Gemini' : 'Cancer';
      case 7:
        return day < 23 ? 'Cancer' : 'Leo';
      case 8:
        return day < 23 ? 'Leo' : 'Virgo';
      case 9:
        return day < 23 ? 'Virgo' : 'Libra';
      case 10:
        return day < 23 ? 'Libra' : 'Scorpio';
      case 11:
        return day < 22 ? 'Scorpio' : 'Sagittarius';
      case 12:
        return day < 22 ? 'Sagittarius' : 'Capricorn';
      default:
        return null;
    }
  }

  /**
   * Returns a hash code from a string
   * @param  {String} str The string to hash.
   * @return {Number}    A 32bit integer
   * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   */
  static hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  static generateReadingFromCurrentUser() {
    const userInfo = JSON.parse(localStorage.getItem('tarotUserInfo'));
    const dob = userInfo['dob'];
    const horoscope = Horoscope.getHoroscope(Horoscope.getDate(dob));

    const currentDate = new Date();

    return Horoscope.generateReading(horoscope, currentDate);
  }

  static generateReading(horoscope, date) {
    const dateString = date.toDateString();
    const fullText = horoscope + dateString;

    const hashValue = Math.abs(Horoscope.hashCode(fullText));
    console.log(hashValue);
    const readingOutput = [];

    readingOutput.push(Horoscope.themes[hashValue % Horoscope.themes.length]);
    readingOutput.push(Horoscope.moods[hashValue % Horoscope.moods.length]);
    readingOutput.push(Horoscope.advice[hashValue % Horoscope.advice.length]);

    return readingOutput;
  }

  static themes = [
    'love',
    'career',
    'health',
    'finances',
    'self-reflection',
    'growth',
    'relationships',
    'communication',
    'creativity',
    'spirituality',
    'adventure',
    'balance',
  ];

  static moods = [
    'optimistic',
    'pessimistic',
    'neutral',
    'excited',
    'anxious',
    'calm',
    'curious',
    'hopeful',
    'reflective',
    'content',
    'inspired',
    'determined',
    'adventurous',
    'thoughtful',
    'passionate',
  ];

  static advice = [
    'trust your instincts',
    'be open to change',
    'focus on self-care',
    'embrace new opportunities',
    'nurture relationships',
    'stay grounded',
    'seek balance',
    'pursue your passions',
    'take risks',
    'practice gratitude',
    'cultivate patience',
    'find joy in the little things',
    'explore new horizons',
    'reflect on your journey',
    'reach out to someone you have been thinking about',
    'take a moment to breathe and relax',
    'set clear intentions for the future',
    'embrace the present moment',
    'let go of past regrets',
    'trust the process of life',
    'find beauty in simplicity',
    'connect with nature',
    'listen to your inner voice',
  ];
}

export default Horoscope;
