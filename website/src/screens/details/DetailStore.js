import * as React from 'react';
import AppStore from '../appStore';

const DetailContext = React.createContext();
const {Provider} = DetailContext;

const DetailContextProvider = ({children}) => {
  const [pathogen, setPathogen] = React.useState({
    name: '',
    scientificName: '',
    family: '',
    viralFactor: '',
    ClinicalSymptoms: '',
  });
  const [pid, setPid] = React.useState();
  const {restApi} = AppStore.useAppContext();

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

  const getPathogenFieldValue = fieldIndex => {
    switch (fieldIndex) {
      case 0:
        return pathogen.name;
      case 1:
        return pathogen.scientificName;
      case 2:
        return pathogen.family;
      case 3:
        return pathogen.viralFactor;
      case 4:
        return pathogen.ClinicalSymptoms;
    }
    return '';
  };

  const updatePathogenFieldValue = (fieldIndex, value) => {
    let copy = {...pathogen};
    switch (fieldIndex) {
      case 0:
        copy.name = value;
        break;
      case 1:
        copy.scientificName = value;
        break;
      case 2:
        copy.family = value;
        break;
      case 3:
        copy.viralFactor = value;
        break;
      case 4:
        copy.ClinicalSymptoms = value;
        break;
    }
    setPathogen(copy);
  };

  const fields = [
    'Name',
    'Scientific Name',
    'Family',
    'Viral Factor',
    'Clinical Symptoms',
  ];

  return (
    <Provider
      value={{
        fields,
        pathogen,
        updatePathogen,
        createPathogen,
        getPathogenFieldValue,
        updatePathogenFieldValue,
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
