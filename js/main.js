// Try to get the authentication status from the session storage
const authenticated = sessionStorage.getItem('authenticated');

// If the user is not authenticated, redirect to the login page
if (!authenticated) {
  window.location.href = "pages/login.html";
}