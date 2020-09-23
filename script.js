// get saved scores from localstorage or if not any set to array of empty objects
    var events =  JSON.parse(localStorage.getItem("events")) ||
    [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""},];


// get the current date and display it in the jumbotron
    var now = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(now);


// iterate through the loop to add each row hour to the calendar
    for(var i = 0; i < 9; i++){
        // create a div and append it to the div container
        var hourRow = $("<div>");
        hourRow.attr("id", "row" + i);
        hourRow.addClass("row");
        $("div.container").append(hourRow);

        // extract time from var i and format it
        var time = i + 9;
        var formattedTime = moment().hour(time).format("h A");
        // find the relative tense of the time
        var relativeTime = getRelativeTime(time);
        
        // append the time to the row
        var hour = $("<p>" + formattedTime + "</p>");
        hour.addClass("hour");
        $(hourRow).append(hour);

        // append the text area to the row
        var txtEvent = $("<textarea>");
        txtEvent.addClass("description");
        txtEvent.addClass(relativeTime);
        txtEvent.attr("data", i);
        txtEvent.val(events[i].text);
        $(hourRow).append(txtEvent);

        // append a button to the row
        var saveBtn = $("<button>" + "<i class='fas fa-save'></i>" + "</button>");
        saveBtn.addClass("saveBtn");
        $(hourRow).append(saveBtn);
    }


// clicking the save button will save/overwrite the respective textarea's text and save to the local storage
    $("div.container").on("click", "button", function(){
        var event = $(this).prev();
        var index = event.attr("data");
        var text = event.val();
        events[index].text = text;
        alert("Event saved!");

        localStorage.setItem("events", JSON.stringify(events));
    })


// get the current time (hour) and compare it to each hour row to dynamically change the color
    function getRelativeTime(time){
        var currentHour = moment().format("h");
        var relTime;
        if(time < currentHour){
            relTime = "past";
        } 
        else if(time == currentHour){
            relTime = "present";
        } 
        else if(time > currentHour) {
            relTime = "future";
        }
        return relTime;
    }
