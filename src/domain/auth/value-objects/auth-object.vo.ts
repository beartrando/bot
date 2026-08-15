import AccessToken from "./access-token.vo";
import RefreshToken from "./refresh-token.vo";

export class AuthObject {
    constructor(
        readonly accessToken: AccessToken,
        readonly refreshToken: RefreshToken,
    ) {
    }

    equals(other: AuthObject): boolean {
        return this.accessToken.equals(other.accessToken)
            && this.refreshToken.equals(other.refreshToken);
    }
}

export default AuthObject;
