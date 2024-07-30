import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class WorkShiftsService {
    // private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    constructor(private configService: ConfigService) {}
    private supabase = createClient(this.configService.get<string>('SUPABASE_URL'),this.configService.get<string>('SUPABASE_KEY'));
    async getAllWorkShifts(): Promise<any> {
        try {
            const { data, error } = await this.supabase.from('work_shift').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    async addNewWorkShift(body: any): Promise<any> {
        try {
            const { data, error } = await this.supabase.from('work_shift').insert([body]);
            if (error) {
                throw new Error(error.message);
            }
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    
}
