const { deepMatch } = require("../utils");
const Solution = require("./");

class Tester {
  testCases = [
  {
    description: 'Test Number 1: Basic test with multiple matches and non-matches',
    expected: { 'GCT': [4, 21], 'TAC': [8, 12, 17], 'AAA': [] },
    params: { genome: 'ATCGGCTAGTACAGTACGCTAGTACG', searchStrings: ['GCT', 'TAC', 'AAA'] },
  },
  {
    description: 'Test Number 2: Basic test with different search strings',
    expected: { 'ATC': [0, 13, 18], 'GTAC': [7, 16], 'CG': [1, 14, 19] },
    params: { genome: 'ATCGGCTAGTACAGTACGCTAGTACG', searchStrings: ['ATC', 'GTAC', 'CG'] },
  },
  {
    description: 'Test Number 3: Test with a small genome sequence',
    expected: { 'AT': [0], 'T': [1], 'CG': [] },
    params: { genome: 'AT', searchStrings: ['AT', 'T', 'CG'] },
  },
  {
    description: 'Test Number 4: Test with longer search strings',
    expected: { 'GGCT': [3], 'ATCG': [0, 13, 18], 'TACG': [7, 16] },
    params: { genome: 'ATCGGCTAGTACAGTACGCTAGTACG', searchStrings: ['GGCT', 'ATCG', 'TACG'] },
  },
  {
    description: 'Test Number 5: Edge case with an empty genome sequence',
    expected: { 'GCT': [], 'TAC': [], 'AAA': [] },
    params: { genome: '', searchStrings: ['GCT', 'TAC', 'AAA'] },
  },
  {
    description: 'Test Number 6: Edge case with no search strings',
    expected: {},
    params: { genome: 'ATCGGCTAGTACAGTACGCTAGTACG', searchStrings: [] },
  }
];

  constructor() {

  }

  runTests() {
    const solution = new Solution();
    for (const testCase of this.testCases) {
      const { description, expected, params } = testCase;
      const { genome, searchStrings } = params;
      const actual = solution.searchGenome(genome, searchStrings);
      console.assert(
        deepMatch(
          actual,
          expected
        ), 
        `${description} failed. Expected: ${JSON.stringify(expected)} || Actual: ${JSON.stringify(actual)}`
      );
      console.log('\n');
    }
  }
}

module.exports = Tester;