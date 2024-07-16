<script lang="ts">
	let player: HTMLMediaElement = $state();

	interface VideoItem {
		file: string;
		title: string;
	}

	let files: FileList = $state();
	let data: VideoItem[] = $state();
	let link: VideoItem = $state();

	let percent = $state(0);
	setInterval(() => percent = player?.currentTime / player?.duration * 100 || 0, 1000);

	function random<T>(arr: T[]): T {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	async function reload() {
		try {
			const json = await files[0].text();
			if (!json) return (data = []);

			data = JSON.parse(json);
			link = random(data);
		} catch (_) {
			data = [];
			link = undefined;
		}
	}

	function play(_: Event) {
		setTimeout(() => player.play(), 500);
	}

	function next(_: Event) {
		link = random(data);
		setTimeout(() => player.load(), 500);
	}

	const example = `[
	{
		"file": "apple.mp4",
		"title": "Nomico - Bad Apple!!"
	}
]`;
</script>

<div class="wrapper">
	{#if link}
		<div class="player">
			<video bind:this={player} oncanplay={play} onended={next}>
				<source src={link.file} />
				<track kind="captions" />
			</video>
		</div>

		<div class="progress">
			<div class="background">{link.title}</div>
			<div class="foreground" style="--poggers:{percent}%">{link.title}</div>
		</div>
	{:else}
		<input type="file" bind:files onchange={reload} />
		<pre>{example} </pre>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		grid-area: videos;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.player {
		width: 100%;
		height: calc(100% - 1.4rem);
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	pre {
		tab-size: 2;
	}

	.progress {
		position: relative;
		height: 1.4rem;
		width: 100%;
		margin: 0;
		line-height: 1.4rem;
		border: 2px solid #465298;

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
</style>
