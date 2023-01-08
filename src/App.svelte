<script lang="ts">
  import moment from "moment";
  import Videos from "./lib/Videos.svelte";
  import Timer from "./lib/Timer.svelte";
  import Current from "./lib/Current.svelte";
  import {prepareSchedule} from "./utils";

  let time = moment();
  setInterval(() => time = moment(), 200);

  let files: File[];
  let event: ScheduleEvent[] = [];
  $: current = event.find(event => time.isBetween(event.timeStart, event.timeEnd));

  async function onFilesChange() {
    const data = await files[0].text();
    event = prepareSchedule(JSON.parse(data));
  }
</script>

<main class="main">
  <div class="main__left">
    <input type="file" bind:files on:change={onFilesChange}>
    <Current {current} {time} />
  </div>
  <div class="main__right">
    <Videos />
  </div>
  <div class="main__bottom">
    <Timer {current} {time} />
  </div>
</main>

<style lang="scss">
  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 6em;
    grid-template-areas: "left right" "bottom bottom";
    width: 100%;
    height: 100%;

    &__left {
      background: #535bf2;
      grid-area: left;
    }
    &__right {
      background: green;
      grid-area: right;
    }
    &__bottom {
      background: yellow;
      grid-area: bottom;
    }
  }
</style>
