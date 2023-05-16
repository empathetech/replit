/**
 * Function to search for all occurrences of a DNA sequence within a given genome sequence.
 *
 * @param {String} genome - The genome sequence to be searched. A string composed of 'A', 'T', 'C', and 'G'.
 * @param {Array<String>} searchStrings - An array of search strings representing the DNA sequences to be matched. 
 * Each search string will also be composed of 'A', 'T', 'C', and 'G'.
 *
 * @returns {Object} - An object where the keys are the search strings and the values are arrays containing the 
 * starting indices of all matches within the genome. If a search string does not match any sequence in the genome,
 * the corresponding value should be an empty array.
 *
 * @example
 *
 *   const genome = 'ATCGGCTA';
 *   const searchStrings = ['GCT', 'TAC', 'AAA'];
 *   const result = searchGenome(genome, searchStrings);
 *   console.log(result); // { 'GCT': [4], 'TAC': [], 'AAA': [] }
 */
class Solution {
  constructor() {
    
  }
  
  searchGenome(genome, searchStrings) {
    // Implementation here
  }
}

module.exports = Solution;