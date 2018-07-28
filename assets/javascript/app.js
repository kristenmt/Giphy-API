// makes sure html is loaded before running script
$(document).ready(function() {
//array of topics for the gif buttons    
var topics=["michael jackson", "david bowie", "peter gabriel", "madonna", "huey lewis", "guns n roses", "tears for fears", "inxs", "whitney houston", "cindi lauper"];
//starts the script when each button is clicked
$("button").on("click", function(){
//creating a variable for the "this" function when clicked
var videos = $(this).attr("data-singers");
//variable to name url to get the gifs from along with category and my API key, defines max of 10 images to return
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + videos + "&api_key=Vb0lSKUoCEct0qrvHqqUYbobJJYABtKP&limit=10";

//tells ajax to get the info from the url
$.ajax({
    url: queryURL,
    method: "GET"
})
//the promise for the API
.then(function(response){
    console.log(queryURL);
    console.log(response);
    //results will be stored in results variable
    var results = response.data;
    //for loop to loop through the results
    for (var i = 0; i < results.length; i ++){
        //this requests results not have an "r" or "pg-13" rating
        if (results[i].rating !== "r" && results[i].rating !=="pg-13"){
            //creates a div
            var gifDiv = $("<div class='gif'>");
            //variable to store the gif's rating
            var rating = results[i].rating;
            //variable to print the rating to the html page
            var p = $("<p>").text("Rating: " + rating);
            console.log("rating is " + rating);
            //image tag for the gif
            var gifImage = $("<img>");
            //attaches image tag to the image
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.addClass("image-click");
            console.log("image gif");
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
           // var imageStill = gifImage;
            //var imageAnimate = gifImage.attr("src", results[i].images.fixed_height.url);
            //append the paragraph to the html
            gifDiv.append(p);
            //append image to html
            gifDiv.append(gifImage);
            //add new gif to top of page
            $("#gif-div").prepend(gifDiv);
        }
        $(".image-click").on("click", (function(){
            var state=$(this).attr("data-state");
            if (state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            
        }))
    }
})
});


});