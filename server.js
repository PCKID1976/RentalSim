const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'public');
const types = {'.html':'text/html; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
http.createServer((req,res)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Pagina non trovata');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream'});res.end(data);});
}).listen(process.env.PORT || 3000, '0.0.0.0');
