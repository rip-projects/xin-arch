Xin-archetype
===
Pada pengembangan awal, Xin-archetype ditargetkan pada *Mobile Application* (Single Page Application).

## Instalasi menggunakan bower

Xin-archetype menggunakan bower sebagai mengatur dependencies (ketergantungan) library
yang dibutuhkan. Kamu bisa membuat direktori project kamu sebagai aplikasi bower dengan cara:

```bash
mkdir my-app
cd my-app
bower init
```

Untuk menggunakan Pants, disarankan untuk mengganti default direktori untuk meletakkan kebutuhan library dari yang biasanya berada di bower_components/ ke vendor/. Untuk mengganti direktori tersebut, silakan buat file dengan name .bowerrc lalu isi dengan baris-baris berikut ini.

```json
{
    "directory": "vendor"
}
```

Thats it!