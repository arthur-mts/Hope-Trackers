import {ObjectSchema} from 'realm';

export const schema: ObjectSchema = {
  name: 'Post',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', indexed: true},
  },
};

export class MarkData {
  public static schema = schema;

  public id!: string;
  public mark!: string;
  public lat!: number;
  public lng!: number;
  public saved!: boolean;
}
