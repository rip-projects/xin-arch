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

##[data-role="app"]
###TBD

##[data-role="pane"]
###TBD

##[data-role="view"]
###TBD

##[data-role="layout"]
###TBD

##[data-role="drawer"]
###TBD

##[data-parent-referer="your_uri"]
### Memastikan _back_ button akan mengembalikan ke uri yang sudah di-define pada attribute data-parent-referer="you_uri"

```html
<div data-role="layout" data-id="back" class="xc-flex vertical">
    <div data-region="header">
        <div data-role="navbar" class="xc-flex horizontal">
            <div class="no-flex" style="left:0">
                <a href="#" class="back">Back</a>
            </div>
            <div data-region="title" class="xin-title center">
                Simple Demo
            </div>
            <div class="no-flex" style="right:0">

            </div>
        </div>
    </div>
    <div data-region="body" class="center layout-body">
    </div>
</div>

<div data-role="view" data-uri="parent" data-layout="default" data-title="Parent">
    <h3>Parent</h3>
    <a href="#child">Go to child...</a>
</div>

<div data-role="view" data-uri="child" data-layout="back" data-title="Child" data-parent-referer="parent">
    Child
</div>
```


##[data-background="drawer"]:
### Custom background __View__

__Mengganti dengan nama warna__
```html
<div data-role="view" data-uri="uri" data-background="red" data-layout="layoutid" data-title="Title">
    ...
</div>
```

__Mengganti warna dengan kode warna__
```html
<div data-role="view" data-uri="uri" data-background="#f3f3f3" data-layout="layoutid" data-title="Title">
    ...
</div>
```

__Mengganti warna dengan kode gambar__
```html
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

```html
<div data-role="MyView" data-uri="uri" data-layout="layoutid" data-title="Title">
    ...
</div>
```


CONFIG
======
_www/js/app/config.js_
```javascript
;(function(){
    if(!window.config) window.config = {};

    config = {
        name:       'Your Application name',
        desc:       'Your Application description',
        version:    '0.0.1',
        versionCode: 1,
        organization: 'Xinix Technology',
        url: 'http://xinix.co.id/your_awesome_app',
        package:    "id.co.xinix.your_awesome_app",

        // Change the environment as your needs
        environment: 'development', // production, staging, testing, development

        TAG: 'MyTaggingOfApplication',
        db: {
            name:       'app.db',
            version:    1,
            scheme:     '0.0.1',
            log:        {1: '0.0.1'},
            schemes: {
                '0.0.1': [
                    'CREATE TABLE IF NOT EXISTS table_name          (id TEXT PRIMARY KEY, from TEXT, to TEXT, term TEXT, pron TEXT)'
                ]
            },
            collections: {
                // default value apllication
                '0.0.1': {}
            }
        },


        api: {
            production:     'http://xinix.co.id/api-prod',
            staging:        'http://xinix.co.id/api-staging',
            testing:        'http://xinix.co.id/api-testing',
            development:    'http://xinix.co.id/api-development'
        },

        getApi: function(path) {
            var split = path.split('.'),
                res = app.config('uri');
            for (var i = 0; i < split.length; i++) {
                res = res[split[i]];
            }
            return app.config('api')[app.config('environment')] + res;
        },

        uri: {
            user: {
                login:      '/user/login',
                register:   '/user/register',
                logout:     '/user/logout',
                forgot:     '/user/forgot'
            }
        }

    };

})();
```

ex:
```javascript
console.log(app.config('getApi')('user.login'));
// output: "http://xinix.co.id/api-development/user/login"
```

Thats it!