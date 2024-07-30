import { Controller,Get, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
@Controller('attendance')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) { }

    @Get('/getAllAttendance/:orgId')
    async getAllAttendance(@Param() param:any): Promise<any> {
        try {
            return await this.attendanceService.getAllAttendance(param.orgId);
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    @Get('/getTodaysPresentMembers')
    async getTodaysPresentMembers():Promise<any>{
        try {
            return await this.attendanceService.getTodaysPresentMembers();
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }
}
