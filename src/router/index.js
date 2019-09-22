import Vue from 'vue';
import VueRouter from 'vue-router';

import PopExample from '@/examples/PopExample';
import Link from '@/components/Link'
import SingleTreeExample from '@/examples/SingleTreeExample'

Vue.use(VueRouter);

const routes = [
    {
        name: 'Link',
        path: '/',
        component: Link
    },
    {
        name: 'PopExample',
        path: '/PopExample',
        component: PopExample
    },
    {
        name: 'SingleTreeExample',
        path: '/SingleTreeExample',
        component: SingleTreeExample
    }
];

export default new VueRouter({
    routes
});