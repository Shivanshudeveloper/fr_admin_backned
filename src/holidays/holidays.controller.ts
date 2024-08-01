import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
@Controller('holidays')
export class HolidaysController {
    constructor(private readonly holidaysService: HolidaysService) {}

    @Get('/getAllHolidays/:orgId')
    async getAllHolidays(@Param() param: any) {
        return await this.holidaysService.getAllHolidays(param.orgId);
    }

    @Post('/createHoliday')
    async createHoliday(@Body() body: any) {
        await this.holidaysService.createHoliday(body);
    }
}
