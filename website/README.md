# React website library
## Unit test with jest
1. Jest setup is included by default when running `npx create-react-app <project name>`. Overview can be found at [here](https://reactjs.org/docs/testing.html)

2. A `babel.config.js` is provisioned with presets and supports for `async/await`

3. Render using the `Enzyme` library. Documentation at [here](https://enzymejs.github.io/enzyme/#basic-usage). Make sure `Enzyme`'s version matches `react` version as described [here](https://enzymejs.github.io/enzyme/docs/installation/react-16.html)

4. Visual Studio Code to install the `Jest Runner` extension - make sure your unit test file is name as xxx.test.js so that you can `Run or Interactively debug with breakpoints`with you test cases.

5. Write your unit test and happy TDD