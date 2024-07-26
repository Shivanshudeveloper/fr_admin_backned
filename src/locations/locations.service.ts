import { Injectable } from '@nestjs/common';
import { SUPABASE_URL,SUPABASE_KEY } from 'src/supabase.config';
import { createClient } from '@supabase/supabase-js';
@Injectable()
export class LocationsService {
    private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    async getAllLocations(): Promise<any> {
        const {data,error} = await this.supabase.from('location').select('*');
        if(error){
            throw error;
        }
        return data;
    }
}
