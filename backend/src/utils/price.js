function normalizePopularity(score) {
  // products.json 0–1 veriyorsa: olduğu gibi.
  // 0–100 (yüzde) gelirse 0–1'e çevir.
  return score > 1 ? score / 100 : score;
}

function calcRating5(popularity) {
  const p = normalizePopularity(popularity);
  return Math.round(p * 5 * 10) / 10; // 1 ondalık
}

function calcPriceUsd(popularity, weightGram, goldPriceUsdPerGram) {
  const p = normalizePopularity(popularity);
  const raw = (p + 1) * weightGram * goldPriceUsdPerGram;
  return Math.round(raw * 100) / 100; // 2 ondalık
}

module.exports = { normalizePopularity, calcRating5, calcPriceUsd };
