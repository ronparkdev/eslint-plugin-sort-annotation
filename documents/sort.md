# eslint-plugin-sort-annotation/sort
Sort array values if has `@sort` annotation

### Before apply annotation
```javascript
const names = [
  'Liam',
  'Noah',
  'Jackson',
  'Aiden',
  'Elijah',
  'Grayson',
  'Lucas',
  'Oliver',
]
```

### After apply annotation (Autofix by lint)
```javascript
// @sort
const names = [
  'Aiden',
  'Elijah',
  'Grayson',
  'Jackson',
  'Liam',
  'Lucas',
  'Noah',
  'Oliver',
 ]
```

### My best case to use this rule that :
```
// @sort
const adminIds = [
  'Asher',
	'Heather',
  'James',
  'Luca',
  'Ron',
  'Zinna',
]
```
If array's values are irrelevant even if the order is changed, this rule can make it clear
