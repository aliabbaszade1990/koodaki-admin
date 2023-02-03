import { GetUserDTO } from './get-user.dto';

export interface LoginResultDTO {
  accessToken: string;
  refreshToken: string;
  user: GetUserDTO;
}

export interface LoginDTO {
  username: string;
  password: string;
}
