import { authService } from '../../utils/authentication';

export const currentUser = async (getUser)=>{
  const user = await authService.decodeToken();
  await getUser(user.userId);
};

