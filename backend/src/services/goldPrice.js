const axios = require('axios');

const OUNCE_TO_GRAM = 31.1034768;

// Bu fonksiyonun amacı: USD/GRAM *saf altın* fiyatını döndürmek.
async function getGoldPriceUsdPerGram() {
  const { GOLD_API_URL, GOLD_API_KEY } = process.env;

  // Örnek akış: API ons fiyatı veriyorsa → grama çevir.
  // Kendi seçtiğin API'nin dönen alanlarına göre burayı uyarlayacaksın.
  try {
    const res = await axios.get(GOLD_API_URL, {
      headers: { Authorization: `Bearer ${GOLD_API_KEY}` }
    });
    // ÖRNEK: diyelim ki res.data.price_per_ounce_usd var:
    const ounceUsd = res.data?.price_per_ounce_usd;
    if (ounceUsd) return ounceUsd / OUNCE_TO_GRAM;

    // ÖRNEK 2: bazı API'lar direkt gram verir: res.data.price_per_gram_usd
    if (res.data?.price_per_gram_usd) return res.data.price_per_gram_usd;

    throw new Error('Unexpected gold API shape');
  } catch (err) {
    console.error('Gold API error, using fallback:', err.message);
    // fallback: örnek bir güvenli varsayım
    return 80; // USD/gram (dummy). Üretimde kaldır!
  }
}

module.exports = { getGoldPriceUsdPerGram };
