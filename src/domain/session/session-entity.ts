import SessionAccessToken from "./value-objects/session-access-token.vo";
import SessionRefreshToken from "./value-objects/sesion-refresh-token.vo";

export class SessionEntity {
    constructor(
        readonly accessToken: SessionAccessToken,
        readonly refreshToken: SessionRefreshToken,
    ) {
    }
}

export default SessionEntity;
