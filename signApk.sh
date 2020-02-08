jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /home/shadab/Projects/ionic/11cart/11cart-key.keystore app-debug.apk 11cart-key

zipalign -v 4 signed_ap-debug.apk 11cart.apk