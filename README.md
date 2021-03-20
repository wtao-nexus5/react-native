# React-native and React sandbox
Frontend only. Backend mocked.

Implemented a pathogen libray app for both mobile and website using react. 

* Points of consideration are desribed in the [Features](#features) section
* Additional questions can be found in the [questionnaire.md](./questionnaire.md) file
* Database schema at [db-schema.md](./db-schema.md) file

## Screenshots
<div style="display: flex; flex-direction: row;">
    <img src="./assets/ios1.png" width="180" />
    <img src="./assets/ios2.png" width="180" />
</div>

## Features
| Features      | Mobile (android+ios) | Website | Notes
| ----------- | ----------- | ----------- | ----------- |
| List pathogens      | ✅       | ✅       |
| Create/update a pathogen   | ✅       | ✅       |
| Search by name   | ✅       | ✅       |
| Search by gnome   | ❌      |  ❌      | TODO: <br />1. Upload a gnome file to calculate a MD5 hash<br /> 2. Then query exiting pathogens with same hash value
| Search result pagination   | ❌      |  ❌      | TODO: <br />page number placeholder http parameter has been added 
| Add tag   | ❌      |  ❌      |
| Upload gnome file   | ❌      |  ✅      | MD5 hash is generated
| Responsive UI   | ✅      |  ✅      | For mobile tablet device: <br/>Rotate tablet to landscape mode to see the change <br/><br/>For web app: Change browser size to see the change
| Deeplink   | ❌      |  ❌      |
| Material UI design language      | ✅       | ✅       | Architecture item
| Input field validation      | ✅       | ✅       | Architecture item<br /> Keywords:<br /> `updateFieldError`, `DetailFieldValidator.js`
| Internationalization      | ✅       | ✅       | Architecture item<br /> Keywords:<br /> `<I18nStore.I18nProvider>`, `currentDictionary`
| Unified error handling      | ✅       | ✅       | Architecture item<br /> Keywords: <br />`<Snackbar>`, `[showError, setShowError]`, `[errorMsg, setErrorMsg]`
| Unified progress indicator      | ✅       | ✅       | Architecture item<br /> Keywords: <br />`[busy, setBusy]`, `pointerEvents`
| Share code between react native and react apps      | ✅      | ✅      | Architecture item<br /> Created common library <br/><br />Keywords: <br />`common-lib`
| Local cache      | ❌      | ❌      | Architecture item<br /> TODO: <br />Need to work with backend to take advatange of HTTP code 304 for cache management
| Runtime exception report      | ❌      | ❌      | Architecture item<br /> TODO: <br />Integration solutions such as sentry.io or logRocket.com
| Unit test   | ✅      |  ✅      | Architecture item <br />1. Separate UI view tests from business logic tests<br /> 2. Test driven developmnent <br /> 3. Produce test coverage report. <br/> <br/>Keywords:<br />`jest --collect-coverage`
| Analytics, A/B testing   | ❌      |  ❌      | Architecture item<br />TODO: <br />Intgretion with Google Analytics or Firebase.
| CI   | ❌      |  ❌      | TODO: <br />1. Integration with SonarQube <br /> 2. Integration with Fastlane for app automation <br/> 3. Integration BrowserStack for end-2-end test

## Build and Run
| app      | build | run | note
| ----------- | ----------- | ----------- | ----------- |
| Website      | `yarn install`    | `yarn run`     | Source code under website folder
| iOS      | `yarn install`<br/>`npx pod-install ios` <br/> `npx react-native link react-native-vector-icons`<br/>`npx react-native link react-native-device-info` <br/>`npx react-native start`  | `npx react-native run-ios`     | Source code under mobile folder
| Android      | `yarn install`<br/>`npx react-native start`    | `npx react-native run-android`     | Source code under mobile folder
