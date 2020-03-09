import axios from 'axios';

const questionGeneratorActions = {
    /**
       * Yeni soru ekle
       */
    async addQuestions({ commit }, questions) {
        const { status } = await axios.post('/Question', questions);

        if (status === 200) {
            alert('Sorular eklendi.');
        }
        if (status === 5001) {
            commit('test');
        }
    },

}

export default questionGeneratorActions