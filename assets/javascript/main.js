$(document).ready(function(){
    // Initial array of cars
    var cars = ["BMW", "Audi", "Nissan", "Mercedes", "Toyota", "Ferrari", "Tesla"];

    // displayCars function re-renders the HTML to display the appropriate content
    function displayCars() {

      var car = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=Tk2mLARweoYJWTJAPK2FuQMAniiqSHCZ&limit=10";

      // Creates AJAX call for the specific car button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){
        $("#carView").empty();

        var results = response.data;

        // Retrieves the Rating Data
        console.log(response);

        // Loops for limit 10
        for(var i = 0; i < results.length; i++) {

          // Creates a div to hold the car
          var carDiv = $("<div>");

          // Make the class for style.css
          carDiv.addClass("carpictures");

          // Creates an element to have the rating displayed
          var rating = results[i].rating;
          var p = $("<h2>").text("Rating: " + rating);

          // The Images can still or animate to call the class "carImage" for click.
          var carImage = $("<img>");
          carImage.attr("src", results[i].images.fixed_height_still.url);
          carImage.attr("data-still", results[i].images.fixed_height_still.url);
          carImage.attr("data-animate", results[i].images.fixed_height.url);
          carImage.attr("data-state", "still");
          carImage.addClass('carImage');

          // Displays the rating
          carDiv.prepend(p);

          // Displays the car Image
          carDiv.prepend(carImage);
          $("#carView").prepend(carDiv);
        }

        //if the variable state is equal to 'still',
        // then update the src attribute of this image to it's data-animate value,
        // and update the data-state attribute to 'animate'.
        // If state does not equal 'still', then update the src attribute of this
        // image to it's data-animate value and update the data-state attribute to 'still'
        $(".carImage").on("click", function() {
          var state = $(this).attr("data-state");
          console.log(state);

          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });        
    }

    // Function for displaying car data
    function renderButtons() {

      // Deletes the car prior to adding new car
      // (this is necessary otherwise you will have repeat buttons)
      $("#carButtons").empty();

      for(var i = 0; i < cars.length; i++) {

        // Then dynamicaly generates buttons for each car in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var carAdd = $("<button>");

        // Adds a class of car to our button
        carAdd.addClass("car");

        // Added a data-attribute
        carAdd.attr("data-name", cars[i]);

        // Provided the initial button text
        carAdd.text(cars[i]);

        // Added the button to the buttons-view div
        $("#carButtons").append(carAdd);
      }
    }

    // This function handles events where the add car button is clicked
    $("#add-car").on("click", function(event){
      event.preventDefault();

      // This line of code will grab the input from the textbox
      var car = $("#car-input").val().trim();

      // The anime from the textbox is then added to our array
      cars.push(car);

      // Calling renderButtons which handles the processing of our cars array
      renderButtons();
    });

    // Adding click event listeners to all elements with a class of "car"
    $(document).on("click", ".car", displayCars);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});
