export const API_URL = 'http://localhost:5000/api';
export const IMAGES_URL = 'http://localhost:5000';

export const AUTH_REGISTER = `${API_URL}/users/register`;
export const AUTH_LOGIN = `${API_URL}/users/login`;
export const AUTH_PROFILE = `${API_URL}/users/profile`;

export const BRANDS = `${API_URL}/brands`;
export const BRANDS_ID = (id) => `${API_URL}/brands/${id}`;

export const PERFUMES = `${API_URL}/perfumes`;
export const PERFUMES_SEARCH = (query) => `${API_URL}/perfumes/search?q=${query}`;
export const PERFUMES_ID = (id) => `${API_URL}/perfumes/${id}`;
export const PERFUMES_FILTER = `${API_URL}/perfumes/filters`;

export const SUBSCRIPTION_PLANS = `${API_URL}/subscriptions/plans`;
export const SUBSCRIPTION_URL = `${API_URL}/subscriptions`;
export const SUBSCRIPTION_RECOMMENDED = `${API_URL}/subscriptions/recommended`;
export const SUBSCRIPTION_ACTIVE = `${API_URL}/subscriptions/active`;

export const SAMPLES = `${API_URL}/samples`;
export const SAMPLES_AVAILABLE = `${API_URL}/samples/available`;

export const REVIEWS = (perfumeId) => `${API_URL}/reviews/perfume/${perfumeId}`;
export const REVIEWS_CREATE = `${API_URL}/reviews`;

export const PREFERENCES = `${API_URL}/preferences`;
export const PREFERENCES_QUIZ = `${API_URL}/preferences/quiz`;
export const PREFERENCES_QUIZ_OPTIONS = `${API_URL}/preferences/quiz-options`;

export const RECOMMENDATIONS = `${API_URL}/recommendations`;

export const ORDERS = `${API_URL}/orders`;
export const ORDERS_ID = (id) => `${API_URL}/orders/${id}`;

export const ADMIN_USERS = `${API_URL}/users`
export const ADMIN_SUBSCRIPTIONS = `${API_URL}/subscriptions/admin/all`
export const ADMIN_ANALYTICS = `${API_URL}/admin/analytics`;
export const ADMIN_DASHBOARD = `${ADMIN_ANALYTICS}/stats`
export const ADMIN_REVENUE = `${ADMIN_ANALYTICS}/charts`
export const ADMIN_GENDERS = `${ADMIN_ANALYTICS}/genders`
export const ADMIN_HITS_PERFUMES = `${ADMIN_ANALYTICS}/top-perfumes`
