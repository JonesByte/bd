import os
import glob

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '/bytedownloader/' in content:
        content = content.replace('/bytedownloader/', '/bd/')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Replaced in {filepath}")

files = [
    'constants.ts',
    'components/SplashScreen.tsx',
    'components/Navbar.tsx',
    'components/Footer.tsx',
    'components/BackgroundMusic.tsx'
]

for file in files:
    replace_in_file(os.path.join(r'd:\.vscode\bytedownloader', file))
