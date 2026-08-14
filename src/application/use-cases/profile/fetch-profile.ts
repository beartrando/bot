import HttpClient from "../../../infrastructure/http/client";
import ProfileEntity from "../../../domain/profile/profile.entity";

export class FetchProfileUseCase {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    async execute(): Promise<ProfileEntity | null> {
        const resp = await this.httpClient.get("profile/getMe");
        return resp?.profile ? ProfileEntity.create(resp?.profile) : null;
    }
}

export default FetchProfileUseCase;

