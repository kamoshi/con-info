<script lang="ts">
  export let image: string;
</script>


<img class="title-image" src={image} alt="" />


<style lang="scss">
  .title-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
</style>
