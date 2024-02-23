<script lang="ts">
	import Typeahead from 'svelte-typeahead';
	import { SPELL_INDEXES, CATEGORIES, SPELL_OBJ_FALLBACK } from '$lib/consts';
	import type { SpellIndex, SpellResponse } from '$lib/types';
	import useFetchSpell from '$lib/helpers/useFetchSpell.svelte';
	import type { PageData } from './$types';
	import { getAoeBG, getArrBG, getStrBG, getNumBG, getBoolBG } from '$lib/helpers/getBG';

	let { data: loadData }: { data: PageData } = $props();
	let { dailySpell } = loadData;

	let {
		name: d_name,
		area_of_effect: d_aoe,
		attack_type: d_attackType,
		casting_time: d_castingTime,
		classes: d_classes,
		components: d_components,
		concentration: d_concentration,
		damage: {
			damage_type: { name: d_damageName }
		},
		dc: {
			dc_type: { name: d_dcName }
		},
		duration: d_duration,
		level: d_level,
		higher_level: d_higherLevel,
		range: d_range,
		ritual: d_ritual,
		school: { name: d_schoolName },
		subclasses: d_subclasses
	} = $derived({ ...SPELL_OBJ_FALLBACK, ...dailySpell.spell });

	let responses: SpellResponse[] = $state([]);

	let hasWon = $derived(d_name === responses[responses.length - 1]?.spell?.name);

	let data = [...SPELL_INDEXES];

	function extract(item: SpellIndex) {
		return item.name;
	}

	$inspect(dailySpell?.spell, responses[responses.length - 1]?.spell);
</script>

<h1>Spelldle</h1>
<h2>Guess the correct 5e spell</h2>
<Typeahead
	disabled={!dailySpell.spell || hasWon}
	hideLabel
	inputAfterSelect="clear"
	placeholder="Guess a spell"
	{data}
	{extract}
	on:select={({ detail: { original } }) => {
		responses.push((useFetchSpell(original.url) as SpellResponse));
	}}
	filter={({ index }) =>
		responses.map(({ spell: { index: respIndex } }) => respIndex).includes(index)}
/>

<div class="grid grid-cols-16 gap-2">
	{#if dailySpell?.isLoading}
		<div class="col-span-16">
			<p>Incanting todays spell...</p>
		</div>
	{:else if dailySpell?.error}
		<div class="col-span-16">
			<p>Oh no! The spell was countered! (Error occured searching for the spell)</p>
		</div>
	{:else if dailySpell?.spell}
		<!-- <p class="col-span-16">Todays spell is: {dailySpell.spell.name}</p> -->
		{#each CATEGORIES as category}
			<p class="col-span-1 border-b-2 border-base-content text-center">{category}</p>
		{/each}
		{#each responses as { isLoading, error, spell }}
			{#if isLoading}
				<div class="col-span-16">
					<p>Summoning your spell...</p>
				</div>
			{:else if error}
				<div class="col-span-16">
					<p>Oh no! The spell was countered! (Error occured searching for the spell)</p>
				</div>
			{:else if spell}
				{@const {
					name,
					area_of_effect: aoe,
					attack_type: attackType,
					casting_time: castingTime,
					classes,
					components,
					concentration,
					damage: {
						damage_type: { name: damageName }
					},
					dc: {
						dc_type: { name: dcName }
					},
					duration,
					level,
					higher_level: higherLevel,
					range,
					ritual,
					school: { name: schoolName },
					subclasses
				} = { ...SPELL_OBJ_FALLBACK, ...spell }}
				<!-- {@const aoe = spell?.area_of_effect}
			{@const attackType = spell?.attack_type}
			{@const damage = spell.damage?.damage_type?.name}
			{@const higherLevel = spell?.higher_level} -->
				<p class="col-span-1">{name}</p>
				<p class="col-span-1 text-center {getAoeBG(d_aoe, aoe)}">
					{!!aoe ? `${aoe.size}, ${aoe.type}` : 'No AoE'}
				</p>
				<p class="col-span-1 text-center {getStrBG(d_attackType, attackType)}">
					{!!attackType ? attackType : 'No Attack Roll'}
				</p>
				<p class="col-span-1 text-center {getStrBG(d_castingTime, castingTime)}">{castingTime}</p>
				<p
					class="col-span-1 text-center {getArrBG(
						d_classes.map(({ name }) => name),
						classes.map(({ name }) => name)
					)}"
				>
					{classes.map(({ name }: { name: string }) => name).join(', ')}
				</p>
				<p class="col-span-1 text-center {getArrBG(d_components, components)}">
					{components.join(', ')}
				</p>
				<p class="col-span-1 text-center {getBoolBG(d_concentration, concentration)}">
					{concentration}
				</p>
				<p class="col-span-1 text-center {getStrBG(d_damageName, damageName)}">
					{!!damageName ? damageName : 'No Damage'}
				</p>

				<p class="col-span-1 text-center {getStrBG(d_dcName, dcName)}">
					{!!dcName ? dcName : 'No Save'}
				</p>
				<p class="col-span-1 text-center {getStrBG(d_duration, duration)}">{duration}</p>
				<p class="col-span-1 text-center {getNumBG(d_level, level)}">
					{level === 0 ? 'Cantrip' : level}
					{d_level > level ? '⬆️' : d_level < level ? '⬇️' : ''}
				</p>
				<p
					class="col-span-1 text-center {getBoolBG(!!d_higherLevel?.length, !!higherLevel?.length)}"
				>
					{String(!!higherLevel?.length)}
				</p>
				<p class="col-span-1 text-center {getStrBG(d_range, range)}">{range}</p>
				<p class="col-span-1 text-center {getBoolBG(d_ritual, ritual)}">{ritual}</p>
				<p class="col-span-1 text-center {getStrBG(d_schoolName, schoolName)}">{schoolName}</p>
				<p
					class="col-span-1 text-center {getArrBG(
						d_subclasses.map(({ name }) => name),
						subclasses.map(({ name }) => name)
					)}"
				>
					{subclasses.length
						? subclasses.map(({ name }: { name: string }) => name).join(', ')
						: 'None'}
				</p>
			{/if}
		{/each}
	{/if}
	{#if hasWon}
		<p class="col-span-16">You Win! Congratulations! You're the greatest wizard of all!</p>
	{/if}
</div>
