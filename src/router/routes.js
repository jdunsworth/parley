/**
 * ============================================================
 * Parley Routes
 * ============================================================
 */

const routes = [
  {
    path: '/',
    component: () => import('layouts/ParleyMain.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'setup', component: () => import('pages/Setup.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') },
      { path: 'about', component: () => import('pages/About.vue') },
      { path: 'profiles/', component: () => import('pages/profiles/Index.vue') },
      { path: 'profiles/add', component: () => import('pages/profiles/Add.vue') },
    ],
  },

  // 404 Page (must be at the end)
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
