import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY,SUPABASE_URL } from 'src/supabase.config';
@Injectable()
export class GroupsService {
    private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    async getAllGroups(): Promise<any> {
        const {data,error} = await this.supabase.from('group').select('*');
        if(error){
            throw error;
        }
        // console.log(data);
        return data;
    }
}
