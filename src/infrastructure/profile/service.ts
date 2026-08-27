import AuthService from "../auth/service";
import FetchProfileUseCase from "../../application/use-cases/profile/fetch-profile";
import ProfileEntity from "../../domain/profile/profile.entity";

export class ProfileService {

    private profile: ProfileEntity | null = null;

    constructor(
        private readonly authService: AuthService,
        private readonly fetchProfileUseCase: FetchProfileUseCase
    ) {
    }

    async fetchProfile(): Promise<ProfileEntity> {
        if (this.profile) {
            return this.profile;
        }
        await this.authService.ensureAuthenticated();

        const profile = await this.fetchProfileUseCase.execute(this.authService.accessToken);

        if (!profile) {
            throw new Error("Profile does not exists");
        }
        // logger.log(profile);
        return profile;
    }
}

export default ProfileService;
