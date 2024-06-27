<script>
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import OptionsButton from "@/components/OptionsButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "CompletionsTab",
  components: {
    OpenModalHotkeysButton,
    OptionsButton,
    PrimaryToggleButton,
    SliderComponent
  },
  data() {
    return {
      gameCompletions: new Decimal(),
    };
  },
  computed: {
    
  },
  methods: {
    update() {
      this.gameCompletions = player.records.fullGameCompletions
    },
  }
};
</script>

<template>
  <div class="l-completions-tab">
    <br>
    <div class="c-completions-text">
    You completed the game <span class="c-completions-text_accent">{{ format(gameCompletions) }}</span> time(s).
    </div>
    (That's all you can see here, I have no idea what else to add here. {gci loops real})
  </div>
</template>

<style scoped>
.l-toggle-button {
  font-size: 12px;
}
</style>
