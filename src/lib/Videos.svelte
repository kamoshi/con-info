<script lang="ts">
	let player: HTMLMediaElement = $state();

	interface VideoItem {
		file: string;
		title: string;
	}

	let files: FileList = $state();
	let data: VideoItem[] = $state();
	let link: VideoItem = $state();

	function random<T>(arr: T[]): T {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	async function reload() {
		try {
			const json = await files[0].text();
			if (!json) return data = [];

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
</script>


<div class="wrapper">
	{#if link}
		<div class="player">
			<video bind:this={player} oncanplay={play} onended={next}>
				<source src={link.file}/>
				<track kind="captions">
			</video>
		</div>
		<h3>{link.title}</h3>
	{:else}
		<input type="file" bind:files onchange={reload}/>
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
		height: 100%;
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
