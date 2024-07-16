<svelte:options runes={true} />

<script lang="ts">
	import type { Dayjs } from "dayjs";
	import { eventsSorted } from "../utils";

	interface Props {
		schedule: ScheduleEvent[];
		time: Dayjs;
	}

	let { schedule, time }: Props = $props();

	let sorted = $derived(eventsSorted(schedule || []));
	let prev = $derived(sorted.map((event: ScheduleEvent) => time.isAfter(event.timeEnd)).lastIndexOf(true));
	let next = $derived(sorted.findIndex((event: ScheduleEvent) => time.isBefore(event.timeStart)));
	let curr = $derived(sorted.findIndex((event: ScheduleEvent) => time.isAfter(event.timeStart) && time.isBefore(event.timeEnd)));

	let eventPrev = $derived(sorted?.[prev]);
	let eventCurr = $derived(sorted?.[curr]);
	let eventNext = $derived(sorted?.[next]);
</script>


<section class="schedule nice-box">
	<h3 class="heading">Harmonogram</h3>
	<div class="events">
		<span class="name">{eventPrev?.name || '---'}</span>
		<span class="right">{eventPrev?.timeStart.format('HH:mm') || ''}</span>
		<span class="right">{eventPrev?.timeEnd.format('HH:mm') || ''}</span>
		<!--  -->
		<span class="now name">{eventCurr?.name || 'Przerwa'}</span>
		<span class="now right">{eventCurr?.timeStart.format('HH:mm') || ''}</span>
		<span class="now right">{eventCurr?.timeEnd.format('HH:mm') || ''}</span>
		<!--  -->
		<span class="name">{eventNext?.name || '---'}</span>
		<span class="right">{eventNext?.timeStart.format('HH:mm') || ''}</span>
		<span class="right">{eventNext?.timeEnd.format('HH:mm') || ''}</span>
	</div>
</section>


<style lang="scss">
	.schedule {
		padding: 1em;
		background: white;

		.heading {
			font-size: 2em;
			margin: 0 0 0.5em 0;
		}
		.events {
			display: grid;
			grid-template-columns: 1fr 3em 3em;
			column-gap: 0.25em;
			font-size: 1.2em;

			.now {
				font-weight: bold;
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
		}
	}
</style>
