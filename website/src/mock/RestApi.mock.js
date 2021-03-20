let pathogens = [{
    id: 0,
    name: 'covid-19',
    scientificName: 'covid-19',
    family: 'virus',
    viralFactor: 'airbone',
    ClinicalSymptoms: 'death',
    genomeHashDigest: '1234567',
    genomeUrl: '',
}];

const RestApiMock = () => {
    return {
        getPathogen: async (id) => {
            return Promise.resolve(pathogens[id]);
        },
        createPathogen: async (pathogen) => {
            pathogen.id = pathogens.length;
            pathogens.push(pathogen);
            return Promise.resolve(pathogen);
        },
        updatePathogen: async (pathogen) => {
            pathogens[pathogen.id] = pathogen;
            return Promise.resolve(pathogen);
        },
        getPathogens: async () => {
            return Promise.resolve(pathogens);
        },
        uploadFile: async() => {
            return Promise.resolve();
        }
    };
}

export default RestApiMock;