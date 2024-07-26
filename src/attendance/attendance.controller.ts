import { Controller,Get } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
@Controller('attendance')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) { }

    @Get('/getAllAttendance')
    async getAllAttendance(): Promise<any> {
        try {
            return await this.attendanceService.getAllAttendance();
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
