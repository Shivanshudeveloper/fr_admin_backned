import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from 'src/supabase.config';
@Injectable()
export class LeavesService {
    private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    async getAllLeaves(): Promise<any> {
        const { data, error } = await this.supabase.from('leave').select('*').order('id', { ascending: false });
        if (error) {
            console.log(error);
            throw error;
        }
        // console.log(data);
        return data;
    }

    async approveLeave(leaveId: number): Promise<any> {
        const { data, error } = await this.supabase.from('leave').update({ status: 'Approved' }).match({ id: leaveId });
        if (error) {
            console.log(error);
            throw error;
        }
    }

    async rejectLeave(leaveId: number): Promise<any> {
        const { data, error } = await this.supabase.from('leave').update({ status: 'Rejected' }).match({ id: leaveId });
        if (error) {
            console.log(error);
            throw error;
        }
    }
}
