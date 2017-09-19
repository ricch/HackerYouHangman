$(function(){

	// 1. Press the Play button. This creates a random generator for the solution
	var playHangman = 0;

	// 2. Solution will be a list of 14 staff at Hacker You. 
	// Create an array that lists all the names (key will be the staff that will be randomly selected .. value will be the person's name)


	var hyStaff = {
	

		name: ['tiff', 'simon', 'sylvia', 'sarah', 'heather', 'kristen', 'christopher', 'jordan', 'ryan', 'sam', 'brandon', 'arianne', 'dug', 'leo'],
		images: ['./images/Tiff.jpg', './images/Simon.jpg', './images/Sylvia.jpg', './images/Sarah.jpg', './images/Heather.jpg', './images/Kristen.jpg', './images/Christopher.jpg', './images/Jordan.jpg', './images/Ryan.jpg', './images/Sam.jpg', './images/Brandon.jpg', './images/Arianne.jpg', './images/Dug.jpg', './images/Leo.jpg']
	};

//Body parts for incorrect letter inputs - hangman body parts will be added for every wrong answer
	var bodyParts = [
		'./images/hangmanHead.png', 
		'./images/hangmanBody.png',  
		'./images/hangmanLArm.png',  
		'./images/hangmanRArm.png',  
		'./images/hangmanLLeg.png',  
		'./images/hangmanRLeg.png' 
	]

	function checkStatusLose() {
		if (bodyParts.length === 0) {
			setTimeout(function () {
		    $('.showLose.displayNone').toggleClass('displayNone');
		    $('.youDied').append('<p>you died</p>').hide().fadeIn('slow');    	
			}, 800); 
			setTimeout(function(){
				$('.callToAction.displayNone').toggleClass('displayNone');
				$('.callToAction').hide().fadeIn('slow');
			}, 1500)
		}
	}
	var correctLetterCounter = 0
	var incorrectLetterCounter = 0


	function checkStatusWin() {
		if (nameSplitLength === correctLetterCounter) {
			setTimeout(function () {
		    $('.showLose.displayNone').toggleClass('displayNone');
		    $('.staffImage').append(`<img src="${hyStaff.images[randomIndex]}" alt="">`).hide().fadeIn('slow').addClass('rotate');
			}, 1000);
			setTimeout(function(){
				$('.callToAction.displayNone').toggleClass('displayNone');
				$('.callToAction').hide().fadeIn('slow');
			}, 2000)
		}
	}

	var points = 0;

	var randomIndex = Math.floor(Math.random() * hyStaff.name.length); // either 0, 1 ... max number
	// with RandomIndex we can determine the length and now randomize between min and max

	var randomStaff = hyStaff.name[randomIndex]; // tiff or simon or sylvia ...
	// now that we have the randomIndex, we are producing the value associated with randomized name/letter


	var nameSplit = randomStaff.split(''); // [s], [i], [m], [o], [n]
	// this creates an ARRAY of each letter within the name

	var nameSplitLength = nameSplit.length; // 5 in the case of simon
	// this determines the LENGTH of how many letters the randomized name is.

	// 3. With the hidden solution, populate the correct number of lettered boxes
	for (var i = 0; i < nameSplitLength; i++){
		$('.textSolution').append(`<div class="letterAnswer" data-index="${i}" data-letter='${nameSplit[i]}'></div>`);
	}


	// 4. Display the alphabet
	// Created in HTML using 'INPUT'

	// 5. Display hangman post
	// Assemble all the body parts to appear in order based on array. 


		$('input[type=button]').on('click', function(e){
			e.preventDefault();

			var keyboardInput = $(this).val();
			console.log(keyboardInput);
			// determines the value (text inside) of the button when clicked
			
			// figure out what letter was pressed
			// iterate through nameSplit to see if any letters match
			// if match, append to page 
			// else add to hangman

			$(this).addClass("selected");
			// once the keyboard letter has been clicked, add a class SELECTED to it (for styling purposes)
			
			// var keyboardInput = $(this).text();

			// getting all the divs (with class .letterAnswer) together. This allowed us to access for a parent for looping // <div data-letter"s">
			var letters = $('.letterAnswer');






			// WRONG ANSWER


			// every time the keyboard is clicked, enter the correct ENTIRE array nameSplit every single time
			
			if (nameSplit.indexOf(keyboardInput) == -1 ) {
				// indexOf determines the array's values' index # [0], [1], [2] ... If the letter doesn't exist in the array, a value of [-1] appears .. indicating a wrong answer.

		
				$('.hangmanPerson').append(`<img class="bodyPart" src="${bodyParts[0]}" alt="">`).hide().fadeIn('slow');

				bodyParts.shift();
				// now REMOVE the first value in the array with shift .. [1] becomes [0], [2] becomes [1] etc.
				
				checkStatusLose();
				// call the function to see if the length of the shrinking turns (ie body parts) === 0, alert you lose if true

			} else { // right answer

				for(var i = 0; i < letters.length; i++) {
					// assigning a variable to the different data entries (letter / index)
					
					var letterAnswer = $(letters[i]).data('letter');

					var letterIndex = $(letters[i]).data('index');



					if (keyboardInput === letterAnswer && $(letters[i]).text() === '') {
						// pulling ALL the data (index + value) and assigning it to a variable
						var indexPlace = nameSplit[letterIndex]; // ie simon
						
						letters[i].append(indexPlace);

						correctLetterCounter = correctLetterCounter + 1
						
						console.log('letter counter', correctLetterCounter)

						checkStatusWin();
					}  
				}

			}


		var pointTotal = function() {
			// takes the current point total and adds a value to it. 
			if (1 == 1) {
				points = points + 1
			};
			// else () {

			// };
			console.log(`Points = ${points}`)
		};

		pointTotal();

		});


});