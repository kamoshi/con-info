<svelte:options runes={true} />

<script lang="ts">
	interface Props {
		splash: string;
	}

	let { splash }: Props = $props();
</script>

<img class="splash" src={splash} alt="" />

<style lang="scss">
	.splash {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
</style>
