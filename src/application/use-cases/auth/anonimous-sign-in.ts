import HttpClient from "../../../infrastructure/http/client";
import DeviceId from "../../../domain/device/value-objects/device-id.vo";
import AuthObject from "../../../domain/auth/value-objects/auth-object.vo";
import AccessToken from "../../../domain/auth/value-objects/access-token.vo";
import RefreshToken from "../../../domain/auth/value-objects/refresh-token.vo";

export class AnonymousSignInUseCase {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    async execute(deviceId: DeviceId): Promise<AuthObject> {
        // logger.info('signIn', deviceId);
        const resp = await this.httpClient.post("auth/anonymousSignIn", {body: {deviceId: deviceId.value}});
        // logger.info('signIn', resp);

        if (!resp?.auth) {
            throw new Error("Not authenticated");
        }

        return new AuthObject(new AccessToken(resp?.auth.accessToken), new RefreshToken(resp?.auth.refreshToken));
    }
}

export default AnonymousSignInUseCase;

