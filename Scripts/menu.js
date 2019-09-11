//Adam Prinz
//adamprinz.com
//Navigation script for slide-in-right menu

var menubtn= document.getElementById('menu-btn');
var item = document.querySelectorAll('nav ul li');
var ul = document.querySelectorAll('nav ul');
var on = 1;



menubtn.onclick = function perform() {
    
    //slide in the list items
    if (on == 1) {

        //add animation class to the hamburger menu
        menubtn.setAttribute('class', 'open');
        
        //Un-hide the nav ul element (it blocks links underneath otherwise)
        ul[0].style.display = "inherit";
        
        //slide in all nav items
        var i = 0;
        function loop() {
            item[i].setAttribute('class', 'menu-item');
            if (i++ < item.length - 1) {
                setTimeout(loop, 150);
            }
        }

        setTimeout (loop, 10);

        on = 0;

    } else {


        //add animation class to the hamburger menu
        menubtn.removeAttribute('class', 'open');

        //slide out all nav items
        var i = 0;
        function loop() {
            item[i].removeAttribute('class', 'menu-item');
            if (i++ < item.length - 1) {
                setTimeout(loop, 150);
            }
        }

        loop();
        on = 1; 

        
        //hide the nav ul element (it blocks links underneath otherwise)
        setTimeout(function hide() {  
            ul[0].style.display = "none";
        } , 2000);

        
    }
    
}