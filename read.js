if(prompt('Enter the password') != 'ShresthDiary'){
    document.body.style.display = 'none'
    alert('Wrong Passwrod')
}
let width = window.innerWidth;
let height = window.innerHeight;

if (width / height > 1) {
    document.getElementById('css').href = 'read1.css';
}
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("from").value = today;
document.getElementById("to").value = today;


function rangeDates(startDateStr, endDateStr) {
    var startDate = new Date(startDateStr);
    var endDate = new Date(endDateStr);
    var dateArray = [];
    for (var date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        dateArray.push(date.toISOString().slice(0, 10));
    }
    return dateArray;
}
function getDay(date){
    let daysInMonthleap = {
        1:0,
        2:31, 
        3:60,
        4:91,
        5:121, 
        6:152, 
        7:182,
        8:213, 
        9:243, 
        10:274, 
        11:304, 
        12:335 
    }
    let daysInMonth={
        1:0, 
        2:31, 
        3:59, 
        4:90, 
        5:120, 
        6:151, 
        7:182, 
        8:212, 
        9:242, 
        10:273, 
        11:303, 
        12:334
    }
    let daysdict = {
        0:"Sunday",
        1:"Monday", 
        2:"Tuesday", 
        3:"Wednesday", 
        4:"Thursday", 
        5:"Friday", 
        6:"Saturday"
    }
    let [y, m, d] = date.split('-')
    let days = 0
    for(let i=2018;i<y;i++){
        if(i%4==0){
            days+=366
        }
        else{
            days+=365
        }
    }
    if(y%4 == 0){
        days += Number.parseInt(daysInMonthleap[Number.parseInt(m)])
    }
    else{
        days += Number.parseInt(daysInMonth[Number.parseInt(m)])
    }
    days += Number.parseInt(d)
    let day = Number.parseInt(days)%7
    day = daysdict[day]
    return day
}

database = firebase.database()
function submit(){
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let days = rangeDates(from, to)
    document.getElementById('contentmaindiv').innerHTML = '';
    for(let i of days){
            database.ref('Diary/'+i).once('value', function (data){
                let content
                try{
                    content = data.val().content
                }
                catch{
                    content = ''
                }
                let day = getDay(i)
                let [y, m , d] = i.split('-')
                let date = d + '-' + m + '-' + y;
                let div = document.createElement('div')
                div.classList.add('contentdiv')
                let head = document.createElement('h1')
                head.classList.add('contenthead')
                head.innerHTML = date + '  ||  ' + day
                let para = document.createElement('p')
                para.innerHTML = content
                para.classList.add('contentpara')
                div.appendChild(head)
                div.appendChild(para)
                document.getElementById('contentmaindiv').appendChild(div)
            })
    }
}
function write1(){
    window.open('index.html', '_top')
}