import axios from 'axios';

const SpotifyActions = {

    /**
        * Music questions generator
        */
    async addMusicQuestions({ commit }, data) {
        const { status } = await axios.post(
            `/Question/Spotify/${data.spotifyId}?subCategoryId=${data.subCategoryId}&spotifyQuestionType=${data.spotifyQuestionType}`
        );
        if (status === 200) {
            alert('Şarkı soruları ekledi.');
        }
        else {
            alert('Sorular eklenirken hata oluştu.')
        }

        if (status == 23214) {
            commit('');
        }
    },
}

export default SpotifyActions