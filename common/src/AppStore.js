import * as React from 'react';
import MockFetch from './mock/MockFetch';
import RestApis from './apis/RestApis';

const AppContext = React.createContext();
const {Provider} = AppContext;

const AppContextProvider = ({children}) => {
  const modeEnum = {init: 1, edit: 2, create: 3};
  const restApi = new RestApis(MockFetch, 'https://www.example.com');

  const [pathogens, setPathogens] = React.useState([]);
  const [currentPid, setCurrentPid] = React.useState();
  const [editMode, setEditMode] = React.useState(modeEnum.init);
  const [showError, setShowError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [landscape, setLandscape] = React.useState(false);

  const safeApiCall = async (func) => {
    setBusy(true);
    try {
      await func();
    } catch (error) {
      setShowError(true);
      setErrorMsg(error);
    }
    setBusy(false);
  } 

  const fetchPathogens = (query) => {
    safeApiCall(async ()=> {
      setPathogens(await restApi.getPathogens(query, 0));
    })
  };

  return (
    <Provider
      value={{
        pathogens,
        setPathogens,
        fetchPathogens,
        modeEnum,
        currentPid,
        setCurrentPid,
        editMode,
        setEditMode,
        showError,
        setShowError,
        errorMsg,
        setErrorMsg,
        busy,
        setBusy,
        landscape,
        setLandscape,
        restApi,
        safeApiCall
      }}>
      {children}
    </Provider>
  );
};

const useAppContext = () => {
  return React.useContext(AppContext);
};

export {AppContextProvider, useAppContext};
