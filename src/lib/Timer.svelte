<script lang="ts">
  import type {Dayjs} from "dayjs";
  import {findProgress} from "../utils";

  export let current: ScheduleEvent;
  export let time: Dayjs;

  $: percent = findProgress(current?.timeStart, current?.timeEnd, time) * 100;
</script>

<section class="timer">
  {#if current}
    <div class="times">
      <span>Start: {current.timeStart.format('HH:mm')}</span>
      <span>Koniec: {current.timeEnd.format('HH:mm')}</span>
      <span>Aktualny czas: {time.format('HH:mm:ss')}</span>
    </div>
    <div class="progress" style="--poggers:{Math.floor(percent)}%">{`${percent.toFixed(2)}%`}</div>
  {:else}
    <div class="times">
      <span>Aktualny czas: {time.format('HH:mm:ss')}</span>
    </div>
    <div class="progress">Przerwa</div>
  {/if}
</section>

<style lang="scss">
  .timer {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    font-size: 2rem;
    z-index: 0;

    .times {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-gap: 1em;
    }
    .progress {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      z-index: 3213;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: var(--poggers);
        z-index: -1;
        background: #b3e5fc;
      }
    }
  }
</style>
