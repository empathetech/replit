const { deepMatch } = require("../utils");
const Solution = require("./");

class Tester {
  testCases = [
  {
    description: "Test Number 1: Basic test with one matching and two non-matching strings",
    expected: { "GCT": [4], "TAC": [], "AAA": [] },
    params: { genome: "ATCGGCTA", searchStrings: ["GCT", "TAC", "AAA"] },
  },
  {
    description: "Test Number 2: Test with multiple search strings having multiple matches",
    expected: { "GCT": [4, 17], "TAC": [9, 14, 22], "AAA": []},
    params: { genome: "ATCGGCTAGTACAGTACGCTAGTACG", searchStrings: ["GCT", "TAC", "AAA"] },
  },
  {
    description: "Test Number 3: Test with some search strings matching at the start, middle, and end of the genome sequence",
    expected: {"ATC": [0], "GTAC": [8, 13, 21], "CG": [2, 16, 24] },
    params: { genome: "ATCGGCTAGTACAGTACGCTAGTACG", searchStrings: ["ATC", "GTAC", "CG"] },
  },
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
      console.log("\n");
    }
  }
}

module.exports = Tester;