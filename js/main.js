$(window).load(function() {
  $(".loading")
    .delay(1000)
    .fadeOut();
});
let state = "main";
$(document).ready(function() {
  onload();
  // $("#demos").click(function() {
  //   //window.history.pushState("object or string", "Title", "/demos");
  //   $(".header-overlay").fadeOut();
  //   $(".header-overlay-about").fadeOut();
  //   $(".header-content").hide("slide", { direction: "right" }, 1500);
  //   $(".header-content-about").hide("slide", { direction: "right" }, 1500);
  //   $(".fullscreen-video-wrap video")
  //     .fadeOut(1500)
  //     .delay(500)
  //     .queue(function(next) {
  //       $(this).attr("src", "assets/demo.mp4");
  //       next();
  //     })
  //     .fadeIn(1000);
  // });

  $("#about").click(function() {
    $(".header-content").hide();
    $(".header-content-about").fadeIn();
  });
  $("#home").click(function() {
    $(".header-content-about").hide();
    $(".header-content").fadeIn();
  });

  $("#projects,#projects-about,#demos,#demos-about").click(function() {
    const demo =
      $(this)
        .attr("id")
        .indexOf("demo") !== -1;
    const dir = demo ? "right" : "left";
    $(".header-overlay").fadeOut();
    $(".header-overlay-about").fadeOut();
    $(".header-content").hide("slide", { direction: dir }, 1500);
    $(".header-content-about").hide("slide", { direction: dir }, 1500);

    if (demo) {
      state = "demo";
      $(".fullscreen-video-wrap video")
        .fadeOut(1500)
        .delay(500)
        .queue(function(next) {
          $(this).attr("src", "assets/demo.mp4");
          next();
        })
        .fadeIn(1000);
      $(".demos").delay(1500);
      $(".demos").fadeIn(2000);
    } else {
      state = "project";
      $(".fullscreen-video-wrap video")
        .fadeOut(1500)
        .delay(500)
        .queue(function(next) {
          $(this).attr("src", "assets/project.mp4");
          next();
        })
        .fadeIn(1000);
      $(".projects").delay(1500);
      $(".projects").fadeIn(2000);
    }
  });

  $("#close,#close-demo").click(function() {
    state = "main";
    assignActive("main");
    const demo =
      $(this)
        .attr("id")
        .indexOf("demo") !== -1;
    const dir = demo ? "right" : "left";
    if (demo) {
      $(".demos").fadeOut(500);
      $(".header-content").delay(500);
      $(".demos").hide();
    } else {
      $(".projects").fadeOut(500);
      $(".header-content").delay(500);
      $(".projects").hide();
    }
    $(".header-overlay").fadeIn(1500);
    $(".fullscreen-video-wrap video")
      .fadeOut(1500)
      .delay(600)
      .queue(function(next) {
        $(this).attr("src", "assets/video.mp4");
        next();
      })
      .delay(500)
      .fadeIn(500);
    $(".header-content").show("slide", { direction: dir }, 1500);
  });

  $(".control-next").click(function(e) {
    moveDown(e);
  });
  jQuery(window).on("swipeleft", function(e) {
    moveUp(e);
  });
  $(".control-prev").click(function(e) {
    moveUp(e);
  });
  jQuery(window).on("swiperight", function(e) {
    moveDown(e);
  });
});

const indicator = state === "demo" ? "demo" : "project";
const projects = document.querySelectorAll("." + indicator);

// document.querySelectorAll(".sum-project").forEach(element => {
//   element.innerHTML = projects.length;
// });

const all = document.querySelectorAll(".sum-project");
for (let i = 0; i < all.length; i++) {
  all[i].innerHTML = projects.length;
}

function moveDown(e) {
  console.log(indicator);
  let nextKey;
  const cName = e.currentTarget.id.indexOf("demo") !== -1 ? "demo" : "project";
  const num = $("." + cName + ".active").attr("id");
  $.each(projects, function(key, value) {
    if (num == value.id) {
      nextKey = key + 1;
      if (nextKey >= projects.length) {
        nextKey = 0;
      }
    }
  });
  const next = $("#" + projects[nextKey].id);
  const current = $("#" + num);
  $("#next").fadeOut(10);
  $("#prev").fadeOut(10);
  current.hide("slide", { direction: "left" }, 1500).queue(function(next) {
    $(this).removeClass("active");
    next();
  });
  next.delay(1500);
  next.fadeIn(500).queue(function(next) {
    $(this).addClass("active");
    next();
  });
  $("#next").delay(1500);
  $("#prev").delay(1500);
  $("#next").fadeIn();
  $("#prev").fadeIn();
}

function moveUp(e) {
  let nextKey;
  const cName = e.currentTarget.id.indexOf("demo") !== -1 ? "demo" : "project";
  const num = $("." + cName + ".active").attr("id");
  $.each(projects, function(key, value) {
    if (num == value.id) {
      nextKey = key - 1;
      if (nextKey < 0) {
        nextKey = projects.length - 1;
      }
    }
  });
  const next = $("#" + projects[nextKey].id);
  const current = $("#" + num);
  $("#next").fadeOut(10);
  $("#prev").fadeOut(10);
  current.hide("slide", { direction: "right" }, 1500).queue(function(next) {
    $(this).removeClass("active");
    next();
  });
  next.delay(1500);
  next.fadeIn(1500).queue(function(next) {
    $(this).addClass("active");
    next();
  });
  $("#next").delay(1500);
  $("#prev").delay(1500);
  $("#next").fadeIn();
  $("#prev").fadeIn();
}

function onload() {
  $(".projects").hide();
  $(".demos").hide();
  $(".header-content-about").hide();
}

function assignActive(state) {
  // if (state === "demo") {
  //   document.querySelector(".demo").className += " active";
  // } else if (state === "project") {
  //   document.querySelector(".project").className += " active";
  // } else {
  //   document.querySelector(".active").classList.remove("active");
  // }
}
