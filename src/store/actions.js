/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from 'axios';

const actions = {

    // ////////////////////////////////////////////
    // SIDEBAR & UI UX
    // ////////////////////////////////////////////

    updateSidebarWidth({ commit }, width) {
        commit('UPDATE_SIDEBAR_WIDTH', width);
    },
    updateI18nLocale({ commit }, locale) {
        commit('UPDATE_I18N_LOCALE', locale);
    },
    toggleContentOverlay({ commit }) {
        commit('TOGGLE_CONTENT_OVERLAY');
    },
    updateTheme({ commit }, val) {
        commit('UPDATE_THEME', val);
    },
    updateUserRole({ commit }, val) {
        commit('UPDATE_USER_ROLE', val);
    },


    // ////////////////////////////////////////////
    // COMPONENT
    // //////////////////////////////////////////// 

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
        commit('UPDATE_STARRED_PAGE', payload)
    },

    //  The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // ////////////////////////////////////////////
    // My actions
    // //////////////////////////////////////////// 

    /**
     * Get altcategories dropdown
     */
    getSubCategoriesDropdown({ commit }) {
        axios.get('/SubCategories')
            .then(response => commit('subCategoriesDropdown', response))
            .catch((thrown) => {
                if (axios.isCancel(thrown)) {
                    alert('Request canceled', thrown.message);
                } else {
                    // handle error
                }
            });
    },
    /**
     * Google translate
     */
    translate({ commit }, data) {
        return new Promise((resolve) => {
            const url =
                "https://www.googleapis.com/language/translate/v2?key=" +
                "AIzaSyAeXkVGJsu5rn2U7gZLDk8qR7b0Zj23q6I" +
                "&target=" +
                data.target +
                "&source=" +
                data.source +
                "&q=" +
                encodeURI(data.textToTranslate);

            axios.get(url)
                .then(response => {
                    const translatedText = (
                        (
                            (

                                (
                                    response.data || {}
                                ).data || {}
                            ).translations || []
                        ).pop() || {}
                    ).translatedText || '';

                    commit('TRANSLATED_TEXT', {
                        textToTranslate: data.textToTranslate,
                        translatedText: translatedText
                    });
                    resolve(translatedText);
                })
                .catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        alert('Request canceled', thrown.message);
                    } else {
                        // handle error
                    }
                });
        })
    },

    // Şıklara random şeçenekler oluşturur
    getRandomAnswersFromArray({ commit }, data) {
        const { answers, correctStylish } = data;

        if (typeof answers === 'undefined' || answers.length < 4) {
            return;
        }

        let currentIndex = answers.length,
            temporaryValue,
            randomIndex,
            stylishIndex = 3;

        const result = {
            correctStylish: correctStylish.toLowerCase()
                .charAt(0)
                .toUpperCase() + correctStylish.substr(1).toLowerCase(),
            language: data.language,
            link: data.link,
            question: data.question
        };

        // While there remain elements to shuffle...
        while (0 !== stylishIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = answers[randomIndex];

            if (
                !(
                    result.correctStylish === temporaryValue ||
                    result.stylish1 === temporaryValue ||
                    result.stylish2 === temporaryValue ||
                    result.stylish3 === temporaryValue
                )
            ) {
                result["stylish" + stylishIndex] = temporaryValue.toLowerCase()
                    .charAt(0)
                    .toUpperCase() + temporaryValue.substr(1).toLowerCase();

                stylishIndex -= 1;
            }
            if (
                result.correctStylish !== undefined &&
                result.stylish1 !== undefined &&
                result.stylish2 !== undefined &&
                result.stylish3 !== undefined
            ) {
                break;
            }
        }

        commit('GET_RANDOM_ANSWERS_FROM_ARRAY', result);
    },
    /**
     * Cevap şıkları listesini temizler
     * @param {*} param0 
     */
    clearQuestionAnswer({ commit }) {
        commit('CLEAR_QUESTION_ANSWER');
    }
}

// request burada atılıyor
export default actions