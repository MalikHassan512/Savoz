package com.savozapp;

import android.os.Bundle;
import android.os.Handler;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    SplashScreen.show(this, true);
    new Handler().postDelayed(() -> SplashScreen.hide(this), 4000);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SavozApp";
  }
}
