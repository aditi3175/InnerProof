import io

with open('c:\\Users\\aditi\\InnerProof\\README.md', 'rb') as f:
    content = f.read().decode('utf-8', errors='ignore')

# Normalize newlines
content = content.replace('\r\n', '\n').replace('\r', '\n')

# Remove the weird artifacts at the end
content = content.replace('#   I n n e r P r o o f', '').strip()

# Enforce CRLF since Windows Markdown viewers prefer it
with open('c:\\Users\\aditi\\InnerProof\\README.md', 'wb') as f:
    f.write(content.replace('\n', '\r\n').encode('utf-8'))
