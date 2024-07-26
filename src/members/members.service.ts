import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from 'src/supabase.config';
import { sendEmail } from 'utils/postmark-email-send';

@Injectable()
export class MembersService {
    private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    async getAllMembers(): Promise<any> {
        const { data, error } = await this.supabase.from('add_member').select('*');
        if (error) {
            throw error;
        }
        // console.log(data);
        return data;
    }

    async addMember(body: any, file: Express.Multer.File): Promise<any> {
        const { data, error } = await this.supabase
            .from('add_member')
            .insert([
                {
                    name: body.name,
                    mob_num: body.mob_num,
                    email_id: body.email_id,
                    onboard_status: body.onboard_status,
                    assign_group: body.assign_group,
                    member_image: file?.originalname,
                },
            ]);
        if (error) {
            throw error;
        }
    }

    async sendMail(body: any): Promise<any> {
        const { data, error } = await this.supabase.from('add_member').select('*').eq('email_id', body.email_id);
        if (error) {
            throw error;
        }
        if(data){
            console.log(data);
            await sendEmail(data[0].email_id, "test",`Hi ${data[0].name}`);
        }
    }   
}
