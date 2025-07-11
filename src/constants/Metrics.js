import { scale, verticalScale, moderateScale, horizontalScale } from 'react-native-size-matters';

export const Metrics = {
  marginXS: scale(2),
  marginS: scale(8),
  marginM: scale(16),
  marginL: scale(24),
  marginXL: scale(32),
  marginXXL: scale(40),
  marginTotal: scale(80),

  fontXS: moderateScale(12),
  fontS: moderateScale(16),
  fontM: moderateScale(18),
  fontL: moderateScale(24),
  fontLL: moderateScale(30),
  fontXL: moderateScale(38),
  fontXXL: moderateScale(50),

  radiusS: scale(15),
  radiusM: scale(30),
  radiusL: scale(50),

  iconXSmall: scale(20),
  iconSmall: scale(24),
  iconMedium: scale(30),
  iconLarge: scale(36),
  iconXLarge: scale(48),
  iconXXLarge: scale(60),
  iconXXXLarge: scale(80),

  buttonHeight: verticalScale(48),

  safeArea: verticalScale(10),
  searchBarArea: verticalScale(40),
  navBarArea: verticalScale(60),
  topSpace: verticalScale(70),
  publicityArea: verticalScale(80),
  editPublicity: verticalScale(150),
  publicityHome: verticalScale(200),

  screenXS: verticalScale(300),
  screenSM: verticalScale(350),
  screenS: verticalScale(400),
  screenMM: verticalScale(450),
  screenM: verticalScale(500),
  screenML: verticalScale(550),
  screenL: verticalScale(600),

  animationS: scale(24),
  animationL: verticalScale(120),
  animationXL: scale(288),
  animationXXL: scale(350),
  animationXXXL: scale(370)
};
