import * as React from 'react';
import MockFetch from '../../mock/MockFetch';
import RestApis from '../../apis/RestApis';

const HomeContext = React.createContext();
const {Provider} = HomeContext;

const HomeContextProvider = ({children}) => {
  const [pathogens, setPathogens] = React.useState([]);
  const restApi = new RestApis(MockFetch, 'https://www.example.com');

  const refresh = async (query) => {
    const pathogens = await restApi.getPathogens(query, 0);
    setPathogens(pathogens);
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
