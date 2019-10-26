"use strict";

Vue.component("perk-shop-upgrade", {
  props: {
    upgrade: Object
  },
  data() {
    return {
      isAvailable: false,
      isCapped: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-teresa-shop-button": true,
        "o-teresa-shop-button--disabled": !this.isAvailable && !this.isCapped,
        "o-teresa-shop-button--capped": this.isCapped
      };
    }
  },
  methods: {
    update() {
      this.isAvailable = this.upgrade.isAvailable;
      this.isCapped = this.upgrade.isCapped;
    }
  },
  template:
    `<div class="l-spoon-btn-group">
      <button :class="classObject" @click="upgrade.purchase()">
        <description-display 
          :config="upgrade.config"
          :length="70"
          name="o-compression-upgrade__description"
        />
        <br>
        <effect-display :config="upgrade.config" />
        <br>
        <cost-display
          v-if="!isCapped"
          :config="upgrade.config"
          singular="Perk point"
          plural="Perk points"
        />
      </button>
    </div>`
});