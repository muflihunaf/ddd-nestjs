// book/book.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberController } from 'src/application/member.controller';
import { Member, MemberSchema } from 'src/domain/member/model/member.model';
import { MemberService } from 'src/domain/member/services/member.service';
import { MongooseMemberRepository } from 'src/infrastructures/repositories/member/member.repository.impl';
import { DtoToModelTransformer } from 'src/infrastructures/transformer/book.transformer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
  controllers: [MemberController],
  providers: [
    MemberService,
    {
      provide: 'MemberRepository',
      useClass: MongooseMemberRepository,
    },
    DtoToModelTransformer,
  ],
})
export class MemberModule {}
