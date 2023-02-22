<script lang="ts">
  export let splash: string;
</script>


<img class="splash" src={splash} alt="" />


<style lang="scss">
  .splash {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
