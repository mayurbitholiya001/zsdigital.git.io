//Swiper slider
var swiper = new Swiper(".bg-slider-thumbs", {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 0,
});
var swiper2 = new Swiper(".bg-slider", {
    loop: true,
    spaceBetween: 0,
    thumbs: {
        swiper: swiper,
    },
});

//Navigation bar effects on scroll
window.addEventListener("scroll" , function(){
    const header = document.querySelector("header")
    header.classList.toggle("sticky" , window.scrollY > 0);
})

//Responsive navigation menu toggle
/*=============== SHOW MENU ===============*/
 const showMenu = (toggleId, navId) =>{
    const toggle = document. getElementById(toggleId)
    nav= document.getElementById(navId)
   toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu')

    toggle.classList.toggle('show-icon')
   })

 }
 showMenu('nav1-toggle','nav2_menu')


/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

 // 1.select each dropdown item
 dropdownItems.forEach((item) =>{
    const dropdownButton = item.querySelector('.dropdown__button')

    // 2. select each button click

dropdownButton.addEventListener('click', () => {
// 7. select the current show-dropdown class
 const showDropdown = document.querySelector('.show-dropdown')
    // 5. call the toggleitem function
toggleItem(item)
//8. remove the show-dropdown class from other items
if(showDropdown && showDropdown!= item){
    toggleItem(showDropdown)
}

})
 })

 //3 .Create afiunction to display the dropdown
const toggleItem = (item) =>{
    // 3.1 select each dropdown content
    const dropdownContainer = item.querySelector('.dropdown__container')

    //6. if the same item contains the show-dropdown class, remove
    if(item.classList.contains('show-dropdown')){
    dropdownContainer.removeAttribute('style')
    item.classList.remove('show-dropdown')
    } else {
            // 4. add the maximum height to the dropdown content and add the show-dropdown class
    dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
    item.classList.add('show-dropdown')
    }
}
/*=============== DELETE DROPDOWN STYLES ===============*/

const mediaQuery = matchMedia('(min-width: 1118px)'),
dropdownContainer = document.querySelectorAll('.dropdown__container')

//function to remove dropdown styles in mobile mode when browser resizes

const removeStyle = () =>{
//     //validate if media query reaches 1118px
    if(mediaQuery.matches){
//         // remove the dropdown container height style
        dropdownContainer.forEach((e) =>{
            e.removeAttribute('style')
        })
        dropdownItems.forEach((e)  =>{
        e.classList.remove('show-dropdown')
        })
    }
}
addEventListener('resize', removeStyle)


///increment counter//
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');

        const c  = +counter.innerText;

        const increment = target / 200;

        if(c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1)
        } else {
            counter.innerText = target
        }
    }

    updateCounter()
})

//content show//

//erarth//
window.delayedJavascriptArray = window.delayedJavascriptArray || [];
window.delayedJavascriptArray.push(function () {

    otApi.GlobeGL = {

        // Settings
        $trigger: $('.js-globe-gl'),
        jsFiles: [
            'https://unpkg.com/globe.gl',
            'https://d3js.org/d3.v7.min.js',
        ],

        // Initialize
        init: function () {
            if (this.$trigger.length) {
                const isReduced =
                    window.matchMedia('(prefers-reduced-motion: reduce)');

                if (!isReduced || isReduced.matches) {
                    const globeVisual = document.getElementById('globe-visual');
                    globeVisual.classList.remove('d-none');
                } else {
                    otApi.addJSFiles(this.jsFiles, this.applyGlobeGL);
                }
            }
        },

        // Apply globe.gl
        applyGlobeGL: function () {

            const
                $globe = document.getElementById('globe-gl'),
                globeWidth = $globe.parentNode.getBoundingClientRect().width,
                primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary'),
                neutralColor = '#b0b4b9',
                map = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAAD5Ip3+AAAAC0lEQVQIHWP4DwQACfsD/Qy7W+cAAAAASUVORK5CYII=',
                landCheckUrl = 'https://assets.ot.digital/img/map.png',
                landCheckImg = new Image(),
                DEG2RAD = Math.PI / 180,
                random_sample = (obj, n) => d3.shuffle(obj.slice()).slice(0, n),
                N = 10,
                world = Globe()
                    .globeImageUrl(map)
                    .backgroundColor('rgba(0, 0, 0, 0)')
                    //.showGlobe(true)
                    .showAtmosphere(true)
                    .atmosphereColor(neutralColor)
                    .atmosphereAltitude(0.3)
                    .width(globeWidth)
                    .height(globeWidth)
                    ($globe),
                globeMat = world.globeMaterial();

            globeMat.opacity = 0.5;
            globeMat.shininess = 0.5;

            landCheckImg.src = landCheckUrl;
            landCheckImg.crossOrigin = 'Anonymous';
            landCheckImg.onload = () => {
                landDots(25, 200, landCheckImg);
            }

            //const dlight = world.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
            //dlight && dlight.position.set(-1, 1, 1);

            world.pointOfView({ altitude: 2 });
            world.controls().autoRotate = true;
            world.controls().autoRotateSpeed = 0.85;
            world.controls().enabled = true;
            world.controls().enableZoom = false;

            // Resize globe on window resize
            window.addEventListener('resize', (event) => {
                const globeWidth = $globe.parentNode.getBoundingClientRect().width;
                world.width([globeWidth])
                world.height([globeWidth])
            });

            // Play/pause globe animation
            const globePlayPause = function () {
                if (this.classList.contains('paused')) {
                    this.classList.remove('paused');
                    world.resumeAnimation();
                } else {
                    this.classList.add('paused');
                    world.pauseAnimation();
                }
            }
            const globeToggle = document.getElementById('globe-toggle');
            globeToggle.classList.remove('d-none');
            globeToggle.addEventListener('click', globePlayPause);

            function landDots(globeRad, rows, image) {
                const d = getImageData(image);
                const dots = [];

                for (let lat = -90; lat <= 90; lat += 180 / rows) {
                    const radius = Math.cos(Math.abs(lat) * DEG2RAD) * globeRad;
                    const circum = radius * Math.PI * 2 * 2;
                    for (let r = 0; r < circum; r++) {
                        const lng = 360 * r / circum - 180;
                        if (!visibilityForCoordinate(lng, lat, d)) {
                            continue;
                        }
                        dots.push({ lat: lat, lng: lng });
                    }
                }

                world
                    .pointsData(dots)
                    .pointColor(() => neutralColor)
                    .pointRadius(0.25)
                    .pointResolution(5)
                    .pointAltitude(0)
                    .pointsMerge(true)
                    // arcs
                    .arcColor(() => primaryColor)
                    .arcStroke(0.25)
                    .arcDashInitialGap(1)
                    .arcDashLength(2)
                    .arcDashGap(2)
                    .arcDashAnimateTime(2000)
                    // labels
                    .labelText(d => '')
                    .labelColor(() => t => primaryColor)
                    .labelDotRadius(0.3)
                    .labelAltitude(0.002)
                    .labelsTransitionDuration(250)
                    // rings
                    .ringColor(() => t => 'rgba(51,5,141,${1-t})')
                    .ringMaxRadius(2)
                    .ringPropagationSpeed(2)
                    .ringRepeatPeriod(0);

                setInterval(() => {
                    let c10 = random_sample(dots, N * 2),
                        c = [...Array(N).keys()].map((d, i) => ({
                            startLat: c10[i].lat,
                            startLng: c10[i].lng,
                            endLat: c10[i + N].lat,
                            endLng: c10[i + N].lng
                        })),
                        l = [...Array(N * 2).keys()].map((d, i) => ({
                            lat: c10[i].lat,
                            lng: c10[i].lng
                        })),
                        r = [...Array(N).keys()].map((d, i) => ({
                            lat: c10[i + N].lat,
                            lng: c10[i + N].lng
                        }));

                    world.arcsData(c).labelsData(l);

                    setTimeout(() => {
                        world.ringsData(r);
                    }, 4000);
                }, 6000);
            }

            function visibilityForCoordinate(lng, lat, data) {
                const i = 4 * data.width,
                    r = parseInt((lng + 180) / 360 * data.width + .5),
                    a = data.height - parseInt((lat + 90) / 180 * data.height - .5),
                    s = parseInt(i * (a - 1) + 4 * r) + 3;
                return data.data[s] > 90;
            }

            function getImageData(img) {
                const el = document.createElement('canvas').getContext('2d');
                return el.canvas.width = img.width,
                    el.canvas.height = img.height,
                    el.drawImage(img, 0, 0, img.width, img.height),
                    el.getImageData(0, 0, img.width, img.height);
            }
        }

    }

    otApi.GlobeGL.init();

});

function incrementCounter() {
    let numbers = document.querySelectorAll("section.achievements span h1");
    numbers.forEach((item) => {
      let maxValue = item.getAttribute("data-max");
      let initialValue = 0;
      setInterval(() => {
        if (initialValue <= maxValue) {
          item.innerText = initialValue;
          initialValue++;
        }
      }, 5);
    });
  }
  
  const achievements = document.querySelector(".achievements");
  let elementPosition = achievements.getBoundingClientRect().top;
  let triggerCounter = true;
  window.addEventListener("scroll", function () {
    if (window.scrollY + 800 > achievements.offsetTop && triggerCounter) {
      incrementCounter(); // replace myFunction with the name of your function
      console.log(window.scrollY, achievements.offsetTop);
      triggerCounter = false;
    }
  });

  // This is script file

  const reviewWrap = document.getElementById("reviewWrap");
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");
  const imgDiv = document.getElementById("imgDiv");
  const personName = document.getElementById("personName");
  const profession = document.getElementById("profession");
  const description = document.getElementById("description");
  const surpriseMeBtn = document.getElementById("surpriseMeBtn");
  const chicken = document.querySelector(".chicken");
  
  let isChickenVisible;
  
  let people = [
      {
          photo:
              'url("https://cdn.pixabay.com/photo/2018/03/06/22/57/portrait-3204843_960_720.jpg")',
          name: "Susan Smith",
          profession: "WEB DEVELOPER",
          description:
              "Cheese and biscuits chalk and cheese fromage frais. Cheeseburger caerphilly cheese slices chalk and cheese cheeseburger mascarpone danish fontina rubber cheese. Squirty cheese say cheese manchego jarlsberg lancashire taleggio cheese and wine squirty cheese. Babybel pecorino feta macaroni cheese brie queso everyone loves gouda. Cheese and biscuits camembert de normandie fromage fromage macaroni cheese"
      },
  
      {
          photo:
              "url('https://cdn.pixabay.com/photo/2019/02/11/20/20/woman-3990680_960_720.jpg')",
          name: "Anna Grey",
          profession: "UFC FIGHTER",
          description:
              "I'm baby migas cornhole hell of etsy tofu, pickled af cardigan pabst. Man braid deep v pour-over, blue bottle art party thundercats vape. Yr waistcoat whatever yuccie, farm-to-table next level PBR&B. Banh mi pinterest palo santo, aesthetic chambray leggings activated charcoal cred hammock kitsch humblebrag typewriter neutra knausgaard. Pabst succulents lo-fi microdosing portland gastropub Banh mi pinterest palo santo"
      },
  
      {
          photo:
              "url('https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg')",
          name: "Branson Cook",
          profession: "ACTOR",
          description:
              "Radio telescope something incredible is waiting to be known billions upon billions Jean-François Champollion hearts of the stars tingling of the spine. Encyclopaedia galactica not a sunrise but a galaxyrise concept of the number one encyclopaedia galactica from which we spring bits of moving fluff. Vastness is bearable only through love paroxysm of global death concept"
      },
  
      {
          photo:
              "url('https://cdn.pixabay.com/photo/2014/10/30/17/32/boy-509488_960_720.jpg')",
          name: "Julius Grohn",
          profession: "PROFESSIONAL CHILD",
          description:
              "Biscuit chocolate pastry topping lollipop pie. Sugar plum brownie halvah dessert tiramisu tiramisu gummi bears icing cookie. Gummies gummi bears pie apple pie sugar plum jujubes. Oat cake croissant bear claw tootsie roll caramels. Powder ice cream caramels candy tiramisu shortbread macaroon chocolate bar. Sugar plum jelly-o chocolate dragée tart chocolate marzipan cupcake gingerbread."
      }
  ];
  
  imgDiv.style.backgroundImage = people[0].photo;
  personName.innerText = people[0].name;
  profession.innerText = people[0].profession;
  description.innerText = people[0].description;
  let currentPerson = 0;
  
  //Select the side where you want to slide
  function slide(whichSide, personNumber) {
      let reviewWrapWidth = reviewWrap.offsetWidth + "px";
      let descriptionHeight = description.offsetHeight + "px";
      //(+ or -)
      let side1symbol = whichSide === "left" ? "" : "-";
      let side2symbol = whichSide === "left" ? "-" : "";
  
      let tl = gsap.timeline();
  
      if (isChickenVisible) {
          tl.to(chicken, {
              duration: 0.4,
              opacity: 0
          });
      }
  
      tl.to(reviewWrap, {
          duration: 0.4,
          opacity: 0,
          translateX: `${side1symbol + reviewWrapWidth}`
      });
  
      tl.to(reviewWrap, {
          duration: 0,
          translateX: `${side2symbol + reviewWrapWidth}`
      });
  
      setTimeout(() => {
          imgDiv.style.backgroundImage = people[personNumber].photo;
      }, 400);
      setTimeout(() => {
          description.style.height = descriptionHeight;
      }, 400);
      setTimeout(() => {
          personName.innerText = people[personNumber].name;
      }, 400);
      setTimeout(() => {
          profession.innerText = people[personNumber].profession;
      }, 400);
      setTimeout(() => {
          description.innerText = people[personNumber].description;
      }, 400);
  
      tl.to(reviewWrap, {
          duration: 0.4,
          opacity: 1,
          translateX: 0
      });
  
      if (isChickenVisible) {
          tl.to(chicken, {
              duration: 0.4,
              opacity: 1
          });
      }
  }
  
  function setNextCardLeft() {
      if (currentPerson === 3) {
          currentPerson = 0;
          slide("left", currentPerson);
      } else {
          currentPerson++;
      }
  
      slide("left", currentPerson);
  }
  
  function setNextCardRight() {
      if (currentPerson === 0) {
          currentPerson = 3;
          slide("right", currentPerson);
      } else {
          currentPerson--;
      }
  
      slide("right", currentPerson);
  }
  
  leftArrow.addEventListener("click", setNextCardLeft);
  rightArrow.addEventListener("click", setNextCardRight);
  
//   surpriseMeBtn.addEventListener("click", () => {
//       if (chicken.style.opacity === "0") {
//           chicken.style.opacity = "1";
//           imgDiv.classList.add("move-head");
//           surpriseMeBtn.innerText = "Remove the chicken";
//           surpriseMeBtn.classList.remove("surprise-me-btn");
//           surpriseMeBtn.classList.add("hide-chicken-btn");
//           isChickenVisible = true;
//       } else if (chicken.style.opacity === "1") {
//           chicken.style.opacity = "0";
//           imgDiv.classList.remove("move-head");
//           surpriseMeBtn.innerText = "Surprise me";
//           surpriseMeBtn.classList.add("surprise-me-btn");
//           surpriseMeBtn.classList.remove("hide-chicken-btn");
//           isChickenVisible = false;
//       }
//   });
  
  window.addEventListener("resize", () => {
      description.style.height = "100%";
  });
  