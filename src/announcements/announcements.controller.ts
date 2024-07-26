import { Body, Controller, Get, Post, UploadedFile,UseInterceptors } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('announcements')
export class AnnouncementsController {
    constructor(private readonly announcementsService: AnnouncementsService) {}

    @Get('/getAllAnnouncements')
    async getAllAnnouncements() {
        return await this.announcementsService.getAllAnnouncements();
    }

    @Post('/createAnnouncement')
    @UseInterceptors(FileInterceptor('attachment'))
    async createAnnouncement(
        @UploadedFile() file:Express.Multer.File,
        @Body() body: any){
        await this.announcementsService.createAnnouncement(body,file);
    }
}
