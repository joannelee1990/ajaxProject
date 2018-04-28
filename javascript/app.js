$( document ).ready(function() {
      
      var holidayArray = ["Christmas", "Memorial Day", "New Year's Day", "Labor Day"];

      function displayHolidayInfo() {

        var holiday = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + holiday + "&api_key=" +  "8IwdnFwp4mklQyuzTtWVvirJG6LtoNwi" + "&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var holidayResp = response.data;
             $("#gif-go-here").empty();

            for (var i = 0; i < holidayResp.length; i++) {    
                var rating = holidayResp[i].rating;
                var still = holidayResp[i].images.fixed_height_still.url;
                var animated = holidayResp[i].images.fixed_height.url;
                    stillGif = $("<img>"); 
                    stillGif.attr("src", still);
                    stillGif.attr("data-still", still);
                    stillGif.attr("data-animate", animated);
                    stillGif.attr("data-state", "still");
                    stillGif.addClass("holiday-image");
                    $("#gif-go-here").append(stillGif);
                    $("#gif-go-here").append("Rating: " + rating); 
                    
                    var gifDiv = $("<div class='item'>");
                    var gifImage = $("<img>");
                    gifImage.attr("src", holidayResp[i].images.fixed_height.url);
                    gifDiv.append(gifImage);
                    gifDiv.attr("src");
                        
            }  
           
        });
};

$( document ).on("click", ".holiday-image", function() {
        var newItem = $(this).attr("data-state");
        console.log(newItem);
        if (newItem === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
});

function renderButton() {
    
    for (var i = 0; i < holidayArray.length; i++) {
        var btn = $("<button>"); 
            btn.text(holidayArray[i]);
            $("#buttons-view").append(btn);     
            btn.addClass("btn btn-primary holbut");
            btn.attr("data-name", holidayArray[i]);
    }
}

renderButton();

$(document).on("click", ".holbut", displayHolidayInfo);
    $("#add-holiday").on("click", function(event) {
        $("#buttons-view").empty();
        event.preventDefault();

        var holiday = $("#holiday-input").val().trim();
        holidayArray.push(holiday);
        renderButton ();
    });

}); 