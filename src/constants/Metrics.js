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

  buttonHeight: verticalScale(48),

  safeArea: verticalScale(10),
  searchBarArea: verticalScale(40),
  navBarArea: verticalScale(60),
  publicityArea: verticalScale(80),
  publicityHome: verticalScale(200),

  screenXS: verticalScale(300),
  screenS: verticalScale(400),
  screenM: verticalScale(500),
  screenL: verticalScale(600),
};
