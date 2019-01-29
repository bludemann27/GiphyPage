$(document).ready(function() {
    //Array for searched topics to be added
    var topics = [];
    
         function displaySports() {
    
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var sportDiv = $("<div class='col-md-4'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var sportImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                sportImage.attr("src", staticSrc);
                sportImage.addClass("sportGiphy");
                sportImage.attr("data-state", "still");
                sportImage.attr("data-still", staticSrc);
                sportImage.attr("data-animate", defaultAnimatedSrc);
                sportDiv.append(p);
                sportDiv.append(sportImage);
                $("#gifArea").prepend(sportDiv);
    
            }
        });
    }
    
        $("#addSport").on("click", function(event) {
            event.preventDefault();
            var newSport = $("#sportInput").val().trim();
            topics.push(newSport);
            console.log(topics);
            $("#sportInput").val('');
            displayButtons();
          });
    
        function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "sport");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#myButtons").append(a);
        }
      }
    
    
      displayButtons();
    
      $(document).on("click", "#sport", displaySports);
    
      $(document).on("click", ".sportGiphy", pausePlayGifs);
    
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });