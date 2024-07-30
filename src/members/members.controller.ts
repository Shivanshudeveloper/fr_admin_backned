import { Controller, Get, Post, UseInterceptors, UploadedFile, Body, Param } from '@nestjs/common';
import { MembersService } from './members.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('members')
export class MembersController {
    constructor(private membersService: MembersService) { }

    @Get('/getAllMembers/:orgId')
    getAllMembers(@Param() param:any): Promise<any> {
        return this.membersService.getAllMembers(param.orgId);
    }

    @Post('/addMember')
    @UseInterceptors(FileInterceptor('member_image'))
    async addMember(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any) {
        await this.membersService.addMember(body, file);
    }

    @Post('/sendMail')
    async sendMail(@Body() body: any) {
        console.log(body);
        await this.membersService.sendMail(body);
    }
}
