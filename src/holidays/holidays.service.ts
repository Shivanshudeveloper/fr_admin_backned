import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class HolidaysService {
    // private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    constructor(private configService: ConfigService) {}
    private supabase = createClient(this.configService.get<string>('SUPABASE_URL'),this.configService.get<string>('SUPABASE_KEY'));

    async getAllHolidays(orgId:any): Promise<any> {
        const { data, error } = await this.supabase.from('add_holiday').select('*').eq('user_id', orgId);
        if (error) {
            throw error;
        }
        return data;
    }

    async createHoliday(body: any): Promise<any> {
        const { data, error } = await this.supabase
            .from('add_holiday')
            .insert([
                body
            ]);
        if (error) {
            throw error;
        }
    }
}
