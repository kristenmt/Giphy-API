$(document).ready(function () {
    //array of topics for the gif buttons    
    var bands = ["michael jackson", "david bowie", "peter gabriel", "madonna", "huey lewis", "guns n roses", "tears for fears", "inxs", "whitney houston", "cindi lauper"];
    //displayBandInfo();
    //tells html to show buttons
        $(document).on("click", ".image", function(){
            $("#bands-view").empty();
            var band = $(this).attr("data-type");
        console.log(band);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=Vb0lSKUoCEct0qrvHqqUYbobJJYABtKP&limit=10";
       
        //tells ajax to get the info from the url
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            //the promise for the API
            .then(function (response) {
                //console.log(queryURL);
                console.log(response);
                var gifDiv = $("<div class='giphy'>")
                //stores the data in the results variable
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    //this requests giphy to only return results that don't have an "r" or "pg-13" rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
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
                        //append the paragraph to the html
                        gifDiv.append(p);
                        //append image to html
                        gifDiv.append(gifImage);
                        //add new gif to top of page
                        $("#gifs-view").prepend(gifDiv);
                    }
                };
            
                    $(".image-click").on("click", function(){
                        var state = $(this).attr("data-state");
                        if (state == "still"){
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        }
                        else{
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                        
                    })
                    renderButtons();
                });

            });
            
        function renderButtons() {
            $("#buttons-view").empty();
            for (var i = 0; i < bands.length; i++) {
                var a = $("<button>");
                a.addClass("image");
                a.attr("data-type", bands[i]);
                a.text(bands[i]);
                $("#buttons-view").append(a);
            }
        }
        $("#add-band").on("click", function (event) {
            event.preventDefault()
            var band = $("#band-input").val().trim();
            bands.push(band);
            renderButtons();
        })

        //$(document).on("click", ".image", displayBandInfo);
        renderButtons();

    })

