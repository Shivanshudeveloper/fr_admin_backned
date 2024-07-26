import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from 'src/supabase.config';
@Injectable()
export class HolidaysService {
    private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    async getAllHolidays(): Promise<any> {
        const { data, error } = await this.supabase.from('add_holiday').select('*');
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
