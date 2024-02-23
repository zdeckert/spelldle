import getDailySpell from '$lib/helpers/getDailySpell.svelte.js';

export function load({}) {
	return {
		dailySpell: getDailySpell()
	};
}
