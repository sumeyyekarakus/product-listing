const axios = require('axios');

const OUNCE_TO_GRAM = 31.1034768;


async function getGoldPriceUsdPerGram() {
  const { GOLD_API_URL, GOLD_API_KEY } = process.env;

  
  try {
    const res = await axios.get(GOLD_API_URL, {
      headers: { Authorization: `Bearer ${GOLD_API_KEY}` }
    });
    
    const ounceUsd = res.data?.price_per_ounce_usd;
    if (ounceUsd) return ounceUsd / OUNCE_TO_GRAM;

    
    if (res.data?.price_per_gram_usd) return res.data.price_per_gram_usd;

    throw new Error('Unexpected gold API shape');
  } catch (err) {
    console.error('Gold API error, using fallback:', err.message);
    
    return 80; 
  }
}

module.exports = { getGoldPriceUsdPerGram };
