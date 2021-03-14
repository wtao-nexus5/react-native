import * as React from 'react';
import AppStore from '../appStore';

const DetailContext = React.createContext();
const { Provider } = DetailContext;

const DetailContextProvider = ({ children }) => {
    const emptyPathogen = {
        name: '',
        scientificName: '',
        family: '',
        viralFactor: '',
        ClinicalSymptoms: '',
    };
    const [pathogen, setPathogen] = React.useState(emptyPathogen);
    const [pid, setPid] = React.useState();
    const { restApi } = AppStore.useAppContext();

    const fetchPathogen = async (pid) => {
        const pathogen = await restApi.getPathogen(pid);
        setPathogen(pathogen);
    };

    const updatePathogen = async (pathogen) => {
        return restApi.updatePathogen(pathogen);
    };

    const createPathogen = async (pathogen) => {
        return restApi.createPathogen(pathogen);
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
    ];

    const [fieldErrors, setFieldErrors] = React.useState(fields.map(item => false));
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
                updateFieldError
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
