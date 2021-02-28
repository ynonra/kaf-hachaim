import React from 'react';
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';

import AppText from '../components/AppText';
import {IconButton, Button, Divider} from 'react-native-paper';
import {rtlView} from '../styles/styles';

const AboutScreen = () => {
  const IconLinkBtn = ({icon, url}) => (
    <IconButton
      size={19}
      icon={icon}
      style={styles.iconButton}
      onPress={() => Linking.openURL(url)}
    />
  );
  const TextNearIconContainer = ({children, style, ...props}) => (
    <View style={[{alignItems: 'center'}, rtlView, style]} {...props}>
      {children}
    </View>
  );
  return (
    <ScreenContainer>
      <ScrollView style={styles.textContainer}>
        <TextNearIconContainer style={{marginTop: 25, marginBottom: 5}}>
          <IconLinkBtn
            icon="wikipedia"
            url="https://he.wikipedia.org/wiki/יעקב_חיים_סופר"
          />
          <AppText
            style={[
              styles.h2,
              {
                marginBottom: 0,
                marginTop: 0,
                padding: 0,
              },
            ]}>
            תולדות רבי יעקב סופר
          </AppText>
        </TextNearIconContainer>
        <AppText style={styles.p}>
          הרב יעקב חיים סופר (ה'תרכ"ז או ה'תר"ל - ט' בסיוון ה'תרצ"ט, 27 במאי
          1939) היה מקובל, מחבר ופוסק הלכה. נולד בבגדאד בירת עיראק, לרב יצחק
          ברוך ממשפחת "מוסה" ולאסתר. למד מאביו תורה וכתיבת סת"ם. התחנך בישיבת
          "מדרש בית זלכה" בראשות הרב עבדאללה סומך, ולמד בין היתר אצל הרב אלישע
          דנגור. הושפע בלימוד תורה וקבלה מהרב יוסף חיים - בעל ה"בן איש חי",
          והוסמך על-ידו למורה צדק. נשא לאשה את פרחה בדהובא. לפרנסתו עבד כסופר
          סת"ם, ומכאן שם משפחתו "סופר". בראש חודש סיוון ה'תרס"ד (1904) עלה לארץ
          ישראל עם חבריו הרבנים יחזקאל עזרא רחמים וצדקה חוצין. גר בשכונת בית
          ישראל בירושלים ולמד בישיבת המקובלים בית אל. בשנת ה'תרס"ט הקים עם הרב
          יחזקאל עזרא הלוי, החברותא שלו, את בית הכנסת "שושנים לדוד" שבו דרש
          בשבתות וימים טובים. למד וחיבר את ספריו בעליית בית הכנסת (כיום היא עזרת
          נשים). מאוחר יותר הצטרף ללומדי הקבלה בישיבת רחובות הנהר, שם היה תלמיד
          חבר לרב חיים שאול הכהן דוויק. נפטר בגיל 69, ביום שבת, ט' סיוון ה'תרצ"ט
          (1939). נקבר בחלקת החסידים שבהר הזיתים. נינו הוא הרב יעקב חיים סופר,
          שעומד בראש ישיבת 'כף החיים' שהוקמה על שמו.
        </AppText>
        <AppText style={styles.h2}>הספר כף החיים</AppText>
        <AppText style={styles.p}>
          במשך קרוב לארבעים שנה, החל מהיותו כבן שלושים עד פטירתו, עסק הרב סופר
          בכתיבת והדפסת חיבורו "כף החיים" על השולחן ערוך, בשמונה כרכים על חלק
          אורח חיים וכרך אחד על יורה דעה. לאחר פטירתו, בשנת ה'תשי"ז, הדפיסו
          בניו, שלום ומשה סופר, מהדורה חדשה של החיבור, והוסיפו כרך נוסף על יורה
          דעה, מתוך כתב ידו. החיבור הוגה ותוקן על ידי הרב עובדיה יוסף, שגם כתב
          את החלק החסר בכרך החדש (מסימן קיז אות יג עד סוף סימן קיט), בסגנון
          הספר. ויחד עם רבו הרב עזרא עטיה כתב את ההקדמה למהדורה. בשנת ה'תשע"ה
          יצאו כרכי החיבור במהדורה חדשה, כולל השלמות רבות מכתב ידו, שנמצא לאחר
          78 שנים בגניזת גג בית הכנסת בבא תמא. הספר דומה במבנהו ל"משנה ברורה",
          באשר שניהם מבארים את דברי השולחן ערוך והפוסקים בנושאים הנידונים, על
          בסיס הספרות ההלכתית לאורך הדורות; אך בשונה מהמשנה ברורה, ה"כף החיים"
          יותר מרחיב ומביא את מגוון הדעות שבעניין, ולבסוף מכריע. כמו כן בניגוד
          ל"משנה ברורה", ה"כף החיים" מביא בהרחבה גם את שיטות ופסקי המקובלים,
          בפרט האר"י והרש"ש. בכך הוא ממשיך את שיטת הפסיקה של רבו הרב יוסף חיים.
        </AppText>
        <Divider />
        <AppText style={styles.h2}>על היישומון</AppText>
        <TextNearIconContainer>
          <AppText style={styles.listItem}>מפתח: ינון רחמים</AppText>
          <IconLinkBtn
            icon="email-outline"
            url="mailto:ynonra@gmail.com?subject=ישומון כף החיים"
          />
        </TextNearIconContainer>
        <TextNearIconContainer>
          <AppText style={styles.listItem}>יעוץ עיצוב: אריאל לוק</AppText>
          <IconLinkBtn icon="web" url="https://louck.co.il" />
        </TextNearIconContainer>
        <AppText style={styles.p}>© כל הזכויות שמורות</AppText>

        <AppText style={styles.h2}>מזכים</AppText>
        <AppText style={styles.p}>
          <TextNearIconContainer>
            <AppText style={styles.listItem}>
              כיתוב הספר נלקח מאתר ספריא
            </AppText>
            <IconLinkBtn
              icon="web"
              url="https://www.sefaria.org.il/person/Yaakov%20Chaim%20Sofer"
            />
          </TextNearIconContainer>
          <TextNearIconContainer>
            <AppText style={styles.listItem}>
              אודות המחבר והספר נלקחו מויקיפדיה
            </AppText>
            <IconLinkBtn
              icon="wikipedia"
              url="https://he.wikipedia.org/wiki/יעקב_חיים_סופר"
            />
          </TextNearIconContainer>
        </AppText>
        <AppText style={styles.p}>להצעות לשיפור / שימור - אנא צרו קשר</AppText>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  textContainer: {padding: 20, paddingTop: 0, fontSize: 18},
  h2: {
    fontSize: 23,
    marginTop: 25,
    marginBottom: 5,
    paddingRight: 5,
    fontFamily: 'Alef-Bold',
  },
  p: {fontSize: 19, marginBottom: 40},
  listItem: {fontSize: 19},
  iconButton: {
    backgroundColor: '#f4d5ba',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
