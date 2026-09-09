import React, { useMemo } from 'react';
import { View } from 'react-native';

/**
 * Standard Code 39 barcode generator.
 * Encodes text/numeric IDs (e.g. student ID) into real scannable barcode stripes using pure <View>s.
 */
const CODE39_PATTERNS = {
  '0': 'nnnwwnwnn',
  '1': 'wnnnnwnnw',
  '2': 'nnwnnwnnw',
  '3': 'wnwnnwnnn',
  '4': 'nnnnwwnnw',
  '5': 'wnnnwwnnn',
  '6': 'nnwnwwnnn',
  '7': 'nnnnnwwnw',
  '8': 'wnnnnwwnn',
  '9': 'nnwnnwwnn',
  'A': 'wnnnnnnww',
  'B': 'nnwnnnnww',
  'C': 'wnwnnnnwn',
  'D': 'nnnnwnnww',
  'E': 'wnnnwnnwn',
  'F': 'nnwnwnnwn',
  'G': 'nnnnnnwww',
  'H': 'wnnnnnwwn',
  'I': 'nnwnnnwwn',
  'J': 'nnnnwnwwn',
  'K': 'wnnnnnnnw',
  'L': 'nnwnnnnnw',
  'M': 'wnwnnnnnn',
  'N': 'nnnnwnnnw',
  'O': 'wnnnwnnnn',
  'P': 'nnwnwnnnn',
  'Q': 'nnnnnnwnw',
  'R': 'wnnnnnwnn',
  'S': 'nnwnnnwnn',
  'T': 'nnnnwnwnn',
  'U': 'wwnnnnnnn',
  'V': 'nwwnnnnnn',
  'W': 'wwwnnnnnn',
  'X': 'nwnnwnnnn',
  'Y': 'wwnnwnnnn',
  'Z': 'nwwnwnnnn',
  '-': 'nwnnnnwnw',
  '.': 'wwnnnnwnn',
  ' ': 'nwwnnnwnn',
  '*': 'nwnnwnwnn',
};

export default function Barcode({
  value,
  height = 30,
  barColor = 'rgba(255,255,255,0.9)',
  narrowWidth = 1.2,
  wideRatio = 2.5,
  style,
}) {
  const elements = useMemo(() => {
    const rawVal = String(value || '');
    const cleanVal = rawVal.replace(/[^0-9A-Z\-\. ]/gi, '').toUpperCase();
    const str = `*${cleanVal}*`;
    const result = [];

    for (let charIdx = 0; charIdx < str.length; charIdx++) {
      const char = str[charIdx];
      const pattern = CODE39_PATTERNS[char] || CODE39_PATTERNS['*'];

      for (let i = 0; i < pattern.length; i++) {
        const isBar = i % 2 === 0;
        const isWide = pattern[i] === 'w';
        const width = isWide ? narrowWidth * wideRatio : narrowWidth;
        result.push({ isBar, width });
      }

      if (charIdx < str.length - 1) {
        result.push({ isBar: false, width: narrowWidth });
      }
    }

    return result;
  }, [value, narrowWidth, wideRatio]);

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {elements.map((el, index) => (
        <View
          key={index}
          style={{
            width: el.width,
            height: height,
            backgroundColor: el.isBar ? barColor : 'transparent',
          }}
        />
      ))}
    </View>
  );
}
