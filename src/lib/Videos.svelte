<script lang="ts">
  import YouTube from 'svelte-youtube';
  import {extractIds} from "../utils";

  let files: FileList;
  let videos: string[];
  let videoId: string;

  function random(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async function onFilesChange() {
    const data = await files[0].text();
    if (!data) return videos = [];

    videos = extractIds(JSON.parse(data));
    videoId = random(videos);
  }

  function onPlayerReady(event) {
    setTimeout(() => event.detail.target.playVideo(), 1000);
  }

  function playVideo(event) {
    videoId = random(videos);
    setTimeout(() => event.detail.target.playVideo(), 1000);
  }
</script>


{#if videoId}
  <YouTube class="video-screen nice-box" {videoId} on:ready={onPlayerReady} on:end={playVideo} />
{:else}
  <input type="file" bind:files on:change={onFilesChange}>
{/if}
