import { UserLogin } from "../interfaces/UserLogin";

// Complete login function
const login = async (userInfo: UserLogin): Promise<{ token: string }> => {
  try {
    // Send a POST request to the backend login endpoint
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),  // Send the login data (username, password)
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    // If the login is successful, parse the JSON response
    const data = await response.json();

    // Ensure the token exists and return it
    if (data.token) {
      return { token: data.token };
    } else {
      throw new Error('Token not found in response');
    }

  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed. Please try again.');
  }
};

export { login };
