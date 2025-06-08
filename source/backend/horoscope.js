/**
 * A collection of static helpers for computing zodiac signs and readings.
 */
class Horoscope {
  /**
   * Parse a user‐entered date string into a Date object.
   * @param {string} birthday  A date in “DD/MM/YYYY” or “DD-MM-YYYY” format.
   * @returns {Date}           A JavaScript Date representing that day.
   */
  static getDate(birthday) {
    const parts = birthday.split(/-|\//);

    const formatParts = ["dd", "mm", "yyyy"];

    // 31/10/2004 -> [31, 10, 2004]

    const dateObj = {};
    for (let i = 0; i < parts.length; i++) {
      dateObj[formatParts[i]] = parseInt(parts[i]);
    }

    return new Date(dateObj.yyyy, dateObj.mm - 1, dateObj.dd);
  }

  /**
   * Determine the Western zodiac sign for a given Date.
   * @param {Date} date  A JavaScript Date.
   * @returns {string|null}  The sign name (e.g. “Aries”), or null if invalid.
   */
  static getHoroscope(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() is 0-based
    switch (month) {
      case 1:
        return day < 20 ? "Capricorn" : "Aquarius";
      case 2:
        return day < 19 ? "Aquarius" : "Pisces";
      case 3:
        return day < 21 ? "Pisces" : "Aries";
      case 4:
        return day < 20 ? "Aries" : "Taurus";
      case 5:
        return day < 21 ? "Taurus" : "Gemini";
      case 6:
        return day < 21 ? "Gemini" : "Cancer";
      case 7:
        return day < 23 ? "Cancer" : "Leo";
      case 8:
        return day < 23 ? "Leo" : "Virgo";
      case 9:
        return day < 23 ? "Virgo" : "Libra";
      case 10:
        return day < 23 ? "Libra" : "Scorpio";
      case 11:
        return day < 22 ? "Scorpio" : "Sagittarius";
      case 12:
        return day < 22 ? "Sagittarius" : "Capricorn";
      default:
        return null;
    }
  }

  /**
   * Returns a 32-bit hash code for a given string
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

  /**
   * Look up the current user’s DOB in localStorage and generate today’s reading.
   * @returns {Array<string>}  [theme, mood, advice] for today’s date/sign.
   */
  static generateReadingFromCurrentUser() {
    const userInfo = JSON.parse(localStorage.getItem("tarotUserInfo"));
    const dob = userInfo["dob"];
    const horoscope = Horoscope.getHoroscope(Horoscope.getDate(dob));

    const currentDate = new Date();

    return Horoscope.generateReading(horoscope, currentDate);
  }

  /**
   * Given a sign and a date, pick a “theme”, “mood”, and “advice” from static lists.
   * @param {string} horoscope  The zodiac sign name.
   * @param {Date} date         The date to base the reading on.
   * @returns {Array<string>}   [chosenTheme, chosenMood, chosenAdvice].
   */
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

  /**
   *
   * @returns {Array<string>} [expandedMood, expandedTheme]
   */
  static expandedReadingFromCurrentUser() {
    const userInfo = JSON.parse(localStorage.getItem("tarotUserInfo"));
    const dob = userInfo["dob"];
    const horoscope = Horoscope.getHoroscope(Horoscope.getDate(dob));

    const currentDate = new Date();

    return Horoscope.expandedReading(horoscope, currentDate);
  }

  /**
   * Given a sign and a date, provide an expanded theme & expanded mood from static lists.
   * @param {string} horoscope  The zodiac sign name.
   * @param {Date} date         The date to base the reading on.
   * @returns {Array<string>}   [expandedTheme, expandedMood].
   */
  static expandedReading(horoscope, date) {
    const dateString = date.toDateString();
    const fullText = horoscope + dateString;

    const hashValue = Math.abs(Horoscope.hashCode(fullText));
    console.log(hashValue);
    const readingOutput = [];

    readingOutput.push(
      Horoscope.themes_expand[hashValue % Horoscope.themes.length],
    );
    readingOutput.push(
      Horoscope.moods_expand[hashValue % Horoscope.moods.length],
    );
    readingOutput.push(
      Horoscope.advice_expand[hashValue % Horoscope.moods.length],
    );

    return readingOutput;
  }

  /** List of possible reading themes. */
  static themes = [
    "love",
    "career",
    "health",
    "finances",
    "self-reflection",
    "growth",
    "relationships",
    "communication",
    "creativity",
    "spirituality",
    "adventure",
    "balance",
  ];

  /** List of possible expanded themes. */
  static themes_expand = [
    "When the veils part, the heart remembers what time has hidden.",
    "Cast your craft upon the wheel of fate, and let destiny temper its edge.",
    "The vessel thrives when moon and marrow are in accord.",
    "Gold answers not to grasping hands, but to those who heed the silence beneath the coin.",
    "Peer into the mirror between worlds, and name the shadow by its true name.",
    "What lies dormant beneath stone shall bloom when stars decree it so.",
    "Entwine not the threads too tightly, lest they fray in unseen places.",
    "Words, once loosed, become spells—speak with the weight of knowing.",
    "Summon the unseen with ink and breath, and let the unknown reply.",
    "Wander the liminal—where breath meets ether, revelation awaits.",
    "Tread where maps end; the wyrm of wonder coils beyond the edge.",
    "In the stillpoint between flame and frost, the soul finds its sigil.",
  ];

  /** List of possible reading moods. */
  static moods = [
    "optimistic",
    "pessimistic",
    "neutral",
    "excited",
    "anxious",
    "calm",
    "curious",
    "hopeful",
    "reflective",
    "content",
    "inspired",
    "determined",
    "adventurous",
    "thoughtful",
    "passionate",
  ];

  /** List of possible expanded moods. */
  static moods_expand = [
    "The dawn does not question the dark—it rises, inevitable and golden.",
    "Even the shadow bears witness to light once known.",
    "The scales rest between fates, awaiting the tremor of choice.",
    "When lightning dances on the horizon, the soul prepares to leap.",
    "The winds howl loudest before the veil lifts—stand firm in the storm.",
    "Still waters are mirrors for truths too ancient to name.",
    "The key seeks not the door, but the hand bold enough to turn it.",
    "The seed dreams of sky long before its roots touch earth.",
    "Within the well of echoes, old voices shape the present spell.",
    "In the hush between longing and having, eternity breathes.",
    "The muse stirs in smoke and shadow—follow where the flame bends.",
    "Steel does not ask if it will strike true; it is the will made manifest.",
    "The path coils like a serpent—those who walk it awaken the unknown.",
    "One must listen to the silence between thoughts, for it speaks in runes.",
    "Let the fire within consume not what you hold, but what holds you.",
  ];

  /** List of possible advice snippets. */
  static advice = [
    "trust your instincts",
    "be open to change",
    "focus on self-care",
    "embrace new opportunities",
    "nurture relationships",
    "stay grounded",
    "seek balance",
    "pursue your passions",
    "take risks",
    "practice gratitude",
    "cultivate patience",
    "find joy in little things",
    "explore new horizons",
    "reflect on your journey",
    "reach out",
    "breathe and relax",
    "set clear intentions",
    "embrace the present",
    "let go of regrets",
    "trust the process of life",
    "find beauty in simplicity",
    "connect with nature",
    "listen to your inner voice",
  ];

  static advice_expand = [
    "That quiet feeling inside you often knows before you do.",
    "Change may feel like loss at first, but it often holds a gift.",
    "You deserve the same kindness you give to others—start with yourself.",
    "Say yes, even if your voice shakes—you can always find your footing later.",
    "Love grows in the small things—show up, check in, and be present.",
    "When the world spins fast, return to what makes you feel steady and whole.",
    "You don’t have to do it all—just enough to feel like yourself again.",
    "What sets your heart alight is worth chasing, even if no one understands.",
    "Some leaps won’t land perfectly, but they’ll still carry you forward.",
    "There’s always something soft to hold onto, even on the hard days.",
    "Not everything blooms when you want it to—trust that it’s growing anyway.",
    "Joy doesn’t always shout—sometimes it whispers in quiet moments.",
    "There is more out there than you’ve seen, and more in you than you’ve known.",
    "Look back not with regret, but with respect for how far you’ve come.",
    "You don’t have to carry everything alone—someone is waiting to listen.",
    "Let your shoulders drop. Let your breath remind you—you are here.",
    "Be honest about what you want. It’s okay to ask more of life.",
    "You don’t have to have it all figured out—just be here, now.",
    "You did the best you could with what you knew—give yourself peace.",
    "Even when the path isn’t clear, life is still moving you forward.",
    "You don’t need more to feel full—sometimes less lets you breathe.",
    "Step outside. Let the sky remind you how vast and calm it all can be.",
  ];
}

export default Horoscope;
