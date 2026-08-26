import AuthService from "../auth/service";
import FetchProfileUseCase from "../../application/use-cases/profile/fetch-profile";
import ProfileEntity from "../../domain/profile/profile.entity";
import logger from "@shared/logger";

export class ProfileService {
    constructor(
        private readonly authService: AuthService,
        private readonly fetchProfileUseCase: FetchProfileUseCase
    ) {
    }

    async fetchProfile(): Promise<ProfileEntity> {
        const profile = await this.fetchProfileUseCase.execute(this.authService.accessToken);

        // logger.log(this.authService.verifyAccessToken(this.authService.accessToken));
        // logger.log(this.authService.accessToken);
        // logger.log(profile);
        if (!profile) {
            throw new Error("Profile does not exists");
        }
        // logger.log(profile);
        return profile;
    }
}

export default ProfileService;
