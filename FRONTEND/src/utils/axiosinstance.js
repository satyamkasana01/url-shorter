
import axios from 'axios'

// Create one reusable Axios setup for the whole frontend.
// Now every API file can use this instead of writing the full backend URL again and again.
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

// This runs after every API response.
// If the request succeeds, we return the response normally.
// If the request fails, we convert the Axios error into a cleaner object.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Try to get the best error message from backend first.
    // If backend does not send one, use Axios/browser error message.
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong'

    // Send a simple error object to catch blocks in components.
    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
    })
  }
)

export default axiosInstance
