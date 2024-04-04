function opentab(evt, techName) {
  var i, class2, tablinks;
  class2 = document.getElementsByClassName("class2");
  for (i = 0; i < class2.length; i++) {
    class2[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(techName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

let right = document.getElementById('next');
let left = document.getElementById('prev');
let slide = document.getElementById('slider_show');
let increment = 0;

const rightClick = () => {
  if (increment >= 0 && increment < 1200) {
    increment += 400;
    console.log("right slide", increment);
    slide.scrollTo(increment, 0);
  }
}

const leftClick = () => {
  if (increment >= 400) {
    increment -= 400;
    console.log("left slide", increment);
    slide.scrollTo(increment, 0);
  }
}

right.addEventListener("click", rightClick);
left.addEventListener("click", leftClick);