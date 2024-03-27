if(prompt('Enter the password') != 'ShresthDiary'){
    document.body.style.display = 'none'
    alert('Wrong Password')
}
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("inputdate").value = today;

database = firebase.database()
function isDateGreaterThanToday(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate > today;
}
function isDateToday(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    // Compare the input date with today's date
    return inputDate.getTime() === today.getTime();
}
function submit(){
    date = document.getElementById('inputdate').value;
    if(isDateGreaterThanToday(date) && !isDateToday(date)){
        alert('The given date is in furure.')
        return
    }
    content = document.getElementById('inputtext').value;
    database.ref('Diary/' + date).once('value', function(data){
        if(data.val()==null){
            database.ref('Diary/' + date).update({
                content:content
            })
            alert('Written data to '+date)
            document.getElementById('inputtext').value = '';
        }
        else if(prompt('It already exists. Enter the password to override') == 'ShresthDiary'){
            database.ref('Diary/' + date).update({
                content:content
            })
            alert('Written data to '+date)
            document.getElementById('inputtext').value = '';
        }
    })
}
function read(){
    window.open('read.html', '_top')
}