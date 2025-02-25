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
      const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login };
