const API_BASE_URL = 'http://localhost:4000/api';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: UserData;
}

export const api = {
  async register(username: string, password: string, email: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });
    return response.json() as Promise<ApiResponse<UserData>>;
  },

  async login(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json() as Promise<ApiResponse<LoginResponse>>;
  },

  async updateUser(id: number, data: Partial<UserData>) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json() as Promise<ApiResponse<null>>;
  },
};
