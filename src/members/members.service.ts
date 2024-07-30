import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from 'utils/postmark-email-send';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MembersService {
    // private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    constructor(private configService: ConfigService) {}
    private supabase = createClient(this.configService.get<string>('SUPABASE_URL'),this.configService.get<string>('SUPABASE_KEY'));
    async getAllMembers(orgId:any): Promise<any> {
        const { data, error } = await this.supabase.from('add_member').select('*').eq('user_id', orgId);
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
                    user_id: body.user_id,
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
