const qs = require('qs');
const Models = require('../models/Models');
const { Op } = require('sequelize');
const { decrypt } = require('../utils/Utils');

/**
 * @param {qs.ParsedQs} queryString
 */
const getFilterObjectFromQueryString = queryString => {
  const { filters = null } = queryString;
  return new Promise(resolve => resolve(filters ? JSON.parse(decrypt(filters)) : null));
}

const getSequelizeFindOptions = (filters = {}) => {
  /** @type {import('sequelize').FindOptions} */
  const findOptions = {}
  if (filters?.where) {
    findOptions.where = Object.entries(filters.where).reduce((acc, [key, values]) => {
      if (['string', 'number', 'boolean'].includes(typeof values) || Array.isArray(values)) return { ...acc, [key]: values };
      return {
        ...acc,
        [key]: Object.entries(values).reduce((prev, [operator, value]) => ({
          ...prev,
          [Op[operator]]: value
        }), {}),
      }
    }, {});
  }
  if (filters?.include) {
    findOptions.include = Object.entries(filters.include).map(([key, values]) => {
      if (values === true) return Models[key];
      return { model: Models[key], where: values }
    })
  }
  // findOptions.logging = false
  return findOptions;
}

module.exports = {
  getFilterObjectFromQueryString,
  getSequelizeFindOptions,
}