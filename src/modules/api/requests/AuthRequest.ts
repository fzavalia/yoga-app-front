import Request from "../core/Request";
import { Method, BodyType } from "../core/HttpClient";

class AuthRequest extends Request {
  login = (email: string, password: string) => {
    return this.httpClient.fetch(`${this.basePath}/login`, Method.POST, {
      body: { type: BodyType.JSON, args: { email, password } }
    });
  };
}

export default AuthRequest;
