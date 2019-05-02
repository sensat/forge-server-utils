const { get, post, DefaultHost } = require('./common');
const { AuthenticationClient } = require('./authentication');

const RootPath = '/modelderivative/v2';
const ReadTokenScopes = ['data:read'];
const WriteTokenScopes = ['data:read', 'data:write', 'data:create'];

/**
 * Client providing access to Autodesk Forge
 * {@link https://forge.autodesk.com/en/docs/model-derivative/v2|model derivative APIs}.
 * @tutorial model-derivative
 */
class ModelDerivativeClient {
    /**
     * Initializes new client with specific Forge app credentials.
     * @param {AuthenticationClient} auth Authentication client used to obtain tokens
     * @param {string} [host="https://developer.api.autodesk.com"] Forge API host.
     * for all requests.
     */
    constructor(auth, host = DefaultHost) {
        this.auth = auth;
        this.host = host;
    }

    /**
     * Gets a list of supported translation formats.
     * ({@link https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/formats-GET|docs}).
     * @async
     * @yields {Promise<object>} Dictionary of all supported output formats
     * mapped to arrays of formats these outputs can be obtained from.
     * @throws Error when the request fails, for example, due to insufficient rights.
     */
    async formats() {
        const authentication = await this.auth.authenticate(ReadTokenScopes);
        const response = await get(`${this.host}${RootPath}/designdata/formats`, { 'Authorization': 'Bearer ' + authentication.access_token });
        return response.formats;
    }

    /**
     * Submits a translation job
     * ({@link https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST|docs}).
     * @async
     * @param {string} urn Document to be translated.
     * @param {object[]} outputs List of requested output formats. Currently the one
     * supported format is `{ type: 'svf', views: ['2d', '3d'] }`.
     * @returns {Promise<object>} Translation job details, with properties 'result',
     * 'urn', and 'acceptedJobs'.
     * @throws Error when the request fails, for example, due to insufficient rights.
     */
    async submitJob(urn, outputs) {
        const authentication = await this.auth.authenticate(WriteTokenScopes);
        const params = {
            input: {
                urn: urn
            },
            output: {
                formats: outputs
            }
        };
        const response = await post(`${this.host}${RootPath}/designdata/job`, { json: params }, { 'Authorization': 'Bearer ' + authentication.access_token });
        return response;
    }

    /**
     * Retrieves manifest of a derivative.
     * ({@link https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/urn-manifest-GET|docs}).
     * @async
     * @param {string} urn Document derivative URN.
     * @returns {Promise<object>} Document derivative manifest.
     * @throws Error when the request fails, for example, due to insufficient rights.
     */
    async getManifest(urn) {
        const authentication = await this.auth.authenticate(ReadTokenScopes);
        const response = await get(`${this.host}${RootPath}/designdata/${urn}/manifest`, { 'Authorization': 'Bearer ' + authentication.access_token });
        return response;
    }

    /**
     * Retrieves metadata of a derivative.
     * ({@link https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/urn-metadata-GET|docs}).
     * @async
     * @param {string} urn Document derivative URN.
     * @returns {Promise<object>} Document derivative metadata.
     * @throws Error when the request fails, for example, due to insufficient rights.
     */
    async getMetadata(urn) {
        const authentication = await this.auth.authenticate(ReadTokenScopes);
        const response = await get(`${this.host}${RootPath}/designdata/${urn}/metadata`, { 'Authorization': 'Bearer ' + authentication.access_token });
        return response;
    }

    /**
     * Retrieves object tree of a specific viewable.
     * ({@link https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/urn-metadata-guid-GET|docs}).
     * @async
     * @param {string} urn Document derivative URN.
     * @param {string} guid Viewable GUID.
     * @returns {Promise<object>} Viewable object tree.
     * @throws Error when the request fails, for example, due to insufficient rights.
     */
    async getViewableTree(urn, guid) {
        const authentication = await this.auth.authenticate(ReadTokenScopes);
        const response = await get(`${this.host}${RootPath}/designdata/${urn}/metadata/${guid}`, { 'Authorization': 'Bearer ' + authentication.access_token });
        return response;
    }

    /**
     * Retrieves properties of a specific viewable.
     * ({@link https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/urn-metadata-guid-properties-GET|docs}).
     * @async
     * @param {string} urn Document derivative URN.
     * @param {string} guid Viewable GUID.
     * @returns {Promise<object>} Viewable properties.
     * @throws Error when the request fails, for example, due to insufficient rights.
     */
    async getViewableProperties(urn, guid) {
        const authentication = await this.auth.authenticate(ReadTokenScopes);
        const response = await get(`${this.host}${RootPath}/designdata/${urn}/metadata/${guid}/properties`, { 'Authorization': 'Bearer ' + authentication.access_token });
        return response;
    }
}

module.exports = {
    ModelDerivativeClient
};