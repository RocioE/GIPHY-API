//start off by creating string array in brackets, each with quotes, followed by commas//
var movies = ["Pretty in Pink", "Ferris Bueller's Day Off", "Elvira", "The Breakfast Club", "The Goonies"];
// var api = "https://api.giphy.com/v1/gifs/search?q=";
// var query= "&q=80s-movies"; 
// var apiKey = "&api_key=cMFWpndN9yNWcyBuLG1uwjVsHtAwN7F2&limit=10";  //10 is the limit of giphys//
var movieInput
var movieButton
var imageTag
//q= 80sMovies  //???????????///
$( document ).ready(function() {

    $("#add-movies").on("click",function(event){
        event.preventDefault()
        movieInput = $("#movies-input").val().trim()
        displayMovieInfo(movieInput)   
        //console.log(movieInput)
    })
    // $(".movie").on("click",function(){
    // // alert("hi")
    //     movieButton = $(this).attr("data-name")
    //     displayMovieInfo(movieButton)   
    //     console.log(movieButton)
    // })

})

function displayMovieInfo(moveInput) {

  //var movies = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  moveInput + "&api_key=cMFWpndN9yNWcyBuLG1uwjVsHtAwN7F2&limit=10";
//vh is the path//

  $.ajax({   //ajax sends requests//
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data  //ajarx returns with the result of request//
    //console.log(results)
    $("#showMovie").empty()
    console.log(results.length)
    for (var i = 0; i < results.length; i++) {

      imageTag = $("<img>")
      imageTag.attr("src", results[i].images.fixed_height_still.url)
      imageTag.attr("data-still",results[i].images.fixed_height_still.url)
      imageTag.attr("data-animate",results[i].images.fixed_height.url)
      imageTag.attr("data-state","still")
      imageTag.addClass("gif")
      //console.log(imageTag)
      $("#showMovies").append(imageTag)
    }
  });

}
$(document).on("click",".gif", function() {
    var state  = $(this).attr("data-state")
    //console.log(state)
    if(state === "still"){
      var animate = $(this).attr("data-animate")
      $(this).attr("src",animate )
      $(this).attr("data-state","animate" )
    }
    else if (state === "animate")
    {
      var dateState = $(this).attr("data-still")
      $(this).attr("src",dateState )
      $(this).attr("data-state","still" )
    }
   });
   renderButtons()
function renderButtons() {


  $("#buttons-view").empty();

  for (var i = 0; i < movies.length; i++) {


    var a = $("<button>");

    a.addClass("movie");

    a.attr("data-name", movies[i]);

    a.text(movies[i]);

    $("#buttons-view").append(a);
  }
}

