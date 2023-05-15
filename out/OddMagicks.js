/*!
 * Copyright 2011-2023 Unlok
 * https://www.unlok.ca
 *
 * Credits & Thanks:
 * https://www.unlok.ca/credits-thanks/
 *
 * Wayward is a copyrighted and licensed work. Modification and/or distribution of any source files is prohibited. If you wish to modify the game in any way, please refer to the modding guide:
 * https://github.com/WaywardGame/types/wiki
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "game/entity/action/actions/Jump", "game/entity/IStats", "game/inspection/infoProviders/item/use/ItemEquipInfo", "language/dictionary/Message", "mod/Mod", "mod/ModRegistry", "utilities/class/Inject", "utilities/math/Math2"], function (require, exports, Jump_1, IStats_1, ItemEquipInfo_1, Message_1, Mod_1, ModRegistry_1, Inject_1, Math2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OddMagicks extends Mod_1.default {
        onJumpCanUseHandler(api, action) {
            const canUse = api.returnValue;
            if (!canUse?.usable && canUse?.message !== Message_1.default.TooExhaustedToJump) {
                return;
            }
            const floatyAmount = action.executor.getEquippedItems()
                .map(item => item.magic?.get(this.magicalPropertyFloaty) ?? 0)
                .splat(Math2_1.default.sum);
            const stamina = action.executor.stat.get(IStats_1.Stat.Stamina);
            const jumpStamina = Math.floor(((10 + action.executor.getScaledWeight() / 4) / 75) * stamina.max * Math.max(0.1, 1 - floatyAmount));
            if (stamina.value < jumpStamina) {
                return api.returnValue = {
                    usable: false,
                    message: Message_1.default.TooExhaustedToJump,
                };
            }
            const jumpPosition = {
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
        onItemEquipInfoGetMagicalEquipTypes(api, info) {
            api.returnValue?.add(this.magicalPropertyFloaty);
        }
        onItemEquipInfoIsMagicalPropertyPercentage(api, info, type) {
            if (type === this.magicalPropertyFloaty) {
                api.returnValue = true;
            }
        }
    }
    __decorate([
        ModRegistry_1.default.magicalProperty("floaty", {
            isApplicable: (item, itemDescription) => !!itemDescription.equip,
            getInfo: item => ({
                max: 0.3,
                value: () => 0.05 + item.island.seededRandom.float() * 0.2,
            }),
        })
    ], OddMagicks.prototype, "magicalPropertyFloaty", void 0);
    __decorate([
        (0, Inject_1.InjectObject)(Jump_1.default, "canUseHandler", Inject_1.InjectionPosition.Post)
    ], OddMagicks.prototype, "onJumpCanUseHandler", null);
    __decorate([
        (0, Inject_1.InjectObject)(ItemEquipInfo_1.default.methods, "getMagicalEquipTypes", Inject_1.InjectionPosition.Post)
    ], OddMagicks.prototype, "onItemEquipInfoGetMagicalEquipTypes", null);
    __decorate([
        (0, Inject_1.InjectObject)(ItemEquipInfo_1.default.methods, "isMagicalPropertyPercentage", Inject_1.InjectionPosition.Post)
    ], OddMagicks.prototype, "onItemEquipInfoIsMagicalPropertyPercentage", null);
    exports.default = OddMagicks;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2RkTWFnaWNrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9PZGRNYWdpY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7R0FTRzs7Ozs7Ozs7OztJQWdCSCxNQUFxQixVQUFXLFNBQVEsYUFBRztRQVloQyxtQkFBbUIsQ0FBQyxHQUFnRCxFQUFFLE1BQTZDO1lBQzVILE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksTUFBTSxFQUFFLE9BQU8sS0FBSyxpQkFBTyxDQUFDLGtCQUFrQixFQUFFO2dCQUV0RSxPQUFPO2FBQ1A7WUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO2lCQUNyRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzdELEtBQUssQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLGFBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQztZQUNsRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBRXBJLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxXQUFXLEVBQUU7Z0JBQ2hDLE9BQU8sR0FBRyxDQUFDLFdBQVcsR0FBRztvQkFDeEIsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLGlCQUFPLENBQUMsa0JBQWtCO2lCQUNuQyxDQUFDO2FBQ0Y7WUFFRCxNQUFNLFlBQVksR0FBYTtnQkFDOUIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNwQixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFdkUsT0FBTyxHQUFHLENBQUMsV0FBVyxHQUFHO2dCQUN4QixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPO2dCQUNQLFdBQVc7Z0JBQ1gsUUFBUTthQUNSLENBQUM7UUFDSCxDQUFDO1FBR1MsbUNBQW1DLENBQUMsR0FBMkUsRUFBRSxJQUF1QztZQUNqSyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBR1MsMENBQTBDLENBQUMsR0FBa0YsRUFBRSxJQUF1QyxFQUFFLElBQXlCO1lBQzFNLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDeEMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDdkI7UUFDRixDQUFDO0tBQ0Q7SUFuRGdCO1FBUGYscUJBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ25DLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSztZQUNoRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixHQUFHLEVBQUUsR0FBRztnQkFDUixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUc7YUFDMUQsQ0FBQztTQUNGLENBQUM7NkRBQ3lEO0lBR2pEO1FBRFQsSUFBQSxxQkFBWSxFQUFDLGNBQUksRUFBRSxlQUFlLEVBQUUsMEJBQWlCLENBQUMsSUFBSSxDQUFDO3lEQW9DM0Q7SUFHUztRQURULElBQUEscUJBQVksRUFBQyx1QkFBYSxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSwwQkFBaUIsQ0FBQyxJQUFJLENBQUM7eUVBR25GO0lBR1M7UUFEVCxJQUFBLHFCQUFZLEVBQUMsdUJBQWEsQ0FBQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsMEJBQWlCLENBQUMsSUFBSSxDQUFDO2dGQUsxRjtJQTNERiw2QkE0REMifQ==