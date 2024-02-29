import type { HttpError } from '@sveltejs/kit';

import { API_URL, FETCH_OPTIONS } from '../consts';
// import type { SpellResponse } from './types';

class SpellResponse {
	spell = $state();
	error = $state();
	isLoading = $state(false);
}
// let spellResponse: SpellResponse = $state({
// 	spell: undefined,
// 	error: undefined,
// 	isLoading: false
// });

export default function useFetchSpell(url: string) {
	const spellResponse = new SpellResponse();

	async function fetchData() {
		spellResponse.isLoading = true;
		try {
			const response = await fetch(`${API_URL}${url}`, FETCH_OPTIONS);

			spellResponse.spell = await response.json();
			spellResponse.error = undefined;
		} catch (err) {
			spellResponse.error = err as HttpError;
			console.log(spellResponse.error);
			// spellResponse.spell = undefined;
		}
		spellResponse.isLoading = false;
	}

	fetchData();
	return spellResponse;
}
