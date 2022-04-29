export type FoldersConfig = {
  l10nFolder: string;
  assetsFolder: string;
}

export class LayoutModel {

  constructor(private config: FoldersConfig, private layoutId: string, private l10n: string) {}

  get elementsListId(): string {
    return `${this.layoutId}-elements`;
  }

  get elementsListUrl(): string {
    return `${this.config.assetsFolder}${this.elementsListId}.json`;
  }

  get positionsListId(): string {
    return `${this.layoutId}-positions`;
  }

  get positionsListUrl(): string {
    return `${this.config.assetsFolder}${this.positionsListId}.json`;
  }

  get l10nId(): string {
    return this.l10n;
  }

  get l10nUrl(): string {
    return `${this.config.l10nFolder}${this.l10nId}.json`;
  }

  get stylesListId(): string {
    return 'text-styles';
  }

  get stylesListUrl(): string {
    return `${this.config.l10nFolder}${this.stylesListId}.json`;
  }

  getImageKey(imageId): string {
    return `${this.layoutId}-${imageId}`;
  }

  getImageUrl(imageId): string {
    return `${this.config.assetsFolder}${this.layoutId}/${imageId}.png`;
  }

}
