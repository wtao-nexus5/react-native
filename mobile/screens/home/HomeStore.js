import * as React from 'react';
import AppStore from '../appStore';

const HomeContext = React.createContext();
const {Provider} = HomeContext;

const HomeContextProvider = ({children}) => {
  const [dirty, setDirty] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Provider
      value={{
        searchQuery,
        setSearchQuery,
        dirty,
        setDirty
      }}>
      {children}
    </Provider>
  );
};

const useHomeStoreContext = () => {
  return React.useContext(HomeContext);
};

export default {HomeContextProvider, useHomeStoreContext};
