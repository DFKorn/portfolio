import content from './content.js'

let toggle = document.querySelector('.toggle');
let topbar = document.querySelector('.topbar');
let navigation = document.querySelector('nav');
let main = document.querySelector('main');
let themeSwitch = document.querySelector('.themeSwitch')
let body = document.querySelector('body')

toggle.onclick = function () {
    toggle.classList.toggle('active');
    topbar.classList.toggle('active');
    navigation.classList.toggle('active');
    main.classList.toggle('active')
}

//Page language switch
const page = document.querySelector('html')
let langToggleButton= document.querySelector('.check')

const langSwitch = () => {
    if(page.lang===''){
        page.lang ='en'
        langToggleButton.checked = false;
    }else if (page.lang === 'en'){
        page.lang = 'ru'
        localStorage.setItem('lang','ru')
    }else if (page.lang === 'ru'){
        page.lang = 'en'
        localStorage.setItem('lang','en')
    }
    contentChange(page.lang)
}
langToggleButton.addEventListener('click', langSwitch)


let navHome = document.querySelector('.nav-home');
let navAbout = document.querySelector('.nav-about');
let navProjects = document.querySelector('.nav-projects');

let heroHeader = document.querySelector('.hero h1');
let heroPara = document.querySelector('.hero p')

let aboutHeader = document.querySelector('.about h2');
let aboutPara1 = document.querySelector('.about__par1');
let aboutPara2 = document.querySelector('.about__par2');
let skillsHeader = document.querySelector('.skills h3');

let projectsHeader = document.querySelector('.projects h2');
let projectsPara = document.querySelector('.projects p')

function contentChange(lang){
    console.log(lang);
    navHome.textContent = content[lang].navigation.home;
    navAbout.textContent = content[lang].navigation.about;
    navProjects.textContent = content[lang].navigation.projects;

    heroHeader.textContent = content[lang].hero.h1;
    heroPara.textContent = content[lang].hero.p;

    aboutHeader.textContent = content[lang].about.h2;
    aboutPara1.textContent = content[lang].about.p;
    aboutPara2.textContent = content[lang].about.p2;
    skillsHeader.textContent = content[lang].about.skills;


    projectsHeader.textContent = content[lang].recentWorks.h2;
    projectsPara.textContent = content[lang].recentWorks.p
}

//change language depending on user's location 
//using OpenWeather API for geocoding
const weatherKey = 'a5896f288c42d0b5b853f3f61debe275'
function getPosition(){
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) =>{
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            const getCountry = fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${weatherKey}`);

            getCountry
                .then((response) =>{
                    if(!response.ok){
                        throw new Error (`HTTP error: ${response.status}`)
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    const country = data[0].country;
                    console.log(country);
                    if(country === 'RU' || country === 'BY'){
                        page.lang = 'ru';
                        contentChange(page.lang)
                        langToggleButton.checked = true;
                        localStorage.setItem('lang','ru')
                    }else{
                        page.lang = 'en';
                        contentChange(page.lang);
                        langToggleButton.checked = false;
                        localStorage.setItem('lang', 'en')
                    }
                })
                .catch((error) => {
                    console.error(`Could not get the location: ${error}`);
                  });
        },
        function (error) {
            if (error.code == error.PERMISSION_DENIED){
                console.log(error)
                page.lang = 'en';
                contentChange(page.lang);
                langToggleButton.checked = false;
                localStorage.setItem('lang', 'en') 
            }
        })
    } else {
        page.lang = 'en';
        contentChange(page.lang);
        langToggleButton.checked = false;
        localStorage.setItem('lang', 'en')
    }
}
//check for user's language and theme preferences
function checkLocalStorage (){
        if(localStorage.getItem('lang')){
            const lang = localStorage.getItem('lang')
            lang === 'ru'? langToggleButton.checked = true : langToggleButton.checked = false
            page.lang = lang;
            contentChange(lang)
        }else{
            getPosition()
        };
        if(localStorage.getItem('theme')){
            const theme = localStorage.getItem('theme');
            body.classList.add(theme)
        }
}

checkLocalStorage()

//Dark/light mode switch
themeSwitch.onclick = function(){
    body.classList.toggle('dark');
    body.classList.contains('dark') 
    ? localStorage.setItem('theme', 'dark') 
    : localStorage.setItem('theme', '');
}

//Navigation menu

navHome.onclick = toggleMenu;
navAbout.onclick = toggleMenu;
navProjects.onclick = toggleMenu;

function toggleMenu(){
    navigation.classList.remove('active');
    main.classList.remove('active');
    topbar.classList.remove('active')
}