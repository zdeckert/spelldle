import type { HttpError } from '@sveltejs/kit';
import { SPELL_INDEXES } from '$lib/consts';

import { API_URL, FETCH_OPTIONS } from '../consts';
import type { SpellResponse } from '../types';

let dailySpell: SpellResponse = $state({} as SpellResponse);

function getRandomSpellUrl() {
	const randomIndex = Math.floor(Math.random() * (SPELL_INDEXES.length - 1));
	return SPELL_INDEXES[randomIndex].url;
}

export default function getDailySpell(url: string = getRandomSpellUrl()) {
	if (dailySpell.spell) return dailySpell;
	async function fetchData() {
		dailySpell.isLoading = true;
		try {
			const response = await fetch(`${API_URL}${url}`, FETCH_OPTIONS);

			dailySpell.spell = await response.json();
			dailySpell.error = undefined;
		} catch (err) {
			dailySpell.error = err as HttpError;
			console.log(dailySpell.error);
			// dailySpell.spell = undefined;
		}
		dailySpell.isLoading = false;
	}

	fetchData();
	return dailySpell;
}
