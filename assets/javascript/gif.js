// Initial array of comics
      var comics = ["Jim Gaffigan", "Jerry Seinfeld", "George Carlin", "Richard Pryor", "Chris Rock", "Robin Williams", "Dave Chappelle", "Bill Hicks", "Steve Martin", "Steven Wright", "Sam Kinison", "Red Foxx", "Andy Kaufman"];

      // Function for dumping the JSON content for each button into the div
      function displayComics() {

        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(topicImage);
            gifDiv.prepend(p);

            $("#lineup-gif").prepend(gifDiv);

          renderButtons();
        }});
      }

      // Function for displaying movie data
      function renderButtons() {

        $("#buttons-view").empty();

        // Looping through the array of comics
        for (var i = 0; i < comics.length; i++) {

          var a = $("<button>");

          a.addClass("comic");
          // Adding a data-attribute
          a.attr("data-topic", comics[i]);
          // Providing the initial button text
          a.text(comics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-comic").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var comic = $("#comic-input").val().trim();

        // Adding the comic from the textbox to our array
        comics.push(comic);
        console.log(comics);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Function for displaying the comic info
      // Using $(document).on to add event listeners to dynamically generated elements
      $(document).on("click", ".comic", displayComics);

      // Calling the renderButtons function to display the initial buttons
      renderButtons();