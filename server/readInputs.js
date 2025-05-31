const vm = require('vm');

function readExpectations(probID, sourceCode) {
  const data = require('./questions.json');
  let passCount = 0;
  let failCount = 0;

  // Find the problem
  const problem = data.members.find((item) => item.id === probID);
  if (!problem) {
    return { status: "error", data: "Problem not found." };
  }

  try {
    // Load user code as function (must define a named function)
    const context = {};
    vm.createContext(context);
    vm.runInContext(sourceCode, context);

    for (let testCase of problem.testCases) {
      const inputArgs = Object.values(testCase.input);
      const expectedOutput = testCase.output;

      // Get the function name from user code (assumes one named function)
      const functionName = sourceCode.match(/function\s+([a-zA-Z0-9_]+)/)?.[1];
      if (!functionName) {
        return { status: "error", data: "Function definition not found." };
      }

      const actualOutput = context[functionName](...inputArgs);

      if (actualOutput === expectedOutput) {
        passCount++;
      } else {
        failCount++;
      }
    }

    return { status: "success", data: [passCount, failCount] };

  } catch (err) {
    return { status: "error", data: err.message };
  }
}

module.exports = readExpectations;