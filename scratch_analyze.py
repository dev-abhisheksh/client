import re

with open('reference.html.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('Length of file:', len(text))
nav_links = re.findall(r'data-go="([^"]+)"', text)
print('Nav data-go targets:', list(dict.fromkeys(nav_links)))

pgs = re.findall(r'<div[^>]*class="[^"]*pg[^"]*"[^>]*id="([^"]+)"', text)
print('Pages found with class pg:', pgs)

scripts = re.findall(r'<script[\s\S]*?</script>', text)
print('Number of scripts:', len(scripts))
for i, s in enumerate(scripts):
    print(f'Script {i}: length {len(s)}')
    print(s[:300])  
