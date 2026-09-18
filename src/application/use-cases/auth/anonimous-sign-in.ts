import HttpClient from "../../../infrastructure/http/client";
import DeviceDeviceId from "../../../domain/device/value-objects/device-device-id.vo";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";
import SessionRefreshToken from "../../../domain/session/value-objects/sesion-refresh-token.vo";
import SessionEntity from "../../../domain/session/session-entity";

export class AnonymousSignInUseCase {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    async execute(deviceId: DeviceDeviceId): Promise<SessionEntity> {
        // logger.info('signIn', deviceId);
        const resp = await this.httpClient.post("auth/anonymousSignIn", {body: {deviceId: deviceId.value}});
        // logger.info('signIn', resp);

        if (!resp?.session) {
            throw new Error("Not authenticated");
        }

        return new SessionEntity(new SessionAccessToken(resp?.session.accessToken), new SessionRefreshToken(resp?.session.refreshToken));
    }
}

export default AnonymousSignInUseCase;

