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

export const SAMPLES = `${API_URL}/samples`;
export const SAMPLES_AVAILABLE = `${API_URL}/samples/available`;

export const REVIEWS = (perfumeId) => `${API_URL}/reviews/perfume/${perfumeId}`;
export const REVIEWS_CREATE = `${API_URL}/reviews`;

export const PREFERENCES = `${API_URL}/preferences`;
export const PREFERENCES_QUIZ = `${API_URL}/preferences/quiz`;
export const PREFERENCES_QUIZ_OPTIONS = `${API_URL}/preferences/quiz-options`;

export const RECOMMENDATIONS = `${API_URL}/recommendations`;
export const RECOMMENDATIONS_POPULAR = `${API_URL}/recommendations/popular`;

export const ORDERS = `${API_URL}/orders`;
export const ORDERS_ID = (id) => `${API_URL}/orders/${id}`;
