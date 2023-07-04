const { query } = require("express");
const { on } = require("nodemon");

module.exports = {
  addSmartPhone,
  searchingPhone,
  getBrands,
  getModels,
  getPhonesByPrice,
};

async function addSmartPhone(db, data) {
  let add = await db.collection("phones");
  add.insertMany(data);
}
//Put form control of bootstrap n top of phone table having Brand, model test box

async function searchingPhone(db, brand, model, from, to) {
  let query={}
  if (from || to) {
    query.price = {};
  }
  if (brand) {
    query.brand = brand;
  }
  if (model) {
    query.model = model;
  }
  if (from && to) {
    query.price = { $gte: from, $lte: to };
  } else if (from) {
    query.price = { $gte: from };
  } else if (to) {
    query.price = { $lte: to };
  }

  const result = await db.collection("phones").find(query);
  const phones = await result.toArray();
  return phones;
}
// function to not to reapeat brand names
async function getBrands(db) {
  let brands = [];

  let gettingBrand = await db.collection("phones").find();

  const phoneBrand = await gettingBrand.toArray();
  for (i = 0; i < phoneBrand.length; i++) {
    let onlyBrand = phoneBrand[i].brand;
    if (!brands.includes(onlyBrand)) brands.push(onlyBrand);
  }

  return brands;
}
// function to give brand and it shows models as output
async function getModels(db, brand) {
  let models = [];
  let phoneResult = await db.collection("phones").find({ brand: brand });

  const phones = await phoneResult.toArray();
  for (i = 0; i < phones.length; i++) {
    let onlyModel = phones[i].model;
    if (!models.includes(onlyModel)) models.push(onlyModel);
  }
  return models;
}
/// function for price range
async function getPhonesByPrice(db, from, to) {
  let query = {};
  query.price = {};
  if (from && to) {
    query.price = { $gte: from, $lte: to };
  } else if (from) {
    query.price = { $gte: from };
  } else if (to) {
    query.price = { $lte: to };
  }
  console.log(JSON.stringify(query));
  let phoneResult = await db.collection("phones").find(query);
  let result = await phoneResult.toArray();
  return result;
}
