// variable to store and loop through scheduler
var myDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        timeofday: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        timeofday: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        timeofday: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        timeofday: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        timeofday: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        timeofday: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        timeofday: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        timeofday: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        timeofday: "pm",
        reminder: ""
    },
    
]

//Display Date on Header
function displayDate() {
    var date = moment().format('dddd, MMMM DD YYYY')
    $("#currentDay").text(date);
}

//Save Data on localstorage
function saveData() {
    localStorage.setItem("myDay",JSON.stringify(myDay));

}

//Display Hours on Agenda
function displayHour() {
    myDay.forEach(function (_thisHour){
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}
// sets any existing localStorage data to the view if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveData();
    displayHour();
}

//Display Date on Header
displayDate();

// Create Agenda
myDay.forEach(function(thisHour){
    var Hours = $("<form>").attr({
        "class": "row"
    });

    $(".container").append(Hours)
    
    // Create Time Block
    var HourContainer = $("<div>")
    .text(`${thisHour.hour}${thisHour.timeofday}`)
    .attr({"class":"col-md-2 hour"
    });
    
    // Create Plan Block
    var planBlock = $("<div>")
    .attr({
        "class":"col-md-9 description p-0" 
    });
    var planInput =$("<textarea>");
    planBlock.append(planInput);
    planInput.attr("id", thisHour.id);

    // Identify if time block is past
    if (thisHour.time < moment().format("HH")) {
        planInput.attr({
            "class" : "past",
        })
     } else if (thisHour.time === moment().format("HH")){
            planInput.attr({
                "class" : "present"
            })
        } else if (thisHour.time > moment().format("HH")){
            planInput.attr({
                "class" : "future"
            })
    }
    // Save Button
var saveBtn = $("<i class='far fa-save fa-lg'></i>");
var saveData = $("<button>")
                .attr({
                    "class" : "col-md-1 saveBtn"
});
    saveData.append(saveBtn)
    Hours.append(HourContainer, planBlock, saveData)
    });
// Load Form
init();

// saves data to be used in localStorage
$(".saveBtn").on("click", function(e) {
    e.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveData();
    displayHour();
})

