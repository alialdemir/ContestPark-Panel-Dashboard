import SpotifyWebApi from 'spotify-web-api-node';

var scopes = ['user-read-private', 'user-read-email'],
    redirectUri = 'http://localhost:8080/callback',
    clientId = '017634a0bbaf4809a2ca30e1603ce924',
    secretId = 'c5e875173df5466bb53405a87174c7d4',
    state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
    redirectUri,
    clientId,
    secretId
});

const SpotifyActions = {

    /**
     * Spotift login
     */
    spotifyAuth() {


        // Create the authorization URL
        var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

        // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
        location.href = authorizeURL;

    },

    async getArtist({ commit }, artistId) {
        const { data, status } = spotifyApi.getArtist(artistId);
        if (status === 200) {
            console.log(data);
            commit('GET_CATEGORIES', []);
        }
    },

    setAccessToken({ commit }, code) {
        var res = spotifyApi.clientCredentialsGrant(code, (e1) => {

            console.log(e1);
        });

        console.log(res);
        commit('GET_CATEGORIES', []);

    }

}

export default SpotifyActions