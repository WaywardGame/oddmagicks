import type Human from "@wayward/game/game/entity/Human";
import type { IStatMax } from "@wayward/game/game/entity/IStats";
import { Stat } from "@wayward/game/game/entity/IStats";
import type { IActionHandlerApi } from "@wayward/game/game/entity/action/IAction";
import type { IJumpCanUse } from "@wayward/game/game/entity/action/actions/Jump";
import Jump from "@wayward/game/game/entity/action/actions/Jump";
import type { IGetUseInfo } from "@wayward/game/game/inspection/infoProviders/UseInfo";
import ItemEquipInfo from "@wayward/game/game/inspection/infoProviders/item/use/ItemEquipInfo";
import type MagicalPropertyType from "@wayward/game/game/magic/MagicalPropertyType";
import { MagicalPropertyInfoHelper } from "@wayward/game/game/magic/MagicalPropertyDescriptions";
import type Tile from "@wayward/game/game/tile/Tile";
import Message from "@wayward/game/language/dictionary/Message";
import Mod from "@wayward/game/mod/Mod";
import Register from "@wayward/game/mod/ModRegistry";
import type { IVector3 } from "@wayward/game/utilities/math/IVector";
import type { IInjectionApi } from "@wayward/game/utilities/Inject";
import { InjectObject, InjectionPosition } from "@wayward/game/utilities/Inject";
import Math2 from "@wayward/utilities/math/Math2";

export default class OddMagicks extends Mod {

	@Register.magicalProperty("floaty", {
		isApplicable: (item, itemDescription) => !!itemDescription.equip,
		getInfo: item => ({
			min: 0.05,
			max: 0.3,
			value: () => 0.05 + MagicalPropertyInfoHelper.randomFloat(item, 0.2),
		}),
	})
	public readonly magicalPropertyFloaty: MagicalPropertyType;

	@InjectObject(Jump, "canUseHandler", InjectionPosition.Post)
	protected onJumpCanUseHandler(api: IInjectionApi<typeof Jump, "canUseHandler">, action: IActionHandlerApi<Human, IJumpCanUse>): { usable: false; message: Message.TooExhaustedToJump; stamina?: undefined; jumpStamina?: undefined; jumpTile?: undefined } | { usable: true; stamina: IStatMax & { base: IStatMax }; jumpStamina: number; jumpTile: Tile; message?: undefined } | undefined {
		const canUse = api.returnValue;
		if (!canUse?.usable && canUse?.message !== Message.TooExhaustedToJump) {
			// do nothing, the jump failed for some other reason than not enough stamina
			return;
		}

		const floatyAmount = action.executor.getEquippedItems()
			.map(item => item.magic?.get(this.magicalPropertyFloaty) ?? 0)
			.splat(Math2.sum);

		const stamina = action.executor.stat.get<IStatMax>(Stat.Stamina)!;
		const jumpStamina = Math.floor(((10 + action.executor.getScaledWeight() / 4) / 75) * stamina.max * Math.max(0.1, 1 - floatyAmount));

		if (stamina.value < jumpStamina) {
			return api.returnValue = {
				usable: false,
				message: Message.TooExhaustedToJump,
			};
		}

		const jumpPosition: IVector3 = {
			x: action.executor.x + (action.executor.direction.x * 2),
			y: action.executor.y + (action.executor.direction.y * 2),
			z: action.executor.z,
		};

		const jumpTile = action.executor.island.getTileFromPoint(jumpPosition);

		return api.returnValue = {
			usable: true,
			stamina,
			jumpStamina,
			jumpTile,
		};
	}

	@InjectObject(ItemEquipInfo.methods, "getMagicalEquipTypes", InjectionPosition.Post)
	protected onItemEquipInfoGetMagicalEquipTypes(api: IInjectionApi<typeof ItemEquipInfo["methods"], "getMagicalEquipTypes">, info: IGetUseInfo<typeof ItemEquipInfo>): void {
		api.returnValue?.add(this.magicalPropertyFloaty);
	}

	@InjectObject(ItemEquipInfo.methods, "isMagicalPropertyPercentage", InjectionPosition.Post)
	protected onItemEquipInfoIsMagicalPropertyPercentage(api: IInjectionApi<typeof ItemEquipInfo["methods"], "isMagicalPropertyPercentage">, info: IGetUseInfo<typeof ItemEquipInfo>, type: MagicalPropertyType): void {
		if (type === this.magicalPropertyFloaty) {
			api.returnValue = true;
		}
	}
}
