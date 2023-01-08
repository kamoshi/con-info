<script lang="ts">
  import moment from "moment";
  import Videos from "./lib/Videos.svelte";
  import Timer from "./lib/Timer.svelte";
  import Schedule from "./lib/Schedule.svelte";
  import {prepareSchedule} from "./utils";

  let time = moment();
  setInterval(() => time = moment(), 200);

  let files: File[];
  let schedule: ScheduleEvent[] = [];
  $: current = schedule.find(event => time.isBetween(event.timeStart, event.timeEnd));

  async function onFilesChange() {
    const data = await files[0].text();
    schedule = prepareSchedule(JSON.parse(data));
  }
</script>

<main class="main">
  <div class="main__current" style='background-image:{`url(${current?.image})`}'>
    {#if !current}
      <input type="file" bind:files on:change={onFilesChange}>
    {/if}
  </div>
  <div class="main__schedule">
    <Schedule {schedule} {time} />
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
    grid-template-rows: 1fr 0.5fr 6em;
    grid-template-areas:
            "current right"
            "schedule right"
            "bottom bottom";
    width: 100%;
    height: 100%;

    &__current {
      grid-area: current;
      background-repeat: no-repeat;
      background-size: cover;
    }
    &__schedule {
      padding: 2em;
      grid-area: schedule;
    }
    &__right {
      grid-area: right;
    }
    &__bottom {
      grid-area: bottom;
    }
  }
</style>
