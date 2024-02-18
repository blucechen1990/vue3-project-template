import Demo from '../views/Demo/index.vue'
import Demo01 from '../views/Demo/Demo01.vue'
import Demo02 from '../views/Demo/Demo02.vue'

export default {
    path: '/demo',
    name: 'demo',
    component: Demo,
    children: [
        {
            // 当 /user/:id/profile 匹配成功
            // UserProfile 将被渲染到 User 的 <router-view> 内部
            path: 'demo1',
            component: Demo01,
        },
        {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 将被渲染到 User 的 <router-view> 内部
            path: 'demo2',
            component: Demo02,
        },
    ]
}