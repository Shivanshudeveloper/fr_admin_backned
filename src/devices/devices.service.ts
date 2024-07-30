import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class DevicesService {
    // private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    constructor(private configService: ConfigService) {}
    private supabase = createClient(this.configService.get<string>('SUPABASE_URL'),this.configService.get<string>('SUPABASE_KEY'));
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
