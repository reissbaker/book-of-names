import { NAMES } from "./names";
import * as adjectives from "./adjectives";

const ORDER = [
  adjectives.OPINION,
  adjectives.SIZE,
  adjectives.AGE,
  adjectives.COLOR,
  adjectives.ORIGIN,
  NAMES,
];

export const name = {
  bigint: (n: bigint) => fromBigInt(n),
  str: (s: string) => fromBigInt(utf8Hash(s)),
};

function fromBigInt(n: bigint) {
  let num = n;

  // Wrap the number around to fit within our space
  const combos = combinations();
  // Handle negative numbers and wrap around properly
  // ((n % m) + m) % m ensures positive result
  num = ((num % combos) + combos) % combos;

  // Always include a name
  const selections = new Array(ORDER.length - 1).fill(false);
  const chosen: string[] = [];

  // Determine which adjective types to include (except name)
  const possibleCombinations = 2n ** BigInt(ORDER.length - 1);
  const selectionBits = num % possibleCombinations;

  for (let i = 0; i < ORDER.length - 1; i++) {
    selections[i] = ((selectionBits >> BigInt(i)) & 1n) === 1n;
  }

  // Use remaining bits to select specific items
  let remainingNum = num / possibleCombinations;

  // Select from each chosen list
  for (let i = 0; i < ORDER.length - 1; i++) {
    if (selections[i]) {
      const list = ORDER[i];
      const index = Number(remainingNum % BigInt(list.length));
      chosen.push(list[index]);
      remainingNum = remainingNum / BigInt(list.length);
    }
  }

  // Always add a name (last list)
  const nameList = ORDER[ORDER.length - 1];
  const nameIndex = Number(remainingNum % BigInt(nameList.length));
  chosen.push(nameList[nameIndex]);

  const combined = chosen.join(" ");
  const firstLetter = combined[0];
  return firstLetter.toUpperCase() + combined.slice(1);
}

export function combinations() {
  // Convert lengths to BigInt
  const lengths = ORDER.map(list => BigInt(list.length));

  // Calculate total possible adjective combinations (2^n where n is number of adjective types)
  // This represents all possible ways of including/excluding each adjective type
  const numAdjectiveTypes = BigInt(ORDER.length - 1); // Subtract 1 because name is always included
  const possibleCombinations = 2n ** numAdjectiveTypes;

  // For each possible combination of adjective types, we need to multiply
  // by the number of possibilities for each included type
  let total = 0n;

  // Iterate through all possible combinations
  for (let i = 0n; i < possibleCombinations; i++) {
    let combinationTotal = 1n;

    // Check which adjective types are included in this combination
    for (let j = 0n; j < numAdjectiveTypes; j++) {
      if ((i >> j) & 1n) {
        // This adjective type is included, multiply by its number of possibilities
        combinationTotal *= lengths[Number(j)];
      }
    }

    // Always multiply by number of possible names (last element in ORDER)
    combinationTotal *= lengths[lengths.length - 1];

    // Add this combination's total to the running total
    total += combinationTotal;
  }

  return total;
}

// Convert string to UTF-8 bytes and use them for hashing
export function utf8Hash(str: string): bigint {
  // Convert string to UTF-8 bytes
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);

  let hash = 0n;
  for (let i = 0; i < bytes.length; i++) {
    hash = (hash * 65537n + BigInt(bytes[i])) % (2n ** 64n);
  }

  return hash;
}
