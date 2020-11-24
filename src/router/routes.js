const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'assignments', component: () => import('pages/profile/Assignments.vue') },
      { path: 'messages', component: () => import('pages/profile/Messages.vue') },
      { path: 'grades', component: () => import('pages/profile/Grades.vue') },
      { path: 'classmates', component: () => import('pages/profile/Classmates.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
