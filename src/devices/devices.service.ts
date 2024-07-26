import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY,SUPABASE_URL } from 'src/supabase.config';
@Injectable()
export class DevicesService {
    private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    async getAllDevices(): Promise<any> {
        const {data,error} = await this.supabase.from('add_devices').select('*').order('id', { ascending: false });
        if(error){
            throw error;
        }
        // console.log(data);
        return data;
    }

    async addDevice(body:any): Promise<any> {
        const {error} = await this.supabase.from('add_devices').insert([body]);
        if(error){
            throw error;
        }
    }
}
