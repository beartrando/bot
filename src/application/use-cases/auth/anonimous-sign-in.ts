import HttpClient from "../../../infrastructure/http/client";
import DeviceId from "../../../domain/device/value-objects/device-id.vo";
import AccessToken from "../../../domain/common/value-objects/access-token.vo";

export class AnonymousSignInUseCase {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    async execute(deviceId: DeviceId): Promise<AccessToken | null> {
        // logger.info('signIn', deviceId);
        const resp = await this.httpClient.post("auth/anonymousSignIn", {deviceId: deviceId.value});
        // logger.info('signIn', resp);

        return resp?.auth ? new AccessToken(resp.auth.accessToken) : null;
    }
}

export default AnonymousSignInUseCase;

