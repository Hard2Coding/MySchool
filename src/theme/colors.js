// MySchool theme — minimal red & yellow palette
export const colors = {
  // Brand
  primary: '#E1352F', // red
  primaryDark: '#B01F1A',
  primarySoft: '#FDE9E8',

  secondary: '#FFC421', // yellow
  secondaryDark: '#E6A800',
  secondarySoft: '#FFF6DD',

  // Neutrals
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  border: '#EEEEEE',
  text: '#241F1E',
  textMuted: '#8A8280',
  textFaint: '#B7B0AE',

  // Status
  success: '#2E9E5B',
  successSoft: '#E7F6ED',
  danger: '#E1352F',
  dangerSoft: '#FDE9E8',
  warning: '#E6A800',
  warningSoft: '#FFF6DD',
  info: '#3B7DDB',
  infoSoft: '#EAF1FC',

  white: '#FFFFFF',
  black: '#000000',
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const shadow = {
  card: {
    shadowColor: '#B01F1A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
};

export default colors;
