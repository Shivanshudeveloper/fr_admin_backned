import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';
@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}
    @Get('/getOrganization/:email')
    async getOrganization(@Param('email') email: string){
        return await this.organizationService.getOrganization(email);
    }
    @Post('/createOrganization')
    async createOrganization(@Body() body: any){
        await this.organizationService.createOrganization(body);
    }
    @Get('/getOrganizationProfile/:user_id')
    async getOrganizationProfile(@Param('user_id') user_id: string){
        return await this.organizationService.getOrganizationProfile(user_id);
    }

}
