import * as React from 'react';
import RestApis from './apis/RestApis';

const AppContext = React.createContext();
const {Provider} = AppContext;

const AppContextProvider = (props) => {
  const modeEnum = {init: 1, edit: 2, create: 3};
  const restApi = props.api;

  const [pathogens, setPathogens] = React.useState([]);
  const [currentPid, setCurrentPid] = React.useState();
  const [editMode, setEditMode] = React.useState(modeEnum.init);
  const [showError, setShowError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [landscape, setLandscape] = React.useState(false);
  const [dirty, setDirty] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

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

  return (
    <Provider
      value={{
        pathogens,
        setPathogens,
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
        safeApiCall,
        searchQuery,
        setSearchQuery,
        dirty,
        setDirty
      }}>
      {props.children}
    </Provider>
  );
};

const useAppContext = () => {
  return React.useContext(AppContext);
};

export default {AppContextProvider, useAppContext};
