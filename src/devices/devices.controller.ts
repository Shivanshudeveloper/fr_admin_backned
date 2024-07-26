import { Body, Controller,Get, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
@Controller('devices')
export class DevicesController {
    constructor(private devicesService: DevicesService) { }

    @Get('/getAllDevices')
    getAllDevices(): Promise<any> {
        return this.devicesService.getAllDevices();
    }

    @Post('/addDevice')
    async addDevice(@Body() body:any): Promise<any> {
        await this.devicesService.addDevice(body);
    }
}
