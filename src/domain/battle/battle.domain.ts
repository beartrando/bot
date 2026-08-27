import BattleEntity from "./battle.entity";
import BattleMove from "./value-objects/battle-move.vo";
import ProfileId from "../profile/value-objects/profile-id.vo";


export class BattleDomain {
    private constructor(private readonly _entity: BattleEntity) {
    }

    get entity(): BattleEntity {
        return this._entity;
    }

    static of(entity: BattleEntity): BattleDomain {
        return new BattleDomain(entity);
    }

    isMyTurn(profileId: ProfileId): boolean {
        return this.entity.calculateTurn().equals(profileId);
    }

    resolveMove(profileId: ProfileId): BattleMove {
        if (!this.isMyTurn(profileId)) {
            throw new Error('Not my turn')
        }

        return this.entity.calculateNextMove();
    }
}

export default BattleDomain;
