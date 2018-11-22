var topicArr = ["laughing", "crying", "happy", "regrets"]

function makeButton() {
    // .empty deletes movie buttons prior to adding new ones
    // so there are no repeats
    $("#buttons-view").empty();

    topicArr.forEach(function (i) {
        var button = $("<button>");
        button.addClass("topic");
        button.attr("data-name", i);
        button.text(i);
        $("#buttons-view").append(button);
    })
}


makeButton();


// API key: 8dKQm41P7RUDgOLf1bZTOnlnXksEgtdJ

// Event listener for all button elements
$(document).on("click", ".topic", function () {
    // create a variable equal to "data-name" attribute made for each button
    // why does it have to be single ticks
    var name = $(this).attr("data-name")
    // Constructing a URL to search Giphy for the name of the topic, limit 10
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=8dKQm41P7RUDgOLf1bZTOnlnXksEgtdJ&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            console.log(response);
            // Storing an array of results in a variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // results.forEach(function(i){
                // 
                // })

                // Creating a div for the gif
                var gif = results[i];
                var gifDiv = $("<div>");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var topicImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                topicImage.attr("src", gif.images.fixed_height_still.url);
                // why
                topicImage.attr('data-state', "still");
                topicImage.attr('data-still', gif.images.fixed_height_still.url);
                topicImage.attr('data-animate', gif.images.fixed_height.url);
                topicImage.attr("class", "clicky");


                gifDiv.append(topicImage);
                gifDiv.append(p);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
    });


        $(document).on('click', '.clicky', function(){
            var state = $(this).attr('data-state');
  
            if(state === "still"){
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', "moving");
        } else{
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', "still");
        }
          })



//  This function handles events where one button is clicked
$("#find-topic").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var newTopic = $("#topic-input").val().trim();
    // The movie from the textbox is then added to our array
    topicArr.push(newTopic);

    // calling renderButtons which handles the processing of our movie array
    makeButton();
});

