<script lang="ts">
  import type {Moment} from "moment";

  export let current: ScheduleEvent;
  export let time: Moment;
</script>

<section class="current">
  {#if current}
    <img src={current.image} alt="" />
  {/if}
</section>
