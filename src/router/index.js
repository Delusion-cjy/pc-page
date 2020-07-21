import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CheckProject from '@/components/check_project'
import testbutton from '@/components/test-button'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/check_project',
      name: 'CheckProject',
      component: CheckProject
    },{
      path: '/test-button',
      name: 'testbutton',
      component: testbutton
    },
  ]
})
