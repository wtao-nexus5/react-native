import * as React from 'react';
import AppStore from '../appStore';

const HomeContext = React.createContext();
const {Provider} = HomeContext;

const HomeContextProvider = ({children}) => {
  const [pathogens, setPathogens] = React.useState([]);
  const {restApi, setShowError, setErrorMsg} = AppStore.useAppContext();

  const refresh = async (query) => {
    try {
      const pathogens = await restApi.getPathogens(query, 0);
      setPathogens(pathogens);
    } catch (error) {
      setShowError(true);
      setErrorMsg(error);
    }
  };

  return (
    <Provider
      value={{
        pathogens,
        refresh
      }}>
      {children}
    </Provider>
  );
};

const useHomeStoreContext = () => {
  return React.useContext(HomeContext);
};

export default {HomeContextProvider, useHomeStoreContext};
