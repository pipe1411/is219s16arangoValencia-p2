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
    
    function initGalleryImage(json) {
    }



};

$(document).ready(main);
