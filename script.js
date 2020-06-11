0123456789101112131415
var backCard = $(".back_card");
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var attempts = null;
var max_matches = 9;
var games_played = null;
var calculate = null;
var name = null;


function welcomeBox() //Modal Box for Welcome Box
    {
        var welcome = $(".welcome");
        var submit = $(".submit");

        welcome.show();

        submit.click(function(){
            name = $(".name").val(); //get text value from input
            if(name === "") {
                $("header").text("Memory Kitchen");
                $("main").removeClass("hidden");
                welcome.hide();
            } else {
                $("header").text(name + "'s Memory Kitchen");
                $("main").removeClass("hidden");
                welcome.hide();
            }
        });
    }

$(document).ready(function(){
    initializeApp();
    welcomeBox();        
});



function initializeApp(){
        backCard.on("click", handleCardClick);
        shuffle();
    }



function handleCardClick(event){

            $(event.currentTarget).addClass("hidden");

            if(firstCardClicked === null)
                {
                    firstCardClicked = $(event.currentTarget);
                    
                }
            else
                {
                    backCard.off();
                    secondCardClicked = $(event.currentTarget);

                    var front1 = firstCardClicked.next().css("background-image");

                    var front2 = secondCardClicked.next().css("background-image");

                  
        
                    if(front1 === front2) //win condition
                        {
                            matches++;

                            opacityCard();
                           
                            firstCardClicked = null;
                            secondCardClicked = null;
                            clickable = false; //set up to limit the clicks from player
                            
                            displayStats();
                            backCard.on("click", handleCardClick);
                        }

                    else{ // wrong condition

                        setTimeout(function(){

                                firstCardClicked.removeClass("hidden");
                                secondCardClicked.removeClass("hidden");
                                firstCardClicked = null;
                                secondCardClicked = null;
                                displayStats();
                                backCard.on("click", handleCardClick);

                        }, 700);

                        

                        }
                    
                }

            setTimeout(function(){
                clickable = true;
            },800); //let the player can click again   
    }

function shuffle()
    {
        var parent = $(".container");
        var divs = parent.children();
        while(divs.length)
            {
                parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
            }
    }

function resetStats()
    {
        displayStats();

        $(event.currentTarget).removeClass("hidden");
        
    }

function displayStats()
    {
        attempts++;
        $(".attempts").text(attempts);
        calculateAccuracy();
        winModalBox();
    }

function calculateAccuracy()
    {
        calculate =Math.round(matches / attempts * 100);
        $(".accuracy").text(calculate + "%");
    }

function winModalBox()
    {
       
        var modal = $(".modalBox");
        var span = $(".close");
        
        if(matches === max_matches)
        {
            games_played++;
            $(".game_played").text(games_played);
            if(name === "") {
                $(".modalBox").find("p").text("You cooked it!");
            } else {
                $(".modalBox").find("p").text(name + "! You cooked it!");
            }
            modal.show();
        
            span.click(function(){
                modal.hide();
                $("div").find(".back_card").removeClass("hidden");
                $("div").find(".front_card").removeClass("opacityCard");
                $(".attempts").text("0");
                $(".accuracy").text("0");
                
                shuffle();
            });

            calculate = null;
            matches = null;
            attempts = null;
        };

       
    }

function opacityCard(){
    firstCardClicked.next().addClass("opacityCard");
    secondCardClicked.next().addClass("opacityCard"); 
    }


    
