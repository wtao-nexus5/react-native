let pathogenDb = [];
let forceThrow = false;

const createPathogen = (
  id,
  name,
  scientificName,
  family,
  viralFactor,
  ClinicalSymptoms,
  genomeHashDigest,
) => {
  return {
    id,
    name,
    scientificName,
    family,
    viralFactor,
    ClinicalSymptoms,
    genomeHashDigest,
    genomeUrl: '',
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
    '4d44031560075325c5c465522346bd86',
  ),
);
pathogenDb.push(
  createPathogen(
    1,
    'HIV',
    'Human immunodeficiency viruses ',
    'virus',
    'immunosuppression',
    'similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
    '13ee343d0075325cdeadbe522346cdab',
  ),
);

export default mockfetch = (url, params) => {
  console.log(`api: ${url} is invoked`);
  if (forceThrow) {
    return new Promise((resolve, reject) => {
      throw 'connection lost';
    });
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.indexOf('search') != -1) {
        let index = url.indexOf('?name');
        if (index != -1) {
          let value = url.substr(index + 6);
          index = value.indexOf('&');
          let query = value.substr(0, index);
          let subset = pathogenDb.filter(
            item => item.name.indexOf(query) != -1,
          );
          resolve(JSON.stringify(subset));
        }
      } else if (params == undefined || params.body == undefined) {
        let lastIndex = url.lastIndexOf('/');
        if (lastIndex != -1) {
          let idStr = url.substr(lastIndex + 1);
          let id = parseInt(idStr);
          if (id < pathogenDb.length) {
            resolve(JSON.stringify(pathogenDb[id]));
          }
        }
      } else if (params.method == 'POST' && url.indexOf('pathogens') != -1) {
        let json = JSON.parse(params.body);
        if (json.id >= 0 && json.id < pathogenDb.length) {
          pathogenDb[json.id] = json;
          resolve(JSON.stringify(pathogenDb[json.id]));
        }
      } else if (params.method == 'PUT') {
        let json = JSON.parse(params.body);
        json.id = pathogenDb.length;
        pathogenDb.push(json);
        resolve(JSON.stringify(pathogenDb[pathogenDb.length - 1]));
      } else if (url.indexOf('upload') !== -1) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};
