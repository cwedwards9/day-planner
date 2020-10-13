// get saved scores from localstorage or if not any set to array of empty objects
    const events =  JSON.parse(localStorage.getItem("events")) ||
    [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}];


// get the current date and display it in the jumbotron
    let now = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(now);


// iterate through the loop to add each row hour to the calendar (9-5 work day, 9 rows)
    for(let i = 0; i < 9; i++){
        // create a div and append it to the div container
        let hourRow = $("<div>");
        hourRow.attr("id", "row" + i);
        hourRow.addClass("row");
        $("div.container").append(hourRow);

        // extract time from var i and format it to display
        let time = i + 9;
        let formattedTime  = moment().hour(time).format("h A");

        // find the relative tense of the time (past, present, future)
        let relativeTime = getRelativeTime(time);
        
        // append the time to the row
        let hour = $("<p>" + formattedTime + "</p>");
        hour.addClass("hour");
        $(hourRow).append(hour);

        // append the text area to the row
        let txtEvent = $("<textarea>");
        txtEvent.addClass("description");
        txtEvent.addClass(relativeTime);
        txtEvent.attr("data", i);
        txtEvent.val(events[i].text);
        $(hourRow).append(txtEvent);

        // append a button to the row
        let saveBtn = $("<button>" + "<i class='fas fa-save'></i>" + "</button>");
        saveBtn.addClass("saveBtn");
        $(hourRow).append(saveBtn);
    }


// clicking the save button will save/overwrite the respective textarea's text and save to the local storage
    $("div.container").on("click", "button", function(){
        let event = $(this).prev();
        let index = event.attr("data");
        let text = event.val();
        events[index].text = text;
        alert("Event saved!");

        localStorage.setItem("events", JSON.stringify(events));
    })


// get the current time (hour) and compare it to each hour row to dynamically change the color
    function getRelativeTime(time){
        // get current hour in H format (0 - 23 hour intervals)
        let currentHour = moment().format("H");
        let relTime;
        
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
