<svelte:options runes={true} />

<script lang="ts">
	import type { Dayjs } from "dayjs";

	interface Props {
		current: ScheduleEvent,
		time: Dayjs
	}

	let { current, time }: Props = $props();

	function findProgress(s: Dayjs, e: Dayjs, c: Dayjs): number {
		if (!s || !e || !c) return 0;
		const span = e.diff(s, 'seconds');
		const curr = c.diff(s, 'seconds');
		return curr / span;
	}

	let percent = $derived(findProgress(current?.timeStart, current?.timeEnd, time) * 100);
</script>

<section class="timer">
	{#if current}
		<div class="times">
			<span>
				Start: <time>{current.timeStart.format('HH:mm')}</time>
			</span>
			<span>
				Koniec: <time>{current.timeEnd.format('HH:mm')}</time>
			</span>
			<span>
				Aktualny czas: <time>{time.format('HH:mm:ss')}</time>
			</span>
		</div>
		<div class="progress">
			<div class="background">{`${percent.toFixed(2)}%`}</div>
			<div class="foreground" style="--poggers:{Math.floor(percent)}%">{`${percent.toFixed(2)}%`}</div>
		</div>
	{:else}
		<div class="times">
			<span>Aktualny czas: <time>{time.format('HH:mm:ss')}</time></span>
		</div>
		<div class="progress">
			<div class="background">Przerwa</div>
		</div>
	{/if}
</section>

<style lang="scss">
	time {
		font-weight: 700;
	}

	.timer {
		grid-area: bottom;
		height: 100%;
		display: grid;
		grid-template-rows: 1fr 1fr;
		font-size: 2rem;
		z-index: 0;

		.times {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1em;
		}
		.progress {
			position: relative;
			height: 100%;
			border-top: 2px solid #465298;

			.background, .foreground {
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: 1000;
			}
			.background {
				width: 100%;
				height: 100%;
				background: repeating-linear-gradient(
					45deg,
					#606dbc,
					#606dbc 10px,
					#465298 10px,
					#465298 20px
				);
				color: white;
			}
			.foreground {
				position: absolute;
				inset: 0;
				clip-path: inset(0 0 0 var(--poggers, 100%));
				background-color: white;
				transition: clip-path 1s linear;
			}
		}
	}
</style>
