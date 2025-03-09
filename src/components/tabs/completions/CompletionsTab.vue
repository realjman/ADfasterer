<script>
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import OptionsButton from "@/components/OptionsButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SliderComponent from "@/components/SliderComponent";
import PastCompsContainer from "../completions/PastCompsContainer";
import { getFullCompletionBoost, getGlobalSpeedFactor, globalSpeedFactor } from "../../../game";


export default {
  name: "CompletionsTab",
  components: {
    OpenModalHotkeysButton,
    OptionsButton,
    PrimaryToggleButton,
    SliderComponent,
    PastCompsContainer
  },
  data() {
    return {
      gameCompletions: new Decimal(),
      completion: {
        name: 'Completion',
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestReal: TimeSpan.zero,
      },
      completionsBoost: 1,
      globalSpeedFactor: 1,
      completionsBoostActive: false,
      Lcompletion: {
        name: "Completion",
        plural: "Completions",
        condition: () => player.records.fullGameCompletions > 0,
        getRuns: () => player.records.recentCompletions
      }
    };
  },
  watch: {
    completionsBoostActive(newValue) {
      player.options.completionsBoostActive = newValue;
    }
  },
  computed: {
    
  },
  methods: {
    update() {
      const records = player.records;
      const completions = this.completion;
      const bestCompletion = records.bestCompletion;
      const options = player.options;
      this.completionsBoostActive = options.completionsBoostActive;
      completions.hasBest = bestCompletion.time < 99999999999;
      completions.best.setFrom(bestCompletion.time);
      completions.this.setFrom(records.thisCompletion.time);
      completions.thisReal.setFrom(records.thisCompletion.realTime);
      completions.bestReal.setFrom(records.bestCompletion.realTime);

      this.gameCompletions = player.records.fullGameCompletions;
      this.completionsBoost = getFullCompletionBoost()
      this.globalSpeedFactor = getGlobalSpeedFactor()
    },
  }
};
</script>

<template>
  <div class="l-completions-tab">
    <br>
    <div class="c-completions-text">
    You completed the game <span class="c-completions-text_accent">{{ format(gameCompletions) }}</span> time(s), which gives a <span class="c-completions-text_accent">{{ formatX(completionsBoost) }}</span> to your global speed factor. (Capped at {{ formatX(Math.pow(2, 31), 2) }})<br>
    Your current global speed factor is <span class="c-completions-text_accent">{{ formatX(globalSpeedFactor, 2) }}</span><br>
    <PrimaryToggleButton
    v-model="completionsBoostActive"
    label="Completions Boost:"
    on="Active"
    off="Inactive"
    />
    </div>
    <div class="c-stats-tab-title c-stats-tab-general">
        Stuff
      </div>
      <div class="c-best-runs-text">
        Your fastest Completion was {{ completion.bestReal.toString() }}. (real time)
      </div>
      <div class="c-this-runs-text">
        You have spent {{ completion.this.toStringShort() }} in this full game run in game time.<br>
        You have spent {{ completion.thisReal.toStringShort() }} in this full game run in real time.
      </div>
    <br>
    go to settings, saves and import "speedrun" to speedrun
    <br>
    im gonna thank glitchyfishys for doing the modified code that i can use
    <PastCompsContainer
    :key="Lcompletion.name"
    :comp="Lcompletion"
    />
  </div>
</template>

<style scoped>
.l-toggle-button {
  font-size: 12px;
}
.c-stats-tab-general {
  color: var(--color-text);
}

.c-stats-tab-title {
  font-size: 3rem;
  font-weight: bold;
}

.c-best-runs-text, .c-this-runs-text {
  font-size: 1.5rem;
}
</style>
