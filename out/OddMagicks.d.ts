import Jump, { IJumpCanUse } from "game/entity/action/actions/Jump";
import { IActionHandlerApi } from "game/entity/action/IAction";
import Human from "game/entity/Human";
import { IStatMax } from "game/entity/IStats";
import ItemEquipInfo from "game/inspection/infoProviders/item/use/ItemEquipInfo";
import { IGetUseInfo } from "game/inspection/infoProviders/UseInfo";
import { MagicalPropertyType } from "game/magic/MagicalPropertyType";
import Message from "language/dictionary/Message";
import Mod from "mod/Mod";
import { IInjectionApi } from "utilities/class/Inject";
import { IVector3 } from "utilities/math/IVector";
export default class OddMagicks extends Mod {
    readonly magicalPropertyFloaty: MagicalPropertyType;
    protected onJumpCanUseHandler(api: IInjectionApi<typeof Jump, "canUseHandler">, action: IActionHandlerApi<Human, IJumpCanUse>): {
        usable: false;
        message: Message.TooExhaustedToJump;
        stamina?: undefined;
        jumpStamina?: undefined;
        jumpPosition?: undefined;
    } | {
        usable: true;
        stamina: IStatMax & {
            base: IStatMax;
        };
        jumpStamina: number;
        jumpPosition: IVector3;
        message?: undefined;
    } | undefined;
    protected onItemEquipInfoGetMagicalEquipTypes(api: IInjectionApi<typeof ItemEquipInfo["methods"], "getMagicalEquipTypes">, info: IGetUseInfo<typeof ItemEquipInfo>): void;
    protected onItemEquipInfoIsMagicalPropertyPercentage(api: IInjectionApi<typeof ItemEquipInfo["methods"], "isMagicalPropertyPercentage">, info: IGetUseInfo<typeof ItemEquipInfo>, type: MagicalPropertyType): void;
}
