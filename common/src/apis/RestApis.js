import MockFetch from '../mock/MockFetch';

class RestApis {
  constructor(backendUrl) {
    this.fetch = MockFetch;
    this.backendUrl = backendUrl;
  }

  async getPathogen(id) {
    return this.fetch(
      `${this.backendUrl}/pathogens/${id}`,
    ).then((res) => JSON.parse(res));
  }

  async createPathogen(pathogen) {
    return this.fetch(
      `${this.backendUrl}/pathogens`, {
        method: 'PUT',
        body: JSON.stringify(pathogen)
      }
    ).then((res) => JSON.parse(res));
  }

  async updatePathogen(pathogen) {
    return this.fetch(`${this.backendUrl}/pathogens/${pathogen.id}`, {
      method: 'POST',
      body: JSON.stringify(pathogen),
    });
  }

  async getPathogens(query, pageNumber) {
    return this.fetch(
      `${this.backendUrl}/pathogens/search/?${query}&page=${pageNumber}`,
    ).then((res) => JSON.parse(res));
  }

  async uploadFile(file, id) {
    return this.fetch(`${this.backendUrl}/upload/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;',
      },
      body: file,
    })
  }
}

export default RestApis;