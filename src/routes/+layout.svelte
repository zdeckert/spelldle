<script lang="ts">
	import "../app.pcss";
	import { ModeWatcher } from "mode-watcher";

</script>

<ModeWatcher />
<div class="flex justify-center gap-2">
	<main>
		<slot />
	</main>
</div>
