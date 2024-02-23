<script lang="ts">
	import '../app.css';
	// import { setContext } from 'svelte';
	// import getDailySpell from '$lib/getDailySpell.svelte';
	// import type { SpellResponse } from '$lib/types';

	// let dailySpell: SpellResponse = $state({
	// 	spell: undefined,
	// 	error: undefined,
	// 	isLoading: true
	// });
	// $effect(() => {
	// 	dailySpell = getDailySpell();
	// 	setContext('dailySpell', dailySpell);
	// });

	// // $inspect(dailySpell);
</script>

<div class="flex justify-center gap-2">
	<main>
		<slot />
	</main>
</div>
