const express = require('express');
const path = require('path');
const fs = require('fs');
const { getGoldPriceUsdPerGram } = require('../services/goldPrice');
const { calcRating5, calcPriceUsd } = require('../utils/price');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const file = path.join(__dirname, '..', 'data', 'products.json');
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const products = data.products || data || [];

    const gold = await getGoldPriceUsdPerGram();

    // Bonus filtreler: ?minPrice=&maxPrice=&minPopularity=&maxPopularity=
    const {
      minPrice, maxPrice, minPopularity, maxPopularity
    } = req.query;

    const enriched = products.map(p => {
      const rating5 = calcRating5(p.popularityScore);
      const priceUsd = calcPriceUsd(p.popularityScore, p.weight, gold);
      return { ...p, rating5, priceUsd };
    }).filter(p => {
      let ok = true;
      if (minPopularity !== undefined) ok = ok && (p.popularityScore >= Number(minPopularity));
      if (maxPopularity !== undefined) ok = ok && (p.popularityScore <= Number(maxPopularity));
      if (minPrice !== undefined) ok = ok && (p.priceUsd >= Number(minPrice));
      if (maxPrice !== undefined) ok = ok && (p.priceUsd <= Number(maxPrice));
      return ok;
    });

    res.json({ goldPriceUsdPerGram: gold, count: enriched.length, products: enriched });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const file = path.join(__dirname, '..', 'data', 'products.json');
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const products = data.products || data || [];
    const found = products.find(p => String(p.id) === String(req.params.id));
    if (!found) return res.status(404).json({ error: 'Not found' });

    const gold = await getGoldPriceUsdPerGram();
    const rating5 = calcRating5(found.popularityScore);
    const priceUsd = calcPriceUsd(found.popularityScore, found.weight, gold);
    res.json({ ...found, rating5, priceUsd, goldPriceUsdPerGram: gold });
  } catch (e) {
    res.status(500).json({ error: 'Failed' });
  }
});

module.exports = router;
