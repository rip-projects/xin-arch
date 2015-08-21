if(!window.API) window.API = {};

window.API.download = {

    isFileExist: function(fileName, fileExistCB, fileNotExistCB) {
        window.resolveLocalFileSystemURL(fileName, fileEntryCB, fileNotExistCB);
    },

    download: function(fileName, uriString, onSuccess, onError, onProgress) {

        // var fileName = '.kamusku/enid.zip',
        //     uriString = "http://192.168.1.123/cdn/kamusku/enid.zip";

        // open target file for download
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

            console.log(fileName, uriString, onSuccess, onError, onProgress);

            fileSystem.root.getFile(fileName, { create: true }, function (targetFile) {
                var downloader = new BackgroundTransfer.BackgroundDownloader();
                // Create a new download operation.
                var download = downloader.createDownload(uriString, targetFile);
                // Start the download and persist the promise to be able to cancel the download.
                app.downloadPromise = download.startAsync().then(onSuccess, onError, onProgress);
                delete window.temp;

            });

        });

    }

};