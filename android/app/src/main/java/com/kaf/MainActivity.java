package com.kaf;

import android.os.Bundle; // for react-native-bootsplash

import com.facebook.react.ReactActivity;

import com.zoontek.rnbootsplash.RNBootSplash; // for react-native-bootsplash

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "kaf";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // display the generated bootsplash.xml drawable over our MainActivity =>
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);
  }
}
