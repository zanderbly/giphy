var topics = [
"alf",
"the a-team",
"knight rider",
"webster",
"magnum PI",
"miami vice",
"transformers",
"gi joe",
"he-man",
"ghostbusters"];

function displayGifs(){
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=uAplEeI1pMEKTa6F4y4V7UbniqfCRnOK&q="+ topic +"&limit=10&offset=0&lang=en";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response)
    
    for (var i = 0; i < response.data.length; i++){

var showDiv = $("<div class='show'>");

var rating = response.data[i].rating;

var pRating = $("<p>").text("rated: " + rating);
console.log(pRating);

$("#gif-area").append(pRating);

var showGif = response.data[i].images.fixed_height_still.url;

var imgGif = $('<img>').attr("src", showGif);
$(imgGif).addClass("gif");
console.log(imgGif);

$("#gif-area").append(imgGif);
 
}
});




$("#gif-area").on('click', '.gif', function() {
    var src = $(this).attr("src");
    console.log(this);
    if($(this).hasClass('playing')){
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    }else{
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});

$("#gif-area").empty();

};

function renderButtons() {

    $("#button-area").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#button-area").append(a);
    }
}


$("#add-show").on("click", function(event) {
    event.preventDefault();
    var show = $("#show-input").val().trim();
    console.log(show);
    topics.push(show);
    renderButtons();
});

$(document).on("click", ".topic-btn", displayGifs);

renderButtons();
