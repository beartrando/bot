import SessionAccessToken from "../../session/value-objects/session-access-token.vo";
import SessionRefreshToken from "../../session/value-objects/sesion-refresh-token.vo";

export class AuthObject {
    constructor(
        readonly accessToken: SessionAccessToken,
        readonly refreshToken: SessionRefreshToken,
    ) {
    }
}

export default AuthObject;
