const myForm = document.querySelector('.my_form');
const emailOpenInput = document.querySelector('#emailOpen');
const passwordOpenInput = document.querySelector('#passwordOpen');
const emailsingInput = document.querySelector('#emailsing');
const passwordsingInput = document.querySelector('#passwordsing');
const password2Input = document.querySelector('#password2');
const firstnameInput = document.querySelector('#firstname');
const lastnameInput = document.querySelector('#lastname');
const msg = document.querySelector('.msg');
const userList = document.querySelector('.users');
const buildingInput = document.querySelector('#serchBuilding');
const dateInput = document.querySelector('#date');
const startInput = document.querySelector('#start');
const endInput = document.querySelector('#end');
const boxInput = document.querySelector('#box');
const buildingSelect = document.getElementById('buildingSelect');
var currentPage = window.location.pathname;
const MSGSERVER = document.getElementById('#MSGSERVER');

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

if (currentPage.includes('OpeningPage')) {
    const onSubmitOpeningPage = (e) => {
        if (emailOpenInput.value === '' || passwordOpenInput.value === '') {
            console.log('error')
            msg.innerHTML = 'יש למלא את כל השדות'
            msg.classList.add('error')
            e.preventDefault()
        } else {
            if (emailOpenInput.value.includes('@post.bgu.ac.il')){
                console.log('success')
                msg.innerHTML = ''
                msg.classList.remove('error')
                window.location.href = "http://localhost:3000/WelcomePage";
            } else{
                console.log('error')
                msg.innerHTML = 'המייל שהוכנס הוא לא מייל אוניברסיטאי'
                msg.classList.add('error')
                e.preventDefault()
            }

        }
    }
    myForm.addEventListener('submit', onSubmitOpeningPage)
}

if (currentPage.includes('FindStudent')) {
    const onSubmitOpeningPage = (e) => {
        if (emailOpenInput.value === '' || passwordOpenInput.value === '') {
            console.log('error')
            msg.innerHTML = 'יש למלא את כל השדות'
            msg.classList.add('error')
            e.preventDefault()
        } else {
            if (emailOpenInput.value.includes('@post.bgu.ac.il')){
                console.log('success')
                msg.innerHTML = ''
                msg.classList.remove('error')
                window.location.href = "http://localhost:3000/WelcomePage";
            } else{
                console.log('error')
                msg.innerHTML = 'המייל שהוכנס הוא לא מייל אוניברסיטאי'
                msg.classList.add('error')
                e.preventDefault()
            }

        }
    }
    myForm.addEventListener('submit', onSubmitOpeningPage)
}

if (currentPage.includes('NevigationPage')) {
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


if (currentPage.includes('SearchPage')) {
    const onSubmitSearchPage = (e) => {
        if (buildingInput.value === '' || dateInput.value === '' || startInput.value === '' || endInput.value === '') {
            console.log('error')
            msg.innerHTML = 'יש למלא את כל השדות'
            msg.classList.add('error')
            e.preventDefault()
        } else {
            let classwont={
                building: `${buildingInput.value}`,
                date: `${dateInput.value}`,
                start: `${startInput.value}`,
                end: `${endInput.value}`,
                box: `${boxInput.value}`
            }
            let classwontJson=JSON.stringify(classwont)
            document.cookie= `classwont=` +  classwontJson;
            
            console.log(document.cookie)
            console.log('success')
            msg.classList.remove('error')
        }
    }
    myForm.addEventListener('submit', onSubmitSearchPage)
}

if (currentPage.includes('SingUpPage')) {
    const onSubmitSingUpPage = (e) => {
        if (firstnameInput.value === '' ||lastnameInput.value === '' ||emailsingInput.value === '' || passwordsingInput.value === ''|| password2Input.value === '') {
            console.log('error')
            msg.innerHTML = 'יש למלא את כל השדות'
            msg.classList.add('error')
            e.preventDefault()
        } else {
            if (emailsingInput.value.includes('@post.bgu.ac.il')){
                if(passwordsingInput.value!=password2Input.value){
                    console.log('error')
                    msg.innerHTML = 'הסיסמאות שהוזנו לא זהות'
                    msg.classList.add('error') 
                    e.preventDefault()
                } else {
                    console.log('success')
                    msg.innerHTML = ''
                    msg.classList.remove('error')
                    window.location.href = "http://localhost:3000/OpeningPage";
                }
            } else{
                console.log('error')
                msg.innerHTML = 'המייל שהוכנס הוא לא מייל אוניברסיטאי'
                msg.classList.add('error')
                e.preventDefault()
            }

        }
    }
    myForm.addEventListener('submit', onSubmitSingUpPage)
}

if (currentPage.includes('NewStudent')) {
    const onSubmitSingUpPage = (e) => {
        if (firstnameInput.value === '' ||lastnameInput.value === '' ||emailsingInput.value === '' || passwordsingInput.value === ''|| password2Input.value === '') {
            console.log('error')
            msg.innerHTML = 'יש למלא את כל השדות'
            msg.classList.add('error')
            e.preventDefault()
        } else {
            if (emailsingInput.value.includes('@post.bgu.ac.il')){
                if(passwordsingInput.value!=password2Input.value){
                    console.log('error')
                    MSGSERVER.innerHTML = ''
                    msg.innerHTML = 'הסיסמאות שהוזנו לא זהות'
                    msg.classList.add('error') 
                    e.preventDefault()
                } else {
                    console.log('success')
                    msg.innerHTML = ''
                    msg.classList.remove('error')
                    window.location.href = "http://localhost:3000/OpeningPage";
                }
            } else{
                console.log('error')
                msg.innerHTML = 'המייל שהוכנס הוא לא מייל אוניברסיטאי'
                msg.classList.add('error')
                e.preventDefault()
            }

        }
    }
    myForm.addEventListener('submit', onSubmitSingUpPage)
}


function  choosemsg (building1, class1, date1, start1, end1){
    if (window.confirm("הכיתה שוריינה")) {
        let choosenClass = {
            building: `${building1}`,
            class: `${class1}`,
            date:`${date1}`,
            start: `${start1}`,
            end:`${end1}`
        }
        let choosenClassJson=JSON.stringify(choosenClass)
        document.cookie= `choosenClass=` + encodeURIComponent(choosenClassJson);
        
      window.location.href = "http://localhost:3000/ChoosenClass";
    }
}

function  ordermsg (){
    if (window.confirm("ההזמנה נשלחה")) {
      window.location.href = "http://localhost:3000/WelcomePage";
    }
}

let x1=0;
let price1=16;
let x2=0;
let price2=10;
let x3=0;
let price3=14;
let x4=0;
let price4=9;
let x5=0;
let price5=39;
let x6=0;
let price6=44;
let x7=0;
let price7=32;
let x8=0;
let price8=40;

function increment (id) {
    let count = document.getElementById(`${id}`);
    if (id===1){
        x1= x1+1;
        count.textContent = `${x1}`;
    }
    if (id===2){
        x2= x2+1;
        count.innerHTML = `${x2}`;
    }
    if (id===3){
        x3= x3+1;
        count.innerHTML = `${x3}`;
    }
    if (id===4){
        x4= x4+1;
        count.innerHTML = `${x4}`;
    }
    if (id===5){
        x5= x5+1;
        count.innerHTML = `${x5}`;
    }
    if (id===6){
        x6= x6+1;
        count.innerHTML = `${x6}`;
    }
    if (id===7){
        x7= x7+1;
        count.innerHTML = `${x7}`;
    }
    if (id===8){
        x8= x8+1;
        count.innerHTML = `${x8}`;
    }
}
function decrement  (id) {
    let count = document.getElementById(`${id}`);
    if (id===1){
        if(x1!=0){
            x1= x1-1;
            count.innerHTML = `${x1}`;
        }
    }
    if (id===2){
        if(x2!=0){
            x2= x2-1;
            count.innerHTML = `${x2}`;
        }
    }
    if (id===3){
        if(x3!=0){
            x3= x3+1;
            count.innerHTML = `${x3}`;
        }
    }
    if (id===4){
        if(x4!=0){
            x4= x4+1;
            count.innerHTML = `${x4}`;
        }
    }
    if (id===5){
        if(x5!=0){
            x5= x5+1;
            count.innerHTML = `${x5}`;
        }
    }
    if (id===6){
        if(x6!=0){
            x6= x6+1;
            count.innerHTML = `${x6}`;
        }
    }
    if (id===7){
        if(x7!=0){
            x7= x7+1;
            count.innerHTML = `${x7}`;
        }
    }
    if (id===8){
        if(x8!=0){
            x8= x8+1;
            count.innerHTML = `${x8}`;
        }
    }
}

if (currentPage.includes('AromaOrder')) {
    for (let i of [1,2,3,4,5,6,7,8]){
        let count = document.getElementById(`${i}`);
        if (i===1){
            count.innerHTML = `${x1}`;
        }
        if (i===2){
            count.innerHTML = `${x2}`;
        }
        if (i===3){
            count.innerHTML = `${x3}`;
        }
        if (i===4){
            count.innerHTML = `${x4}`;
        }
        if (i===5){
            count.innerHTML = `${x5}`;
        }
        if (i===6){
            count.innerHTML = `${x6}`;
        }
        if (i===7){
            count.innerHTML = `${x7}`;
        }
        if (i===8){
            count.innerHTML = `${x8}`;
        }
    }
}

function getOrder(){
    let shoppingBag = [{
        name: `שוקו חם`,
        price: "16.00₪",
        count:`${x1}`,
        sum: `${x1*price1}`+".00₪"
    },{
        name: "תה",
        price: "10.00₪",
        count:`${x2}`,
        sum: `${x2*price2}`+".00₪"
    },{
        name: "הפוך",
        price: "14.00₪",
        count:`${x3}`,
        sum: `${x3*price3}`+".00₪"
    },{
        name: "אספרסו",
        price: "9.00₪",
        count:`${x4}`,
        sum: `${x4*price4}`+".00₪"
    },{
        name: "סלט חלומי",
        price: "39.00₪",
        count:`${x5}`,
        sum: `${x5*price5}`+".00₪"
    },{
        name: "סלט טונה",
        price: "44.00₪",
        count:`${x6}`,
        sum: `${x6*price6}`+".00₪"
    },{
        name: "כריך חביתה",
        price: "32.00₪",
        count:`${x7}`,
        sum: `${x7*price7}`+".00₪"
    },{
        name: "כריך סלמון",
        price: "40.00₪",
        count:`${x8}`,
        sum: `${x8*price8}`+".00₪"
    },{
        name: 'סה"כ',
        price: "",
        count:`${x1+x2+x3+x4+x5+x6+x7+x8}`,
        sum: `${x1*price1+x2*price2+x3*price3+x4*price4+x5*price5+x6*price6+x7*price7+x8*price8}`+".00₪"
    }]
    let shoppingBagJson=JSON.stringify(shoppingBag)
    let utf8Bytes = new TextEncoder().encode(shoppingBagJson);
    let utf8String = new TextDecoder().decode(utf8Bytes);

    document.cookie= `shoppingBagString=` + encodeURIComponent(utf8String);
    window.location.href = "http://localhost:3000/OrderDetails";

}



