import { Member } from '../model/member.model';

export interface MemberRepository {
  findAll(): Promise<Member[]>;
  findById(id: string): Promise<Member | null>;
  create(member: Member): Promise<Member>;
  update(id: string, member: Member): Promise<Member | null>;
  delete(id: string): Promise<Member | null>;
}
