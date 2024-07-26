import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from 'src/supabase.config';
@Injectable()
export class AttendanceService {
    private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    async getAllAttendance(): Promise<any> {
        // const {data,error} = await this.supabase
        // .from('time')
        // .select('*')
        // .order('id', {ascending: false});
        // if(error){
        //     console.log(error);
        //     throw error;
        // }
        // console.log(data);
        // return data

        // Fetch data from the first table
        const { data: table1Data, error: table1Error } = await this.supabase
            .from('time')
            .select('*').order('id', { ascending: false });

        if (table1Error) {
            throw table1Error;
        }

        // Fetch data from the second table
        const { data: table2Data, error: table2Error } = await this.supabase
            .from('profile')
            .select('*').order('id', { ascending: false });

        if (table2Error) {
            throw table2Error;
        }

        // Join the data based on the common ID
        const joinedData = [];
        table1Data.forEach((item1) => {
            const obj = table2Data.find(item2 => item2.userId === item1.user_Id);
            if (obj) {
                joinedData.push({
                    ...obj,
                    ...item1,
                });
            }
        }
        );
        // console.log(joinedData);
        return joinedData;
    }

    async getTodaysPresentMembers(): Promise<any>{
        const {data,error} = await this.supabase.from('time').select('*').eq('created_at',new Date().toISOString().split('T')[0]);
        if(error){
            console.log(error);
            throw error;
        }
        return data;
    }
}
