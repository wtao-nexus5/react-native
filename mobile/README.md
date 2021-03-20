# React Native mobile app
## Unit test with jest and react native testing library
1. Jest setup is included by default when running `npx react-native init <project name>`. Overview can be found at [here](https://jestjs.io/docs/tutorial-react-native#setup)

2. `react-navigation` provides the [instruction](https://reactnavigation.org/docs/testing/) to create a [setup_react-navigation.js](./jest/setup_react-navigation.js) file and provision the [package.json](./package.json)

3. `react-native-device-info` is also similarily provisioned by a [setup_react-native-device-info.js](./jest/setup_react-native-device-info.js) file and in the [package.json](./package.json)

4. Render using `@testing-library/react-native`. Documentation at [here](https://callstack.github.io/react-native-testing-library/docs/getting-started/). 

5. Visual Studio Code to install the `Jest Runner` extension - make sure your unit test file is name as xxx.test.js so that you can `Run or Interactively debug with breakpoints`with you test cases.

6. Add this line `jest.useFakeTimers();` to the top of your test file for the [fix](https://github.com/facebook/jest/issues/6434)

7. Write your unit test and happy TDD. An quick example at [here](https://www.youtube.com/watch?v=CpTQb0XWlRc&t=197s)