import { Controller,Get } from '@nestjs/common';
import { GroupsService } from './groups.service';
@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) { }

    @Get('/getAllGroups')
    getAllGroups(): Promise<any> {
        return this.groupsService.getAllGroups();
    }
}
