var calculator = (function () { 
    
    function calculate(text) {
        var pattern = /\d+|\+|\-|\*|\/|\(|\)/g; //make a pattern to filter for things
        var tokens = text.match(pattern);
        return JSON.stringify(tokens);
        //console.log(val);
    }
    
    function setup(div){
        var input = $('<input></input>',{type: 'text', size:50});
        var output = $('<div></div>');
        var button = $('<button>Calculate</button>');
        $(div).append(input,button,output);
        button.on('click', function (event){
            output.text (calculate(input.val()));
        });
    }
    
    return {
        calculator: calculate,
        setup: setup
    };
})();

$(document).ready(function () {
    $('.calc').each(function() {
        calculator.setup(this);
    });
});

