export interface ITag {
  id: number;
  name: string;
  color: string;
}

class TagModel implements ITag {
  id: number;
  name: string;
  color: string;

  constructor({ id, name, color }: ITag) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

export default TagModel;
