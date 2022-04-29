import 'phaser';
import { ElementsFactory } from './elements-factory';
import { FoldersConfig, LayoutModel } from './model';

export class Layout<LayoutListType> {

  private mappedList: { [key: string]: any } = {};
  private model: LayoutModel;
  private factory: ElementsFactory;

  constructor(config: FoldersConfig, private scene: Phaser.Scene, layoutId: string, l10n: string) {
    this.model = new LayoutModel(config, layoutId, l10n);
    this.factory = new ElementsFactory(this.scene);
  }

  preload() {
    this.scene.load.json(this.model.elementsListId, this.model.elementsListUrl);
    this.scene.load.json(this.model.positionsListId, this.model.positionsListUrl);
    this.scene.load.json(this.model.l10nId, this.model.l10nUrl);
    this.scene.load.json(this.model.stylesListId, this.model.stylesListUrl);
  }

  create() {
    return new Promise((resolve) => {
      const elementsList = this.scene.cache.json.get(this.model.elementsListId) as Array<any>;
      const imagesList = elementsList.filter((entry) => entry.type === 'image');
      imagesList.forEach((entry) => {
        this.scene.load.image(this.model.getImageKey(entry.key), this.model.getImageUrl(entry.key));
      });
      this.scene.load.on('complete', () => {
        const elementsList = this.scene.cache.json.get(this.model.elementsListId) as Array<any>;
        elementsList.forEach((element) => {
          this.mappedList[element.id] = this.factory.createElement(element, this.model);
        });
        resolve(true);
      });
      this.scene.load.start();
    });
  }

  get list(): LayoutListType {
    return this.mappedList as any;
  }

}
