import sort from './rules/sort-annotation'
import sortKeys from './rules/sort-keys-annotation'

// Import all rules in lib/rules
module.exports.rules = {
  sort: sort,
  'sort-keys': sortKeys,
}
