import re

with open('c:\\Users\\aditi\\InnerProof\\README.md', 'rb') as f:
    raw = f.read()

# Replace null bytes
clean_text = raw.replace(b'\x00', b'').decode('utf-8', errors='ignore')

# Split lines
lines = clean_text.splitlines()

# Clean trailing whitespace
lines = [line.rstrip() for line in lines]

# Filter out the weird string
lines = [line for line in lines if '#InnerProof' not in re.sub(r'\s+', '', line)]

# Remove variation selectors
final_text = '\n'.join(lines).replace('\uFE0F', '')

# Ensure blocks have double newlines
final_text = re.sub(r'([^\n])\n```', r'\1\n\n```', final_text)
final_text = re.sub(r'```\n([^\n])', r'```\n\n\1', final_text)

# Also ensure paragraphs have double newlines if they are squished next to headings
final_text = re.sub(r'^(## .+)\n([^\n])', r'\1\n\n\2', final_text, flags=re.MULTILINE)

with open('c:\\Users\\aditi\\InnerProof\\README.md', 'wb') as f:
    f.write(final_text.replace('\n', '\r\n').encode('utf-8'))
print('Done!')
