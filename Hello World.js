var calculator = (function () { 
    
    function calculate(text) {
        var pattern = /\d+|\+|\-|\*|\/|\(|\)/g; //make a pattern to filter for things
        var tokens = text.match(pattern);
        try{
            var val = evaluation(tokens);
            return String(val);
        }
        catch(err){
            return err;}
    }
    
    function read_operand(tokens){
        var num = tokens[0];
        tokens.shift();
        if (num == '('){
            var paren = evaluation(tokens);
            if (tokens[0] != ')')
            {
                throw "unmatched paraenthesis";
            }
            tokens.shift()
            return paren;
        }
        if (num == '-'){
        num = -1*read_operand(tokens);
        }
        else{
        num = parseInt(num);
        }
        if (isNaN(num)) {
            throw "number expected";
        }
        return num;
    }
    
    function throwifempty(tokens){
    if (tokens.length == 0)
        {
            throw "missing operand";
        }
    }
    
    function evaluation(tokens){
        throwifempty(tokens);
        var value = read_operand(tokens);
        while (tokens.length != 0){
            var operator = tokens[0];
            if (operator == ')')
            {
                return value;
            }
            
            tokens.shift();
            throwifempty(tokens);
            var temp = read_operand(tokens);
            switch(operator){
                    case '+':
                        value = value + temp;
                        break;
                    case '-':
                        value = value - temp;
                        break;
                    case '/':
                        value = value / temp;
                        break;
                    case '*':
                        value = value * temp;
                        break;
                    default:
                        throw "unrecognized operator";
            }      
        }
        return value;
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

