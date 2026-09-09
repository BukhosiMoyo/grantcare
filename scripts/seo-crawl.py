"""Read-only public SEO crawl; never submits forms or follows token/private links."""
import argparse, collections, concurrent.futures, gzip, hashlib, json, pathlib, re, time
import urllib.request, urllib.error, urllib.parse, xml.etree.ElementTree as ET
from html.parser import HTMLParser

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title=[]; self.h1=[]; self.links=[]; self.images=[]; self.canonicals=[]; self.alternates=[]; self.descriptions=[]; self.robots=[]; self.schemas=[]; self.text=[]; self.stack=[]; self.script=None; self.lang=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html': self.lang=a.get('lang')
        if tag=='title': self.stack.append('title')
        if tag=='h1': self.h1.append(''); self.stack.append('h1')
        if tag in ('script','style'): self.stack.append(tag)
        if tag=='script' and a.get('type')=='application/ld+json': self.script=''
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag=='img': self.images.append(a)
        if tag=='link' and a.get('rel')=='canonical': self.canonicals.append(a.get('href'))
        if tag=='link' and a.get('hreflang'): self.alternates.append(a)
        if tag=='meta' and a.get('name')=='description': self.descriptions.append(a.get('content'))
        if tag=='meta' and a.get('name') in ('robots','googlebot'): self.robots.append(a.get('content'))
    def handle_endtag(self, tag):
        if tag=='script' and self.script is not None:
            try: self.schemas.append(json.loads(self.script))
            except ValueError: self.schemas.append({'parseError':True})
            self.script=None
        if tag in self.stack: self.stack.remove(tag)
    def handle_data(self,data):
        if self.script is not None: self.script+=data
        if 'title' in self.stack: self.title.append(data)
        if 'h1' in self.stack: self.h1[-1]+=data
        if not any(x in self.stack for x in ('script','style')): self.text.append(data)

def fetch(url):
    start=time.monotonic()
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'GrantCare-SEO-Audit/1.0','Accept-Encoding':'identity'})
        with urllib.request.urlopen(req,timeout=35) as r:
            body=r.read().decode('utf-8','replace'); status=r.status; final=r.url; headers=dict(r.headers)
    except urllib.error.HTTPError as e:
        body=e.read().decode('utf-8','replace'); status=e.code; final=e.url; headers=dict(e.headers)
    except Exception as e: return {'url':url,'error':str(e)}
    p=Page(); p.feed(body)
    return {'url':url,'status':status,'final':final,'seconds':round(time.monotonic()-start,3),'bytes':len(body.encode()),'title':''.join(p.title),'h1':p.h1,'canonical':p.canonicals,'description':p.descriptions,'robots':p.robots,'xRobots':headers.get('x-robots-tag',headers.get('X-Robots-Tag')),'lang':p.lang,'alternates':p.alternates,'links':sorted(set(p.links)),'images':p.images,'schemas':p.schemas,'text':re.sub(r'\s+',' ',' '.join(p.text)).strip(),'sha256':hashlib.sha256(body.encode()).hexdigest()}

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--base',default='https://grantcare.co.za'); ap.add_argument('--output',required=True); ap.add_argument('--sitemap'); ap.add_argument('--baseline'); ap.add_argument('--workers',type=int,default=6); args=ap.parse_args()
    base=args.base.rstrip('/'); out=pathlib.Path(args.output); out.mkdir(parents=True,exist_ok=True)
    maps=[]; sitemap_urls=[]; pending=[base+'/sitemap.xml']
    while pending:
        u=pending.pop(); maps.append(u)
        data=pathlib.Path(args.sitemap).read_bytes() if args.sitemap and len(maps)==1 else urllib.request.urlopen(u,timeout=45).read()
        root=ET.fromstring(data)
        urls=[x.text for x in root.findall('.//{*}loc')]
        if root.tag.endswith('sitemapindex'): pending.extend(x for x in urls if x not in maps)
        else: sitemap_urls.extend(urls)
    urls={base+urllib.parse.urlsplit(u).path for u in sitemap_urls}
    private=re.compile(r'^/(?:en/|zu/|xh/|tn/)?(?:api|admin|dashboard|unsubscribe|reset-password)(?:/|$)')
    seed_urls=set(urls)
    if args.baseline:
        with gzip.open(args.baseline, 'rt') as f:
            seed_urls.update(base+urllib.parse.urlsplit(json.loads(line)['url']).path for line in f)
    seen=set(); rows=[]; skipped=set(); queue=sorted(seed_urls); started=time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool, gzip.open(out/'pages.jsonl.gz','wt') as f:
        while queue:
            batch=queue; queue=[]; seen.update(batch)
            for row in pool.map(fetch,batch):
                rows.append(row); f.write(json.dumps(row)+'\n'); f.flush()
                for link in row.get('links',[]):
                    u=urllib.parse.urlsplit(urllib.parse.urljoin(row['url'],link))
                    if u.hostname!=urllib.parse.urlsplit(base).hostname: continue
                    if private.search(u.path) or u.query or re.search(r'\.[a-zA-Z0-9]{2,5}$',u.path): skipped.add(urllib.parse.urlunsplit(u)); continue
                    full=base+(u.path or '/')
                    if full not in seen: queue.append(full); seen.add(full)
                if len(rows)%100==0: print(json.dumps({'crawled':len(rows),'queued':len(queue),'elapsed':round(time.time()-started)}),flush=True)
            queue=sorted(set(queue))
    counter=collections.Counter(str(x.get('status','error')) for x in rows)
    titles=collections.defaultdict(list)
    for r in rows:
        if r.get('status')==200 and not any('noindex' in x for x in r.get('robots',[])): titles[r.get('title')].append(r['url'])
    summary={'base':base,'sitemaps':maps,'sitemapCount':len(sitemap_urls),'uniqueSitemapCount':len(urls),'crawled':len(rows),'statusCounts':counter,'discoveredOutsideSitemap':sorted(seen-urls),'skippedLinks':sorted(skipped),'failures':[{'url':r['url'],'status':r.get('status'),'error':r.get('error')} for r in rows if r.get('status')!=200],'missingTitles':[r['url'] for r in rows if r.get('status')==200 and not r.get('title')],'missingDescriptions':[r['url'] for r in rows if r.get('status')==200 and not r.get('description')],'nonSingleH1':[r['url'] for r in rows if r.get('status')==200 and len(r.get('h1',[]))!=1],'duplicateTitles':{k:v for k,v in titles.items() if len(v)>1},'elapsedSeconds':round(time.time()-started)}
    (out/'summary.json').write_text(json.dumps(summary,indent=2)); print(json.dumps({k:v for k,v in summary.items() if k not in ('skippedLinks','discoveredOutsideSitemap','nonSingleH1','duplicateTitles')},indent=2))

if __name__=='__main__': main()
