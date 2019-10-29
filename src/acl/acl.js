import router from '@/router'
import Vue from 'vue'
import { AclCreate, AclInstaller, AclRule } from 'vue-acl'

Vue.use(AclInstaller)

let initialRole = 'admin'
if (localStorage.getItem('userRole')) initialRole = localStorage.getItem('userRole')

export default new AclCreate({
  initial: initialRole,
  notfound: '/pages/not-authorized',
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule('admin').generate(),
    editor: new AclRule('editor').or('admin').generate(),
    // public: new AclRule('public').or('admin').or('editor').generate(),
  }
})
