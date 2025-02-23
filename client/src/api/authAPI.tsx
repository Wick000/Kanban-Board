import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
   
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    
    const data = await response.json();

   
    localStorage.setItem('token', data.token);

    
    window.location.href = '/kanban-board'; 
  } catch (error) {
    console.error('Login error:', error);
    
    alert('Login failed. Please try again.');
  }
};




export { login };
