import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/RegisterView.vue'),
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/auth/ForgotPasswordView.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/settings/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/settings/AssociationSettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/meetings',
      name: 'Meetings',
      component: () => import('../views/meetings/MeetingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/meetings/:id',
      name: 'MeetingDetails',
      component: () => import('../views/meetings/MeetingDetailsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/documents',
      name: 'Documents',
      component: () => import('../views/documents/DocumentsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/documents/create',
      name: 'CreateDocument',
      component: () => import('../views/documents/CreateDocumentView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/documents/:id',
      name: 'DocumentPreview',
      component: () => import('../views/documents/DocumentPreviewView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/documents/:id/edit',
      name: 'EditDocument',
      component: () => import('../views/documents/CreateDocumentView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/budget',
      name: 'Budget',
      component: () => import('../views/budget/BudgetView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/activities',
      name: 'Activities',
      component: () => import('../views/activities/ActivitiesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/activities/:id',
      name: 'ActivityDetails',
      component: () => import('../views/activities/ActivitiesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/premises',
      name: 'Premises',
      component: () => import('../views/premises/PremisesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/premises/:id',
      name: 'PremisesDetails',
      component: () => import('../views/premises/PremisesDetailsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: () => import('../views/premises/BookingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/search',
      name: 'PublicPremisesSearch',
      component: () => import('../views/public/PublicPremisesSearchView.vue'),
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../views/TestView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = true;
  
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
