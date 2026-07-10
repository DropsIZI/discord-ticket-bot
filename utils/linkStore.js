const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../data/links.json');

function getLinks() {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    return { modpack: '', lite: '' };
  }
}

function setLink(tipo, url) {
  const links = getLinks();
  links[tipo] = url;
  fs.writeFileSync(FILE, JSON.stringify(links, null, 2), 'utf8');
}

module.exports = { getLinks, setLink };
