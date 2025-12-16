import { utils } from "../utils/all";

const tokenutil = new utils();

export class AuthService {
  async loginService(user: { _id: string; role: string }) {
    return tokenutil.generateToken(user._id, user.role);
  }
}