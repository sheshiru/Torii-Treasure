(function() {
  "use strict";
  // function userInput(event) {
  //   let compare;
  //   if (event.target.value.length > 4) {
  //     compare = event.target.value.slice(0, 4);
  //     console.log("here" + compare);
  //   }

  var currentLevel = 1; // incrementer a chaque passage de niveau

  var enigmasBase = {
    lvl1: {
      comb: "6943",
      level: 1,
      lives: 2,
      enigma: "Give me those coordonates [0,3] [1,1] [3,2] [1,0]"
    },
    lvl2: {
      comb: "5739",
      level: 2,
      lives: 2,
      enigma: "Deal with your « nega » 8888",
      clue: "./img.jpg"
    },
    lvl3: {
      comb: "8318",
      level: 3,
      lives: 2,
      enigma: "never odd or even",
      clue: "./../pics/symetrie_clue.png"
    },
    lvl4: {
      comb: "5713",
      level: 4,
      lives: 2,
      enigma: "Sum = ?"
    }
  };

  var enigmas;
  // console.log(enigmas[currentLevel]);
  function reStart() {
    currentLevel = 1;
    cleanSoluces();
    enigmas = JSON.parse(JSON.stringify(enigmasBase)); // clone l'object base
    document.getElementById("answer").disabled = true;
    document.querySelector(".bg_opacity").classList.add("is-active");
    document.querySelector(".btn-start-container").style.display = "block";
    document.querySelector(".start").textContent = "RESTART";
    pauseAudio();
  }

  function cleanSoluces() {
    document.querySelector(".lvl1").textContent = "";
    document.querySelector(".lvl2").textContent = "";
    document.querySelector(".lvl3").textContent = "";
  }
  //@todo -> if correct answer trigger 1st bar unlock -> next puzzle

  // COMPARE USER INPUT/COMBINATION
  function compare(userInpt, soluce) {
    // console.log("userInpt", userInpt, "soluce", soluce);
    if (userInpt === soluce) {
      // document.querySelector(".code-soluce-lvl1").textContent =
      //   enigmas["lvl" + currentLevel].comb;
      currentLevel++;
      if (currentLevel == 2) {
        document.querySelector(".lvl1").textContent = enigmas.lvl1.comb;
      } else if (currentLevel == 3) {
        document.querySelector(".lvl2").textContent = enigmas.lvl2.comb;
      } else if (currentLevel == 4) {
        document.querySelector(".lvl3").textContent = enigmas.lvl3.comb;
      }

      if (Object.keys(enigmas).length < currentLevel) {
        document.querySelector(".success").classList.add("is-active");
        reStart();
        return;
      }
      if (currentLevel != 3) {
        document.querySelector(".enigmes").innerHTML =
          enigmas["lvl" + currentLevel].enigma;
      } else {
        document.querySelector(".enigmes").innerHTML = `${
          enigmas["lvl" + currentLevel].enigma
        } <span class="img-clue"><img src=${enigmas.lvl3.clue}></span>`;
      }
    } else {
      console.log("You lost a life, only one left, try again");
      enigmas["lvl" + currentLevel].lives -= 1;
      console.log(enigmas["lvl1"]);
      if (enigmas["lvl" + currentLevel].lives === 0) {
        document.querySelector(".game-over").classList.add("is-active");
        reStart();
      }
    }
  }
  // ALLOWS 4 DIGITS ONLY - CALLS COMPARE FUNCTION
  function userInputText(event) {
    if (
      !event.target.value.match(/^[0-9]*$/g) &&
      event.target.value.length !== 4
    ) {
      console.log("The code should be digits only !");
      event.target.value = "";
    } else if (event.target.value.length === 4) {
      if (validate(event)) {
        compare(event.target.value, enigmas["lvl" + currentLevel].comb);
        document.getElementById("answer").value = "";
      }
    }
  }

  // WAIT FOR ENTER KEYPRESS
  function validate(evt) {
    if (evt.keyCode == 13) {
      event.preventDefault();
      return true;
    }
  }
  // AUDIO
  var audio = document.getElementById("myAudio");
  function playAudio() {
    audio.play();
    audio.muted = false;
    document.querySelector(".btn-sound").classList.remove("is-active");
    document.querySelector(".btn-no-sound").classList.add("is-active");
  }
  function pauseAudio() {
    audio.pause();
    audio.muted = true;
    document.querySelector(".btn-no-sound").classList.remove("is-active");
    document.querySelector(".btn-sound").classList.add("is-active");
  }
  //DISABLE INPUT - SET DARK OPACITY - SHOW START BUTTON
  function screenLocked() {
    enigmas = JSON.parse(JSON.stringify(enigmasBase)); // clone l'object base
    // console.log(enigmas === enigmasBase);
    // console.log("base", enigmasBase);
    // console.log("clone", enigmas);
    document.getElementById("answer").disabled = true;
    document.querySelector(".bg_opacity").classList.add("is-active");
  }

  // HIDE START BUTTON - ENABLE INPUT - SET BG OPACITY ON DEFAULT
  function allowToPlay() {
    document.querySelector(".btn-start-container").style.display = "none";
    playAudio();
    showEnigma();
    document.getElementById("answer").disabled = false;
    document.querySelector(".bg_opacity").classList.remove("is-active");
    document.querySelector(".board").classList.add("is-active");
    document.querySelector(".game-over").classList.remove("is-active");
    document.querySelector(".success").classList.remove("is-active");
  }

  // SHOW ENIGMAS
  function showEnigma() {
    document.querySelector(".enigmes").innerHTML =
      enigmas["lvl" + currentLevel].enigma;
  }

  function start() {
    screenLocked();
    const res = document.getElementById("answer");
    res.oninput = userInputText;
    res.onkeypress = userInputText;
    const btnStart = document.querySelector(".btn-start-container");
    btnStart.onclick = allowToPlay;
    const btnNoSound = document.querySelector(".btn-no-sound");
    btnNoSound.onclick = pauseAudio;
    const btnSound = document.querySelector(".btn-sound");
    btnSound.onclick = playAudio;
    // Get the popup
    var popup = document.getElementById("myPopup");
    // Get the button that opens the popup
    var btnHelp = document.querySelector(".btn-help");
    // Get the <span> element that closes the popup
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the popup
    btnHelp.onclick = function() {
      popup.style.display = "block";
    };
    // When the user clicks on <span> (x), close the popup
    span.onclick = function() {
      popup.style.display = "none";
    };
    // When the user clicks anywhere outside of the popup, close it
    window.onclick = function(event) {
      if (event.target == popup) {
        popup.style.display = "none";
      }
    };
  }
  window.addEventListener("DOMContentLoaded", start);
})();
