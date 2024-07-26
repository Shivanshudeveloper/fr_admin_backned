import { Controller,Get, Param } from '@nestjs/common';
import { LeavesService } from './leaves.service';
@Controller('leaves')
export class LeavesController {
    constructor(private leavesService: LeavesService) { }

    @Get('/getAllLeaves')
    async getAllLeaves(): Promise<any> {
        try {
            return await this.leavesService.getAllLeaves();
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    @Get('/approveLeave/:leaveId')
    async approveLeave(@Param() Param:any): Promise<any> {
        try {
            await this.leavesService.approveLeave(Param.leaveId);
        } catch (error) {
            throw error;
        }
    }

    @Get('/rejectLeave/:leaveId')
    async rejectLeave(@Param() Param:any): Promise<any> {
        try {
            await this.leavesService.rejectLeave(Param.leaveId);
        } catch (error) {
            throw error;
        }
    }
}
