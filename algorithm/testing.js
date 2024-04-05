function reverseStringWithNumber(str) {
  // Memisahkan angka dari huruf
  const letters = str.match(/[A-Za-z]/g);
  const numbers = str.match(/\d/g);

  if (!letters) {
      return str;
  }

  
  const reversedLetters = letters.reverse().join('');

  
  const result = reversedLetters + (numbers ? numbers.join('') : '');
  
  return result;
}

const inputString = "NEGIE1";
const reversedString = reverseStringWithNumber(inputString);
console.log(reversedString);  


function longest(sentence) {
  const words = sentence.split(' ');
  let longestWord = '';

  for (const word of words) {
      if (word.length > longestWord.length) {
          longestWord = word;
      }
  }

  return longestWord;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const longestWord = longest(sentence);
console.log(longestWord); 

function countOccurrences(INPUT, QUERY) {
  const occurrenceCount = QUERY.map(queryWord => {
      return INPUT.filter(inputWord => inputWord === queryWord).length;
  });
  return occurrenceCount;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

const output = countOccurrences(INPUT, QUERY);
console.log(output); 


function diagonalDifference(matrix) {
  let diagonal1 = 0;
  let diagonal2 = 0;

  for (let i = 0; i < matrix.length; i++) {
      diagonal1 += matrix[i][i];
      diagonal2 += matrix[i][matrix.length - 1 - i];
  }

  return Math.abs(diagonal1 - diagonal2);
}

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
const result = diagonalDifference(matrix);
console.log(result); 
