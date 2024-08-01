import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
// import { SUPABASE_KEY, SUPABASE_URL } from 'src/supabase.config';
@Injectable()
export class AnnouncementsService {
    constructor(private configService: ConfigService) { }
    // let SUPABASE_URL= 
    // let SUPABASE_KEY= this.configService.get<string>('DATABASE_URL');

    private supabase = createClient(this.configService.get<string>('SUPABASE_URL'), this.configService.get<string>('SUPABASE_KEY'));

    async getAllAnnouncements(orgId: any): Promise<any> {
        const { data, error } = await this.supabase.from('add_announcements').select('*').eq('user_id', orgId);
        if (error) {
            throw error;
        }
        return data;
    }

    async removeAnnouncement(id: any): Promise<any> {
        const { data, error } = await this.supabase.from('add_announcements').delete().eq('id', id);
        if (error) {
            throw error;
        }
        return data;
    }

    async createAnnouncement(body: any, file: Express.Multer.File) {
        // Handle file storage to Supabase storage
        // if (file) {
        //     const { data: fileData, error: fileError } = await this.supabase.storage.from('avatars').upload(file.originalname,file.buffer);
        //     if (fileError) {
        //         console.log("file Error ",fileError);
        //         throw fileError;
        //     }
        // }


        const { data, error } = await this.supabase.from('add_announcements').insert([
            {
                title: body.title,
                description: body.description,
                date: new Date().toLocaleDateString(),
                attached_file: file ? file.originalname : null,
                group: body.groups,
                user_id: body.user_id,
            },
        ]);

        if (error) {
            console.log(error);
            throw error;
        }
    }
}

