const EVENTS = {
    // september
    8: {
        21: {
        type: "office-hours",
        },
        22: {
        type: "homework",
        description: "Homework 1 Due",
        },
        24: {
        type: "office-hours",
        },
        28: {
        type: "homework",
        description: "Homework 2 Due",
        },
        30: {
        type: "lab",
        description: "Lab 1 Due",
        },
    },
    // october
    9: {
        3: {
        type: "office-hours",
        },
        4: {
        type: "homework",
        description: "Homework 3 Due",
        },
        5: {
        type: "lab",
        description: "Lab 2 Due",
        },
        10: {
        type: "office-hours",
        },
        13: {
        type: "quiz",
        description: "Quiz 1",
        },
        16: {
        type: "homework",
        description: "Homework 4 due",
        },
        17: {
        type: "office-hours",
        },
        19: {
        type: "lab",
        description: "Lab 3 Due",
        },
        24: {
        type: "office-hours",
        },
        28: {
        type: "homework",
        description: "Homework 5 due",
        },
    },
    // november
    10: {
        6: {
        type: "office-hours",
        },
        7: {
        type: "homework",
        description: "Homework 6 due",
        },
        9: {
        type: "lab",
        description: "Lab 4 Due",
        },
        13: {
        type: "office-hours",
        },
        16: {
        type: "lab",
        description: "Lab 5 Due",
        },
        21: {
        type: "homework",
        description: "Homework 7 due",
        },
        22: {
        type: "quiz",
        description: "Quiz 2",
        },
        30: {
        type: "office-hours",
        },
    },
    // december
    11: {
        1: {
        type: "lab",
        description: "Lab 6 Due",
        },
        2: {
        type: "quiz",
        description: "Quiz 3",
        },
        4: {
        type: "homework",
        description: "Homework 8 due",
        },
    },
};


function resetCalendar(){
    let calendartDates = document.querySelectorAll("td");
    console.log(calendartDates);
    for(let i = 0; i < calendartDates.length; i++){
        calendartDates[i].innerHTML = " " ;
    }

    const legend = document.querySelectorAll('.legend ul li span')
    for(let j = 0; j < legend.length; j++){
        legend[j].innerText = "0"
    }
}

function initializeCalendarDate(date){
    let startDate = DateFns.startOfMonth(date)
    let startDay = startDate.getDate();
    let startWeekDay = startDate.toString().substring(0,3)

    let endDate = DateFns.endOfMonth(date)
    let endDay = endDate.getDate();
    let month = date.getMonth()
    let weekDays = document.querySelectorAll('thead th')

    let max, k
    let Complete = false, addRow = false, foundFirstDay = false;
    let i = 0, count = 0, dayOne = NaN
    while(!Complete){
        let calendarRows = document.querySelectorAll('tbody tr')
        console.log('i:',i)
        console.log(foundFirstDay)

        if(foundFirstDay){
            if(addRow){
                console.log('needed new row ...')
                const tr = document.createElement('tr') 
                for(let j  = 0; j < endDay - max;j++ ){
                    const td = document.createElement('td')
                    const tempDay = max + j + 1
                    td.innerHTML =`<span>${tempDay}</span>`
                    console.log(td)
                    tr.appendChild(td)
                    console.log(tr)
                }

                for(let j  = 0; j < 7 - (endDay - max);j++ ){
                    const td = document.createElement('td')
                    const tempDay = " "
                    td.innerHTML =`<span>${tempDay}</span>`
                    console.log(td)
                    tr.appendChild(td)
                    console.log(tr)
                }
                
                document.querySelector('.calendar-wrapper tbody').appendChild(tr)
                Complete = true
            }else{
                console.log('rest of the calendar...')
                
                for(k = 0; k < calendarRows.length; k++){
                    let currentDate = (i - dayOne + 1) + k * 7
                    let currentDateID = `id = ${currentDate}`
                    if((i < dayOne && k == 0)){
                        console.log('in front of week day ...')
                        calendarRows[k].querySelectorAll('td')[i].innerHTML = `<span ${currentDateID}></span>`
                    }else if( currentDate > endDay){
                        calendarRows[k].querySelectorAll('td')[i].innerHTML = `<span ${currentDateID}></span>`
                    }else if(currentDate == new Date().getDate() && month == new Date().getMonth()){
                        calendarRows[k].querySelectorAll('td')[i].innerHTML = `<span ${currentDateID} class="today">${currentDate}<span class="today-pointer"></span></span>`
                    }else{
                        calendarRows[k].querySelectorAll('td')[i].innerHTML = `<span ${currentDateID}>${currentDate}</span>`
                    }
                }
                count = count + 1;
                console.log('count:' + count)
                let length = parseInt(calendarRows[k-1].querySelectorAll('td').length - 1)
                if(count >= 7){
                    console.log("i == length")
                    max = parseInt(calendarRows[k-1].querySelectorAll('td')[6].innerText)
                    console.log(max)
                    if(max < endDay){
                        addRow = true
                        console.log("addRow:"+ addRow)
                    }else{
                        Complete = true
                    }
                }
                
            }
        }else{
            if(weekDays[i].id == startWeekDay){
                console.log('found first weekday...')
                let currentDate = startDay + k*7
                let currentDateID = `id = ${currentDate}`
                dayOne = i
                for(k = 0; k < calendarRows.length; k++){
                    if(currentDate == new Date().getDate() && month == new Date().getMonth()){
                        calendarRows[k].querySelectorAll('td')[i].innerHTML = `<span ${currentDateID} class="today">${currentDate}</span>`
                    }else{
                        calendarRows[k].querySelectorAll('td')[i].innerHTML = `<span ${currentDateID}>${currentDate}</span>`
                    }
                }
                foundFirstDay = true
            }
        }

        i = (i + 1) % 7
    }
}

function populateCalendarEvents(){
    const month = document.querySelector('input[type="radio"]:checked').dataset.month
    console.log(month)
    console.log(EVENTS[month])
    for(let i = 0 ; i < Object.keys(EVENTS[month]).length; i++){
        let index = parseInt(Object.keys(EVENTS[month])[i])
        const eventDay = document.getElementById(index)
        console.log(eventDay)
        eventDay.classList.add(`${EVENTS[month][index].type}`)
        document.querySelector(`.legend ul li span.${EVENTS[month][index].type}`).innerText = parseInt(document.querySelector(`.legend ul li span.${EVENTS[month][index].type}`).innerText) + 1
    }
}

function updateCalendar(date = new Date()){
    resetCalendar();
    initializeCalendarDate(date);
    populateCalendarEvents();
}

function initializeButtons(selected = new Date().getMonth()){
    let inputs = document.querySelectorAll('input[name = "month"]');
    inputs.forEach((input) =>{
        const month = input.dataset.month
        input.addEventListener('click', function(){
            
            updateCalendar(new Date(new Date().getFullYear(),month))
        })
        if(selected == month){
            console.log('select button...')
            input.checked = true
        }
    })
}

function markToday(){
    const date = new Date()
    let day = date.getDate();
    let weekDay = date.toString().substring(0,3);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
}

function main(){
    initializeButtons()
    markToday()
    updateCalendar()
}


window.addEventListener('load',main)

