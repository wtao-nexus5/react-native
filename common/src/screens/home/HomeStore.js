import * as React from 'react';
import AppStore from '../../AppStore';

const HomeContext = React.createContext();
const {Provider} = HomeContext;

const HomeContextProvider = ({children}) => {
  const {
    restApi, 
    safeApiCall,
    setPathogens,
  } = AppStore.useAppContext();

  const fetchPathogens = (query) => {
    safeApiCall(async ()=> {
      setPathogens(await restApi.getPathogens(query, 0));
    })
  };
  return (
    <Provider
      value={{
        fetchPathogens
      }}>
      {children}
    </Provider>
  );
};

const useHomeStoreContext = () => {
  return React.useContext(HomeContext);
};

export default {HomeContextProvider, useHomeStoreContext};
