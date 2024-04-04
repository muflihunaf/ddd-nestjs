import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  _id: string;

  @ApiProperty()
  @Prop()
  code: string;

  @ApiProperty()
  @Prop()
  name: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
