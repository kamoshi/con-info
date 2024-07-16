<svelte:options runes={true} />

<script lang="ts">
	interface Props {
		image: string;
	}

	let { image }: Props = $props();
</script>


<img class="title-image" src={image} alt="" />


<style lang="scss">
	.title-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
