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
                .map(item => item.magic.get(this.magicalPropertyFloaty) ?? 0)
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
            return api.returnValue = {
                usable: true,
                stamina,
                jumpStamina,
                jumpPosition,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2RkTWFnaWNrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9PZGRNYWdpY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztJQWNBLE1BQXFCLFVBQVcsU0FBUSxhQUFHO1FBWWhDLG1CQUFtQixDQUFDLEdBQWdELEVBQUUsTUFBNkM7WUFDNUgsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sSUFBSSxNQUFNLEVBQUUsT0FBTyxLQUFLLGlCQUFPLENBQUMsa0JBQWtCLEVBQUU7Z0JBRXRFLE9BQU87YUFDUDtZQUVELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7aUJBQ3JELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDNUQsS0FBSyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVuQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVcsYUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1lBQ2xFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFFcEksSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLFdBQVcsRUFBRTtnQkFDaEMsT0FBTyxHQUFHLENBQUMsV0FBVyxHQUFHO29CQUN4QixNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsaUJBQU8sQ0FBQyxrQkFBa0I7aUJBQ25DLENBQUM7YUFDRjtZQUVELE1BQU0sWUFBWSxHQUFhO2dCQUM5QixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BCLENBQUM7WUFFRixPQUFPLEdBQUcsQ0FBQyxXQUFXLEdBQUc7Z0JBQ3hCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU87Z0JBQ1AsV0FBVztnQkFDWCxZQUFZO2FBQ1osQ0FBQztRQUNILENBQUM7UUFHUyxtQ0FBbUMsQ0FBQyxHQUEyRSxFQUFFLElBQXVDO1lBQ2pLLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFHUywwQ0FBMEMsQ0FBQyxHQUFrRixFQUFFLElBQXVDLEVBQUUsSUFBeUI7WUFDMU0sSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLHFCQUFxQixFQUFFO2dCQUN4QyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUN2QjtRQUNGLENBQUM7S0FDRDtJQWpEQTtRQVBDLHFCQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDaEUsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHO2FBQzFELENBQUM7U0FDRixDQUFDOzZEQUN5RDtJQUczRDtRQURDLElBQUEscUJBQVksRUFBQyxjQUFJLEVBQUUsZUFBZSxFQUFFLDBCQUFpQixDQUFDLElBQUksQ0FBQzt5REFrQzNEO0lBR0Q7UUFEQyxJQUFBLHFCQUFZLEVBQUMsdUJBQWEsQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsMEJBQWlCLENBQUMsSUFBSSxDQUFDO3lFQUduRjtJQUdEO1FBREMsSUFBQSxxQkFBWSxFQUFDLHVCQUFhLENBQUMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLDBCQUFpQixDQUFDLElBQUksQ0FBQztnRkFLMUY7SUF6REYsNkJBMERDIn0=