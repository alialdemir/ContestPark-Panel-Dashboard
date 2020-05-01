import axios from 'axios';

const questionGeneratorActions = {
    /**
       * Yeni soru ekle
       */
    async addQuestions({ commit }, questions) {
        const { status } = await axios.post('/Question', questions.data);

        if (status === 200) {
            questions.$vs.loading.close();
            questions.$vs.notify({
                time: 2500,
                title: 'Başarılı!',
                text: "Sorular eklendi!",
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
            });

            setTimeout(() => location.reload(), 3000);
        }
        else {
            questions.$vs.loading.close();
            questions.$vs.notify({
                time: 2500,
                title: 'Error!',
                text: "Sorular eklenemedi",
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
            });

        }
    },

}

export default questionGeneratorActions