// get the current date and display it in the jumbotron
    var now = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(now);


// empty the div and then iterate through to add each row hour to the calendar
    $("div.container").empty();
    for(var i = 0; i < 9; i++){
        var hourRow = $("<div>");
        hourRow.attr("id", "row" + i);
        hourRow.addClass("row");
        $("div.container").append(hourRow);

        // append the time for each row
        var hour = $("<p>" + "10:00 AM" + "</p>");
        hour.addClass("hour");
        $(hourRow).append(hour);

        // append the text area for each row
        var txtEvent = $("<textarea>");
        txtEvent.addClass("description");
        $(hourRow).append(txtEvent);

        // append a button for each row
        var saveBtn = $("<button>" + "<i class='fas fa-save'></i>" + "</button>");
        saveBtn.addClass("saveBtn");
        $(hourRow).append(saveBtn);
    }

