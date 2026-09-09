// Font families — loaded via useFonts() in App.js from @expo-google-fonts/kanit
export const fonts = {
  regular: 'Kanit_400Regular',
  medium: 'Kanit_500Medium',
  semiBold: 'Kanit_600SemiBold',
  bold: 'Kanit_700Bold',
};

export const type = {
  h1: { fontFamily: fonts.bold, fontSize: 26 },
  h2: { fontFamily: fonts.semiBold, fontSize: 20 },
  h3: { fontFamily: fonts.semiBold, fontSize: 17 },
  body: { fontFamily: fonts.regular, fontSize: 14.5 },
  bodyMedium: { fontFamily: fonts.medium, fontSize: 14.5 },
  caption: { fontFamily: fonts.regular, fontSize: 12.5 },
  captionMedium: { fontFamily: fonts.medium, fontSize: 12.5 },
  button: { fontFamily: fonts.semiBold, fontSize: 15 },
};

export default type;
