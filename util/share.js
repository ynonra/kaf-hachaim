import { Share } from 'react-native';

export async function onShare() {
  const options = {
    title: 'יישמון כף החיים',
    subject: 'יישמון כף החיים',
    message: 'יישומון כף החיים מאת הרב יעקב חיים סופר',
  };

  try {
    const result = await Share.share(options);
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
}
