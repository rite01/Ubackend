const array = [2, 2, 5, 5, 5, 3, 3, 8, 8, 8, 8, 8];
var counts = {};

for (var i = 0; i < array.length; i++) {
  if (!counts[array[i]]) counts[array[i]] = 0;
  counts[array[i]]++;
}
console.log(counts);
