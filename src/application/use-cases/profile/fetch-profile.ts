import HttpClient from "../../../infrastructure/http/client";
import ProfileEntity from "../../../domain/profile/profile.entity";
import bearerHeaders from "../../../infrastructure/auth/helpers/bearer-headers";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";
import AuthService from "../../../infrastructure/auth/service";
import logger from "@shared/logger";
import ProfileProtoMapper from "../../../infrastructure/grpc/mappers/profile.proto.mapper";

export class FetchProfileUseCase {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    async execute(accessToken: SessionAccessToken): Promise<ProfileEntity | null> {
        const headers = bearerHeaders(accessToken);
        const resp = await this.httpClient.get("profile/getMe", {headers});
        return resp?.profile ? ProfileProtoMapper.toDomain(resp?.profile) : null;
    }
}

export default FetchProfileUseCase;

