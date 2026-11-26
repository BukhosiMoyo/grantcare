import assert from 'node:assert/strict';
import test from 'node:test';
import { getOfficeMapEmbedUrl, getOfficeOpenMapUrl } from '../src/lib/office-map';
import { SASSA_OFFICES } from '../src/lib/sassa-offices';

test('every listed office has a valid HTTPS map with the selected office marker inside the viewport', () => {
  for (const office of SASSA_OFFICES) {
    const map=new URL(getOfficeMapEmbedUrl(office)!);
    assert.equal(map.origin,'https://www.openstreetmap.org');
    assert.equal(map.pathname,'/export/embed.html');
    assert.equal(map.searchParams.get('marker'),`${office.latitude},${office.longitude}`);
    const [west,south,east,north]=map.searchParams.get('bbox')!.split(',').map(Number);
    assert.ok(west<office.longitude && east>office.longitude && south<office.latitude && north>office.latitude,office.slug);
    const fullMap=new URL(getOfficeOpenMapUrl(office)!);
    assert.equal(fullMap.origin,map.origin);
    assert.ok(!map.searchParams.has('key'));
  }
});

test('invalid map coordinates do not produce broken or unbounded embed requests', () => {
  for (const office of [{latitude:NaN,longitude:28},{latitude:-26,longitude:Infinity},{latitude:91,longitude:28},{latitude:-26,longitude:181}]) {
    assert.equal(getOfficeMapEmbedUrl(office),null);
    assert.equal(getOfficeOpenMapUrl(office),null);
  }
});
