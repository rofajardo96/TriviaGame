$(document).ready(function(){
    $("#start").on('click', triv.startTriv);
    $(document).on('click' , '.option', triv.guessCheck);
})

var triv = {
    unanswered: 0,
    wrongAnswer: 0,
    correctAnswer: 0,
    currentList: 0,
    timer: 10,
    timerOn: false,
    timerId : '',
    userGuess : '',

    questions: {
        ques1 : "What is the capital of Switzerland?",
        ques2 : "What is the capital of Bulgaria?",
        ques3 : "What is the capital of Kazakhstan?",
        ques4 : "What is the capital of Uzbekistan?",
        ques5 : "What is the capital of Senegal?",
        ques6 : "What is the capital of Kenya?",
        ques7 : "What is the capital of Paraguay?",
        ques8 : "What is the capital of New Zealand?",
        ques9 : "What is the capital of Australia?",
        ques10 :"What is the capital of Canada?"
    },
    
    choices: {
        ques1: ['Zurich', 'Basel', 'Bern', 'Geneva'], 
        ques2: ['Varna', 'Sofia', 'Bratislava', 'Kiev'],
        ques3: ['Nur-Sultan', 'Almaty', 'Shymkent', 'Muskat'],
        ques4: ['Jakarta', 'Colombo', 'Ashgabat', 'Tashkent'],
        ques5: ['Yaounde', 'Dakar', 'Kigali', 'Abuja'],
        ques6: ['Nairobi', 'Kinshasa', 'Juba', 'Mogadishu'],
        ques7: ['Montevideo', 'Incarnacion', 'Asunción', 'Mendoza'],
        ques8: ['Auckland', 'Wellington', 'Hamilton', 'Nuuk'],
        ques9: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
        ques10: ['Montreal', 'Quebec', 'Ottowa', 'Vancouver']
    

    },

    rightAnswers: {
        ques1: 'Bern',
        ques2: 'Sofia',
        ques3: 'Nur-Sultan',
        ques4: 'Tashkent',
        ques5: 'Dakar',
        ques6: 'Nairobi',
        ques7: 'Asunción',
        ques8: 'Wellington',
        ques9: 'Canberra',
        ques10: 'Ottowa'
    },

    startTriv: function(){
        triv.currentList = 0;
        triv.correctAnswer = 0;
        triv.wrongAnswer = 0;
        triv.unanswered = 0;
        clearInterval(triv.timerId);

        $('#game').show();
      
        //  empty last results
        $('#results').html('');
        
        // show timer
        $('#timer').text(triv.timer);
        
        // remove start button
        $('#start').hide();
    
        $('#remaining-time').show();

        triv.nextQuestion();

        

    },

   

    nextQuestion: function(){
        triv.timer = 10;
        if(!triv.timerOn){
          triv.timerId = setInterval(triv.timerRunning, 1000);
        }
      var questionContent = Object.values(triv.questions)[triv.currentList];
      $('#question').text(questionContent);

      var questionChoices = Object.values(triv.choices)[triv.currentList];
      $('#choices').text(triv.choices)[triv.currentList];
      
      
      $.each(questionChoices, function(index, key){
        $('#choices').append($('<button id="choices">'+key+'</button>'));
      })
      
        
    },

    userGuess: function(){
      $("#choices").click()
    },

    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(triv.timer > -1 && triv.currentList < Object.keys(triv.questions).length){
        $('#timer').text(triv.timer);
        triv.timer--;
         
      }
      // the time has run out and increment unanswered, run result
      else if(triv.timer === -1){
        triv.unanswered++;
        triv.result = false;
        clearInterval(triv.timerId);
        resultId = setTimeout(triv.guessResult, 2500);
        $('#results').html('<h3>Gotta be quicker!!! The correct answer is '+ Object.values(triv.rightAnswers)[triv.currentList] +'</h3>');
        

      }
      // if all the questions have been shown end the game, show results
      else if(triv.currentList === Object.keys(triv.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ triv.correctAnswer +'</p>'+
          '<p>Incorrect: '+ triv.wrongAnswer +'</p>'+
          '<p>Unaswered: '+ triv.unanswered +'</p>'+
          '<p>Give it another go!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },

    

    guessCheck : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(triv.rightAnswers)[triv.currentList];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if(userGuess === currentAnswer){
        triv.correctAnswer++;
        clearInterval(triv.timerId);
        resultId = setTimeout(triv.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        triv.wrongAnswer++;
        clearInterval(triv.timerId);
        resultId = setTimeout(triv.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      triv.currentList++;
      
      // remove the options and results
      $('#results h3').remove();
     
      
      // begin next question
      triv.nextQuestion();
       
    }
  
  }
    







// image: "assets/images/pablo-quinones.jpg"



      
 
      
 