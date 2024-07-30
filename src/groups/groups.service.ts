import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class GroupsService {
    constructor(private configService: ConfigService) {}
    private supabase = createClient(this.configService.get<string>('SUPABASE_URL'),this.configService.get<string>('SUPABASE_KEY'));
    async getAllGroups(orgId:any): Promise<any> {
        const {data,error} = await this.supabase.from('drawer_groupAdd').select('*').eq('user_id',orgId);
        if(error){
            throw error;
        }
        return data;
    }
    async createGroup(body:any): Promise<any> {
        const {data,error} = await this.supabase.from('drawer_groupAdd').insert([body]);
        if(error){
            throw error;
        }
        const allGroups = await this.getAllGroups(body.user_id);
        // console.log(allGroups);
        return allGroups;
    }
}
