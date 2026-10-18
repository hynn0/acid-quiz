// 擴充髮型選項
export type HairStyle = 'short' | 'long' | 'bangs' | 'ponytail' | 'bun' | 'spiky' | 'bald';
// 擴充眼鏡選項
export type GlassesStyle = 'none' | 'square' | 'round' | 'sunglasses';
// 擴充配件選項
export type Accessory = 'none' | 'hat' | 'earring' | 'bowtie';

export type FaceFeatures = {
  hair: HairStyle;
  glasses: GlassesStyle;
  hasBeard: boolean;
  accessory: Accessory;
};