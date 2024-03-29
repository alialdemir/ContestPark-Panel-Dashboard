import CategoryActions from './actions/categoryActions';
import LoginAction from './actions/loginAction';
import SpotifyActions from './actions/musicQuestionGeneratorActions';
import QuestionGeneratorActions from './actions/questionGeneratorActions';
import SubCategoryActions from './actions/subCategoryActions';

const actions = {
    ...CategoryActions,
    ...LoginAction,
    ...QuestionGeneratorActions,
    ...SubCategoryActions,
    ...SpotifyActions,

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
}

// request burada atılıyor
export default actions