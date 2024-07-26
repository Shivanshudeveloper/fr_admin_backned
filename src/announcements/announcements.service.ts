import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from 'src/supabase.config';
@Injectable()
export class AnnouncementsService {
    private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    async getAllAnnouncements() {
        const { data, error } = await this.supabase.from('add_announcements').select('*');
        if (error) {
            throw error;
        }
        return data;
    }

    async createAnnouncement(body: any, file: Express.Multer.File) {
        // Handle file storage (e.g., upload to S3 or Supabase storage)

        const { data, error } = await this.supabase.from('add_announcements').insert([
            {
                title: body.title,
                description: body.description,
                date: new Date().toLocaleDateString(),
                // Assuming you want to store the file name or URL in the database
                attached_file: file ? file.originalname : null,
                group: body.groups,
            },
        ]);

        if (error) {
            console.log(error);
            throw error;
        }
    }
}

