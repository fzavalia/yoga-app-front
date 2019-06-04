import Request from "../core/Request";
import { Method, BodyType } from "../core/HttpClient";

export interface LoginResponse {
  user: any;
  accessToken: string;
}

class AuthRequest extends Request {
  login(email: string, password: string): Promise<LoginResponse> {
    return this.httpClient
      .fetch(`${this.basePath}/login`, Method.POST, {
        body: { type: BodyType.JSON, args: { email, password } }
      })
      .then(res => ({
        user: res.user,
        accessToken: res.access_token
      }));
  }
}

export default AuthRequest;
