import * as React from 'react';
import {useAppContext} from '../../AppStore';
import CryptoJS from 'crypto-js';
import validateError from './DetailFieldValidator';

const DetailContext = React.createContext();
const {Provider} = DetailContext;

const DetailContextProvider = ({children}) => {
  const [pathogen, setPathogen] = React.useState({
    id: '',
    name: '',
    scientificName: '',
    family: '',
    viralFactor: '',
    ClinicalSymptoms: '',
    genomeHashDigest: '',
    genomeUrl: '',
  });
  const {
    restApi, 
    pathogens,
    safeApiCall,
    setPathogens
  } = useAppContext();

  const fetchPathogen = pid => {
    safeApiCall( async() => {
      const pathogen = await restApi.getPathogen(pid);
      setPathogen(pathogen);
    });
  };

  const uploadFile = async (pathogen, file) => {
    let copy = {...pathogen};
    return new Promise(resolve => {
      if (file !== undefined) {
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = async event => {
          var md5 = CryptoJS.MD5(event.target.result).toString();
          await restApi.uploadFile(file, pathogen.id);
          copy.genomeHashDigest = md5;
          resolve(copy);
        };
        reader.onerror = () => {
          throw 'bad file';
        };
      } else {
        resolve(copy);
      }
    });
  };

  const updatePathogen = (pathogen, gnomeFile) => {
    safeApiCall( async() => {
      let copy = await uploadFile(pathogen, gnomeFile);
      await restApi.updatePathogen(copy);
      setPathogens(pathogens.map( item => {
        if (item.id == pathogen.id) {
          return copy;
        }
        return item;
      }));
    });
  };

  const createPathogen = async (pathogen, gnomeFile) => {
    return new Promise(resolve => {
      safeApiCall( async() => {
        let copy = await uploadFile(pathogen, gnomeFile);
        copy = await restApi.createPathogen(copy);
        setPathogen(copy);
        setPathogens([...pathogens, copy]);
        resolve(copy);
      });
    });  
  };

  const getPathogenFieldValue = fieldIndex => {
    var keys = Object.keys(pathogen);
    return pathogen[keys[fieldIndex + 1]];
  }

  const fields = [
    'ID_FIELD_NAME',
    'ID_FIELD_SCIENTIFIC_NAME',
    'ID_FIELD_FAMILIY',
    'ID_FIELD_VIRAL_FACTOR',
    'ID_FIELD_SYMPTOMS',
    'ID_FIELD_HASH',
    'CTA',
  ];

  const [fieldErrors, setFieldErrors] = React.useState(fields.map(_ => false));

  const onUpdateField = (fieldIndex, text) => {
    let error = validateError(fields[fieldIndex], text);
    let copy = [...fieldErrors];
    copy[fieldIndex] = error;
    setFieldErrors(copy);

    copy = {...pathogen};
    var keys = Object.keys(copy);
    copy[keys[fieldIndex + 1]] = text;
    setPathogen(copy);
  };

  return (
    <Provider
      value={{
        fields,
        fieldErrors,
        pathogen,
        fetchPathogen,
        onUpdateField,
        updatePathogen,
        createPathogen,
        getPathogenFieldValue,
      }}>
      {children}
    </Provider>
  );
};

const useDetailStoreContext = () => {
  return React.useContext(DetailContext);
};

export {DetailContextProvider, useDetailStoreContext};
