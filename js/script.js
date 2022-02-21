let blockInput = false;
let memory = "";


function Bagfix(value) {
    try {


        switch (value) {
            case 'clear':
                inputConvLen.value = "";
                break;
            case 'Backspace':
                inputConvLen.value = inputConvLen.value.substring(0, inputConvLen.value.length -1); 
                break;
            
            default:
                inputConvLen.value += value;
                break;
        }
        
        document.querySelector('.length .convertor input[name="output"]').value = Math.round((Number(inputConvLen.value) * factorial.coef + Number.EPSILON) * 1000000) / 1000000;
    } catch (error) {
        console.log(error);
    }
    
}

function calculate(value) {
    if (blockInput)
        return;
    if (/[\+\-]$/g.test(output.value) && /\-$/g.test(value))
        return;
    if( /[\+\-\*%/\^]$/g.test(output.value) && /[\+\*\/%\^]$/g.test(value) ||output.value.length == 0 && /[\+\*\/%\^]$/g.test(value))
        return;
    if (/[\(]$/g.test(output.value) && /[\*\/%\^]$/g.test(value))
        return;
            if (value.match(/=|Enter/)) {
                try {
                    if (output.value.length > 0) {
                        let expr = output.value.replace(/\u221A/gi, 'Math.sqrt');
                        expr = expr.replace('^', '**');
                        let result = Math.round((eval(expr) + Number.EPSILON) * 1000) / 1000;
                        history.innerHTML = output.value;
                        if (result == 0 || result == -0)
                            result = "";
                        output.value = result;
                    }
                } catch (error){
                    console.log(error);
                    let prevValue = output.value;
                    output.value = "Error";
                    blockInput = true;
                    setTimeout(() => {
                        output.value = prevValue;
                        blockInput = false;
                    }, 1500);
                }
            }
            else {
                switch (value) {
                    case 'clear':
                        output.value = "";
                        break;
                    case 'Backspace':
                        output.value = output.value.substring(0, output.value.length -1);
                        break;
                    case 'ms':
                        memory = Math.trunc( eval(output.value));
                        break;
                    case 'mc':
                        memory = "";
                        break; 
                    case 'mr':
                        output.value += memory;
                        break;
                    case 'mplus':
                        memory = Number(memory) + Number(Math.trunc( eval(output.value)));
                        break;
                    case 'mminus':
                        memory = Number(memory) - Number(Math.trunc( eval(output.value)));
                        break;
                    case 'sqrt':
                        output.value += "\u221A(";
                        break;
                    case '!':
                        let reg = /(\(.+\))|(\d+)$/i;
                        let factorial = output.value.match(reg);
                        if (factorial == null)
                            return;
                        factorial = factorial[0];
                        factorial = factorial.replace(/\(|\)/gi, "");
                        factorial = eval(factorial);
                        factorial = math.factorial(factorial);
                        output.value = output.value.replace(reg, factorial);
                        break;
                    case '^':
                        output.value += '^';
                        break;
                    case '0':
                    case '00':
                        if ( output.value.length != 0)
                            output.value += value;
                        break;
                    default:
                        output.value += value;
                        break;
                }
            }
           
    }
let output = document.getElementsByClassName('value');
output = output[0];
let history =  document.getElementById('latestValue');

document.querySelectorAll('.container .num').forEach(num => {
    num.addEventListener('click', function() {
        calculate(this.value);
    });
});

document.addEventListener('keydown', event => {
    if ((event.key).match(/Backspace/)) {
       calculate(event.key)
    }
})
