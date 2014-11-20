#Xin-archetype
Pada pengembangan awal, Xin-archetype ditargetkan pada *Mobile Application* (Single Page Application).

#Instalasi
Xin-archetype menggunakan bower sebagai pengatur dependencies (ketergantungan) library yang dibutuhkan. lakukan `bower install` untuk mengunduh semua library yang dibutuhkan.

```bash
cd www
bower install
```

#Cordova plugins
*   https://github.com/brodysoft/Cordova-SQLitePlugin
*   https://github.com/apache/cordova-plugin-file
*   https://github.com/Initsogar/cordova-activityindicator
*   https://github.com/apache/cordova-plugin-splashscreen

```bash
cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
cordova plugin add https://github.com/apache/cordova-plugin-file.git
cordova plugin add https://github.com/Initsogar/cordova-activityindicator.git
cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git
```

Thats it!