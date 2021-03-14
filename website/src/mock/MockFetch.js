let pathogenDb = [];
let forceThrow = false;

const createPathogen = (
    id,
    name,
    scientificName,
    family,
    viralFactor,
    ClinicalSymptoms,
    genomeHashDigest
) => {
    return {
        id,
        name,
        scientificName,
        family,
        viralFactor,
        ClinicalSymptoms,
        genomeHashDigest,
        genomeUrl: ''
    };
};

pathogenDb.push(
    createPathogen(
        0,
        'HPV',
        'Human papillomavirus',
        'virus',
        'colonization',
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
        '4d44031560075325c5c465522346bd86'
    )
);
pathogenDb.push(
    createPathogen(
        1,
        'HIV',
        'Human immunodeficiency viruses ',
        'virus',
        'immunosuppression',
        'similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
        '13ee343d0075325cdeadbe522346cdab'
    )
);

const mockfetch = (url, params) => {
    console.log(`api: ${url} is invoked`);
    if (forceThrow) {
        return new Promise((resolve, reject) => {
            throw 'connection lost';
        });
    }

    if (url.indexOf('search') !== -1) {
        let index = url.indexOf('?name');
        if (index != -1) {
            let value = url.substr(index + 6);
            index = value.indexOf('&');
            let query = value.substr(0, index);
            return new Promise((resolve, reject) => {
                let subset = pathogenDb.filter(
                    (item) => item.name.indexOf(query) != -1
                );
                resolve(JSON.stringify(subset));
            });
        }
    }
    if (params === undefined || params.body === undefined) {
        let lastIndex = url.lastIndexOf('/');
        if (lastIndex !== -1) {
            let idStr = url.substr(lastIndex + 1);
            let id = parseInt(idStr);
            if (id < pathogenDb.length) {
                return new Promise((resolve, reject) => {
                    resolve(JSON.stringify(pathogenDb[id]));
                });
            }
        }
    }
    if (params.method === 'POST' && url.indexOf('pathogens') !== -1) {
        let json = JSON.parse(params.body);
        if (json.id >= 0 && json.id < pathogenDb.length) {
            pathogenDb[json.id] = json;
            return new Promise((resolve, reject) => {
                resolve(JSON.stringify({ id: json.id }));
            });
        }
    }
    if (params.method === 'PUT') {
        let json = JSON.parse(params.body);
        json.id = pathogenDb.length;
        pathogenDb.push(json);
        return new Promise((resolve, reject) => {
            resolve(JSON.stringify({ id: json.id }));
        });
    }
    if (url.indexOf('upload') !== -1) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }

    return new Promise((resolve, reject) => {
        reject();
    });
};

export default mockfetch;
