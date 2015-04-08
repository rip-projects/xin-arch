#Xin-archetype
Pada pengembangan awal, Xin-archetype ditargetkan pada *Mobile Application* (Single Page Application).

#Instalasi
Xin-archetype menggunakan bower sebagai pengatur dependencies (ketergantungan) library yang dibutuhkan. lakukan `bower install` untuk mengunduh semua library yang dibutuhkan.

```bash
cd www
bower install
```


DIRECTIVES
==========
__[data-role="app"]:__ TBD
__[data-role="pane"]:__ TBD
__[data-role="view"]:__ TBD
__[data-role="layout"]:__ TBD
__[data-role="drawer"]:__ TBD

##[data-background="drawer"]: Custom background __View__

__Mengganti dengan nama warna__
```html5
<div data-role="view" data-uri="uri" data-background="red" data-layout="layoutid" data-title="Title">
    ...
</div>
```

__Mengganti warna dengan kode warna__
```html5
<div data-role="view" data-uri="uri" data-background="#f3f3f3" data-layout="layoutid" data-title="Title">
    ...
</div>
```

__Mengganti warna dengan kode gambar__
```html5
<div data-role="view" data-uri="uri" data-background="url(awesome.com/image.png)" data-layout="layoutid" data-title="Title">
    ...
</div>

<div data-role="view" data-uri="uri" data-background="url(./img/image.png)" data-layout="layoutid" data-title="Title">
    ...
</div>
```



LAYOUTS
=======
```html
<div data-role="layout" data-id="layoutid" class="xc-flex vertical">
    <div data-region="header">
        <nav class="navbar navbar-default" role="navigation">
           <div class="row">

              <div class="span-2">
                 <a class="back-button icon-menu back"><i class="xn xn-bars"></i></a>
              </div>

              <div class="span-8">
                 <h6 class="label">Application</h6>
              </div>
              <div class="span-2">
                 <a href="#" class="icon-menu"><i class="xn xn-search"></i></a>
                 <a href="#" class="icon-menu pull-right"><i class="xn xn-ellipsis-v"></i></a>
              </div>
           </div>
        </nav>
    </div>
    <hr class="progressBar" />
    <div data-region="body" class="center layout-body"></div>
    <div data-region="footer">
        <div class="xin-navbar">
            <div class="xin-title">
                Footer
            </div>
        </div>
    </div>
</div>
```


ROUTES
======

__Default:__ TBD
```html
<div data-role="view" data-uri="uri" data-layout="layoutid" data-title="Title">
    ...
</div>
```

__Custom:__ TBD

```html
<a href="#awesome/here" > Something awesome here </a>
```

```javascript
app.router.route('awesome(/*splats)', function(splats) {
    // Do Something
});
```

__Outsource:__ TBD
```html
<a href="#http://google.com">Google page will show to you.</a>
```


VIEWS
=====
Ide besarnya adalah untuk mengatur interface dengan logical __View__, didukung oleh __Model__,  masing-masing __View__ dapat diperbarui secara independen saat perubahan __Model__, tanpa harus merender ulang halaman.  Alih-alih menggali ke dalam objek JSON, mencari unsur dalam DOM, dan memperbarui HTML secara manual, Kamu dapat mengikat __View__ Anda dengan membuat fungsi untuk model *"change" event* - dan sekarang di mana-mana bahwa data model  ditampilkan di UI, selalu dan segera up to date.


##Extends
```javascript
var MyView = xin.ui.View.extend({
    ...
    });
```

```html5
<div data-role="MyView" data-uri="uri" data-layout="layoutid" data-title="Title">
    ...
</div>
```


#Cordova plugins
*   https://github.com/brodysoft/Cordova-SQLitePlugin
*   https://github.com/apache/cordova-plugin-file
*   https://github.com/apache/cordova-plugin-file-transfer
*   https://github.com/sgrebnov/cordova-plugin-background-download
*   https://github.com/MobileChromeApps/zip
*   https://github.com/Initsogar/cordova-activityindicator
*   https://github.com/apache/cordova-plugin-splashscreen
*   https://github.com/MobileChromeApps/zip

```bash
cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
cordova plugin add https://github.com/apache/cordova-plugin-file.git
cordova plugin add https://github.com/apache/cordova-plugin-file-transfer.git
cordova plugin add https://github.com/sgrebnov/cordova-plugin-background-download.git
cordova plugin add https://github.com/MobileChromeApps/zip.git
cordova plugin add https://github.com/Initsogar/cordova-activityindicator.git
cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git
cordova plugin add https://github.com/MobileChromeApps/zip.git
```

Thats it!