document.addEventListener("DOMContentLoaded",() => {

    let on_blur = document.getElementById("on_blur_event");
    on_blur.addEventListener("blur", () =>{
        let x= document.getElementById("on_blur_event");
        x.value = x.value.toUpperCase();
        alert(`Blur event fired ${x.value}`);
    });

    let onchange = document.getElementById("myoption");
    onchange.addEventListener("change", () =>{
        var x = document.getElementById("myoption").value;
        alert(`Your selected item : ${x}`);
    });

    document.getElementById("demo").addEventListener("click", ()=>{
        document.getElementById("demo").innerHTML = "YOU CLICKED ME";
        alert("Click event triggered");
    });

    document.getElementById("myInput").addEventListener("copy", ()=> {
        document.getElementById("demo").innerHTML = "you copied text";
        alert("You have copy the content");
    });

    document.getElementById("myInput1").addEventListener("cut", ()=> {
        document.getElementById("demo1").innerHTML = "you cut text";
        alert("You have cut the content");
    });

    document.getElementById("demo3").addEventListener("dblclick", ()=> {
        document.getElementById("demo3").innerHTML = "Hello Wolrd";
        alert("You have double times");
    });

    document.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("Text", event.target.id);
      });
      
      document.addEventListener("drag", function(event) {
        document.getElementById("demo").innerHTML = "The text is being dragged";
      });
      
      /* Events fired on the drop target */
      document.addEventListener("dragover", function(event) {
        event.preventDefault();
      });
      
      document.addEventListener("drop", function(event) {
        event.preventDefault();
        if ( event.target.className == "droptarget" ) {
          const data = event.dataTransfer.getData("Text");
          event.target.appendChild(document.getElementById(data));
          document.getElementById("demo4").innerHTML = "The text was dropped";
        }
        alert("The drag is dropped");
      });

    document.getElementById("fname").addEventListener("focus", () =>{
        document.getElementById("fname").style.backgroundColor = "aqua";
        alert("Focus......");
    });

    document.getElementById("lname").addEventListener("focusout", () =>{
        document.getElementById("lname").style.backgroundColor = "aqua";
        alert("FocusOut......");
    });

    // var elem = document.documentElement;

    // function openFullscreen() {
    //     if (elem.requestFullscreen) {
    //       elem.requestFullscreen();
    //     }
    //     else if (elem.mozRequestFullScreen) { /* Firefox */
    //     elem.mozRequestFullScreen();
    //   }
    // }

    // document.addEventListener("mozfullscreenchange", function() {
    //     output.innerHTML = "mozfullscreenchange event fired!";
    //   });
    // let onclick = document.getElementById("demo");
    // onclick.addEventListener("click", ()=> {
    //     document.getElementById("demo").innerHTML = "Hello World";
    //     alert("Click Event is Triggered");
    // });

   document.getElementById("demo6").addEventListener("mousedown", () =>{
    document.getElementById("demo6").innerHTML = "The mouse button is held.";
   });

   document.getElementById("demo6").addEventListener("mouseup", ()=>{
    document.getElementById("demo6").innerHTML = "The mouse button is released";
   });

   document.getElementById("demo7").addEventListener("mouseenter", () =>{
    document.getElementById("demo7").style.color = "green";
   });

   document.getElementById("demo7").addEventListener("mouseleave", ()=>{
    document.getElementById("demo7").style.color = "black";
   });


   document.getElementById("myDiv").addEventListener("mousemove", function(event){
    myFunction(event);
   });

   function myFunction(e){
    let x = e.clientX;
    let y = e.clientY;
    let coor = "Coordinates: (" + x +","+y+")";
    document.getElementById("demo8").innerHTML = coor;
   }

   window.addEventListener("resize", () =>{
    var x = 0;
    var txt = x+=1;
    document.getElementById("demo9").innerHTML = txt;
    alert("Resize Event...");
   });

   document.getElementById("myform").addEventListener("reset",() =>{
    document.getElementById("demo10").innerHTML = "The form was reset";
    alert("The form is reset");
   });

   document.getElementById("myDIV1").addEventListener("scroll",() =>{
    document.getElementById("demo11").innerHTML = "It is scrolling";
    alert("Scrolling...");
   });

   document.getElementById("myText").addEventListener("select",() =>{
    document.getElementById("demo12").innerHTML = "Your Item is selected";
    alert("Selected...");
   });

   document.getElementById("myDetails").addEventListener("toggle",() =>{
    alert("Toggle event has occured...");
   });

   document.getElementById("myform1").addEventListener("submit",() =>{
    document.getElementById("demo13").innerHTML = "The form was submitted";
    alert("The form is submitted");
   });
});