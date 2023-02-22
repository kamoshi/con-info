<script lang="ts">
  import Videos from "./lib/Videos.svelte";
  import Timer from "./lib/Timer.svelte";
  import Schedule from "./lib/Schedule.svelte";
  import {prepareSchedule} from "./utils";
  import dayjs from "dayjs";

  let time = dayjs();
  setInterval(() => time = dayjs(), 200);

  let files: FileList;
  let schedule: ScheduleEvent[] = [];
  $: current = schedule.find(event => time.isAfter(event.timeStart) && time.isBefore(event.timeEnd));

  async function onFilesChange() {
    const data = await files[0].text();
    schedule = prepareSchedule(JSON.parse(data));
  }
</script>


<main class="main">
  <div class="current" style='background-image:{`url(${current?.imageUrl})`}'>
    {#if !schedule || !schedule.length}
      <input type="file" bind:files on:change={onFilesChange}>
    {/if}
  </div>
  <div class="title">
    <div class="title-img" style='background-image:{`url(${current?.titleUrl})`}'></div>
  </div>
  <div class="videos">
    <Videos />
  </div>
  <div class="schedule">
    <Schedule {schedule} {time} />
  </div>

  <div class="timer">
    <Timer {current} {time} />
  </div>
</main>


<style lang="scss">
  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 0.5fr 6em;
    grid-template-areas:
            "current videos"
            "title schedule"
            "bottom bottom";
    width: 100%;
    height: 100%;
  }
  .title {
    padding: 2em;
    grid-area: title;

    .title-img {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  .videos {
    grid-area: videos;
  }
  .schedule {
    padding: 2em;
    grid-area: schedule;
  }
  .current {
    grid-area: current;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .timer {
    grid-area: bottom;
  }
</style>
