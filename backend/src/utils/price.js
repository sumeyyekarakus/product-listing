function normalizePopularity(score) {
  
  return score > 1 ? score / 100 : score;
}

function calcRating5(popularity) {
  const p = normalizePopularity(popularity);
  return Math.round(p * 5 * 10) / 10; 
}

function calcPriceUsd(popularity, weightGram, goldPriceUsdPerGram) {
  const p = normalizePopularity(popularity);
  const raw = (p + 1) * weightGram * goldPriceUsdPerGram;
  return Math.round(raw * 100) / 100; 
}

module.exports = { normalizePopularity, calcRating5, calcPriceUsd };
