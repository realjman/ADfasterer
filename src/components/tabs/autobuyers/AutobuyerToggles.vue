<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import { Autobuyer } from "../../../core/globals";

export default {
  name: "AutobuyerToggles",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      isDoomed: false,
      autobuyersOn: false,
      ADbulk: false,
      ADs: [],
      showContinuum: false,
      disableContinuum: false,
      allAutobuyersDisabled: false
    };
  },
  watch: {
    autobuyersOn(newValue) {
      player.auto.autobuyersOn = newValue;
    },
    disableContinuum(newValue) {
      if (ImaginaryUpgrade(21).isLockingMechanics && !newValue) {
        ImaginaryUpgrade(21).tryShowWarningModal();
        return;
      }
      Laitela.setContinuum(!newValue);
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.autobuyersOn = player.auto.autobuyersOn;
      this.ADbulk = player.auto.antimatterDims.all.filter(auto => auto.mode == 1).length > 0;
      this.ADs = Autobuyer.antimatterDimension.zeroIndexed;
      this.showContinuum = Laitela.isUnlocked;
      this.disableContinuum = player.auto.disableContinuum;
      this.allAutobuyersDisabled = Autobuyers.unlocked.every(autobuyer => !autobuyer.isActive);
    },
    upgMax() {
      for (const adb of this.ADs) {
        if (adb.isUnlocked && adb.canBeUpgraded) {
          if (adb.interval > 100) adb.upgradeInterval();
          if (adb.interval <= 100 && adb.bulk < 512) adb.upgradeBulk();
        }
      }
      if (Autobuyer.tickspeed.canBeBought && Autobuyer.tickspeed.interval > 100) Autobuyer.tickspeed.upgradeInterval();
      if (Autobuyer.dimboost.canBeBought && Autobuyer.dimboost.interval > 100) Autobuyer.dimboost.upgradeInterval();
      if (Autobuyer.galaxy.canBeBought && Autobuyer.galaxy.interval > 100) Autobuyer.galaxy.upgradeInterval();
      if (Autobuyer.bigCrunch.canBeBought && Autobuyer.bigCrunch.interval > 100) Autobuyer.bigCrunch.upgradeInterval();
    },
    toggleAllAutobuyers() {
      for (const autobuyer of Autobuyers.unlocked) {
        autobuyer.isActive = this.allAutobuyersDisabled;
      }
    }
  }
};
</script>

<template>
  <div class="c-subtab-option-container">
    <PrimaryToggleButton
      v-model="autobuyersOn"
      on="Pause autobuyers"
      off="Resume autobuyers"
      class="o-primary-btn--subtab-option"
    />
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="toggleAllAutobuyers()"
    >
      {{ allAutobuyersDisabled ? "Enable" : "Disable" }} all autobuyers
    </PrimaryButton>
    <span v-if="isDoomed">
      <PrimaryButton
        v-if="showContinuum"
        class="o-primary-btn--subtab-option"
      >
        Continuum is disabled
      </PrimaryButton>
    </span>
    <span v-else>
      <PrimaryToggleButton
        v-if="showContinuum"
        v-model="disableContinuum"
        on="Enable Continuum"
        off="Disable Continuum"
        class="o-primary-btn--subtab-option"
      />
    </span>
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="upgMax()">
      Upgrade all AD autobuyers
    </PrimaryButton>
  </div>
</template>

<style scoped>

</style>
