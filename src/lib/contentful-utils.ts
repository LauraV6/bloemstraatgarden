import type { AssetBlock } from '@/types/api/contentful';

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function createAssetMap(assets: AssetBlock[]): Map<string, AssetBlock> {
  const assetMap = new Map<string, AssetBlock>();
  for (const asset of assets) {
    assetMap.set(asset.sys.id, asset);
  }
  return assetMap;
}
