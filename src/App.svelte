<script lang="ts">
  import Videos from "./lib/Videos.svelte";
  import Timer from "./lib/Timer.svelte";
  import Current from "./lib/Current.svelte";
  import {prepareSchedule} from "./utils";

  let files: File[];
  let schedule: ScheduleEvent[];

  async function onFilesChange() {
    const data = await files[0].text();
    schedule = prepareSchedule(JSON.parse(data));
    console.log(schedule);
  }
</script>

<main class="main">
  <div class="main__left">
    <input type="file" bind:files on:change={onFilesChange}>
    <Current />
  </div>
  <div class="main__right">
    <Videos />
  </div>
  <div class="main__bottom">
    <Timer />
  </div>
</main>

<style lang="scss">
  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 4em;
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
