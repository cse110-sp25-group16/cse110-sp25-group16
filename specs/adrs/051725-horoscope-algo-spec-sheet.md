# Tarot App Specifications - Horoscopes

## Information We Need to Store

### User Profile Data:

- **Name**
- **Birth Date**
- **Birth Time**
- **Birth Place**
- **Zodiac Sign**
- **Personality Type (MBTI)**
- **Preferences** (Optional):
  - History of astrological readings

### Zodiac Details:

- **Name**
- **Date Range**
- **Element**
- **Personality Traits**
- **Compatibility**

### Readings:
- **Daily/Weekly/Monthly Horoscope Texts**
- **OPTIONAL: Solar Eclipse/Planetary Event special case**

---
### Reading Information:
- Based on sun sign
- Pull pre-written horoscope text for sign/date

### User Input vs. App-Data
- User Input: Birth Date, Birth Time
- App-Data: Current Date, Zodiac, Horoscope Content, Planetary Data, Reading History
---

#### Imagery and Visual Data:
- Text: Zodiac Sign, Date, Reading

#### Metadata:
- **id**: Unique identifier for each reading based on zodiac
- **description**: Unique reading for each zodiac sign

---

## How We Will Generate Readings:

### Algorithmic Horoscope Reading Generation:

- First, collect birth date and assign user to a Zodiac sign: can be done using a simple function with date ranges.
- Next, create a table with readings for each sign for each day of the year, associated to each horoscope. Table can be database(ex.SQL) with three columns (date, sign, reading).
- Every day, fetch the reading for that date and for that user's sign. 

---

## Persona-Based Access Preferences:

### Vibes Valerie:

- Easy, daily horoscope access.
- No deep analysis required, simple reading based on sign

### Partner Paul:

- No deep analysis required, simple reading based on sign
- One-click sharing with his partner, minimal depth.
- May enjoy compatability readings with other signs

### Mindful Mark:

- More complex horoscope reading, most likely based on elemental sign and/or astrological events
- Journaling space for reflections on horoscope readings

### Social Sarah:

- Sharing options for group chats and text.
- Compare & contrast readings with mutual users.
- 

### Analytical Anna:

- Historical data storage of daily readings
- Export options for further off-app analysis.
