import * as React from 'react';
import MockFetch from '../mock/MockFetch';
import RestApis from '../apis/RestApis';

const AppContext = React.createContext();
const {Provider} = AppContext;

const AppContextProvider = ({children}) => {
  const modeEnum = {init:1, edit:2, create:3};

  const [dirty, setDirty] = React.useState(true);
  const [currentPid, setCurrentPid] = React.useState();
  const [editMode, setEditMode] = React.useState(modeEnum.init);
  const restApi = new RestApis(MockFetch, 'https://www.example.com');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Provider
      value={{
        modeEnum,
        restApi,
        dirty,
        setDirty,
        currentPid,
        setCurrentPid,
        editMode,
        setEditMode,
        searchQuery,
        setSearchQuery
      }}>
      {children}
    </Provider>
  );
};

const useAppContext = () => {
    return React.useContext(AppContext);
};

export default {AppContextProvider, useAppContext};
