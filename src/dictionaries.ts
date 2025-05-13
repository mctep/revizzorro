interface Pair {
	foreign: string;
	translation: string;
}

const dictionaries = new Map<number, Pair[]>();

export function getDictionary(userId: number) {
	return dictionaries.get(userId) ?? [];
}

export function addDictionaryPair(userId: number, pair: Pair) {
	const dictionary = getDictionary(userId);

	dictionary.push(pair);

	dictionaries.set(userId, dictionary);
}
