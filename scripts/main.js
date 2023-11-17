const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu-btn");
const closeMenuBtn = document.querySelector(".close-menu-btn");
const menuLinks = document.querySelectorAll(".menu-link"); /*minden linknek van egy ilyen osztélya */

[openMenuBtn, closeMenuBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
        menu.classList.toggle("open"); /* ez hozzáadja aklasszt */
        menu.style.transition = "transform 0.5s ease"; /* ez az átmenetettempóját szabájozza */
    });
});

/* a memu-link osztályú elemeken végig megyünk és valamelyiknél van egy klikk esemény akkor amenuről levesszük a open klasszt.
így ha amneüre kattintunk akkor összecsukódik a hamburger menü */
menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("open"); // Az összecsukás a linkre kattintáskor történik
    });
});

/* ezzel a transition átmenet végeztével mindig leveszi a style tulajdonságot.
ez azért kell hogy ha keskenyítem az oldalt a töréspontnál(991px) ne ugráljun a menü!! */
menu.addEventListener("transitionend", function () {
    this.removeAttribute("style");
});

/* ----------------------------------------------- */

/* ----------------------------------------------- */

/* ezzel renderelem a navbar változásait amikor lejjebb görgetek az oldalon */
const header = document.querySelector(".header");
const img = document.querySelector(".header__logo-img");


function changeHeaderBg() {
    const scrollY = window.scrollY;
    const windowWidth = window.innerWidth;

    /*     console.log("scrollY:", scrollY, "windowWidth:", windowWidth); */
    header.style.transition = "all 0.2s ease";

    /* ha scroll történik akkor ez történik */
    if (scrollY > 0 || windowWidth <= 668) {
        header.style.background = "var(--bg-dark)";
        header.style.height = "60px";
        header.style.boxShadow = "var(--box-shadow-light)";

    }
    /* ha nem akkor pedig marad ez ami elvileg az eredeti beállítés */
    else {
        header.style.height = "70px";
        header.style.background = "transparent";
        header.style.boxShadow = "";
        /*  img.src = "./img/Logo Thomas_light.png"; */

    }
}

/* ezzel hívom meg a a renderelő függvényt mikor az oldalon scroll esemény történik */
window.addEventListener("scroll", changeHeaderBg);
window.addEventListener("load", changeHeaderBg);
window.addEventListener("resize", changeHeaderBg);






/* A menü hoverjének változása görgetésre */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelector('header nav a');

window.addEventListener('scroll', () => {
    const top = window.scrollY + 150; // Az eltérés miatt hozzáadunk 150 pixelt

    sections.forEach(section => {
        const id = section.getAttribute("id");
        const link = document.querySelector(`header nav a[href="#${id}"]`);

        if (section.offsetTop <= top && section.offsetTop + section.offsetHeight > top) {
            // Ha a szakasz fent látható, hozzáadjuk az "active" osztályt a hozzátartozó linkhez
            link.classList.add('active');
        } else {
            // Ellenkező esetben eltávolítjuk az "active" osztályt a linkről
            link.classList.remove('active');
        }
    });
});






/*   Email send  */
contactForm = document.getElementById("contact-form");
statusBox = document.querySelector(".form__status-box p");
formInputs = document.querySelectorAll(".form__input");



/* ============== Contact Section ============== */
formInputs.forEach(input => {
    input.addEventListener("focus", () => {
        let targetLabel = document.querySelector(`.form__label[for=${input.id}]`);
        targetLabel.classList.add("focus");
    });
    input.addEventListener("blur", () => {
        let targetLabel = document.querySelector(`.form__label[for=${input.id}]`);
        if (input.value.length === 0)
            targetLabel.classList.remove("focus");
    });
});



/* ============== Send Email By EmailJS ============== */
const serviceID = "service_t8b2h45";
const templateID = "template_aa4hy22";
const templateParams = contactForm;
const publicKey = "83VPhLv_IQqpQzH-0";

function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(serviceID, templateID, templateParams, publicKey).then(response => {
        console.log(response.status, response.text);
        statusBox.textContent = "Az üzenetet sikeresen elküldtük! ✅"
        setTimeout(() => {
            statusBox.textContent = ""
        }, 5000);
        contactForm.reset();
        const labels = contactForm.querySelectorAll('.form__label');
        labels.forEach(label => {
            label.classList.remove('focus');
        });
    },
        (error) => {
            console.log(error);
            statusBox.textContent = "Az üzenetet nem sikerült elküldeni! ❌"
        }
    );
}

contactForm.addEventListener("submit", sendEmail)



/* dark light mode */
/* ============== Dark / Light Theme ============== */
const colorThemeBtn = document.querySelector(".color-theme");
const imgLogo = document.querySelector(".header__logo-img");
const imgLogoEn = document.querySelector(".header__logo-img-en");

colorThemeBtn.addEventListener("click", () => {
    theme.toggleTheme();
});


function changeTheme() {
    const langAttribute = document.documentElement.lang;

    if (theme.currentTheme === "dark") {
        colorThemeBtn.querySelector("i").classList.replace("ri-moon-fill", "ri-sun-fill");
        if (langAttribute === "hu") {
            imgLogo.src = "./img/Logo Thomas_light.png";
        }
        else if (langAttribute === "en"){
            imgLogoEn.src = "../img/Logo Thomas_light.png";
        }
    } else if (theme.currentTheme === "light") {
        colorThemeBtn.querySelector("i").classList.replace("ri-sun-fill", "ri-moon-fill");
        if (langAttribute === "hu") {
            imgLogo.src = "./img/Logo Thomas_blue.png";
        }
        else {
            imgLogoEn.src = "../img/Logo Thomas_blue.png";
        }
    }

};


theme.onLoad(changeTheme);
theme.onToggle(changeTheme);

