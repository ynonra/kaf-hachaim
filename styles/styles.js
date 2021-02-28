import { I18nManager } from 'react-native';

export const rtlText = {
  textAlign: !I18nManager.isRTL ? 'right' : 'left',
  writingDirection: 'rtl',
};
export const rtlView = {
  flexDirection: !I18nManager.isRTL ? 'row-reverse' : 'row',
};
export const rtlDirection = { direction: !I18nManager.isRTL ? 'rtl' : 'ltr' };

export const rtlDirectionOpposite = {
  direction: I18nManager.isRTL ? 'rtl' : 'ltr',
};

export const headerButtonStyle = { padding: 0, margin: 0 };
