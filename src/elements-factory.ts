import { LayoutModel } from './model';

export class ElementsFactory {

  private model: LayoutModel;

  constructor(private scene: Phaser.Scene) {}

  createElement(element, model: LayoutModel): void {
    this.model = model;
    type createFunction = (string) => any;
    return new Map<string, createFunction>([
      ['image', this.createImage],
      ['text', this.createText],
    ]).get(element.type).call(this, element);
  }

  private createImage(element) {
    const position = this.getPosition(element.id);
    return this.scene.add.image(position.x, position.y, this.model.getImageKey(element.key))
      .setName(element.id)
      .setOrigin(0, 0);
  }

  private createText(element) {
    const position = this.getPosition(element.id);
    const { text, size } = this.getTextAndSize(element.id);
    const { fontFamily, fill } = this.getStyle(element.style);
    const textStyle = { fontSize: `${size}px`, fill, fontFamily };
    return this.scene.add.text(position.x, position.y, text, textStyle);
  }

  private getPosition(id: string): Phaser.Geom.Point {
    const positionsList = this.scene.cache.json.get(this.model.positionsListId) as Array<any>;
    const { position } = positionsList.find((element) => element.id === id);
    return new Phaser.Geom.Point(position[0], position[1]);
  }

  private getTextAndSize(id: string): { text: string, size: string } {
    const l10nList = this.scene.cache.json.get(this.model.l10nId) as Array<any>;
    const { text, size } = l10nList.find((element) => element.id === id);
    return { text, size };
  }

  private getStyle(styleId: string): any {
    const stylesList = this.scene.cache.json.get(this.model.stylesListId) as Array<any>;
    const style = stylesList.find((element) => element.id === styleId);
    return style;
  }

}
