<script lang="ts">
	import type { Dayjs } from "dayjs";

	interface Props {
		schedule: ScheduleEvent[];
		time: Dayjs;
	}

	let { schedule, time }: Props = $props();

 	function eventsSorted(events: ScheduleEvent[]): ScheduleEvent[] {
		const copy = (!!events) ? [...events] : [];
		copy.sort((a, b) => a.timeStart.valueOf() - b.timeStart.valueOf());
		return copy;
	}

	let sorted = $derived(eventsSorted(schedule || []));
	let curr = $derived(sorted.findIndex((event: ScheduleEvent) => time.isAfter(event.timeStart) && time.isBefore(event.timeEnd)));
</script>


<section class="wrapper">
	<div class="table">
		<h3 class="heading">Harmonogram</h3>
		<div class="events">
			{@render row(sorted?.[curr - 2])}
			{@render row(sorted?.[curr - 1])}
			{@render row(sorted?.[curr], true, 'Przerwa')}
			{@render row(sorted?.[curr + 1])}
			{@render row(sorted?.[curr + 2])}
		</div>
	</div>
</section>

{#snippet row(event: ScheduleEvent, hl = false, fallback = '---')}
	<span class:hl class="name">{event?.name ?? fallback}</span>
	<span class:hl class="right">{event?.timeStart.format('HH:mm') || ''}</span>
	<span class:hl class="right">{event?.timeEnd.format('HH:mm') || ''}</span>
{/snippet}


<style lang="scss">
	section {
		grid-area: schedule;
		padding: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.table {
		padding: 1em;
		background: white;
	}
	.heading {
		font-size: 2em;
		margin: 0 0 0.5em 0;
	}
	.events {
		display: grid;
		grid-template-columns: 1fr 3em 3em;
		column-gap: 0.25em;
		font-size: 1.2em;
	}
	.name {
		min-width: 16em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.right {
		display: flex;
		justify-content: flex-end;
	}
	.hl {
		font-weight: bold;
	}
</style>
