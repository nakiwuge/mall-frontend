import { authService } from './authentication';

export const config = async()=>{
  const token = await authService.getToken();
  return {headers: {
    'Authorization' : `Bearer ${token}`
  }};
};

