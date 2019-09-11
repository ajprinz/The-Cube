//adamprinz.com
//using three.js and tween.js
//for cube menu


//Establish global variables
var renderer, camera, controls;
var raycaster, mouse;


//Set the scene
var scene = new THREE.Scene();
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;


//Create a renderer --WebGL--
renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);


//Create listener in case of browser window resize
window.addEventListener('resize', function () {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
});


//Create background color
//renderer.setClearColor(0xf3354f, 1);
renderer.setClearColor(0xffffff, 1);


//Create light source
var light = new THREE.AmbientLight(0xffffff);
light.position.set(0, 80, 100);
scene.add(light);


//Create cube
var cubeGeometry = new THREE.CubeGeometry(125, 125, 125);
var loader = new THREE.TextureLoader();
loader.setCrossOrigin("anonymous");  //needed to avoid cross domain security errors
var portfolio = loader.load('Images/CubeFace_Portfolio.jpg');
var contact = loader.load('Images/CubeFace_Contact.jpg');
var about = loader.load('Images/CubeFace_About.jpg');
var services = loader.load('Images/CubeFace_Services.jpg');
var blog = loader.load('Images/CubeFace_Blog.jpg');
var socialMedia = loader.load('Images/CubeFace_SocialMedia.jpg');

var cubeMaterial = [
    new THREE.MeshBasicMaterial({map : blog , side : THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map : about , side : THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map : contact , side : THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map : services , side : THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map : portfolio , side : THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map : socialMedia , side : THREE.DoubleSide})
];

var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.rotation.y = Math.PI * 45 / 180;
cube.overdraw = true;
scene.add(cube);

//Make tiny cubes at different random coordinates
function randCoor() {
    var coordinate = Math.floor(Math.random() * (500 - (-500)) + (-500));
    return coordinate;
}

for (var i = 0; i <= 70; i++) {
    var cubeFireflies = [i];
    cubeFireflies[i] = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5) , new THREE.MeshBasicMaterial({color : 0x000000 , side : THREE.DoubleSide}));;
    cubeFireflies[i].position.set(randCoor(), randCoor(), randCoor());
    cubeFireflies[i].rotation.x = randCoor();
    cubeFireflies[i].rotation.y = randCoor();
    scene.add(cubeFireflies[i]); 
    var shift = new createjs.Tween(cubeFireflies[i].position).to({x : randCoor() , y : randCoor() , z : randCoor()} , 120000 , createjs.Ease.linear);
    var roll = new createjs.Tween(cubeFireflies[i].rotation).to({x : randCoor() , y : randCoor()} , 600000 , createjs.Ease.linear);
};


//Add fog for depth
//scene.fog = new THREE.Fog(0xf3354f , 300 , 1200);
scene.fog = new THREE.Fog(0xffffff, 300 , 1200);


//Create the camera -----------with FOV, Aspect Ratio, Near, Far--
camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
camera.position.y = 160;
camera.position.z = 1700;
camera.lookAt(cube.position);
scene.add(camera);
var zoomIn = new createjs.Tween(camera.position).to({z : 450} , 2000 , createjs.Ease.getElasticOut(1, 2));


//Add controls to pan around
//Controls for Desktop
if (screen.width > 1000) {
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 3;
    controls.zoomSpeed = 0.05;
    controls.panSpeed = 0;
    controls.noZoom = true;
    controls.noPanPan = true;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.03;
}

//Controls for Mobile (under 1000px)
if (screen.width <= 1000) {
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1;
    controls.zoomSpeed = 0.05;
    controls.panSpeed = 0;
    controls.noZoom = true;
    controls.noPanPan = true;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.07;
}

//Create raycaster to idetify cube faces as clickable
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
document.addEventListener('dblclick', ondblclick, false);

function ondblclick(event) {
    //wait for the user click
    event.preventDefault();
    
    //assign click to only the cube
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    
    //Assign the raycaster view point
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(cube);
    var link = ['blog.html', 'about.html', 'contact.html', 'services.html', 'portfolio.html', 'socialmedia.html'];
    
    //ondblclick zoom out the cube
    var zoomOut = new createjs.Tween(camera.position).to({z : 1700} , 2000, createjs.Ease.quintOut);
    
    //setTimeout to wait for cube zoom out
    //Assign intersect to the faces and assign each a link
    //ondblclick go to link
    setTimeout( 
    function navigateTo() {
        if (intersects.length > 0) { 
            window.top.location = link[Math.floor(intersects[0].faceIndex / 2)];
            return;
        }
    } , 800);

}


//Render the scene and redraw/update with movement
function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

render();