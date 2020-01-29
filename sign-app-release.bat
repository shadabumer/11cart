@ECHO OFF
::Set this folder to your folder where the certificates exists
SET CERTIFICATES_DIR=%1
IF [%1]==[] SET /P CERTIFICATES_DIR="Where are your signing certificates located?"
ECHO Folder path for keys is %CERTIFICATES_DIR%

SET OUTPUT_FILE_NAME=11cart.apk
::This is the release directory for the ionic app, where it creates the unsigned apk.
SET UNSIGNED_APK=%cd%\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
SET SIGNED_APK=%cd%\platforms\android\app\build\outputs\apk\release\%OUTPUT_FILE_NAME%

::If the unsigned apk exists call the signing script
IF EXIST %UNSIGNED_APK% (
    ::Removing existing signed file if exists.
    IF EXIST %SIGNED_APK% (
        del %SIGNED_APK%
    )

    jarsigner  -sigalg SHA1withRSA -digestalg SHA1 -keystore %CERTIFICATES_DIR%\11cart-key.keystore %UNSIGNED_APK% 11cart-key
    zipalign  4 %UNSIGNED_APK% %SIGNED_APK%
    apksigner verify %SIGNED_APK%
    ECHO  Created signed apk file %SIGNED_APK%
) ELSE  (
    ECHO unsigned relase apk file does not exist 
)










