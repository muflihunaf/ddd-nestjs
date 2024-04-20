import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from 'src/domain/member/dto/create-member.dto';
import { UpdateMemberDto } from 'src/domain/member/dto/updated-member.dto';
import { Member } from 'src/domain/member/model/member.model';
import { MemberService } from 'src/domain/member/services/member.service';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get All Member' })
  async getAllMembers(): Promise<Member[]> {
    return this.memberService.getAllMember();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get Member By Id' })
  async getMemberById(@Param('id') id: string): Promise<Member | null> {
    return this.memberService.getMemberById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create Member' })
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<Member> {
    return this.memberService.createMember(createMemberDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update Member' })
  async updateMember(
    @Param('id') id: string,
    @Body() member: UpdateMemberDto,
  ): Promise<Member | null> {
    return this.memberService.updateMember(id, member);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete Member' })
  async deleteMember(@Param('id') id: string): Promise<Member | null> {
    return this.memberService.deleteMember(id);
  }
}
