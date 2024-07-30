import { Body, Controller,Get, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) { }

    @Get('/getAllGroups/:orgId')
    async getAllGroups(@Param() param:any): Promise<any> {
        return await this.groupsService.getAllGroups(param.orgId);
    }

    @Post('/createGroup')
    async createGroup(@Body() body:any): Promise<any> {
        return await this.groupsService.createGroup(body);
    }
}
