import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @ApiProperty()
  @Prop({ unique: true, required: true, type: String })
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
