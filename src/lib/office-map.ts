export type OfficeCoordinates = {latitude:number;longitude:number};
function validCoordinates(office: OfficeCoordinates) {
  return Number.isFinite(office.latitude) && Number.isFinite(office.longitude) && Math.abs(office.latitude)<=90 && Math.abs(office.longitude)<=180;
}
export function getOfficeMapEmbedUrl(office: OfficeCoordinates) {
  if (!validCoordinates(office)) return null;
  const span=0.018;
  const bbox=[Math.max(-180,office.longitude-span),Math.max(-90,office.latitude-span),Math.min(180,office.longitude+span),Math.min(90,office.latitude+span)].map(value=>Number(value.toFixed(6)));
  const params=new URLSearchParams({bbox:bbox.join(','),layer:'mapnik',marker:`${office.latitude},${office.longitude}`});
  return `https://www.openstreetmap.org/export/embed.html?${params}`;
}
export function getOfficeOpenMapUrl(office: OfficeCoordinates) {
  if (!validCoordinates(office)) return null;
  return `https://www.openstreetmap.org/?mlat=${office.latitude}&mlon=${office.longitude}#map=16/${office.latitude}/${office.longitude}`;
}
