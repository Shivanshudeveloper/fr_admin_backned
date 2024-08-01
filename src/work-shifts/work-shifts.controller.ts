import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkShiftsService } from './work-shifts.service';

@Controller('work-shifts')
export class WorkShiftsController {
    constructor(private workShiftsService: WorkShiftsService) { }

    @Get('/getAllWorkShifts/:orgId')
    async getAllWorkShifts(@Param() param:any): Promise<any> {
        try {
            return await this.workShiftsService.getAllWorkShifts(param.orgId);
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    @Post('/addNewWorkShift')
    async addNewWorkShift(@Body() body: any): Promise<any> {
        try {
            return await this.workShiftsService.addNewWorkShift(body);
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }



}
