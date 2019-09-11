//Adam Prinz
//adamprinz.com

//draw svg path of social media icon
window.onload = function() {
    var lineDrawing = anime({
        targets: '#socialmedia path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 4500,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: true
    });
}