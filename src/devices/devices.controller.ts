import { Body, Controller,Get, Param, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
@Controller('devices')
export class DevicesController {
    constructor(private devicesService: DevicesService) { }

    @Get('/getAllDevices/:orgId')
    getAllDevices(@Param() param:any): Promise<any> {
        return this.devicesService.getAllDevices(param.orgId);
    }

    @Post('/addDevice')
    async addDevice(@Body() body:any): Promise<any> {
        await this.devicesService.addDevice(body);
    }
}
