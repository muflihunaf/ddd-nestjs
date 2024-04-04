// infrastructures/repositories/book/book.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from 'src/domain/member/model/member.model';
import { MemberRepository } from 'src/domain/member/repositories/member.repository';

@Injectable()
export class MongooseMemberRepository implements MemberRepository {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async findById(id: string): Promise<Member | null> {
    return this.memberModel.findById(id).exec();
  }

  async create(member: Member): Promise<Member> {
    return this.memberModel.create(member);
  }

  async update(id: string, member: Member): Promise<Member | null> {
    return this.memberModel
      .findByIdAndUpdate({ _id: id }, member, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Member | null> {
    return this.memberModel.findByIdAndDelete(id).exec();
  }
}
