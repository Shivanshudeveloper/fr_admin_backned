import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from 'src/supabase.config';

@Injectable()
export class UserService {
    private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    async getAllUsers(): Promise<any> {
        const { data, error } = await this.supabase
            .from('users')
            .select('*');
        if (error) {
            throw error;
        }
        console.log(data);
        return data;
    }

    async checkUserExistance(email: string): Promise<any> {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('email', email);
        if (error) {
            throw error;
        }
        console.log(data);
        return data;
    }

}
