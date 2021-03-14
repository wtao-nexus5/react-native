import * as React from 'react';
import AppStore from '../appStore';
import CryptoJS from 'crypto-js';

const DetailContext = React.createContext();
const { Provider } = DetailContext;

const DetailContextProvider = ({ children }) => {
    const emptyPathogen = {
        name: '',
        scientificName: '',
        family: '',
        viralFactor: '',
        ClinicalSymptoms: '',
        genomeHashDigest: '',
        genomeUrl: ''
    };
    const [pathogen, setPathogen] = React.useState(emptyPathogen);
    const { restApi } = AppStore.useAppContext();

    const fetchPathogen = async (pid) => {
        const pathogen = await restApi.getPathogen(pid);
        setPathogen(pathogen);
    };

    const uploadFile = async (pathogen, file) => {
        let copy = { ...pathogen };
        return new Promise((resolve) => {
            if (file !== undefined) {
                let reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = async (event) => {
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

    const updatePathogen = async (pathogen, gnomeFile) => {
        let copy = await uploadFile(pathogen, gnomeFile);
        setPathogen(copy);
        return restApi.updatePathogen(copy);
    };

    const createPathogen = async (pathogen, gnomeFile) => {
        let copy = await uploadFile(pathogen, gnomeFile);
        setPathogen(copy);
        return restApi.createPathogen(copy);
    };

    const getPathogenFieldValue = (fieldIndex) => {
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
            case 5:
                return pathogen.genomeHashDigest;
        }
        return '';
    };

    const updatePathogenFieldValue = (fieldIndex, value) => {
        let copy = { ...pathogen };
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

    const resetPathogen = () => setPathogen(emptyPathogen);

    const fields = [
        'ID_FIELD_NAME',
        'ID_FIELD_SCIENTIFIC_NAME',
        'ID_FIELD_FAMILIY',
        'ID_FIELD_VIRAL_FACTOR',
        'ID_FIELD_SYMPTOMS',
        'ID_FIELD_HASH',
    ];

    const [fieldErrors, setFieldErrors] = React.useState(
        fields.map((item) => false)
    );
    const updateFieldError = (fieldIndex, error) => {
        let copy = [...fieldErrors];
        copy[fieldIndex] = error;
        setFieldErrors(copy);
    };

    return (
        <Provider
            value={{
                fields,
                pathogen,
                updatePathogen,
                createPathogen,
                getPathogenFieldValue,
                updatePathogenFieldValue,
                fetchPathogen,
                resetPathogen,
                fieldErrors,
                updateFieldError,
            }}
        >
            {children}
        </Provider>
    );
};

const useDetailStoreContext = () => {
    return React.useContext(DetailContext);
};

export default { DetailContextProvider, useDetailStoreContext };
