const processData = input => {
    const inputArray = input.includes('\r')
      ? input.split('\r\n')
      : input.split('\n');
    const resultArray = [];
    for (let input of inputArray) {
      //Case Split:
      if (input[0] === 'S') {
        console.log(processSplit(input.substring(4, input.length)));
      }
      //Case Concat:
      else if (input[0] === 'C') {
        console.log(processConcat(input.substring(4, input.length), input[2]));
      }
    }

    //Helper Functions
    //Case Split:
    function processSplit(input) {
      let processedInput = '';
      for (let i = 0; i < input.length; i++) {
        //Case 1: Method's parenthesis -> End
        if (input[i] === '(') {
          break;
          //Case 2: Letter is uppercase -> Add a space before
          //Only apply for none-beginning letters (i != 0)
        } else if (input[i] === input[i].toUpperCase() && i > 0) {
          processedInput += ' ' + input[i].toLowerCase();
        }
        //Case3: Regular letters
        else {
          processedInput += input[i].toLowerCase();
        }
      }
      return processedInput;
    }
    //Case Concat:
    function processConcat(input, type) {
      let processedInputArr = input.split(' ');
      let processedInput = '';
      for (let i = 0; i < processedInputArr.length; i++) {
        //Case1: Concatenate into a Variable or Method for first letter
        if (i === 0 && ['M', 'V'].includes(type)) {
          processedInput += processedInputArr[0];
        }
        //Case2: After first letter, upper case all beginning letters
        else {
          processedInput +=
            processedInputArr[i][0].toUpperCase() +
            processedInputArr[i].substring(1, processedInputArr[i].length);
        }
      }
      //Case 3: Add method parenthesis
      if (type === 'M') {
        processedInput += '()';
      }

      return processedInput;
    }
}

processData("S;M;plasticCup() C;V;mobile phone C;C;coffee machine S;C;LargeSoftwareBook C;M;white sheet of paper S;V;pictureFrame")