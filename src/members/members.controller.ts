import { Controller, Get, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { MembersService } from './members.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('members')
export class MembersController {
    constructor(private membersService: MembersService) { }

    @Get('/getAllMembers')
    getAllMembers(): Promise<any> {
        return this.membersService.getAllMembers();
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
