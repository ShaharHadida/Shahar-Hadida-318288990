const myForm = document.querySelector('.my_form')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const msg = document.querySelector('.msg')
const userList = document.querySelector('.users')
const buildingInput = document.querySelector('#building')
const dateInput = document.querySelector('#date')
const startInput = document.querySelector('#start')
const endInput = document.querySelector('#end')
const buildingSelect = document.getElementById('buildingSelect')
var currentPage = window.location.pathname;

const activePage = document.querySelectorAll('nav a').forEach(
    link =>{
        console.log(link);
        console.log(currentPage);
        if (link.href.includes(`${currentPage}`)) {
            link.classList.add('active');
        }
    }
);
console.log();

if (currentPage.includes("OpeningPage.html")) {
    const onSubmitOpeningPage = (e) => {
        e.preventDefault()
        if (emailInput.value === '' || passwordInput.value === '') {
            console.log('error')
            msg.innerHTML = 'יש למלא את כל השדות'
            msg.classList.add('error')
        } else {
            console.log('success')
            const li = document.createElement('li')
            li.innerHTML = `${passwordInput.value}: ${emailInput.value}`
            passwordInput.value = ''
            emailInput.value = ''
            msg.innerHTML = ''
            msg.classList.remove('error')
            window.location.href = "../views/WelcomePage.html";
        }
    }
    myForm.addEventListener('submit', onSubmitOpeningPage)
}

if (currentPage.includes("NevigationPage.html")) {
    const onSubmitNeviPage = (e) => {
        e.preventDefault()
        if (buildingSelect.value === '') {
            console.log('error')
            msg.innerHTML = 'יש לבחור מספר בניין'
            msg.classList.add('error')
        } else {
            console.log('success')
            buildingSelect.value = ''
            msg.classList.remove('error')
            window.location.href = "https://goo.gl/maps/1nCDhZpYxUyUt4m5A";
        }
    }
    myForm.addEventListener('submit', onSubmitNeviPage)
}


if (currentPage.includes("SearchPage.html")) {
    const onSubmitSearchPage = (e) => {
        e.preventDefault()
        if (buildingInput.value === '' || dateInput.value === '' || startInput.value === '' || endInput.value === '') {
            console.log('error')
            msg.innerHTML = 'יש למלא את כל השדות'
            msg.classList.add('error')
        } else {
            console.log('success')
            buildingInput.value = ''
            dateInput.value = ''
            startInput.value = ''
            endInput.value = ''
            msg.innerHTML = ''
            msg.classList.remove('error')
            window.location.href = "../views/results.html";
        }
    }
    myForm.addEventListener('submit', onSubmitSearchPage)
}

function  okmsg (){
    if (window.confirm("הכיתה שוריינה")) {
      window.location.href = "../views/WelcomePage.html";
    }
}


function  ordermsg (){
    if (window.confirm("ההזמנה נשלחה")) {
      window.location.href = "../views/WelcomePage.html";
    }
}