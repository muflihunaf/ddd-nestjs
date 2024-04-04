import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @ApiProperty()
  @Prop()
  code: string;

  @ApiProperty()
  @Prop()
  name: string;

  @Prop({ default: false })
  isPenalized: boolean;

  @Prop({ default: 0 })
  penalizeEndDate: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
