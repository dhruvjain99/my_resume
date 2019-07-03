"use strict";

// Implementing the smooth scroll feature
var navMenuAnchorTags = document.querySelectorAll('.nav-menu li a');
var closeNavbar = document.getElementById('close-navbar');
var hamburgerNavbar = document.getElementById('hamburger-navbar');
var hamburgerIcon = document.getElementById('hamburger-icon');

closeNavbar.addEventListener('click', function(event){
    hamburgerNavbar.style.height = '0';
    hamburgerNavbar.style.width = '0';
});
hamburgerIcon.addEventListener('click', function(event){
    event.preventDefault();
    hamburgerNavbar.style.height = '100%';
    hamburgerNavbar.style.width = '100%';
});

for(let i = 0; i < navMenuAnchorTags.length; i++){
    navMenuAnchorTags[i].addEventListener('click', function(event){
        event.preventDefault();
        var targetSectionId = this.innerText.trim().toLowerCase();
        //String Functions - trim() returns a string without whitespaces, and toLowerCase() returns a string in lowercase
        var targetSection = document.getElementById(targetSectionId);

        var interval = setInterval(function (){
            var targetSectionCoordinates = targetSection.getBoundingClientRect();
            if (targetSectionCoordinates.top <= 0){
                clearInterval(interval);
                return;
            }
            window.scrollBy(0, 5);
        }, 1);
        hamburgerNavbar.style.height = '0';
        hamburgerNavbar.style.width = '0';
    });
}



//###################### METHOD 1 #################################
// var currentPosition = null;
// var targetPosition = null;

// var navList = document.querySelectorAll(".nav-menu li");
// var hamburgerNavbar = document.getElementById('hamburger-navbar');
// var hamburgerIcon = document.getElementById('hamburger-icon');
// var closeNavbar = document.getElementById('close-navbar');

// closeNavbar.addEventListener('click', function(){
//   hamburgerNavbar.style.height = '0';
//   hamburgerNavbar.style.width = '0';
// });

// hamburgerIcon.addEventListener('click', function(){
//   hamburgerNavbar.style.height = '100%';
//   hamburgerNavbar.style.width = '100%';
// });

// for(let navButton of navList){
//   navButton.addEventListener('click', function(){
//     currentPosition = window.pageYOffset;
//     var section = document.getElementById(this.getAttribute('data-value'));
//     targetPosition = section.offsetTop;
//     var scrollInterval = setInterval(function (){
//   		if(currentPosition >= targetPosition){
//         clearInterval(scrollInterval);
//         return;
//       }
//       currentPosition += 4;
//       window.scrollBy(0, 4);
//     }, 3);
//     hamburgerNavbar.style.height = '0';
//     hamburgerNavbar.style.width = '0';
//   });
// }


//Implementing the skill section color fill animation using JS

//Steps:-
//Handle the scroll event on window
//Check that skills section skill progress division is visible or not
//Store the skill level in a variable using html data-* attribute and ensure that the initial width is zero
//Start the animation which will fill the color i.e. increase the width of inner div from zero to skill level

var targetSkillsDisplayDiv = document.getElementById('skills-display');
var targetSkillsDivs = document.getElementsByClassName('skill-color-progress')
var animationFired = false;

function resetProgressBarsToZero(){
    for(let targetSkillsDiv of targetSkillsDivs){
        targetSkillsDiv.style.width = '0';
    }
}

resetProgressBarsToZero();

var barAnimationFired = {};

function setBarAnimationFired(){
    for(let i = 0; i < targetSkillsDivs.length; i++){
        barAnimationFired[i] = false;
    }
}
setBarAnimationFired();

window.addEventListener('scroll', checkScrollBar);

function checkScrollBar(){
    for(let i = 0; i < targetSkillsDivs.length; i++){
        let barPosition = targetSkillsDivs[i].getBoundingClientRect();
        if (barAnimationFired[i] && barPosition.top > window.innerHeight){
            barAnimationFired[i] = false;
        }
        if(barPosition.top < window.innerHeight && !barAnimationFired[i]){
            fireBarAnimation(targetSkillsDivs[i]);
            barAnimationFired[i] = true;
        }
    }
}

function fireBarAnimation(bar){
    var targetSkillLevel = bar.getAttribute('data-skill-level');
    var currentSkillLevel = 0;
    var interval = setInterval(function (){
        if(currentSkillLevel >= targetSkillLevel){
            clearInterval(interval);
            return;
        }
        currentSkillLevel += 1;
        bar.style.width = currentSkillLevel + "%";
    },1);
}


/* 
window.addEventListener('scroll', function (){
    var targetSkillsDivDisplayPosition = targetSkillsDisplayDiv.getBoundingClientRect();
    
    if (targetSkillsDivDisplayPosition.top > window.innerHeight && animationFired){
        animationFired = false;
    }

    if((targetSkillsDivDisplayPosition.top < window.innerHeight) && !animationFired){
        animationFired = true;
        //console.log("Skills section is visible.");
        colorFillAnimation();
    }
});
function colorFillAnimation(){
    for(let targetSkillsDiv of targetSkillsDivs){
        let targetSkillLevel = targetSkillsDiv.getAttribute('data-skill-level');
        let currentSkillLevel = 0;
        let interval = setInterval(function (){
            if(currentSkillLevel >= targetSkillLevel){
                clearInterval(interval);
                return;
            }
            currentSkillLevel += 0.4;
            targetSkillsDiv.style.width = currentSkillLevel + "%";
        },5);
    }
}*/

// Percentage Scrolled 

var documentHeight = parseInt(document.documentElement.scrollHeight) - parseInt(window.innerHeight);
var percentageScrolled = document.getElementById('percentage-scrolled');

window.addEventListener('resize', function(){
  documentHeight = parseInt(document.documentElement.scrollHeight) - parseInt(window.innerHeight);
});

document.addEventListener('scroll', function(){
	var percentageScrolledValue = calculatePercentageScrolled();
  percentageScrolled.innerText = percentageScrolledValue;
});

function calculatePercentageScrolled(){
  var currentPosition = parseInt(window.pageYOffset);
  var percentageScrolledValue = currentPosition / documentHeight * 100;
  percentageScrolledValue = Math.round(percentageScrolledValue);
  return percentageScrolledValue + ""; 
}


