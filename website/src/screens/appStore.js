import * as React from 'react';
import MockFetch from '../mock/MockFetch';
import RestApis from '../apis/RestApis';

const AppContext = React.createContext();
const {Provider} = AppContext;

const AppContextProvider = ({children}) => {
  const [dirty, setDirty] = React.useState(true);
  const [currentPid, setCurrentPid] = React.useState();
  const [editMode, setEditMode] = React.useState('init');
  const restApi = new RestApis(MockFetch, 'https://www.example.com');

  return (
    <Provider
      value={{
        restApi,
        dirty,
        setDirty,
        currentPid,
        setCurrentPid,
        editMode,
        setEditMode
      }}>
      {children}
    </Provider>
  );
};

const useAppContext = () => {
    return React.useContext(AppContext);
};

export default {AppContextProvider, useAppContext};
