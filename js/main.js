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
    loadIframes();
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

  $(".control-next").click(function() {
    moveDown();
  });
  jQuery(window).on("swiperight", function() {
    moveUp();
  });

  $(".control-prev").click(function() {
    moveUp();
  });
  jQuery(window).on("swipeleft", function() {
    moveDown();
  });
});

const projects = document.querySelectorAll(".project");
const demos = document.querySelectorAll(".demo");
let all = document.querySelectorAll(".sum-project");
for (let i = 0; i < all.length; i++) {
  all[i].innerHTML = projects.length;
}
all = document.querySelectorAll(".sum-demo");
for (let i = 0; i < all.length; i++) {
  all[i].innerHTML = demos.length;
}

function getCurrent() {
  return {
    state: state === "demo" ? "demo" : "project",
    data: state === "demo" ? demos : projects
  };
}

// document.querySelectorAll(".sum-project").forEach(element => {
//   element.innerHTML = projects.length;
// });

function moveDown() {
  const currentItems = getCurrent();
  let nextKey;
  const cName = currentItems.state.indexOf("demo") !== -1 ? "demo" : "project";
  const num = $("." + cName + ".active").attr("id");
  $.each(currentItems.data, function(key, value) {
    if (num == value.id) {
      nextKey = key + 1;
      if (nextKey >= currentItems.data.length) {
        nextKey = 0;
      }
    }
  });
  const next = $("#" + currentItems.data[nextKey].id);
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

function moveUp() {
  const currentItems = getCurrent();
  let nextKey;
  const cName = currentItems.state.indexOf("demo") !== -1 ? "demo" : "project";
  const num = $("." + cName + ".active").attr("id");
  $.each(currentItems.data, function(key, value) {
    if (num == value.id) {
      nextKey = key - 1;
      if (nextKey < 0) {
        nextKey = currentItems.data.length - 1;
      }
    }
  });
  const next = $("#" + currentItems.data[nextKey].id);
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

function loadIframes() {
  document
    .getElementById("demo-one")
    .querySelector(".wrapper")
    .querySelector(".scaled-frame")
    .setAttribute("src", "https://warm-island-73436.herokuapp.com/");
  document
    .getElementById("demo-two")
    .querySelector(".wrapper")
    .querySelector(".scaled-frame")
    .setAttribute("src", "https://limitless-beach-24902.herokuapp.com/");
  document
    .getElementById("demo-three")
    .querySelector(".wrapper")
    .querySelector(".scaled-frame")
    .setAttribute("src", "https://clientpanel-3bd53.firebaseapp.com/");
}
