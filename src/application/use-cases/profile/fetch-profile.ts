import HttpClient from "../../../infrastructure/http/client";
import ProfileEntity from "../../../domain/profile/profile.entity";
import bearerHeaders from "../../../infrastructure/auth/helpers/bearer-headers";
import AccessToken from "../../../domain/auth/value-objects/access-token.vo";
import AuthService from "../../../infrastructure/auth/service";

export class FetchProfileUseCase {
    constructor(
        private readonly authService: AuthService,
        private readonly httpClient: HttpClient,
    ) {
    }

    async execute(accessToken: AccessToken): Promise<ProfileEntity | null> {
        const headers = bearerHeaders(this.authService.accessToken);
        const resp = await this.httpClient.get("profile/getMe", {headers});
        return resp?.profile ? ProfileEntity.create(resp?.profile) : null;
    }
}

export default FetchProfileUseCase;

