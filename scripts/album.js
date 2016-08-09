// Example Album
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26'},
        { name: 'Green', length: '3:14'},
        { name: 'Red', length: '5:01'},
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'},
    ]
};

// Another Example Album
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01'},
        { name: 'Ring, ring, ring', length: '5:01'},
        { name: 'Fits in your pocket', length: '3:21'},
        { name: 'Can you hear me now?', length: '3:14'},
        { name: 'Wrong phone number', length: '2:15'},
    ]
};

// Assignment 25- Example Album 3
var albumSanFrancisco = {
    name: 'The Neighborhoods',
    artist: 'Willie Brown',
    label: 'Golden Gate',
    year: '1906',
    albumArtUrl: 'assets/images/album_covers/06.png',
    songs: [
        { name: 'Pacific Heights', length: '4:31'},
        { name: 'SOMA', length: '5:20'},
        { name: 'Russian Hill', length: '4:46'},
        { name: 'Inner Sunset', length: '5:42'},
        { name: 'Potrero Hill', length: '6:15'},
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
    
    return $(template);
};

var setCurrentAlbum = function(album) {
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
    
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    
    for (i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
    }
};


var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};


var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }

};

//Elements we'll be adding listeners to

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

var songRows = document.getElementsByClassName('album-view-song-item');

//Album button templates



window.onload = function() {
    setCurrentAlbum(albumPicasso);
    
    songListContainer.addEventListener('mouseover', function(event) {
    
    if (event.target.parentElement.className === 'album-view-song-item') {
        var songItem = getSongItem(event.target);
        
        if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
            songItem.innerHTML = playButtonTemplate;
            }
        }
    
    for (i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            // #1
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
            // #2
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
             }
        });
        
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
         });    
    }                                   
                                       
    });
    
    var albums = [albumPicasso, albumMarconi, albumSanFrancisco];
    var index = 1;
    
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(albums[index])
        index++;
        
        if (index == albums.length) {
            index = 0;
        }
    });
};