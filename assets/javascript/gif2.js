    var comedians = ["Jim Gaffigan", "Jerry Seinfeld", "George Carlin", "Richard Pryor", "Chris Rock", "Robin Williams", "Dave Chappelle", "Bill Hicks"];
    var numGifs = 7;
    var rating = "PG";

      // Function for dumping the JSON content for each button into the div
      function displayComedians() {

        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10" + rating + "&limit=" + numGifs;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var displayDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var caps = rating.toUpperCase();

            var p = $("<p>").text("Rating: " + caps);

            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.addClass("state-change");
            topicImage.attr("state", "still");
            topicImage.attr("still-data", results[i].images.fixed_height_still.url);
            topicImage.attr("animated-data", results[i].images.fixed_height.url);

            displayDiv.prepend(topicImage);
            displayDiv.prepend(p);

            $("#show-gif").prepend(displayDiv);

            $(".state-change").unbind("click");
            $(".state-change").on("click", function(){
            if($(this).attr("state") === "still") {
              $(this).attr("state", "animated");
              $(this).attr("src", $(this).attr("animated-data"));
            }   
            else {
              $(this).attr("state", "still");
              $(this).attr("src", $(this).attr("still-data"));
            }
          });

          displayButtons();

        }});
      }

      function displayButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < comedians.length; i++) {

          var a = $("<button>");

          a.addClass("comedian");

          a.attr("data-topic", comedians[i]);

          a.text(comedians[i]);

          $("#buttons-view").append(a);
        }
      }

      $("#add-comedian").on("click", function(event) {
        event.preventDefault();

        var comedian = $("#comedian-input").val().trim();

        comedians.push(comedian);
        console.log(comedians)

        displayButtons();
      });

      $(document).on("click", ".comedian", displayComedians);
      $("#buttons-view").empty();
      
      displayButtons();  
      
