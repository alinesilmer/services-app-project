import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import BackButton from '../components/BackButton';

export const Metrics = {
  marginXS: scale(2),
  marginS: scale(8),
  marginM: scale(16),
  marginL: scale(24),
  marginXL: scale(32),
  marginXXL: scale(40),
  marginTotal: scale(90),

  fontXS: moderateScale(12),
  fontS: moderateScale(16),
  fontM: moderateScale(18),
  fontL: moderateScale(24),
  fontXL: moderateScale(38),
  fontXXL: moderateScale(50),

  radiusS: scale(15),
  radiusM: scale(30),
  radiusL: scale(50),

  iconSmall: scale(24),
  iconMedium: scale(30),
  iconLarge: scale(36),

  buttonHeight: verticalScale(48),

  safeArea: verticalScale(10),
  screenXS: verticalScale(300),
  screenS: verticalScale(400),
  screenM: verticalScale(500),
};
