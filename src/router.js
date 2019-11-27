/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
                // =============================================================================
                // Theme Routes
                // =============================================================================
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('./views/Dashboard.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/categories',
                    name: 'Categories',
                    component: () => import('./views/pages/categories/Categories.vue'),
                    meta: {
                        rule: 'admin'
                    }
                },
                {
                    path: '/SubCategories',
                    name: 'SubCategories',
                    component: () => import('./views/pages/subCategories/SubCategories.vue'),
                    meta: {
                        rule: 'admin'
                    }
                },
                {
                    path: '/question-generator',
                    name: 'QuestionGenerator',
                    component: () => import('./views/pages/questiongenerator/QuestionGenerator.vue'),
                    meta: {
                        rule: 'admin'
                    }
                },
                {
                    path: '/music-generator',
                    name: 'MusicQuestionGenerator',
                    component: () => import('./views/pages/questiongenerator/MusicQuestionGenerator.vue'),
                    meta: {
                        rule: 'admin'
                    }
                },
                {
                    path: '/callback',
                    name: 'MusicQuestionGenerator',
                    component: () => import('./views/pages/questiongenerator/MusicQuestionGenerator.vue'),
                    meta: {
                        rule: 'admin'
                    }
                },
                {
                    path: '/pages/not-authorized',
                    name: 'pageNotAuthorized',
                    component: () => import('@/views/pages/NotAuthorized.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-404',
                    name: 'pageError404',
                    component: () => import('@/views/pages/Error404.vue'),
                    meta: {
                        rule: 'editor'
                    }
                }
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})
/* login ve yetki kontrol buradan yapılıyor
router.beforeEach((to, from, next) => {
   

});*/

export default router
