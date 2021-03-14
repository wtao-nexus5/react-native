import * as React from 'react';
import MockFetch from '../../mock/MockFetch';
import RestApis from '../../apis/RestApis';

const DetailContext = React.createContext();
const {Provider} = DetailContext;

const DetailContextProvider = ({children}) => {
  const [pathogen, setPathogen] = React.useState();
  const [pid, setPid] = React.useState();
  const restApi = new RestApis(MockFetch, 'https://www.example.com');

  React.useEffect(() => {
    const fetch = async () => {
      const pathogen = await restApi.getPathogen(pid);
      setPathogen(pathogen);
    };
    if (pid != undefined) {
      fetch();
    }
  }, [pid]);

  const updatePathogen = async pathogen => {
    await restApi.updatePathogen(pathogen);
  };

  const createPathogen = async pathogen => {
    await restApi.createPathogen(pathogen);
  };

  return (
    <Provider
      value={{
        pathogen,
        updatePathogen,
        createPathogen,
        setPid,
      }}>
      {children}
    </Provider>
  );
};

const useDetailStoreContext = () => {
  return React.useContext(DetailContext);
};

export default {DetailContextProvider, useDetailStoreContext};
