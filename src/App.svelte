<svelte:options runes={true} />

<script lang="ts">
	import Splash from "./lib/Splash.svelte";
	import Title from "./lib/Title.svelte";
	import Videos from "./lib/Videos.svelte";
	import Timer from "./lib/Timer.svelte";
	import Schedule from "./lib/Schedule.svelte";
	import { prepareSchedule } from "./utils";
	import dayjs from "dayjs";

	let time = $state(dayjs());
	setInterval(() => time = dayjs(), 200);

	let files: FileList = $state();
	let schedule: ScheduleEvent[] = $state([]);
	let current = $derived(schedule.find(event => time.isAfter(event.timeStart) && time.isBefore(event.timeEnd)));

	async function onFilesChange() {
		const data = await files[0].text();
		schedule = prepareSchedule(JSON.parse(data));
	}
</script>


<main class="main">
	<div class="splash">
		{#if !schedule || !schedule.length}
			<input type="file" bind:files onchange={onFilesChange}>
		{:else}
			<Splash splash={current?.imageUrl ?? "53031871_p0.jpg"} />
		{/if}
	</div>

  <div class="title">
    <Title image={current?.titleUrl || "yukkuri.webp"} />
  </div>

	<Videos />

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
