echo '' > game.js
for i in `ls models`; do cat models/$i >> game.js; done
for i in `ls view`; do cat view/$i >> game.js; done
cat globals.js >> game.js
cat init.js >> game.js
