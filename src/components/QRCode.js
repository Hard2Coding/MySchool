import React, { useMemo } from 'react';
import { View } from 'react-native';
import qrcode from 'qrcode-generator';

/**
 * Renders a real, scannable QR code using plain <View> squares —
 * no react-native-svg or native module needed, so it's guaranteed to
 * work in Expo Go. `value` is whatever text should be encoded
 * (e.g. the student ID).
 */
export default function QRCode({ value, size = 140, fg = '#000000', bg = '#FFFFFF' }) {
  const modules = useMemo(() => {
    const qr = qrcode(0, 'M'); // type 0 = auto-detect smallest version, M = ~15% error correction
    qr.addData(String(value));
    qr.make();
    const count = qr.getModuleCount();
    const cells = [];
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (qr.isDark(row, col)) cells.push(row * count + col);
      }
    }
    return { count, dark: new Set(cells) };
  }, [value]);

  const cellSize = size / modules.count;

  return (
    <View style={{ width: size, height: size, backgroundColor: bg }}>
      {Array.from({ length: modules.count }).map((_, row) => (
        <View key={row} style={{ flexDirection: 'row' }}>
          {Array.from({ length: modules.count }).map((__, col) => {
            const isDark = modules.dark.has(row * modules.count + col);
            return (
              <View
                key={col}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: isDark ? fg : bg,
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}
