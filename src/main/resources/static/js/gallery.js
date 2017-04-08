// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
    // $('#photo').fadeOut(function () {
    //     $(this).attr('src',mImages[indexToLoad].path).fadeIn(600);
    //  });
    // $('.location').fadeOut(function () {
    //     $(this).text("Location: " + mImages[indexToLoad].location).fadeIn(600);
    // });
    // $('.description').fadeOut(function () {
    //     $(this).text("Description: " + mImages[indexToLoad].description).fadeIn(600);
    // });
    // $('.date').fadeOut(function () {
    //     $(this).text("Date: " + mImages[indexToLoad].date).fadeIn(600);
    console.log(indexToLoad);

    if(indexToLoad == mImages.length)
        indexToLoad = 0;

    $('#photo').attr('src',mImages[indexToLoad].path);
    $('.location').text("Location: " + mImages[indexToLoad].location);
    $('.description').text("Description: " + mImages[indexToLoad].description);
    $('.date').text("Date: " + mImages[indexToLoad].date);
	console.log('swap photo');

	mCurrentIndex = indexToLoad;
    indexToLoad++;
    if(indexToLoad == mImages.length)
         indexToLoad = 0;
}

// Counter for the mImages array
var mCurrentIndex = 0;
var indexToLoad = 0;

var mRequest = new XMLHttpRequest();
var $_GET = getQueryParams(document.location.search);
var mUrl = $_GET['json'];
var mImages = [];
if(!UrlExists(mUrl))
    mUrl = "images.json";
readJson();




//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();

	$('.moreIndicator').click(function () {
       $('.details').fadeToggle();
       if($(this).hasClass('rot90')){
           $(this).removeClass('rot90');
           $(this).addClass('rot270');
       }
       else if($(this).hasClass('rot270')) {
           $(this).removeClass('rot270');
           $(this).addClass('rot90');
       }
    });

	$('#prevPhoto').click(function () {
	    if(mCurrentIndex == 0)
            indexToLoad = mImages.length - 1;
        else
            indexToLoad = mCurrentIndex - 1;
        swapPhoto();
    });

    $('#nextPhoto').click(function () {
        if(mCurrentIndex == mImages.length - 1)
            indexToLoad = 0;
        else
            indexToLoad = mCurrentIndex+1;
        swapPhoto();
    });
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(location,description,date,path) {
	this.location = location;
	this.description = description;
	this.date = date;
	this.path = path;
}

function initGalleryImage(json) {
    for(var i = 0; i < json.images.length; i++) {
        mImages[i] = new GalleryImage(json.images[i].imgLocation,json.images[i].description, json.images[i].date,json.images[i].imgPath);
    }
}

function readJson() {
    mRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            initGalleryImage(json);
        }
    }

    mRequest.open("GET", mUrl, true);
    mRequest.send();
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }
    return params;
}

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

