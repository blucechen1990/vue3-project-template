import User from '../views/User/index.vue'
import Profile from '../views/User/Profile.vue'
import Posts from '../views/User/Posts.vue'

export default {
    path: '/user',
    name: 'user',
    component: User,
    children: [
        
        {
            // 当 /user/:id/profile 匹配成功
            // UserProfile 将被渲染到 User 的 <router-view> 内部
            path: 'profile',
            component: Profile,
        },
        {
            // 当 /user/:id/profile 匹配成功
            // UserProfile 将被渲染到 User 的 <router-view> 内部
            path: 'profile',
            component: Profile,
        },
        {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 将被渲染到 User 的 <router-view> 内部
            path: 'posts',
            component: Posts,
        },
    ]
}