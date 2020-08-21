export interface Preset {
  name: string;
  required: { tag: string, key: string, value?: string, textContent?: string }[]
}
