import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const avatarMap: Record<string, string> = {
  'https://i.pravatar.cc/150?u=6': 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png',
  'https://i.pravatar.cc/150?u=10': 'https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png',
  'https://i.pravatar.cc/150?u=11': 'https://i.postimg.cc/wjMsJjbG/hadoseong.png',
  'https://i.pravatar.cc/150?u=12': 'https://i.postimg.cc/nhW91f6R/jangseon-u.png',
  'https://i.pravatar.cc/150?u=20': 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg',
  'https://i.pravatar.cc/150?u=21': 'https://i.postimg.cc/cLC8YL5D/IMG-5074.jpg',
  'https://i.pravatar.cc/150?u=22': 'https://i.postimg.cc/t4JVP4mz/IMG-7636.jpg',
};

for (const [oldUrl, newUrl] of Object.entries(avatarMap)) {
  content = content.split(oldUrl).join(newUrl);
}

content = content.replace(
  "avatars: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2']",
  "avatars: ['https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', 'https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png', 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', 'https://i.postimg.cc/nhW91f6R/jangseon-u.png']"
);

content = content.replace(
  "avatars: ['https://i.pravatar.cc/150?u=3', 'https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5']",
  "avatars: ['https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', 'https://i.postimg.cc/cLC8YL5D/IMG-5074.jpg', 'https://i.postimg.cc/t4JVP4mz/IMG-7636.jpg', 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png']"
);

fs.writeFileSync('src/App.tsx', content);
console.log('Avatars replaced successfully.');
