/**
 * Created by pipe on 3/26/17.
 */
var main = function() {
    var galleryImage = {
        location : "",
        description : "",
        date : "",
        img : ""
    };

    var mRequest = new XMLHttpRequest();
    var url = "images.json";
    mRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            initGalleryImage(json);
        }
    }

    mRequest.open("GET", url, true);
    mRequest.send();

    var mImages = [];
    
    function initGalleryImage(json) {
        var counter = 0;
        for(var obj in json) {
            var imgMetaData = new Object();
            imgMetaData.location = obj[1];
            imgMetaData.description = obj[2];
            imgMetaData.date = obj[3];
            imgMetaData.img = obj[0];
            mImages[counter++] = imgMetaData;
        }
    }



};

$(document).ready(main);
