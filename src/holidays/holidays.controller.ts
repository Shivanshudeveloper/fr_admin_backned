import { Body, Controller, Get, Post } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
@Controller('holidays')
export class HolidaysController {
    constructor(private readonly holidaysService: HolidaysService) {}

    @Get('/getAllHolidays')
    async getAllHolidays() {
        return await this.holidaysService.getAllHolidays();
    }

    @Post('/createHoliday')
    async createHoliday(@Body() body: any) {
        await this.holidaysService.createHoliday(body);
    }
}
