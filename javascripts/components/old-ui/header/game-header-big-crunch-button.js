"use strict";

Vue.component("game-header-big-crunch-button", {
  data() {
    return {
      isVisible: false,
      gainedIP: new Decimal(0),
      currentIPPM: new Decimal(0),
      peakIPPM: new Decimal(0),
      currentIP: new Decimal(0),
    };
  },
  computed: {
    peakIPPMThreshold: () => new Decimal("1e100"),
    isPeakIPPMVisible() { 
      return this.peakIPPM.lte(this.peakIPPMThreshold);
    },
    amountStyle() {
      if (this.currentIP.lt(1e50)) return undefined;

      // If the player is using a dark theme, it should be black instead of white when ratio is 1
      const darkTheme = player.options.theme.includes("Dark");

      const ratio = this.gainedIP.log10() / this.currentIP.log10();
      let rgb;

      if (darkTheme) {
        rgb = [
          Math.round((1 - ratio) * 10 * 255),
          Math.round((ratio - 1) * 10 * 255),
          0
        ];
      } else {
        rgb = [
          Math.round(255 - (ratio - 1) * 10 * 255),
          Math.round(255 - (1 - ratio) * 10 * 255),
          ratio > 1 ? Math.round(255 - (ratio - 1) * 10 * 255)
          : Math.round(255 - (1 - ratio) * 10 * 255)
        ];
      }
      return { color: `rgb(${rgb.join(",")})` };
    }
  },
  methods: {
    update() {
      this.isVisible = player.break && player.antimatter.gte(Decimal.MAX_NUMBER) &&
        !NormalChallenge.isRunning && !InfinityChallenge.isRunning;
      if (!this.isVisible) return;
      const gainedIP = gainedInfinityPoints();
      this.currentIP.copyFrom(player.infinityPoints);
      this.gainedIP.copyFrom(gainedIP);
      this.peakIPPM.copyFrom(player.bestIPminThisInfinity);
      if (this.isPeakIPPMVisible) {
        this.currentIPPM.copyFrom(gainedIP.dividedBy(Time.thisInfinityRealTime.totalMinutes));
      }
    }
  },
  template:
    `<button
      v-if="isVisible"
      class="o-prestige-btn o-prestige-btn--big-crunch l-game-header__big-crunch-btn"
      onclick="bigCrunchResetRequest()"
    >
      <b>Big Crunch for 
      <span :style="amountStyle">{{shortenDimensions(gainedIP)}}</span> 
      Infinity {{ "point" | pluralize(gainedIP) }}.</b>
      <template v-if="isPeakIPPMVisible">
        <br>
        {{shortenDimensions(currentIPPM)}} IP/min
        <br>
        Peaked at {{shortenDimensions(peakIPPM)}} IP/min
      </template>
    </button>`
});