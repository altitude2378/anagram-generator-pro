import urllib.request, json
from collections import defaultdict


url = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
with urllib.request.urlopen(url) as f:
    words = f.read().decode().splitlines()


lookup = defaultdict(list)
for w in words:
    w = w.strip().lower()
    if 2 <= len(w) <= 8 and w.isalpha():
        key = ''.join(sorted(w))
        lookup[key].append(w)


with open('wordmap.js', 'w') as f:
    f.write('const WORD_MAP = ')
    f.write(json.dumps(dict(lookup), separators=(',', ':')))
    f.write(';')

print("Done! wordmap.js created.")