<script lang="ts">
  import Splash from "./lib/Splash.svelte";
  import Title from "./lib/Title.svelte";
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
  <div class="splash">
    {#if !schedule || !schedule.length}
      <input type="file" bind:files on:change={onFilesChange}>
    {:else}
      <Splash splash={current?.imageUrl ?? "53031871_p0.jpg"} />
    {/if}
  </div>

  <div class="title">
    <Title image={current?.titleUrl ?? "yukkuri.webp"} />
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
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) minmax(0, 0.5fr) 6em;
    grid-template-areas:
            "splash videos"
            "title schedule"
            "bottom bottom";
  }
  .splash {
    grid-area: splash;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title {
    grid-area: title;
    padding: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .videos {
    grid-area: videos;
    padding: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .schedule {
    grid-area: schedule;
    padding: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .timer {
    grid-area: bottom;
  }
</style>
