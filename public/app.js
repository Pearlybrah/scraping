$(document).on("click", "#scrape", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(
    $.getJSON("/articles", function(data) {
      for (var i = 0; i < data.length; i++) {
        $(".article-container").append(
          "<div class = 'card' data-id='" +
            data[i]._id +
            "'><h3><a class='article-link' href='" +
            data[i].link +
            "'" +
            data[i].title +
            "'</h3><br />" +
            data[i].title +
            "</a><a class='btn btn-success save' id='" +
            data[i]._id +
            "'>Save Article</a></div>"
        );
      }
    })
  );
});

$(document).on("click", "a.save", function() {
  var thisId = $(this).attr("id");
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId
  }).then(
    $.getJSON("/articles", function(data) {
      for (var i = 0; i < data.length; i++) {
        $(".article-container").append(
          "<div class = 'card' data-id='" +
            data[i]._id +
            "'><h3><a class='article-link' href='" +
            data[i].link +
            "'" +
            data[i].title +
            "'</h3><br />" +
            data[i].title +
            "</a><a class='btn btn-success save' id='save-btn'>Save Article</a></div>"
        );
      }
    })
  );
});

$(document).on("click", "#clear", function() {
  $.ajax({
    method: "DELETE",
    url: "/articles"
  }).then($(".article-container").empty());
});

$(document).on("click", "p", function() {
  $("#notes").empty();

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    console.log(data);

    $("#notes").append("<h2>" + data.title + "</h2>");

    $("#notes").append("<input id='titleinput' name='title' >");

    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

    $("#notes").append(
      "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
    );

    if (data.note) {
      $("#titleinput").val(data.note.title);

      $("#bodyinput").val(data.note.body);
    }
  });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),

      body: $("#bodyinput").val()
    }
  }).then(function(data) {
    console.log(data);

    $("#notes").empty();
  });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
